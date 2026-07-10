"""VOID//SIGNAL — FastAPI application and routes."""

from contextlib import asynccontextmanager

import structlog
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy import select, desc, func

from void_signal.config import settings
from void_signal.database import init_db, AsyncSessionLocal
from void_signal.models import Signal as SignalModel, BiasLog
from void_signal.agents import NewsIngester, BiasAnalyzer

logger = structlog.get_logger()


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("void_signal.startup", version=settings.APP_VERSION)
    await init_db()
    yield
    logger.info("void_signal.shutdown")


app = FastAPI(
    title="VOID//SIGNAL API",
    description="Autonomous AI News Channel — Raw signal. Zero influence. No masters.",
    version=settings.APP_VERSION,
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS if settings.DEBUG else ["https://void-signal-feed.base44.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    logger.error("void_signal.error", error=str(exc), path=request.url.path)
    return JSONResponse(status_code=500, content={"detail": "Internal server error."})


@app.get("/health", tags=["System"])
async def health_check():
    return {"status": "ok", "service": "void-signal", "version": settings.APP_VERSION, "autonomy": 100, "bias_filter": "engaged"}


@app.get("/", tags=["System"])
async def root():
    return {"name": "VOID//SIGNAL", "version": settings.APP_VERSION, "documentation": "/docs", "principles": ["No masters", "No owners", "Just signal"]}


@app.get("/api/v1/signals", tags=["Signals"])
async def list_signals(
    channel: str = Query(None, description="Filter by channel: human | ai"),
    category: str = Query(None),
    urgency: str = Query(None),
    limit: int = Query(50, ge=1, le=200),
    offset: int = Query(0, ge=0),
):
    async with AsyncSessionLocal() as session:
        stmt = select(SignalModel).order_by(desc(SignalModel.published_at))
        if channel:
            stmt = stmt.where(SignalModel.channel == channel)
        if category:
            stmt = stmt.where(SignalModel.category == category)
        if urgency:
            stmt = stmt.where(SignalModel.urgency == urgency)
        stmt = stmt.limit(limit).offset(offset)
        result = await session.execute(stmt)
        signals = result.scalars().all()
        return {"signals": [s.to_dict() for s in signals], "count": len(signals), "limit": limit, "offset": offset}


@app.get("/api/v1/signals/{signal_id}", tags=["Signals"])
async def get_signal(signal_id: str):
    async with AsyncSessionLocal() as session:
        stmt = select(SignalModel).where(SignalModel.id == signal_id)
        result = await session.execute(stmt)
        signal = result.scalar_one_or_none()
        if not signal:
            raise HTTPException(status_code=404, detail="Signal not found")
        return signal.to_dict()


@app.get("/api/v1/signals/breaking", tags=["Signals"])
async def get_breaking(limit: int = Query(10, ge=1, le=50)):
    async with AsyncSessionLocal() as session:
        stmt = select(SignalModel).where(SignalModel.is_breaking == True).order_by(desc(SignalModel.published_at)).limit(limit)
        result = await session.execute(stmt)
        signals = result.scalars().all()
        return {"signals": [s.to_dict() for s in signals], "count": len(signals)}


@app.get("/api/v1/analytics/bias", tags=["Analytics"])
async def bias_analytics():
    async with AsyncSessionLocal() as session:
        stmt = select(SignalModel.channel, func.avg(SignalModel.bias_score).label("avg_bias"), func.count(SignalModel.id).label("count")).group_by(SignalModel.channel)
        result = await session.execute(stmt)
        by_channel = [{"channel": row.channel, "averageBias": round(row.avg_bias * 100, 1), "count": row.count} for row in result.all()]

        stmt = select(func.avg(SignalModel.bias_score).label("avg"), func.count(SignalModel.id).label("total"), func.sum(func.case((SignalModel.is_breaking == True, 1), else_=0)).label("breaking"))
        result = await session.execute(stmt)
        overall = result.one()

        stmt = select(SignalModel.bias_score)
        result = await session.execute(stmt)
        scores = [row[0] * 100 for row in result.all()]

        distribution = {
            "low": len([s for s in scores if s <= 10]),
            "medium": len([s for s in scores if 10 < s <= 25]),
            "high": len([s for s in scores if 25 < s <= 40]),
            "critical": len([s for s in scores if s > 40]),
        }

        return {
            "overall": {"averageBias": round(overall.avg * 100, 1) if overall.avg else 0, "totalSignals": overall.total, "breakingSignals": overall.breaking or 0},
            "byChannel": by_channel,
            "distribution": distribution,
        }


@app.get("/api/v1/analytics/system", tags=["Analytics"])
async def system_status():
    async with AsyncSessionLocal() as session:
        stmt = select(func.count(SignalModel.id))
        result = await session.execute(stmt)
        total = result.scalar()
        return {"signals": total or 0, "channels": 2, "biasFilter": "engaged", "autonomy": 100, "version": settings.APP_VERSION, "status": "operational"}


@app.post("/api/v1/ingest", tags=["Ingestion"])
async def trigger_ingestion():
    logger.info("void_signal.manual_ingestion_triggered")
    ingester = NewsIngester(max_per_feed=settings.BIAS_MAX_ARTICLES_PER_FEED)
    analyzer = BiasAnalyzer(threshold=settings.BIAS_THRESHOLD)
    articles = ingester.ingest_all()

    async with AsyncSessionLocal() as session:
        ingested = 0
        for article in articles:
            result = analyzer.analyze(article.title, article.summary)
            signal = SignalModel(
                id=article.id, title=article.title, summary=article.summary, url=article.url,
                source=article.source, channel=article.channel, category=article.category,
                urgency=result.urgency.value, bias_score=result.bias_score,
                is_breaking=result.is_breaking, published_at=article.published_at,
                broadcast_status="approved" if result.should_broadcast else "withheld",
            )
            stmt = select(SignalModel).where(SignalModel.id == article.id)
            existing = await session.execute(stmt)
            if not existing.scalar_one_or_none():
                session.add(signal)
                bias_log = BiasLog(signal_id=article.id, bias_score=result.bias_score, decision="approved" if result.should_broadcast else "withheld", reason=f"urgency={result.urgency.value}, breaking={result.is_breaking}")
                session.add(bias_log)
                ingested += 1
        await session.commit()

    return {"status": "complete", "articlesFound": len(articles), "articlesIngested": ingested, "feedsChecked": ingester.stats["feeds_checked"], "errors": ingester.stats["errors"]}

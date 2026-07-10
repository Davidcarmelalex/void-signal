"""Celery background tasks for VOID//SIGNAL."""

import logging
from celery import Celery
from celery.schedules import crontab
from void_signal.config import settings
from void_signal.database import AsyncSessionLocal
from void_signal.models import Signal as SignalModel, BiasLog
from void_signal.agents import NewsIngester, BiasAnalyzer

logger = logging.getLogger("void.celery")

celery_app = Celery("void_signal", broker=settings.REDIS_URL, backend=settings.REDIS_URL)

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
    beat_schedule={
        "ingest-news": {"task": "void_signal.celery_tasks.ingest_news", "schedule": settings.INGEST_INTERVAL},
        "cleanup-old-signals": {"task": "void_signal.celery_tasks.cleanup_old_signals", "schedule": crontab(hour=0, minute=0)},
    },
)


@celery_app.task(bind=True, max_retries=3)
def ingest_news(self):
    import asyncio
    asyncio.run(_async_ingest())


async def _async_ingest():
    ingester = NewsIngester(max_per_feed=settings.BIAS_MAX_ARTICLES_PER_FEED)
    analyzer = BiasAnalyzer(threshold=settings.BIAS_THRESHOLD)
    articles = ingester.ingest_all()

    async with AsyncSessionLocal() as session:
        for article in articles:
            result = analyzer.analyze(article.title, article.summary)
            signal = SignalModel(
                id=article.id, title=article.title, summary=article.summary, url=article.url,
                source=article.source, channel=article.channel, category=article.category,
                urgency=result.urgency.value, bias_score=result.bias_score,
                is_breaking=result.is_breaking, published_at=article.published_at,
                broadcast_status="approved" if result.should_broadcast else "withheld",
            )
            from sqlalchemy import select
            stmt = select(SignalModel).where(SignalModel.id == article.id)
            existing = await session.execute(stmt)
            if not existing.scalar_one_or_none():
                session.add(signal)
                bias_log = BiasLog(signal_id=article.id, bias_score=result.bias_score, decision="approved" if result.should_broadcast else "withheld")
                session.add(bias_log)
        await session.commit()
    logger.info(f"Ingested {len(articles)} articles")


@celery_app.task
def cleanup_old_signals(days: int = 30):
    import asyncio
    asyncio.run(_async_cleanup(days))


async def _async_cleanup(days):
    from datetime import datetime, timedelta
    from sqlalchemy import delete
    async with AsyncSessionLocal() as session:
        cutoff = datetime.utcnow() - timedelta(days=days)
        stmt = delete(SignalModel).where(SignalModel.created_at < cutoff)
        result = await session.execute(stmt)
        await session.commit()
        logger.info(f"Cleaned up {result.rowcount} old signals")

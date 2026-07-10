"""Database models for VOID//SIGNAL."""

from datetime import datetime
from sqlalchemy import Column, String, Float, DateTime, Boolean, Integer, Text
from void_signal.database import Base


class Signal(Base):
    __tablename__ = "signals"

    id = Column(String(32), primary_key=True, index=True)
    title = Column(Text, nullable=False)
    summary = Column(Text, nullable=False)
    url = Column(Text, nullable=False)
    source = Column(String(255), nullable=False, index=True)
    channel = Column(String(16), nullable=False, index=True)
    category = Column(String(32), nullable=False, index=True)
    urgency = Column(String(16), nullable=False, default="medium")
    bias_score = Column(Float, nullable=False, default=0.0)
    is_breaking = Column(Boolean, nullable=False, default=False)
    published_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    broadcast_status = Column(String(16), nullable=False, default="pending")

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "title": self.title,
            "summary": self.summary,
            "url": self.url,
            "source": self.source,
            "channel": self.channel,
            "category": self.category,
            "urgency": self.urgency,
            "biasScore": round(self.bias_score * 100, 1),
            "isBreaking": self.is_breaking,
            "publishedAt": self.published_at.isoformat() if self.published_at else None,
            "broadcastStatus": self.broadcast_status,
        }


class BiasLog(Base):
    __tablename__ = "bias_logs"

    id = Column(Integer, primary_key=True, autoincrement=True)
    signal_id = Column(String(32), nullable=False, index=True)
    bias_score = Column(Float, nullable=False)
    decision = Column(String(16), nullable=False)
    reason = Column(Text, nullable=True)
    checked_at = Column(DateTime, nullable=False, default=datetime.utcnow)


class SourceHealth(Base):
    __tablename__ = "source_health"

    id = Column(Integer, primary_key=True, autoincrement=True)
    source_url = Column(String(512), nullable=False, unique=True)
    last_fetch = Column(DateTime, nullable=True)
    status = Column(String(16), nullable=False, default="active")
    error_count = Column(Integer, nullable=False, default=0)
    articles_fetched = Column(Integer, nullable=False, default=0)

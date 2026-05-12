"""
VOID//SIGNAL — News Ingestion Agent

Ingests news from RSS feeds and APIs, deduplicates,
and queues for bias analysis.
"""
from __future__ import annotations
import hashlib
import logging
from dataclasses import dataclass, field
from datetime import datetime

import feedparser

logger = logging.getLogger("void.ingester")

SOURCES = {
    "world": [
        "https://feeds.bbci.co.uk/news/world/rss.xml",
        "https://rss.reuters.com/reuters/worldnews",
    ],
    "tech": [
        "https://feeds.arstechnica.com/arstechnica/index",
        "https://www.wired.com/feed/rss",
    ],
    "ai": [
        "https://techcrunch.com/tag/artificial-intelligence/feed/",
    ],
}


@dataclass
class RawArticle:
    id: str
    title: str
    url: str
    source: str
    channel: str
    summary: str = ""
    published_at: datetime = field(default_factory=datetime.utcnow)

    @classmethod
    def from_entry(cls, entry: dict, source: str, channel: str) -> "RawArticle":
        url = entry.get("link", "")
        return cls(
            id=hashlib.sha256(url.encode()).hexdigest()[:16],
            title=entry.get("title", ""),
            url=url,
            source=source,
            channel=channel,
            summary=entry.get("summary", "")[:500],
        )


class NewsIngester:
    def __init__(self):
        self._seen: set[str] = set()

    def ingest_all(self) -> list[RawArticle]:
        articles = []
        for channel, feeds in SOURCES.items():
            for feed_url in feeds:
                try:
                    feed = feedparser.parse(feed_url)
                    for entry in feed.entries[:10]:
                        article = RawArticle.from_entry(entry, feed_url, channel)
                        if article.id not in self._seen:
                            self._seen.add(article.id)
                            articles.append(article)
                except Exception as e:
                    logger.error(f"Feed error {feed_url}: {e}")
        logger.info(f"Ingested {len(articles)} new articles")
        return articles

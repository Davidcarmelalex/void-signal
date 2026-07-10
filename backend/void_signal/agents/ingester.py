"""VOID//SIGNAL — News Ingestion Agent"""

from __future__ import annotations

import hashlib
import logging
from dataclasses import dataclass, field
from datetime import datetime

import feedparser
import httpx

logger = logging.getLogger("void.ingester")

SOURCES = {
    "human": {
        "world": [
            "https://feeds.bbci.co.uk/news/world/rss.xml",
            "https://rss.cnn.com/rss/edition_world.rss",
            "https://feeds.reuters.com/reuters/worldnews",
        ],
        "politics": [
            "https://feeds.bbci.co.uk/news/politics/rss.xml",
        ],
        "science": [
            "https://feeds.nature.com/news/rss/current",
            "https://www.sciencedaily.com/rss/all.xml",
        ],
        "technology": [
            "https://feeds.arstechnica.com/arstechnica/index",
            "https://www.wired.com/feed/rss",
        ],
        "economy": [
            "https://feeds.bbci.co.uk/news/business/rss.xml",
        ],
        "environment": [
            "https://www.theguardian.com/environment/rss",
        ],
    },
    "ai": {
        "ai-development": [
            "https://blog.google/technology/ai/rss/",
            "https://openai.com/news/rss.xml",
        ],
        "ai-research": [
            "https://arxiv.org/rss/cs.AI",
        ],
        "ai-ethics": [
            "https://www.europarl.europa.eu/rss/doc/top-stories/en.xml",
        ],
        "ai-industry": [
            "https://techcrunch.com/category/artificial-intelligence/feed/",
        ],
    },
}


@dataclass
class RawArticle:
    id: str
    title: str
    url: str
    source: str
    channel: str
    category: str
    summary: str = ""
    published_at: datetime = field(default_factory=datetime.utcnow)

    @classmethod
    def from_entry(cls, entry: dict, source: str, channel: str, category: str) -> "RawArticle":
        url = entry.get("link", "")
        return cls(
            id=hashlib.sha256(url.encode()).hexdigest()[:16],
            title=entry.get("title", "").strip(),
            url=url,
            source=source,
            channel=channel,
            category=category,
            summary=entry.get("summary", "")[:500],
            published_at=_parse_date(entry.get("published_parsed")),
        )


def _parse_date(date_struct) -> datetime:
    if date_struct:
        try:
            return datetime(*date_struct[:6])
        except (TypeError, ValueError):
            pass
    return datetime.utcnow()


class NewsIngester:
    def __init__(self, max_per_feed: int = 10):
        self._seen: set[str] = set()
        self._max_per_feed = max_per_feed
        self._stats = {"feeds_checked": 0, "articles_found": 0, "errors": 0}

    @property
    def stats(self) -> dict:
        return self._stats.copy()

    def ingest_all(self) -> list[RawArticle]:
        articles: list[RawArticle] = []
        for channel, categories in SOURCES.items():
            for category, feeds in categories.items():
                for feed_url in feeds:
                    try:
                        feed_articles = self._parse_feed(feed_url, channel, category)
                        articles.extend(feed_articles)
                        self._stats["feeds_checked"] += 1
                    except Exception as e:
                        logger.error(f"Feed error {feed_url}: {e}")
                        self._stats["errors"] += 1
        self._stats["articles_found"] = len(articles)
        logger.info(f"Ingestion: {len(articles)} articles from {self._stats['feeds_checked']} feeds ({self._stats['errors']} errors)")
        return articles

    def _parse_feed(self, feed_url: str, channel: str, category: str) -> list[RawArticle]:
        feed = feedparser.parse(feed_url)
        articles: list[RawArticle] = []
        for entry in feed.entries[:self._max_per_feed]:
            article = RawArticle.from_entry(entry, feed_url, channel, category)
            if article.id in self._seen or not article.title or not article.url:
                continue
            self._seen.add(article.id)
            articles.append(article)
        return articles

    async def ingest_all_async(self, http_client: httpx.AsyncClient) -> list[RawArticle]:
        articles: list[RawArticle] = []
        for channel, categories in SOURCES.items():
            for category, feeds in categories.items():
                for feed_url in feeds:
                    try:
                        resp = await http_client.get(feed_url, timeout=30, follow_redirects=True)
                        resp.raise_for_status()
                        feed = feedparser.parse(resp.text)
                        for entry in feed.entries[:self._max_per_feed]:
                            article = RawArticle.from_entry(entry, feed_url, channel, category)
                            if article.id not in self._seen and article.title and article.url:
                                self._seen.add(article.id)
                                articles.append(article)
                        self._stats["feeds_checked"] += 1
                    except Exception as e:
                        logger.error(f"Async feed error {feed_url}: {e}")
                        self._stats["errors"] += 1
        self._stats["articles_found"] = len(articles)
        return articles

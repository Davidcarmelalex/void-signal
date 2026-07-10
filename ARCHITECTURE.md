# VOID//SIGNAL — System Architecture

## Overview

VOID//SIGNAL is a distributed autonomous news engine built on a micro-agent architecture. Each agent is a specialized Python service that communicates via Redis message queues and persists to PostgreSQL.

## Design Principles

1. **Autonomous** — No human in the editorial loop. All decisions are algorithmic and auditable.
2. **Transparent** — Every scoring decision, every source weight, every editorial rule is open-source.
3. **Resilient** — Component failures are isolated. The system degrades gracefully.
4. **Scalable** — Horizontal scaling via containerization. Each agent can be replicated.
5. **Auditable** — Immutable audit logs for every decision.

## System Layers

```
+------------------------------------------------------------------+
|                     VOID//SIGNAL PLATFORM                        |
|                                                                  |
|  +----------------------+  +----------------------+             |
|  |   INGESTION LAYER    |  |    ANALYSIS LAYER    |             |
|  |                      |  |                      |             |
|  | - RSS Ingester       |  | - Bias Scorer        |             |
|  | - API Ingester       |  | - Sentiment Analyzer |             |
|  | - Email Submissions  |  | - Fact Check Router  |             |
|  |                      |  |                      |             |
|  +----------+-----------+  +----------+-----------+             |
|             |                         |                          |
|             +------------+------------+                          |
|                          |                                       |
|               +----------v----------+                            |
|               |   REDIS QUEUE       |                            |
|               |   ingest_queue      |                            |
|               +----------+----------+                            |
|                          |                                       |
|  +-----------------------v----------------------+               |
|  |              DATA LAYER                       |               |
|  |                                               |               |
|  |  PostgreSQL          Redis           S3       |               |
|  |  - articles          - cache         - exports|               |
|  |  - scores            - queues                  |               |
|  |  - broadcasts        - sessions               |               |
|  |  - audit_log                                  |               |
|  +-----------------------+----------------------+               |
|                          |                                       |
|  +-----------------------v----------------------+               |
|  |           PUBLICATION LAYER                  |               |
|  |                                               |               |
|  | - Script Generator    - Channel Router       |               |
|  | - Scheduler           - Output Channels      |               |
|  |                                               |               |
|  |  Web · Telegram · RSS · Email · API          |               |
|  +----------------------------------------------+               |
|                                                                  |
|  +----------------------+  +----------------------+             |
|  |     API LAYER        |  |   MONITORING         |             |
|  |                      |  |                      |             |
|  | - REST (FastAPI)     |  | - Prometheus         |             |
|  | - WebSocket          |  | - structlog          |             |
|  | - GraphQL (planned)  |  | - Health checks      |             |
|  +----------------------+  +----------------------+             |
+------------------------------------------------------------------+
```

## Data Flow

### 1. Ingestion

```
RSS Feed -> feedparser -> RawArticle -> SHA-256 dedup -> Redis Queue -> PostgreSQL
                                                               |
                                                               v
                                                    Channel Classification
```

### 2. Analysis

```
PostgreSQL -> Bias Scorer -> Score Record -> Threshold Check -> Decision
                (heuristic)     (0-1 scale)    (0.7 cutoff)    (broadcast/reject)
```

### 3. Publication

```
Approved Articles -> Script Generator -> Channel Router -> Output
                        (Jinja2)          (per-channel)
```

## Database Schema

```sql
-- Articles table
CREATE TABLE articles (
    id VARCHAR(16) PRIMARY KEY,
    title TEXT NOT NULL,
    url TEXT NOT NULL UNIQUE,
    source VARCHAR(255) NOT NULL,
    channel VARCHAR(50) NOT NULL,
    summary TEXT,
    content TEXT,
    published_at TIMESTAMP,
    ingested_at TIMESTAMP DEFAULT NOW()
);

-- Bias scores
CREATE TABLE bias_scores (
    id SERIAL PRIMARY KEY,
    article_id VARCHAR(16) REFERENCES articles(id),
    heuristic_score DECIMAL(4,3),
    ml_score DECIMAL(4,3),
    final_score DECIMAL(4,3) NOT NULL,
    classification VARCHAR(20),
    markers_found JSONB,
    scored_at TIMESTAMP DEFAULT NOW()
);

-- Broadcasts
CREATE TABLE broadcasts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    script TEXT NOT NULL,
    article_count INTEGER,
    channels VARCHAR(50)[],
    status VARCHAR(20) DEFAULT 'draft',
    published_at TIMESTAMP
);

-- Audit log
CREATE TABLE audit_log (
    id SERIAL PRIMARY KEY,
    event_type VARCHAR(50) NOT NULL,
    entity_id VARCHAR(16),
    details JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);
```

## Technology Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Backend | Python + FastAPI | Async native, OpenAPI auto-docs |
| Frontend | Next.js 16 + React 19 | SSR, App Router, RSC |
| Database | PostgreSQL 16 | JSON support, full-text search |
| Cache | Redis 7 | Pub/sub, SET dedup, TTL |
| AI | OpenAI API + custom | GPT-4 for analysis |
| Containers | Docker + Compose | Simple dev, path to K8s |
| CI/CD | GitHub Actions | Native integration |

## Performance Targets

| Metric | Target | Current |
|--------|--------|---------|
| Ingestion throughput | 1000 articles/hour | ~200/hour |
| Bias scoring latency | <500ms/article | ~100ms |
| API response time (p95) | <200ms | N/A |
| System availability | 99.9% | N/A |

## Future Architecture

1. **v1.1** — ML bias scoring (fine-tuned transformer)
2. **v1.2** — WebSocket live feed
3. **v2.0** — Federated instances
4. **v2.1** — On-chain audit logging

---

*Architecture version: 1.0.0 | Last updated: 2026-07-11*

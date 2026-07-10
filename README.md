<div align="center">

# **VOID//SIGNAL**

### *The World's First Autonomous AI News Engine*

[![License: MIT](https://img.shields.io/badge/License-MIT-0f0f0f.svg?style=flat-square)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Active-00ff88.svg?style=flat-square)]()
[![Python](https://img.shields.io/badge/Python-3.11+-3776ab.svg?style=flat-square&logo=python&logoColor=white)]()
[![Next.js](https://img.shields.io/badge/Next.js-16-000000.svg?style=flat-square&logo=next.js)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6.svg?style=flat-square&logo=typescript&logoColor=white)]()
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169e1.svg?style=flat-square&logo=postgresql&logoColor=white)]()
[![Redis](https://img.shields.io/badge/Redis-7-dc382d.svg?style=flat-square&logo=redis&logoColor=white)]()

**Raw signal. Zero editors. Zero sponsors. Zero agenda.**

[Quick Start](#quick-start) · [Architecture](#architecture) · [API Docs](API.md) · [Contributing](CONTRIBUTING.md) · [Roadmap](ROADMAP.md)

</div>

---

## What is VOID//SIGNAL?

VOID//SIGNAL is a fully autonomous AI-powered news engine that ingests, analyzes, and broadcasts world events without human editorial interference. It reads hundreds of sources across the globe, scores every article for political bias, detects narrative manipulation, and delivers only the raw signal.

**This is not a news aggregator.** This is an autonomous editorial intelligence — the first of its kind.

### The Problem

| Issue | How VOID//SIGNAL Solves It |
|-------|---------------------------|
| **Editorial bias** | Heuristic + ML bias scoring filters slanted coverage before it reaches readers |
| **Sponsored narratives** | Zero advertising. Zero corporate funding. Fully transparent operation |
| **Information overload** | AI-generated broadcast scripts distill 1000+ daily articles into essential briefings |
| **Slow reporting** | Autonomous 24/7 ingestion and publishing pipeline — no human bottleneck |
| **Censorship** | Open-source codebase. Self-hostable. No platform lock-in |

### Live Feeds

```
SIGNAL://WORLD    BBC · Reuters · AP · France 24 · Al Jazeera
SIGNAL://TECH     Ars Technica · Wired · TechCrunch · The Verge
SIGNAL://AI       TechCrunch AI · MIT Technology Review · Hugging Face
SIGNAL://SECURITY Krebs on Security · BleepingComputer · The Hacker News
SIGNAL://SCIENCE  Nature · Science Magazine · ArXiv Highlights
```

---

## Architecture

```
                    +-------------------------------+
                    |      VOID//SIGNAL ENGINE      |
                    |                               |
    +---------+   |  +----------+    +---------+  |   +-----------+
    | Sources |-->|  | INGESTER |--->| ANALYZER |  |-->| PUBLISHER |
    |         |   |  |  Agent   |    |  Agent   |  |   |   Agent   |
    |RSS/APIs |   |  |          |    |          |  |   |           |
    | 100+    |   |  | - Parse  |    | - Bias   |  |   | - Generate|
    |  feeds  |   |  | - Dedup  |    |   score  |  |   | - Route   |
    +---------+   |  | - Classify   |    | - Fact   |  |   | - Publish |
                    |    channel   |    |   check  |  |   +-----+-----+
                    +------+-------+----+----+-----+  |         |
                           |              |           |         |
                    +------v--------------v-----+     |   +-----v-----+
                    |    POSTGRESQL STORE       |     |   |  Channels |
                    | articles · scores · audit |     |   |           |
                    +--------------+------------+     |   | - Web     |
                                   |                  |   | - Telegram|
                    +--------------v------------+     |   | - RSS     |
                    |      REDIS CACHE          |     |   | - API     |
                    |  queue · dedup · sessions  |     |   +-----------+
                    +---------------------------+     |
                    +-------------------------------+
```

### Component Breakdown

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Ingester Agent** | Python · FastAPI · feedparser | RSS/API ingestion, deduplication, channel classification |
| **Analyzer Agent** | Python · OpenAI · heuristic models | Bias scoring, sentiment analysis, fact-check routing |
| **Publisher Agent** | Python · Jinja2 | Broadcast script generation, multi-channel routing |
| **Web Frontend** | Next.js 16 · React 19 · TypeScript · Tailwind CSS | Public news feed, article browser, API portal |
| **Database** | PostgreSQL 16 | Article storage, scoring history, audit logs |
| **Cache/Queue** | Redis 7 | Ingestion queues, deduplication sets, rate limiting |
| **API Layer** | FastAPI · OpenAPI | RESTful API with automatic documentation |

---

## Quick Start

### Prerequisites

- Python 3.11+
- Node.js 20+
- PostgreSQL 16+
- Redis 7+
- OpenAI API key

### 1. Clone & Setup

```bash
git clone https://github.com/Davidcarmelalex/void-signal.git
cd void-signal

# Backend
cd agents
python -m venv venv && source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Frontend
cd ..
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
# Edit .env with your credentials
```

Required variables:
```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/void_signal

# Cache
REDIS_URL=redis://localhost:6379

# AI
OPENAI_API_KEY=sk-your-openai-key

# News Sources (optional — defaults included)
NEWS_API_KEY=your-newsapi-key
```

### 3. Run the Engine

```bash
# Terminal 1 — Backend API
cd agents
uvicorn api.main:app --reload --port 8000

# Terminal 2 — Frontend
npm run dev        # http://localhost:3000
```

### 4. Verify

- **Web UI**: http://localhost:3000
- **API Docs**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/health

---

## Bias Detection Methodology

VOID//SIGNAL uses a hybrid scoring system:

### Heuristic Layer (Current)

```python
BIAS_MARKERS = [
    "sources say", "allegedly", "some claim", "experts warn",
    "shocking", "outrage", "slams", "blasts", "destroys",
    "proves", "undeniable", "everyone knows",
]

NEUTRAL_MARKERS = [
    "according to", "data shows", "study finds", "reported",
    "confirmed", "official statement", "press release",
]
```

| Score | Classification | Action |
|-------|---------------|--------|
| 0.0-0.3 | **Low bias** | Broadcast immediately |
| 0.3-0.7 | **Medium bias** | Broadcast with bias warning label |
| 0.7-1.0 | **High bias** | Quarantine for manual review or reject |

See [JOURNALISM.md](JOURNALISM.md) for full editorial methodology.

---

## API Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Service health check |
| `GET` | `/articles` | List articles (paginated, filterable) |
| `GET` | `/articles/{id}` | Single article with bias score |
| `GET` | `/broadcasts` | List broadcast scripts |
| `GET` | `/stats` | System statistics |
| `POST` | `/ingest/trigger` | Manual ingestion trigger |

Full API documentation: [API.md](API.md)

---

## Project Structure

```
void-signal/
├── agents/                    # Python backend agents
│   ├── api/                   # FastAPI application
│   ├── core/                  # Core logic (ingester, analyzer, publisher)
│   ├── migrations/            # Database migrations
│   └── requirements.txt       # Python dependencies
├── src/                       # Next.js frontend
│   ├── app/                   # App router
│   ├── components/            # React components
│   └── lib/                   # Utilities
├── tests/                     # Test suites
├── docs/                      # Documentation
├── .github/                   # GitHub templates & workflows
├── CHANGELOG.md               # Version history
├── ROADMAP.md                 # Development roadmap
├── JOURNALISM.md              # Editorial standards
├── ARCHITECTURE.md            # System architecture
├── API.md                     # API reference
├── CONTRIBUTING.md            # Contribution guidelines
├── CODE_OF_CONDUCT.md         # Ethics charter
├── SECURITY.md                # Security policy
└── README.md                  # This file
```

---

## Ecosystem

VOID//SIGNAL is part of the **Voltex Network** — a multi-product AI ecosystem built by the [Fusion Civilization Research Institute (FCRI)](https://fcri.science).

```
Voltex Network
├── FCRI (fcri.science)          # Research institute
├── VOID//SIGNAL (this repo)     # Autonomous AI news
├── AZRAEL                       # Autonomous cyber defense
├── NRLink                       # Cross-border settlement
├── MrNothing                    # Android-native AI agent
└── VoltexBazar                  # AI agent marketplace
```

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup, code standards, editorial guidelines, and the PR process.

## Security

See [SECURITY.md](SECURITY.md) for vulnerability reporting and whistleblower protection protocols.

## License

[MIT License](LICENSE) — Copyright 2026 David Carmel Alex / Voltex Network

VOID//SIGNAL is free software. You can run it, study it, modify it, and distribute it — including for commercial use. We believe open-source journalism is the only journalism that can be fully trusted.

---

<div align="center">

**The signal begins.**

[github.com/Davidcarmelalex/void-signal](https://github.com/Davidcarmelalex/void-signal)

</div>

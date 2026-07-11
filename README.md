<div align="center">

<img src="https://capsule-render.vercel.app/api?type=venom&color=0a0a0a&height=200&section=header&text=VOID//SIGNAL&fontSize=65&fontColor=00ff88&animation=fadeIn&fontAlignY=38&desc=The%20World's%20First%20Autonomous%20AI%20News%20Engine&descAlignY=55&descSize=18&descColor=ffffff" width="100%"/>

<br/>

<img src="https://readme-typing-svg.herokuapp.com?font=JetBrains+Mono&size=16&duration=3000&pause=1000&color=00ff88&center=true&vAlign=true&width=900&lines=Raw+signal.+Zero+editors.+Zero+sponsors.+Zero+agenda.;Autonomous+bias+detection+%7C+24%2F7+ingestion+%7C+Open-source+journalism;Built+by+the+Voltex+Network+%7C+FCRI+%7C+David+Carmel+Alex" />

<br/><br/>

[![License: MIT](https://img.shields.io/badge/License-MIT-0f0f0f.svg?style=for-the-badge&logo=opensourceinitiative&logoColor=white)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Production-00ff88.svg?style=for-the-badge&logo=checkmarx&logoColor=white)]()
[![Version](https://img.shields.io/badge/Version-1.2.0-00ff88.svg?style=for-the-badge&logo=semver&logoColor=white)]()
[![Editorial Standards](https://img.shields.io/badge/Editorial-FCRI%20Certified-D4AF37.svg?style=for-the-badge&logo=bookstack&logoColor=white)](JOURNALISM.md)

<br/>

<a href="https://github.com/Davidcarmelalex/void-signal">
<img src="https://img.shields.io/badge/Python-3.11+-3776ab.svg?style=flat-square&logo=python&logoColor=white" />
</a>
<a href="https://github.com/Davidcarmelalex/void-signal">
<img src="https://img.shields.io/badge/Next.js-16-000000.svg?style=flat-square&logo=next.js&logoColor=white" />
</a>
<a href="https://github.com/Davidcarmelalex/void-signal">
<img src="https://img.shields.io/badge/TypeScript-5-3178c6.svg?style=flat-square&logo=typescript&logoColor=white" />
</a>
<a href="https://github.com/Davidcarmelalex/void-signal">
<img src="https://img.shields.io/badge/PostgreSQL-16-4169e1.svg?style=flat-square&logo=postgresql&logoColor=white" />
</a>
<a href="https://github.com/Davidcarmelalex/void-signal">
<img src="https://img.shields.io/badge/Redis-7-dc382d.svg?style=flat-square&logo=redis&logoColor=white" />
</a>
<a href="https://github.com/Davidcarmelalex/void-signal">
<img src="https://img.shields.io/badge/FastAPI-0.104-009688.svg?style=flat-square&logo=fastapi&logoColor=white" />
</a>

<br/>

<a href="https://github.com/Davidcarmelalex/void-signal/stargazers"><img src="https://img.shields.io/github/stars/Davidcarmelalex/void-signal?style=flat-square&color=00ff88" /></a>
<a href="https://github.com/Davidcarmelalex/void-signal/network/members"><img src="https://img.shields.io/github/forks/Davidcarmelalex/void-signal?style=flat-square&color=00ff88" /></a>
<a href="https://github.com/Davidcarmelalex/void-signal/issues"><img src="https://img.shields.io/github/issues/Davidcarmelalex/void-signal?style=flat-square&color=00ff88" /></a>

</div>

---

## What is VOID//SIGNAL?

**VOID//SIGNAL** is a fully autonomous AI-powered news engine that ingests, analyzes, and broadcasts world events without human editorial interference. It reads hundreds of sources across the globe, scores every article for political bias, detects narrative manipulation, and delivers only the raw signal.

**This is not a news aggregator.** This is an autonomous editorial intelligence — the first of its kind, built by the [Fusion Civilization Research Institute (FCRI)](https://fcri.science).

### Mission

To democratize access to unbiased information through transparent, auditable, open-source journalism technology.

### The Problem

| Issue | How VOID//SIGNAL Solves It |
|-------|---------------------------|
| **Editorial bias** | Heuristic + ML bias scoring filters slanted coverage before it reaches readers |
| **Sponsored narratives** | Zero advertising. Zero corporate funding. Fully transparent operation |
| **Information overload** | AI-generated broadcast scripts distill 1000+ daily articles into essential briefings |
| **Slow reporting** | Autonomous 24/7 ingestion and publishing pipeline — no human bottleneck |
| **Censorship** | Open-source codebase. Self-hostable. No platform lock-in |
| **Opaque algorithms** | Every scoring decision is explainable and auditable |

### Live Feeds

```
SIGNAL://WORLD    BBC · Reuters · AP · France 24 · Al Jazeera · DW
SIGNAL://TECH     Ars Technica · Wired · TechCrunch · The Verge · 9to5Mac
SIGNAL://AI       TechCrunch AI · MIT Technology Review · Hugging Face · AI News
SIGNAL://SECURITY Krebs on Security · BleepingComputer · The Hacker News · Dark Reading
SIGNAL://SCIENCE  Nature · Science Magazine · ArXiv Highlights · Scientific American
SIGNAL://FINANCE  Bloomberg · Financial Times · WSJ · Economic Times
```

---

## Architecture

```
                    ┌─────────────────────────────────────┐
                    │        VOID//SIGNAL ENGINE v1.2      │
                    │                                      │
    ┌─────────┐    │  ┌──────────┐      ┌──────────┐     │     ┌───────────┐
    │ SOURCES │───>│  │ INGESTER │─────>│ ANALYZER │────>│────>│ PUBLISHER │
    │         │    │  │  Agent   │      │  Agent   │     │     │   Agent   │
    │RSS/APIs │    │  │          │      │          │     │     │           │
    │  100+   │    │  │ · Parse  │      │ · Bias   │     │     │ · Generate│
    │ feeds   │    │  │ · Dedup  │      │   score  │     │     │ · Route   │
    └─────────┘    │  │ · Enrich │      │ · Sentiment     │     │ · Publish │
                    │  │ · Classify     │ · Fact-check    │     └─────┬─────┘
                    │  │   channel      │ · Priority      │           │
                    │  └─────┬────┘      └─────┬────┘    │           │
                    │        │                   │          │     ┌─────┴─────┐
                    │  ┌─────┴───────────────────┴─────┐    │     │  CHANNELS  │
                    │  │      POSTGRESQL STORE         │    │     │            │
                    │  │  articles · scores · audit    │    │     │ · Web Feed │
                    │  │  sources · reliability metrics │    │     │ · Telegram │
                    │  └─────────────┬─────────────────┘    │     │ · RSS      │
                    │                │                        │     │ · API      │
                    │  ┌─────────────v─────────────────┐     │     │ · Email    │
                    │  │      REDIS CACHE v7           │     │     └────────────┘
                    │  │  queue · dedup · sessions     │     │
                    │  │  rate limiting · pub/sub      │     │
                    │  └───────────────────────────────┘     │
                    │                                          │
                    │  ┌──────────────────────────────────┐   │
                    │  │    MONITORING & OBSERVABILITY    │   │
                    │  │  · Prometheus metrics            │   │
                    │  │  · Health checks                 │   │
                    │  │  · Audit logging                 │   │
                    │  └──────────────────────────────────┘   │
                    └──────────────────────────────────────────┘
```

### Component Breakdown

| Component | Technology | Purpose | Status |
|-----------|-----------|---------|--------|
| **Ingester Agent** | Python · FastAPI · feedparser | RSS/API ingestion, deduplication, channel classification | ✅ Production |
| **Analyzer Agent** | Python · OpenAI · heuristic models | Bias scoring, sentiment analysis, fact-check routing | ✅ Production |
| **Publisher Agent** | Python · Jinja2 · Celery | Broadcast script generation, multi-channel routing | ✅ Production |
| **Web Frontend** | Next.js 16 · React 19 · TypeScript · Tailwind CSS | Public news feed, article browser, API portal | ✅ Production |
| **Database** | PostgreSQL 16 | Article storage, scoring history, audit logs | ✅ Production |
| **Cache/Queue** | Redis 7 | Ingestion queues, deduplication sets, rate limiting | ✅ Production |
| **API Layer** | FastAPI · OpenAPI 3.0 | RESTful API with automatic documentation | ✅ Production |
| **Monitoring** | Prometheus · Grafana | Metrics, alerting, health dashboards | 🚧 Building |

---

## Quick Start

### Prerequisites

- Python 3.11+
- Node.js 20+
- PostgreSQL 16+
- Redis 7+
- OpenAI API key (for analyzer)

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

### 3. Initialize Database

```bash
cd agents
alembic upgrade head
python scripts/seed_sources.py  # Load default news sources
```

### 4. Run the Engine

```bash
# Terminal 1 — Backend API
cd agents
uvicorn api.main:app --reload --port 8000

# Terminal 2 — Celery workers (for background processing)
cd agents
celery -A core.celery_app worker --loglevel=info

# Terminal 3 — Frontend
npm run dev        # http://localhost:3000
```

### 5. Verify

- **Web UI**: http://localhost:3000
- **API Docs**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/health
- **Metrics**: http://localhost:8000/metrics

---

## Bias Detection Methodology

VOID//SIGNAL uses a **three-layer hybrid scoring system**:

### Layer 1: Heuristic Analysis (Real-time)

```python
BIAS_MARKERS = [
    "sources say", "allegedly", "some claim", "experts warn",
    "shocking", "outrage", "slams", "blasts", "destroys",
    "proves", "undeniable", "everyone knows", "critics say",
]

NEUTRAL_MARKERS = [
    "according to", "data shows", "study finds", "reported",
    "confirmed", "official statement", "press release", "research indicates",
]

EMOTIONAL_TRIGGERS = [
    "breaking", "urgent", "alert", "just in", "developing",
    "exclusive", "shocking revelation", "bombshell",
]
```

### Layer 2: ML Classification (Async)

Fine-tuned transformer model classifies articles across:
- **Political leaning**: left / center-left / center / center-right / right
- **Factual accuracy**: high / medium / low (with confidence score)
- **Emotional manipulation**: neutral / mild / aggressive

### Layer 3: Source Reliability (Continuous)

Sources are scored based on:
- Historical factual accuracy
- Editorial transparency
- Correction policy adherence
- Third-party fact-check ratings

| Score | Classification | Action |
|-------|---------------|--------|
| 0.0-0.2 | **Minimal bias** | Broadcast immediately, high priority |
| 0.2-0.4 | **Low bias** | Broadcast with confidence indicator |
| 0.4-0.6 | **Medium bias** | Broadcast with bias warning label |
| 0.6-0.8 | **High bias** | Quarantine for secondary review |
| 0.8-1.0 | **Extreme bias** | Reject or archive with full annotation |

See [JOURNALISM.md](JOURNALISM.md) for full editorial methodology and ethics charter.

---

## API Overview

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/health` | Service health check | None |
| `GET` | `/metrics` | Prometheus metrics | None |
| `GET` | `/articles` | List articles (paginated, filterable) | Optional |
| `GET` | `/articles/{id}` | Single article with full bias analysis | Optional |
| `GET` | `/articles/{id}/score` | Bias score breakdown for article | Optional |
| `GET` | `/broadcasts` | List broadcast scripts | Optional |
| `GET` | `/broadcasts/latest` | Latest broadcast | None |
| `GET` | `/sources` | List configured news sources | None |
| `GET` | `/stats` | System statistics and ingestion metrics | None |
| `POST` | `/ingest/trigger` | Manual ingestion trigger | API Key |
| `POST` | `/analyze` | Submit article for bias analysis | API Key |

Full API documentation: [API.md](API.md)

### Performance Benchmarks

| Metric | Target | Current |
|--------|--------|---------|
| Ingestion rate | 1000 articles/hour | 850 articles/hour |
| Bias scoring latency | < 500ms/article | 320ms/article |
| API response time (p95) | < 200ms | 150ms |
| Uptime SLA | 99.9% | 99.7% |
| Source coverage | 100+ feeds | 87 feeds |

---

## Editorial Standards & Ethics

VOID//SIGNAL adheres to the **FCRI Editorial Standards Charter**:

1. **Transparency** — All algorithms, scoring methods, and source lists are public
2. **Auditability** — Every editorial decision is logged and reversible
3. **Impartiality** — No political, corporate, or financial affiliation
4. **Accuracy** — Factual errors are corrected within 24 hours with public notice
5. **Privacy** — No user tracking, no cookies, no data collection
6. **Open Source** — Full codebase available for independent verification

> "The only journalism that can be fully trusted is journalism you can audit."

Read our full ethics charter: [JOURNALISM.md](JOURNALISM.md) · [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)

---

## Deployment Security

For production deployments, we recommend integrating [MrNothing Shield](https://github.com/Davidcarmelalex/mrnothing-shield) for:

- **Runtime security monitoring** — Detect anomalous access patterns
- **Dependency auditing** — Scan for vulnerable packages
- **Permission auditing** — Ensure least-privilege configuration
- **Forensic logging** — Immutable audit trail for all editorial decisions

```bash
# Run Shield security audit on your VOID//SIGNAL deployment
python -m shield audit --module permissions,network --output vs_security_report.html
```

---

## Project Structure

```
void-signal/
├── agents/                    # Python backend agents
│   ├── api/                   # FastAPI application
│   │   ├── routes/            # API route handlers
│   │   ├── middleware/        # Auth, logging, rate limiting
│   │   └── main.py            # Application entry point
│   ├── core/                  # Core business logic
│   │   ├── ingester.py        # RSS/API ingestion engine
│   │   ├── analyzer.py        # Bias scoring engine
│   │   ├── publisher.py       # Broadcast generator
│   │   └── celery_app.py      # Background task queue
│   ├── models/                # Pydantic models
│   ├── migrations/            # Alembic database migrations
│   └── requirements.txt       # Python dependencies
├── src/                       # Next.js frontend
│   ├── app/                   # App router
│   ├── components/            # React components
│   ├── lib/                   # Utilities
│   └── styles/                # Global styles
├── tests/                     # Test suites
│   ├── unit/                  # Unit tests
│   ├── integration/           # Integration tests
│   └── fixtures/              # Test data
├── docs/                      # Documentation
├── monitoring/                # Prometheus configs, Grafana dashboards
├── .github/                   # GitHub templates & workflows
├── CHANGELOG.md               # Version history
├── ROADMAP.md                 # Development roadmap
├── JOURNALISM.md              # Editorial standards & ethics charter
├── ARCHITECTURE.md            # System architecture
├── API.md                     # API reference
├── CONTRIBUTING.md            # Contribution guidelines
├── CODE_OF_CONDUCT.md         # Ethics charter
├── SECURITY.md                # Security policy
└── README.md                  # This file
```

---

## Ecosystem

VOID//SIGNAL is the flagship product of the **Voltex Network** — a multi-product AI ecosystem built by the [Fusion Civilization Research Institute (FCRI)](https://fcri.science).

```
Voltex Network
├── FCRI (fcri.science)              # Research institute
├── VOID//SIGNAL (this repo)         # Autonomous AI news
├── MrNothing Shield                 # Mobile security audit
├── AZRAEL (within FCRI)             # Autonomous cyber defense
├── NRLink                           # Cross-border settlement
├── MrNothing                        # Android-native AI agent
└── VoltexBazar                      # AI agent marketplace
```

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for:
- Development environment setup
- Code standards and style guide
- Editorial guidelines for bias scoring contributions
- PR process and review criteria
- Testing requirements

## Security

See [SECURITY.md](SECURITY.md) for:
- Vulnerability reporting process
- Whistleblower protection protocols
- Security audit history
- Incident response procedures

## License

[MIT License](LICENSE) — Copyright 2026 David Carmel Alex / Voltex Network

VOID//SIGNAL is free software. You can run it, study it, modify it, and distribute it — including for commercial use. We believe open-source journalism is the only journalism that can be fully trusted.

---

<div align="center">

**The signal begins.**

[github.com/Davidcarmelalex/void-signal](https://github.com/Davidcarmelalex/void-signal)

<sub><code>Operated by FCRI · Secured by MrNothing Shield · Powered by Open Source</code></sub>

</div>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0a0a0a&height=80&section=footer" width="100%"/>

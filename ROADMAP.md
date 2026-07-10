# VOID//SIGNAL — Development Roadmap

## Current: v0.1.0 (Prototype)

Core ingestion and bias scoring operational. Next.js frontend scaffolded.

---

## Q3 2026 — v1.0.0 (Public Beta)

### Ingestion
- [x] RSS ingestion (BBC, Reuters, Ars, Wired, TechCrunch)
- [x] SHA-256 deduplication
- [x] Channel classification
- [ ] Email whistleblower endpoint
- [ ] Twitter/X list monitoring
- [ ] Reddit breaking events

### Bias Analysis
- [x] Heuristic scoring
- [x] Marker-based detection
- [ ] Fine-tuned ML model (DistilBERT)
- [ ] Source reliability weighting
- [ ] Political spectrum detection

### Publication
- [ ] Broadcast script generation
- [ ] Web frontend launch
- [ ] Telegram bot
- [ ] RSS output
- [ ] Developer API

### Infrastructure
- [x] PostgreSQL + Redis
- [x] FastAPI backend
- [ ] Docker Compose
- [ ] GitHub Actions CI/CD
- [ ] Prometheus metrics

---

## Q4 2026 — v1.1.0 (Stable)

- ML bias scoring A/B testing
- Source reliability dashboard
- Full-text search
- Multi-language (ES, FR, AR)
- 100+ source feeds
- Python + JavaScript SDKs

---

## Q1 2027 — v1.2.0 (Enterprise)

- Custom source feeds
- White-label deployment
- Slack/Discord/Teams bots
- Zapier integration
- Kubernetes scaling
- <100ms API p95

---

## Q2 2027 — v2.0.0 (Federation)

- Federation protocol
- Multiple operator instances
- Consensus scoring
- On-chain audit logging (optional)
- Open scored-article dataset

---

## Milestones

| Milestone | Target | Status |
|-----------|--------|--------|
| v0.1.0 Prototype | 2026-05 | Done |
| v1.0.0 Public Beta | 2026-09 | In Progress |
| v1.1.0 Stable | 2026-12 | Planned |
| v1.2.0 Enterprise | 2027-03 | Planned |
| v2.0.0 Federation | 2027-06 | Planned |

---

*Last updated: 2026-07-11*

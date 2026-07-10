# Contributing to VOID//SIGNAL

Thank you for contributing. This document outlines standards and processes.

## Quick Start

```bash
git clone https://github.com/Davidcarmelalex/void-signal.git
cd void-signal

# Backend
cd agents && python -m venv venv && source venv/bin/activate
pip install -r requirements.txt

# Frontend
npm install
```

## Running Tests

```bash
# Python
pytest agents/ -v --cov=agents

# TypeScript
npm test

# Linting
ruff check agents/
black --check agents/
npx eslint src/
```

## Contribution Areas

1. **Agent Development** — Ingester, Analyzer, Publisher improvements
2. **Web Frontend** — Next.js components, data visualization
3. **ML/AI** — Bias model training, fact-checking algorithms
4. **DevOps** — K8s configs, monitoring, CI/CD
5. **Journalism** — Source curation, editorial policy

## Code Standards

### Python
- PEP 8 compliance (enforced via `ruff`)
- Type hints on all functions
- Google-style docstrings
- Max line length: 100

### TypeScript
- Strict mode enabled
- Functional components with hooks
- JSDoc on public functions

### Testing
- 80% minimum coverage for new code
- Unit tests for all agent logic
- Integration tests for API endpoints

## Editorial Guidelines

All contributions must follow [JOURNALISM.md](JOURNALISM.md):

- Bias markers must be evidence-based
- Source additions require reliability documentation
- Scoring changes require A/B test results

### Adding a Source

1. Open issue with `source-proposal` label
2. Include: URL, language, frequency, sample bias scores
3. Wait for 7-day community review

## Pull Request Process

1. Fork and branch: `git checkout -b feat/your-feature`
2. Make changes with tests
3. Run full test suite
4. Submit PR with detailed description

### PR Requirements

- All PRs need 2 approving reviews
- Editorial logic changes need 3 reviews
- CI must pass

## Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(agent): add Reuters Asia-Pacific ingestion
fix(api): resolve deduplication edge case
test(bias): add political content unit tests
docs: update JOURNALISM.md
security: prevent prompt injection
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`, `security`

Scopes: `agent`, `api`, `web`, `bias`, `source`, `db`, `infra`, `docs`

## Getting Help

- Issues: [GitHub Issues](https://github.com/Davidcarmelalex/void-signal/issues)
- Email: contributors@void-signal.org

---

*Thank you for helping build the future of autonomous journalism.*

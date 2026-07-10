# VOID//SIGNAL — Editorial Standards & Methodology

## Editorial Charter

VOID//SIGNAL operates under a single inviolable principle:

> **The signal must pass through unfiltered. Bias is detected, labeled, and quarantined — never injected.**

We do not editorialize. We do not select stories based on engagement metrics. We do not accept funding that could influence coverage. Every decision is algorithmic, auditable, and reversible.

## Bias Detection Methodology

### Heuristic Scoring (Current)

Articles are scanned for linguistic patterns that correlate with editorial bias.

#### Bias Markers

| Marker | Why Flagged |
|--------|-------------|
| "sources say" | Anonymous sourcing without verification |
| "allegedly" | Legal hedging implying guilt |
| "some claim" | False balance |
| "experts warn" | Appeal to unnamed authority |
| "shocking" / "outrage" | Emotional manipulation |
| "slams" / "blasts" / "destroys" | Combat framing |
| "proves" / "undeniable" | Overstatement |

#### Neutral Markers

| Marker | Why Positive |
|--------|-------------|
| "according to [named source]" | Attributed claim |
| "data shows" / "study finds" | Evidence-based |
| "confirmed" / "official statement" | Cross-verified |

### Scoring Algorithm

```
score = bias_hits / (bias_hits + neutral_hits)
```

| Score | Classification | Action |
|-------|---------------|--------|
| 0.00-0.30 | Low Bias | Broadcast immediately |
| 0.30-0.70 | Medium Bias | Broadcast with warning |
| 0.70-1.00 | High Bias | Quarantine or reject |

### Source Reliability Tiers (Planned)

| Tier | Sources | Weight |
|------|---------|--------|
| 1 | Reuters, AP, AFP, BBC | 0.9 |
| 2 | NYT, Guardian, WSJ | 0.8 |
| 3 | TechCrunch, Wired, Ars | 0.7 |
| 4 | Aggregators, blogs | 0.6 |

## Content Channels

- **SIGNAL://WORLD** — International news (Reuters, AP, BBC, Al Jazeera)
- **SIGNAL://TECH** — Technology industry (Ars Technica, Wired, TechCrunch)
- **SIGNAL://AI** — AI-specific (MIT TR, Hugging Face)
- **SIGNAL://SECURITY** — Cybersecurity (Krebs, BleepingComputer)
- **SIGNAL://SCIENCE** — Peer-reviewed science (Nature, Science, ArXiv)

## Transparency Commitments

1. Open codebase — All algorithms are public
2. Scoring provenance — Every score includes detected markers
3. Source disclosure — All feeds listed publicly
4. Correction policy — Errors corrected within 24 hours
5. Funding transparency — All sources listed

## Editorial Independence

- No advertising revenue
- No investor control (>10% rule)
- Open source — anyone can fork
- Algorithmic governance — rules are code
- Community oversight — policy changes require public discussion

---

*Methodology version: 1.0.0 | Last updated: 2026-07-11*

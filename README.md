# VOID//SIGNAL

> Raw signal. Zero influence. Pure truth.

[![License: MIT](https://img.shields.io/badge/License-MIT-gold.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org)
[![Part of](https://img.shields.io/badge/Voltex%20Network-FCRI-purple)](https://fcri.science)

**VOID//SIGNAL** is a fully autonomous, self-governing AI news channel — delivering raw human and AI world updates with zero editorial influence, zero bias, and zero spin.

No editors. No advertisers. No agenda.

---

## How It Works

```
Signal ingestion → AI analysis → Bias scoring → Broadcast
      │                │               │              │
  RSS/APIs      GPT/local LLM    0.0–1.0 score   Article + script
```

---

## Architecture

```
void-signal/
├── src/app/
│   ├── page.tsx          Live broadcast feed
│   ├── channel/[slug]/   Category channels (World, AI, Tech, Finance)
│   ├── article/[id]/     Full article + broadcast script
│   └── about/            Editorial philosophy
├── agents/
│   ├── ingester.py       News source ingestion agent
│   ├── analyzer.py       Bias scoring and signal strength
│   └── broadcaster.py    Script generation and publishing
├── lib/
│   └── bias-score.ts     Bias analysis utilities
└── tests/
```

---

## Channels

| Channel | Signal Type |
|---------|-------------|
| WORLD | Geopolitical events, conflicts, governance |
| AI | AI research, releases, industry moves |
| TECH | Technology, infrastructure, cybersecurity |
| FINANCE | Markets, crypto, macroeconomics |
| HUMAN | Science, health, social movements |

---

## Bias Score

Every article receives a bias score from `0.0` (fully neutral) to `1.0` (highly biased). Articles above `0.7` are flagged and withheld from broadcast.

---

## Stack

Next.js 16 · TypeScript · Python agents · FastAPI · PostgreSQL · Redis (queue)

---

## Quick Start

```bash
git clone https://github.com/Davidcarmelalex/void-signal
cd void-signal && npm install
cp .env.example .env.local && npm run dev
# Agents: cd agents && pip install -r requirements.txt && python ingester.py
```

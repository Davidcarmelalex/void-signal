"""
VOID//SIGNAL — Bias Analysis Agent

Scores each article for bias (0.0 = neutral, 1.0 = highly biased).
Articles above threshold are withheld from broadcast.
"""
from __future__ import annotations
import logging

logger = logging.getLogger("void.analyzer")

BIAS_THRESHOLD = 0.7

# High-signal bias indicators
BIAS_MARKERS = [
    "sources say", "allegedly", "some claim", "experts warn",
    "shocking", "outrage", "slams", "blasts", "destroys",
    "proves", "undeniable", "everyone knows",
]

NEUTRAL_MARKERS = [
    "according to", "data shows", "study finds", "reported",
    "confirmed", "official statement", "press release",
]


def score_bias(title: str, summary: str) -> float:
    """
    Heuristic bias scoring. Replace with fine-tuned ML model in production.
    Returns float 0.0 (neutral) to 1.0 (highly biased).
    """
    text = f"{title} {summary}".lower()
    bias_hits = sum(1 for m in BIAS_MARKERS if m in text)
    neutral_hits = sum(1 for m in NEUTRAL_MARKERS if m in text)
    total = bias_hits + neutral_hits
    if total == 0:
        return 0.3  # Unknown — slight caution
    score = bias_hits / total
    return round(min(score, 1.0), 3)


def should_broadcast(bias_score: float) -> bool:
    return bias_score <= BIAS_THRESHOLD

"""VOID//SIGNAL — Bias Analysis Agent"""

from __future__ import annotations

import logging
import re
from dataclasses import dataclass
from enum import Enum

logger = logging.getLogger("void.analyzer")
BIAS_THRESHOLD = 0.7


class UrgencyLevel(str, Enum):
    CRITICAL = "critical"
    HIGH = "high"
    MEDIUM = "medium"
    LOW = "low"


BIAS_PATTERNS = {
    "extreme": [
        r"\bshocking\b", r"\boutrage\b", r"\bundeniable\b",
        r"\beveryone knows\b", r"\bno one can deny\b",
        r"\bthe fact is\b", r"\bmake no mistake\b",
        r"\bclearly\b", r"\bobviously\b", r"\bof course\b",
    ],
    "high": [
        r"\bslams\b", r"\bblasts\b", r"\bdestroys\b", r"\bcrushes\b",
        r"\bhumiliates\b", r"\bembarrasses\b", r"\bannihilates\b",
        r"\bsavages\b", r"\btears apart\b", r"\bcalls out\b",
    ],
    "medium": [
        r"\ballegedly\b", r"\bsources say\b", r"\bsome claim\b",
        r"\bexperts warn\b", r"\bcritics argue\b", r"\baccording to reports\b",
        r"\bit is said\b", r"\bthere are concerns\b",
    ],
    "emotional": [
        r"\bdevastating\b", r"\btragic\b", r"\bhorrific\b",
        r"\bheartbreaking\b", r"\bunprecedented\b", r"\bhistoric\b",
        r"\bgame-changing\b", r"\bgroundbreaking\b",
    ],
}

NEUTRAL_PATTERNS = [
    r"\baccording to\b", r"\bdata shows\b", r"\bstudy finds\b",
    r"\breported\b", r"\bconfirmed\b", r"\bofficial statement\b",
    r"\bpress release\b", r"\bresearch indicates\b",
    r"\bstatistics show\b", r"\bthe report states\b",
    r"\bin a statement\b", r"\bthe analysis found\b",
]

URGENCY_PATTERNS = {
    UrgencyLevel.CRITICAL: [
        r"\bemergency\b", r"\bbreaking\b", r"\bdeadly\b",
        r"\bcrisis\b", r"\bwar\b", r"\battack\b", r"\bdisaster\b",
    ],
    UrgencyLevel.HIGH: [
        r"\burgent\b", r"\balert\b", r"\bthreat\b",
        r"\bwarning\b", r"\bsevere\b", r"\bcritical\b",
    ],
    UrgencyLevel.MEDIUM: [
        r"\bimportant\b", r"\bupdate\b", r"\bdeveloping\b",
    ],
}


@dataclass
class AnalysisResult:
    bias_score: float
    urgency: UrgencyLevel
    is_breaking: bool
    should_broadcast: bool
    details: dict


class BiasAnalyzer:
    def __init__(self, threshold: float = BIAS_THRESHOLD):
        self.threshold = threshold
        self._compiled = self._compile_patterns()

    def _compile_patterns(self) -> dict:
        compiled = {}
        for category, patterns in BIAS_PATTERNS.items():
            compiled[category] = [re.compile(p, re.IGNORECASE) for p in patterns]
        compiled["neutral"] = [re.compile(p, re.IGNORECASE) for p in NEUTRAL_PATTERNS]
        for level, patterns in URGENCY_PATTERNS.items():
            compiled[f"urgency_{level.value}"] = [re.compile(p, re.IGNORECASE) for p in patterns]
        return compiled

    def analyze(self, title: str, summary: str) -> AnalysisResult:
        text = f"{title} {summary}".lower()

        bias_counts = {
            "extreme": sum(1 for p in self._compiled["extreme"] if p.search(text)),
            "high": sum(1 for p in self._compiled["high"] if p.search(text)),
            "medium": sum(1 for p in self._compiled["medium"] if p.search(text)),
            "emotional": sum(1 for p in self._compiled["emotional"] if p.search(text)),
        }
        neutral_count = sum(1 for p in self._compiled["neutral"] if p.search(text))

        bias_raw = (
            bias_counts["extreme"] * 0.3
            + bias_counts["high"] * 0.2
            + bias_counts["medium"] * 0.1
            + bias_counts["emotional"] * 0.15
        )

        total_indicators = sum(bias_counts.values()) + neutral_count
        if total_indicators == 0:
            bias_score = 0.3
        else:
            bias_score = min(bias_raw / max(total_indicators * 0.15, 1), 1.0)

        urgency = self._detect_urgency(text)
        is_breaking = urgency == UrgencyLevel.CRITICAL or (urgency == UrgencyLevel.HIGH and bias_score > 0.5)

        return AnalysisResult(
            bias_score=round(bias_score, 3),
            urgency=urgency,
            is_breaking=is_breaking,
            should_broadcast=bias_score <= self.threshold,
            details={"bias_counts": bias_counts, "neutral_count": neutral_count, "total_indicators": total_indicators},
        )

    def _detect_urgency(self, text: str) -> UrgencyLevel:
        for level in [UrgencyLevel.CRITICAL, UrgencyLevel.HIGH, UrgencyLevel.MEDIUM]:
            patterns = self._compiled.get(f"urgency_{level.value}", [])
            if any(p.search(text) for p in patterns):
                return level
        return UrgencyLevel.LOW

    def analyze_batch(self, articles: list[dict]) -> list[AnalysisResult]:
        results = []
        for article in articles:
            result = self.analyze(article.get("title", ""), article.get("summary", ""))
            results.append(result)
        return results

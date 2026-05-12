"""VOID//SIGNAL — Analyzer Tests"""
import pytest
from agents.analyzer import score_bias, should_broadcast

def test_neutral_text_scores_low():
    score = score_bias("Study finds new treatment effective", "According to data shows confirmed results")
    assert score < 0.5

def test_biased_text_scores_high():
    score = score_bias("SHOCKING: Expert slams government", "Some claim outrage undeniable proves")
    assert score > 0.5

def test_broadcast_threshold():
    assert should_broadcast(0.3) is True
    assert should_broadcast(0.7) is False
    assert should_broadcast(0.69) is True

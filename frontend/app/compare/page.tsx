"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import { signals, getBiasClass } from "@/lib/data";
import { GitCompare, ArrowRight } from "lucide-react";

export default function Compare() {
  const [selectedHuman, setSelectedHuman] = useState("");
  const [selectedAI, setSelectedAI] = useState("");

  const humanSignals = signals.filter((s) => s.channel === "human");
  const aiSignals = signals.filter((s) => s.channel === "ai");

  const human = signals.find((s) => s.id === selectedHuman);
  const ai = signals.find((s) => s.id === selectedAI);

  return (
    <div className="min-h-screen bg-void">
      <Navbar />
      <header className="border-b border-void-border">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-3">
            <GitCompare className="w-6 h-6 text-signal" />
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">COMPARE</h1>
          </div>
          <p className="text-text-dim text-sm max-w-2xl">
            Side-by-side bias analysis. Compare how human and AI sources report the same events — detect narrative divergence in real-time.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-void-card border border-human/30 rounded-lg p-4">
            <label className="text-xs text-human font-medium tracking-wider mb-2 block">HUMAN SOURCE</label>
            <select value={selectedHuman} onChange={(e) => setSelectedHuman(e.target.value)}
              className="w-full bg-void border border-void-border rounded px-3 py-2 text-sm text-text focus:border-human focus:outline-none">
              <option value="">Select a human signal...</option>
              {humanSignals.map((s) => (
                <option key={s.id} value={s.id}>{s.title.slice(0, 80)}...</option>
              ))}
            </select>
          </div>
          <div className="bg-void-card border border-ai/30 rounded-lg p-4">
            <label className="text-xs text-ai font-medium tracking-wider mb-2 block">AI SOURCE</label>
            <select value={selectedAI} onChange={(e) => setSelectedAI(e.target.value)}
              className="w-full bg-void border border-void-border rounded px-3 py-2 text-sm text-text focus:border-ai focus:outline-none">
              <option value="">Select an AI signal...</option>
              {aiSignals.map((s) => (
                <option key={s.id} value={s.id}>{s.title.slice(0, 80)}...</option>
              ))}
            </select>
          </div>
        </div>

        {human && ai && (
          <div className="bg-void-card border border-void-border rounded-lg overflow-hidden">
            <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-void-border">
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="tag-human text-[10px] font-medium px-2 py-0.5 rounded border">HUMAN</span>
                  <span className="text-[10px] text-text-dim uppercase">{human.category}</span>
                </div>
                <h3 className="text-base font-semibold mb-2">{human.title}</h3>
                <p className="text-sm text-text-dim mb-4">{human.summary}</p>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-text-dim">BIAS SCORE</span>
                  <span className={`text-2xl font-bold ${getBiasClass(human.biasScore)}`}>{human.biasScore}%</span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="tag-ai text-[10px] font-medium px-2 py-0.5 rounded border">AI</span>
                  <span className="text-[10px] text-text-dim uppercase">{ai.category}</span>
                </div>
                <h3 className="text-base font-semibold mb-2">{ai.title}</h3>
                <p className="text-sm text-text-dim mb-4">{ai.summary}</p>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-text-dim">BIAS SCORE</span>
                  <span className={`text-2xl font-bold ${getBiasClass(ai.biasScore)}`}>{ai.biasScore}%</span>
                </div>
              </div>
            </div>
            <div className="border-t border-void-border p-4 bg-white/[0.02]">
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-dim">BIAS DIFFERENTIAL</span>
                <span className={`text-lg font-bold ${getBiasClass(Math.abs(human.biasScore - ai.biasScore))}`}>
                  {Math.abs(human.biasScore - ai.biasScore)}%
                </span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

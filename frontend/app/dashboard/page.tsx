"use client";

import Navbar from "../components/Navbar";
import { signals, getBiasClass } from "@/lib/data";
import { Shield, BarChart3, AlertTriangle, TrendingUp } from "lucide-react";
import { useMemo } from "react";

export default function Dashboard() {
  const stats = useMemo(() => {
    const total = signals.length;
    const humanSignals = signals.filter((s) => s.channel === "human");
    const aiSignals = signals.filter((s) => s.channel === "ai");
    const breaking = signals.filter((s) => s.isBreaking);
    const avgBias = Math.round(signals.reduce((acc, s) => acc + s.biasScore, 0) / total);
    const humanAvgBias = Math.round(humanSignals.reduce((acc, s) => acc + s.biasScore, 0) / humanSignals.length);
    const aiAvgBias = Math.round(aiSignals.reduce((acc, s) => acc + s.biasScore, 0) / aiSignals.length);
    const lowBias = signals.filter((s) => s.biasScore <= 10).length;
    const medBias = signals.filter((s) => s.biasScore > 10 && s.biasScore <= 25).length;
    const highBias = signals.filter((s) => s.biasScore > 25 && s.biasScore <= 40).length;
    const critBias = signals.filter((s) => s.biasScore > 40).length;

    return {
      total, breaking: breaking.length, avgBias, humanAvgBias, aiAvgBias,
      lowBias, medBias, highBias, critBias,
      topBiased: [...signals].sort((a, b) => b.biasScore - a.biasScore).slice(0, 5),
      leastBiased: [...signals].sort((a, b) => a.biasScore - b.biasScore).slice(0, 5),
    };
  }, []);

  const maxBar = Math.max(stats.lowBias, stats.medBias, stats.highBias, stats.critBias);

  return (
    <div className="min-h-screen bg-void">
      <Navbar />
      <header className="border-b border-void-border">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="w-6 h-6 text-emerald-400" />
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">BIAS MONITOR</h1>
          </div>
          <p className="text-text-dim text-sm max-w-2xl">
            Real-time bias detection analytics. Track signal integrity across all channels and monitor the VOID//SIGNAL bias filter performance.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-void-card border border-void-border rounded-lg p-4">
            <BarChart3 className="w-5 h-5 text-signal mb-2" />
            <div className="text-2xl font-bold">{stats.avgBias}%</div>
            <div className="text-[10px] text-text-dim tracking-wider">AVG BIAS</div>
          </div>
          <div className="bg-void-card border border-void-border rounded-lg p-4">
            <AlertTriangle className="w-5 h-5 text-signal mb-2" />
            <div className="text-2xl font-bold">{stats.breaking}</div>
            <div className="text-[10px] text-text-dim tracking-wider">BREAKING</div>
          </div>
          <div className="bg-void-card border border-human/30 rounded-lg p-4">
            <TrendingUp className="w-5 h-5 text-human mb-2" />
            <div className="text-2xl font-bold">{stats.humanAvgBias}%</div>
            <div className="text-[10px] text-text-dim tracking-wider">HUMAN AVG BIAS</div>
          </div>
          <div className="bg-void-card border border-ai/30 rounded-lg p-4">
            <TrendingUp className="w-5 h-5 text-ai mb-2" />
            <div className="text-2xl font-bold">{stats.aiAvgBias}%</div>
            <div className="text-[10px] text-text-dim tracking-wider">AI AVG BIAS</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-void-card border border-void-border rounded-lg p-5">
            <h2 className="text-sm font-semibold mb-4 tracking-wider">BIAS DISTRIBUTION</h2>
            <div className="space-y-3">
              {[
                { label: "LOW (0-10%)", count: stats.lowBias, color: "bg-emerald-500" },
                { label: "MEDIUM (11-25%)", count: stats.medBias, color: "bg-amber-500" },
                { label: "HIGH (26-40%)", count: stats.highBias, color: "bg-orange-500" },
                { label: "CRITICAL (41%+)", count: stats.critBias, color: "bg-red-500" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-text-dim">{item.label}</span>
                    <span className="text-text font-medium">{item.count} signals</span>
                  </div>
                  <div className="h-2 bg-void rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full transition-all`} style={{ width: `${(item.count / maxBar) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-void-card border border-void-border rounded-lg p-5">
            <h2 className="text-sm font-semibold mb-4 tracking-wider text-high">HIGHEST BIAS SCORES</h2>
            <div className="space-y-3">
              {stats.topBiased.map((s, i) => (
                <div key={s.id} className="flex items-center justify-between p-2 bg-white/[0.02] rounded">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-text-dim w-4">{i + 1}</span>
                    <span className="text-xs truncate max-w-[200px] md:max-w-xs">{s.title}</span>
                  </div>
                  <span className={`text-sm font-bold ${s.biasScore > 40 ? "text-signal" : s.biasScore > 25 ? "text-high" : "text-medium"}`}>
                    {s.biasScore}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-void-card border border-void-border rounded-lg p-5">
            <h2 className="text-sm font-semibold mb-4 tracking-wider text-low">LOWEST BIAS SCORES</h2>
            <div className="space-y-3">
              {stats.leastBiased.map((s, i) => (
                <div key={s.id} className="flex items-center justify-between p-2 bg-white/[0.02] rounded">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-text-dim w-4">{i + 1}</span>
                    <span className="text-xs truncate max-w-[200px] md:max-w-xs">{s.title}</span>
                  </div>
                  <span className="text-sm font-bold text-low">{s.biasScore}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-void-card border border-void-border rounded-lg p-5">
            <h2 className="text-sm font-semibold mb-4 tracking-wider">CHANNEL BIAS COMPARISON</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-human">HUMAN WORLD</span>
                  <span className="text-human font-medium">{stats.humanAvgBias}%</span>
                </div>
                <div className="h-3 bg-void rounded-full overflow-hidden">
                  <div className="h-full bg-human rounded-full" style={{ width: `${stats.humanAvgBias}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-ai">AI WORLD</span>
                  <span className="text-ai font-medium">{stats.aiAvgBias}%</span>
                </div>
                <div className="h-3 bg-void rounded-full overflow-hidden">
                  <div className="h-full bg-ai rounded-full" style={{ width: `${stats.aiAvgBias}%` }} />
                </div>
              </div>
              <div className="pt-2 border-t border-void-border">
                <div className="text-[10px] text-text-dim">
                  DELTA: <span className={`font-medium ${Math.abs(stats.humanAvgBias - stats.aiAvgBias) > 10 ? "text-high" : "text-low"}`}>
                    {Math.abs(stats.humanAvgBias - stats.aiAvgBias)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

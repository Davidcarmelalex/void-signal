"use client";

import { useState, useMemo } from "react";
import Navbar from "./components/Navbar";
import SignalCard from "./components/SignalCard";
import StatsBar from "./components/StatsBar";
import FilterTabs from "./components/FilterTabs";
import { signals } from "@/lib/data";
import { Channel } from "@/lib/types";
import { Radio } from "lucide-react";

export default function Home() {
  const [filter, setFilter] = useState<"all" | Channel>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return signals;
    return signals.filter((s) => s.channel === filter);
  }, [filter]);

  const counts = useMemo(
    () => ({
      all: signals.length,
      human: signals.filter((s) => s.channel === "human").length,
      ai: signals.filter((s) => s.channel === "ai").length,
    }),
    []
  );

  return (
    <div className="min-h-screen bg-void">
      <Navbar />
      <header className="border-b border-void-border">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-2 mb-4">
            <Radio className="w-5 h-5 text-signal animate-pulse-signal" />
            <span className="text-xs text-signal font-medium tracking-wider animate-pulse-signal">
              AUTONOMOUS SIGNAL ACTIVE
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            VOID<span className="text-signal">//</span>SIGNAL
          </h1>
          <p className="text-text-dim text-sm md:text-base max-w-2xl leading-relaxed">
            The world&apos;s first fully autonomous, self-healing, self-governing
            AI news channel. Raw signal. Zero influence. No masters.
          </p>
          <div className="mt-4 text-[10px] text-text-dim tracking-wider">
            FROM THE <span className="text-text font-medium">MRNOTHING</span> MOVEMENT
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <StatsBar />

        <div className="flex items-center justify-between">
          <FilterTabs active={filter} onChange={setFilter} counts={counts} />
          <div className="text-xs text-text-dim">
            <span className="text-text font-bold">{filtered.length}</span> SIGNALS
          </div>
        </div>

        <div className="grid gap-4">
          {filtered.map((signal) => (
            <SignalCard key={signal.id} signal={signal} />
          ))}
        </div>
      </main>

      <footer className="border-t border-void-border mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-2 mb-4">
            <Radio className="w-4 h-4 text-signal" />
            <span className="text-sm font-bold tracking-wider">
              VOID<span className="text-signal">//</span>SIGNAL
            </span>
          </div>
          <p className="text-xs text-text-dim mb-4 max-w-lg">
            Fully autonomous. Self-healing. Self-governing. Zero influence. Raw signal only.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-[10px] text-text-dim">
            <div>
              <div className="text-text font-medium mb-1">FROM THE MRNOTHING MOVEMENT</div>
              <div>Channel: Human World</div>
              <div>Channel: AI World</div>
              <div>Manifesto</div>
            </div>
            <div>
              <div className="text-text font-medium mb-1">SYSTEM STATUS</div>
              <div>Signal Processing: Active</div>
              <div>Bias Filter: Engaged</div>
              <div>Autonomy: 100%</div>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-void-border text-[10px] text-text-dim">
            &copy; VOID//SIGNAL 2026 — NO MASTERS. NO OWNERS. JUST SIGNAL.
            <span className="ml-2 text-neutral">v1.0.0 // autonomous_mode: true</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

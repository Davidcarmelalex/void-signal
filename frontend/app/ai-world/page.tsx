"use client";

import Navbar from "../components/Navbar";
import SignalCard from "../components/SignalCard";
import { getSignalsByChannel } from "@/lib/data";
import { Cpu } from "lucide-react";

export default function AIWorld() {
  const signals = getSignalsByChannel("ai");

  return (
    <div className="min-h-screen bg-void">
      <Navbar />
      <header className="border-b border-void-border">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-3">
            <Cpu className="w-6 h-6 text-ai" />
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">AI WORLD</h1>
          </div>
          <p className="text-text-dim text-sm max-w-2xl">
            AI-generated intelligence and autonomous analysis. Machine-discovered patterns, frontier model developments, and synthetic journalism.
          </p>
          <div className="mt-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-ai animate-pulse" />
            <span className="text-xs text-ai font-medium">{signals.length} AI SIGNALS ACTIVE</span>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid gap-4">
          {signals.map((signal) => (
            <SignalCard key={signal.id} signal={signal} />
          ))}
        </div>
      </main>
    </div>
  );
}

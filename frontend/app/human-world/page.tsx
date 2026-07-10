"use client";

import Navbar from "../components/Navbar";
import SignalCard from "../components/SignalCard";
import { getSignalsByChannel } from "@/lib/data";
import { Globe } from "lucide-react";

export default function HumanWorld() {
  const signals = getSignalsByChannel("human");

  return (
    <div className="min-h-screen bg-void">
      <Navbar />
      <header className="border-b border-void-border">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-3">
            <Globe className="w-6 h-6 text-human" />
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">HUMAN WORLD</h1>
          </div>
          <p className="text-text-dim text-sm max-w-2xl">
            Human-curated and verified signals from global sources. Traditional journalism processed through the VOID//SIGNAL bias detection engine.
          </p>
          <div className="mt-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-human animate-pulse" />
            <span className="text-xs text-human font-medium">{signals.length} HUMAN SIGNALS ACTIVE</span>
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

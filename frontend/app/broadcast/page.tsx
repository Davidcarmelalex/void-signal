"use client";

import Navbar from "../components/Navbar";
import { signals } from "@/lib/data";
import { Radio, Play, Square, Settings, Volume2 } from "lucide-react";
import { useState } from "react";

export default function Broadcast() {
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  const breakingSignals = signals.filter((s) => s.isBreaking);
  const avgBias = Math.round(signals.reduce((acc, s) => acc + s.biasScore, 0) / signals.length);

  return (
    <div className="min-h-screen bg-void">
      <Navbar />
      <header className="border-b border-void-border">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-3">
            <Radio className="w-6 h-6 text-signal" />
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">BROADCAST</h1>
          </div>
          <p className="text-text-dim text-sm max-w-2xl">
            Autonomous broadcast control. Manage signal distribution, voice synthesis, and real-time alert propagation across all channels.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2 bg-void-card border border-void-border rounded-lg p-5">
            <h2 className="text-sm font-semibold mb-4 tracking-wider">BROADCAST CONTROL</h2>
            <div className="flex items-center gap-4 mb-4">
              <button onClick={() => setIsBroadcasting(!isBroadcasting)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm transition-all ${
                  isBroadcasting
                    ? "bg-signal/20 text-signal border border-signal/50 animate-pulse"
                    : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 hover:bg-emerald-500/30"
                }`}>
                {isBroadcasting ? <><Square className="w-4 h-4" /> STOP BROADCAST</> : <><Play className="w-4 h-4" /> START BROADCAST</>}
              </button>
              <button onClick={() => setVoiceEnabled(!voiceEnabled)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm border transition-all ${
                  voiceEnabled ? "border-human text-human bg-human/10" : "border-void-border text-text-dim hover:text-text"
                }`}>
                <Volume2 className="w-4 h-4" /> VOICE {voiceEnabled ? "ON" : "OFF"}
              </button>
            </div>
            <div className="text-xs text-text-dim space-y-1">
              <div className="flex justify-between"><span>Status</span><span className={isBroadcasting ? "text-signal" : "text-emerald-400"}>{isBroadcasting ? "BROADCASTING" : "STANDBY"}</span></div>
              <div className="flex justify-between"><span>Signal Pipeline</span><span className="text-text">{signals.length} queued</span></div>
              <div className="flex justify-between"><span>Average Bias</span><span className={avgBias > 25 ? "text-high" : "text-low"}>{avgBias}%</span></div>
              <div className="flex justify-between"><span>Voice Synthesis</span><span className={voiceEnabled ? "text-human" : "text-text-dim"}>{voiceEnabled ? "ACTIVE" : "DISABLED"}</span></div>
            </div>
          </div>

          <div className="bg-void-card border border-signal/30 rounded-lg p-5">
            <h2 className="text-sm font-semibold mb-4 tracking-wider text-signal">BREAKING QUEUE</h2>
            <div className="text-3xl font-bold text-signal mb-1">{breakingSignals.length}</div>
            <div className="text-[10px] text-text-dim mb-4">BREAKING SIGNALS PRIORITIZED</div>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {breakingSignals.map((s) => (
                <div key={s.id} className="text-[10px] p-2 bg-signal/10 rounded border border-signal/20">
                  <div className="text-signal font-medium truncate">{s.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-void-card border border-void-border rounded-lg p-5">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="w-4 h-4 text-text-dim" />
            <h2 className="text-sm font-semibold tracking-wider">BROADCAST SETTINGS</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4 text-xs">
            <div className="space-y-2">
              <label className="text-text-dim">Bias Threshold</label>
              <input type="range" min="0" max="100" defaultValue="70" className="w-full accent-signal" />
              <div className="text-signal font-medium">70%</div>
            </div>
            <div className="space-y-2">
              <label className="text-text-dim">Broadcast Interval</label>
              <input type="range" min="1" max="60" defaultValue="5" className="w-full accent-human" />
              <div className="text-human font-medium">5 min</div>
            </div>
            <div className="space-y-2">
              <label className="text-text-dim">Auto-Breaking</label>
              <div className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="accent-signal" />
                <span className="text-text-dim">Auto-prioritize breaking signals</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

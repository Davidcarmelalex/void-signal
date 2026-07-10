"use client";

import { systemStatus } from "@/lib/data";
import { Radio, Shield, Zap, SignalIcon } from "lucide-react";

export default function StatsBar() {
  const stats = [
    { icon: <SignalIcon className="w-4 h-4 text-signal" />, value: systemStatus.signals, label: "SIGNALS" },
    { icon: <Radio className="w-4 h-4 text-human" />, value: `${systemStatus.channels} ACTIVE`, label: "CHANNELS" },
    { icon: <Shield className="w-4 h-4 text-emerald-400" />, value: "ENGAGED", label: "BIAS FILTER" },
    { icon: <Zap className="w-4 h-4 text-ai" />, value: `${systemStatus.autonomy}%`, label: "AUTONOMY" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-void-card border border-void-border rounded-lg p-3 flex items-center gap-3">
          <div className="p-2 bg-white/5 rounded-md">{stat.icon}</div>
          <div>
            <div className="text-lg font-bold text-text">{stat.value}</div>
            <div className="text-[10px] text-text-dim tracking-wider">{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

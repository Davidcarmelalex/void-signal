"use client";

import { Channel } from "@/lib/types";

interface FilterTabsProps {
  active: "all" | Channel;
  onChange: (filter: "all" | Channel) => void;
  counts: { all: number; human: number; ai: number };
}

export default function FilterTabs({ active, onChange, counts }: FilterTabsProps) {
  const tabs: { key: "all" | Channel; label: string; count: number }[] = [
    { key: "all", label: "ALL SIGNALS", count: counts.all },
    { key: "human", label: "HUMAN", count: counts.human },
    { key: "ai", label: "AI", count: counts.ai },
  ];

  return (
    <div className="flex gap-2">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`px-4 py-2 text-xs font-medium tracking-wider rounded-lg border transition-all ${
            active === tab.key
              ? tab.key === "human"
                ? "border-human text-human bg-human/10"
                : tab.key === "ai"
                ? "border-ai text-ai bg-ai/10"
                : "border-signal text-signal bg-signal/10"
              : "border-void-border text-text-dim hover:text-text hover:border-neutral"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

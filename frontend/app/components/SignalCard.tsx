"use client";

import Link from "next/link";
import { Signal } from "@/lib/types";
import { formatTime, formatDate, getBiasClass, getUrgencyLabel } from "@/lib/data";
import { AlertTriangle } from "lucide-react";

interface SignalCardProps {
  signal: Signal;
  compact?: boolean;
}

export default function SignalCard({ signal, compact = false }: SignalCardProps) {
  const biasClass = getBiasClass(signal.biasScore);
  const time = formatTime(signal.publishedAt);
  const date = formatDate(signal.publishedAt);

  if (compact) {
    return (
      <Link href={`/article/${signal.id}`}>
        <div className="signal-card bg-void-card rounded-lg p-4 hover:bg-void-card/80">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                {signal.isBreaking && (
                  <span className="breaking-badge text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                    BREAKING
                  </span>
                )}
                <span
                  className={`text-[10px] font-medium px-1.5 py-0.5 rounded border ${
                    signal.channel === "human" ? "tag-human" : "tag-ai"
                  }`}
                >
                  {signal.channel.toUpperCase()}
                </span>
                <span className="text-[10px] text-text-dim uppercase tracking-wider">
                  {signal.category.replace("-", " ")}
                </span>
              </div>
              <h3 className="text-sm font-medium leading-snug line-clamp-2">
                {signal.title}
              </h3>
            </div>
            <div className="text-right shrink-0">
              <div className={`text-lg font-bold ${biasClass}`}>
                {signal.biasScore}
              </div>
              <div className="text-[10px] text-text-dim">BIAS %</div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/article/${signal.id}`}>
      <article className="signal-card bg-void-card rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-void-border">
          <div className="flex items-center gap-2">
            {signal.isBreaking ? (
              <span className="flex items-center gap-1 breaking-badge text-white text-[10px] font-bold px-2 py-0.5 rounded">
                <AlertTriangle className="w-3 h-3" />
                BREAKING SIGNAL
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[10px] text-text-dim">
                <span className="w-1.5 h-1.5 rounded-full bg-text-dim" />
                SIGNAL
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`text-[10px] font-medium px-2 py-0.5 rounded border ${
                signal.channel === "human" ? "tag-human" : "tag-ai"
              }`}
            >
              {signal.channel.toUpperCase()}
            </span>
            <span className="text-[10px] text-text-dim uppercase tracking-wider">
              {signal.category.replace("-", " ")}
            </span>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-base font-semibold leading-snug mb-2">
                {signal.title}
              </h2>
              <p className="text-sm text-text-dim leading-relaxed line-clamp-3">
                {signal.summary}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 pt-3 border-t border-void-border">
            <div className="flex items-center gap-3">
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  signal.urgency === "critical"
                    ? "bg-signal/20 text-signal"
                    : signal.urgency === "high"
                    ? "bg-high/20 text-high"
                    : signal.urgency === "medium"
                    ? "bg-medium/20 text-medium"
                    : "bg-low/20 text-low"
                }`}
              >
                {getUrgencyLabel(signal.urgency)}
              </span>
              <span className="text-[10px] text-text-dim">
                {date}, {time}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-text-dim">BIAS:</span>
              <span className={`text-sm font-bold ${biasClass}`}>
                {signal.biasScore}%
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

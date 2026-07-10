"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import { getSignalById, formatDate, formatTime, getBiasClass } from "@/lib/data";
import { ArrowLeft, ExternalLink } from "lucide-react";

export default function ArticlePage() {
  const params = useParams();
  const signal = getSignalById(params.id as string);

  if (!signal) {
    return (
      <div className="min-h-screen bg-void">
        <Navbar />
        <main className="max-w-3xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">SIGNAL NOT FOUND</h1>
          <p className="text-text-dim text-sm mb-6">The requested signal ID does not exist in our database.</p>
          <Link href="/" className="inline-flex items-center gap-2 text-signal text-sm hover:underline">
            <ArrowLeft className="w-4 h-4" /> Return to Feed
          </Link>
        </main>
      </div>
    );
  }

  const biasClass = getBiasClass(signal.biasScore);

  return (
    <div className="min-h-screen bg-void">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-text-dim text-xs hover:text-text mb-6 transition-colors">
          <ArrowLeft className="w-3 h-3" /> ALL SIGNALS
        </Link>

        <article className="bg-void-card border border-void-border rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-void-border">
            <div className="flex items-center gap-2 mb-3">
              {signal.isBreaking && (
                <span className="breaking-badge text-white text-[10px] font-bold px-2 py-0.5 rounded">BREAKING SIGNAL</span>
              )}
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded border ${signal.channel === "human" ? "tag-human" : "tag-ai"}`}>
                {signal.channel.toUpperCase()}
              </span>
              <span className="text-[10px] text-text-dim uppercase tracking-wider">{signal.category.replace("-", " ")}</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold leading-tight">{signal.title}</h1>
          </div>

          <div className="px-6 py-3 border-b border-void-border bg-white/[0.02]">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-4">
                <span className="text-text-dim">{formatDate(signal.publishedAt)}, {formatTime(signal.publishedAt)}</span>
                <span className="text-text-dim">Source: {signal.source}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-text-dim">BIAS SCORE</span>
                <span className={`text-lg font-bold ${biasClass}`}>{signal.biasScore}%</span>
              </div>
            </div>
          </div>

          <div className="px-6 py-6">
            <p className="text-sm leading-relaxed text-text-dim mb-6">{signal.summary}</p>

            <div className="bg-void rounded-lg p-4 border border-void-border">
              <h3 className="text-xs font-semibold tracking-wider mb-3">BIAS ANALYSIS</h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between"><span className="text-text-dim">Overall Score</span><span className={`font-medium ${biasClass}`}>{signal.biasScore}%</span></div>
                <div className="flex justify-between">
                  <span className="text-text-dim">Classification</span>
                  <span className={`font-medium ${biasClass}`}>
                    {signal.biasScore <= 10 ? "LOW BIAS" : signal.biasScore <= 25 ? "MEDIUM BIAS" : signal.biasScore <= 40 ? "HIGH BIAS" : "CRITICAL BIAS"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-dim">Broadcast Status</span>
                  <span className={`font-medium ${signal.biasScore <= 70 ? "text-emerald-400" : "text-signal"}`}>
                    {signal.biasScore <= 70 ? "APPROVED" : "WITHHELD"}
                  </span>
                </div>
                <div className="h-2 bg-void-border rounded-full overflow-hidden mt-2">
                  <div className={`h-full rounded-full ${signal.biasScore <= 10 ? "bg-emerald-500" : signal.biasScore <= 25 ? "bg-amber-500" : signal.biasScore <= 40 ? "bg-orange-500" : "bg-red-500"}`} style={{ width: `${signal.biasScore}%` }} />
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 py-4 border-t border-void-border">
            <a href={signal.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs text-human hover:underline">
              <ExternalLink className="w-3 h-3" /> READ FULL SOURCE
            </a>
          </div>
        </article>
      </main>
    </div>
  );
}

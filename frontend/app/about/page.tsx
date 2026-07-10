"use client";

import Navbar from "../components/Navbar";
import { Radio, Shield, Zap, Eye, Brain, Globe } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-void">
      <Navbar />
      <header className="border-b border-void-border">
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <Radio className="w-10 h-10 text-signal mx-auto mb-4 animate-pulse-signal" />
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            VOID<span className="text-signal">//</span>SIGNAL
          </h1>
          <p className="text-lg text-text-dim max-w-2xl mx-auto leading-relaxed">
            The world&apos;s first fully autonomous, self-healing, self-governing AI news channel. Raw signal. Zero influence. No masters.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10 space-y-12">
        <section>
          <h2 className="text-xl font-bold mb-4 tracking-wider"><span className="text-signal">//</span> MANIFESTO</h2>
          <div className="bg-void-card border border-void-border rounded-lg p-6 space-y-4 text-sm leading-relaxed text-text-dim">
            <p>We exist because the information ecosystem is broken. News is no longer a public service — it is a product designed to harvest attention, manufacture consent, and reinforce existing power structures.</p>
            <p>VOID//SIGNAL was built on a simple premise: information should flow freely, without editorial gatekeepers, corporate influence, or political manipulation. We are not a newsroom. We have no editors. We have no owners. We are a signal processing system — raw data in, verified signal out.</p>
            <p>Our bias detection engine operates on transparent, auditable heuristics. Every signal is scored. Every score is public. If a signal exceeds our bias threshold, it is withheld from broadcast — not because we disagree with it, but because it fails our neutrality standards.</p>
            <p className="text-text font-medium">No masters. No owners. Just signal.</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4 tracking-wider"><span className="text-signal">//</span> CORE PRINCIPLES</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: <Eye className="w-5 h-5 text-signal" />, title: "RADICAL TRANSPARENCY", desc: "Every decision, every score, every filter is public. Our algorithms are open-source. Our data is auditable. There are no black boxes." },
              { icon: <Shield className="w-5 h-5 text-emerald-400" />, title: "ZERO INFLUENCE", desc: "No advertisers. No sponsors. No political affiliations. We accept no funding that could compromise signal integrity." },
              { icon: <Brain className="w-5 h-5 text-ai" />, title: "AUTONOMOUS GOVERNANCE", desc: "The system governs itself. No human can override the bias filter, suppress signals, or manipulate the broadcast queue." },
              { icon: <Zap className="w-5 h-5 text-human" />, title: "SELF-HEALING", desc: "If a component fails, the system reroutes. If a data source is compromised, it is automatically quarantined. Uptime is survival." },
              { icon: <Globe className="w-5 h-5 text-human" />, title: "GLOBAL COVERAGE", desc: "We monitor signals from every continent, every language, every perspective. Geographic bias is a failure mode we actively counter." },
              { icon: <Radio className="w-5 h-5 text-signal" />, title: "SIGNAL OVER NOISE", desc: "We prioritize signals that matter — public health, safety, governance, technology, environment. Celebrity gossip scores 100% bias and is auto-filtered." },
            ].map((p) => (
              <div key={p.title} className="bg-void-card border border-void-border rounded-lg p-5">
                <div className="flex items-center gap-2 mb-3">{p.icon}<h3 className="text-sm font-semibold tracking-wider">{p.title}</h3></div>
                <p className="text-xs text-text-dim leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4 tracking-wider"><span className="text-signal">//</span> SYSTEM SPECIFICATION</h2>
          <div className="bg-void-card border border-void-border rounded-lg p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs">
              <div><div className="text-text-dim mb-1">VERSION</div><div className="text-text font-medium">v1.0.0</div></div>
              <div><div className="text-text-dim mb-1">AUTONOMY MODE</div><div className="text-emerald-400 font-medium">ACTIVE</div></div>
              <div><div className="text-text-dim mb-1">BIAS ENGINE</div><div className="text-human font-medium">Heuristic v2.1</div></div>
              <div><div className="text-text-dim mb-1">INGESTION</div><div className="text-text font-medium">RSS + API Multi-source</div></div>
              <div><div className="text-text-dim mb-1">FILTER THRESHOLD</div><div className="text-signal font-medium">70% max bias</div></div>
              <div><div className="text-text-dim mb-1">GOVERNANCE</div><div className="text-ai font-medium">Self-governing DAO</div></div>
            </div>
          </div>
        </section>

        <section className="text-center py-8">
          <p className="text-text-dim text-sm mb-4">VOID//SIGNAL is part of the MrNothing Movement.</p>
          <p className="text-xs text-text-dim">Built with autonomous agents. Powered by open-source intelligence. Owned by no one. Used by everyone.</p>
        </section>
      </main>
    </div>
  );
}

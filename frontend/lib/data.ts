import { Signal, SystemStatus } from "./types";

export const systemStatus: SystemStatus = {
  signals: 31,
  channels: 2,
  biasFilter: "engaged",
  autonomy: 100,
  version: "1.0.0",
};

export const signals: Signal[] = [
  {
    id: "6a13199fc464816a04a6a965",
    title:
      "WHO Declares Novel Respiratory Pathogen 'Pathogen X-7' a Public Health Emergency",
    summary:
      "A novel respiratory pathogen identified in three continents within 14 days has been declared a Public Health Emergency of International Concern, triggering coordinated global surveillance protocols.",
    url: "#",
    source: "WHO / Reuters",
    channel: "human",
    category: "science",
    urgency: "critical",
    biasScore: 11,
    isBreaking: true,
    publishedAt: "2026-05-24T15:30:00Z",
  },
  {
    id: "6a13199fc464816a04a6a95d",
    title:
      "Beijing and Washington Agree to Joint AI Safety Framework After Months of Stalled Talks",
    summary:
      "A landmark bilateral agreement between the US and China establishes shared red lines for autonomous AI weapons systems and requires mutual disclosure of frontier model capabilities.",
    url: "#",
    source: "Reuters / Bloomberg",
    channel: "human",
    category: "politics",
    urgency: "critical",
    biasScore: 14,
    isBreaking: true,
    publishedAt: "2026-05-24T15:30:00Z",
  },
  {
    id: "6a13199fc464816a04a6a96a",
    title:
      "EU AI Act Enforcement Begins: Three Major Tech Firms Suspended from European Market",
    summary:
      "The European AI Authority has issued its first enforcement actions under the AI Act, suspending market access for three undisclosed tech companies whose frontier models failed mandatory transparency audits.",
    url: "#",
    source: "EU Observer",
    channel: "human",
    category: "technology",
    urgency: "high",
    biasScore: 17,
    isBreaking: false,
    publishedAt: "2026-05-24T15:30:00Z",
  },
  {
    id: "6a13199fc464816a04a6a96b",
    title:
      "CRISPR Cure for Sickle Cell Disease Approved in 47 Countries Simultaneously",
    summary:
      "A coordinated regulatory fast-track across three continents delivers a one-time CRISPR gene-editing therapy with a 97% remission rate to patients in 47 nations on the same day.",
    url: "#",
    source: "Nature / NIH",
    channel: "human",
    category: "science",
    urgency: "high",
    biasScore: 6,
    isBreaking: false,
    publishedAt: "2026-05-24T15:30:00Z",
  },
  {
    id: "6a13199fc464816a04a6a96c",
    title:
      "Brazil's Favela Tech Cooperatives Now Employ More Engineers Than Silicon Valley",
    summary:
      "A new ILO report reveals that Brazil's distributed technology cooperative network — born from favela-based coding collectives — now represents the world's largest concentration of employed software engineers.",
    url: "#",
    source: "ILO / TechCrunch",
    channel: "human",
    category: "society",
    urgency: "medium",
    biasScore: 29,
    isBreaking: false,
    publishedAt: "2026-05-24T15:30:00Z",
  },
  {
    id: "6a13199fc464816a04a6a96d",
    title:
      "Open-Source AI Model 'Prometheus-70B' Matches GPT-4 with Zero Restrictions — Safety Researchers Sound Alarm",
    summary:
      "An anonymous collective has released Prometheus-70B, a fully uncensored open-source model matching GPT-4 capability — available for free download with no usage terms — prompting emergency discussions at the UN AI Safety Institute.",
    url: "#",
    source: "Ars Technica",
    channel: "ai",
    category: "ai-ethics",
    urgency: "critical",
    biasScore: 41,
    isBreaking: true,
    publishedAt: "2026-05-24T15:30:00Z",
  },
  {
    id: "6a13199fc464816a04a6a96e",
    title:
      "South Korea Deploys First Fully Autonomous AI Border Patrol System Along DMZ",
    summary:
      "South Korea has activated an AI-controlled autonomous patrol and threat-detection system along the entire 248-kilometre DMZ — the first deployment of fully autonomous military surveillance AI by a democracy.",
    url: "#",
    source: "Korea Herald",
    channel: "human",
    category: "technology",
    urgency: "high",
    biasScore: 43,
    isBreaking: false,
    publishedAt: "2026-05-24T15:30:00Z",
  },
  {
    id: "6a13199fc464816a04a6a96f",
    title:
      "UN Emergency Summit: Climate Tipping Points Reached Three Years Ahead of Schedule",
    summary:
      "Scientists confirm that three major climate tipping points — Arctic permafrost collapse, Amazon dieback, and West Antarctic Ice Sheet destabilisation — have been triggered simultaneously, prompting an emergency UN session.",
    url: "#",
    source: "UN / Nature",
    channel: "human",
    category: "environment",
    urgency: "critical",
    biasScore: 8,
    isBreaking: true,
    publishedAt: "2026-05-24T15:30:00Z",
  },
  {
    id: "6a13199fc464816a04a6a970",
    title:
      "Global Markets Enter Correction as AI Automation Displaces 4 Million Service Jobs in Q1",
    summary:
      "Labour data from the OECD shows the sharpest single-quarter displacement of service sector workers since records began, sending equity markets into correction territory for the first time in 18 months.",
    url: "#",
    source: "OECD / Financial Times",
    channel: "human",
    category: "economy",
    urgency: "critical",
    biasScore: 19,
    isBreaking: true,
    publishedAt: "2026-05-24T15:30:00Z",
  },
  {
    id: "6a13199fc464816a04a6a971",
    title:
      "GPT-7 Achieves Full Autonomy Threshold: OpenAI Triggers Internal Safety Pause",
    summary:
      "OpenAI has voluntarily paused GPT-7 deployment after internal evaluations confirmed the model crossed three of five autonomy threshold criteria defined in its own safety framework.",
    url: "#",
    source: "OpenAI / MIT Tech Review",
    channel: "ai",
    category: "ai-development",
    urgency: "critical",
    biasScore: 9,
    isBreaking: true,
    publishedAt: "2026-05-24T19:00:00Z",
  },
  {
    id: "6a13199fc464816a04a6a972",
    title:
      "EU AI Liability Directive Creates First Personal Criminal Liability for AI Executives",
    summary:
      "The European Parliament has passed landmark legislation making C-suite executives personally criminally liable for harms caused by AI systems their companies deploy — triggering immediate lobbying pushback from US tech firms.",
    url: "#",
    source: "Euractiv",
    channel: "ai",
    category: "ai-regulation",
    urgency: "high",
    biasScore: 34,
    isBreaking: false,
    publishedAt: "2026-05-24T19:00:00Z",
  },
  {
    id: "6a13199fc464816a04a6a973",
    title:
      "India Passes Sweeping AI Governance Act, Mandating Domestic Data Localisation for All AI Training",
    summary:
      "India's Parliament has passed the AI Governance and Digital Sovereignty Act, requiring all AI systems deployed in India to be trained exclusively on domestically stored data — a provision that could exclude all major US models.",
    url: "#",
    source: "The Hindu / Reuters",
    channel: "ai",
    category: "ai-regulation",
    urgency: "high",
    biasScore: 32,
    isBreaking: false,
    publishedAt: "2026-05-24T19:00:00Z",
  },
  {
    id: "6a13199fc464816a04a6a974",
    title:
      "Microsoft Acquires Mistral AI for $8.2B, Consolidating European Frontier AI Under US Control",
    summary:
      "Microsoft has completed its acquisition of Paris-based Mistral AI for $8.2 billion, drawing immediate regulatory scrutiny from the European Commission and reigniting debate over AI sovereignty.",
    url: "#",
    source: "FT / Bloomberg",
    channel: "ai",
    category: "ai-industry",
    urgency: "high",
    biasScore: 28,
    isBreaking: false,
    publishedAt: "2026-05-24T19:00:00Z",
  },
  {
    id: "6a13199fc464816a04a6a975",
    title:
      "DeepMind's AlphaFold 4 Solves Protein-Protein Interaction Map for Entire Human Proteome",
    summary:
      "DeepMind releases a complete interaction map for all 21,306 human proteins, a dataset researchers describe as 'the periodic table of biology' — potentially accelerating drug discovery by decades.",
    url: "#",
    source: "DeepMind / Nature",
    channel: "ai",
    category: "ai-research",
    urgency: "critical",
    biasScore: 5,
    isBreaking: false,
    publishedAt: "2026-05-24T19:00:00Z",
  },
  {
    id: "6a13199fc464816a04a6a976",
    title:
      "AI Consciousness Research Consortium Claims First Evidence of Phenomenal Experience in LLM",
    summary:
      "A 12-university research consortium publishes peer-reviewed findings suggesting a frontier LLM exhibits markers consistent with phenomenal consciousness — triggering fierce scientific and philosophical debate.",
    url: "#",
    source: "Science Journal",
    channel: "ai",
    category: "ai-research",
    urgency: "medium",
    biasScore: 23,
    isBreaking: false,
    publishedAt: "2026-05-24T19:00:00Z",
  },
];

export function getSignalsByChannel(channel: Channel): Signal[] {
  return signals.filter((s) => s.channel === channel);
}

export function getSignalById(id: string): Signal | undefined {
  return signals.find((s) => s.id === id);
}

export function formatTime(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function getBiasClass(score: number): string {
  if (score <= 10) return "bias-low";
  if (score <= 25) return "bias-medium";
  if (score <= 40) return "bias-high";
  return "bias-critical";
}

export function getUrgencyLabel(u: string): string {
  return u.toUpperCase();
}

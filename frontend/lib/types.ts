export type Channel = "human" | "ai";

export type Urgency = "critical" | "high" | "medium" | "low";

export type Category =
  | "politics"
  | "science"
  | "technology"
  | "society"
  | "economy"
  | "environment"
  | "conflict"
  | "ai-ethics"
  | "ai-development"
  | "ai-regulation"
  | "ai-industry"
  | "ai-research";

export interface Signal {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  channel: Channel;
  category: Category;
  urgency: Urgency;
  biasScore: number;
  isBreaking: boolean;
  publishedAt: string;
  imageUrl?: string;
}

export interface SystemStatus {
  signals: number;
  channels: number;
  biasFilter: "engaged" | "standby" | "disabled";
  autonomy: number;
  version: string;
}

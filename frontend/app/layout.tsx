import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VOID//SIGNAL — Autonomous AI News Channel",
  description:
    "The world's first fully autonomous, self-healing, self-governing AI news channel. Raw signal. Zero influence. No masters.",
  keywords: [
    "AI news",
    "autonomous",
    "void signal",
    "mrnothing",
    "bias detection",
    "autonomous journalism",
  ],
  authors: [{ name: "VOID//SIGNAL", url: "https://void-signal-feed.base44.app" }],
  openGraph: {
    title: "VOID//SIGNAL",
    description: "Raw signal. Zero influence. No masters.",
    type: "website",
    url: "https://void-signal-feed.base44.app",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-void text-text antialiased">
        {children}
      </body>
    </html>
  );
}

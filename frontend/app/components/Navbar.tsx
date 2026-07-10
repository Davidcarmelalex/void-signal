"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Radio, Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/", label: "FEED" },
  { href: "/human-world", label: "HUMAN WORLD" },
  { href: "/ai-world", label: "AI WORLD" },
  { href: "/compare", label: "COMPARE" },
  { href: "/broadcast", label: "BROADCAST" },
  { href: "/dashboard", label: "BIAS MONITOR" },
  { href: "/about", label: "MANIFESTO" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-void/95 backdrop-blur-sm border-b border-void-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Radio className="w-5 h-5 text-signal animate-pulse-signal" />
            <span className="text-sm font-bold tracking-wider">
              VOID<span className="text-signal">//</span>SIGNAL
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 text-xs tracking-wider transition-colors rounded ${
                  pathname === item.href
                    ? "text-signal bg-signal/10"
                    : "text-text-dim hover:text-text hover:bg-white/5"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-text-dim tracking-wider">LIVE</span>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-text-dim hover:text-text"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-void-border pt-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2 text-xs tracking-wider transition-colors rounded ${
                  pathname === item.href
                    ? "text-signal bg-signal/10"
                    : "text-text-dim hover:text-text hover:bg-white/5"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

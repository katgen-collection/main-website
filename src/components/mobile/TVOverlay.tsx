"use client";

import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";

interface OverlayProps {
  children: ReactNode;
  tone?: "dark" | "bright";
  fog?: boolean;
  rain?: boolean;
  className?: string;
}

export function TVOverlay({ children, tone = "dark", fog = false, rain = false, className = "" }: OverlayProps) {
  const bg = tone === "dark" ? "bg-[#0d0b07]" : "bg-[#ffd400]";
  return (
    <div className={`relative overflow-hidden ${bg} ${className}`}>
      {fog && <div className="pointer-events-none absolute inset-0 z-0 p4-fog" aria-hidden />}
      {rain && <div className="pointer-events-none absolute inset-0 z-0 p4-rain" aria-hidden />}
      {children}
      <div className="pointer-events-none absolute inset-0 z-20 p4-scanlines opacity-[0.10]" aria-hidden />
      <div className="pointer-events-none absolute inset-0 z-20 p4-vignette" aria-hidden />
    </div>
  );
}

interface ShellProps {
  ch: string;
  label: string;
  onBack: () => void;
  children: ReactNode;
}

export function ChannelShell({ ch, label, onBack, children }: ShellProps) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#ffd400] text-[#1a1714]">
      <div className="absolute inset-x-0 top-0 z-30 flex items-center gap-3 bg-[#1a1714] px-4 py-3">
        <button
          onClick={onBack}
          aria-label="Back to channel guide"
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f5c518] text-[#1a1714]"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <span className="font-p4-display text-lg tracking-[0.2em] text-[#f5c518]">{label}</span>
        <span className="ml-auto font-p4-tele text-xl text-[#8fd6d6]">CH {ch}</span>
        <span className="h-2.5 w-2.5 rounded-full bg-[#7ee07e] p4-blink" aria-hidden />
      </div>

      <div className="absolute inset-x-0 bottom-0 top-[60px] overflow-y-auto overflow-x-hidden">
        {children}
      </div>

      <div className="pointer-events-none absolute inset-0 z-40 p4-scanlines opacity-[0.06]" aria-hidden />
    </div>
  );
}

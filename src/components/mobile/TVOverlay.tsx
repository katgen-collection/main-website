"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface OverlayProps {
  children: ReactNode;
  fog?: boolean;
  rain?: boolean;
  className?: string;
}

/**
 * Shared CRT screen: a dark phosphor backdrop with grain, scanlines, a phosphor
 * tint, vignette and tube curvature layered over its children. Optional drifting
 * fog and rain sit behind the content.
 */
export function TVOverlay({ children, fog = false, rain = false, className = "" }: OverlayProps) {
  return (
    <div className={`relative overflow-hidden bg-[#0a0b06] ${className}`}>
      {fog && <div className="pointer-events-none absolute inset-0 z-0 p4-fog" aria-hidden />}
      {rain && <div className="pointer-events-none absolute inset-0 z-0 p4-rain" aria-hidden />}
      {children}
      <div className="pointer-events-none absolute inset-0 z-30 p4-grain" aria-hidden />
      <div className="pointer-events-none absolute inset-0 z-30 p4-tint" aria-hidden />
      <div className="pointer-events-none absolute inset-0 z-30 p4-scanlines opacity-50" aria-hidden />
      <div className="pointer-events-none absolute inset-0 z-30 p4-vignette" aria-hidden />
      <div className="pointer-events-none absolute inset-0 z-30 p4-tube" aria-hidden />
    </div>
  );
}

interface ShellProps {
  ch: string;
  label: string;
  onBack: () => void;
  children: ReactNode;
}

/**
 * Dark broadcast frame for a channel: a REC bar, a NOW PLAYING title, a
 * scrollable body, a red chyron lower-third, and the CRT texture stack.
 */
export function ChannelShell({ ch, label, onBack, children }: ShellProps) {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-[#0a0b06] text-[#efe9cf]">
      {/* REC bar (extra right padding clears the floating SFX toggle) */}
      <div className="relative z-20 flex items-center gap-3 pl-4 pr-24 pt-4 pb-1">
        <button
          onClick={onBack}
          aria-label="Back to channel guide"
          className="-ml-2 px-2 py-1 font-p4-tele text-lg leading-none text-[#8fd6d6] active:text-[#f5c518]"
        >
          ◀ GUIDE
        </button>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#c0392b] p4-blink" aria-hidden />
          <span className="font-p4-tele text-sm leading-none text-[#b6a76f]">REC</span>
        </span>
        <span className="ml-auto font-p4-display text-xl leading-none text-[#f5c518] p4-glow">{ch}</span>
      </div>

      {/* title */}
      <div className="relative z-20 px-4 pb-2">
        <div className="font-p4-label text-[11px] tracking-[0.2em] text-[#8fd6d6]">▶ NOW PLAYING</div>
        <div className="mt-1 font-p4-display text-3xl leading-none text-[#f5c518] p4-glow">{label}</div>
        <div className="mt-2 h-0.5 w-full p4-dashes" aria-hidden />
      </div>

      {/* body */}
      <div className="relative z-10 flex-1 overflow-y-auto overflow-x-hidden px-4 py-3">{children}</div>

      {/* chyron lower-third */}
      <div className="relative z-20 shrink-0">
        <div className="h-1 bg-[#c0392b]" />
        <div className="flex items-center justify-between bg-[#0e0f08] px-4 py-2">
          <span className="font-p4-tele text-base leading-none text-[#f5c518]">▶ NOW PLAYING · {label}</span>
          <span className="font-p4-tele text-base leading-none text-[#8fd6d6]">CH {ch}</span>
        </div>
      </div>

      {/* CRT turn-on flash */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-1/2 z-40 h-0.5 -translate-y-1/2 bg-white"
        initial={{ opacity: 0.9, scaleX: 0.2 }}
        animate={{ opacity: 0, scaleX: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        aria-hidden
      />

      {/* texture */}
      <div className="pointer-events-none absolute inset-0 z-40 p4-grain" aria-hidden />
      <div className="pointer-events-none absolute inset-0 z-40 p4-scanlines opacity-50" aria-hidden />
      <div className="pointer-events-none absolute inset-0 z-40 p4-vignette" aria-hidden />
      <div className="pointer-events-none absolute inset-0 z-40 p4-tube" aria-hidden />
    </div>
  );
}

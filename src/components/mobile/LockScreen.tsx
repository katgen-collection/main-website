"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TVOverlay } from "./TVOverlay";

const WEATHER = "Tonight: Foggy";

function fmtTime(d: Date) {
  return `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
}

function fmtDate(d: Date) {
  return d
    .toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
    .toUpperCase();
}

interface Props {
  onEnter: () => void;
}

export function LockScreen({ onEnter }: Props) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <TVOverlay tone="dark" fog rain className="h-full w-full">
        <div className="relative z-10 flex h-full flex-col items-center px-6 pt-16 pb-10 text-center">
          <div className="font-p4-mono text-[11px] uppercase tracking-[0.3em] text-[#8fd6d6]">
            {WEATHER}
          </div>

          <div className="mt-14">
            <div className="font-p4-tele text-[112px] leading-none text-[#f5c518] p4-glow">
              {fmtTime(now)}
            </div>
            <div className="mt-2 font-p4-display text-sm tracking-[0.25em] text-[#efe9cf]">
              {fmtDate(now)}
            </div>
          </div>

          <div className="mt-12 border-2 border-[#efe9cf] px-5 py-2">
            <span className="font-p4-display text-base tracking-[0.3em] text-[#efe9cf]">
              MIKHAIL HARITZ
            </span>
          </div>

          <div className="flex-1" />

          <div className="mb-5 font-p4-mono text-[11px] uppercase tracking-[0.3em] text-[#7ee07e] p4-blink">
            TUNE IN
          </div>

          <button
            onClick={onEnter}
            className="w-full rounded-xl bg-[#e8352e] py-4 font-p4-display text-lg tracking-[0.2em] text-white shadow-[5px_5px_0_#1a1714] transition-transform active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_#1a1714]"
          >
            REACH OUT TO THE TRUTH
          </button>
        </div>
      </TVOverlay>
    </motion.div>
  );
}

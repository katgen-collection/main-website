"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TVOverlay } from "./TVOverlay";

function fmtTime(d: Date) {
  let h = d.getHours() % 12;
  if (h === 0) h = 12;
  return `${h.toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
}
function ampm(d: Date) {
  return d.getHours() < 12 ? "AM" : "PM";
}
function fmtDate(d: Date) {
  return d
    .toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
    .toUpperCase();
}

interface Props {
  onEnter: () => void;
}

/** Standby / clock set: glowing teletext clock, test-card corner, blinking tune-in prompt. */
export function LockScreen({ onEnter }: Props) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      setNow(new Date());
      timer = setTimeout(tick, 60000 - (Date.now() % 60000));
    };
    timer = setTimeout(tick, 60000 - (Date.now() % 60000));
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <TVOverlay fog rain className="h-full w-full">
        <div className="relative z-10 flex h-full flex-col items-center px-6 pt-12 pb-12 text-center">
          {/* status row */}
          <div className="flex w-full items-center justify-between">
            <span className="font-p4-tele text-base leading-none tracking-wide text-[#8fd6d6] p4-glow-teal p4-blink">
              ❚❚ STANDBY
            </span>
            <span className="flex w-16 flex-col overflow-hidden border border-white/25">
              <span className="h-3 p4-colorbars opacity-70" aria-hidden />
              <span className="bg-[#101208] text-center font-p4-tele text-[10px] leading-[14px] text-[#f5c518]">
                MC-21
              </span>
            </span>
          </div>

          <div className="mt-4 font-p4-label text-[11px] tracking-[0.3em] text-[#b6a76f]">
            MIDNIGHT ◆ CHANNEL
          </div>

          <div className="flex-1" />

          {/* clock */}
          <div className="font-p4-tele text-xl tracking-[0.3em] text-[#8fd6d6] p4-glow-teal">{fmtDate(now)}</div>
          <div className="font-p4-tele text-[112px] leading-[0.78] text-[#f5c518] p4-glow">{fmtTime(now)}</div>
          <div className="mt-1 font-p4-display text-base tracking-[0.2em] text-[#f5c518]">{ampm(now)}</div>

          <div className="mt-7 border-2 border-[#efe9cf] px-5 py-2">
            <span className="font-p4-label text-sm tracking-[0.3em] text-[#efe9cf]">MIKHAIL HARITZ</span>
          </div>
          <div className="mt-3 font-p4-tele text-base tracking-[0.12em] text-[#8fd6d6]">Tonight: Foggy</div>

          <div className="flex-1" />

          {/* tune-in prompt */}
          <button onClick={onEnter} aria-label="Tune in" className="flex flex-col items-center">
            <span className="font-p4-tele text-2xl tracking-[0.18em] text-[#7ee07e] p4-glow-green p4-blink">
              ▶ PRESS TO TUNE IN
            </span>
            <span className="mt-2 font-p4-label text-[11px] tracking-[0.25em] text-[#b6a76f]">
              REACH OUT TO THE TRUTH
            </span>
          </button>
        </div>
      </TVOverlay>
    </motion.div>
  );
}

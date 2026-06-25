"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { TVOverlay } from "./TVOverlay";
import { ChannelIcon } from "./ChannelIcon";
import { OnAir, SignalBars, Ticker, WeatherChip } from "./Broadcast";
import { VelvetButterfly } from "./VelvetButterfly";
import { crtMotion } from "./crtMotion";
import { CHANNELS, type ChannelId } from "./mobileData";

function fmtTime(d: Date) {
  return `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
}

const TICKER =
  "THE MIDNIGHT CHANNEL  //  FORECAST: FOG, RAIN AFTER MIDNIGHT  //  NOW BROADCASTING: CH 05 WEB  //  STAY TUNED  //";

interface Props {
  onSelect: (id: ChannelId) => void;
  onCatchButterfly?: () => void;
}

/** Home screen styled as an on-screen channel guide (EPG) with a live preview. */
export function ChannelGuide({ onSelect, onCatchButterfly }: Props) {
  const reduce = useReducedMotion();
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
    <motion.div className="absolute inset-0" style={{ transformOrigin: "center" }} {...crtMotion(reduce)}>
      <TVOverlay fog className="h-full w-full">
        {/* oversized faded wordmark backdrop */}
        <div
          className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
          aria-hidden
        >
          <span className="font-p4-display text-[5.5rem] leading-[0.85] text-[#f5c518] opacity-[0.04] -rotate-6 text-center">
            MIDNIGHT
            <br />
            CHANNEL
          </span>
        </div>

        <div className="relative z-10 flex h-full flex-col px-5 pt-10 pb-5">
          {/* ticker */}
          <div className="border-y border-[#3a4226] py-1">
            <Ticker text={TICKER} />
          </div>

          {/* header */}
          <div className="mt-3 flex items-center justify-between">
            <span className="font-p4-label text-lg tracking-[0.12em] text-[#f5c518] p4-glow">
              ▶ CHANNEL GUIDE
            </span>
            <span className="flex items-center gap-3">
              <OnAir />
              <span className="font-p4-tele text-xl text-[#8fd6d6] p4-glow-teal">{fmtTime(now)}</span>
            </span>
          </div>
          <div className="mt-2 h-0.5 w-full p4-dashes" aria-hidden />

          {/* live preview pane */}
          <button
            onClick={() => onSelect("web")}
            className="relative mt-3 flex h-20 w-full items-center gap-3 overflow-hidden border-2 border-[#f5c518] bg-[#070803] px-3 text-left shadow-[0_0_16px_rgba(245,197,24,0.25)]"
          >
            <span className="pointer-events-none absolute inset-0 p4-static opacity-25" aria-hidden />
            <span className="pointer-events-none absolute inset-0 p4-scanlines opacity-40" aria-hidden />
            <span className="relative">
              <span className="font-p4-label text-[10px] tracking-[0.2em] text-[#8fd6d6]">▶ NOW BROADCASTING</span>
              <span className="mt-1 block font-p4-display text-xl leading-none text-[#f5c518] p4-glow">CH 05</span>
              <span className="font-p4-tele text-base text-[#cdd2a0]">WEB</span>
            </span>
            <SignalBars className="relative ml-auto h-6" color="#f5c518" />
          </button>

          {/* channel grid */}
          <div className="mt-5 flex-1 overflow-y-auto overflow-x-hidden">
            <div className="grid grid-cols-2 gap-x-4 gap-y-7 px-1 pt-5">
              {CHANNELS.map((c) => (
                <ChannelIcon key={c.id} channel={c} highlight={c.id === "web"} onSelect={onSelect} />
              ))}
            </div>
          </div>

          {/* footer */}
          <div className="mt-3 flex items-center justify-between border-t-2 border-[#f5c518] bg-[#0e0f08] px-3 py-2">
            <WeatherChip />
            <span className="font-p4-tele text-base text-[#7ee07e] p4-glow-green">▶ ENTER</span>
          </div>
        </div>

        <VelvetButterfly minSize={20} maxSize={32} minDelay={8000} maxDelay={14000} onCatch={onCatchButterfly} />
      </TVOverlay>
    </motion.div>
  );
}

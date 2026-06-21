"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { TVOverlay } from "./TVOverlay";
import { ChannelIcon } from "./ChannelIcon";
import { CHANNELS, type ChannelId } from "./mobileData";

function fmtTime(d: Date) {
  return `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
}

interface Props {
  onSelect: (id: ChannelId) => void;
}

/** Home screen styled as an on-screen channel guide (EPG). */
export function ChannelGuide({ onSelect }: Props) {
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
    <motion.div
      className="absolute inset-0"
      initial={reduce ? { opacity: 0 } : { opacity: 0, scaleY: 0.7 }}
      animate={reduce ? { opacity: 1 } : { opacity: 1, scaleY: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <TVOverlay fog className="h-full w-full">
        <div className="relative z-10 flex h-full flex-col px-5 pt-12 pb-6">
          <div className="flex items-baseline justify-between">
            <span className="font-p4-label text-lg tracking-[0.15em] text-[#f5c518] p4-glow">
              ▶ CHANNEL GUIDE
            </span>
            <span className="font-p4-tele text-xl text-[#8fd6d6] p4-glow-teal">{fmtTime(now)}</span>
          </div>
          <div className="mt-2 h-0.5 w-full p4-dashes" aria-hidden />

          <div className="mt-7 grid grid-cols-2 gap-x-4 gap-y-7">
            {CHANNELS.map((c, i) => (
              <ChannelIcon key={c.id} channel={c} highlight={i === 0} onSelect={onSelect} />
            ))}
          </div>

          <div className="flex-1" />
          <div className="flex items-center justify-between border-t-2 border-[#f5c518] bg-[#0e0f08] px-3 py-2">
            <span className="font-p4-tele text-base text-[#cdd2a0]">▲▼◀▶ SELECT</span>
            <span className="font-p4-tele text-base text-[#7ee07e] p4-glow-green">▶ ENTER</span>
          </div>
        </div>
      </TVOverlay>
    </motion.div>
  );
}

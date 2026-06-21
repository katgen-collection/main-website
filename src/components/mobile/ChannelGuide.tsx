"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TVOverlay } from "./TVOverlay";
import { ChannelIcon } from "./ChannelIcon";
import { CHANNELS, type ChannelId } from "./mobileData";

function fmtTime(d: Date) {
  return `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
}

interface Props {
  onSelect: (id: ChannelId) => void;
}

export function ChannelGuide({ onSelect }: Props) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0, scaleY: 0.6 }}
      animate={{ opacity: 1, scaleY: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <TVOverlay tone="dark" fog className="h-full w-full">
        <div className="relative z-10 flex h-full flex-col px-5 pt-14 pb-8">
          <div className="flex items-baseline justify-between">
            <span className="font-p4-display text-xl tracking-[0.18em] text-[#f5c518] p4-glow">
              CHANNEL GUIDE
            </span>
            <span className="font-p4-tele text-xl text-[#8fd6d6]">{fmtTime(now)}</span>
          </div>
          <div className="mt-3 h-0.5 w-full p4-dashes" aria-hidden />

          <div className="mt-8 grid grid-cols-2 gap-4">
            {CHANNELS.map((c) => (
              <ChannelIcon key={c.id} channel={c} onSelect={onSelect} />
            ))}
          </div>

          <div className="flex-1" />
          <div className="text-center font-p4-mono text-[10px] uppercase tracking-[0.3em] text-[#6b7148]">
            Tap a channel to tune in
          </div>
        </div>
      </TVOverlay>
    </motion.div>
  );
}

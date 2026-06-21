"use client";

import { motion } from "framer-motion";
import { ChannelShell } from "../TVOverlay";
import { skillCategories } from "@/components/skills";

const FACTS = [
  { k: "Location", v: "Depok / Jakarta, ID" },
  { k: "Education", v: "Information Systems, Universitas Indonesia (2022-2026)" },
  { k: "Focus", v: "Scalable systems and AI engineering" },
  { k: "Status", v: "Open to opportunities" },
];

interface Props {
  onBack: () => void;
}

export function MeChannel({ onBack }: Props) {
  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <ChannelShell ch="02" label="ME" onBack={onBack}>
        <div className="px-4 py-5">
          <h2 className="font-p4-display text-2xl tracking-wide text-[#1a1714]">PROFILE</h2>

          <div className="mt-4 space-y-4 font-p4-mono text-[12px] leading-relaxed text-[#3a3324]">
            <p>
              I am a software engineer focused on building scalable backend systems, mostly in Go,
              Spring, and TypeScript. I work full-stack, with Next.js on the frontend and Python
              whenever there is AI or data work involved.
            </p>
            <p>
              Lately I have been drawn to AI engineering: wiring LLMs and agents into real products,
              from an AI job aggregator to my thesis on an AI-powered discussion forum. I care about
              building things that are secure, reliable, and ready to scale.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3">
            {FACTS.map((f) => (
              <div key={f.k} className="border-t-2 border-[#1a1714] pt-2">
                <div className="font-p4-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#9a7f1e]">
                  {f.k}
                </div>
                <div className="mt-0.5 font-p4-mono text-[12px] text-[#1a1714]">{f.v}</div>
              </div>
            ))}
          </div>

          <h3 className="mt-8 font-p4-display text-xl tracking-wide text-[#1a1714]">STACK</h3>
          <div className="mt-4 space-y-5">
            {skillCategories.map((cat) => (
              <div key={cat.title}>
                <div className="font-p4-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#1a1714]">
                  {cat.title}
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {cat.skills.map((s) => (
                    <span
                      key={s}
                      className="border border-[#1a1714] bg-[#fff8e6] px-2 py-0.5 font-p4-mono text-[10px] text-[#1a1714]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </ChannelShell>
    </motion.div>
  );
}

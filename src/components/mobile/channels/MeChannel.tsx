"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChannelShell } from "../TVOverlay";
import { SignalBars } from "../Broadcast";
import { VelvetButterfly } from "../VelvetButterfly";
import { crtMotion } from "../crtMotion";
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

/** Profile rendered as a broadcast: bio, fact rows, and a tagged stack. */
export function MeChannel({ onBack }: Props) {
  const reduce = useReducedMotion();
  return (
    <motion.div className="absolute inset-0" style={{ transformOrigin: "center" }} {...crtMotion(reduce)}>
      <VelvetButterfly />
      <ChannelShell ch="02" label="ME" onBack={onBack}>
        <div className="flex items-center gap-2 font-p4-label text-[10px] uppercase tracking-[0.18em] text-[#6b7148]">
          VIEWER PROFILE
          <SignalBars className="h-4" />
        </div>

        <div className="mt-3 space-y-3 font-p4-tele text-[16px] leading-snug text-[#cdd2a0]">
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

        <div className="mt-5 divide-y divide-dashed divide-[#3a4226]">
          {FACTS.map((f) => (
            <div key={f.k} className="flex gap-3 py-2">
              <span className="w-20 shrink-0 font-p4-label text-[10px] uppercase tracking-[0.15em] text-[#6b7148]">
                {f.k}
              </span>
              <span className="flex-1 font-p4-tele text-[15px] text-[#efe9cf]">{f.v}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 font-p4-label text-base tracking-[0.12em] text-[#f5c518] p4-glow">STACK</div>
        <div className="mt-3 space-y-4">
          {skillCategories.map((cat) => (
            <div key={cat.title}>
              <div className="font-p4-label text-[11px] uppercase tracking-[0.12em] text-[#8fd6d6]">
                {cat.title}
              </div>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {cat.skills.map((s) => (
                  <span
                    key={s}
                    className="border border-[#2f4040] px-1.5 font-p4-tele text-[14px] leading-tight text-[#cdd2a0]"
                  >
                    ▌{s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ChannelShell>
    </motion.div>
  );
}

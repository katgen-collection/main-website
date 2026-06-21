"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChannelShell } from "../TVOverlay";
import { projects } from "@/types/projects";

const ordered = [...projects].sort(
  (a, b) => Number(b.featured ?? false) - Number(a.featured ?? false) || b.year - a.year
);

// Faux late-night airtimes for the program-guide feel.
function slot(i: number) {
  const total = i * 45;
  const h = Math.floor(total / 60).toString().padStart(2, "0");
  const m = (total % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
}

interface Props {
  onBack: () => void;
}

/** Projects rendered as an electronic program guide (EPG) of broadcasts. */
export function ProjectsChannel({ onBack }: Props) {
  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <ChannelShell ch="01" label="PROJECTS" onBack={onBack}>
        <div className="font-p4-tele text-[15px] text-[#a7ac80]">
          TODAY&apos;S PROGRAM GUIDE · {ordered.length} LISTINGS
        </div>
        <div className="mt-3 divide-y divide-dashed divide-[#3a4226]">
          {ordered.map((p, i) => (
            <Link key={p.id} href={`/projects/${p.slug}`} className="flex gap-3 py-3 active:bg-white/5">
              <div className="w-12 shrink-0 text-center">
                <div className="font-p4-tele text-xl leading-none text-[#7ee07e] p4-glow-green">{slot(i)}</div>
                <div className="font-p4-tele text-sm text-[#6b7148]">AM</div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-p4-label text-[13px] text-[#efe9cf]">{p.title}</span>
                  <span className="bg-[#f5c518] px-1.5 font-p4-tele text-[12px] leading-tight text-[#181a0e]">
                    {p.type}
                  </span>
                </div>
                <p className="mt-1 font-p4-tele text-[15px] leading-tight text-[#a7ac80]">{p.description}</p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {p.technologies.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="border border-[#2f4040] px-1.5 font-p4-tele text-[13px] leading-tight text-[#8fd6d6]"
                    >
                      ▌{t}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </ChannelShell>
    </motion.div>
  );
}

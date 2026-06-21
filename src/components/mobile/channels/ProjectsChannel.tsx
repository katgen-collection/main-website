"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChannelShell } from "../TVOverlay";
import { projects } from "@/types/projects";

const ordered = [...projects].sort(
  (a, b) => Number(b.featured ?? false) - Number(a.featured ?? false) || b.year - a.year
);

interface Props {
  onBack: () => void;
}

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
        <div className="px-4 py-5">
          <h2 className="font-p4-display text-2xl tracking-wide text-[#1a1714]">ALL PROJECTS</h2>
          <p className="mt-1 font-p4-mono text-[11px] font-bold uppercase tracking-wide text-[#9a7f1e]">
            Selected broadcasts and past work
          </p>

          <div className="mt-5 space-y-4">
            {ordered.map((p) => (
              <Link
                key={p.id}
                href={`/projects/${p.slug}`}
                className="block overflow-hidden rounded-xl border-2 border-[#1a1714] bg-[#fffdf7] shadow-[4px_4px_0_#e8352e] transition-transform active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_#e8352e]"
              >
                <div className="relative h-28 w-full bg-[#100d08]">
                  <Image src={p.image} alt={p.title} fill className="object-cover opacity-90" sizes="100vw" />
                </div>
                <div className="p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-p4-display text-lg text-[#1a1714]">{p.title}</span>
                    <span className="border border-[#1a1714] bg-[#f5c518] px-2 py-0.5 font-p4-mono text-[9px] font-bold uppercase tracking-wide text-[#1a1714]">
                      {p.type}
                    </span>
                  </div>
                  <p className="mt-2 font-p4-mono text-[11px] leading-relaxed text-[#5a513c]">{p.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.technologies.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="border border-[#1a1714] bg-[#fff8e6] px-2 py-0.5 font-p4-mono text-[10px] font-bold text-[#1a1714]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </ChannelShell>
    </motion.div>
  );
}

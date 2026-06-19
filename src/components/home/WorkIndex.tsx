"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/types/projects";
import { StatusChip } from "@/components/projects/StatusChip";

const featured = projects.filter((p) => p.featured);

const COLS =
  "grid-cols-[1.75rem_1fr_4.5rem] md:grid-cols-[3rem_1fr_10rem_4rem_6.5rem]";

/**
 * "Selected Work" rendered as a precise shipping log. Each row is a project
 * (No. / Project / Client / Year / Status); hovering a row floats that
 * project's screenshot next to the cursor. The page's signature element.
 */
export function WorkIndex() {
  const [active, setActive] = useState<number | null>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 350, damping: 30, mass: 0.4 });
  const y = useSpring(my, { stiffness: 350, damping: 30, mass: 0.4 });

  const handleMove = (e: React.MouseEvent) => {
    mx.set(e.clientX + 28);
    my.set(e.clientY - 110);
  };

  return (
    <div onMouseMove={handleMove} className="relative">
      {/* Column headers */}
      <div
        className={`grid ${COLS} items-center gap-4 px-2 pb-3 border-b border-white/10 font-code text-[10px] uppercase tracking-[0.2em] text-[#6B6B74]`}
      >
        <span>No.</span>
        <span>Project</span>
        <span className="hidden md:block">Client</span>
        <span className="hidden md:block">Year</span>
        <span className="text-right md:text-left">Status</span>
      </div>

      {featured.map((p, i) => {
        return (
          <Link
            key={p.id}
            href={`/projects/${p.slug}`}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive((cur) => (cur === i ? null : cur))}
            className={`group grid ${COLS} items-center gap-4 px-2 py-5 border-b border-white/10 transition-colors hover:bg-white/[0.025]`}
          >
            <span className="font-code text-xs text-[#6B6B74] transition-colors group-hover:text-violet-400">
              {String(i + 1).padStart(2, "0")}
            </span>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-display text-lg md:text-2xl text-[#ECECEE] transition-colors group-hover:text-white truncate">
                  {p.title}
                </span>
                <ArrowUpRight className="w-4 h-4 shrink-0 text-violet-400 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
              </div>
              <span className="font-code text-[11px] text-[#6B6B74] block mt-1 truncate">
                {p.type} · {p.technologies.slice(0, 3).join(" / ")}
                <span className="md:hidden"> · {p.year}</span>
              </span>
            </div>

            <span className="hidden md:block font-code text-sm text-[#8A8A94] truncate">
              {p.client}
            </span>
            <span className="hidden md:block font-code text-sm text-[#8A8A94]">
              {p.year}
            </span>

            <span className="justify-self-end md:justify-self-start">
              <StatusChip status={p.status} />
            </span>
          </Link>
        );
      })}

      {/* Cursor-following preview (pointer devices only) */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="pointer-events-none fixed top-0 left-0 z-50 hidden lg:block"
            style={{ x, y }}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <div className="w-72 aspect-video overflow-hidden border border-white/15 bg-[#0B0C10] shadow-2xl shadow-black/60 rotate-1">
              <Image
                src={featured[active].image}
                alt=""
                width={420}
                height={236}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default WorkIndex;

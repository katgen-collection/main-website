"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { TVOverlay } from "./TVOverlay";
import { crtMotion } from "./crtMotion";
import { usePullToDismiss } from "./usePullToDismiss";

const VELVET = "#7b8bff";
const REPO = "https://github.com/katgen-collection/main-website";
const STACK = ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Web Audio"];

interface Props {
  onBack: () => void;
}

/** The hidden Velvet Room: a blue broadcast holding an atmospheric colophon. */
export function VelvetRoom({ onBack }: Props) {
  const reduce = useReducedMotion();
  const bodyRef = useRef<HTMLDivElement>(null);
  const { pull, handlers } = usePullToDismiss(onBack, bodyRef);

  return (
    <motion.div className="absolute inset-0" style={{ transformOrigin: "center" }} {...crtMotion(reduce)}>
      <TVOverlay fog className="h-full w-full">
        {/* velvet-blue wash */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{ background: "radial-gradient(80% 70% at 50% 38%, rgba(123,139,255,0.14), transparent 76%)" }}
          aria-hidden
        />

        <div
          className="relative z-10 flex h-full flex-col text-[#cfd6ff]"
          style={{
            transform: pull ? `translateY(${pull}px)` : undefined,
            transition: pull ? "none" : "transform 0.2s ease-out",
          }}
          {...handlers}
        >
          {/* header */}
          <div className="flex items-center gap-3 px-4 pt-4 pb-1">
            <button
              onClick={onBack}
              aria-label="Leave the Velvet Room"
              className="-ml-2 px-2 py-1 font-p4-tele text-lg leading-none"
              style={{ color: VELVET }}
            >
              ◀ EXIT
            </button>
            <span className="ml-auto font-p4-display text-xl leading-none p4-glow-velvet" style={{ color: VELVET }}>
              ??
            </span>
          </div>
          <div className="px-4 pb-2">
            <div className="font-p4-label text-[11px] tracking-[0.2em]" style={{ color: VELVET }}>
              ▶ INCOMING SIGNAL
            </div>
            <div className="mt-1 font-p4-display text-3xl leading-none p4-glow-velvet" style={{ color: VELVET }}>
              VELVET ROOM
            </div>
            <div
              className="mt-2 h-0.5 w-full"
              style={{
                backgroundImage: `repeating-linear-gradient(90deg, ${VELVET} 0 8px, transparent 8px 14px)`,
                opacity: 0.7,
              }}
              aria-hidden
            />
          </div>

          {/* body */}
          <div
            ref={bodyRef}
            className="relative z-10 flex-1 overflow-y-auto overflow-x-hidden px-4 py-3 font-p4-tele text-[15px] leading-snug"
          >
            <p>
              A room that exists between dream and reality, mind and matter. You looked closely enough to find it.
              Welcome.
            </p>

            <div className="mt-5 font-p4-label text-[11px] uppercase tracking-[0.18em]" style={{ color: VELVET }}>
              This world was built with
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {STACK.map((t) => (
                <span key={t} className="border px-1.5 text-[13px]" style={{ borderColor: "#3a3f6e" }}>
                  ▌{t}
                </span>
              ))}
            </div>

            <div className="mt-4 font-p4-label text-[11px] uppercase tracking-[0.18em]" style={{ color: VELVET }}>
              Type
            </div>
            <p className="mt-1 text-[14px] text-[#aab2e8]">Rubik Mono One · VT323 · DotGothic16</p>

            <div className="mt-4 font-p4-label text-[11px] uppercase tracking-[0.18em]" style={{ color: VELVET }}>
              Inspired by
            </div>
            <p className="mt-1 text-[14px] text-[#aab2e8]">
              Persona 4: the Midnight Channel, and the Velvet Room.
            </p>

            <a
              href={REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex items-center justify-center border-2 px-4 py-3 active:opacity-80"
              style={{ borderColor: VELVET }}
            >
              <span className="font-p4-tele text-lg tracking-wide p4-glow-velvet" style={{ color: VELVET }}>
                ▶ VIEW THE SOURCE
              </span>
            </a>

            <p className="mt-5 text-[14px] text-[#aab2e8]">Thank you for tuning in. — Mikhail</p>
            <p className="mt-2 font-p4-label text-[10px] uppercase tracking-[0.18em] text-[#6f76a8]">
              swipe down or tap EXIT to leave
            </p>
          </div>

          {/* chyron */}
          <div className="shrink-0">
            <div className="h-1" style={{ background: VELVET }} />
            <div className="flex items-center justify-between bg-[#0e0f08] px-4 py-2">
              <span className="font-p4-tele text-base leading-none" style={{ color: VELVET }}>
                ▶ VELVET ROOM
              </span>
              <span className="font-p4-tele text-base leading-none" style={{ color: VELVET }}>
                CH ??
              </span>
            </div>
          </div>
        </div>
      </TVOverlay>
    </motion.div>
  );
}

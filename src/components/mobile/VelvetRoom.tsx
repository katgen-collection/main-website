"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { crtMotion } from "./crtMotion";
import { usePullToDismiss } from "./usePullToDismiss";

const GOLD = "#d9b45b";
const GOLD_LT = "#f1d98a";
const REPO = "https://github.com/katgen-collection/main-website";
const STACK = ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Web Audio"];

/** Ornate gold corner flourish; flipped per corner via `flip`. */
function Corner({ pos, flip }: { pos: string; flip: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={`absolute z-30 h-12 w-12 ${pos}`}
      style={{ transform: flip }}
      fill="none"
      stroke={GOLD}
      strokeWidth="1.3"
      aria-hidden
    >
      <path d="M8 32 L8 14 Q8 8 14 8 L32 8" />
      <path d="M13 32 L13 18 Q13 13 18 13 L32 13" opacity="0.55" />
      <path d="M8 14 C 18 16 20 24 17 28 C 23 26 27 20 24 14" opacity="0.85" />
      <circle cx="8" cy="8" r="2.2" fill={GOLD_LT} stroke="none" />
    </svg>
  );
}

function Divider() {
  return (
    <div className="my-4 flex items-center justify-center gap-3">
      <span className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${GOLD})` }} />
      <span style={{ color: GOLD }}>&#10022;</span>
      <span className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${GOLD}, transparent)` }} />
    </div>
  );
}

interface Props {
  onBack: () => void;
}

/** The hidden Velvet Room: a royal-blue, gold-trimmed world apart, holding an
 *  atmospheric colophon. Found by catching a butterfly. */
export function VelvetRoom({ onBack }: Props) {
  const reduce = useReducedMotion();
  const bodyRef = useRef<HTMLDivElement>(null);
  const { pull, handlers } = usePullToDismiss(onBack, bodyRef);

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden font-velvet-body"
      style={{ transformOrigin: "center" }}
      {...crtMotion(reduce)}
    >
      {/* royal-blue velvet ground */}
      <div className="pointer-events-none absolute inset-0 z-0 velvet-bg" aria-hidden />
      <div className="pointer-events-none absolute inset-0 z-0 velvet-sheen opacity-60" aria-hidden />
      {/* chandelier light from above */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-44 velvet-shimmer"
        style={{ background: "radial-gradient(60% 100% at 50% 0%, rgba(245,215,140,0.20), transparent 72%)" }}
        aria-hidden
      />
      {/* zig-zag floor */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-36 velvet-zigzag"
        style={{ maskImage: "linear-gradient(to top, #000, transparent)", WebkitMaskImage: "linear-gradient(to top, #000, transparent)" }}
        aria-hidden
      />
      {/* faint butterfly watermark (Philemon) */}
      <svg
        viewBox="0 0 120 100"
        className="pointer-events-none absolute left-1/2 top-[40%] z-[1] w-64 -translate-x-1/2 -translate-y-1/2"
        style={{ opacity: 0.07 }}
        fill="none"
        stroke={GOLD}
        strokeWidth="1"
        aria-hidden
      >
        <path d="M60 42 C 75 12 116 8 112 36 C 110 58 80 56 60 50 Z" />
        <path d="M60 42 C 45 12 4 8 8 36 C 10 58 40 56 60 50 Z" />
        <path d="M60 50 C 78 58 104 70 92 92 C 82 104 64 84 60 60 Z" />
        <path d="M60 50 C 42 58 16 70 28 92 C 38 104 56 84 60 60 Z" />
        <line x1="60" y1="30" x2="60" y2="64" />
      </svg>
      {/* side curtains */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-7"
        style={{ background: "linear-gradient(90deg, #0a1150, #131c63 70%, transparent)", borderRight: `1px solid ${GOLD}55` }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-[2] w-7"
        style={{ background: "linear-gradient(270deg, #0a1150, #131c63 70%, transparent)", borderLeft: `1px solid ${GOLD}55` }}
        aria-hidden
      />
      {/* scalloped curtain valance */}
      <svg
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-16 w-full"
        aria-hidden
      >
        <path
          d="M0 0 H1200 V30 C1170 66 1080 66 1050 30 C1020 66 930 66 900 30 C870 66 780 66 750 30 C720 66 630 66 600 30 C570 66 480 66 450 30 C420 66 330 66 300 30 C270 66 180 66 150 30 C120 66 30 66 0 30 Z"
          fill="#161e6e"
        />
        <path
          d="M1050 30 C1020 66 930 66 900 30 C870 66 780 66 750 30 C720 66 630 66 600 30 C570 66 480 66 450 30 C420 66 330 66 300 30 C270 66 180 66 150 30"
          fill="none"
          stroke={GOLD}
          strokeWidth="2"
          opacity="0.8"
        />
      </svg>

      {/* content */}
      <div
        className="relative z-10 flex h-full flex-col text-[#cdd6ff]"
        style={{
          transform: pull ? `translateY(${pull}px)` : undefined,
          transition: pull ? "none" : "transform 0.2s ease-out",
        }}
        {...handlers}
      >
        <div className="flex items-center px-5 pt-6">
          <button
            onClick={onBack}
            aria-label="Leave the Velvet Room"
            className="font-velvet text-sm tracking-[0.3em]"
            style={{ color: GOLD }}
          >
            &#9664; EXIT
          </button>
        </div>

        <div
          ref={bodyRef}
          className="relative z-10 flex-1 overflow-y-auto overflow-x-hidden px-7 pb-8 pt-5 text-center"
        >
          <div className="font-velvet text-[11px] tracking-[0.35em]" style={{ color: GOLD }}>
            &#10022;&nbsp; BETWEEN DREAM AND REALITY &nbsp;&#10022;
          </div>
          <h1
            className="mt-3 font-velvet text-4xl font-bold tracking-[0.18em]"
            style={{ color: GOLD_LT, textShadow: `0 0 18px rgba(217,180,91,0.45)` }}
          >
            VELVET ROOM
          </h1>

          <Divider />

          <p className="mx-auto max-w-[34ch] text-[15px] italic leading-relaxed text-[#dfe5ff]">
            You looked closely enough to find it. Welcome, guest, to a room that exists between dream and reality,
            mind and matter.
          </p>

          <div className="mt-7 font-velvet text-xs uppercase tracking-[0.3em]" style={{ color: GOLD }}>
            Forged with
          </div>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {STACK.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 text-[12px] tracking-wide"
                style={{ border: `1px solid ${GOLD}66`, color: "#e9eeff" }}
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-6 font-velvet text-xs uppercase tracking-[0.3em]" style={{ color: GOLD }}>
            Set in
          </div>
          <p className="mt-1.5 text-[14px] text-[#aab2e8]">Rubik Mono One &middot; VT323 &middot; DotGothic16</p>

          <div className="mt-6 font-velvet text-xs uppercase tracking-[0.3em]" style={{ color: GOLD }}>
            Inspired by
          </div>
          <p className="mt-1.5 text-[14px] text-[#aab2e8]">
            Persona 4: the Midnight Channel, and the Velvet Room.
          </p>

          <a
            href={REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center justify-center px-6 py-3 font-velvet text-sm tracking-[0.2em] active:opacity-80"
            style={{ border: `1px solid ${GOLD}`, color: GOLD_LT, boxShadow: `0 0 18px rgba(217,180,91,0.18) inset` }}
          >
            &#9654; VIEW THE SOURCE
          </a>

          <p className="mt-8 text-[15px] italic text-[#dfe5ff]">Thank you for tuning in.</p>
          <p className="mt-1 font-velvet text-sm tracking-[0.3em]" style={{ color: GOLD }}>
            &mdash; MIKHAIL
          </p>

          <p className="mt-6 text-[11px] uppercase tracking-[0.25em] text-[#6f76a8]">
            swipe down or tap exit to leave
          </p>
        </div>
      </div>

      {/* uncanny veil: faint static + scanlines + blue vignette */}
      <div className="pointer-events-none absolute inset-0 z-20 p4-grain" aria-hidden />
      <div className="pointer-events-none absolute inset-0 z-20 p4-scanlines opacity-30" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 z-20"
        style={{ background: "radial-gradient(125% 100% at 50% 46%, transparent 52%, rgba(4,6,30,0.82) 100%)" }}
        aria-hidden
      />

      {/* gold ornate frame + corners */}
      <div
        className="pointer-events-none absolute inset-[10px] z-30"
        style={{ border: `1px solid ${GOLD}99`, boxShadow: `inset 0 0 0 4px rgba(7,10,44,0.6), inset 0 0 0 5px ${GOLD}44` }}
        aria-hidden
      />
      <Corner pos="left-2 top-2" flip="none" />
      <Corner pos="right-2 top-2" flip="scaleX(-1)" />
      <Corner pos="left-2 bottom-2" flip="scaleY(-1)" />
      <Corner pos="right-2 bottom-2" flip="scale(-1,-1)" />
    </motion.div>
  );
}

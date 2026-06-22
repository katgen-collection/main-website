"use client";

import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { crtMotion } from "../mobile/crtMotion";

const GOLD = "#d9b45b";
const GOLD_LT = "#f1d98a";
const REPO = "https://github.com/katgen-collection/main-website";
const STACK = ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Web Audio"];

/** Ornate gold corner flourish; flipped per corner via `flip`. */
function Corner({ pos, flip }: { pos: string; flip: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={`pointer-events-none absolute z-40 h-12 w-12 ${pos}`}
      style={{ transform: flip }}
      fill="none"
      stroke={GOLD}
      strokeWidth="1.3"
      aria-hidden
    >
      <path d="M6 30 L6 12 Q6 6 12 6 L30 6" />
      <path d="M11 30 L11 16 Q11 11 16 11 L30 11" opacity="0.55" />
      <path d="M6 12 C 16 14 18 22 15 26 C 21 24 25 18 22 12" opacity="0.85" />
      <circle cx="6" cy="6" r="2" fill={GOLD_LT} stroke="none" />
    </svg>
  );
}

/** A labelled block: small gold eyebrow above its content. */
function Plate({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="font-velvet text-[11px] uppercase tracking-[0.34em]" style={{ color: GOLD }}>
        {label}
      </div>
      <div className="mt-2.5">{children}</div>
    </div>
  );
}

interface Props {
  onClose: () => void;
}

/** The hidden Velvet Room, desktop edition: a royal-blue, gold-trimmed world
 *  apart, laid out as a wide editorial composition that fits on one screen with
 *  no scrolling. Found by catching a drifting butterfly. Press ESC or EXIT. */
export function DesktopVelvetRoom({ onClose }: Props) {
  const reduce = useReducedMotion();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] overflow-hidden font-velvet-body"
      style={{ transformOrigin: "center" }}
      {...crtMotion(reduce)}
    >
      {/* base velvet fills the whole screen, behind the frame */}
      <div className="pointer-events-none absolute inset-0 z-0 velvet-bg" aria-hidden />

      {/* room interior, clipped to just inside the gold frame */}
      <div className="absolute inset-[14px] z-10 overflow-hidden">
        {/* fixed room decorations */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-0 h-72 velvet-shimmer"
          style={{ background: "radial-gradient(46% 100% at 50% 0%, rgba(245,215,140,0.20), transparent 72%)" }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-56 velvet-zigzag"
          style={{ maskImage: "linear-gradient(to top, #000, transparent)", WebkitMaskImage: "linear-gradient(to top, #000, transparent)" }}
          aria-hidden
        />
        <svg
          viewBox="0 0 120 100"
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 w-[34rem] -translate-x-1/2 -translate-y-1/2"
          style={{ opacity: 0.045 }}
          fill="none"
          stroke={GOLD}
          strokeWidth="0.8"
          aria-hidden
        >
          <path d="M60 42 C 75 12 116 8 112 36 C 110 58 80 56 60 50 Z" />
          <path d="M60 42 C 45 12 4 8 8 36 C 10 58 40 56 60 50 Z" />
          <path d="M60 50 C 78 58 104 70 92 92 C 82 104 64 84 60 60 Z" />
          <path d="M60 50 C 42 58 16 70 28 92 C 38 104 56 84 60 60 Z" />
          <line x1="60" y1="30" x2="60" y2="64" />
        </svg>

        {/* the composition: a wide two-column editorial that fits on one screen */}
        <div className="absolute inset-0 z-10 flex items-center justify-center px-16 text-[#cdd6ff]">
          <div className="grid w-full max-w-5xl grid-cols-2 items-center gap-16">
            {/* left: identity */}
            <div className="text-left">
              <div className="font-velvet text-[12px] tracking-[0.4em]" style={{ color: GOLD }}>
                &#10022; BETWEEN DREAM &amp; REALITY
              </div>
              <h1
                className="mt-4 font-velvet text-[5.2rem] font-bold leading-[0.95] tracking-[0.06em]"
                style={{ color: GOLD_LT, textShadow: "0 0 28px rgba(217,180,91,0.4)" }}
              >
                VELVET
                <br />
                ROOM
              </h1>
              <div className="mt-6 flex items-center gap-3" aria-hidden>
                <span className="h-px w-16" style={{ background: `linear-gradient(90deg, ${GOLD}, transparent)` }} />
                <span className="text-[11px]" style={{ color: GOLD }}>&#10022;</span>
              </div>
              <p className="mt-6 max-w-[34ch] text-[16px] italic leading-relaxed text-[#dfe5ff]">
                You looked closely enough to find it. Welcome, guest, to a room that exists between dream and
                reality, mind and matter.
              </p>
              <p className="mt-8 text-[15px] italic text-[#dfe5ff]">Thank you for tuning in.</p>
              <p className="mt-1.5 font-velvet text-[15px] tracking-[0.3em]" style={{ color: GOLD }}>
                &#10022; MIKHAIL
              </p>
            </div>

            {/* right: the colophon panel */}
            <div
              className="space-y-7 p-9"
              style={{ border: `1px solid ${GOLD}40`, background: "rgba(8,12,52,0.35)" }}
            >
              <Plate label="Built with">
                <div className="flex flex-wrap gap-2">
                  {STACK.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 text-[12.5px] tracking-wide"
                      style={{ border: `1px solid ${GOLD}66`, color: "#e9eeff" }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Plate>

              <Plate label="Set in">
                <p className="text-[14px] leading-relaxed text-[#aab2e8]">
                  Rubik Mono One &middot; VT323 &middot; DotGothic16
                </p>
              </Plate>

              <Plate label="Inspired by">
                <p className="text-[14px] text-[#aab2e8]">Persona 4</p>
              </Plate>

              <a
                href={REPO}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center justify-center px-7 py-3 font-velvet text-[13px] tracking-[0.2em] transition-opacity hover:opacity-80"
                style={{ border: `1px solid ${GOLD}`, color: GOLD_LT, boxShadow: "0 0 18px rgba(217,180,91,0.18) inset" }}
              >
                &#9654; VIEW THE SOURCE
              </a>
            </div>
          </div>
        </div>

        {/* scalloped curtain valance across the top */}
        <svg
          viewBox="0 0 1200 80"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-0 top-0 z-20 h-12 w-full"
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

        {/* uncanny veil: faint horizontal scanlines + grain + blue vignette */}
        <div className="pointer-events-none absolute inset-0 z-30 p4-grain" aria-hidden />
        <div className="pointer-events-none absolute inset-0 z-30 p4-scanlines opacity-20" aria-hidden />
        <div
          className="pointer-events-none absolute inset-0 z-30"
          style={{ background: "radial-gradient(120% 100% at 50% 46%, transparent 56%, rgba(4,6,30,0.82) 100%)" }}
          aria-hidden
        />
      </div>

      {/* EXIT (top-right) */}
      <button
        onClick={onClose}
        aria-label="Leave the Velvet Room"
        className="absolute right-9 top-9 z-50 font-velvet text-[12px] leading-none tracking-[0.28em] transition-opacity hover:opacity-70"
        style={{ color: GOLD, border: `1px solid ${GOLD}66`, padding: "9px 15px" }}
      >
        EXIT &#9654;
      </button>
      <span className="absolute bottom-9 left-1/2 z-50 -translate-x-1/2 font-velvet text-[10px] uppercase tracking-[0.3em] text-[#6f76a8]">
        press esc or click exit to leave
      </span>

      {/* gold ornate frame + corners (drawn over everything) */}
      <div
        className="pointer-events-none absolute inset-[12px] z-40"
        style={{ border: `1px solid ${GOLD}99`, boxShadow: `inset 0 0 0 5px rgba(7,10,44,0.6), inset 0 0 0 6px ${GOLD}44` }}
        aria-hidden
      />
      <Corner pos="left-3.5 top-3.5" flip="none" />
      <Corner pos="right-3.5 top-3.5" flip="scaleX(-1)" />
      <Corner pos="left-3.5 bottom-3.5" flip="scaleY(-1)" />
      <Corner pos="right-3.5 bottom-3.5" flip="scale(-1,-1)" />
    </motion.div>
  );
}

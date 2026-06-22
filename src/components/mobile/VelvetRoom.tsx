"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { crtMotion } from "./crtMotion";
import { usePullToDismiss } from "./usePullToDismiss";
import { SoundToggle } from "./SoundToggle";

const GOLD = "#d9b45b";
const GOLD_LT = "#f1d98a";
const REPO = "https://github.com/katgen-collection/main-website";
const STACK = ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Web Audio"];

/** Ornate gold corner flourish; flipped per corner via `flip`. */
function Corner({ pos, flip }: { pos: string; flip: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={`pointer-events-none absolute z-40 h-8 w-8 ${pos}`}
      style={{ transform: flip }}
      fill="none"
      stroke={GOLD}
      strokeWidth="1.4"
      aria-hidden
    >
      <path d="M6 30 L6 12 Q6 6 12 6 L30 6" />
      <path d="M11 30 L11 16 Q11 11 16 11 L30 11" opacity="0.55" />
      <path d="M6 12 C 16 14 18 22 15 26 C 21 24 25 18 22 12" opacity="0.85" />
      <circle cx="6" cy="6" r="2" fill={GOLD_LT} stroke="none" />
    </svg>
  );
}

/** Centered gold rule with a small star, used between sections. */
function Rule() {
  return (
    <div className="my-5 flex items-center justify-center gap-3" aria-hidden>
      <span className="h-px w-10" style={{ background: `linear-gradient(90deg, transparent, ${GOLD})` }} />
      <span className="text-[10px]" style={{ color: GOLD }}>&#10022;</span>
      <span className="h-px w-10" style={{ background: `linear-gradient(90deg, ${GOLD}, transparent)` }} />
    </div>
  );
}

/** A labelled section: a small gold eyebrow above its content. */
function Plate({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-6">
      <div className="font-velvet text-[10px] uppercase tracking-[0.32em]" style={{ color: GOLD }}>
        {label}
      </div>
      <div className="mt-2.5">{children}</div>
    </div>
  );
}

interface Props {
  onBack: () => void;
}

/** The hidden Velvet Room: a royal-blue, gold-trimmed world apart that holds an
 *  atmospheric colophon. Found by catching a butterfly.
 *
 *  The whole interior (room decorations + scrolling colophon) is clipped to a
 *  container just inside the gold proscenium, so nothing ever spills over the
 *  frame. The curtain valance sits above the scroll layer, so content slides
 *  behind it as you scroll. */
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
      {/* base velvet fills the whole screen, behind the frame */}
      <div className="pointer-events-none absolute inset-0 z-0 velvet-bg" aria-hidden />

      {/* room interior, clipped to just inside the gold frame */}
      <div className="absolute inset-[11px] z-10 overflow-hidden">
        {/* fixed room decorations */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-0 h-48 velvet-shimmer"
          style={{ background: "radial-gradient(58% 100% at 50% 0%, rgba(245,215,140,0.20), transparent 72%)" }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-32 velvet-zigzag"
          style={{ maskImage: "linear-gradient(to top, #000, transparent)", WebkitMaskImage: "linear-gradient(to top, #000, transparent)" }}
          aria-hidden
        />
        <svg
          viewBox="0 0 120 100"
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 w-72 -translate-x-1/2 -translate-y-1/2"
          style={{ opacity: 0.05 }}
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

        {/* scrolling content (header row sits at the top of the scroll) */}
        <div
          ref={bodyRef}
          className="absolute inset-0 z-10 overflow-y-auto overflow-x-hidden text-[#cdd6ff]"
          style={{
            transform: pull ? `translateY(${pull}px)` : undefined,
            transition: pull ? "none" : "transform 0.2s ease-out",
          }}
          {...handlers}
        >
          {/* EXIT / FX row, just below the valance */}
          <div className="flex items-center justify-between px-5 pt-12">
            <button
              onClick={onBack}
              aria-label="Leave the Velvet Room"
              className="font-velvet text-[11px] leading-none tracking-[0.26em] active:opacity-70"
              style={{ color: GOLD, border: `1px solid ${GOLD}66`, padding: "8px 13px" }}
            >
              &#9664; EXIT
            </button>
            <SoundToggle variant="velvet" />
          </div>

          {/* colophon body */}
          <div className="px-7 pb-16 pt-6 text-center">
            <div className="mx-auto max-w-[19rem]">
              <div className="font-velvet text-[10px] tracking-[0.34em]" style={{ color: GOLD }}>
                &#10022; BETWEEN DREAM &amp; REALITY &#10022;
              </div>
              <h1
                className="mt-3 font-velvet text-[2.1rem] font-bold leading-[1.08] tracking-[0.1em]"
                style={{ color: GOLD_LT, textShadow: "0 0 20px rgba(217,180,91,0.4)" }}
              >
                VELVET ROOM
              </h1>

              <Rule />

              <p className="text-[14.5px] italic leading-relaxed text-[#dfe5ff]">
                You looked closely enough to find it. Welcome, guest, to a room that exists between dream and
                reality, mind and matter.
              </p>

              <Plate label="Built with">
                <div className="flex flex-wrap justify-center gap-2">
                  {STACK.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 text-[11.5px] tracking-wide"
                      style={{ border: `1px solid ${GOLD}66`, color: "#e9eeff" }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Plate>

              <Plate label="Set in">
                <p className="text-[13.5px] leading-relaxed text-[#aab2e8]">
                  Rubik Mono One &middot; VT323 &middot; DotGothic16
                </p>
              </Plate>

              <Plate label="Inspired by">
                <p className="text-[13.5px] text-[#aab2e8]">Persona 4</p>
              </Plate>

              <a
                href={REPO}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center justify-center px-6 py-3 font-velvet text-[13px] tracking-[0.18em] active:opacity-80"
                style={{ border: `1px solid ${GOLD}`, color: GOLD_LT, boxShadow: "0 0 18px rgba(217,180,91,0.18) inset" }}
              >
                &#9654; VIEW THE SOURCE
              </a>

              <Rule />

              <p className="text-[14.5px] italic text-[#dfe5ff]">Thank you for tuning in.</p>
              <p className="mt-2 font-velvet text-[13px] tracking-[0.3em]" style={{ color: GOLD }}>
                &#10022; MIKHAIL
              </p>

              <p className="mt-6 text-[10px] uppercase tracking-[0.26em] text-[#6f76a8]">
                swipe down or tap exit to leave
              </p>
            </div>
          </div>
        </div>

        {/* scalloped curtain valance, above the scroll so content slides behind it */}
        <svg
          viewBox="0 0 1200 80"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-0 top-0 z-20 h-10 w-full"
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
        <div className="pointer-events-none absolute inset-0 z-30 p4-scanlines opacity-25" aria-hidden />
        <div
          className="pointer-events-none absolute inset-0 z-30"
          style={{ background: "radial-gradient(125% 100% at 50% 46%, transparent 54%, rgba(4,6,30,0.82) 100%)" }}
          aria-hidden
        />
      </div>

      {/* gold ornate frame + corners (drawn over everything) */}
      <div
        className="pointer-events-none absolute inset-[10px] z-40"
        style={{ border: `1px solid ${GOLD}99`, boxShadow: `inset 0 0 0 4px rgba(7,10,44,0.6), inset 0 0 0 5px ${GOLD}44` }}
        aria-hidden
      />
      <Corner pos="left-3 top-3" flip="none" />
      <Corner pos="right-3 top-3" flip="scaleX(-1)" />
      <Corner pos="left-3 bottom-3" flip="scaleY(-1)" />
      <Corner pos="right-3 bottom-3" flip="scale(-1,-1)" />
    </motion.div>
  );
}

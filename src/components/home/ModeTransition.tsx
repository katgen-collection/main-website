"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface Props {
  /** Which gimmick OS we are tuning into. */
  variant: "desktop" | "mobile";
  /** Fired once the screen is fully covered: swap the mode underneath here. */
  onMidpoint: () => void;
  /** Fired once the new mode is fully revealed: tear the overlay down. */
  onDone: () => void;
}

// P5 red pinstripe field, shared by the flip card and its shards so they read
// as one surface right up until it breaks apart.
const P5_FIELD: React.CSSProperties = {
  backgroundColor: "#b11218",
  backgroundImage:
    "repeating-linear-gradient(115deg, rgba(0,0,0,0) 0 26px, rgba(0,0,0,0.22) 26px 30px)",
};

// Five angular slices that tile the viewport (adjacent slices share edges), each
// with the direction it flies when the card shatters.
const SHARDS = [
  { clip: "polygon(0% 0%, 22% 0%, 14% 100%, 0% 100%)", x: "-120%", y: "-18%", rot: -26 },
  { clip: "polygon(22% 0%, 40% 0%, 48% 100%, 14% 100%)", x: "-55%", y: "34%", rot: 17 },
  { clip: "polygon(40% 0%, 62% 0%, 54% 100%, 48% 100%)", x: "0%", y: "-130%", rot: -9 },
  { clip: "polygon(62% 0%, 80% 0%, 88% 100%, 54% 100%)", x: "55%", y: "34%", rot: -17 },
  { clip: "polygon(80% 0%, 100% 0%, 100% 100%, 88% 100%)", x: "120%", y: "-18%", rot: 26 },
];

/**
 * The themed hand-off played when leaving the pro site for a gimmick OS. It
 * covers the screen, calls `onMidpoint` (where the caller swaps the view), then
 * clears to reveal the new mode's lock screen.
 *
 *  - desktop: a P5 red card flips down to cover, then shatters into shards.
 *  - mobile: a P4 Midnight-Channel yellow fog washes in, then lifts away.
 */
export function ModeTransition({ variant, onMidpoint, onDone }: Props) {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<"in" | "out">("in");

  // Cover complete -> swap the mode, then play the reveal.
  const cover = () => {
    onMidpoint();
    setPhase("out");
  };

  if (reduce) {
    return (
      <motion.div
        className="fixed inset-0 z-[200]"
        style={{ background: variant === "mobile" ? "#e9c81b" : "#b11218" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === "in" ? 1 : 0 }}
        transition={{ duration: 0.16 }}
        onAnimationComplete={() => (phase === "in" ? cover() : onDone())}
      />
    );
  }

  if (variant === "mobile") {
    return (
      <div className="fixed inset-0 z-[200] overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 28%, #fbe36b 0%, #e9c81b 36%, #b89400 74%, #5f4b00 100%)",
          }}
          initial={{ opacity: 0, y: "-8%" }}
          animate={phase === "in" ? { opacity: 1, y: "0%" } : { opacity: 0, y: "-14%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          onAnimationComplete={() => (phase === "in" ? cover() : onDone())}
        >
          <div className="absolute inset-0 p4-grain opacity-70" aria-hidden />
          <div className="absolute inset-0 p4-scanlines opacity-30" aria-hidden />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-p4-tele text-2xl uppercase tracking-[0.45em] text-black/55">
              tuning in
            </span>
          </div>
        </motion.div>

        {/* a single bright scan band sweeps down as it tunes in */}
        {phase === "in" && (
          <motion.div
            className="pointer-events-none absolute inset-x-0 h-24"
            style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.5), transparent)" }}
            initial={{ top: "-20%" }}
            animate={{ top: "112%" }}
            transition={{ duration: 0.5, ease: "linear" }}
            aria-hidden
          />
        )}
      </div>
    );
  }

  // desktop: P5 card flips down to cover, then shatters apart
  return (
    <div className="fixed inset-0 z-[200] overflow-hidden" style={{ perspective: 1400 }}>
      {phase === "in" ? (
        <motion.div
          className="absolute inset-0 origin-bottom"
          style={P5_FIELD}
          initial={{ rotateX: 92, opacity: 0.25 }}
          animate={{ rotateX: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          onAnimationComplete={cover}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-p5 text-6xl tracking-tighter text-white [word-spacing:0.4rem] drop-shadow-[3px_3px_0_rgba(0,0,0,0.85)]">
              MIKHAIL
            </span>
          </div>
        </motion.div>
      ) : (
        SHARDS.map((s, i) => (
          <motion.div
            key={i}
            className="absolute inset-0"
            style={{ ...P5_FIELD, clipPath: s.clip, WebkitClipPath: s.clip }}
            initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
            animate={{ x: s.x, y: s.y, rotate: s.rot, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: i * 0.03 }}
            onAnimationComplete={i === SHARDS.length - 1 ? onDone : undefined}
          />
        ))
      )}
    </div>
  );
}

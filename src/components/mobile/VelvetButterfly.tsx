"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const GLOW = "rgba(125, 211, 252, 0.85)";

// Deterministic pseudo-random so a burst's butterflies stay stable across
// re-renders (varying only when the burst counter changes).
function rnd(seed: number) {
  const x = Math.sin(seed * 99.13) * 43758.5453;
  return x - Math.floor(x);
}

function Butterfly({
  seed,
  minSize,
  maxSize,
  zClass,
}: {
  seed: number;
  minSize: number;
  maxSize: number;
  zClass: string;
}) {
  const fromLeft = rnd(seed * 7 + 1) > 0.5;
  const band = 8 + rnd(seed * 13 + 2) * 70; // vertical band, percent
  const duration = 6 + rnd(seed * 17 + 3) * 3.5; // 6-9.5s
  const delay = rnd(seed * 19 + 4) * 1.6; // stagger
  const size = minSize + rnd(seed * 23 + 5) * (maxSize - minSize);
  const gid = `bw${seed}`;

  return (
    <motion.div
      className={`pointer-events-none absolute ${zClass}`}
      style={{ top: 0, left: 0 }}
      initial={{ left: fromLeft ? "-16%" : "112%", top: `${band}%`, opacity: 0 }}
      animate={{
        left: fromLeft ? "112%" : "-16%",
        top: [`${band}%`, `${band - 10}%`, `${band + 8}%`, `${band - 4}%`],
        opacity: [0, 1, 1, 0],
      }}
      transition={{ duration, delay, ease: "easeInOut" }}
    >
      <svg
        width={size}
        height={Math.round(size * 0.83)}
        viewBox="0 0 48 40"
        className="p4-flap"
        style={{ filter: `drop-shadow(0 0 6px ${GLOW})`, transform: fromLeft ? "none" : "scaleX(-1)" }}
        aria-hidden
      >
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0.4" y2="1">
            <stop offset="0%" stopColor="#e0f2fe" />
            <stop offset="55%" stopColor="#7dd3fc" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
        </defs>
        <g stroke="#0ea5e9" strokeWidth="0.6">
          <path d={`M24 17 C 30 5, 45 3, 45 14 C 45 23, 32 23, 24 19 Z`} fill={`url(#${gid})`} />
          <path d={`M24 20 C 31 23, 41 27, 37 36 C 33 42, 25 33, 24 24 Z`} fill={`url(#${gid})`} />
          <path d={`M24 17 C 18 5, 3 3, 3 14 C 3 23, 16 23, 24 19 Z`} fill={`url(#${gid})`} />
          <path d={`M24 20 C 17 23, 7 27, 11 36 C 15 42, 23 33, 24 24 Z`} fill={`url(#${gid})`} />
        </g>
        <circle cx="38" cy="12" r="2" fill="#e0f2fe" opacity="0.85" />
        <circle cx="10" cy="12" r="2" fill="#e0f2fe" opacity="0.85" />
        <ellipse cx="24" cy="20" rx="1.6" ry="9.5" fill="#1e3a8a" />
        <circle cx="24" cy="10.5" r="2" fill="#1e3a8a" />
        <g stroke="#1e3a8a" strokeWidth="0.9" fill="none" strokeLinecap="round">
          <path d="M24 10 C 22 5, 20 4, 18.5 2.5" />
          <path d="M24 10 C 26 5, 28 4, 29.5 2.5" />
        </g>
        <circle cx="18.3" cy="2.3" r="0.9" fill="#1e3a8a" />
        <circle cx="29.7" cy="2.3" r="0.9" fill="#1e3a8a" />
      </svg>
    </motion.div>
  );
}

interface Props {
  /** Min/max butterflies per visit. */
  minCount?: number;
  maxCount?: number;
  /** Min/max butterfly size in px. */
  minSize?: number;
  maxSize?: number;
  /** Min/max gap between visits in ms. */
  minDelay?: number;
  maxDelay?: number;
  /** Tailwind z-index class for stacking against the host screen. */
  zClass?: string;
}

/**
 * A rare Velvet Room moment: a small swarm of bright sky-blue butterflies drifts
 * across the screen now and then. Reusable across screens via props. Disabled
 * under reduced motion.
 */
export function VelvetButterfly({
  minCount = 2,
  maxCount = 4,
  minSize = 28,
  maxSize = 46,
  minDelay = 5000,
  maxDelay = 13000,
  zClass = "z-50",
}: Props = {}) {
  const reduce = useReducedMotion();
  const [burst, setBurst] = useState(0);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    if (reduce) return;
    let timer: ReturnType<typeof setTimeout>;
    const loop = () => {
      const delay = minDelay + Math.random() * Math.max(0, maxDelay - minDelay);
      timer = setTimeout(() => {
        if (!mounted.current) return;
        setBurst((b) => b + 1);
        loop();
      }, delay);
    };
    loop();
    return () => {
      mounted.current = false;
      clearTimeout(timer);
    };
  }, [reduce, minDelay, maxDelay]);

  if (reduce || burst === 0) return null;

  const span = Math.max(0, maxCount - minCount);
  const count = minCount + Math.floor(rnd(burst) * (span + 1));

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <Butterfly key={`${burst}-${i}`} seed={burst * 100 + i} minSize={minSize} maxSize={maxSize} zClass={zClass} />
      ))}
    </>
  );
}

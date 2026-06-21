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
        height={Math.round(size * 0.85)}
        viewBox="0 0 40 34"
        className="p4-flap"
        style={{ filter: `drop-shadow(0 0 6px ${GLOW})`, transform: fromLeft ? "none" : "scaleX(-1)" }}
        aria-hidden
      >
        <g stroke="#0284c7" strokeWidth="0.7" strokeLinejoin="round">
          <path d="M20 12 L37 5 Q39.5 11 34 16 L21 17 Z" fill="#7dd3fc" />
          <path d="M20 12 L3 5 Q0.5 11 6 16 L19 17 Z" fill="#7dd3fc" />
          <path d="M21 18 L33 27 Q30.5 34 25 31 L20 22 Z" fill="#38bdf8" />
          <path d="M19 18 L7 27 Q9.5 34 15 31 L20 22 Z" fill="#38bdf8" />
        </g>
        <ellipse cx="20" cy="18" rx="1.4" ry="8" fill="#1e3a8a" />
        <circle cx="20" cy="9.5" r="1.8" fill="#1e3a8a" />
        <g stroke="#1e3a8a" strokeWidth="0.9" fill="none" strokeLinecap="round">
          <path d="M20 9 C18 4 17 3 15.6 1.8" />
          <path d="M20 9 C22 4 23 3 24.4 1.8" />
        </g>
        <circle cx="15.4" cy="1.6" r="0.9" fill="#1e3a8a" />
        <circle cx="24.6" cy="1.6" r="0.9" fill="#1e3a8a" />
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

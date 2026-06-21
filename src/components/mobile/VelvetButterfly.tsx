"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const VELVET = "#7b8bff";

// Deterministic pseudo-random so a burst's butterflies stay stable across
// re-renders (varying only when the burst counter changes).
function rnd(seed: number) {
  const x = Math.sin(seed * 99.13) * 43758.5453;
  return x - Math.floor(x);
}

function Butterfly({ seed }: { seed: number }) {
  const fromLeft = rnd(seed * 7 + 1) > 0.5;
  const band = 10 + rnd(seed * 13 + 2) * 66; // vertical band, percent
  const duration = 6 + rnd(seed * 17 + 3) * 3; // 6-9s
  const delay = rnd(seed * 19 + 4) * 1.4; // stagger
  const size = 16 + rnd(seed * 23 + 5) * 12; // 16-28px

  return (
    <motion.div
      className="pointer-events-none absolute z-50"
      style={{ top: 0, left: 0 }}
      initial={{ left: fromLeft ? "-14%" : "110%", top: `${band}%`, opacity: 0 }}
      animate={{
        left: fromLeft ? "110%" : "-14%",
        top: [`${band}%`, `${band - 9}%`, `${band + 7}%`, `${band - 3}%`],
        opacity: [0, 0.95, 0.95, 0],
      }}
      transition={{ duration, delay, ease: "easeInOut" }}
    >
      <svg
        width={size}
        height={size * 0.82}
        viewBox="0 0 22 18"
        className="p4-flap"
        style={{
          filter: `drop-shadow(0 0 3px ${VELVET})`,
          transform: fromLeft ? "none" : "scaleX(-1)",
        }}
        aria-hidden
      >
        <g fill={VELVET}>
          <path d="M11 9C5 1 0 3 3 9C0 15 6 17 11 9Z" />
          <path d="M11 9C17 1 22 3 19 9C22 15 16 17 11 9Z" />
        </g>
        <rect x="10.4" y="3" width="1.2" height="12" rx="0.6" fill="#3a4a9a" />
      </svg>
    </motion.div>
  );
}

/**
 * A rare Velvet Room moment: a small swarm of blue butterflies drifts across
 * the screen now and then. Rendered above the CRT texture so they read as
 * crisp and out of place. Disabled under reduced motion.
 */
export function VelvetButterfly() {
  const reduce = useReducedMotion();
  const [burst, setBurst] = useState(0);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    if (reduce) return;
    let timer: ReturnType<typeof setTimeout>;
    const loop = () => {
      const delay = 5000 + Math.random() * 8000; // 5-13s between visits
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
  }, [reduce]);

  if (reduce || burst === 0) return null;

  const count = 2 + Math.floor(rnd(burst) * 3); // 2-4 per visit

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <Butterfly key={`${burst}-${i}`} seed={burst * 100 + i} />
      ))}
    </>
  );
}

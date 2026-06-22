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

// One side's wing (mirrored for the other). Inner edge at the body axis so it
// can hinge there in 3D.
const WING = (
  <g stroke="#0284c7" strokeWidth="0.7" strokeLinejoin="round">
    <path d="M0 12 L17 5 Q19.5 11 14 16 L1 17 Z" fill="#7dd3fc" />
    <path d="M1 18 L13 27 Q10.5 34 5 31 L0 22 Z" fill="#38bdf8" />
  </g>
);

function Butterfly({
  seed,
  minSize,
  maxSize,
  zClass,
  onCatch,
}: {
  seed: number;
  minSize: number;
  maxSize: number;
  zClass: string;
  onCatch?: () => void;
}) {
  const fromLeft = rnd(seed * 7 + 1) > 0.5;
  const band = 8 + rnd(seed * 13 + 2) * 70; // vertical band, percent
  const duration = 6 + rnd(seed * 17 + 3) * 3.5; // 6-9.5s
  const delay = rnd(seed * 19 + 4) * 1.6; // stagger
  const size = minSize + rnd(seed * 23 + 5) * (maxSize - minSize);

  // Varied 3D pose, banked toward the direction of travel.
  const yaw = rnd(seed * 31 + 6) * 70 - 35; // -35..35
  const pitch = rnd(seed * 37 + 7) * 22 - 8; // -8..14
  const bankMag = 8 + rnd(seed * 41 + 8) * 14; // 8..22
  const bank = fromLeft ? bankMag : -bankMag;
  const flapDur = 0.18 + rnd(seed * 43 + 9) * 0.12; // 0.18..0.30

  const H = Math.round(size * 0.85);
  const bodyW = Math.max(3, Math.round((H * 6) / 34));
  const catchable = !!onCatch;

  return (
    <motion.div
      className={`absolute ${zClass} ${catchable ? "pointer-events-auto cursor-pointer" : "pointer-events-none"}`}
      style={{ top: 0, left: 0 }}
      onClick={onCatch}
      initial={{ left: fromLeft ? "-16%" : "112%", top: `${band}%`, opacity: 0 }}
      animate={{
        left: fromLeft ? "112%" : "-16%",
        top: [`${band}%`, `${band - 10}%`, `${band + 8}%`, `${band - 4}%`],
        opacity: [0, 1, 1, 0],
      }}
      transition={{ duration, delay, ease: "easeInOut" }}
    >
      <div style={{ perspective: `${Math.round(size * 6)}px` }}>
        <div
          className="bf-scene relative"
          style={{
            width: size,
            height: H,
            transform: `rotateZ(${bank}deg) rotateX(${pitch}deg) rotateY(${yaw}deg)`,
          }}
        >
          <div className="bf-wing bf-wing-l" style={{ animationDuration: `${flapDur}s` }}>
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 20 34"
              preserveAspectRatio="none"
              style={{ overflow: "visible", filter: `drop-shadow(0 0 5px ${GLOW})`, transform: "scaleX(-1)" }}
              aria-hidden
            >
              {WING}
            </svg>
          </div>
          <div className="bf-wing bf-wing-r" style={{ animationDuration: `${flapDur}s` }}>
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 20 34"
              preserveAspectRatio="none"
              style={{ overflow: "visible", filter: `drop-shadow(0 0 5px ${GLOW})` }}
              aria-hidden
            >
              {WING}
            </svg>
          </div>
          <svg
            className="absolute"
            viewBox="0 0 6 34"
            preserveAspectRatio="none"
            style={{ left: "50%", top: 0, width: bodyW, height: H, transform: "translateX(-50%) translateZ(2px)" }}
            aria-hidden
          >
            <ellipse cx="3" cy="18" rx="1.3" ry="8" fill="#1e3a8a" />
            <circle cx="3" cy="9.5" r="1.7" fill="#1e3a8a" />
            <g stroke="#1e3a8a" strokeWidth="0.9" fill="none" strokeLinecap="round">
              <path d="M3 9 C2 4 1.6 3 0.8 1.6" />
              <path d="M3 9 C4 4 4.4 3 5.2 1.6" />
            </g>
            <circle cx="0.8" cy="1.4" r="0.8" fill="#1e3a8a" />
            <circle cx="5.2" cy="1.4" r="0.8" fill="#1e3a8a" />
          </svg>
        </div>
      </div>
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
  /** When set, butterflies become tappable and call this on tap (the Velvet Room). */
  onCatch?: () => void;
}

/**
 * A rare Velvet Room moment: a small swarm of bright sky-blue 3D butterflies
 * drifts across the screen now and then. Reusable across screens via props.
 * Disabled under reduced motion.
 */
export function VelvetButterfly({
  minCount = 2,
  maxCount = 4,
  minSize = 28,
  maxSize = 46,
  minDelay = 5000,
  maxDelay = 13000,
  zClass = "z-50",
  onCatch,
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
        <Butterfly
          key={`${burst}-${i}`}
          seed={burst * 100 + i}
          minSize={minSize}
          maxSize={maxSize}
          zClass={zClass}
          onCatch={onCatch}
        />
      ))}
    </>
  );
}

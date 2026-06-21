"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const VELVET = "#7b8bff";

/**
 * A rare Velvet Room blue butterfly that drifts across the screen now and then.
 * A subtle Persona nod. Disabled under reduced motion.
 */
export function VelvetButterfly() {
  const reduce = useReducedMotion();
  const [flight, setFlight] = useState<number | null>(null);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    if (reduce) return;
    let timer: ReturnType<typeof setTimeout>;
    let n = 1;
    const schedule = () => {
      const delay = 10000 + Math.random() * 18000; // 10-28s between visits
      timer = setTimeout(() => {
        if (!mounted.current) return;
        setFlight(n++);
      }, delay);
    };
    schedule();
    return () => {
      mounted.current = false;
      clearTimeout(timer);
    };
  }, [reduce]);

  if (reduce || flight === null) return null;

  const fromLeft = flight % 2 === 0;
  const band = 18 + ((flight * 29) % 52); // vertical band, percent

  return (
    <motion.div
      key={flight}
      className="pointer-events-none absolute z-20"
      style={{ top: 0, left: 0 }}
      initial={{ left: fromLeft ? "-14%" : "110%", top: `${band}%`, opacity: 0 }}
      animate={{
        left: fromLeft ? "110%" : "-14%",
        top: [`${band}%`, `${band - 9}%`, `${band + 7}%`, `${band - 3}%`],
        opacity: [0, 0.85, 0.85, 0],
      }}
      transition={{ duration: 7.5, ease: "easeInOut" }}
      onAnimationComplete={() => mounted.current && setFlight(null)}
    >
      <svg
        width="22"
        height="18"
        viewBox="0 0 22 18"
        className="p4-flap"
        style={{ filter: `drop-shadow(0 0 4px ${VELVET})`, transform: fromLeft ? "none" : "scaleX(-1)" }}
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

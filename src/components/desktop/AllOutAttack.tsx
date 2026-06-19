"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";

interface AllOutAttackProps {
  /** Fired once the burst has played; the parent should reveal the desktop here. */
  onComplete: () => void;
}

// Scattered comic shout-words, à la a Persona 5 all-out-attack finish.
const SHOUTS = [
  { t: "GO!", cls: "top-[12%] left-[8%]", rot: -14, delay: 0.30, size: "text-6xl" },
  { t: "SHOWTIME", cls: "top-[22%] right-[7%]", rot: 9, delay: 0.38, size: "text-5xl" },
  { t: "★", cls: "top-[60%] left-[12%]", rot: 0, delay: 0.46, size: "text-7xl" },
  { t: "STEAL IT", cls: "bottom-[16%] right-[12%]", rot: -7, delay: 0.52, size: "text-5xl" },
  { t: "★", cls: "bottom-[24%] left-[44%]", rot: 0, delay: 0.58, size: "text-4xl" },
];

/**
 * Full-screen "all-out attack" burst played when the user unlocks.
 * A white flash, a red ink-splash sweep, a slammed-in title card, and
 * scattered comic shouts — then it wipes away to reveal the desktop.
 */
export const AllOutAttack: React.FC<AllOutAttackProps> = ({ onComplete }) => {
  useEffect(() => {
    const t = setTimeout(onComplete, 1350);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] overflow-hidden bg-black flex items-center justify-center"
      initial={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
      exit={{
        clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
        transition: { duration: 0.55, ease: [0.43, 0.13, 0.23, 0.96] },
      }}
    >
      {/* Opening white flash */}
      <motion.div
        className="absolute inset-0 bg-white z-30 pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
      />

      {/* Red ink-splash sweep */}
      <motion.div
        className="absolute inset-0 bg-red-600 z-0"
        style={{ clipPath: "polygon(0 28%, 100% 0, 100% 72%, 0 100%)" }}
        initial={{ x: "-115%", skewX: -8 }}
        animate={{ x: "0%", skewX: 0 }}
        transition={{ type: "spring", stiffness: 110, damping: 16, delay: 0.08 }}
      />

      {/* Halftone over the splash */}
      <div
        className="absolute inset-0 z-[1] opacity-20 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #000 1.2px, transparent 1.3px)",
          backgroundSize: "10px 10px",
        }}
      />

      {/* Scattered shouts */}
      {SHOUTS.map((s, i) => (
        <motion.span
          key={i}
          className={`absolute z-20 font-p5 text-white ${s.size} ${s.cls} drop-shadow-[4px_4px_0_rgba(0,0,0,1)] select-none`}
          style={{ rotate: `${s.rot}deg` }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 320, damping: 12, delay: s.delay }}
        >
          {s.t}
        </motion.span>
      ))}

      {/* Slammed-in title card */}
      <motion.div
        className="relative z-20 text-center"
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: -3 }}
        transition={{ type: "spring", stiffness: 260, damping: 13, delay: 0.22 }}
      >
        <div className="bg-black border-[6px] border-white px-8 md:px-12 py-5 shadow-[16px_16px_0_0_rgba(0,0,0,0.7)] -rotate-1">
          <span className="font-p5 text-5xl md:text-8xl text-white tracking-widest drop-shadow-[5px_5px_0_rgba(168,85,247,1)] [word-spacing:0.4rem]">
            TAKE YOUR TIME
          </span>
        </div>
        <motion.div
          className="mt-5 inline-block bg-yellow-400 border-4 border-black px-5 py-1 rotate-1 shadow-[5px_5px_0_0_rgba(0,0,0,1)]"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 280, damping: 16 }}
        >
          <span className="font-p5 text-xl md:text-2xl text-black tracking-wider uppercase [word-spacing:0.4rem]">
            Welcome, Mikhail
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

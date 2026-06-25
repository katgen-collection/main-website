"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface Props {
  /** Which gimmick OS's theme this hand-off wears (tied to the gimmick side,
   *  not the destination, so it matches in both directions). */
  variant: "desktop" | "mobile";
  /** Fired once the screen is fully covered: swap the mode underneath here. */
  onMidpoint: () => void;
  /** Fired once the new mode is fully revealed: tear the overlay down. */
  onDone: () => void;
}

/**
 * The themed hand-off played whenever the pro site and a gimmick OS swap
 * places. It covers the screen, calls `onMidpoint` (where the caller swaps the
 * view), then clears to reveal the other side.
 *
 *  - desktop: a P5 red vertigo swirl spins up and smears the screen red, then
 *    unwinds away.
 *  - mobile: a P4 channel-flip, all static, roll, RGB split and signal-hunt,
 *    that snaps to the other side like a TV finding its frequency.
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
    const dur = phase === "in" ? 0.8 : 0.6;
    // Static creeps gradually out of the current screen, then recedes into the
    // next one. A 4-stop ramp so it builds (and clears) progressively.
    const ramp = phase === "in" ? [0, 0.25, 0.6, 1] : [1, 0.55, 0.2, 0];
    const rampTimes = [0, 0.4, 0.75, 1];
    return (
      <div className="fixed inset-0 z-[200] overflow-hidden">
        {/* darkening base; also drives the timing of each phase. Starts clear so
            the screen you're leaving shows through as the static moves in. */}
        <motion.div
          className="absolute inset-0 bg-black"
          initial={{ opacity: phase === "in" ? 0 : 1 }}
          animate={{ opacity: ramp }}
          transition={{ duration: dur, times: rampTimes, ease: "linear" }}
          onAnimationComplete={() => (phase === "in" ? cover() : onDone())}
        />

        {/* TV static snow */}
        <motion.div
          className="absolute inset-0 p4-grain"
          initial={{ opacity: phase === "in" ? 0 : 1 }}
          animate={{ opacity: ramp }}
          transition={{ duration: dur, times: rampTimes, ease: "linear" }}
          aria-hidden
        />

        {/* horizontal static lines, rolling slowly down the screen */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(255,255,255,0.18) 0 1px, rgba(0,0,0,0) 1px 3px), repeating-linear-gradient(0deg, rgba(0,0,0,0.35) 0 2px, rgba(0,0,0,0) 2px 10px)",
          }}
          initial={{ opacity: phase === "in" ? 0 : 1, backgroundPositionY: "0px" }}
          animate={{ opacity: phase === "in" ? 1 : 0, backgroundPositionY: "70px" }}
          transition={{ duration: dur, ease: "linear" }}
          aria-hidden
        />

        {/* a thicker tear band drifting vertically */}
        <motion.div
          className="absolute inset-x-0 h-12"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.45), transparent)" }}
          initial={{ opacity: phase === "in" ? 0 : 0.5, top: "12%" }}
          animate={{ opacity: phase === "in" ? [0, 0.5, 0.5, 0.45] : [0.5, 0.3, 0.1, 0], top: ["8%", "38%", "62%", "88%"] }}
          transition={{ duration: dur, ease: "linear" }}
          aria-hidden
        />

        {/* yellow Midnight-Channel tint creeping in */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(120% 90% at 50% 40%, rgba(233,200,27,0.5), rgba(120,95,0,0.18))",
            mixBlendMode: "screen",
          }}
          initial={{ opacity: phase === "in" ? 0 : 0.7 }}
          animate={{ opacity: ramp.map((v) => v * 0.7) }}
          transition={{ duration: dur, times: rampTimes, ease: "linear" }}
          aria-hidden
        />
      </div>
    );
  }

  // desktop: a P5 red vertigo swirl that spins up to smear the screen, then unwinds away
  const dur = phase === "in" ? 0.45 : 0.5;
  return (
    <div className="fixed inset-0 z-[200] overflow-hidden">
      {/* solid red cover that also drives the phase timing */}
      <motion.div
        className="absolute inset-0"
        style={{ backgroundColor: "#c01616" }}
        initial={{ opacity: 0 }}
        animate={phase === "in" ? { opacity: [0, 1, 1] } : { opacity: [1, 1, 0] }}
        transition={{
          duration: dur,
          times: [0, 0.55, 1],
          ease: phase === "in" ? [0.7, 0, 0.84, 0] : [0.16, 1, 0.3, 1],
        }}
        onAnimationComplete={() => (phase === "in" ? cover() : onDone())}
      />

      {/* the spinning red swirl */}
      <motion.div
        className="absolute left-1/2 top-1/2 aspect-square w-[160vmax]"
        style={{
          translateX: "-50%",
          translateY: "-50%",
          background:
            "conic-gradient(from 0deg, #ef2b2b, #6f0c0c, #ef2b2b, #6f0c0c, #ef2b2b, #6f0c0c, #ef2b2b)",
          filter: "blur(2px)",
        }}
        initial={{ rotate: 0, scale: 0.2, opacity: 0 }}
        animate={phase === "in" ? { rotate: 220, scale: 1.1, opacity: 0.95 } : { rotate: 470, scale: 2.6, opacity: 0 }}
        transition={{ duration: dur, ease: phase === "in" ? "easeIn" : "easeOut" }}
        aria-hidden
      />

      {/* diagonal speed streaks for the smear */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, rgba(0,0,0,0.28) 0 10px, rgba(0,0,0,0) 10px 34px)",
          mixBlendMode: "multiply",
        }}
        initial={{ opacity: 0, x: "-18%" }}
        animate={phase === "in" ? { opacity: 0.8, x: "0%" } : { opacity: 0, x: "18%" }}
        transition={{ duration: dur, ease: "easeInOut" }}
        aria-hidden
      />

      {/* P5 splash text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          className="font-p5 text-6xl tracking-tighter text-white [word-spacing:0.4rem] drop-shadow-[3px_3px_0_rgba(0,0,0,0.85)]"
          initial={{ opacity: 0, scale: 1.4, rotate: -6 }}
          animate={phase === "in" ? { opacity: 1, scale: 1, rotate: -3 } : { opacity: 0, scale: 0.6, rotate: -3 }}
          transition={{ duration: phase === "in" ? 0.4 : 0.3 }}
        >
          TAKE YOUR TIME
        </motion.span>
      </div>
    </div>
  );
}

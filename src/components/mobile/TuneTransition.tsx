"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { sound } from "./sound";
import { crtMotion } from "./crtMotion";

interface Props {
  ch: string;
  label: string;
  onDone: () => void;
}

/**
 * Signature tune-in, reworked as a physical CRT channel-change: heavy snow +
 * color bars + tracking band, a PLEASE STAND BY card, a tuning meter that fills,
 * a bright horizontal sync flash, then the whole frame collapses to a scanline
 * (the channel powers on from that line). Reduced motion cuts straight through.
 */
export function TuneTransition({ ch, label, onDone }: Props) {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0); // 0 = no signal, 1 = tuning, 2 = lock + flash

  useEffect(() => {
    if (reduce) {
      onDone();
      return;
    }
    sound.tune();
    const t1 = setTimeout(() => setStep(1), 280);
    const t2 = setTimeout(() => {
      setStep(2);
      sound.clunk();
    }, 640);
    const t3 = setTimeout(onDone, 860);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [reduce, onDone]);

  if (reduce) return null;

  const lit = step >= 2 ? 8 : step >= 1 ? 6 : 2;

  return (
    <motion.div
      className="absolute inset-0 z-50 bg-[#0a0b06]"
      style={{ transformOrigin: "center" }}
      onClick={onDone}
      {...crtMotion(reduce)}
    >
      <div className="pointer-events-none absolute inset-0 p4-static opacity-[0.55]" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 p4-colorbars opacity-90" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 top-16 h-4 bg-[#101208]" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 h-12 p4-tracking" aria-hidden />
      <div className="pointer-events-none absolute inset-0 p4-scanlines opacity-60" aria-hidden />
      <div className="pointer-events-none absolute inset-0 p4-vignette" aria-hidden />

      <div className="absolute left-4 top-5 font-p4-tele text-lg text-[#efe9cf]">▶ PLAY</div>

      {/* bright horizontal sync flash on lock */}
      {step === 2 && (
        <motion.div
          className="pointer-events-none absolute inset-x-0 top-1/2 z-10 h-1 -translate-y-1/2 bg-white"
          initial={{ opacity: 0, scaleX: 0.2 }}
          animate={{ opacity: [0, 1, 0], scaleX: 1 }}
          transition={{ duration: 0.32 }}
          aria-hidden
        />
      )}

      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center"
        animate={step === 2 ? { scale: 1.08, opacity: 0 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.22 }}
      >
        <div className="border-2 border-[#efe9cf] bg-[#0a0b06]/85 px-6 py-4 shadow-[0_0_28px_rgba(0,0,0,0.7)]">
          <div className="font-p4-tele text-2xl tracking-[0.25em] text-[#e85a4a] p4-glow-red p4-chroma p4-blink-fast">
            ⚠ NO SIGNAL
          </div>
          <div className="my-3 h-0.5 bg-[#efe9cf]/40" />
          <div className="font-p4-display text-xl leading-tight text-[#efe9cf]">
            PLEASE
            <br />
            STAND BY
          </div>
        </div>
        <div className="mt-6 font-p4-tele text-xl tracking-[0.15em] text-[#f5c518] p4-glow">
          ◀ TUNING ▶ CH {ch}
        </div>
        <div className="mt-1 font-p4-label text-[12px] tracking-[0.2em] text-[#8fd6d6]">{label}</div>
        <div className="mt-4 flex w-56 gap-1 border border-[#efe9cf] p-1">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="h-2.5 flex-1 transition-colors duration-200"
              style={{ background: i < lit ? "#f5c518" : "#4a4a30" }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

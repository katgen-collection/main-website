"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface Props {
  ch: string;
  label: string;
  onDone: () => void;
}

export function TuneTransition({ ch, label, onDone }: Props) {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0); // 0 = static, 1 = tuning meter, 2 = dissolve

  useEffect(() => {
    if (reduce) {
      onDone();
      return;
    }
    const t1 = setTimeout(() => setStep(1), 220);
    const t2 = setTimeout(() => setStep(2), 600);
    const t3 = setTimeout(onDone, 900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [reduce, onDone]);

  if (reduce) return null;

  return (
    <motion.div
      className="absolute inset-0 z-50 bg-[#0a0b06]"
      onClick={onDone}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="pointer-events-none absolute inset-0 p4-static opacity-60" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 p4-colorbars opacity-80" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 h-12 p4-tracking" aria-hidden />

      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center text-center"
        animate={step === 2 ? { scale: 1.15, opacity: 0 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="border-2 border-[#efe9cf] bg-[#0a0b06]/80 px-6 py-4">
          <div className="font-p4-tele text-2xl tracking-[0.2em] text-[#e85a4a] p4-blink">
            {step === 0 ? "NO SIGNAL" : "TUNING..."}
          </div>
        </div>
        <div className="mt-6 font-p4-tele text-xl tracking-[0.15em] text-[#f5c518]">
          CH {ch} / {label}
        </div>
        <div className="mt-4 flex w-52 gap-1 border border-[#efe9cf] p-1">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="h-2 flex-1"
              style={{ background: step >= 1 && i < 6 ? "#f5c518" : "#4a4a30" }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

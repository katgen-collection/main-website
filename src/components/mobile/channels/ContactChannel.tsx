"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { ChannelShell } from "../TVOverlay";

const VELVET = "#7b8bff";

const LINKS = [
  { Icon: Github, href: "https://github.com/MikhailJBS", label: "GITHUB" },
  { Icon: Linkedin, href: "https://www.linkedin.com/in/mikhailharitz77/", label: "LINKEDIN" },
  { Icon: Mail, href: "mailto:mikhailharitz@gmail.com", label: "EMAIL" },
];

interface Props {
  onBack: () => void;
}

/** Contact rendered as a transmission: signal waves, an OPEN LINE indicator
 *  (the single subtle Velvet Room blue accent), a glowing mailto, and links. */
export function ContactChannel({ onBack }: Props) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="absolute inset-0"
      style={{ transformOrigin: "center" }}
      initial={reduce ? { opacity: 0 } : { opacity: 0.7, scaleY: 0.02 }}
      animate={reduce ? { opacity: 1 } : { opacity: 1, scaleY: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      <ChannelShell ch="03" label="CONTACT" onBack={onBack}>
        {/* transmission graphic (Velvet Room blue) */}
        <div className="relative mx-auto mt-1 h-24 w-24">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="p4-wave absolute inset-0 rounded-full border"
              style={{ borderColor: VELVET, opacity: 0.4, animationDelay: `${i * 0.85}s` }}
              aria-hidden
            />
          ))}
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="h-3 w-3 rounded-full p4-blink" style={{ background: VELVET }} aria-hidden />
          </span>
        </div>
        <div className="mt-2 text-center">
          <span
            className="font-p4-tele text-lg tracking-[0.25em] p4-glow-velvet p4-blink"
            style={{ color: VELVET }}
          >
            ● OPEN LINE
          </span>
        </div>

        <p className="mt-4 text-center font-p4-tele text-[16px] leading-snug text-[#cdd2a0]">
          Have a project, a role, or just want to talk shop? Send a signal.
        </p>

        <a
          href="mailto:mikhailharitz@gmail.com"
          className="mt-4 flex items-center justify-center border-2 border-[#efe9cf] bg-[#0e0f08] px-4 py-4 active:border-[#f5c518]"
        >
          <span className="font-p4-tele text-lg tracking-wide text-[#f5c518] p4-glow">
            ▶ mikhailharitz@gmail.com
          </span>
          <span className="ml-1 inline-block h-5 w-2.5 bg-[#f5c518] p4-blink-fast" aria-hidden />
        </a>

        <div className="mt-4 grid grid-cols-3 gap-3">
          {LINKS.map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="relative flex flex-col items-center gap-2 overflow-hidden border-2 border-[#3a4226] bg-[#13150b] py-4 active:border-[#f5c518]"
            >
              <span className="pointer-events-none absolute inset-0 p4-static opacity-[0.18]" aria-hidden />
              <Icon className="relative h-6 w-6" color="#8fd6d6" aria-hidden />
              <span className="relative font-p4-label text-[10px] tracking-wide text-[#cdd2a0]">{label}</span>
            </a>
          ))}
        </div>
      </ChannelShell>
    </motion.div>
  );
}

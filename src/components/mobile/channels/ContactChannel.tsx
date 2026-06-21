"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { ChannelShell } from "../TVOverlay";

const LINKS = [
  { Icon: Github, href: "https://github.com/MikhailJBS", label: "GitHub" },
  { Icon: Linkedin, href: "https://www.linkedin.com/in/mikhailharitz77/", label: "LinkedIn" },
  { Icon: Mail, href: "mailto:mikhailharitz@gmail.com", label: "Email" },
];

interface Props {
  onBack: () => void;
}

export function ContactChannel({ onBack }: Props) {
  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <ChannelShell ch="03" label="CONTACT" onBack={onBack}>
        <div className="px-4 py-5">
          <h2 className="font-p4-display text-2xl tracking-wide text-[#1a1714]">OPEN A LINE</h2>
          <p className="mt-2 font-p4-mono text-[12px] leading-relaxed text-[#3a3324]">
            Have a project, a role, or just want to talk shop? Send a signal.
          </p>

          <a
            href="mailto:mikhailharitz@gmail.com"
            className="mt-5 block rounded-xl border-2 border-[#1a1714] bg-[#1a1714] px-4 py-4 text-center font-p4-display text-base tracking-[0.12em] text-[#f5c518] shadow-[4px_4px_0_#e8352e] transition-transform active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_#e8352e]"
          >
            mikhailharitz@gmail.com
          </a>

          <div className="mt-5 grid grid-cols-3 gap-3">
            {LINKS.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex flex-col items-center gap-2 rounded-xl border-2 border-[#1a1714] bg-[#fffdf7] py-4 shadow-[3px_3px_0_#1a1714] transition-transform active:translate-x-[1px] active:translate-y-[1px]"
              >
                <Icon className="h-6 w-6 text-[#1a1714]" aria-hidden />
                <span className="font-p4-mono text-[10px] font-bold uppercase tracking-wide text-[#1a1714]">
                  {label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </ChannelShell>
    </motion.div>
  );
}

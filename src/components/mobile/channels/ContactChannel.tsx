"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { ChannelShell } from "../TVOverlay";

const LINKS = [
  { Icon: Github, href: "https://github.com/MikhailJBS", label: "GITHUB" },
  { Icon: Linkedin, href: "https://www.linkedin.com/in/mikhailharitz77/", label: "LINKEDIN" },
  { Icon: Mail, href: "mailto:mikhailharitz@gmail.com", label: "EMAIL" },
];

interface Props {
  onBack: () => void;
}

/** Contact rendered as a broadcast: a teletext mailto line and channel-style links. */
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
        <p className="font-p4-tele text-[16px] leading-snug text-[#cdd2a0]">
          Have a project, a role, or just want to talk shop? Send a signal.
        </p>

        <a
          href="mailto:mikhailharitz@gmail.com"
          className="mt-4 flex items-center justify-center border-2 border-[#efe9cf] bg-[#0e0f08] px-4 py-4 active:border-[#f5c518]"
        >
          <span className="font-p4-tele text-lg tracking-wide text-[#f5c518] p4-glow">
            ▶ mikhailharitz@gmail.com
          </span>
        </a>

        <div className="mt-4 grid grid-cols-3 gap-3">
          {LINKS.map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex flex-col items-center gap-2 border-2 border-[#3a4226] bg-[#13150b] py-4 active:border-[#f5c518]"
            >
              <Icon className="h-6 w-6" color="#8fd6d6" aria-hidden />
              <span className="font-p4-label text-[10px] tracking-wide text-[#cdd2a0]">{label}</span>
            </a>
          ))}
        </div>
      </ChannelShell>
    </motion.div>
  );
}

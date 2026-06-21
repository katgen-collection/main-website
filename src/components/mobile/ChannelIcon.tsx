"use client";

import { LayoutGrid, User, Mail, FileText, Globe } from "lucide-react";
import type { ChannelDef, ChannelId } from "./mobileData";

const ICONS: Record<ChannelId, typeof LayoutGrid> = {
  projects: LayoutGrid,
  me: User,
  contact: Mail,
  resume: FileText,
  web: Globe,
};

interface Props {
  channel: ChannelDef;
  onSelect: (id: ChannelId) => void;
}

export function ChannelIcon({ channel, onSelect }: Props) {
  const Icon = ICONS[channel.id];
  return (
    <button
      onClick={() => onSelect(channel.id)}
      className="relative flex flex-col items-start gap-2 rounded-lg border-2 border-[#3a4226] bg-[#13150b] p-4 text-left transition-colors active:border-[#f5c518]"
    >
      <span className="absolute -top-3 left-3 bg-[#f5c518] px-2 font-p4-tele text-base leading-none text-[#181a0e]">
        CH {channel.ch}
      </span>
      <Icon className="mt-2 h-7 w-7 text-[#f5c518]" aria-hidden />
      <span className="font-p4-display text-base tracking-[0.15em] text-[#efe9cf]">{channel.label}</span>
      <span className="font-p4-mono text-[10px] uppercase tracking-[0.18em] text-[#8fd6d6]">
        {channel.tagline}
      </span>
    </button>
  );
}

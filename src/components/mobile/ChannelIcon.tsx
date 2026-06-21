"use client";

import { LayoutGrid, User, Mail, FileText, Globe } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ChannelDef, ChannelId } from "./mobileData";

const ICONS: Record<ChannelId, LucideIcon> = {
  projects: LayoutGrid,
  me: User,
  contact: Mail,
  resume: FileText,
  web: Globe,
};

interface Props {
  channel: ChannelDef;
  highlight?: boolean;
  onSelect: (id: ChannelId) => void;
}

/** A channel tile styled as an EPG cell: CH bug, a static preview pane, and a label. */
export function ChannelIcon({ channel, highlight = false, onSelect }: Props) {
  const Icon = ICONS[channel.id];
  const border = highlight
    ? "border-[#f5c518] shadow-[0_0_14px_rgba(245,197,24,0.35)]"
    : "border-[#3a4226]";
  const labelColor = highlight ? "text-[#f5c518]" : "text-[#cdd2a0]";
  const iconColor = highlight ? "#f5c518" : "#8fd6d6";

  return (
    <button
      onClick={() => onSelect(channel.id)}
      className={`relative rounded-[4px] border-2 ${border} bg-[#13150b] p-2 text-left transition-colors active:border-[#f5c518]`}
    >
      <span className="absolute -top-3 left-2 bg-[#f5c518] px-1.5 font-p4-tele text-sm leading-none text-[#181a0e]">
        CH {channel.ch}
      </span>
      <span className="relative mt-1 flex h-16 items-center justify-center overflow-hidden rounded-[2px] bg-[#070803]">
        <span className="pointer-events-none absolute inset-0 p4-static opacity-25" aria-hidden />
        <Icon className="relative h-6 w-6" color={iconColor} strokeWidth={2} aria-hidden />
      </span>
      <span className={`mt-2 block text-center font-p4-label text-[12px] tracking-wide ${labelColor}`}>
        {channel.label}
      </span>
    </button>
  );
}

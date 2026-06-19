import { ProjectStatus } from "@/types/projects";

const META: Record<ProjectStatus, { label: string; text: string; dot: string }> = {
  live: {
    label: "LIVE",
    text: "text-green-400",
    dot: "bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.9)]",
  },
  "in-progress": {
    label: "IN PROGRESS",
    text: "text-amber-400",
    dot: "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]",
  },
  archived: {
    label: "ARCHIVED",
    text: "text-[#6B6B74]",
    dot: "",
  },
};

export function StatusChip({ status }: { status: ProjectStatus }) {
  const m = META[status];
  return (
    <span className="inline-flex items-center gap-1.5 font-code text-[10px] tracking-wide">
      {m.dot && <span className={`w-1.5 h-1.5 rounded-full ${m.dot}`} />}
      <span className={m.text}>{m.label}</span>
    </span>
  );
}

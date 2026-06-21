// Channel registry and shared types for the P4 "Midnight Channel" mobile OS.

export type MobilePhase = "lock" | "guide" | "tuning" | "channel";

export type ChannelId = "projects" | "me" | "contact" | "resume" | "web";

// "channel" opens through the tune-in transition; "action" runs immediately.
export type ChannelKind = "channel" | "action";

export interface ChannelDef {
  id: ChannelId;
  ch: string;
  label: string;
  tagline: string;
  kind: ChannelKind;
}

export const CHANNELS: ChannelDef[] = [
  { id: "projects", ch: "01", label: "PROJECTS", tagline: "Selected broadcasts", kind: "channel" },
  { id: "me", ch: "02", label: "ME", tagline: "Profile and signal", kind: "channel" },
  { id: "contact", ch: "03", label: "CONTACT", tagline: "Open a line", kind: "channel" },
  { id: "resume", ch: "04", label: "RESUME", tagline: "The full record", kind: "action" },
  { id: "web", ch: "05", label: "WEB", tagline: "Switch to the site", kind: "action" },
];

// Same resume link the professional site uses.
export const RESUME_URL =
  "https://drive.google.com/file/d/1pISl6NVG0hZe0xVmee6-dYzRP2Sw6Lqo/view?usp=sharing";

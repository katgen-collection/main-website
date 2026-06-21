// Channel registry and shared types for the P4 "Midnight Channel" mobile OS.

export type MobilePhase = "lock" | "guide" | "tuning" | "channel";

export type ChannelId = "projects" | "me" | "contact" | "resume" | "web";

export interface ChannelDef {
  id: ChannelId;
  ch: string;
  label: string;
  tagline: string;
}

export const CHANNELS: ChannelDef[] = [
  { id: "projects", ch: "01", label: "PROJECTS", tagline: "Selected broadcasts" },
  { id: "me", ch: "02", label: "ME", tagline: "Profile and signal" },
  { id: "contact", ch: "03", label: "CONTACT", tagline: "Open a line" },
  { id: "resume", ch: "04", label: "RESUME", tagline: "The full record" },
  { id: "web", ch: "05", label: "WEB", tagline: "Switch to the site" },
];

// Same resume link the professional site uses.
export const RESUME_URL =
  "https://drive.google.com/file/d/1pISl6NVG0hZe0xVmee6-dYzRP2Sw6Lqo/view?usp=sharing";

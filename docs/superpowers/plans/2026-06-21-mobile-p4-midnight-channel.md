# Mobile "Midnight Channel" OS Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a third, phone-native interface, themed as a Persona 4 "Midnight Channel" broadcast, that mobile visitors land on instead of the professional website.

**Architecture:** A new `src/components/mobile/` module (mirroring `src/components/desktop/`) with a phase machine (lock -> channel guide -> tune-in transition -> channel) rendered by `MobileEnvironment`. `HomeClient` becomes a three-way switch (desktop / mobile / website) chosen by viewport width. Channels reuse existing data (`projects`, `skillCategories`). The professional `SiteHome` stays reachable via the WEB channel. The vintage look is pure CSS (scanlines, vignette, fog, SVG-noise static); no image assets, no canvas/WebGL.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4 (`@import "tailwindcss"`), framer-motion, lucide-react, `next/font/google`.

## Global Constraints

- Next.js 16 App Router, React 19, TypeScript, Tailwind v4. All new components are client components (`"use client"`).
- **No em dashes ("-") anywhere in rendered copy.** Use periods, commas, or restructure. Hyphens in ranges like `2022-2026` are fine. This is a hard project rule.
- **Respect `prefers-reduced-motion: reduce`:** freeze texture animations and skip the static tune-in (cut straight to the channel). Implemented via CSS media query plus framer-motion `useReducedMotion`.
- **Persona 4 is rounded, never P5's slant.** Use rounded corners and hard offset shadows (`shadow-[Npx_Npx_0_color]`); no `skewX`.
- Palette tokens: midnight `#0d0b07`/`#161309`, canary `#f5c518`/`#ffd400`, phosphor-teal `#8fd6d6`, live-green `#7ee07e`, broadcast-red `#e8352e`/`#c0392b`, bone `#fff8e6`/`#efe9cf`, ink `#1a1714`.
- Tap targets at least 44px; every actionable element keyboard-focusable with a visible state; `aria-hidden` on pure-decoration layers.
- **Verification model:** this repo has no unit-test runner (package.json scripts are `dev`, `build`, `lint`). Per-task gates are `npx tsc --noEmit` (types) and `npm run lint` (eslint). `npm run build` runs at the integration and polish tasks. Visual checks run in `npm run dev` at a sub-768px viewport and are called out where they apply.
- **Commits:** every commit message ends with the trailer `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`. Work stays on the existing `feat/mobile-p4-midnight-channel` branch.

---

### Task 1: P4 fonts and global CSS foundation

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- Produces: CSS variables `--font-p4-display`, `--font-p4-tele`, `--font-p4-mono` on `<body>`; utility classes `.font-p4-display`, `.font-p4-tele`, `.font-p4-mono`; texture classes `.p4-scanlines`, `.p4-vignette`, `.p4-fog`, `.p4-rain`, `.p4-dashes`, `.p4-blink`, `.p4-glow`, `.p4-static`, `.p4-colorbars`, `.p4-tracking`. All later tasks consume these.

- [ ] **Step 1: Add the three P4 fonts in `layout.tsx`**

Change the `next/font/google` import line to include the new families:

```tsx
import { Inter, Space_Grotesk, JetBrains_Mono, Archivo_Black, VT323, Space_Mono } from "next/font/google"
```

Add these font instances directly below the existing `jetbrainsMono` declaration (after line 12):

```tsx
// P4 mobile OS - display (white-outlined headings, channel names, clock)
const archivoBlack = Archivo_Black({ subsets: ["latin"], weight: "400", variable: "--font-p4-display" })
// P4 mobile OS - teletext numerals and CRT readouts
const vt323 = VT323({ subsets: ["latin"], weight: "400", variable: "--font-p4-tele" })
// P4 mobile OS - body and labels
const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-p4-mono" })
```

Then add the three variables to the `<body>` className (keep the existing ones):

```tsx
<body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${p5_font.variable} ${archivoBlack.variable} ${vt323.variable} ${spaceMono.variable} font-sans bg-black text-white`}>
```

- [ ] **Step 2: Append the P4 utility and texture CSS to `globals.css`**

Add this block at the very end of `src/app/globals.css`:

```css
/* ------------------------------------------------------------------ */
/*  Persona 4 "Midnight Channel" mobile OS                             */
/* ------------------------------------------------------------------ */
.font-p4-display { font-family: var(--font-p4-display), sans-serif; }
.font-p4-tele { font-family: var(--font-p4-tele), monospace; }
.font-p4-mono { font-family: var(--font-p4-mono), ui-monospace, monospace; }

.p4-glow { text-shadow: 0 0 14px rgba(245, 197, 24, 0.45); }

@keyframes p4-scan { from { background-position: 0 0; } to { background-position: 0 6px; } }
.p4-scanlines {
  background-image: repeating-linear-gradient(
    rgba(0, 0, 0, 0) 0 2px,
    rgba(0, 0, 0, 0.35) 3px,
    rgba(0, 0, 0, 0.35) 4px
  );
  animation: p4-scan 1s linear infinite;
}

.p4-vignette {
  background: radial-gradient(120% 100% at 50% 50%, transparent 58%, rgba(0, 0, 0, 0.6) 100%);
}

@keyframes p4-fog-drift {
  0% { transform: translate3d(-4%, 0, 0); }
  100% { transform: translate3d(4%, 2%, 0); }
}
.p4-fog {
  background: radial-gradient(60% 50% at 50% 40%, rgba(245, 197, 24, 0.10), transparent 70%);
  filter: blur(8px);
  animation: p4-fog-drift 12s ease-in-out infinite alternate;
}

@keyframes p4-rain-fall { from { background-position: 0 0; } to { background-position: 0 220px; } }
.p4-rain {
  background-image: repeating-linear-gradient(
    100deg,
    rgba(143, 214, 214, 0) 0 9px,
    rgba(143, 214, 214, 0.10) 9px 10px
  );
  animation: p4-rain-fall 0.7s linear infinite;
  opacity: 0.5;
}

.p4-dashes {
  background-image: repeating-linear-gradient(90deg, #f5c518 0 8px, transparent 8px 14px);
  opacity: 0.7;
}

@keyframes p4-blink { 0%, 48% { opacity: 1; } 50%, 98% { opacity: 0.15; } 100% { opacity: 1; } }
.p4-blink { animation: p4-blink 1.3s steps(1) infinite; }

@keyframes p4-static-jitter { 0% { background-position: 0 0; } 100% { background-position: 60px 60px; } }
.p4-static {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  animation: p4-static-jitter 0.2s steps(2) infinite;
}

.p4-colorbars {
  background: linear-gradient(
    90deg,
    #c9c9c9 0 14.2%, #c9c900 0 28.5%, #00c9c9 0 42.8%,
    #00c900 0 57.1%, #c900c9 0 71.4%, #c90000 0 85.7%, #0000c9 0 100%
  );
}

@keyframes p4-track { 0% { top: -20%; } 100% { top: 120%; } }
.p4-tracking {
  top: -20%;
  background: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0));
  animation: p4-track 2.2s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .p4-scanlines, .p4-fog, .p4-rain, .p4-blink, .p4-static, .p4-tracking { animation: none !important; }
  .p4-rain { opacity: 0.2; }
}
```

- [ ] **Step 3: Type-check and lint**

Run: `npx tsc --noEmit`
Expected: no output (success).
Run: `npm run lint`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx src/app/globals.css
git commit -m "feat(mobile): add P4 Midnight Channel fonts and texture CSS"
```

---

### Task 2: Channel registry and types

**Files:**
- Create: `src/components/mobile/mobileData.ts`

**Interfaces:**
- Produces: `type MobilePhase = "lock" | "guide" | "tuning" | "channel"`; `type ChannelId = "projects" | "me" | "contact" | "resume" | "web"`; `type ChannelKind = "channel" | "action"`; `interface ChannelDef { id: ChannelId; ch: string; label: string; tagline: string; kind: ChannelKind }`; `const CHANNELS: ChannelDef[]`; `const RESUME_URL: string`. Consumed by `MobileEnvironment`, `ChannelGuide`, `ChannelIcon`.

- [ ] **Step 1: Create `mobileData.ts`**

```ts
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
```

- [ ] **Step 2: Type-check and lint**

Run: `npx tsc --noEmit`
Expected: no output.
Run: `npm run lint`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/mobile/mobileData.ts
git commit -m "feat(mobile): add channel registry and phase types"
```

---

### Task 3: Shared TV overlay and channel shell

**Files:**
- Create: `src/components/mobile/TVOverlay.tsx`

**Interfaces:**
- Consumes: nothing from earlier tasks (uses CSS classes from Task 1).
- Produces:
  - `function TVOverlay({ children, tone, fog, rain, className }: { children: ReactNode; tone?: "dark" | "bright"; fog?: boolean; rain?: boolean; className?: string }): JSX.Element` - a wrapper that paints a background plus decorative texture layers (scanlines, vignette, optional fog/rain) over its children.
  - `function ChannelShell({ ch, label, onBack, children }: { ch: string; label: string; onBack: () => void; children: ReactNode }): JSX.Element` - bright channel chrome (broadcast header bar with back button, label, CH bug, live dot) plus a scrollable body and a faint scanline overlay.
- Both consumed by the lock/guide/channel components.

- [ ] **Step 1: Create `TVOverlay.tsx`**

```tsx
"use client";

import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";

interface OverlayProps {
  children: ReactNode;
  tone?: "dark" | "bright";
  fog?: boolean;
  rain?: boolean;
  className?: string;
}

export function TVOverlay({ children, tone = "dark", fog = false, rain = false, className = "" }: OverlayProps) {
  const bg = tone === "dark" ? "bg-[#0d0b07]" : "bg-[#ffd400]";
  return (
    <div className={`relative overflow-hidden ${bg} ${className}`}>
      {fog && <div className="pointer-events-none absolute inset-0 z-0 p4-fog" aria-hidden />}
      {rain && <div className="pointer-events-none absolute inset-0 z-0 p4-rain" aria-hidden />}
      {children}
      <div className="pointer-events-none absolute inset-0 z-20 p4-scanlines opacity-[0.10]" aria-hidden />
      <div className="pointer-events-none absolute inset-0 z-20 p4-vignette" aria-hidden />
    </div>
  );
}

interface ShellProps {
  ch: string;
  label: string;
  onBack: () => void;
  children: ReactNode;
}

export function ChannelShell({ ch, label, onBack, children }: ShellProps) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#ffd400] text-[#1a1714]">
      <div className="absolute inset-x-0 top-0 z-30 flex items-center gap-3 bg-[#1a1714] px-4 py-3">
        <button
          onClick={onBack}
          aria-label="Back to channel guide"
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f5c518] text-[#1a1714]"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <span className="font-p4-display text-lg tracking-[0.2em] text-[#f5c518]">{label}</span>
        <span className="ml-auto font-p4-tele text-xl text-[#8fd6d6]">CH {ch}</span>
        <span className="h-2.5 w-2.5 rounded-full bg-[#7ee07e] p4-blink" aria-hidden />
      </div>

      <div className="absolute inset-x-0 bottom-0 top-[60px] overflow-y-auto overflow-x-hidden">
        {children}
      </div>

      <div className="pointer-events-none absolute inset-0 z-40 p4-scanlines opacity-[0.06]" aria-hidden />
    </div>
  );
}
```

- [ ] **Step 2: Type-check and lint**

Run: `npx tsc --noEmit`
Expected: no output.
Run: `npm run lint`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/mobile/TVOverlay.tsx
git commit -m "feat(mobile): add TV overlay and channel shell chrome"
```

---

### Task 4: Lock screen

**Files:**
- Create: `src/components/mobile/LockScreen.tsx`

**Interfaces:**
- Consumes: `TVOverlay` from Task 3.
- Produces: `function LockScreen({ onEnter }: { onEnter: () => void }): JSX.Element`. Rainy midnight clock, date, weather strip, name, swipe hint, and the "REACH OUT TO THE TRUTH" CTA that calls `onEnter`.

- [ ] **Step 1: Create `LockScreen.tsx`**

```tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TVOverlay } from "./TVOverlay";

const WEATHER = "Tonight: Foggy";

function fmtTime(d: Date) {
  return `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
}

function fmtDate(d: Date) {
  return d
    .toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
    .toUpperCase();
}

interface Props {
  onEnter: () => void;
}

export function LockScreen({ onEnter }: Props) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <TVOverlay tone="dark" fog rain className="h-full w-full">
        <div className="relative z-10 flex h-full flex-col items-center px-6 pt-16 pb-10 text-center">
          <div className="font-p4-mono text-[11px] uppercase tracking-[0.3em] text-[#8fd6d6]">
            {WEATHER}
          </div>

          <div className="mt-14">
            <div className="font-p4-tele text-[112px] leading-none text-[#f5c518] p4-glow">
              {fmtTime(now)}
            </div>
            <div className="mt-2 font-p4-display text-sm tracking-[0.25em] text-[#efe9cf]">
              {fmtDate(now)}
            </div>
          </div>

          <div className="mt-12 border-2 border-[#efe9cf] px-5 py-2">
            <span className="font-p4-display text-base tracking-[0.3em] text-[#efe9cf]">
              MIKHAIL HARITZ
            </span>
          </div>

          <div className="flex-1" />

          <div className="mb-5 font-p4-mono text-[11px] uppercase tracking-[0.3em] text-[#7ee07e] p4-blink">
            TUNE IN
          </div>

          <button
            onClick={onEnter}
            className="w-full rounded-xl bg-[#e8352e] py-4 font-p4-display text-lg tracking-[0.2em] text-white shadow-[5px_5px_0_#1a1714] transition-transform active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_#1a1714]"
          >
            REACH OUT TO THE TRUTH
          </button>
        </div>
      </TVOverlay>
    </motion.div>
  );
}
```

- [ ] **Step 2: Type-check and lint**

Run: `npx tsc --noEmit`
Expected: no output.
Run: `npm run lint`
Expected: no errors.
(Visual check deferred to Task 10, when the mobile mode is wired and reachable.)

- [ ] **Step 3: Commit**

```bash
git add src/components/mobile/LockScreen.tsx
git commit -m "feat(mobile): add rainy midnight lock screen"
```

---

### Task 5: Channel icon and channel guide

**Files:**
- Create: `src/components/mobile/ChannelIcon.tsx`
- Create: `src/components/mobile/ChannelGuide.tsx`

**Interfaces:**
- Consumes: `CHANNELS`, `ChannelDef`, `ChannelId` from Task 2; `TVOverlay` from Task 3.
- Produces:
  - `function ChannelIcon({ channel, onSelect }: { channel: ChannelDef; onSelect: (id: ChannelId) => void }): JSX.Element`.
  - `function ChannelGuide({ onSelect }: { onSelect: (id: ChannelId) => void }): JSX.Element`.
- Consumed by `MobileEnvironment`.

- [ ] **Step 1: Create `ChannelIcon.tsx`**

```tsx
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
      className="group relative flex flex-col items-start gap-2 rounded-lg border-2 border-[#3a4226] bg-[#13150b] p-4 text-left transition-colors active:border-[#f5c518]"
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
```

- [ ] **Step 2: Create `ChannelGuide.tsx`**

```tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TVOverlay } from "./TVOverlay";
import { ChannelIcon } from "./ChannelIcon";
import { CHANNELS, type ChannelId } from "./mobileData";

function fmtTime(d: Date) {
  return `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
}

interface Props {
  onSelect: (id: ChannelId) => void;
}

export function ChannelGuide({ onSelect }: Props) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0, scaleY: 0.6 }}
      animate={{ opacity: 1, scaleY: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <TVOverlay tone="dark" fog className="h-full w-full">
        <div className="relative z-10 flex h-full flex-col px-5 pt-14 pb-8">
          <div className="flex items-baseline justify-between">
            <span className="font-p4-display text-xl tracking-[0.18em] text-[#f5c518] p4-glow">
              CHANNEL GUIDE
            </span>
            <span className="font-p4-tele text-xl text-[#8fd6d6]">{fmtTime(now)}</span>
          </div>
          <div className="mt-3 h-0.5 w-full p4-dashes" aria-hidden />

          <div className="mt-8 grid grid-cols-2 gap-4">
            {CHANNELS.map((c) => (
              <ChannelIcon key={c.id} channel={c} onSelect={onSelect} />
            ))}
          </div>

          <div className="flex-1" />
          <div className="text-center font-p4-mono text-[10px] uppercase tracking-[0.3em] text-[#6b7148]">
            Tap a channel to tune in
          </div>
        </div>
      </TVOverlay>
    </motion.div>
  );
}
```

- [ ] **Step 3: Type-check and lint**

Run: `npx tsc --noEmit`
Expected: no output.
Run: `npm run lint`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/mobile/ChannelIcon.tsx src/components/mobile/ChannelGuide.tsx
git commit -m "feat(mobile): add channel guide home screen"
```

---

### Task 6: Tune-in transition (signature)

**Files:**
- Create: `src/components/mobile/TuneTransition.tsx`

**Interfaces:**
- Consumes: CSS classes from Task 1.
- Produces: `function TuneTransition({ ch, label, onDone }: { ch: string; label: string; onDone: () => void }): JSX.Element | null`. Plays a static -> color-bars -> "TUNING..." meter -> dissolve sequence and calls `onDone` when finished (immediately if reduced motion). Tapping anywhere skips to `onDone`.

- [ ] **Step 1: Create `TuneTransition.tsx`**

```tsx
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
```

- [ ] **Step 2: Type-check and lint**

Run: `npx tsc --noEmit`
Expected: no output.
Run: `npm run lint`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/mobile/TuneTransition.tsx
git commit -m "feat(mobile): add static tune-in transition"
```

---

### Task 7: Projects channel

**Files:**
- Create: `src/components/mobile/channels/ProjectsChannel.tsx`

**Interfaces:**
- Consumes: `ChannelShell` from Task 3; `projects` from `@/types/projects`.
- Produces: `function ProjectsChannel({ onBack }: { onBack: () => void }): JSX.Element`. Lists projects (featured first, then newest) as program cards; each links to `/projects/[slug]`.

Note: project cards link to the existing detail route `/projects/[slug]` rather than rendering an inline detail (a deliberate simplification of the spec's "inline detail" assumption; reuses the existing detail page and keeps scope tight).

- [ ] **Step 1: Create `channels/ProjectsChannel.tsx`**

```tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChannelShell } from "../TVOverlay";
import { projects } from "@/types/projects";

const ordered = [...projects].sort(
  (a, b) => Number(b.featured ?? false) - Number(a.featured ?? false) || b.year - a.year
);

interface Props {
  onBack: () => void;
}

export function ProjectsChannel({ onBack }: Props) {
  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <ChannelShell ch="01" label="PROJECTS" onBack={onBack}>
        <div className="px-4 py-5">
          <h2 className="font-p4-display text-2xl tracking-wide text-[#1a1714]">ALL PROJECTS</h2>
          <p className="mt-1 font-p4-mono text-[11px] font-bold uppercase tracking-wide text-[#9a7f1e]">
            Selected broadcasts and past work
          </p>

          <div className="mt-5 space-y-4">
            {ordered.map((p) => (
              <Link
                key={p.id}
                href={`/projects/${p.slug}`}
                className="block overflow-hidden rounded-xl border-2 border-[#1a1714] bg-[#fffdf7] shadow-[4px_4px_0_#e8352e] transition-transform active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_#e8352e]"
              >
                <div className="relative h-28 w-full bg-[#100d08]">
                  <Image src={p.image} alt={p.title} fill className="object-cover opacity-90" sizes="100vw" />
                </div>
                <div className="p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-p4-display text-lg text-[#1a1714]">{p.title}</span>
                    <span className="border border-[#1a1714] bg-[#f5c518] px-2 py-0.5 font-p4-mono text-[9px] font-bold uppercase tracking-wide text-[#1a1714]">
                      {p.type}
                    </span>
                  </div>
                  <p className="mt-2 font-p4-mono text-[11px] leading-relaxed text-[#5a513c]">{p.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.technologies.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="border border-[#1a1714] bg-[#fff8e6] px-2 py-0.5 font-p4-mono text-[10px] font-bold text-[#1a1714]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </ChannelShell>
    </motion.div>
  );
}
```

- [ ] **Step 2: Type-check and lint**

Run: `npx tsc --noEmit`
Expected: no output.
Run: `npm run lint`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/mobile/channels/ProjectsChannel.tsx
git commit -m "feat(mobile): add projects channel"
```

---

### Task 8: Me channel

**Files:**
- Create: `src/components/mobile/channels/MeChannel.tsx`

**Interfaces:**
- Consumes: `ChannelShell` from Task 3; `skillCategories` from `@/components/skills`.
- Produces: `function MeChannel({ onBack }: { onBack: () => void }): JSX.Element`. Bio, facts, and the stack.

- [ ] **Step 1: Create `channels/MeChannel.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";
import { ChannelShell } from "../TVOverlay";
import { skillCategories } from "@/components/skills";

const FACTS = [
  { k: "Location", v: "Depok / Jakarta, ID" },
  { k: "Education", v: "Information Systems, Universitas Indonesia (2022-2026)" },
  { k: "Focus", v: "Scalable systems and AI engineering" },
  { k: "Status", v: "Open to opportunities" },
];

interface Props {
  onBack: () => void;
}

export function MeChannel({ onBack }: Props) {
  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <ChannelShell ch="02" label="ME" onBack={onBack}>
        <div className="px-4 py-5">
          <h2 className="font-p4-display text-2xl tracking-wide text-[#1a1714]">PROFILE</h2>

          <div className="mt-4 space-y-4 font-p4-mono text-[12px] leading-relaxed text-[#3a3324]">
            <p>
              I am a software engineer focused on building scalable backend systems, mostly in Go,
              Spring, and TypeScript. I work full-stack, with Next.js on the frontend and Python
              whenever there is AI or data work involved.
            </p>
            <p>
              Lately I have been drawn to AI engineering: wiring LLMs and agents into real products,
              from an AI job aggregator to my thesis on an AI-powered discussion forum. I care about
              building things that are secure, reliable, and ready to scale.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3">
            {FACTS.map((f) => (
              <div key={f.k} className="border-t-2 border-[#1a1714] pt-2">
                <div className="font-p4-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#9a7f1e]">
                  {f.k}
                </div>
                <div className="mt-0.5 font-p4-mono text-[12px] text-[#1a1714]">{f.v}</div>
              </div>
            ))}
          </div>

          <h3 className="mt-8 font-p4-display text-xl tracking-wide text-[#1a1714]">STACK</h3>
          <div className="mt-4 space-y-5">
            {skillCategories.map((cat) => (
              <div key={cat.title}>
                <div className="font-p4-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#1a1714]">
                  {cat.title}
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {cat.skills.map((s) => (
                    <span
                      key={s}
                      className="border border-[#1a1714] bg-[#fff8e6] px-2 py-0.5 font-p4-mono text-[10px] text-[#1a1714]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </ChannelShell>
    </motion.div>
  );
}
```

- [ ] **Step 2: Type-check and lint**

Run: `npx tsc --noEmit`
Expected: no output.
Run: `npm run lint`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/mobile/channels/MeChannel.tsx
git commit -m "feat(mobile): add me channel"
```

---

### Task 9: Contact channel

**Files:**
- Create: `src/components/mobile/channels/ContactChannel.tsx`

**Interfaces:**
- Consumes: `ChannelShell` from Task 3.
- Produces: `function ContactChannel({ onBack }: { onBack: () => void }): JSX.Element`. A big mailto CTA plus GitHub / LinkedIn / Email links.

Note: instead of reusing the violet `ContactForm`, this uses a thumb-friendly mailto CTA and link tiles, which fit the P4 palette and a small screen better than a four-field form. This is an intentional refinement of the spec's "contact form + links."

- [ ] **Step 1: Create `channels/ContactChannel.tsx`**

```tsx
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
```

- [ ] **Step 2: Type-check and lint**

Run: `npx tsc --noEmit`
Expected: no output.
Run: `npm run lint`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/mobile/channels/ContactChannel.tsx
git commit -m "feat(mobile): add contact channel"
```

---

### Task 10: Wire up MobileEnvironment and the three-way mode switch

**Files:**
- Create: `src/components/mobile/MobileEnvironment.tsx`
- Modify: `src/components/home/index.tsx`

**Interfaces:**
- Consumes: `LockScreen`, `ChannelGuide`, `TuneTransition`, `ProjectsChannel`, `MeChannel`, `ContactChannel`, and `CHANNELS`/`RESUME_URL`/`ChannelId`/`MobilePhase`.
- Produces: `function MobileEnvironment({ onSwitchToWebsite }: { onSwitchToWebsite: () => void }): JSX.Element`. Drives the phase machine and routes channel selections (resume opens a tab, web switches mode, the rest tune in).

- [ ] **Step 1: Create `MobileEnvironment.tsx`**

```tsx
"use client";

import { useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { LockScreen } from "./LockScreen";
import { ChannelGuide } from "./ChannelGuide";
import { TuneTransition } from "./TuneTransition";
import { ProjectsChannel } from "./channels/ProjectsChannel";
import { MeChannel } from "./channels/MeChannel";
import { ContactChannel } from "./channels/ContactChannel";
import { CHANNELS, RESUME_URL, type ChannelId, type MobilePhase } from "./mobileData";

interface Props {
  onSwitchToWebsite: () => void;
}

export function MobileEnvironment({ onSwitchToWebsite }: Props) {
  const [phase, setPhase] = useState<MobilePhase>("lock");
  const [active, setActive] = useState<ChannelId | null>(null);
  const [pending, setPending] = useState<{ ch: string; label: string }>({ ch: "", label: "" });

  const backToGuide = useCallback(() => {
    setPhase("guide");
    setActive(null);
  }, []);

  const selectChannel = useCallback(
    (id: ChannelId) => {
      const def = CHANNELS.find((c) => c.id === id);
      if (!def) return;
      if (id === "resume") {
        window.open(RESUME_URL, "_blank", "noopener,noreferrer");
        return;
      }
      if (id === "web") {
        onSwitchToWebsite();
        return;
      }
      setActive(id);
      setPending({ ch: def.ch, label: def.label });
      setPhase("tuning");
    },
    [onSwitchToWebsite]
  );

  return (
    <div className="relative mx-auto h-[100dvh] w-full max-w-[480px] overflow-hidden bg-[#0d0b07] text-[#efe9cf]">
      <AnimatePresence mode="wait">
        {phase === "lock" && <LockScreen key="lock" onEnter={() => setPhase("guide")} />}
        {phase === "guide" && <ChannelGuide key="guide" onSelect={selectChannel} />}
        {phase === "tuning" && (
          <TuneTransition
            key="tuning"
            ch={pending.ch}
            label={pending.label}
            onDone={() => setPhase("channel")}
          />
        )}
        {phase === "channel" && active === "projects" && (
          <ProjectsChannel key="projects" onBack={backToGuide} />
        )}
        {phase === "channel" && active === "me" && <MeChannel key="me" onBack={backToGuide} />}
        {phase === "channel" && active === "contact" && (
          <ContactChannel key="contact" onBack={backToGuide} />
        )}
      </AnimatePresence>
    </div>
  );
}
```

- [ ] **Step 2: Rewrite `src/components/home/index.tsx` as a three-way switch**

Replace the entire file contents with:

```tsx
"use client";

import { DesktopEnvironment } from "@/components/desktop/DesktopEnvironment";
import { MobileEnvironment } from "@/components/mobile/MobileEnvironment";
import SiteHome from "./SiteHome";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ViewMode = "website" | "desktop" | "mobile";

export default function HomeClient() {
  const [viewMode, setViewMode] = useState<ViewMode>("desktop");
  const [deviceIsMobile, setDeviceIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Narrow viewports get the phone OS; wide ones get the P5 desktop OS.
    // Arriving via an editorial anchor (e.g. from /projects) opens the site.
    const narrow = window.innerWidth < 768;
    setDeviceIsMobile(narrow);

    const siteHashes = ["#top", "#work", "#about", "#stack", "#contact"];
    if (siteHashes.includes(window.location.hash)) {
      setViewMode("website");
      return;
    }
    setViewMode(narrow ? "mobile" : "desktop");
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <AnimatePresence mode="wait">
        {viewMode === "desktop" && (
          <motion.div
            key="desktop"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50"
          >
            <DesktopEnvironment onSwitchToLegacy={() => setViewMode("website")} />
          </motion.div>
        )}
        {viewMode === "mobile" && (
          <motion.div
            key="mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50"
          >
            <MobileEnvironment onSwitchToWebsite={() => setViewMode("website")} />
          </motion.div>
        )}
        {viewMode === "website" && (
          <motion.div
            key="website"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen"
          >
            <SiteHome onSwitchToDesktop={() => setViewMode(deviceIsMobile ? "mobile" : "desktop")} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

- [ ] **Step 3: Type-check, lint, build**

Run: `npx tsc --noEmit`
Expected: no output.
Run: `npm run lint`
Expected: no errors.
Run: `npm run build`
Expected: "Compiled successfully" and all static pages generated.

- [ ] **Step 4: Visual smoke check**

Run: `npm run dev`. Open `http://localhost:3000` in the browser, open DevTools device toolbar, and select a phone (e.g. 390px wide). Verify:
- The rainy midnight lock screen appears (clock, date, "Tonight: Foggy", "REACH OUT TO THE TRUTH").
- Tapping the CTA shows the channel guide grid.
- Tapping PROJECTS / ME / CONTACT plays the static tune-in then opens the channel; the back arrow returns to the guide.
- RESUME opens the resume in a new tab; WEB switches to the professional site, whose desktop control returns to the phone OS.
- At >= 768px wide, the P5 desktop OS still loads.

- [ ] **Step 5: Commit**

```bash
git add src/components/mobile/MobileEnvironment.tsx src/components/home/index.tsx
git commit -m "feat(mobile): wire mobile OS into the three-way mode switch"
```

---

### Task 11: Reduced-motion, accessibility, and final QA

**Files:**
- Modify (only if the QA below surfaces issues): any file under `src/components/mobile/`

**Interfaces:**
- Consumes: the full mobile module.
- Produces: a verified, shippable mobile OS.

- [ ] **Step 1: Reduced-motion verification**

In DevTools, set Rendering -> "Emulate CSS prefers-reduced-motion: reduce". Reload at a phone width and verify:
- Scanlines, fog, rain, blink, and static are frozen (no animation).
- Selecting a channel cuts straight to it with no static burst (the `TuneTransition` returns null and calls `onDone` immediately).
If any animation still runs, confirm the offending element uses one of the `.p4-*` classes covered by the `prefers-reduced-motion` block in `globals.css`; add it there if missing.

- [ ] **Step 2: Accessibility pass**

Verify with keyboard (Tab / Enter) at a phone width:
- The lock CTA, every channel tile, the back button, and contact links are focusable and activate with Enter.
- Decorative layers (`.p4-fog`, `.p4-rain`, scanline/vignette overlays, icons inside labeled buttons) carry `aria-hidden`.
- Tap targets are at least 44px tall (tiles, CTA, back button, link tiles already meet this; confirm).
Fix any gaps inline.

- [ ] **Step 3: Copy audit (no em dashes)**

Run: `grep -rn "—" src/components/mobile/`
Expected: no matches. If any appear, rewrite the copy with periods or commas.

- [ ] **Step 4: Final type-check, lint, build**

Run: `npx tsc --noEmit`
Expected: no output.
Run: `npm run lint`
Expected: no errors.
Run: `npm run build`
Expected: "Compiled successfully", all static pages generated.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore(mobile): reduced-motion, a11y, and copy QA for the phone OS"
```

---

## Self-Review

**Spec coverage:**
- Mode routing (three-way, width-based, hash override) -> Task 10. The website-back-button returns mobile devices to the phone OS via `deviceIsMobile`.
- Tokens (color, type, texture) -> Task 1.
- Lock screen (rainy midnight, clock, date, weather, name, CTA) -> Task 4. CTA is the P4 "REACH OUT TO THE TRUTH" (not the P5-derived "Take Your Time").
- Channel guide (teletext grid, channels, fog, scanlines) -> Task 5.
- Tune-in transition (static, color bars, meter, dissolve, reduced-motion cut) -> Task 6.
- Channel shell (bright, broadcast chrome, scroll body) -> Task 3.
- Channels: Projects (Task 7), Me (Task 8), Contact (Task 9); Resume and Web as actions in Task 10.
- Performance/accessibility/reduced-motion/no-em-dash -> Global Constraints + Task 11.
- Component architecture mirrors `src/components/desktop/` -> Tasks 2-10.

**Deviations from spec (intentional, flagged in-task):**
- Project detail links to the existing `/projects/[slug]` route instead of an inline detail (Task 7). Keeps scope tight and reuses the detail page.
- Contact uses a mailto CTA + link tiles instead of the full violet `ContactForm` (Task 9). Better fit for a small screen and the P4 palette.
- `ChannelShell` lives in `TVOverlay.tsx` (chrome kept together) rather than its own file. `RESUME_URL` and contact links are re-declared in the mobile module rather than imported from `SiteHome` (which does not export them); minor, acceptable duplication.
- Optional DotGothic16 accent and the `??????` mystery channel are out of scope for v1 per the spec.

**Placeholder scan:** none. Every step contains complete file contents or exact edits.

**Type consistency:** `ChannelId`, `MobilePhase`, `ChannelDef`, `CHANNELS`, `RESUME_URL` defined in Task 2 are used with the same names/signatures in Tasks 5 and 10. `TVOverlay`/`ChannelShell` props in Task 3 match their usage in Tasks 4, 5, 7, 8, 9. `MobileEnvironment` prop `onSwitchToWebsite` matches the call site in Task 10's `index.tsx`.

# Mobile "Midnight Channel" OS - Design Spec

Date: 2026-06-21
Status: Approved (design), pending implementation plan
Topic: A dedicated mobile interface, themed as a Persona 4 "Midnight Channel" broadcast, sibling to the existing P5 desktop OS.

## Summary

The portfolio currently has two faces: a Persona 5 themed "desktop OS" (wide screens) and a professional "website" (everything else, including phones). This spec replaces the phone experience with a third, first class face: a **mobile phone OS themed as a vintage late night broadcast**, drawing on Persona 4 and its Midnight Channel.

Framing: the desktop is the user's P5 self (red, sharp, "Take Your Heart"). The phone is the user's P4 self (yellow, foggy, analog, "Reach out to the truth"). The phone receives the user as a broadcast: a rainy midnight lock screen, a channel guide of "apps," and a static "tune in" transition into each one. The professional website remains reachable from the phone via a "WEB" channel, exactly like the desktop's "open website" toggle.

This is NOT a literal television object. There are no antennas, dials, or plastic bezels. The vintage feel comes entirely from the *interface language*: teletext typography, phosphor palette, soft scanlines and glow, drifting fog, and the tune in moment.

## Goals

- A phone form factor experience that is genuinely usable with a thumb (full bleed vertical, status bar, home indicator, large tap targets).
- A distinctive, on theme P4 "Midnight Channel" aesthetic that reads as a different device and a different game from the P5 desktop.
- Content sourced from the existing single sources of truth (`src/types/projects.ts`, `src/components/skills.tsx`, the about facts, `RESUME_URL`). No duplicated copy.
- Smooth, "very Persona 4" transitions as the signature moment.
- 60fps, reduced motion safe, accessible.
- Component grouping that mirrors `src/components/desktop/` (its own `src/components/mobile/` directory).

## Non-goals / out of scope (v1)

- The mysterious `??????` channel easter egg. Skipped for v1 to keep the guide clean. Easy to add later.
- The glasses motif. Explicitly dropped per user.
- Real project screenshots (still pending from the user; placeholders remain).
- Any change to the desktop P5 OS or the professional website content.

## Confirmed decisions

- **Device metaphor:** Phone shell, Midnight Channel soul. Phone ergonomics; the lock and home (channel guide) carry the broadcast aesthetic; opening an app is a "tune in" transition into a near full screen app that keeps a faint CRT overlay plus a broadcast chrome bar.
- **Analog intensity:** "Analog broadcast." Soft scanlines + phosphor glow + vignette always on; fog drifting subtly behind content; heavy static only during the tune in transition. Legible, never nauseating.
- **Palette arc:** "Night to clarity." Lock and channel guide are dark midnight; content apps brighten to canary yellow + black. Mirrors the game's fog to truth arc and keeps content screens bright and readable.
- **Motifs:** Drifting fog, rainy midnight lock, weather forecast strip. NO glasses.
- **Lock CTA:** "REACH OUT TO THE TRUTH" with a swipe hint "TUNE IN". (Alternatives on request: "SEEK THE TRUTH", "TUNE IN".)
- **P4 is rounded, not slanted.** Rounded corners and pop hierarchy (size/color/white outline), never P5's skew.

## Design tokens

### Color

| Token | Hex | Use |
|-------|-----|-----|
| midnight | `#161309` / `#0d0b07` | dark backgrounds (lock, guide, device frame) |
| canary | `#f5c518` / `#ffd400` | the signal: primary accent, bright app backgrounds |
| phosphor-teal | `#8fd6d6` | CRT labels, timestamps, secondary text on dark |
| live-green | `#7ee07e` | "on air" / live status, confirmations |
| broadcast-red | `#e8352e` / `#c0392b` | REC, alerts, the (future) mystery channel |
| bone | `#fff8e6` / `#efe9cf` | cream paper, body text, card surfaces in bright apps |
| ink | `#1a1714` | black type on yellow, dark chrome bars in bright apps |

### Type

Loaded via `next/font/google` as CSS variables, same pattern as the existing Inter/Space Grotesk/JetBrains Mono setup.

- **Archivo Black** (`--font-p4-display`): headings, channel names, clock. White outlined where it sits on yellow.
- **VT323** (`--font-p4-tele`): teletext numerals, timestamps, CRT readouts. Carries the vintage.
- **Space Mono** (`--font-p4-mono`): body, labels, tech chips.

(Optional accent, sparingly, only if it does not bloat the font payload: DotGothic16 for the "MIDNIGHT" wordmark. Decide during build; default to skipping it.)

### Texture (pure CSS, no canvas/WebGL)

- Scanlines: `repeating-linear-gradient` overlay, low opacity, optional slow scroll.
- Vignette: radial gradient darkening edges.
- Phosphor glow: `text-shadow` bloom on canary/teal text.
- Fog: a soft, slowly drifting radial/blur layer in canary at very low opacity behind content.
- Rain (lock only): faint animated streaks.
- Heavy static + color bars + tracking roll: only inside the tune in transition.

All texture layers are disabled or frozen under `prefers-reduced-motion: reduce` and kept cheap (no per element shadows on long lists; single overlay elements).

## Mode routing

`src/components/home/index.tsx` (`HomeClient`) becomes a three way switch instead of two:

- Initial state stays `desktop` to avoid hydration flash, then on mount detect:
  - If the URL hash is a site anchor (`#top`, `#work`, `#about`, `#stack`, `#contact`) -> `website` (unchanged behavior, lets `/projects` deep links land on the pro site).
  - Else if `window.innerWidth < 768` OR a coarse/touch pointer (`window.matchMedia("(pointer: coarse)")`) -> `mobile` (NEW; was `website`).
  - Else -> `desktop` (P5).
- `website` remains reachable from `mobile` via the WEB channel (sets mode to `website`), and from `desktop` as today.
- `AnimatePresence` gains the `mobile` branch alongside `desktop` and `website`.

## Screens

### 1. Lock - rainy midnight

- Dark midnight background, drifting fog, faint rain streaks.
- Large VT323 clock near `00:00` (use real local time; the "midnight" feel comes from styling, not a fake clock). Date line ("SUNDAY, JUNE 21") from real date.
- Small weather strip: "Tonight: Foggy" (static flavor text; can randomize from a small P4 style set).
- Name chip: "MIKHAIL HARITZ".
- Swipe hint "TUNE IN" + CTA button "REACH OUT TO THE TRUTH".
- Action: swipe up or tap CTA -> CRT power on/fog clear transition -> channel guide.

### 2. Channel guide (home)

- Dark teletext grid of channels, each a tile with a `CH 0X` tag, icon, and label.
- Header: "CHANNEL GUIDE" + live clock; dashed canary divider.
- Fog drifts behind; soft scanlines and vignette.
- Footer hint bar (e.g. "SELECT / ENTER" styled, or a simple "tap a channel").
- Channels: see table below.

### 3. Tune in (signature transition)

See "Transition language" below. Static burst -> color bars + tracking roll -> "TUNING... CH 0X / NAME" with a fill meter -> TV dive ripple -> resolves into the (bright) app.

### 4. Channel (app) shell

- Brightens to canary yellow + black (content apps) with bone cream cards.
- Faint CRT overlay persists (light scanlines, subtle vignette) so it still feels broadcast.
- Top broadcast chrome bar: back control, channel name, "CH 0X" bug, live dot.
- Full height scroll area for content.

## Channels (content map)

| CH | Name | Opens | Source |
|----|------|-------|--------|
| 01 | PROJECTS | Project archive as a program guide; tap a project -> detail | `src/types/projects.ts` |
| 02 | ME | About bio + facts + stack | about copy + `skillCategories` + FACTS |
| 03 | CONTACT | Contact form + social links | `ContactForm`, social links |
| 04 | RESUME | Opens the resume | `RESUME_URL` |
| 05 | WEB | Switches app mode to the full professional `SiteHome` | `onSwitchToWebsite` |

Project detail on mobile: reuse the existing `Project` data; either render a mobile styled detail inside the channel shell, or route to `/projects/[slug]`. Default: render inline in the channel shell for a seamless "app" feel; revisit during planning.

## Transition language (the "very P4" part)

A small shared system of transitions, all reduced motion aware (reduced = instant cut, no static/flicker):

1. **CRT power on** (entering the phone OS, and lock -> guide): a thin bright horizontal line expands vertically from center, brief overscan flash, settles. Quick (~350ms).
2. **Tune in / TV dive** (channel open, the signature): 
   - Frame freezes, static + RGB color bars sweep in with a tracking roll band.
   - Center readout "TUNING... CH 0X" + a segmented fill meter (VT323).
   - A ripple/liquid distortion (the P4 "dive into the TV") pulls the static into the center as the bright app surfaces. Fog burns off.
   - Target ~700 to 900ms, skippable on tap.
3. **Channel change** (switching between channels without returning to guide, if applicable): quick horizontal static swipe, like flipping channels.
4. **Fog clear** (guide reveal, empty/loading states): canary fog parts from center.

Implementation via framer motion + CSS layers. Keep the heavy static confined to the transition component so it never runs during normal use.

## Component architecture

Mirrors `src/components/desktop/`:

```
src/components/mobile/
  MobileEnvironment.tsx     // phase machine: lock -> guide -> tuning -> channel; manages active channel
  LockScreen.tsx            // rainy midnight clock + CTA
  ChannelGuide.tsx          // home / EPG grid
  TuneTransition.tsx        // the static/color-bar/ripple tune in (signature)
  TVOverlay.tsx             // shared scanline + vignette + glow + fog + broadcast chrome bar
  ChannelIcon.tsx           // a channel tile
  channels/
    ProjectsChannel.tsx
    MeChannel.tsx
    ContactChannel.tsx
    // RESUME and WEB are actions, not full channel components
  mobileData.ts             // channel registry (id, ch number, label, icon, kind: 'channel' | 'action')
```

`MobileEnvironment` receives `onSwitchToWebsite` from `HomeClient` (parallels the desktop's `onSwitchToLegacy`).

## Data and content

- Reuse `projects`, `skillCategories`, the about FACTS/bio, `RESUME_URL`. No new copy where existing copy exists.
- Any new microcopy (weather strings, channel taglines) stays in the established voice: backend first, scalable systems, AI engineering as a recent interest. Not "AI god."
- **Em dash constraint:** no "-" em dashes anywhere in rendered copy. Use periods, commas, or restructure. This is a hard project rule.

## Performance and accessibility

- Pure CSS texture, single overlay elements, no per cell shadows on lists.
- Respect `prefers-reduced-motion`: freeze scanlines, drop static/flicker, instant transitions.
- Tap targets >= 44px; visible focus states; semantic headings inside channels.
- Lazy/defer the heavy transition assets; keep first paint fast (the existing instant background lesson).
- Test on a real narrow viewport; ensure the channel shell content scrolls and the status/chrome bars do not obstruct content (the desktop taskbar obstruction lesson).

## Open assumptions (flag during planning if any are wrong)

- Project detail renders inline in the channel shell (vs routing to `/projects/[slug]`).
- Real clock/date is used and simply styled "midnight"; we do not hard fake 00:00.
- The WEB channel reuses the existing `SiteHome` responsively rather than a separate mobile pro layout.

## Future / later

- `??????` mystery channel easter egg.
- Real screenshots in project channels.
- Optional DotGothic16 wordmark.

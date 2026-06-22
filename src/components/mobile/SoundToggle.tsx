"use client";

import { useSyncExternalStore } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { sound } from "./sound";

/** A small SFX toggle. Muted by default; unmuting unlocks audio. The "velvet"
 *  variant matches the hidden Velvet Room (gold-on-blue, engraved serif). */
export function SoundToggle({ variant = "p4" }: { variant?: "p4" | "velvet" }) {
  const muted = useSyncExternalStore(sound.subscribe, sound.getMuted, () => true);

  const toggle = () => {
    const next = !muted;
    sound.setMuted(next);
    if (!next) {
      sound.enable();
      sound.blip();
    }
  };

  const skin =
    variant === "velvet"
      ? "border-[#d9b45b]/70 bg-[#0c1248]/80 font-velvet tracking-[0.18em] text-[#f1d98a] active:border-[#f1d98a]"
      : "border-[#3a4226] bg-[#0e0f08]/80 font-p4-tele text-[#8fd6d6] active:border-[#f5c518]";

  return (
    <button
      onClick={toggle}
      aria-label={muted ? "Enable sound effects" : "Mute sound effects"}
      className={`flex items-center gap-1.5 border px-2 py-1 text-sm leading-none ${skin}`}
    >
      {muted ? <VolumeX className="h-4 w-4" aria-hidden /> : <Volume2 className="h-4 w-4" aria-hidden />}
      FX {muted ? "OFF" : "ON"}
    </button>
  );
}

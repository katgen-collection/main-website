"use client";

import { useSyncExternalStore } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { sound } from "./sound";

/** A small CRT-style SFX toggle. Muted by default; unmuting unlocks audio. */
export function SoundToggle() {
  const muted = useSyncExternalStore(sound.subscribe, sound.getMuted, () => true);

  const toggle = () => {
    const next = !muted;
    sound.setMuted(next);
    if (!next) {
      sound.enable();
      sound.blip();
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={muted ? "Enable sound effects" : "Mute sound effects"}
      className="flex items-center gap-1.5 border border-[#3a4226] bg-[#0e0f08]/80 px-2 py-1 font-p4-tele text-sm leading-none text-[#8fd6d6] active:border-[#f5c518]"
    >
      {muted ? <VolumeX className="h-4 w-4" aria-hidden /> : <Volume2 className="h-4 w-4" aria-hidden />}
      FX {muted ? "OFF" : "ON"}
    </button>
  );
}

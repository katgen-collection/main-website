"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { LockScreen } from "./LockScreen";
import { ChannelGuide } from "./ChannelGuide";
import { TuneTransition } from "./TuneTransition";
import { SoundToggle } from "./SoundToggle";
import { VelvetRoom } from "./VelvetRoom";
import { sound } from "./sound";
import { ProjectsChannel } from "./channels/ProjectsChannel";
import { MeChannel } from "./channels/MeChannel";
import { ContactChannel } from "./channels/ContactChannel";
import { CHANNELS, RESUME_URL, type ChannelId, type MobilePhase } from "./mobileData";

type ActiveChannel = ChannelId | "velvet";

interface Props {
  onSwitchToWebsite: () => void;
}

export function MobileEnvironment({ onSwitchToWebsite }: Props) {
  const [phase, setPhase] = useState<MobilePhase>("lock");
  const [active, setActive] = useState<ActiveChannel | null>(null);
  const [pending, setPending] = useState<{ ch: string; label: string }>({ ch: "", label: "" });

  useEffect(() => {
    sound.init();
  }, []);

  const enterGuide = useCallback(() => {
    sound.enable();
    sound.powerOn();
    setPhase("guide");
  }, []);

  const backToGuide = useCallback(() => {
    sound.blip();
    setPhase("guide");
    setActive(null);
  }, []);

  const selectChannel = useCallback(
    (id: ChannelId) => {
      const def = CHANNELS.find((c) => c.id === id);
      if (!def) return;
      sound.blip();
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

  // Catching a drifting butterfly tunes into the hidden Velvet Room.
  const openVelvet = useCallback(() => {
    sound.flutter();
    setActive("velvet");
    setPending({ ch: "??", label: "VELVET ROOM" });
    setPhase("tuning");
  }, []);

  return (
    <div className="relative mx-auto h-[100dvh] w-full max-w-[480px] overflow-hidden bg-[#0d0b07] text-[#efe9cf]">
      <AnimatePresence mode="wait">
        {phase === "lock" && <LockScreen key="lock" onEnter={enterGuide} />}
        {phase === "guide" && (
          <ChannelGuide key="guide" onSelect={selectChannel} onCatchButterfly={openVelvet} />
        )}
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
        {phase === "channel" && active === "me" && (
          <MeChannel key="me" onBack={backToGuide} onCatchButterfly={openVelvet} />
        )}
        {phase === "channel" && active === "contact" && (
          <ContactChannel key="contact" onBack={backToGuide} onCatchButterfly={openVelvet} />
        )}
        {phase === "channel" && active === "velvet" && <VelvetRoom key="velvet" onBack={backToGuide} />}
      </AnimatePresence>

      {/* FX toggle (sound + haptics; muted by default) */}
      <div className="absolute right-3 top-3 z-[60]">
        <SoundToggle />
      </div>
    </div>
  );
}

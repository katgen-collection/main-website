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

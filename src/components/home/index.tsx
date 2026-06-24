"use client";

import { DesktopEnvironment } from "@/components/desktop/DesktopEnvironment";
import { MobileEnvironment } from "@/components/mobile/MobileEnvironment";
import SiteHome from "./SiteHome";
import { ModeTransition } from "./ModeTransition";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ViewMode = "website" | "desktop" | "mobile";

export default function HomeClient() {
  const [viewMode, setViewMode] = useState<ViewMode>("desktop");
  const [deviceIsMobile, setDeviceIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  // Themed pro -> gimmick hand-off; null when not transitioning.
  const [transitioning, setTransitioning] = useState<"desktop" | "mobile" | null>(null);

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

  const target: "desktop" | "mobile" = deviceIsMobile ? "mobile" : "desktop";

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
            <SiteHome onSwitchToDesktop={() => setTransitioning(target)} target={target} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Themed hand-off from the pro site into a gimmick OS. Swaps the view at
          its midpoint (hidden behind full coverage), then clears to reveal it. */}
      <AnimatePresence>
        {transitioning && (
          <ModeTransition
            key="mode-transition"
            variant={transitioning}
            onMidpoint={() => setViewMode(transitioning)}
            onDone={() => setTransitioning(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

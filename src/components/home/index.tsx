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
  // Themed hand-off between pro and a gimmick OS. `theme` is tied to the gimmick
  // side (so both directions match); `target` is where we land. Null when idle.
  const [xfer, setXfer] = useState<{ target: ViewMode; theme: "desktop" | "mobile" } | null>(null);

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

  // While a themed overlay is covering a swap, the mode underneath must appear
  // instantly (no fade/slide), so the overlay clears onto a finished screen.
  const swap = !!xfer;

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <AnimatePresence>
        {viewMode === "desktop" && (
          <motion.div
            key="desktop"
            initial={swap ? false : { opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={swap ? { opacity: 1 } : { opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            transition={{ duration: swap ? 0 : 0.5 }}
            className="fixed inset-0 z-50"
          >
            <DesktopEnvironment onSwitchToLegacy={() => setXfer({ target: "website", theme: "desktop" })} />
          </motion.div>
        )}
        {viewMode === "mobile" && (
          <motion.div
            key="mobile"
            initial={swap ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={swap ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: swap ? 0 : 0.4 }}
            className="fixed inset-0 z-50"
          >
            <MobileEnvironment onSwitchToWebsite={() => setXfer({ target: "website", theme: "mobile" })} />
          </motion.div>
        )}
        {viewMode === "website" && (
          <motion.div
            key="website"
            initial={swap ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={swap ? { opacity: 1 } : { opacity: 0, y: -20 }}
            transition={{ duration: swap ? 0 : 0.5 }}
            className="min-h-screen"
          >
            <SiteHome onSwitchToDesktop={() => setXfer({ target, theme: target })} target={target} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Themed hand-off between the pro site and a gimmick OS. Swaps the view at
          its midpoint (hidden behind full coverage), then clears to reveal it. */}
      <AnimatePresence>
        {xfer && (
          <ModeTransition
            key="mode-transition"
            variant={xfer.theme}
            onMidpoint={() => setViewMode(xfer.target)}
            onDone={() => setXfer(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

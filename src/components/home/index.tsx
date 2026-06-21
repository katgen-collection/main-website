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

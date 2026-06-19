"use client";

import { DesktopEnvironment } from "@/components/desktop/DesktopEnvironment";
import SiteHome from "./SiteHome";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HomeClient() {
  const [viewMode, setViewMode] = useState<"website" | "desktop">("desktop");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Phones get the professional site directly; the desktop OS needs room.
    // Arriving via an editorial anchor (e.g. from /projects) also opens the site.
    const siteHashes = ["#top", "#work", "#about", "#stack", "#contact"];
    if (window.innerWidth < 768 || siteHashes.includes(window.location.hash)) {
      setViewMode("website");
    }
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <AnimatePresence mode="wait">
        {viewMode === "desktop" ? (
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
        ) : (
          <motion.div
            key="website"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen"
          >
            <SiteHome onSwitchToDesktop={() => setViewMode("desktop")} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

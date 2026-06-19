"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import backgroundImage from "../../../public/assets/desktop-background.jpg";

interface DesktopBackgroundProps {
  /** How strongly the decorative layers react to the pointer (px). */
  intensity?: number;
  /** Render the floating comic-shape (jagged shard) layer. */
  showShapes?: boolean;
  /** Render the big soft glow "orb" blobs. */
  showOrbs?: boolean;
  /** Extra overlay tint nodes rendered above the photo but below the shapes. */
  children?: React.ReactNode;
}

/**
 * The shared, layered desktop backdrop.
 *
 * - Uses next/image with `priority` (injects a <link rel="preload">) and the
 *   auto-generated blur `placeholder`, so a tiny LQIP paints instantly while the
 *   optimized AVIF/WebP streams in — no more slow flash of the raw 4K JPEG.
 * - Stacks halftone, vignette, glows and parallax comic shapes to give the flat
 *   wallpaper real depth.
 */
export const DesktopBackground: React.FC<DesktopBackgroundProps> = ({
  intensity = 18,
  showShapes = true,
  showOrbs = true,
  children,
}) => {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });

  // Different layers move at different rates for a parallax / depth feel.
  const photoX = useTransform(sx, (v) => v * -0.4);
  const photoY = useTransform(sy, (v) => v * -0.4);
  const farX = useTransform(sx, (v) => v * 0.5);
  const farY = useTransform(sy, (v) => v * 0.5);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      mx.set(nx * intensity);
      my.set(ny * intensity);
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, [intensity, mx, my]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base photo — optimized + instant blur placeholder */}
      <motion.div
        className="absolute -inset-8"
        style={{ x: photoX, y: photoY }}
      >
        <Image
          src={backgroundImage}
          alt=""
          fill
          priority
          placeholder="blur"
          quality={72}
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Color grade: purple duotone + depth vignette */}
      <div className="absolute inset-0 bg-purple-900/40 mix-blend-overlay pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(120% 120% at 50% 40%, transparent 45%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Halftone comic dots, slowly drifting */}
      <div
        className="absolute -inset-10 opacity-[0.18] pointer-events-none animate-halftone"
        style={{
          backgroundImage:
            "radial-gradient(circle, #000 1.1px, transparent 1.2px)",
          backgroundSize: "9px 9px",
        }}
      />

      {/* Caller-supplied tints (e.g. lock-screen darkening) */}
      {children}

      {showOrbs && (
        /* Far layer: big soft glows */
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ x: farX, y: farY }}
        >
          <div className="absolute -top-24 -left-24 w-[34rem] h-[34rem] rounded-full bg-purple-600/30 blur-3xl animate-pulse-glow" />
          <div
            className="absolute bottom-[-8rem] right-[-6rem] w-[30rem] h-[30rem] rounded-full bg-red-600/25 blur-3xl animate-pulse-glow"
            style={{ animationDelay: "1.5s" }}
          />
        </motion.div>
      )}

      {showShapes && (
        /* Fine scanlines for a CRT-ish screen feel */
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.07] mix-blend-overlay"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, #fff 0 1px, transparent 1px 3px)",
          }}
        />
      )}
    </div>
  );
};

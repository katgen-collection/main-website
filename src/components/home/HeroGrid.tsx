"use client";

import { useEffect, useRef } from "react";

/**
 * Interactive hero grid, rendered on a single <canvas> for performance.
 *
 * Every cell holds an "energy" value that eases toward a target each frame
 * (1 near the cursor, 0 away). That per-cell easing produces a smooth, flowing
 * cloth-like wake: cells light/lift/scale up near the cursor and settle gently
 * behind it. One canvas means no thousands-of-DOM-nodes, no box-shadow repaints
 * and no layer thrash, so it stays at 60fps full-screen.
 *
 * Feel-knobs in CONFIG.
 */
const CONFIG = {
  size: 17, // tile size in px
  gap: 8, // gap between tiles in px
  radius: 210, // cursor influence radius in px
  lift: 16, // px a fully energized tile shifts up
  scale: 0.55, // extra size at full energy (the 3D pop)
  ease: 0.16, // per-cell easing (lower = floatier wake)
  restAlpha: 0.04, // resting tile brightness
  glowAlpha: 0.8, // added brightness at full energy
};

const REST = "rgba(232,234,240,";
const ACCENT = [176, 150, 255]; // violet

export function HeroGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cell = CONFIG.size + CONFIG.gap;

    let W = 0;
    let H = 0;
    let cols = 0;
    let rows = 0;
    let energy = new Float32Array(0);
    let raf = 0;
    let running = false;

    let mx = -9999;
    let my = -9999;
    let has = false;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas.width = Math.max(1, Math.floor(W * dpr));
      canvas.height = Math.max(1, Math.floor(H * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(W / cell) + 1;
      rows = Math.ceil(H / cell) + 1;
      energy = new Float32Array(cols * rows);
    };

    const frame = () => {
      raf = 0;
      ctx.clearRect(0, 0, W, H);
      const R = CONFIG.radius;
      const R2 = R * R;
      const s = CONFIG.size;

      // cursor cell window (only these can gain energy)
      const span = Math.ceil(R / cell) + 1;
      const pc = has ? Math.floor(mx / cell) : -9999;
      const pr = has ? Math.floor(my / cell) : -9999;

      let anyEnergy = false;
      const active: number[] = [];

      // rest layer first (one fillStyle for the whole dim grid)
      ctx.fillStyle = REST + CONFIG.restAlpha + ")";
      for (let r = 0; r < rows; r++) {
        const cy = r * cell + s / 2;
        const inRowBand = has && r >= pr - span && r <= pr + span;
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c;
          const cx = c * cell + s / 2;

          let target = 0;
          if (inRowBand && c >= pc - span && c <= pc + span) {
            const dx = cx - mx;
            const dy = cy - my;
            const d2 = dx * dx + dy * dy;
            if (d2 < R2) {
              const t = 1 - Math.sqrt(d2) / R;
              target = t * t;
            }
          }

          const e = energy[i] + (target - energy[i]) * CONFIG.ease;
          energy[i] = e;

          if (e > 0.01) {
            active.push(i);
            anyEnergy = true;
          } else {
            ctx.fillRect(c * cell, r * cell, s, s);
          }
        }
      }

      // energized layer on top (lift + scale + violet glow)
      for (const i of active) {
        const r = (i / cols) | 0;
        const c = i - r * cols;
        const e = energy[i];
        const sz = s * (1 + CONFIG.scale * e);
        const cx = c * cell + s / 2;
        const cy = r * cell + s / 2 - CONFIG.lift * e;
        const a = CONFIG.restAlpha + CONFIG.glowAlpha * e;
        ctx.fillStyle = `rgba(${ACCENT[0]},${ACCENT[1]},${ACCENT[2]},${a.toFixed(3)})`;
        ctx.fillRect(cx - sz / 2, cy - sz / 2, sz, sz);
      }

      // soft ambient halo around the cursor
      if (has) {
        const g = ctx.createRadialGradient(mx, my, 0, mx, my, R * 1.3);
        g.addColorStop(0, `rgba(${ACCENT[0]},${ACCENT[1]},${ACCENT[2]},0.06)`);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.fillRect(mx - R * 1.3, my - R * 1.3, R * 2.6, R * 2.6);
      }

      // keep animating while there's motion or residual energy
      if (has || anyEnergy) {
        raf = requestAnimationFrame(frame);
      } else {
        running = false;
      }
    };

    const start = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(frame);
      }
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
      has = true;
      start();
    };
    const onLeave = () => {
      has = false;
      start();
    };
    const onResize = () => {
      resize();
      start();
    };

    resize();
    if (reduce) {
      // single static dim frame
      ctx.fillStyle = REST + CONFIG.restAlpha + ")";
      for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++) ctx.fillRect(c * cell, r * cell, CONFIG.size, CONFIG.size);
    } else {
      start(); // draw initial frame
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerleave", onLeave);
      window.addEventListener("resize", onResize);
    }

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 w-full h-full"
    />
  );
}

export default HeroGrid;

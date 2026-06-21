import type { TargetAndTransition, Transition } from "framer-motion";

interface CrtMotion {
  initial: TargetAndTransition;
  animate: TargetAndTransition;
  exit: TargetAndTransition;
  transition: Transition;
}

/**
 * Shared "CRT power" screen transition. Non-reduced motion collapses a screen
 * to a thin bright scanline on exit and expands the next one out of that line
 * on enter, like switching channels on an old tube TV. Reduced motion falls
 * back to a plain crossfade. Spread onto a motion element with
 * `style={{ transformOrigin: "center" }}`.
 */
export function crtMotion(reduce: boolean | null): CrtMotion {
  if (reduce) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.2 },
    };
  }
  return {
    initial: { scaleX: 0.4, scaleY: 0.004, opacity: 0.85 },
    animate: { scaleX: [0.4, 1, 1], scaleY: [0.004, 0.004, 1], opacity: 1 },
    exit: {
      scaleX: [1, 1, 0],
      scaleY: [1, 0.006, 0.006],
      opacity: [1, 1, 0],
      transition: { duration: 0.26, times: [0, 0.55, 1], ease: "easeIn" },
    },
    transition: { duration: 0.4, times: [0, 0.5, 1], ease: "easeOut" },
  };
}

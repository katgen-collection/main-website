"use client";

import { useRef, useState } from "react";
import type { RefObject, TouchEvent } from "react";

/**
 * Pull-down-to-dismiss for a scrollable screen. Only engages when the scroll
 * area is at the top, so it never fights normal vertical scrolling. Returns the
 * current pull offset (for a little drag feedback) and touch handlers.
 */
export function usePullToDismiss(onDismiss: () => void, scrollRef: RefObject<HTMLElement | null>) {
  const startY = useRef<number | null>(null);
  const [pull, setPull] = useState(0);

  const onTouchStart = (e: TouchEvent) => {
    const atTop = !scrollRef.current || scrollRef.current.scrollTop <= 0;
    startY.current = atTop ? e.touches[0].clientY : null;
  };

  const onTouchMove = (e: TouchEvent) => {
    if (startY.current === null) return;
    const dy = e.touches[0].clientY - startY.current;
    setPull(dy > 0 ? Math.min(dy * 0.5, 110) : 0);
  };

  const onTouchEnd = () => {
    const dismiss = startY.current !== null && pull > 64;
    startY.current = null;
    setPull(0);
    if (dismiss) onDismiss();
  };

  return { pull, handlers: { onTouchStart, onTouchMove, onTouchEnd } };
}

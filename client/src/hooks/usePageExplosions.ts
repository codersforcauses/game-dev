import { useCallback, useRef, useState } from "react";

import { useExplosions } from "@/hooks/useExplosions";

// Max concurrent debris bursts to prevent lag
const MAX_DEBRIS = 5;

export type ClickDebris = {
  id: number;
  x: number;
  y: number;
};

/**
 * Hook to manage page-level explosion interactions.
 * Extracts common explosion logic used across multiple pages.
 */
export function usePageExplosions() {
  const { explosions, triggerExplosions: baseTrigger } = useExplosions();
  const containerRef = useRef<HTMLDivElement>(null);
  const [clickDebris, setClickDebris] = useState<ClickDebris[]>([]);
  const lastClickTime = useRef(0);
  const debrisTimeouts = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());

  const handlePageClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;

      // Throttle clicks - 100ms minimum between clicks
      const now = Date.now();
      if (now - lastClickTime.current < 100) return;
      lastClickTime.current = now;

      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      // Get absolute pixel position for DebrisBurst
      const absoluteX = e.clientX;
      const absoluteY = e.clientY;

      // Create explosion at click position
      baseTrigger({
        count: 1,
        minDelay: 0,
        maxDelay: 0,
        duration: 1500,
        playSound: true,
        position: { x, y },
      });

      // Add DebrisBurst for click (limit max concurrent)
      const debrisId = now;
      setClickDebris((prev) => {
        const updated = [...prev, { id: debrisId, x: absoluteX, y: absoluteY }];
        return updated.slice(-MAX_DEBRIS);
      });

      // Remove after animation completes
      const timeout = setTimeout(() => {
        setClickDebris((prev) => prev.filter((d) => d.id !== debrisId));
        debrisTimeouts.current.delete(timeout);
      }, 1500);
      debrisTimeouts.current.add(timeout);
    },
    [baseTrigger],
  );

  // Cleanup timeouts on unmount
  const cleanup = useCallback(() => {
    debrisTimeouts.current.forEach((t) => clearTimeout(t));
    debrisTimeouts.current.clear();
  }, []);

  return {
    containerRef,
    handlePageClick,
    explosions,
    clickDebris,
    triggerExplosions: baseTrigger,
    cleanup,
  };
}


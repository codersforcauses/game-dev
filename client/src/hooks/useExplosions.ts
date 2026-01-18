import { useCallback, useState } from "react";

/**
 * Position of a single explosion within a container.
 * Coordinates are percentages (0-100) relative to container size.
 */
export type ExplosionPosition = {
  id: string;
  x: number; // Percentage (0-100)
  y: number; // Percentage (0-100)
  createdAt: number; // Timestamp for cleanup
};

/**
 * Configuration for explosion spawning behavior.
 */
export type ExplosionConfig = {
  count?: number; // Number of explosions to spawn (default: 1)
  minDelay?: number; // Minimum delay between explosions in ms (default: 0)
  maxDelay?: number; // Maximum delay between explosions in ms (default: 100)
  duration?: number; // How long explosions stay visible in ms (default: 1000)
};

/**
 * Custom hook to manage explosion spawning.
 * Provides state and functions to trigger explosions.
 */
export function useExplosions() {
  const [explosions, setExplosions] = useState<ExplosionPosition[]>([]);

  const triggerExplosions = useCallback(
    (
      config: ExplosionConfig = {},
      containerBounds?: DOMRect | null
    ) => {
      const {
        count = 1,
        minDelay = 0,
        maxDelay = 100,
        duration = 1000,
      } = config;

      // Generate explosion positions
      const now = Date.now();

      for (let i = 0; i < count; i++) {
        let x: number;
        let y: number;

        if (containerBounds) {
          // Random position within container bounds (10% margin)
          const margin = 10;
          x = margin + Math.random() * (100 - margin * 2);
          y = margin + Math.random() * (100 - margin * 2);
        } else {
          // Random position across full area
          x = Math.random() * 100;
          y = Math.random() * 100;
        }

        const delay = minDelay + Math.random() * (maxDelay - minDelay);

        setTimeout(() => {
          const explosionId = `${now}-${i}-${Math.random()}`;
          const explosion: ExplosionPosition = {
            id: explosionId,
            x,
            y,
            createdAt: Date.now(),
          };

          setExplosions((prev) => [...prev, explosion]);

          // Clean up after duration
          setTimeout(() => {
            setExplosions((prev) =>
              prev.filter((exp) => exp.id !== explosionId)
            );
          }, duration);
        }, delay);
      }
    },
    []
  );

  return {
    explosions,
    triggerExplosions,
  };
}


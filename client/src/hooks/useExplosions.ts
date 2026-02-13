import { useCallback, useState } from "react";

/**
 * Plays a random explosion sound effect.
 */
function playExplosionSound(): void {
  const soundIndex = Math.floor(Math.random() * 4); // 0-3 for xplsion_0 to xplsion_3
  const audio = new Audio(`/sfx/xplsion_${soundIndex}.mp3`);
  audio.volume = 0.1; // Set volume to 10% to avoid being too loud
  audio.play().catch((error) => {
    // Handle autoplay restrictions gracefully
    console.warn("Could not play explosion sound:", error);
  });
}

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
  playSound?: boolean; // Whether to play sound effects (default: true)
  position?: { x: number; y: number }; // Specific position (percentage 0-100), if not provided uses random
};

/**
 * Custom hook to manage explosion spawning.
 * Provides state and functions to trigger explosions.
 */
export function useExplosions() {
  const [explosions, setExplosions] = useState<ExplosionPosition[]>([]);

  const triggerExplosions = useCallback(
    (config: ExplosionConfig = {}, containerBounds?: DOMRect | null) => {
      const {
        count = 1,
        minDelay = 0,
        maxDelay = 100,
        duration = 3000,
        playSound = true,
        position, // Optional fixed position
      } = config;

      // Generate explosion positions
      const now = Date.now();

      for (let i = 0; i < count; i++) {
        let x: number;
        let y: number;

        if (position) {
          // Use specific position provided
          x = position.x;
          y = position.y;
        } else if (containerBounds) {
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

          // Play sound effect
          if (playSound) {
            playExplosionSound();
          }

          // Clean up after duration
          setTimeout(() => {
            setExplosions((prev) =>
              prev.filter((exp) => exp.id !== explosionId),
            );
          }, duration);
        }, delay);
      }
    },
    [],
  );

  return {
    explosions,
    triggerExplosions,
  };
}

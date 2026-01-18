import { useState } from "react";

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

  return {
    explosions,
  };
}


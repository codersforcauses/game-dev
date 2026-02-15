"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

import { DebrisBurst } from "@/components/ui/DebrisBurst";
import { Explosion } from "@/components/ui/Explosion";
import { ExplosionPosition, useExplosions } from "@/hooks/useExplosions";

// Max concurrent debris bursts to prevent lag
const MAX_DEBRIS = 5;

type ClickDebris = {
  id: number;
  x: number;
  y: number;
};

type ExplosionContextType = {
  triggerExplosionAt: (clientX: number, clientY: number) => void;
};

const ExplosionContext = createContext<ExplosionContextType | null>(null);

export function useExplosionContext() {
  const context = useContext(ExplosionContext);
  if (!context) {
    throw new Error(
      "useExplosionContext must be used within ExplosionProvider",
    );
  }
  return context;
}

export function ExplosionProvider({ children }: { children: React.ReactNode }) {
  const { explosions, triggerExplosions } = useExplosions();
  const [clickDebris, setClickDebris] = useState<ClickDebris[]>([]);
  const lastClickTime = useRef(0);
  const debrisTimeouts = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());

  const triggerExplosionAt = useCallback(
    (clientX: number, clientY: number) => {
      // Throttle - 100ms minimum between explosions
      const now = Date.now();
      if (now - lastClickTime.current < 100) return;
      lastClickTime.current = now;

      // Convert to percentage of viewport
      const x = (clientX / window.innerWidth) * 100;
      const y = (clientY / window.innerHeight) * 100;

      // Trigger explosion
      triggerExplosions({
        count: 1,
        minDelay: 0,
        maxDelay: 0,
        duration: 1500,
        playSound: true,
        position: { x, y },
      });

      // Add debris burst
      const debrisId = now;
      setClickDebris((prev) => {
        const updated = [...prev, { id: debrisId, x: clientX, y: clientY }];
        return updated.slice(-MAX_DEBRIS);
      });

      // Cleanup after animation
      const timeout = setTimeout(() => {
        setClickDebris((prev) => prev.filter((d) => d.id !== debrisId));
        debrisTimeouts.current.delete(timeout);
      }, 1500);
      debrisTimeouts.current.add(timeout);
    },
    [triggerExplosions],
  );

  return (
    <ExplosionContext.Provider value={{ triggerExplosionAt }}>
      {children}
      {/* Render explosions in a fixed overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 9999,
        }}
      >
        {explosions.map((explosion: ExplosionPosition) => (
          <Explosion key={explosion.id} explosion={explosion} />
        ))}
        {clickDebris.map((debris) => (
          <DebrisBurst
            key={debris.id}
            x={debris.x}
            y={debris.y}
            count={6}
            power={400}
            spreadDeg={360}
            gravity={1000}
            bounce={0.3}
          />
        ))}
      </div>
    </ExplosionContext.Provider>
  );
}

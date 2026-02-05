import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { ExplosionPosition } from "../../hooks/useExplosions";
import { DebrisBurst } from "./DebrisBurst";
import { Crater } from "./Crater";

interface ExplosionProps {
  explosion: ExplosionPosition;
}

/**
 * Renders a single explosion at a specific position.
 * Position is defined as a percentage of the parent container.
 */
export function Explosion({ explosion }: ExplosionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [debrisPosition, setDebrisPosition] = useState<{ x: number; y: number } | null>(null);

  // Convert percentage position to pixel coordinates for DebrisBurst
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current.closest('[class*="relative"]') as HTMLElement;
    if (!container) {
      // Fallback: use window if no relative container found
      const x = (explosion.x / 100) * window.innerWidth;
      const y = (explosion.y / 100) * window.innerHeight;
      setDebrisPosition({ x, y });
      return;
    }

    const rect = container.getBoundingClientRect();
    const x = rect.left + (explosion.x / 100) * rect.width;
    const y = rect.top + (explosion.y / 100) * rect.height;
    setDebrisPosition({ x, y });
  }, [explosion.x, explosion.y]);

  return (
    <div ref={containerRef}>
      {/* SVG Crater with depth shading */}
      <div
        className="pointer-events-none absolute z-40"
        style={{
          left: `${explosion.x}%`,
          top: `${explosion.y}%`,
          transformOrigin: "center",
          animation: "crater-expand 0.4s ease-out forwards, crater-fade 3s ease-out forwards",
        }}
      >
        <Crater size={100} intensity={0.95} />
      </div>
      {/* Physics-based debris burst */}
      {debrisPosition && (
        <DebrisBurst
          x={debrisPosition.x}
          y={debrisPosition.y}
          count={8}
          power={450}
          spreadDeg={360}
          gravity={1200}
          bounce={0.3}
        />
      )}
      {/* The actual explosion GIF */}
      <div
        className="pointer-events-none absolute z-50"
        style={{
          left: `${explosion.x}%`,
          top: `${explosion.y}%`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <Image
          src="/explosions/samj_cartoon_explosion.gif"
          alt="Explosion"
          width={150}
          height={150}
          className="animate-fade-in"
          unoptimized // GIFs need unoptimized to animate
        />
      </div>
    </div>
  );
}


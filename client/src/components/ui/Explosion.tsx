import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { ExplosionPosition } from "../../hooks/useExplosions";
import { DebrisBurst } from "./DebrisBurst";

interface ExplosionProps {
  explosion: ExplosionPosition;
}

/**
 * Generates an irregular polygon path for a jagged crater shape
 */
function generateIrregularCraterPath(): string {
  const points = 12; // Number of points for irregular shape
  const path: string[] = [];

  for (let i = 0; i < points; i++) {
    const angle = (i / points) * Math.PI * 2;
    // Add randomness to make it jagged (70-100% of radius)
    const randomRadius = 0.7 + Math.random() * 0.3;
    const x = 50 + Math.cos(angle) * randomRadius * 50;
    const y = 50 + Math.sin(angle) * randomRadius * 50;
    path.push(`${x}% ${y}%`);
  }

  return `polygon(${path.join(", ")})`;
}

/**
 * Renders a single explosion at a specific position.
 * Position is defined as a percentage of the parent container.
 */
export function Explosion({ explosion }: ExplosionProps) {
  // Generate irregular crater shape (unique per explosion)
  const craterPath = generateIrregularCraterPath();
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
      {/* Black crater - irregular jagged shape */}
      <div
        className="pointer-events-none absolute z-40"
        style={{
          left: `${explosion.x}%`,
          top: `${explosion.y}%`,
          transform: "translate(-50%, -50%)",
          width: "100px",
          height: "100px",
          clipPath: craterPath,
          backgroundColor: "rgba(0, 0, 0, 0.9)",
          animation: "crater-fade 3s ease-out forwards",
        }}
      />
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


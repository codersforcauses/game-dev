import Image from "next/image";
import { ExplosionPosition } from "../../hooks/useExplosions";

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
  return (
    <>
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
    </>
  );
}


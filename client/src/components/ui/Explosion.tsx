import Image from "next/image";
import { useEffect } from "react";
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

  // Generate debris pieces with flight paths
  const debrisCount = 6;
  const debris = Array.from({ length: debrisCount }, (_, i) => {
    const size = 15 + Math.random() * 10; // 15-25px
    const hue = 235 + Math.random() * 20; // Match page theme colors
    const lightness = 20 + Math.random() * 15;
    const angle = (i / debrisCount) * Math.PI * 2 + Math.random() * 0.5; // Random direction
    const distance = 80 + Math.random() * 40; // 80-120px distance
    const rotation = Math.random() * 360; // Random rotation
    const delay = Math.random() * 0.2; // Slight delay variation
    return { size, hue, lightness, angle, distance, rotation, delay };
  });

  // Inject debris animation keyframes
  useEffect(() => {
    const styleId = `debris-animations-${explosion.id}`;
    if (document.getElementById(styleId)) return; // Already injected

    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = debris
      .map(
        (piece, i) => {
          const finalX = Math.cos(piece.angle) * piece.distance;
          const finalY = Math.sin(piece.angle) * piece.distance;
          return `
            @keyframes debris-fly-${explosion.id}-${i} {
              0% {
                transform: translate(-50%, -50%) translate(0, 0) rotate(0deg);
                opacity: 0.8;
              }
              100% {
                transform: translate(-50%, -50%) translate(${finalX}px, ${finalY}px) rotate(${piece.rotation}deg);
                opacity: 0;
              }
            }
          `;
        }
      )
      .join("");
    document.head.appendChild(style);

    return () => {
      const existingStyle = document.getElementById(styleId);
      if (existingStyle) existingStyle.remove();
    };
  }, [explosion.id, debris]);

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
      {/* Debris pieces with flight animation */}
      {debris.map((piece, i) => (
        <div
          key={i}
          className="pointer-events-none absolute z-45"
          style={{
            left: `${explosion.x}%`,
            top: `${explosion.y}%`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: `hsl(${piece.hue}, 47%, ${piece.lightness}%)`,
            borderRadius: "2px",
            transform: "translate(-50%, -50%)",
            animation: `debris-fly-${explosion.id}-${i} 1s ease-out forwards`,
            animationDelay: `${piece.delay}s`,
            opacity: 0.8,
          }}
        />
      ))}
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


import Image from "next/image";
import { ExplosionPosition } from "../../hooks/useExplosions";

interface ExplosionProps {
  explosion: ExplosionPosition;
}

/**
 * Renders a single explosion at a specific position.
 * Position is defined as a percentage of the parent container.
 */
export function Explosion({ explosion }: ExplosionProps) {
  return (
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
  );
}


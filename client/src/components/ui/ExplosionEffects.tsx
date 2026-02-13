import { DebrisBurst } from "@/components/ui/DebrisBurst";
import { Explosion } from "@/components/ui/Explosion";
import { ExplosionPosition } from "@/hooks/useExplosions";
import { ClickDebris } from "@/hooks/usePageExplosions";

interface ExplosionEffectsProps {
  explosions: ExplosionPosition[];
  clickDebris: ClickDebris[];
}

/**
 * Renders all active explosions and debris bursts.
 * Extracts duplicated rendering logic from pages.
 */
export function ExplosionEffects({
  explosions,
  clickDebris,
}: ExplosionEffectsProps) {
  return (
    <>
      {/* Render explosions */}
      {explosions.map((explosion) => (
        <Explosion key={explosion.id} explosion={explosion} />
      ))}
      {/* Render DebrisBurst for clicks */}
      {clickDebris.map((debris) => (
        <DebrisBurst
          key={debris.id}
          x={debris.x}
          y={debris.y}
          count={6}
          power={400}
          spreadDeg={360}
          gravity={1000}
          bounce={0.25}
        />
      ))}
    </>
  );
}

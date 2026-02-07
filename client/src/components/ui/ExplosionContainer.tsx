import { useExplosions } from "../../hooks/useExplosions";
import { Explosion } from "./Explosion";

/**
 * Container component that renders all active explosions.
 * Handles the explosion state management via the useExplosions hook.
 */
export function ExplosionContainer() {
  const { explosions, triggerExplosions } = useExplosions();

  return (
    <>
      {explosions.map((explosion) => (
        <Explosion key={explosion.id} explosion={explosion} />
      ))}
    </>
  );
}

/**
 * Hook to access explosion trigger function from parent components.
 * Use this with ExplosionContainer to trigger explosions from anywhere.
 */
export { useExplosions };

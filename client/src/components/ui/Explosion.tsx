import { motion } from "framer-motion";

type ExplosionProps = {
  colour1: string;
  colour2: string;
  // looks better with odd numbers
  count: number;
  // can optionally take offsets to adjust exact position
  yOffset?: number;
  xOffset?: number;
};

export function Explosion({
  colour1,
  colour2,
  count,
  yOffset = 0,
  xOffset = 0,
}: ExplosionProps) {
  const particles = Array.from({ length: count });

  return (
    <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
      {particles.map((_, i) => {
        const individualSize = Math.random() * 0.1 + 4;
        const randomDisplacement = Math.random() * 10;

        // for every item in map, return a particle with a different size
        return (
          <motion.div
            key={i}
            initial={{
              x: xOffset,
              y: yOffset,
              opacity: 1,
              scale: individualSize,
            }}
            animate={{
              x: Math.cos(i + randomDisplacement) * 150 + xOffset,
              y: Math.sin(i + randomDisplacement) * 150 + yOffset,
              opacity: 0,
              scale: 0,
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute h-4 w-4 rounded-none"
            style={{
              backgroundColor: i % 2 === 0 ? colour1 : colour2,
              boxShadow: `0 0 10px ${colour1}`,
            }}
          />
        );
      })}
    </div>
  );
}

export default Explosion;

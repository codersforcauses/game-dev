import React, { useMemo } from "react";
import { motion } from "framer-motion";

interface SmokeProps {
  x: number; // percentage position
  y: number; // percentage position
  count?: number;
  duration?: number; // how long smoke lasts (ms)
}

interface SmokeParticle {
  id: number;
  offsetX: number;
  offsetY: number;
  size: number;
  delay: number;
  duration: number;
  drift: number;
  opacity: number;
}

/**
 * Smoke effect that rises from explosion point
 * Uses framer-motion for smooth animations
 */
export const Smoke = React.memo(function Smoke({
  x,
  y,
  count = 8,
  duration = 2500,
}: SmokeProps) {
  const particles = useMemo<SmokeParticle[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      // Spawn around the center with some spread
      offsetX: (Math.random() - 0.5) * 60,
      offsetY: Math.random() * 20,
      // Varying sizes for depth
      size: 30 + Math.random() * 50,
      // Stagger the particles
      delay: Math.random() * 0.4,
      // Each particle has slightly different rise time
      duration: (duration / 1000) * (0.7 + Math.random() * 0.5),
      // Horizontal drift while rising
      drift: (Math.random() - 0.5) * 80,
      // Initial opacity varies
      opacity: 0.4 + Math.random() * 0.3,
    }));
  }, [count, duration]);

  return (
    <div
      className="pointer-events-none absolute z-45"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{
            x: particle.offsetX,
            y: particle.offsetY,
            scale: 0.3,
            opacity: 0,
          }}
          animate={{
            x: particle.offsetX + particle.drift,
            y: particle.offsetY - 150 - Math.random() * 80, // Rise upward
            scale: [0.3, 1.2, 1.8],
            opacity: [0, particle.opacity, particle.opacity * 0.6, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            ease: "easeOut",
          }}
          style={{
            position: "absolute",
            width: particle.size,
            height: particle.size,
            borderRadius: "50%",
            background: `radial-gradient(circle at 30% 30%, 
              rgba(80, 75, 70, 0.8), 
              rgba(50, 48, 45, 0.6) 40%, 
              rgba(30, 28, 25, 0.3) 70%, 
              transparent 100%)`,
            filter: "blur(8px)",
          }}
        />
      ))}
    </div>
  );
});


import { motion } from "framer-motion";
import React, { useMemo } from "react";

interface SmokeProps {
  x: number; // percentage position
  y: number; // percentage position
  duration?: number; // how long smoke lasts (ms)
}

/**
 * Optimized SVG smoke effect
 * Uses shared filters and reduced complexity for better performance
 */
export const Smoke = React.memo(function Smoke({
  x,
  y,
  duration = 2000,
}: SmokeProps) {
  const uniqueId = useMemo(() => Math.random().toString(36).substr(2, 9), []);

  // Generate fewer smoke puffs (5 instead of 8)
  const smokePuffs = useMemo(() => {
    const puffs = [];
    const count = 5;

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
      const distance = 45 + Math.random() * 35;

      puffs.push({
        id: i,
        endX: Math.cos(angle) * distance,
        endY: Math.sin(angle) * distance - 15,
        delay: i * 0.03,
      });
    }
    return puffs;
  }, []);

  return (
    <div
      className="pointer-events-none absolute"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
        zIndex: 35,
      }}
    >
      {/* Shared SVG defs - filters defined once */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          {/* Single optimized turbulence filter */}
          <filter
            id={`smoke-filter-${uniqueId}`}
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.02"
              numOctaves="2"
              seed={42}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="12"
              xChannelSelector="R"
              yChannelSelector="G"
            />
            <feGaussianBlur stdDeviation="3" />
          </filter>

          {/* Shared gradient */}
          <radialGradient
            id={`smoke-grad-${uniqueId}`}
            cx="50%"
            cy="50%"
            r="50%"
          >
            <stop offset="0%" stopColor="rgba(70, 65, 60, 0.75)" />
            <stop offset="50%" stopColor="rgba(90, 85, 80, 0.4)" />
            <stop offset="100%" stopColor="rgba(110, 105, 100, 0)" />
          </radialGradient>
        </defs>
      </svg>

      {/* Central expanding smoke - uses CSS blur for performance */}
      <motion.div
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{
          scale: [0.3, 1.5, 2.2],
          opacity: [0, 0.65, 0],
        }}
        transition={{ duration: (duration / 1000) * 0.9, ease: "easeOut" }}
        style={{
          position: "absolute",
          width: 100,
          height: 100,
          left: -50,
          top: -50,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(70, 65, 60, 0.7) 0%, rgba(90, 85, 80, 0.3) 50%, transparent 70%)",
          filter: "blur(8px)",
          willChange: "transform, opacity",
        }}
      />

      {/* Smoke puffs - share single filter */}
      {smokePuffs.map((puff) => (
        <motion.div
          key={puff.id}
          initial={{ x: 0, y: 0, scale: 0.4, opacity: 0 }}
          animate={{
            x: puff.endX,
            y: puff.endY,
            scale: [0.4, 1.1, 1.4],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: (duration / 1000) * 0.85,
            delay: puff.delay,
            ease: "easeOut",
          }}
          style={{
            position: "absolute",
            width: 60,
            height: 60,
            left: -30,
            top: -30,
            willChange: "transform, opacity",
          }}
        >
          <svg width="60" height="60" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill={`url(#smoke-grad-${uniqueId})`}
              filter={`url(#smoke-filter-${uniqueId})`}
            />
          </svg>
        </motion.div>
      ))}

      {/* Single rising wisp - CSS blur only */}
      <motion.div
        initial={{ y: 0, opacity: 0, scale: 0.5 }}
        animate={{
          y: -70,
          opacity: [0, 0.5, 0],
          scale: [0.5, 1.3, 1.6],
        }}
        transition={{
          duration: duration / 1000,
          delay: 0.15,
          ease: "easeOut",
        }}
        style={{
          position: "absolute",
          width: 50,
          height: 50,
          left: -25,
          top: -25,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(80, 75, 70, 0.6) 0%, transparent 70%)",
          filter: "blur(10px)",
          willChange: "transform, opacity",
        }}
      />
    </div>
  );
});

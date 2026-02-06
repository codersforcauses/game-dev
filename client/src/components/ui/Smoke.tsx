import React, { useMemo } from "react";
import { motion } from "framer-motion";

interface SmokeProps {
  x: number; // percentage position
  y: number; // percentage position
  count?: number;
  duration?: number; // how long smoke lasts (ms)
}

/**
 * SVG-based smoke effect with turbulence filter
 * Creates realistic, organic smoke that expands from crater
 */
export const Smoke = React.memo(function Smoke({
  x,
  y,
  duration = 2500,
}: SmokeProps) {
  const uniqueId = useMemo(() => Math.random().toString(36).substr(2, 9), []);
  
  // Generate smoke puffs at different angles
  const smokePuffs = useMemo(() => {
    const puffs = [];
    const count = 8;
    
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
      const distance = 50 + Math.random() * 40;
      const size = 60 + Math.random() * 40;
      const delay = Math.random() * 0.15;
      
      puffs.push({
        id: i,
        angle,
        distance,
        size,
        delay,
        endX: Math.cos(angle) * distance,
        endY: Math.sin(angle) * distance - (15 + Math.random() * 20),
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
      {/* Central expanding smoke ring */}
      <motion.div
        initial={{ scale: 0.2, opacity: 0 }}
        animate={{ 
          scale: [0.2, 1.5, 2.5],
          opacity: [0, 0.6, 0],
        }}
        transition={{ duration: duration / 1000, ease: "easeOut" }}
        style={{
          position: "absolute",
          width: 120,
          height: 120,
          left: -60,
          top: -60,
        }}
      >
        <svg width="120" height="120" viewBox="0 0 120 120">
          <defs>
            {/* Turbulence filter for smoke texture */}
            <filter id={`smoke-turbulence-${uniqueId}`} x="-50%" y="-50%" width="200%" height="200%">
              <feTurbulence 
                type="fractalNoise" 
                baseFrequency="0.015" 
                numOctaves="3" 
                seed={Math.random() * 100}
                result="noise"
              />
              <feDisplacementMap 
                in="SourceGraphic" 
                in2="noise" 
                scale="20" 
                xChannelSelector="R" 
                yChannelSelector="G"
              />
              <feGaussianBlur stdDeviation="3" />
            </filter>
            
            {/* Radial gradient for smoke density */}
            <radialGradient id={`smoke-grad-${uniqueId}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(60, 55, 50, 0.8)" />
              <stop offset="40%" stopColor="rgba(80, 75, 70, 0.5)" />
              <stop offset="70%" stopColor="rgba(100, 95, 90, 0.2)" />
              <stop offset="100%" stopColor="rgba(120, 115, 110, 0)" />
            </radialGradient>
          </defs>
          
          {/* Main smoke cloud */}
          <circle
            cx="60"
            cy="60"
            r="55"
            fill={`url(#smoke-grad-${uniqueId})`}
            filter={`url(#smoke-turbulence-${uniqueId})`}
          />
        </svg>
      </motion.div>

      {/* Individual smoke puffs expanding outward */}
      {smokePuffs.map((puff) => (
        <motion.div
          key={puff.id}
          initial={{ x: 0, y: 0, scale: 0.3, opacity: 0 }}
          animate={{
            x: puff.endX,
            y: puff.endY,
            scale: [0.3, 1, 1.5],
            opacity: [0, 0.7, 0],
          }}
          transition={{
            duration: (duration / 1000) * (0.8 + Math.random() * 0.4),
            delay: puff.delay,
            ease: "easeOut",
          }}
          style={{
            position: "absolute",
            width: puff.size,
            height: puff.size,
            left: -puff.size / 2,
            top: -puff.size / 2,
          }}
        >
          <svg width={puff.size} height={puff.size} viewBox="0 0 100 100">
            <defs>
              <filter id={`puff-filter-${uniqueId}-${puff.id}`} x="-50%" y="-50%" width="200%" height="200%">
                <feTurbulence 
                  type="fractalNoise" 
                  baseFrequency="0.02" 
                  numOctaves="2" 
                  seed={puff.id * 17}
                  result="noise"
                />
                <feDisplacementMap 
                  in="SourceGraphic" 
                  in2="noise" 
                  scale="15" 
                  xChannelSelector="R" 
                  yChannelSelector="G"
                />
                <feGaussianBlur stdDeviation="4" />
              </filter>
              
              <radialGradient id={`puff-grad-${uniqueId}-${puff.id}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(70, 65, 60, 0.7)" />
                <stop offset="50%" stopColor="rgba(90, 85, 80, 0.4)" />
                <stop offset="100%" stopColor="rgba(110, 105, 100, 0)" />
              </radialGradient>
            </defs>
            
            {/* Organic blob shape */}
            <ellipse
              cx="50"
              cy="50"
              rx="45"
              ry="40"
              fill={`url(#puff-grad-${uniqueId}-${puff.id})`}
              filter={`url(#puff-filter-${uniqueId}-${puff.id})`}
            />
          </svg>
        </motion.div>
      ))}

      {/* Rising wisps */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={`wisp-${i}`}
          initial={{ y: 0, opacity: 0, scale: 0.5 }}
          animate={{
            y: -80 - i * 30,
            opacity: [0, 0.4, 0],
            scale: [0.5, 1.2, 1.8],
          }}
          transition={{
            duration: (duration / 1000) * 1.2,
            delay: 0.2 + i * 0.15,
            ease: "easeOut",
          }}
          style={{
            position: "absolute",
            width: 50 + i * 15,
            height: 50 + i * 15,
            left: -(25 + i * 7.5) + (i - 1) * 20,
            top: -(25 + i * 7.5),
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 100 100">
            <defs>
              <filter id={`wisp-filter-${uniqueId}-${i}`}>
                <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed={i * 31} />
                <feDisplacementMap in="SourceGraphic" scale="12" />
                <feGaussianBlur stdDeviation="5" />
              </filter>
              <radialGradient id={`wisp-grad-${uniqueId}-${i}`}>
                <stop offset="0%" stopColor="rgba(80, 75, 70, 0.5)" />
                <stop offset="100%" stopColor="rgba(100, 95, 90, 0)" />
              </radialGradient>
            </defs>
            <circle
              cx="50"
              cy="50"
              r="40"
              fill={`url(#wisp-grad-${uniqueId}-${i})`}
              filter={`url(#wisp-filter-${uniqueId}-${i})`}
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
});

import React, { useMemo } from "react";

interface CraterProps {
  size?: number;
  intensity?: number;
}

/**
 * Generates an irregular crater polygon
 */
function generateCraterShape(baseRadius: number, points: number = 10): string {
  const coords: string[] = [];
  
  for (let i = 0; i < points; i++) {
    const angle = (i / points) * Math.PI * 2;
    const radius = baseRadius * (0.75 + Math.random() * 0.3);
    const x = 50 + Math.cos(angle) * radius;
    const y = 50 + Math.sin(angle) * radius;
    coords.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  
  return coords.join(" ");
}

/**
 * Generates a crack as a polygon shape (actual gap in ground)
 * Returns points for a wedge-shaped fissure
 */
function generateCrackFissure(
  angle: number,
  startRadius: number,
  length: number
): string {
  // Crack is a tapered wedge shape - wide at crater, sharp point at end
  const widthAtStart = 7 + Math.random() * 5;   // Bit skinnier (7-12)
  const widthAtEnd = 0.5 + Math.random() * 1;   // Sharp point at tip (0.5-1.5)
  
  // Calculate perpendicular angle for width
  const perpAngle = angle + Math.PI / 2;
  
  // Points along the crack with some jaggedness
  const segments = 3;
  const points: Array<{ x: number; y: number }> = [];
  const pointsBack: Array<{ x: number; y: number }> = [];
  
  let currentAngle = angle;
  
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    // Start from inside crater and extend outward
    const radius = startRadius + (length * t);
    const width = widthAtStart + (widthAtEnd - widthAtStart) * t;
    
    // Add jaggedness to angle
    if (i > 0 && i < segments) {
      currentAngle += (Math.random() - 0.5) * 0.3;
    }
    
    const centerX = 50 + Math.cos(currentAngle) * radius;
    const centerY = 50 + Math.sin(currentAngle) * radius;
    
    // Offset perpendicular for width
    const offsetX = Math.cos(perpAngle) * width / 2;
    const offsetY = Math.sin(perpAngle) * width / 2;
    
    // Add random jaggedness to edges - less at the tip for sharp point
    const jagAmount = 4 * (1 - t * 0.8); // More jagged at start, smooth at tip
    const jag1 = (Math.random() - 0.5) * jagAmount;
    const jag2 = (Math.random() - 0.5) * jagAmount;
    
    points.push({
      x: centerX + offsetX + jag1,
      y: centerY + offsetY + jag1,
    });
    pointsBack.unshift({
      x: centerX - offsetX + jag2,
      y: centerY - offsetY + jag2,
    });
  }
  
  // Combine into polygon
  const allPoints = [...points, ...pointsBack];
  return allPoints.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
}

/**
 * Crater with fissure-style cracks (actual gaps, not lines)
 */
export const Crater = React.memo(function Crater({ 
  size = 100, 
  intensity = 1,
}: CraterProps) {
  const uniqueId = useMemo(() => Math.random().toString(36).substr(2, 9), []);
  
  // Crater shapes
  const outerCrater = useMemo(() => generateCraterShape(22, 12), []);
  const innerCrater = useMemo(() => generateCraterShape(14, 10), []);
  const deepCrater = useMemo(() => generateCraterShape(8, 8), []);
  
  // Generate 3-5 crack fissures
  const fissures = useMemo(() => {
    const count = 3 + Math.floor(Math.random() * 3);
    const result: Array<{ points: string; delay: number }> = [];
    
    for (let i = 0; i < count; i++) {
      // Spread cracks around but not perfectly even
      const baseAngle = (i / count) * Math.PI * 2;
      const angle = baseAngle + (Math.random() - 0.5) * 0.8;
      const length = 25 + Math.random() * 20;
      
      // Start inside crater to ensure connection (crater edge is ~16-23)
      result.push({
        points: generateCrackFissure(angle, 14, length),
        delay: i * 0.04,
      });
    }
    
    return result;
  }, []);
  
  // Colors
  const voidColor = `rgba(0, 0, 0, ${intensity})`;
  const deepColor = `rgba(8, 5, 2, ${0.95 * intensity})`;
  const craterColor = `rgba(20, 15, 8, ${0.9 * intensity})`;
  const rimColor = `rgba(45, 35, 25, ${0.7 * intensity})`;
  
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{ overflow: "visible" }}
    >
      <defs>
        <radialGradient id={`crater-grad-${uniqueId}`} cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor={voidColor} />
          <stop offset="50%" stopColor={deepColor} />
          <stop offset="80%" stopColor={craterColor} />
          <stop offset="100%" stopColor={rimColor} />
        </radialGradient>
        
        <filter id={`blur-${uniqueId}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
        </filter>
      </defs>
      
      {/* Crack fissures - these are actual gaps */}
      {fissures.map((fissure, i) => (
        <g key={i}>
          {/* Fissure main shape */}
          <polygon
            points={fissure.points}
            fill={voidColor}
          />
          {/* Fissure edge highlight */}
          <polygon
            points={fissure.points}
            fill="none"
            stroke={rimColor}
            strokeWidth="0.8"
            strokeLinejoin="miter"
          />
        </g>
      ))}
      
      {/* Outer crater rim */}
      <polygon
        points={outerCrater}
        fill={rimColor}
      />
      
      {/* Main crater */}
      <polygon
        points={outerCrater}
        fill={`url(#crater-grad-${uniqueId})`}
      />
      
      {/* Inner crater layer */}
      <polygon
        points={innerCrater}
        fill={deepColor}
      />
      
      {/* Deepest void */}
      <polygon
        points={deepCrater}
        fill={voidColor}
      />
      
      {/* Crater rim edge */}
      <polygon
        points={outerCrater}
        fill="none"
        stroke="rgba(60, 50, 40, 0.4)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
});

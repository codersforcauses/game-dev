import React, { useMemo } from "react";

interface CraterProps {
  size?: number;
  intensity?: number; // 0-1, affects depth appearance
}

/**
 * Generates irregular polygon points for jagged crater edge
 */
function generateJaggedPath(points: number, baseRadius: number): string {
  const coords: string[] = [];
  
  for (let i = 0; i < points; i++) {
    const angle = (i / points) * Math.PI * 2;
    // Add randomness to radius (50-100% of base) for jaggedness
    const randomRadius = baseRadius * (0.5 + Math.random() * 0.5);
    // Add slight angle offset for more organic shape
    const angleOffset = (Math.random() - 0.5) * 0.3;
    const x = 50 + Math.cos(angle + angleOffset) * randomRadius;
    const y = 50 + Math.sin(angle + angleOffset) * randomRadius;
    coords.push(`${x},${y}`);
  }
  
  return coords.join(" ");
}

/**
 * Generates crack lines radiating from crater edge
 */
function generateCracks(count: number, craterRadius: number): Array<{ x1: number; y1: number; x2: number; y2: number }> {
  const cracks: Array<{ x1: number; y1: number; x2: number; y2: number }> = [];
  
  for (let i = 0; i < count; i++) {
    // Random angle around the crater
    const angle = (Math.random() * Math.PI * 2);
    // Start point at crater edge
    const startRadius = craterRadius;
    const x1 = 50 + Math.cos(angle) * startRadius;
    const y1 = 50 + Math.sin(angle) * startRadius;
    
    // End point extending outward
    const crackLength = 15 + Math.random() * 20; // 15-35 units outward
    const x2 = 50 + Math.cos(angle) * (startRadius + crackLength);
    const y2 = 50 + Math.sin(angle) * (startRadius + crackLength);
    
    cracks.push({ x1, y1, x2, y2 });
  }
  
  return cracks;
}

/**
 * SVG crater with depth shading using radial gradients and jagged edges
 */
export const Crater = React.memo(function Crater({ 
  size = 100, 
  intensity = 1 
}: CraterProps) {
  const uniqueId = useMemo(() => Math.random().toString(36).substr(2, 9), []);
  
  // Generate jagged paths for irregular crater shape
  const outerJaggedPath = useMemo(() => generateJaggedPath(20, 48), []);
  const innerJaggedPath = useMemo(() => generateJaggedPath(16, 25), []);
  
  // Generate crack lines extending from crater
  const cracks = useMemo(() => generateCracks(4 + Math.floor(Math.random() * 3), 48), []); // 4-6 cracks

  // Colors for depth effect
  const voidColor = `rgba(0, 0, 0, ${intensity})`;
  const deepCraterColor = `rgba(10, 8, 5, ${0.95 * intensity})`;
  const midCraterColor = `rgba(30, 28, 25, ${0.85 * intensity})`;
  const outerCraterColor = `rgba(60, 55, 50, ${0.7 * intensity})`;
  const rimHighlightColor = `rgba(120, 110, 100, ${0.3 * intensity})`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{ overflow: "visible" }}
    >
      <defs>
        {/* Main crater depth gradient - dark center to lighter edges */}
        <radialGradient id={`crater-depth-${uniqueId}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={voidColor} />
          <stop offset="30%" stopColor={deepCraterColor} />
          <stop offset="60%" stopColor={midCraterColor} />
          <stop offset="85%" stopColor={outerCraterColor} />
          <stop offset="100%" stopColor="rgba(40, 35, 30, 0)" />
        </radialGradient>
        
        {/* Rim highlight gradient for 3D effect */}
        <radialGradient id={`crater-rim-highlight-${uniqueId}`} cx="35%" cy="30%" r="60%">
          <stop offset="0%" stopColor={rimHighlightColor} />
          <stop offset="40%" stopColor="rgba(70, 65, 60, 0.1)" />
          <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
        </radialGradient>
        
        {/* Blur filter for soft edges */}
        <filter id={`crater-blur-${uniqueId}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" />
        </filter>
        
        {/* Clip path for jagged crater edge */}
        <clipPath id={`crater-clip-${uniqueId}`}>
          <polygon points={outerJaggedPath} />
        </clipPath>
      </defs>
      
      {/* Main crater body with jagged clip */}
      <g clipPath={`url(#crater-clip-${uniqueId})`}>
        {/* Base depth layer with irregular shape */}
        <polygon
          points={outerJaggedPath}
          fill={`url(#crater-depth-${uniqueId})`}
          filter={`url(#crater-blur-${uniqueId})`}
          transform="rotate(5, 50, 50)"
        />
        
        {/* Inner pit for deeper void effect */}
        <polygon
          points={innerJaggedPath}
          fill={voidColor}
          transform="translate(-1, -1) rotate(-5, 50, 50)"
        />
        
        {/* Rim highlight overlay for 3D depth */}
        <polygon
          points={outerJaggedPath}
          fill={`url(#crater-rim-highlight-${uniqueId})`}
          transform="rotate(5, 50, 50)"
        />
      </g>
      
      {/* Crack lines extending outward from crater */}
      {cracks.map((crack, index) => (
        <line
          key={`crack-${index}`}
          x1={crack.x1}
          y1={crack.y1}
          x2={crack.x2}
          y2={crack.y2}
          stroke="rgba(0, 0, 0, 0.8)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
});


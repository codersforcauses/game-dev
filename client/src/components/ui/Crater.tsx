import React, { useMemo } from "react";

interface CraterProps {
  size?: number;
  intensity?: number; // 0-1, affects depth appearance
}

/**
 * SVG crater with depth shading using radial gradients
 */
export const Crater = React.memo(function Crater({ 
  size = 100, 
  intensity = 1 
}: CraterProps) {
  const uniqueId = useMemo(() => Math.random().toString(36).substr(2, 9), []);

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
      </defs>
      
      {/* Main crater body with depth gradient */}
      <ellipse
        cx="50"
        cy="50"
        rx="48"
        ry="48"
        fill={`url(#crater-depth-${uniqueId})`}
        filter={`url(#crater-blur-${uniqueId})`}
      />
      
      {/* Inner pit for deeper void effect */}
      <ellipse
        cx="50"
        cy="50"
        rx="25"
        ry="25"
        fill={voidColor}
      />
      
      {/* Rim highlight overlay for 3D depth */}
      <ellipse
        cx="50"
        cy="50"
        rx="48"
        ry="48"
        fill={`url(#crater-rim-highlight-${uniqueId})`}
      />
    </svg>
  );
});


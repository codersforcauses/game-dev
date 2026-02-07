import React, { useCallback, useEffect, useMemo, useRef } from "react";

type Debris = {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  size: number;
  life: number;
  maxLife: number;
};

type Props = {
  x: number;
  y: number;
  count?: number;
  power?: number;
  spreadDeg?: number;
  gravity?: number;
  groundY?: number;
  bounce?: number;
  onDone?: () => void;
};

// Use React.memo to prevent unnecessary re-renders
export const DebrisBurst = React.memo(function DebrisBurst({
  x,
  y,
  count = 8, // Reduced default count
  power = 450,
  spreadDeg = 360,
  gravity = 1200,
  groundY,
  bounce = 0.3,
  onDone,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const debrisRef = useRef<Debris[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastT = useRef<number>(0);

  // Generate initial debris - memoized
  const initial = useMemo(() => {
    const arr: Debris[] = [];
    const spread = (spreadDeg * Math.PI) / 180;

    for (let i = 0; i < count; i++) {
      const angle =
        spreadDeg === 360
          ? Math.random() * Math.PI * 2
          : (Math.random() - 0.5) * spread;

      const speed = power * (0.5 + Math.random() * 0.5);
      const vx = Math.cos(angle) * speed;
      const vy =
        -Math.abs(Math.sin(angle) * speed) * (0.7 + Math.random() * 0.3);
      const size = 6 + Math.random() * 10;
      const maxLife = 500 + Math.random() * 400; // Shorter lifetime

      arr.push({
        id: i,
        x: 0,
        y: 0,
        vx,
        vy,
        rot: Math.random() * 360,
        vr: (Math.random() - 0.5) * 600,
        size,
        life: maxLife,
        maxLife,
      });
    }
    return arr;
  }, [count, power, spreadDeg]);

  // Animation step - using refs to avoid re-renders
  const step = useCallback(
    (t: number) => {
      const dt = Math.min(0.04, (t - lastT.current) / 1000);
      lastT.current = t;

      const container = containerRef.current;
      if (!container) return;

      const children = container.children;
      let anyAlive = false;

      for (let i = 0; i < debrisRef.current.length; i++) {
        const d = debrisRef.current[i];
        if (d.life <= 0) continue;

        d.life -= dt * 1000;
        if (d.life <= 0) {
          (children[i] as HTMLElement).style.display = "none";
          continue;
        }

        anyAlive = true;

        // Physics
        d.vx *= 1 - 0.2 * dt;
        d.vy += gravity * dt;
        d.x += d.vx * dt;
        d.y += d.vy * dt;
        d.rot += d.vr * dt;

        // Ground bounce
        if (groundY !== undefined && y + d.y > groundY) {
          d.y = groundY - y;
          d.vy = -d.vy * bounce;
          d.vx *= 0.7;
        }

        // Update DOM directly (no React re-render)
        const el = children[i] as HTMLElement;
        const alpha = Math.max(0, d.life / d.maxLife);
        el.style.transform = `translate3d(${d.x}px, ${d.y}px, 0) rotate(${d.rot}deg)`;
        el.style.opacity = String(alpha);
      }

      if (anyAlive) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        onDone?.();
      }
    },
    [gravity, groundY, bounce, y, onDone],
  );

  // Set up animation
  useEffect(() => {
    debrisRef.current = initial.map((d) => ({ ...d }));
    lastT.current = performance.now();
    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [initial, step]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        left: x,
        top: y,
        pointerEvents: "none",
        zIndex: 45,
      }}
    >
      {initial.map((d) => (
        <span
          key={d.id}
          className="debris-chunk"
          style={{
            width: d.size,
            height: d.size * 0.8,
          }}
        />
      ))}
    </div>
  );
});

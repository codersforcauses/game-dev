import React, { useMemo, useState, useRef, useEffect } from "react";

type Debris = {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  size: number;
  life: number; // ms remaining
  maxLife: number; // ms
};

type Props = {
  x: number; // crater center (px)
  y: number; // crater center (px)
  count?: number;
  power?: number; // launch velocity scale
  spreadDeg?: number; // 360 = all directions, 180 = forward semicircle, etc
  gravity?: number; // px/s^2
  groundY?: number; // optional "ground" to bounce on (absolute px)
  bounce?: number; // 0..1
  onDone?: () => void;
};

export function DebrisBurst({
  x,
  y,
  count = 22,
  power = 520,
  spreadDeg = 360,
  gravity = 1400,
  groundY,
  bounce = 0.35,
  onDone,
}: Props) {
  // Generate initial debris array with random properties
  const initial = useMemo(() => {
    const arr: Debris[] = [];
    const spread = (spreadDeg * Math.PI) / 180;

    for (let i = 0; i < count; i++) {
      // Angle around the crater
      const a = (Math.random() - 0.5) * spread; // centered spread
      // If you want "all around", keep it; if you want directional, offset by an angle.
      const angle = a + (spreadDeg === 360 ? Math.random() * Math.PI * 2 : 0);

      // Speed (biased: a few big chunks, some small)
      const speed = power * (0.45 + Math.random() * 0.65);

      // Lift a bit so it arcs
      const vx = Math.cos(angle) * speed;
      const vy = -Math.abs(Math.sin(angle) * speed) * (0.75 + Math.random() * 0.4);

      const size = 6 + Math.random() * 14;
      const maxLife = 650 + Math.random() * 600;

      arr.push({
        id: i,
        x: 0,
        y: 0,
        vx,
        vy,
        rot: Math.random() * 360,
        vr: (Math.random() - 0.5) * 720, // deg/s
        size,
        life: maxLife,
        maxLife,
      });
    }
    return arr;
  }, [count, power, spreadDeg]);

  const [debris, setDebris] = useState<Debris[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastT = useRef<number>(0);

  // Set up animation loop
  useEffect(() => {
    setDebris(initial);
    lastT.current = performance.now();

    const step = (t: number) => {
      const dt = Math.min(0.033, (t - lastT.current) / 1000); // seconds, cap big frames
      lastT.current = t;

      setDebris((prev) => {
        const next = prev
          .map((d) => {
            const life = d.life - dt * 1000; // decrease lifetime

            // Apply air drag to velocity
            let vx = d.vx * (1 - 0.25 * dt); // a little air drag
            let vy = d.vy + gravity * dt; // apply gravity

            // Update position based on velocity
            let px = d.x + vx * dt;
            let py = d.y + vy * dt;

            // Optional bounce off ground
            if (groundY !== undefined) {
              const absoluteY = y + py;
              if (absoluteY > groundY) {
                py = groundY - y; // clamp
                vy = -vy * bounce; // bounce up
                vx = vx * (0.7 + Math.random() * 0.1); // lose some horizontal speed
              }
            }

            return {
              ...d,
              x: px,
              y: py,
              vx,
              vy,
              rot: d.rot + d.vr * dt, // update rotation
              life,
            };
          })
          .filter((d) => d.life > 0); // remove debris when lifetime expires

        if (next.length === 0) onDone?.(); // call callback when all debris is gone
        return next;
      });

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [initial, gravity, groundY, bounce, y]);

  return null;
}


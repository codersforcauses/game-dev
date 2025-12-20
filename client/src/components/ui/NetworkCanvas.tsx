"use client";

import {
  motion,
  MotionValue,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

import useInView from "@/hooks/useInView";
import { hslVarWithOpacity } from "@/lib/utils";

// Type definitions for particle system
type ParticleConfig = {
  baseX: number;
  baseY: number;
  size: number;
  delay: number;
  duration: number;
  color?: string;
};
type NetworkParticle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
};

// Gradient that follows mouse cursor position for interactive effect
function MouseGradient({
  smoothX,
  smoothY,
  isHovering,
  mouseGradStart,
  mouseGradEnd,
}: {
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
  isHovering: boolean;
  mouseGradStart: string;
  mouseGradEnd: string;
}) {
  const background = useMotionTemplate`radial-gradient(
          circle 15px at ${smoothX}% ${smoothY}%,
           hsl(var(--${mouseGradStart})) 0%, 
           hsl(var(--${mouseGradEnd})) 40%, 
           transparent 70%
         )`;
  return (
    <motion.div
      className="absolute inset-0"
      style={{
        // background: `radial-gradient(
        //   circle 15px at ${smoothX}% ${smoothY}%,
        //   hsl(var(--color-${mouseGradStart})) 0%, hsl(var(--color-${mouseGradEnd})) 40%,
        //   transparent 70%
        // )`,
        background: background,
        opacity: isHovering ? 0.3 : 0.2,
      }}
      transition={{ duration: 0.5 }}
    />
  );
}

// Individual particle component with pulsing animation and mouse interaction
function SimpleParticle({
  baseX,
  baseY,
  size,
  delay,
  duration,
  smoothX,
  smoothY,
  isHovering,
  color = hslVarWithOpacity("--light-1", 0.6),
}: ParticleConfig & {
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
  isHovering: boolean;
}) {
  // Create motion values for the offsets
  const targetOffsetX = useTransform(smoothX, (mx) =>
    isHovering ? (mx - 50) * 0.3 : 0,
  );
  const targetOffsetY = useTransform(smoothY, (my) =>
    isHovering ? (my - 50) * 0.3 : 0,
  );

  // animate back to default position
  const offsetX = useSpring(targetOffsetX, {
    damping: 25,
    stiffness: 100,
  });
  const offsetY = useSpring(targetOffsetY, {
    damping: 25,
    stiffness: 100,
  });

  return (
    <motion.div
      className="pointer-events-none absolute"
      style={{ left: `${baseX}%`, top: `${baseY}%`, x: offsetX, y: offsetY }}
    >
      <motion.div
        // animating opacity causes css error spam on gecko-based browsers
        animate={{ scale: [0.9, 1.1, 0.9] }}
        transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          style={{
            width: size,
            height: size,
            borderRadius: "50%",
            backgroundColor: color,
          }}
        />
      </motion.div>
    </motion.div>
  );
}

type NetworkFrameConfig = {
  count: number;
  particle_velocity: number;
  min_particle_size: number;
  max_particle_size: number;
  mouse_connection_distance: number;
  network_connection_distance: number;
};

// Canvas-based network visualization with particle connections
function NetworkFrame({
  width,
  height,
  smoothX,
  smoothY,
  isHovering,
  frameconf,
  className,
}: {
  width: number;
  height: number;
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
  isHovering: boolean;
  frameconf: NetworkFrameConfig;
  className: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<NetworkParticle[]>([]);
  const initializedRef = useRef(false);

  useEffect(() => {
    // Initialize particles only once to prevent regeneration on re-render
    if (!initializedRef.current) {
      particlesRef.current = Array.from({ length: frameconf.count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * frameconf.particle_velocity,
        vy: (Math.random() - 0.5) * frameconf.particle_velocity,
        size:
          frameconf.min_particle_size +
          Math.random() * frameconf.max_particle_size,
      }));
      initializedRef.current = true;
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let id: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const pts = particlesRef.current;
      const mx = (smoothX.get() / 100) * width; // Convert percentage to pixel coordinates
      const my = (smoothY.get() / 100) * height;

      // Update particle positions with boundary collision
      pts.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        p.x = Math.max(0, Math.min(width, p.x));
        p.y = Math.max(0, Math.min(height, p.y));
      });

      // Draw connections between nearby particles (max 2 connections per particle)
      for (let i = 0; i < pts.length; i++) {
        const pA = pts[i];
        const dists = pts
          .slice(i + 1)
          .map((pB, j) => {
            const dx = pA.x - pB.x;
            const dy = pA.y - pB.y;
            return { index: i + j + 1, dist: Math.sqrt(dx * dx + dy * dy) };
          })
          .filter((d) => d.dist < frameconf.network_connection_distance)
          // TODO: we should possibly be maintaining a heap if we're sorting
          // over and over again...
          .sort((a, b) => a.dist - b.dist)
          .slice(0, 2);

        // we need to fix debouncing for color setting...
        dists.forEach(({ index, dist }) => {
          const pB = pts[index];
          const op = (1 - dist / frameconf.network_connection_distance) * 0.25; // the opacity base of the connections
          const grad = ctx.createLinearGradient(pA.x, pA.y, pB.x, pB.y);
          grad.addColorStop(0, hslVarWithOpacity("--logo-blue-1", op));
          grad.addColorStop(0.5, hslVarWithOpacity("--light-2", op * 1.5));
          grad.addColorStop(1, hslVarWithOpacity("--light-alt", op));
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(pA.x, pA.y);
          ctx.lineTo(pB.x, pB.y);
          ctx.stroke();
        });
      }

      // Draw connections from particles to mouse cursor when hovering
      if (isHovering) {
        pts.forEach((p) => {
          const dx = p.x - mx;
          const dy = p.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < frameconf.mouse_connection_distance) {
            const op = (1 - dist / frameconf.mouse_connection_distance) * 0.4; // the base opacity for connection lines with the mouse
            const grad = ctx.createLinearGradient(p.x, p.y, mx, my);
            grad.addColorStop(0, hslVarWithOpacity("--light-alt", op));
            grad.addColorStop(1, hslVarWithOpacity("--light-1", op * 0.5));
            ctx.strokeStyle = grad;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mx, my);
            ctx.stroke();
          }
        });
      }
      id = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(id);
  }, [width, height, smoothX, smoothY, isHovering, frameconf]);
  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{ zIndex: 1 }}
    />
  );
}

const defaultFrameConfig: NetworkFrameConfig = {
  count: 22,
  particle_velocity: 0.15,
  min_particle_size: 1.5,
  max_particle_size: 1.5,
  mouse_connection_distance: 120, // both px unfortunately
  network_connection_distance: 150,
};

export default function NetworkCanvas({
  frameConfig,
  frameClasses,
  mouseGradientStart,
  mouseGradientEnd,
  children,
}: {
  className?: string;
  frameConfig?: Partial<NetworkFrameConfig>;
  frameClasses?: string;
  mouseGradientStart?: string;
  mouseGradientEnd?: string;
  children?: React.ReactNode;
}) {
  const conf = {
    // override with other values, if supplied
    ...defaultFrameConfig,
    ...frameConfig,
  };
  const [containerRef, inView] = useInView<HTMLDivElement>();
  // const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, [containerRef]);

  const [isHovering, setIsHovering] = useState(false);
  const [isClient, setIsClient] = useState(false); // Prevent SSR issues with canvas/animations
  const [particleConfigs, setParticleConfigs] = useState<ParticleConfig[]>([]);

  // Mouse position tracking with spring physics for smooth movement
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const smoothX = useSpring(mouseX, {
    damping: 50,
    stiffness: 100,
  });
  const smoothY = useSpring(mouseY, {
    damping: 50,
    stiffness: 100,
  });

  // Initialize particles on client-side only (prevents hydration mismatch)
  useEffect(() => {
    setIsClient(true);
    const particlecolours = [
      // could make this configurable, but probably doesn't matter
      hslVarWithOpacity("--light-1", 0.3),
      hslVarWithOpacity("--light-alt", 0.4),
      hslVarWithOpacity("--light-alt-2", 0.4),
    ];
    setParticleConfigs(
      Array.from({ length: conf.count }, () => ({
        baseX: Math.random() * 100,
        baseY: Math.random() * 100,
        size: conf.min_particle_size + Math.random() * conf.max_particle_size,
        delay: Math.random() * 4,
        duration: 3 + Math.random() * 3,
        color:
          particlecolours[Math.floor(Math.random() * particlecolours.length)],
      })),
    );
  }, [conf.count, conf.min_particle_size, conf.max_particle_size]);

  // TODO we're doing this every animation frame..?
  // Convert mouse coordinates to percentage for gradient positioning
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(((e.clientX - rect.left) / rect.width) * 100);
    mouseY.set(((e.clientY - rect.top) / rect.height) * 100);
    setIsHovering(true);
  };

  return (
    <div
      ref={containerRef}
      className="relative mt-auto overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Only render when we have valid dimensions */}
      {isClient && inView && dimensions.width > 0 && dimensions.height > 0 && (
        <>
          <MouseGradient
            smoothX={smoothX}
            smoothY={smoothY}
            isHovering={isHovering}
            mouseGradStart={mouseGradientStart || "light-alt"}
            mouseGradEnd={mouseGradientEnd || "light-2"}
          />
          <NetworkFrame
            width={dimensions.width}
            height={dimensions.height}
            smoothX={smoothX}
            smoothY={smoothY}
            isHovering={isHovering}
            frameconf={conf}
            className={frameClasses || "bg-secondary-foreground"}
          />
          <div
            className="pointer-events-none absolute inset-0 overflow-hidden"
            style={{ zIndex: 2 }}
          >
            {particleConfigs.map((cfg, i) => (
              <SimpleParticle
                key={`p-${i}`}
                {...cfg}
                smoothX={smoothX}
                smoothY={smoothY}
                isHovering={isHovering}
              />
            ))}
          </div>
        </>
      )}
      {children}
    </div>
  );
}

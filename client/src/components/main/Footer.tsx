"use client";
import {
  motion,
  MotionValue,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Code2, Gamepad2, Heart, Sparkles, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import FooterLinkList from "@/components/footer/FooterLinkList";
import SocialIconButton, {
  createSocialMotionColours,
} from "@/components/footer/SocialIconButton";
import {
  mainLinks,
  quickLinks,
  socialLinks,
  type SocialLink,
} from "@/data/footer-data";
import {
  DEFAULT_FOOTER_HEIGHT,
  DEFAULT_FOOTER_WIDTH,
  GRADIENT_CIRCLE_SIZE,
  GRADIENT_OPACITY_DEFAULT,
  GRADIENT_OPACITY_HOVERING,
  GRADIENT_TRANSITION_DURATION,
  MOUSE_CENTER_OFFSET,
  MOUSE_OFFSET_MULTIPLIER,
  MOTION_COLOUR_MOUSE_GRAD_END_ALPHA,
  MOTION_COLOUR_MOUSE_GRAD_START_ALPHA,
  NETWORK_CONNECTION_DISTANCE,
  NETWORK_CONNECTION_MAX_PER_PARTICLE,
  NETWORK_CONNECTION_OPACITY_BASE,
  NETWORK_CONNECTION_OPACITY_MULTIPLIER,
  NETWORK_LINE_WIDTH,
  NETWORK_MOUSE_CONNECTION_DISTANCE,
  NETWORK_MOUSE_CONNECTION_OPACITY_BASE,
  NETWORK_MOUSE_CONNECTION_OPACITY_MULTIPLIER,
  NETWORK_MOUSE_LINE_WIDTH,
  NETWORK_PARTICLE_SIZE_MAX,
  NETWORK_PARTICLE_SIZE_MIN,
  NETWORK_PARTICLE_VELOCITY_MULTIPLIER,
  PARTICLE_COLOUR_ALPHA_LIGHT_1,
  PARTICLE_COLOUR_ALPHA_LIGHT_2,
  PARTICLE_COLOUR_ALPHA_LIGHT_ALT,
  PARTICLE_COUNT,
  PARTICLE_DEFAULT_ALPHA,
  PARTICLE_DELAY_MAX,
  PARTICLE_DURATION_MAX,
  PARTICLE_DURATION_MIN,
  PARTICLE_SIZE_MAX,
  PARTICLE_SIZE_MIN,
  SPRING_DAMPING,
  SPRING_STIFFNESS,
} from "@/lib/footer-constants";
import { cssVarAsHSL } from "@/lib/utils";

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
  motionColours,
}: {
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
  isHovering: boolean;
  motionColours: {
    mouseGradStart: string;
    mouseGradEnd: string;
  };
}) {
  // Use Motion values for colors instead of hard-coded rgba
  const background = useMotionTemplate`radial-gradient(circle ${GRADIENT_CIRCLE_SIZE}px at ${smoothX}% ${smoothY}%, ${motionColours.mouseGradStart} 0%, ${motionColours.mouseGradEnd} 40%, transparent 70%)`;
  return (
    <motion.div
      className="absolute inset-0"
      style={{
        background,
        opacity: isHovering
          ? GRADIENT_OPACITY_HOVERING
          : GRADIENT_OPACITY_DEFAULT,
      }}
      transition={{ duration: GRADIENT_TRANSITION_DURATION }}
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
  color = cssVarAsHSL("--light-1", PARTICLE_DEFAULT_ALPHA),
}: ParticleConfig & {
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
  isHovering: boolean;
}) {
  // Particles react to mouse movement when hovering
  const offsetX = useTransform(smoothX, (mx) =>
    isHovering ? (mx - MOUSE_CENTER_OFFSET) * MOUSE_OFFSET_MULTIPLIER : 0,
  );
  const offsetY = useTransform(smoothY, (my) =>
    isHovering ? (my - MOUSE_CENTER_OFFSET) * MOUSE_OFFSET_MULTIPLIER : 0,
  );
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

// Canvas-based network visualization with particle connections
function NetworkCanvas({
  width,
  height,
  smoothX,
  smoothY,
  isHovering,
}: {
  width: number;
  height: number;
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
  isHovering: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<NetworkParticle[]>([]);
  const initializedRef = useRef(false);

  useEffect(() => {
    // Initialize particles only once to prevent regeneration on re-render
    if (!initializedRef.current) {
      particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * NETWORK_PARTICLE_VELOCITY_MULTIPLIER,
        vy: (Math.random() - 0.5) * NETWORK_PARTICLE_VELOCITY_MULTIPLIER,
        size:
          NETWORK_PARTICLE_SIZE_MIN + Math.random() * NETWORK_PARTICLE_SIZE_MAX,
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
          .filter((d) => d.dist < NETWORK_CONNECTION_DISTANCE)
          .sort((a, b) => a.dist - b.dist)
          .slice(0, NETWORK_CONNECTION_MAX_PER_PARTICLE);

        dists.forEach(({ index, dist }) => {
          const pB = pts[index];
          const op =
            (1 - dist / NETWORK_CONNECTION_DISTANCE) *
            NETWORK_CONNECTION_OPACITY_BASE;
          const grad = ctx.createLinearGradient(pA.x, pA.y, pB.x, pB.y);
          grad.addColorStop(0, cssVarAsHSL("--logo-blue-1", op));
          grad.addColorStop(
            0.5,
            cssVarAsHSL(
              "--light-2",
              op * NETWORK_CONNECTION_OPACITY_MULTIPLIER,
            ),
          );
          grad.addColorStop(1, cssVarAsHSL("--light-alt", op));
          ctx.strokeStyle = grad;
          ctx.lineWidth = NETWORK_LINE_WIDTH;
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
          if (dist < NETWORK_MOUSE_CONNECTION_DISTANCE) {
            const op =
              (1 - dist / NETWORK_MOUSE_CONNECTION_DISTANCE) *
              NETWORK_MOUSE_CONNECTION_OPACITY_BASE;
            const grad = ctx.createLinearGradient(p.x, p.y, mx, my);
            grad.addColorStop(0, cssVarAsHSL("--light-alt", op));
            grad.addColorStop(
              1,
              cssVarAsHSL(
                "--light-1",
                op * NETWORK_MOUSE_CONNECTION_OPACITY_MULTIPLIER,
              ),
            );
            ctx.strokeStyle = grad;
            ctx.lineWidth = NETWORK_MOUSE_LINE_WIDTH;
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
  }, [width, height, smoothX, smoothY, isHovering]);
  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="pointer-events-none absolute inset-0"
      style={{ zIndex: 1 }}
    />
  );
}

export default function Footer() {
  const footerRef = useRef<HTMLElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: DEFAULT_FOOTER_WIDTH,
    height: DEFAULT_FOOTER_HEIGHT,
  });
  const [isClient, setIsClient] = useState(false); // Prevent SSR issues with canvas/animations
  const [particleConfigs, setParticleConfigs] = useState<ParticleConfig[]>([]);

  // Mouse position tracking with spring physics for smooth movement
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const smoothX = useSpring(mouseX, {
    damping: SPRING_DAMPING,
    stiffness: SPRING_STIFFNESS,
  });
  const smoothY = useSpring(mouseY, {
    damping: SPRING_DAMPING,
    stiffness: SPRING_STIFFNESS,
  });
  const motionColoursRef = useRef<Record<string, string>>({});

  // Initialize particles on client-side only (prevents hydration mismatch)
  useEffect(() => {
    setIsClient(true);
    // British spelling: particlecolours
    const particlecolours = [
      cssVarAsHSL("--light-1", PARTICLE_COLOUR_ALPHA_LIGHT_1),
      cssVarAsHSL("--light-2", PARTICLE_COLOUR_ALPHA_LIGHT_2),
      cssVarAsHSL("--light-alt", PARTICLE_COLOUR_ALPHA_LIGHT_ALT),
    ];
    setParticleConfigs(
      Array.from({ length: PARTICLE_COUNT }, () => ({
        baseX: Math.random() * 100,
        baseY: Math.random() * 100,
        size: PARTICLE_SIZE_MIN + Math.random() * PARTICLE_SIZE_MAX,
        delay: Math.random() * PARTICLE_DELAY_MAX,
        duration: PARTICLE_DURATION_MIN + Math.random() * PARTICLE_DURATION_MAX,
        color:
          particlecolours[Math.floor(Math.random() * particlecolours.length)],
      })),
    );
    // Unfortunately, motion cannot animate named colours.
    // One readable solution is to construct a handful of constants on the client instead.
    motionColoursRef.current = {
      mouseGradStart: cssVarAsHSL(
        "--light-alt",
        MOTION_COLOUR_MOUSE_GRAD_START_ALPHA,
      ),
      mouseGradEnd: cssVarAsHSL(
        "--light-2",
        MOTION_COLOUR_MOUSE_GRAD_END_ALPHA,
      ),
      ...createSocialMotionColours(),
    };
  }, []);

  // Update canvas dimensions on window resize
  useEffect(() => {
    const update = () =>
      footerRef.current &&
      setDimensions({
        width: footerRef.current.offsetWidth,
        height: footerRef.current.offsetHeight,
      });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Convert mouse coordinates to percentage for gradient positioning
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(((e.clientX - rect.left) / rect.width) * 100);
    mouseY.set(((e.clientY - rect.top) / rect.height) * 100);
    setIsHovering(true);
  };

  return (
    <footer
      ref={footerRef}
      className="relative mt-auto w-full overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="absolute inset-0 bg-secondary-foreground" />
      <MouseGradient
        smoothX={smoothX}
        smoothY={smoothY}
        isHovering={isHovering}
        motionColours={{
          mouseGradStart: motionColoursRef.current.mouseGradStart,
          mouseGradEnd: motionColoursRef.current.mouseGradEnd,
        }}
      />
      {isClient && (
        <NetworkCanvas
          width={dimensions.width}
          height={dimensions.height}
          smoothX={smoothX}
          smoothY={smoothY}
          isHovering={isHovering}
        />
      )}
      {isClient && (
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
      )}
      <div className="relative z-10 border-t border-purple-500/20">
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-1">
              <div className="group flex items-center gap-4">
                <motion.div
                  className="relative flex-shrink-0"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Image
                    src="/navbar_arr.png"
                    alt="CFC Game Development Logo"
                    width={70}
                    height={94}
                    className="object-contain"
                    priority
                  />
                  <motion.div
                    className="absolute -bottom-1 -right-1"
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Sparkles className="h-4 w-4 text-yellow-400" />
                  </motion.div>
                </motion.div>
                <div>
                  <h3 className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-jersey10 text-4xl font-bold text-transparent text-white">
                    Game Development
                  </h3>
                  <p className="font-jersey10 text-lg text-gray-400">
                    Create • Play • Inspire
                  </p>
                </div>
              </div>
              <a
                href="mailto:UWAgamedev@gmail.com"
                className="block font-jersey10 text-xl text-gray-300 transition-colors hover:text-purple-400"
              >
                UWAgamedev@gmail.com
              </a>
              <p className="font-jersey10 text-xl leading-relaxed text-gray-300/80">
                Building the next generation of game developers at UWA game
                development club
              </p>
              <div className="flex gap-3 pt-2">
                {socialLinks.map((social: SocialLink, index: number) => (
                  <SocialIconButton
                    key={index}
                    url={social.url}
                    label={social.label}
                    motionColours={{
                      socialBGHov: motionColoursRef.current.socialBGHov,
                      socialBorderHov: motionColoursRef.current.socialBorderHov,
                    }}
                  />
                ))}
              </div>
            </div>
            <FooterLinkList
              title="Quick Links"
              titleIcon={<Zap className="h-4 w-4 text-accent" />}
              links={quickLinks}
              useChevron
            />
            <FooterLinkList
              title="Explore"
              titleIcon={<Code2 className="h-4 w-4 text-purple-400" />}
              links={mainLinks}
            />
          </div>
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-purple-500/20" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-slate-950/50 px-4">
                <Gamepad2 className="h-5 w-5 text-purple-400" />
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2 font-jersey10 text-xl text-gray-400">
              <span>© {new Date().getFullYear()} CFC Game Dev</span>
              <span className="text-purple-500">•</span>
              <span>All rights reserved</span>
            </div>
            <Link
              href="/constitution"
              className="group flex -translate-x-[52px] items-center gap-2.5 rounded-full border border-purple-500/20 bg-gradient-to-r from-purple-500/10 to-pink-500/10 px-4 py-2 transition-all duration-300 hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/20"
            >
              <span className="font-jersey10 text-xl text-gray-300 transition-colors group-hover:text-white">
                Constitution
              </span>
            </Link>
            <div className="flex items-center gap-2 font-jersey10 text-xl text-gray-400">
              <span>Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Heart className="h-4 w-4 fill-current text-red-500" />
              </motion.div>
              <span>in Perth, UWA</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

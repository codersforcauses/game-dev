"use client";
import {
  motion,
  MotionValue,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Calendar,
  ChevronRight,
  Code2,
  Gamepad2,
  Heart,
  Palette,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect,useRef, useState } from "react";
import { SocialIcon } from "react-social-icons";

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
}: {
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
  isHovering: boolean;
}) {
  const background = useMotionTemplate`radial-gradient(circle 600px at ${smoothX}% ${smoothY}%, rgba(139, 92, 246, 0.3) 0%, rgba(236, 72, 153, 0.12) 40%, transparent 70%)`;
  return (
    <motion.div
      className="absolute inset-0"
      style={{ background, opacity: isHovering ? 0.5 : 0.25 }}
      transition={{ duration: 0.5 }}
    />
  );
}

// should probably belong in src/utils
function cssVarAsHSL(cssvar: string, alpha?: number) {
  // client side only
  const col = window.getComputedStyle(document.body).getPropertyValue(cssvar);
  return alpha !== undefined ? `hsl(${col} / ${alpha})` : `hsl(${col})`;
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
  color = cssVarAsHSL("--light-1", 0.6),
}: ParticleConfig & {
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
  isHovering: boolean;
}) {
  // Particles react to mouse movement when hovering
  const offsetX = useTransform(smoothX, (mx) =>
    isHovering ? (mx - 50) * 0.3 : 0,
  );
  const offsetY = useTransform(smoothY, (my) =>
    isHovering ? (my - 50) * 0.3 : 0,
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
            // opacity: 0.7,
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
      particlesRef.current = Array.from({ length: 22 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        size: 1.5 + Math.random() * 1.5,
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
          .filter((d) => d.dist < 150)
          .sort((a, b) => a.dist - b.dist)
          .slice(0, 2);

        dists.forEach(({ index, dist }) => {
          // a little bit redundant as the lines aren't super prominent, can probably
          // just use white here
          const pB = pts[index];
          const op = (1 - dist / 150) * 0.25; // Opacity decreases with distance
          const grad = ctx.createLinearGradient(pA.x, pA.y, pB.x, pB.y);
          grad.addColorStop(0, cssVarAsHSL("--logo-blue-1", op));
          grad.addColorStop(0.5, cssVarAsHSL("--light-2", op * 1.5));
          grad.addColorStop(1, cssVarAsHSL("--light-alt", op));
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
          if (dist < 120) {
            const op = (1 - dist / 120) * 0.4;
            const grad = ctx.createLinearGradient(p.x, p.y, mx, my);
            grad.addColorStop(0, cssVarAsHSL("--light-alt", op));
            grad.addColorStop(1, cssVarAsHSL("--light-1", op * 0.5));
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
  const [isHovered, setIsHovered] = useState<string | null>(null); // Track which link is hovered for underline effect
  const [isHovering, setIsHovering] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 1920, height: 400 });
  const [isClient, setIsClient] = useState(false); // Prevent SSR issues with canvas/animations
  const [particleConfigs, setParticleConfigs] = useState<ParticleConfig[]>([]);

  // Mouse position tracking with spring physics for smooth movement
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 100 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 100 });
  const motionColoursRef = useRef<Record<string, string>>({});
  // Initialize particles on client-side only (prevents hydration mismatch)
  useEffect(() => {
    setIsClient(true);
    const particlecolors = [
      cssVarAsHSL("--light-1", 0.5),
      cssVarAsHSL("--light-2", 0.4),
      cssVarAsHSL("--light-alt", 0.4),
      // cssVarAsHSL("--logo-blue-2", 0.4),
    ];
    setParticleConfigs(
      Array.from({ length: 22 }, () => ({
        baseX: Math.random() * 100,
        baseY: Math.random() * 100,
        size: 2 + Math.random() * 3,
        delay: Math.random() * 4,
        duration: 3 + Math.random() * 3,
        color:
          particlecolors[Math.floor(Math.random() * particlecolors.length)],
      })),
    );
    // unfortunatly, motion cannot animate named colours.
    // one readable solution is to construct a handful of constants on the client instead.
    motionColoursRef.current = {
      mouseGradStart: cssVarAsHSL("--light-alt", 0.3),
      mouseGradEnd: cssVarAsHSL("--light-2", 0.3),
      // radial-gradient(at 20% 30%, hsl(--light-2 / 0.3) 0px, transparent 50%),
      // radial-gradient(at 80% 70%, hsl(--light-alt / 0.3) 0px, transparent 50%),
      // radial-gradient(at 50% 50%, hsl(--logo-blue-1 / 0.2) 0px, transparent 50%)`,
      socialBGHov: cssVarAsHSL("--light-1", 0.1),
      socialBorderHov: cssVarAsHSL("--light-alt", 0.5),
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
  // ideally this should pull from some source of information with the nav, but
  // it's not that big of a deal
  const mainLinks = [
    { label: "Home", href: "/", icon: <Zap className="h-4 w-4" /> },
    { label: "About Us", href: "/about", icon: <Users className="h-4 w-4" /> },
    {
      label: "Events",
      href: "/events",
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      label: "Games Showcase",
      href: "/games",
      icon: <Gamepad2 className="h-4 w-4" />,
    },
    {
      label: "Artwork",
      href: "/artwork",
      icon: <Palette className="h-4 w-4" />,
    },
  ];

  // these should be stored elsewhere... like in a data directory so
  // they can be easily changed
  const socialLinks = [
    // we can easily infer the domain
    { url: "https://discord.com", label: "Discord" },
    { url: "https://twitter.com", label: "X (Twitter)" },
    { url: "https://github.com", label: "GitHub" },
    { url: "https://youtube.com", label: "YouTube" },
  ];
  const quickLinks = [
    { label: "Join the Club", href: "#" },
    { label: "Submit Your Game", href: "#" },
    { label: "Upcoming Jams", href: "#" },
    { label: "Resources", href: "#" },
  ];
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
              {/* UPDATED: Logo now blends directly with background - no box container */}
              <div className="group flex items-center gap-4">
                <motion.div
                  className="relative flex-shrink-0"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {/* Arrow logo - transparent PNG, no background box */}
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
                {socialLinks.map((social, index) => (
                  <motion.div
                    key={index}
                    className={`--light-1 group rounded-xl border border-white/10 bg-white/5 p-2.5`}
                    aria-label={social.label}
                    whileHover={{
                      scale: 1.1,
                      y: -4,
                      backgroundColor: motionColoursRef.current.socialBGHov,
                      borderColor: motionColoursRef.current.socialBorderHov,
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <motion.span
                      whileHover={{ rotate: 12 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                    >
                      <SocialIcon url={social.url} className="h-5 w-5" />
                    </motion.span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="space-y-3 lg:col-span-1">
              <h4 className="flex items-center gap-2 font-jersey10 text-xl font-semibold uppercase tracking-wider text-white">
                <Zap className="h-4 w-4 text-accent" />
                Quick Links
              </h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-2 font-jersey10 text-xl text-gray-400 transition-all duration-300 hover:text-purple-400"
                      onMouseEnter={() => setIsHovered(link.label)}
                      onMouseLeave={() => setIsHovered(null)}
                    >
                      <ChevronRight
                        className={`h-3 w-3 transition-transform duration-300 ${isHovered === link.label ? "translate-x-1" : ""}`}
                      />
                      <span className="relative">
                        {link.label}
                        {isHovered === link.label && (
                          <span className="absolute inset-x-0 -bottom-0.5 h-px bg-gradient-to-r from-purple-400 to-pink-400" />
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-3 lg:col-span-1">
              <h4 className="flex items-center gap-2 font-jersey10 text-xl font-semibold uppercase tracking-wider text-white">
                <Code2 className="h-4 w-4 text-purple-400" />
                Explore
              </h4>
              <ul className="space-y-2">
                {mainLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-2 font-jersey10 text-xl text-gray-400 transition-all duration-300 hover:text-purple-400"
                    >
                      <span className="text-purple-500/50 transition-transform duration-300 group-hover:scale-110 group-hover:text-purple-400">
                        {link.icon}
                      </span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-purple-500/20" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-slate-950/50 px-4">
                <Gamepad2 className="h-5 w-5 animate-pulse text-purple-400" />
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

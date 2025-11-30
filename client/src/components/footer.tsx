"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate, MotionValue } from "framer-motion";
import { Gamepad2, Sparkles, Code2, Palette, Calendar, Users, ChevronRight, Heart, Zap } from "lucide-react";

// Type definitions for particle system
type ParticleConfig = { baseX: number; baseY: number; size: number; delay: number; duration: number; color?: string };
type NetworkParticle = { x: number; y: number; vx: number; vy: number; size: number };

// Gradient that follows mouse cursor position for interactive effect
function MouseGradient({ smoothX, smoothY, isHovering }: { smoothX: MotionValue<number>; smoothY: MotionValue<number>; isHovering: boolean }) {
  const background = useMotionTemplate`radial-gradient(circle 600px at ${smoothX}% ${smoothY}%, rgba(139, 92, 246, 0.3) 0%, rgba(236, 72, 153, 0.12) 40%, transparent 70%)`;
  return <motion.div className="absolute inset-0" style={{ background, opacity: isHovering ? 0.5 : 0.25 }} transition={{ duration: 0.5 }} />;
}

// Individual particle component with pulsing animation and mouse interaction
function SimpleParticle({ baseX, baseY, size, delay, duration, smoothX, smoothY, isHovering, color = "rgba(255, 255, 255, 0.6)" }: ParticleConfig & { smoothX: MotionValue<number>; smoothY: MotionValue<number>; isHovering: boolean }) {
  // Particles react to mouse movement when hovering
  const offsetX = useTransform(smoothX, (mx) => isHovering ? (mx - 50) * 0.3 : 0);
  const offsetY = useTransform(smoothY, (my) => isHovering ? (my - 50) * 0.3 : 0);
  return <motion.div className="absolute pointer-events-none" style={{ left: `${baseX}%`, top: `${baseY}%`, x: offsetX, y: offsetY }}>
    <motion.div animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.9, 1.1, 0.9] }} transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}>
      <div style={{ width: size, height: size, borderRadius: "50%", backgroundColor: color, opacity: 0.7 }} />
    </motion.div>
  </motion.div>;
}

// Canvas-based network visualization with particle connections
function NetworkCanvas({ width, height, smoothX, smoothY, isHovering }: { width: number; height: number; smoothX: MotionValue<number>; smoothY: MotionValue<number>; isHovering: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<NetworkParticle[]>([]);
  const initializedRef = useRef(false);
  
  useEffect(() => {
    // Initialize particles only once to prevent regeneration on re-render
    if (!initializedRef.current) {
      particlesRef.current = Array.from({ length: 22 }, () => ({ x: Math.random() * width, y: Math.random() * height, vx: (Math.random() - 0.5) * 0.15, vy: (Math.random() - 0.5) * 0.15, size: 1.5 + Math.random() * 1.5 }));
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
        const dists = pts.slice(i + 1).map((pB, j) => {
          const dx = pA.x - pB.x;
          const dy = pA.y - pB.y;
          return { index: i + j + 1, dist: Math.sqrt(dx * dx + dy * dy) };
        }).filter(d => d.dist < 150).sort((a, b) => a.dist - b.dist).slice(0, 2);
        
        dists.forEach(({ index, dist }) => {
          const pB = pts[index];
          const op = (1 - dist / 150) * 0.25; // Opacity decreases with distance
          const grad = ctx.createLinearGradient(pA.x, pA.y, pB.x, pB.y);
          grad.addColorStop(0, `rgba(139, 92, 246, ${op})`);
          grad.addColorStop(0.5, `rgba(196, 181, 253, ${op * 1.5})`);
          grad.addColorStop(1, `rgba(236, 72, 153, ${op})`);
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
            grad.addColorStop(0, `rgba(236, 72, 153, ${op})`);
            grad.addColorStop(1, `rgba(255, 255, 255, ${op * 0.5})`);
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
  return <canvas ref={canvasRef} width={width} height={height} className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }} />;
}

export function Footer() {
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

  // Initialize particles on client-side only (prevents hydration mismatch)
  useEffect(() => {
    setIsClient(true);
    const colors = ["rgba(255, 255, 255, 0.5)", "rgba(196, 181, 253, 0.4)", "rgba(168, 85, 247, 0.4)", "rgba(236, 72, 153, 0.4)"];
    setParticleConfigs(Array.from({ length: 22 }, () => ({ baseX: Math.random() * 100, baseY: Math.random() * 100, size: 2 + Math.random() * 3, delay: Math.random() * 4, duration: 3 + Math.random() * 3, color: colors[Math.floor(Math.random() * colors.length)] })));
  }, []);

  // Update canvas dimensions on window resize
  useEffect(() => {
    const update = () => footerRef.current && setDimensions({ width: footerRef.current.offsetWidth, height: footerRef.current.offsetHeight });
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Convert mouse coordinates to percentage for gradient positioning
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(((e.clientX - rect.left) / rect.width) * 100);
    mouseY.set(((e.clientY - rect.top) / rect.height) * 100);
    setIsHovering(true);
  };

  const mainLinks = [{ label: "Home", href: "/", icon: <Zap className="w-4 h-4" /> }, { label: "About Us", href: "/about", icon: <Users className="w-4 h-4" /> }, { label: "Events", href: "/events", icon: <Calendar className="w-4 h-4" /> }, { label: "Games Showcase", href: "/games", icon: <Gamepad2 className="w-4 h-4" /> }, { label: "Artwork", href: "/artwork", icon: <Palette className="w-4 h-4" /> }];
  const socialLinks = [
    { icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/></svg>, href: "#", label: "Discord", color: "hover:text-[#5865F2]" },
    { icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>, href: "#", label: "X (Twitter)", color: "hover:text-white" },
    { icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>, href: "#", label: "GitHub", color: "hover:text-white" },
    { icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>, href: "#", label: "YouTube", color: "hover:text-[#FF0000]" },
  ];
  const quickLinks = [{ label: "Join the Club", href: "#" }, { label: "Submit Your Game", href: "#" }, { label: "Upcoming Jams", href: "#" }, { label: "Resources", href: "#" }];

  return <footer ref={footerRef} className="relative w-full mt-auto overflow-hidden" onMouseMove={handleMouseMove} onMouseLeave={() => setIsHovering(false)}>
    <div
      className="absolute inset-0"
      style={{ background: "hsl(235 47% 20%)" }}
    />
    <MouseGradient smoothX={smoothX} smoothY={smoothY} isHovering={isHovering} />
    <div className="absolute inset-0 opacity-20" style={{ background: `radial-gradient(at 20% 30%, rgba(139, 92, 246, 0.3) 0px, transparent 50%), radial-gradient(at 80% 70%, rgba(236, 72, 153, 0.3) 0px, transparent 50%), radial-gradient(at 50% 50%, rgba(168, 85, 247, 0.2) 0px, transparent 50%)` }} />
    {isClient && <NetworkCanvas width={dimensions.width} height={dimensions.height} smoothX={smoothX} smoothY={smoothY} isHovering={isHovering} />}
    {isClient && <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 2 }}>{particleConfigs.map((cfg, i) => <SimpleParticle key={`p-${i}`} {...cfg} smoothX={smoothX} smoothY={smoothY} isHovering={isHovering} />)}</div>}
    <div className="relative z-10 border-t border-purple-500/20">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-1 space-y-4">
            {/* UPDATED: Logo now blends directly with background - no box container */}
            <div className="flex items-center gap-4 group">
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
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                </motion.div>
              </motion.div>
              <div>
                <h3 className="text-4xl font-bold font-jersey10 text-white bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Game Development</h3>
                <p className="text-lg font-jersey10 text-gray-400">Create • Play • Inspire</p>
              </div>
            </div>
            <a href="mailto:UWAgamedev@gmail.com" className="text-xl font-jersey10 text-gray-300 hover:text-purple-400 transition-colors block">
              UWAgamedev@gmail.com
            </a>
            <p className="text-xl font-jersey10 text-gray-300/80 leading-relaxed">Building the next generation of game developers at UWA game development club</p>
            <div className="flex gap-3 pt-2">{socialLinks.map((social, index) => <motion.a key={index} href={social.href} className={`p-2.5 rounded-xl bg-white/5 border border-white/10 ${social.color} group`} aria-label={social.label} whileHover={{ scale: 1.1, y: -4, backgroundColor: "rgba(255, 255, 255, 0.1)", borderColor: "rgba(139, 92, 246, 0.5)" }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}><motion.span whileHover={{ rotate: 12 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>{social.icon}</motion.span></motion.a>)}</div>
          </div>
          <div className="lg:col-span-1 space-y-3">
            <h4 className="text-xl font-semibold font-jersey10 text-white uppercase tracking-wider flex items-center gap-2"><Zap className="w-4 h-4 text-purple-400" />Quick Links</h4>
            <ul className="space-y-2">{quickLinks.map((link) => <li key={link.label}><Link href={link.href} className="text-gray-400 text-xl font-jersey10 hover:text-purple-400 transition-all duration-300 flex items-center gap-2 group" onMouseEnter={() => setIsHovered(link.label)} onMouseLeave={() => setIsHovered(null)}><ChevronRight className={`w-3 h-3 transition-transform duration-300 ${isHovered === link.label ? 'translate-x-1' : ''}`} /><span className="relative">{link.label}{isHovered === link.label && <span className="absolute inset-x-0 -bottom-0.5 h-px bg-gradient-to-r from-purple-400 to-pink-400" />}</span></Link></li>)}</ul>
          </div>
          <div className="lg:col-span-1 space-y-3">
            <h4 className="text-xl font-semibold font-jersey10 text-white uppercase tracking-wider flex items-center gap-2"><Code2 className="w-4 h-4 text-purple-400" />Explore</h4>
            <ul className="space-y-2">{mainLinks.map((link) => <li key={link.label}><Link href={link.href} className="text-gray-400 text-xl font-jersey10 hover:text-purple-400 transition-all duration-300 flex items-center gap-2 group"><span className="transition-transform duration-300 group-hover:scale-110 text-purple-500/50 group-hover:text-purple-400">{link.icon}</span>{link.label}</Link></li>)}</ul>
          </div>
        </div>
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-purple-500/20" /></div>
          <div className="relative flex justify-center"><span className="px-4 bg-slate-950/50"><Gamepad2 className="w-5 h-5 text-purple-400 animate-pulse" /></span></div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xl font-jersey10 text-gray-400"><span>© {new Date().getFullYear()} CFC Game Dev</span><span className="text-purple-500">•</span><span>All rights reserved</span></div>
          <Link
            href="/constitution"
            className="group flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 -translate-x-[52px]"
          >
            <span className="text-xl font-jersey10 text-gray-300 group-hover:text-white transition-colors">Constitution</span>
            <div className="relative w-8 h-8 rounded-full overflow-hidden shadow-lg group-hover:scale-110 transition-transform duration-300">
              <div className="absolute inset-0 bg-gradient-to-b from-orange-400 via-pink-400 to-purple-400" />
              <div className="absolute top-1 right-1"><div className="w-2.5 h-2.5 bg-yellow-300 rounded-full shadow-[0_0_10px_rgba(250,240,137,0.8)]" /></div>
              <div className="absolute top-2 left-1 w-2 h-1 bg-white/30 rounded-full" />
              <div className="absolute top-3 right-2 w-1.5 h-0.5 bg-white/20 rounded-full" />
              <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-b from-blue-400 to-blue-500" />
              <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-5 h-3 bg-gradient-to-b from-green-500 to-green-600 rounded-full shadow-sm" />
              <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2">
                <div className="w-0.5 h-3 bg-gradient-to-b from-amber-600 to-amber-700" />
                <div className="absolute -top-1 left-1/2 -translate-x-1/2">
                  <div className="w-3 h-2 bg-gradient-to-b from-green-400 to-green-500 rounded-full" />
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-1 bg-green-400 rounded-full rotate-12" />
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-1 bg-green-400 rounded-full -rotate-12" />
                </div>
              </div>
              <div className="absolute top-1.5 left-2 text-[6px] text-gray-700">v</div>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </Link>
          <div className="flex items-center gap-2 text-xl font-jersey10 text-gray-400"><span>Made with</span><motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}><Heart className="w-4 h-4 text-red-500 fill-current" /></motion.div><span>in Perth, UWA</span></div>
        </div>
      </div>
    </div>
  </footer>;
}
"use client";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Gamepad2,
  Handshake,
  Heart,
  Home,
  Link as LucideLink,
  Map,
  Palette,
  Pencil,
  Sparkles,
  Upload,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { useRef } from "react";

import LinksList from "@/components/ui/LinksList";
import NetworkCanvas from "@/components/ui/NetworkCanvas";
import SocialIconButton from "@/components/ui/SocialIconButton";
import { social_media } from "@/gamedev-metadata.json";

export interface ListLink {
  label: string;
  href: string;
  icon: ReactNode;
}

const quickLinks: ListLink[] = [
  {
    label: "Join the Club",
    href: "#",
    icon: <Handshake className="h-4 w-4" />,
  },
  {
    label: "Submit Your Game",
    href: "#",
    icon: <Upload className="h-4 w-4" />,
  },
  { label: "Upcoming Jams", href: "#", icon: <Clock className="h-4 w-4" /> },
  { label: "Resources", href: "#", icon: <Pencil className="h-4 w-4" /> },
];

// Main navigation links (ideally should be shared with Navbar)
export const mainLinks: ListLink[] = [
  { label: "Home", href: "/", icon: <Home className="h-4 w-4" /> },
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

export default function Footer() {
  const footerRef = useRef<HTMLElement | null>(null);
  return (
    <footer ref={footerRef}>
      <NetworkCanvas
        className="h-full w-full"
        frameClasses="bg-gradient-to-r from-secondary/25 to-secondary-foreground/25"
      >
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
                  {Object.entries(social_media).map(
                    ([platform, data], index) => (
                      <SocialIconButton
                        key={index}
                        url={data.url}
                        socialMediaName={platform}
                      />
                    ),
                  )}
                </div>
              </div>
              <LinksList
                title="Quick Links"
                titleIcon={<LucideLink className="h-4 w-4 text-accent" />}
                links={quickLinks}
              />
              <LinksList
                title="Explore"
                titleIcon={<Map className="h-4 w-4 text-purple-400" />}
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
                href=""
                className="group flex -translate-x-[52px] items-center gap-2.5 rounded-full border border-purple-500/20 bg-gradient-to-r from-purple-500/10 to-pink-500/10 px-4 py-2 transition-all duration-300 hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/20"
                onClick={() => window.open("/Constitution-V1.pdf")}
              >
                <span className="font-jersey10 text-xl text-gray-300 transition-colors group-hover:text-white">
                  Constitution
                </span>
              </Link>
              <div className="flex items-center gap-2 font-jersey10 text-xl text-gray-400">
                Made with
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Heart className="h-4 w-4 fill-current text-red-500" />
                </motion.div>
                in Perth, UWA
              </div>
            </div>
          </div>
        </div>
      </NetworkCanvas>
    </footer>
  );
}

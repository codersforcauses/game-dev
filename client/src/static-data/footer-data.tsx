import { Calendar, Code2, Gamepad2, Palette, Users, Zap } from "lucide-react";
import type { ReactNode } from "react";

/**
 * Footer navigation and social link data
 * These can be easily updated without modifying component code
 */

export interface MainLink {
  label: string;
  href: string;
  icon: ReactNode;
}

export interface SocialLink {
  url: string;
  label: string;
}

export interface QuickLink {
  label: string;
  href: string;
}

// Main navigation links (ideally should be shared with Navbar)
export const mainLinks: MainLink[] = [
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

// Social media links - easily updatable list
export const socialLinks: SocialLink[] = [
  { url: "https://discord.com", label: "Discord" },
  { url: "https://twitter.com", label: "X (Twitter)" },
  { url: "https://github.com", label: "GitHub" },
  { url: "https://youtube.com", label: "YouTube" },
];

// Quick action links
export const quickLinks: QuickLink[] = [
  { label: "Join the Club", href: "#" },
  { label: "Submit Your Game", href: "#" },
  { label: "Upcoming Jams", href: "#" },
  { label: "Resources", href: "#" },
];

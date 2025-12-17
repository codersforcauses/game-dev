"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { useState } from "react";

interface FooterLink {
  label: string;
  href: string;
  icon?: ReactNode;
}

interface LinksListProps {
  title: string;
  titleIcon: ReactNode;
  links: FooterLink[];
  useChevron?: boolean; // If true, uses ChevronRight; if false, uses icon from link
}

/**
 * Reusable footer link list component
 * Supports both icon-based links (mainLinks) and chevron-based links (quickLinks)
 * Provides consistent hover states and styling
 */
export default function LinksList({
  title,
  titleIcon,
  links,
  useChevron = false,
}: LinksListProps) {
  const [isHovered, setIsHovered] = useState<string | null>(null);

  return (
    <div className="space-y-3 lg:col-span-1">
      <h4 className="flex items-center gap-2 font-jersey10 text-xl font-semibold uppercase tracking-wider text-white">
        {titleIcon}
        {title}
      </h4>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="group flex items-center gap-2 font-jersey10 text-xl text-gray-400 decoration-2 underline-offset-4 transition-all duration-300 hover:text-purple-400 hover:underline"
              onMouseEnter={() => setIsHovered(link.label)}
              onMouseLeave={() => setIsHovered(null)}
            >
              {useChevron ? (
                <>
                  <ChevronRight
                    className={`h-3 w-3 transition-transform duration-300 ${
                      isHovered === link.label ? "translate-x-1" : ""
                    }`}
                  />
                  <span className="relative">
                    {link.label}
                    {isHovered === link.label && (
                      <span className="absolute inset-x-0 -bottom-0.5 h-px bg-gradient-to-r from-purple-400 to-pink-400" />
                    )}
                  </span>
                </>
              ) : (
                <>
                  <span className="text-purple-500/50 transition-transform duration-300 group-hover:scale-110 group-hover:text-purple-400">
                    {link.icon}
                  </span>
                  {link.label}
                </>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

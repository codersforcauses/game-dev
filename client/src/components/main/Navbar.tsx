"use client";

import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/events", label: "Events" },
    { href: "/games", label: "Game Showcase" },
    { href: "/artwork", label: "Art Showcase" },
  ];

  return (
    <>
      <header className="border-border/20 border-b-primary bg-landing-card font-jersey10 sticky top-0 z-50 flex h-24 w-full items-center border-b-2 px-20">
        <div className="flex flex-1 items-center">
          <Link href="/" className="flex items-center gap-3 text-2xl lg:mr-5">
            <Image
              src="/game_dev_club_logo.svg"
              alt="logo"
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span className="sr-only">Game Development UWA</span>
            <span aria-hidden="true" className="whitespace-nowrap md:hidden">
              GDUWA
            </span>
            <span
              aria-hidden="true"
              className="hidden whitespace-nowrap md:inline"
            >
              Game Development UWA _
            </span>
          </Link>
          <nav className="ml-auto hidden gap-8 text-xl lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-foreground/90 hover:text-primary whitespace-nowrap transition-colors duration-150"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center lg:hidden">
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-center p-2"
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6" />
            </button>

            {isDropdownOpen && (
              <div className="border-border/20 bg-popover absolute top-full right-0 z-50 mt-2 w-52 flex-col rounded border">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => {
                      setIsDropdownOpen(false);
                    }}
                    className="hover:bg-accent block px-4 py-3 text-lg whitespace-nowrap transition-colors duration-150"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

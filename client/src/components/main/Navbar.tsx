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
      <header className="fixed left-0 top-0 z-50 w-full border-b border-border/20 bg-[#090A19] font-jersey10">
        <div className="mx-auto max-w-[1440px] rounded-[5px] px-20">
          <div className="flex h-[104px] items-center justify-between">
            <Link
              href="/"
              className="flex flex-none items-center gap-3 text-2xl"
            >
              <Image
                src="/logo.svg"
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
                Game Development UWA
              </span>
            </Link>

            <nav className="ml-auto hidden flex-none gap-10 text-xl md:flex">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="whitespace-nowrap text-foreground/90 transition-colors duration-150 hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="ml-auto flex items-center">
              <div className="relative md:hidden">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center justify-center p-2"
                  aria-label="Toggle menu"
                >
                  <Menu className="h-6 w-6" />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 top-full z-50 mt-2 w-52 flex-col rounded border border-border/20 bg-popover">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsDropdownOpen(false)}
                        className="block whitespace-nowrap px-4 py-3 text-lg transition-colors duration-150 hover:bg-white/10"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div aria-hidden="true" className="h-[104px] w-full"></div>
    </>
  );
}

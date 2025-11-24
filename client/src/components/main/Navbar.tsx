"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
                src="/navbar_arr.svg"
                alt="logo"
                width={24}
                height={24}
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

            <nav className="ml-auto hidden flex-none gap-10 text-xl md:flex">
              <Link
                className="whitespace-nowrap text-foreground/90 transition-colors duration-150 hover:text-primary"
                href="/"
              >
                Home
              </Link>

              <Link
                className="whitespace-nowrap text-foreground/90 transition-colors duration-150 hover:text-primary"
                href="/about"
              >
                About Us
              </Link>

              <Link
                className="whitespace-nowrap text-foreground/90 transition-colors duration-150 hover:text-primary"
                href="/events"
              >
                Events
              </Link>

              <Link
                className="whitespace-nowrap text-foreground/90 transition-colors duration-150 hover:text-primary"
                href="/games"
              >
                Game Showcase
              </Link>

              <Link
                className="whitespace-nowrap text-foreground/90 transition-colors duration-150 hover:text-primary"
                href="/artwork"
              >
                Art Showcase
              </Link>
            </nav>

            <div className="ml-auto flex items-center">
              <div className="relative md:hidden">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center justify-center p-2"
                  aria-label="Toggle menu"
                >
                  <Image
                    src="/navbar_dropdown_icon.svg"
                    alt="menu"
                    width={24}
                    height={24}
                    className="h-6 w-6"
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 top-full z-50 mt-2 w-52 flex-col rounded border border-border/20 bg-popover">
                    <Link
                      className="block whitespace-nowrap px-4 py-3 text-lg transition-colors duration-150 hover:bg-white/10"
                      href="/"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Home
                    </Link>

                    <Link
                      className="block whitespace-nowrap px-4 py-3 text-lg transition-colors duration-150 hover:bg-white/10"
                      href="/about"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      About Us
                    </Link>

                    <Link
                      className="block whitespace-nowrap px-4 py-3 text-lg transition-colors duration-150 hover:bg-white/10"
                      href="/events"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Events
                    </Link>

                    <Link
                      className="block whitespace-nowrap px-4 py-3 text-lg transition-colors duration-150 hover:bg-white/10"
                      href=""
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Game Showcase
                    </Link>

                    <Link
                      className="block whitespace-nowrap px-4 py-3 text-lg transition-colors duration-150 hover:bg-white/10"
                      href=""
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Art Showcase
                    </Link>
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

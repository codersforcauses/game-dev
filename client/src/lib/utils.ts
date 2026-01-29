import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Converts a CSS variable to HSL format with optional alpha channel
 * Client-side only function - requires window object
 * @param cssvar - CSS variable name (e.g., "--light-1")
 * @param alpha - Optional alpha value (0-1)
 * @returns HSL color string (e.g., "hsl(0 0% 100% / 0.6)")
 */
export function cssVarAsHSL(cssvar: string, alpha?: number): string {
  // Client side only
  if (typeof window === "undefined") {
    return "";
  }
  const col = window.getComputedStyle(document.body).getPropertyValue(cssvar);
  return alpha !== undefined ? `hsl(${col} / ${alpha})` : `hsl(${col})`;
}

// avoid fetching the computed style of a css property more than once
const cssVarCache = new Map<string, string>();
function getCssVar(cssVar: string) {
  if (!cssVarCache.has(cssVar)) {
    cssVarCache.set(
      cssVar,
      window.getComputedStyle(document.body).getPropertyValue(cssVar),
    );
  }
  return cssVarCache.get(cssVar)!;
}

export function hslVarWithOpacity(cssVar: string, opacity: number) {
  const col = getCssVar(cssVar);
  // For CSS vars that already contain hsl() values
  // painfully, we must resolve the value of this color elsewhere
  return `color-mix(in hsl, ${col} ${opacity * 100}%, transparent)`;
}

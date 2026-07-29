"use client";
import { motion } from "framer-motion";
import { SocialIcon } from "react-social-icons";

import { cssVarAsHSL } from "@/lib/utils";

export type SocialMedia = {
  url: string;
  altText?: string;
};

/**
 * Reusable social media icon button component
 * Handles hover animations and styling with Motion values for colors
 */
export default function SocialIconButton({ url, altText }: SocialMedia) {
  return (
    <motion.div
      className="group rounded-xl border border-white/10 bg-white/5 p-2.5"
      whileHover={{
        scale: 1.1,
        y: -4,
        backgroundColor: "var(--color-light-alt)",
        borderColor: cssVarAsHSL("--color-light-alt", 0.5),
      }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: "tween",
        stiffness: 400,
        damping: 17,
      }}
    >
      <motion.span
        whileHover={{ rotate: 12 }}
        transition={{
          type: "tween",
          stiffness: 400,
          damping: 17,
        }}
      >
        <SocialIcon url={url} label={altText} className="h-5 w-5" />
      </motion.span>
    </motion.div>
  );
}

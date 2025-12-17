"use client";

import { motion } from "framer-motion";
import { SocialIcon } from "react-social-icons";

import { cssVarAsHSL } from "@/lib/utils";

// this way, we can use the fields from the social media
// table directly, in several other places throughout the site
export type SocialMedia = {
  url: string;
  socialMediaName: string;
  username?: string;
  // modify this type to support optional modification to the
  // social media icons, like a one-size-fits-all styling property
  // specifically for react-icons
  // for now, lets keep it simple
};

/**
 * Reusable social media icon button component
 * Handles hover animations and styling with Motion values for colors
 */
export default function SocialIconButton({
  url,
  socialMediaName,
  // username, // potentially so we can have alt text like username@socialmedia.com
}: SocialMedia) {
  return (
    <motion.div
      className="group rounded-xl border border-white/10 bg-white/5 p-2.5"
      aria-label={socialMediaName}
      whileHover={{
        scale: 1.1,
        y: -4,
        backgroundColor: cssVarAsHSL("--light-1", 0.1),
        borderColor: cssVarAsHSL("--light-alt", 0.5),
      }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17,
      }}
    >
      <motion.span
        whileHover={{ rotate: 12 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 17,
        }}
      >
        <SocialIcon url={url} className="h-5 w-5" />
      </motion.span>
    </motion.div>
  );
}

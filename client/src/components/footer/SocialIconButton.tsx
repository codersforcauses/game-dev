"use client";

import { motion } from "framer-motion";
import { SocialIcon } from "react-social-icons";

import {
  MOTION_COLOUR_SOCIAL_BG_HOV_ALPHA,
  MOTION_COLOUR_SOCIAL_BORDER_HOV_ALPHA,
  SOCIAL_ICON_HOVER_SCALE,
  SOCIAL_ICON_HOVER_Y,
  SOCIAL_ICON_ROTATE_DEGREES,
  SOCIAL_ICON_SPRING_DAMPING,
  SOCIAL_ICON_SPRING_STIFFNESS,
  SOCIAL_ICON_TAP_SCALE,
} from "@/lib/footer-constants";
import { cssVarAsHSL } from "@/lib/utils";

interface SocialIconButtonProps {
  url: string;
  label: string;
  motionColours: {
    socialBGHov: string;
    socialBorderHov: string;
  };
}

/**
 * Reusable social media icon button component
 * Handles hover animations and styling with Motion values for colors
 */
export default function SocialIconButton({
  url,
  label,
  motionColours,
}: SocialIconButtonProps) {
  return (
    <motion.div
      className="group rounded-xl border border-white/10 bg-white/5 p-2.5"
      aria-label={label}
      whileHover={{
        scale: SOCIAL_ICON_HOVER_SCALE,
        y: SOCIAL_ICON_HOVER_Y,
        backgroundColor: motionColours.socialBGHov,
        borderColor: motionColours.socialBorderHov,
      }}
      whileTap={{ scale: SOCIAL_ICON_TAP_SCALE }}
      transition={{
        type: "spring",
        stiffness: SOCIAL_ICON_SPRING_STIFFNESS,
        damping: SOCIAL_ICON_SPRING_DAMPING,
      }}
    >
      <motion.span
        whileHover={{ rotate: SOCIAL_ICON_ROTATE_DEGREES }}
        transition={{
          type: "spring",
          stiffness: SOCIAL_ICON_SPRING_STIFFNESS,
          damping: SOCIAL_ICON_SPRING_DAMPING,
        }}
      >
        <SocialIcon url={url} className="h-5 w-5" />
      </motion.span>
    </motion.div>
  );
}

/**
 * Helper function to create motion colours for social icons
 * This ensures colors use Motion values instead of hard-coded rgba
 */
export function createSocialMotionColours() {
  return {
    socialBGHov: cssVarAsHSL("--light-1", MOTION_COLOUR_SOCIAL_BG_HOV_ALPHA),
    socialBorderHov: cssVarAsHSL(
      "--light-alt",
      MOTION_COLOUR_SOCIAL_BORDER_HOV_ALPHA,
    ),
  };
}

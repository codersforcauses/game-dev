import {
  animate,
  AnimationPlaybackControls,
  motion,
  useMotionValue,
} from "framer-motion";
import { useCallback, useEffect, useRef } from "react";
import useMeasure from "react-use-measure";

import ImageCard from "@/components/ui/ImageCard";
import { Art } from "@/types/art";

const GAP = 16;
const DURATION = 90;

// modifying this to accept anything with a name, src, and id should be trivial.
export default function ContinuousCarousel(artworks: Art[]) {
  const [ref, { width }] = useMeasure();
  const xTranslation = useMotionValue(0);

  const controlsRef = useRef<AnimationPlaybackControls | null>(null);

  const startAnimation = useCallback(
    (from: number) => {
      const finalPosition = -(width + GAP) / 3;
      const rangeSize = -finalPosition;

      controlsRef.current?.stop();

      // Normalize `from` into [finalPosition, 0) so the loop restarts cleanly
      const normalizedFrom = -(((-from % rangeSize) + rangeSize) % rangeSize);
      xTranslation.set(normalizedFrom);

      const startFullLoop = () => {
        const controls = animate(xTranslation, [0, finalPosition], {
          ease: "linear",
          duration: DURATION,
          repeat: Infinity,
          repeatType: "loop",
          repeatDelay: 0,
        });
        controlsRef.current = controls;
      };

      // if we've scrolled beyond finalPosition, jump back to start
      const remaining = Math.abs(finalPosition - normalizedFrom);
      if (remaining < 0.5) {
        xTranslation.set(0);
        startFullLoop();
        return;
      }

      // animate the rest of the cycle, then resume
      const partialDuration = DURATION * (remaining / rangeSize);
      const controls = animate(xTranslation, finalPosition, {
        ease: "linear",
        duration: partialDuration,
        onComplete: startFullLoop,
      });
      controlsRef.current = controls;
    },
    [xTranslation, width],
  );

  useEffect(() => {
    startAnimation(0);
    return () => {
      controlsRef.current?.stop();
    };
  }, [startAnimation]);

  const items = artworks ?? [];
  return (
    <div className="overflow-hidden py-10">
      <motion.div
        className="flex w-max cursor-grab select-none gap-[16px] active:cursor-grabbing"
        ref={ref}
        style={{ x: xTranslation }}
        onPanStart={() => controlsRef.current?.stop()}
        onPan={(_, info) => {
          const rangeSize = (width + GAP) / 3;
          const next = xTranslation.get() + info.delta.x;
          const normalized = -(((-next % rangeSize) + rangeSize) % rangeSize);
          xTranslation.set(normalized);
        }}
        onPanEnd={() => startAnimation(xTranslation.get())}
      >
        {/* we need three copies to make sure it doesn't randomly snap incorrectly  */}
        {[...items, ...items, ...items].map((item: Art, i: number) => (
          <motion.div
            key={`${item.art_id} - ${i}`}
            style={{ transform: "translateZ(0)" }}
            whileHover={{
              scale: 1.05,
              zIndex: 1,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <ImageCard
              imageSrc={item.media || undefined}
              imageAlt={item.name}
              href={`/artwork/${item.art_id}`}
              backContent={<p> Hi </p>}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

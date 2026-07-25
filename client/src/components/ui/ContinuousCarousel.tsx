import {
  animate,
  AnimationPlaybackControls,
  motion,
  useMotionValue,
} from "framer-motion";
import { useCallback, useEffect, useRef } from "react";
import useMeasure from "react-use-measure";

import ImageCard from "@/components/ui/ImageCard/ImageCard";
import { Art } from "@/types/art";

import ImageCardBack from "./ImageCard/ImageCardBack";

const GAP = 16;
const DURATION = 90;

// modifying this to accept anything with a name, src, and id should be trivial.
export default function ContinuousCarousel(artworks: Art[], reverse = false) {
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

      const target = reverse ? 0 : finalPosition;
      const loopStart = reverse ? finalPosition : 0;

      const startFullLoop = () => {
        const controls = animate(xTranslation, [loopStart, target], {
          ease: "linear",
          duration: DURATION,
          repeat: Infinity,
          repeatType: "loop",
          repeatDelay: 0,
        });
        controlsRef.current = controls;
      };

      // if we're already at the target end, jump to loop start and begin
      const remaining = Math.abs(target - normalizedFrom);
      if (remaining < 0.5) {
        xTranslation.set(loopStart);
        startFullLoop();
        return;
      }

      // animate the rest of this cycle, then resume full loops
      const partialDuration = DURATION * (remaining / rangeSize);
      const controls = animate(xTranslation, target, {
        ease: "linear",
        duration: partialDuration,
        onComplete: startFullLoop,
      });
      controlsRef.current = controls;
    },
    [xTranslation, width, reverse],
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
        // i'm not sure how to make these have momentum.. future TODO?
        onPanStart={() => controlsRef.current?.stop()}
        onPan={(_, info) => {
          const rangeSize = (width + GAP) / 3;
          const next = xTranslation.get() + info.delta.x;
          const normalized = -(((-next % rangeSize) + rangeSize) % rangeSize);
          xTranslation.set(normalized);
        }}
        onHoverEnd={() => startAnimation(xTranslation.get())}
      >
        {/* we need three copies to make sure it doesn't randomly snap incorrectly... issues may arise on huge display resolutions  */}
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
              backContent={<ImageCardBack artwork={item} />}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

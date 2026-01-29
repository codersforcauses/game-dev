// it looks like im throwing the kitchen sink at it, but it's justified i swear
import { RefObject, useCallback, useEffect, useRef, useState } from "react";

// this hook conditionally renders a component with the interaction observer api.
export default function useInView<T extends Element = HTMLElement>(
  options: IntersectionObserverInit = {},
): [RefObject<T | null>, boolean] {
  // assume we can't see it and let the intersection observer api tell us otherwise
  const [inView, setIsInView] = useState(false);
  const thisComponent = useRef<T | null>(null);
  // tell react not to reconstruct the function or references to it
  const clbc = useCallback((entries: IntersectionObserverEntry[]) => {
    // updates on positive and negative edge of element intersecting the
    // viewport (or whatever "root" is)
    setIsInView(entries.some((e) => e.isIntersecting));
    // this should only be updating the state *once* when the intersection observer
    // sees the component cross the threshold, hence the use of `some`
  }, []);

  const { root, rootMargin, threshold }: IntersectionObserverInit = options;
  useEffect(() => {
    if (!thisComponent.current) return;
    const opts: IntersectionObserverInit = {
      root: root ?? null, // aka viewport
      rootMargin: rootMargin ?? "0px",
      threshold: threshold ?? 0.05,
    };

    const observer = new IntersectionObserver(clbc, opts);
    observer.observe(thisComponent.current);

    // prevent observer build up
    return () => {
      if (observer != null) {
        observer.disconnect();
      }
    };
    // incase someone wants to modify one of these,
    // without reconstructing the whole object
  }, [clbc, root, rootMargin, threshold]);
  return [thisComponent, inView];
}

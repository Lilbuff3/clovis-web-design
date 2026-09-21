import { useEffect, useRef, useState } from "react";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Animated number count-up triggered upon scrolling into view.
 * Supports configurable decimals and animation duration.
 */
export function useCountUp(target: number, decimals = 0, duration = 1600) {
  const ref = useRef<HTMLElement | null>(null);
  const [value, setValue] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      setValue(target);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || hasAnimated.current) return;
          hasAnimated.current = true;
          const startTime = performance.now();

          const frame = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(1, elapsed / duration);
            // Quartic ease out: 1 - (1 - t)^4
            const eased = 1 - Math.pow(1 - progress, 4);
            setValue(target * eased);

            if (progress < 1) {
              requestAnimationFrame(frame);
            } else {
              setValue(target);
            }
          };

          requestAnimationFrame(frame);
        });
      },
      { threshold: 0.35 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [target, decimals, duration]);

  return {
    ref,
    display: value.toFixed(decimals),
    value,
  };
}

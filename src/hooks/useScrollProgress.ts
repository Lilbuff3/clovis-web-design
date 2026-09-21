import { useEffect, useRef, useState } from "react";

// Centralized scroll subscriber bus to avoid multi-listener scroll thrashing
const subscribers = new Set<() => void>();
let isRafQueued = false;
let isListenerAttached = false;

function dispatchScroll() {
  isRafQueued = false;
  subscribers.forEach((callback) => callback());
}

function handleScrollEvent() {
  if (!isRafQueued) {
    isRafQueued = true;
    requestAnimationFrame(dispatchScroll);
  }
}

function subscribe(fn: () => void) {
  subscribers.add(fn);
  if (!isListenerAttached && typeof window !== "undefined") {
    window.addEventListener("scroll", handleScrollEvent, { passive: true });
    window.addEventListener("resize", handleScrollEvent, { passive: true });
    isListenerAttached = true;
  }
  fn(); // initial execution
  return () => {
    subscribers.delete(fn);
  };
}

/**
 * Tracks page scroll progress (0 to 1) and scrolled threshold (> 40px)
 * for floating navigation morphing and reading progress hairlines.
 */
export function useScrollProgress() {
  const barRef = useRef<HTMLDivElement | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    return subscribe(() => {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const maxScroll = scrollHeight - clientHeight;
      const y = window.scrollY;

      const p = maxScroll > 0 ? Math.min(1, Math.max(0, y / maxScroll)) : 0;
      setProgress(p);

      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${p})`;
      }

      const isScrolled = y > 40;
      setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
    });
  }, []);

  return { barRef, scrolled, progress };
}

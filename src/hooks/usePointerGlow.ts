import { useEffect, useRef } from "react";

const isCoarsePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

/**
 * Attaches a pointermove listener to an element ref to track relative cursor position.
 * Exposes --mx and --my (percentage coordinates) for radial spotlight overlays.
 */
export function usePointerGlow<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || isCoarsePointer()) return;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
      const yPercent = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--mx", `${xPercent.toFixed(2)}%`);
      el.style.setProperty("--my", `${yPercent.toFixed(2)}%`);
    };

    el.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => {
      el.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return ref;
}

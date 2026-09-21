import { useEffect } from "react";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Global scroll-reveal observer. Elements with [data-reveal] fade and slide in once.
 * Dynamically mounted elements (e.g., drawers, modal content) are captured via MutationObserver.
 */
export function useRevealObserver() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (prefersReducedMotion()) {
      document.querySelectorAll("[data-reveal]").forEach((el) => {
        el.classList.add("is-in");
      });
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    const scan = () => {
      document.querySelectorAll("[data-reveal]:not(.is-in)").forEach((el) => io.observe(el));
    };

    scan();
    const mo = new MutationObserver(() => scan());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
}

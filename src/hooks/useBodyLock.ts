import { useEffect } from "react";

let lockCount = 0;
let previousOverflow = "";
let previousPaddingRight = "";

/**
 * Locks document.body scroll without layout shift caused by disappearing scrollbars.
 * Utilizes a global active lock counter to support nested/chained modals without scroll freeze.
 */
export function useBodyLock(locked: boolean) {
  useEffect(() => {
    if (!locked || typeof window === "undefined") return;

    if (lockCount === 0) {
      previousOverflow = document.body.style.overflow;
      previousPaddingRight = document.body.style.paddingRight;
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
        document.documentElement.style.setProperty(
          "--scrollbar-offset",
          `${scrollbarWidth}px`
        );
      }
    }
    lockCount++;

    return () => {
      lockCount--;
      if (lockCount <= 0) {
        lockCount = 0;
        document.body.style.overflow = previousOverflow;
        document.body.style.paddingRight = previousPaddingRight;
        document.documentElement.style.removeProperty("--scrollbar-offset");
      }
    };
  }, [locked]);
}

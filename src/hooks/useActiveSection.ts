import { useEffect, useState } from "react";

/**
 * Detects which section is currently in view for navigation pill active states.
 */
export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] ?? "");

  useEffect(() => {
    if (typeof window === "undefined" || sectionIds.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visibleEntries.length > 0 && visibleEntries[0].target.id) {
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0, 0.25, 0.5] }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });

    return () => io.disconnect();
  }, [sectionIds.join(",")]);

  return activeSection;
}

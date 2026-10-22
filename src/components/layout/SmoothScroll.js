"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { setLenis } from "@/lib/smoothScroll";

// Base UI dialogs (mobile menu, gallery) lock the page with inline overflow: hidden.
const pageLocked = () => document.documentElement.style.overflowY === "hidden" || document.body.style.overflowY === "hidden";

/** Site-wide Lenis smooth scrolling; skipped when the visitor prefers reduced motion. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      // Scrollable areas inside dialogs keep their own native scrolling.
      prevent: (node) => Boolean(node.closest?.('[role="dialog"]')),
      virtualScroll: () => !pageLocked(),
    });
    setLenis(lenis);

    return () => {
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  return null;
}

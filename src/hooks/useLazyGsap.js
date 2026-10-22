"use client";

import { useEffect, useEffectEvent } from "react";
import { registerScrollTrigger } from "@/lib/smoothScroll";

/**
 * Runs a GSAP setup function after GSAP (and ScrollTrigger, if requested) has
 * been loaded on demand, keeping the animation library off the critical
 * rendering path. Skipped entirely when the visitor prefers reduced motion.
 * Everything created inside `setup` belongs to a gsap.context scoped to
 * `scopeRef` and is reverted (tweens, ScrollTriggers, inline styles) on unmount.
 *
 * setup receives ({ gsap, ScrollTrigger }) and runs inside the context.
 */
export function useLazyGsap(scopeRef, setup, { scrollTrigger = false } = {}) {
  const runSetup = useEffectEvent((plugins) => setup(plugins));

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let context;
    let cancelled = false;

    (async () => {
      const { gsap } = await import("gsap");
      let ScrollTrigger;
      if (scrollTrigger) {
        ({ ScrollTrigger } = await import("gsap/ScrollTrigger"));
        gsap.registerPlugin(ScrollTrigger);
        registerScrollTrigger(ScrollTrigger);
      }
      if (cancelled || !scopeRef.current) return;
      context = gsap.context(() => runSetup({ gsap, ScrollTrigger }), scopeRef);
    })();

    return () => {
      cancelled = true;
      context?.revert();
    };
  }, [scopeRef, scrollTrigger]);
}

/** True when an element's top edge is already inside the viewport. */
export function isInViewport(element) {
  return element.getBoundingClientRect().top < window.innerHeight;
}

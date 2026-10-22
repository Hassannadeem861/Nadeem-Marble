// Shared Lenis instance, so lazily loaded GSAP code and scroll buttons can use it.
// Either side may arrive first, so ScrollTrigger is synced whenever both exist.
let lenis = null;
let scrollTrigger = null;
let syncedPair = null;

function sync() {
  if (!lenis || !scrollTrigger || syncedPair === lenis) return;
  lenis.on("scroll", scrollTrigger.update);
  syncedPair = lenis;
}

export function setLenis(instance) {
  lenis = instance;
  if (!instance) syncedPair = null;
  sync();
}

export function getLenis() {
  return lenis;
}

export function registerScrollTrigger(ScrollTrigger) {
  scrollTrigger = ScrollTrigger;
  sync();
}

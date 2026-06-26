import type Lenis from 'lenis';

// Shared handle to the app's Lenis smooth-scroll instance (created in App.tsx)
// so overlays/modals can freeze the page while open. Plain body overflow:hidden
// does NOT stop Lenis — it scrolls via its own rAF loop — so we must stop()/start().
let instance: Lenis | null = null;

export function setLenis(l: Lenis | null) {
  instance = l;
}

/** Freeze page scrolling (smooth + native) — call when a modal opens. */
export function lockScroll() {
  instance?.stop();
}

/** Resume page scrolling — call when the modal closes. */
export function unlockScroll() {
  instance?.start();
}

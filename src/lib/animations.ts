import type { Variants } from "framer-motion";

/** Shared gentle easing — cubic bezier for subtle, natural motion */
export const gentleEase = [0.25, 0.1, 0.25, 1] as const;

/** Short-duration transition used by most entry animations */
export const quickTransition = {
  duration: 0.5,
  ease: gentleEase,
};

/** Slightly longer for larger elements */
export const slowTransition = {
  duration: 0.6,
  ease: gentleEase,
};

/* ------------------------------------------------------------------ */
/*  Variants                                                          */
/* ------------------------------------------------------------------ */

/** Fades in + rises 24px. Use for text blocks, cards, section content. */
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: quickTransition,
  },
};

/** Pure opacity fade. Use for backgrounds, large visuals, overlays. */
export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: slowTransition,
  },
};

/**
 * Parent variant that staggers its children by ~0.1 s.
 * Apply to a container whose children each have their own `variants`.
 */
export const staggerContainer: Variants = {
  hidden: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
  visible: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: 1,
    },
  },
};

/** Subtle scale‑up + fade. Use for cards, icons, avatar, project thumbnails. */
export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: quickTransition,
  },
};

"use client";

import { motion, useReducedMotion } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Delay in seconds before the animation starts (default 0). */
  delay?: number;
  /** Set to true to disable animation for this instance. */
  noAnimation?: boolean;
}

/**
 * Wraps content so it fades in + rises slightly once scrolled into view.
 * Uses `whileInView` — animation fires once per mount by default.
 * Automatically skips animation for users who prefer reduced motion.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  noAnimation = false,
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (noAnimation || prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
        delay,
      }}
      className={`gpu-layer ${className}`.trim()}
    >
      {children}
    </motion.div>
  );
}

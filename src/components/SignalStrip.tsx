"use client";

import { useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { useScrollContext } from "@/components/SmoothScrollProvider";

/* ------------------------------------------------------------------ */
/*  Section markers                                                   */
/* ------------------------------------------------------------------ */

const SECTION_LABELS: Record<string, string> = {
  hero: "Home",
  about: "About",
  skills: "Skills",
  projects: "Projects",
  certifications: "Certs",
  contact: "Contact",
};

export default function SignalStrip() {
  const prefersReducedMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const { activeSection, sectionPositions } = useScrollContext();

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setProgress(Math.round(latest * 100));
  });

  const activePos = sectionPositions[activeSection] ?? 0;

  /* ── Reduced motion fallback ── */
  if (prefersReducedMotion) {
    return (
      <div
        className="hidden sm:block fixed left-0 top-0 h-full w-[3px] z-40 pointer-events-none"
        role="progressbar"
        aria-label="Scroll progress"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="absolute inset-0 bg-white/[0.025]" />
      </div>
    );
  }

  return (
    <div
      className="hidden sm:block fixed left-0 top-0 h-full w-[3px] z-40 pointer-events-none"
      role="progressbar"
      aria-label="Scroll progress"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* Track — subtle background line */}
      <div className="absolute inset-0 bg-white/[0.025]" />

      {/* Fill — animated scroll progress */}
      <motion.div
        className="absolute top-0 left-0 w-full origin-top bg-gradient-to-b from-accent-primary via-accent-primary/80 to-accent-primary/10"
        style={{ scaleY, height: "100%" }}
      />

      {/* Leading-edge glow */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[6px] h-[60px] bg-accent-primary/20 blur-md rounded-full"
        style={{ opacity: scaleY }}
      />

      {/* ── Section position markers ── */}
      {Object.entries(sectionPositions).map(([id, pos]) => {
        const isActive = id === activeSection;
        return (
          <div
            key={id}
            className="absolute left-0 w-full flex items-center"
            style={{ top: `${pos}%` }}
          >
            {/* Tick mark */}
            <div
              className={`h-px transition-all duration-700 ease-out ${
                isActive
                  ? "w-3 bg-accent-primary"
                  : "w-[5px] bg-white/10 group-hover:w-2"
              }`}
            />

            {/* Active dot — only visible for the active section */}
            {isActive && (
              <motion.div
                layoutId="active-section-dot"
                className="w-[7px] h-[7px] rounded-full bg-accent-primary -ml-[2px] shadow-[0_0_12px_rgba(56,189,248,0.7)]"
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 20,
                  mass: 0.5,
                }}
              />
            )}
          </div>
        );
      })}

      {/* ── Floating section label for the active section ── */}
      <motion.div
        className="absolute left-[14px] -translate-y-1/2"
        style={{ top: `${activePos}%` }}
        animate={{ top: `${activePos}%` }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 25,
          mass: 0.5,
        }}
      >
        <motion.span
          initial={false}
          animate={{
            opacity: activeSection ? 1 : 0,
            x: activeSection ? 0 : -4,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent-primary/80 whitespace-nowrap"
        >
          {activeSection ? SECTION_LABELS[activeSection] ?? activeSection : ""}
        </motion.span>
      </motion.div>
    </div>
  );
}

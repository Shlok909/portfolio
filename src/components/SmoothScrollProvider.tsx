"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import Lenis from "lenis";

/* ------------------------------------------------------------------ */
/*  Context                                                           */
/* ------------------------------------------------------------------ */

interface ScrollContextValue {
  lenis: Lenis | null;
  activeSection: string;
  sectionPositions: Record<string, number>;
  scrollProgress: number;
}

const ScrollContext = createContext<ScrollContextValue>({
  lenis: null,
  activeSection: "",
  sectionPositions: {},
  scrollProgress: 0,
});

export function useScrollContext() {
  return useContext(ScrollContext);
}

/* ------------------------------------------------------------------ */
/*  Provider                                                          */
/* ------------------------------------------------------------------ */

const SECTION_IDS = [
  "hero",
  "about",
  "skills",
  "projects",
  "certifications",
  "contact",
] as const;

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const [lenisReady, setLenisReady] = useState<Lenis | null>(null);
  const [activeSection, setActiveSection] = useState("");
  const [sectionPositions, setSectionPositions] = useState<
    Record<string, number>
  >({});
  const [scrollProgress, setScrollProgress] = useState(0);

  /* ── Initialise Lenis ── */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const lenis = new Lenis({
      duration: 1.5,
      easing: (t: number) => {
        // Cubic bezier approximation: ease-out-expo
        // Smooth deceleration — feels buttery on both wheel and programmatic scroll
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      },
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.2,
      lerp: 0.08,
    });

    lenisRef.current = lenis;
    setLenisReady(lenis);

    const onScroll = (e: Lenis) => {
      setScrollProgress(Math.round(e.progress * 100));
    };
    lenis.on("scroll", onScroll);

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.off("scroll", onScroll);
      lenis.destroy();
      lenisRef.current = null;
      setLenisReady(null);
    };
  }, []);

  /* ── Calculate section positions ── */
  const calculatePositions = useCallback(() => {
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const positions: Record<string, number> = {};

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        // Position as percentage of total scrollable height
        const sectionCenter = top + rect.height / 2;
        positions[id] =
          docHeight > 0
            ? Math.min(100, Math.max(0, (sectionCenter / docHeight) * 100))
            : 0;
      }
    });

    setSectionPositions(positions);
  }, []);

  useEffect(() => {
    // Slight delay to ensure DOM is fully rendered
    const timer = setTimeout(calculatePositions, 100);
    window.addEventListener("resize", calculatePositions);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calculatePositions);
    };
  }, [calculatePositions]);

  /* ── Track active section via IntersectionObserver ── */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { threshold: 0.25, rootMargin: "-80px 0px -20% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return (
    <ScrollContext.Provider
      value={{
        lenis: lenisReady,
        activeSection,
        sectionPositions,
        scrollProgress,
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
}

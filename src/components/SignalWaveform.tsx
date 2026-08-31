"use client";

import { useRef, useEffect, useMemo } from "react";
import { useReducedMotion } from "framer-motion";

const BAR_COUNT = 45;
const BAR_WIDTH = 3;
const BAR_GAP = 5;
const SVG_HEIGHT = 100;

interface Bar {
  id: number;
  /** Base height ratio 0.2–1.0 */
  baseHeight: number;
  /** Phase offset for the time‑based pulse (radians) */
  phase: number;
}

function generateBars(): Bar[] {
  return Array.from({ length: BAR_COUNT }, (_, i) => {
    // Deterministic pseudo-random from index so SSR === client
    const h = 0.5 * (Math.sin(i * 1.7) * 0.5 + 0.5) + 0.2;
    const p = Math.sin(i * 3.1) * Math.PI + Math.PI;
    return {
      id: i,
      baseHeight: Math.max(0.2, Math.min(1, h)),
      phase: p,
    };
  });
}

interface SignalWaveformProps {
  className?: string;
}

/**
 * A horizontal waveform made of vertical bars that gently pulse over time.
 * On desktop, bars subtly react to mouse proximity — nearest bars get a
 * height boost and increased opacity.  No React state is used for the
 * animation loop; all updates happen directly on DOM elements via a
 * single requestAnimationFrame callback for maximum performance.
 */
export default function SignalWaveform({ className = "" }: SignalWaveformProps) {
  const prefersReducedMotion = useReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);
  const mouseXRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);

  const bars = useMemo(() => generateBars(), []);

  const totalWidth = BAR_COUNT * (BAR_WIDTH + BAR_GAP) - BAR_GAP;

  useEffect(() => {
    // Skip animation for users who prefer reduced motion — render static bars
    if (prefersReducedMotion) return;
    const svg = svgRef.current;
    if (!svg) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = svg.getBoundingClientRect();
      mouseXRef.current = (e.clientX - rect.left) / rect.width;
    };

    const onMouseLeave = () => {
      mouseXRef.current = null;
    };

    svg.addEventListener("mousemove", onMouseMove);
    svg.addEventListener("mouseleave", onMouseLeave);

    const rects = svg.querySelectorAll<SVGRectElement>("rect");

    const tick = (time: number) => {
      const mx = mouseXRef.current;

      rects.forEach((rect, i) => {
        const bar = bars[i];
        // Gentle sine wave pulse (0 → 1)
        const pulse = Math.sin(time * 0.001 + bar.phase) * 0.5 + 0.5;

        // Mouse proximity influence (0 → 1)
        let mouseInfluence = 0;
        if (mx !== null) {
          const center = (i + 0.5) / BAR_COUNT;
          const dist = Math.abs(mx - center);
          mouseInfluence = Math.max(0, 1 - dist * 3.5);
        }

        // Compose final scale and opacity
        const heightScale =
          bar.baseHeight * (0.7 + pulse * 0.3 + mouseInfluence * 0.35);
        const opacity = 0.3 + pulse * 0.4 + mouseInfluence * 0.3;

        rect.style.transform = `scaleY(${Math.min(heightScale, 1.2)})`;
        rect.style.opacity = String(Math.min(opacity, 1));
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      svg.removeEventListener("mousemove", onMouseMove);
      svg.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [bars, prefersReducedMotion]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height={SVG_HEIGHT}
      viewBox={`0 0 ${totalWidth} ${SVG_HEIGHT}`}
      preserveAspectRatio="xMidYMid meet"
      className={className}
      aria-hidden="true"
    >
      {bars.map((bar) => (
        <rect
          key={bar.id}
          x={bar.id * (BAR_WIDTH + BAR_GAP)}
          y={0}
          width={BAR_WIDTH}
          height={SVG_HEIGHT}
          rx={BAR_WIDTH / 2}
          fill="currentColor"
          className="text-accent-primary"
          style={{ transformOrigin: "center bottom" }}
        />
      ))}
    </svg>
  );
}

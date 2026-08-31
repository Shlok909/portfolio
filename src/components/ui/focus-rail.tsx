"use client";

import * as React from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type FocusRailItem = {
  id: string | number;
  title: string;
  description?: string;
  imageSrc: string;
  href?: string;
  meta?: string;
  issuer?: string;
  date?: string;
};

interface FocusRailProps {
  items: FocusRailItem[];
  initialIndex?: number;
  loop?: boolean;
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}

/**
 * Helper to wrap indices (e.g., -1 becomes length-1)
 */
function wrap(min: number, max: number, v: number) {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

/**
 * Physics Configuration
 * Base spring for spatial movement (x/z)
 */
const BASE_SPRING = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
  mass: 1,
};

/**
 * Scale Spring
 * Bouncier spring specifically for the visual "Click/Tap" feedback on the center card
 */


export function FocusRail({
  items,
  initialIndex = 0,
  loop = true,
  autoPlay = false,
  interval = 4000,
  className,
}: FocusRailProps) {
  const [active, setActive] = React.useState(initialIndex);
  const [isHovering, setIsHovering] = React.useState(false);
  const lastWheelTime = React.useRef<number>(0);

  const count = items.length;
  const activeIndex = wrap(0, count, active);
  const activeItem = items[activeIndex];

  // --- NAVIGATION HANDLERS ---
  const handlePrev = React.useCallback(() => {
    if (!loop && active === 0) return;
    setActive((p) => p - 1);
  }, [loop, active]);

  const handleNext = React.useCallback(() => {
    if (!loop && active === count - 1) return;
    setActive((p) => p + 1);
  }, [loop, active, count]);

  // --- MOUSE WHEEL / TRACKPAD LOGIC ---
  const onWheel = React.useCallback(
    (e: React.WheelEvent) => {
      const now = Date.now();
      // Debounce: prevent rapid firing from inertia scrolling (400ms lockout)
      if (now - lastWheelTime.current < 400) return;

      const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      const delta = isHorizontal ? e.deltaX : e.deltaY;

      // Threshold to avoid accidental micro-scrolls
      if (Math.abs(delta) > 20) {
        if (delta > 0) {
          handleNext();
        } else {
          handlePrev();
        }
        lastWheelTime.current = now;
      }
    },
    [handleNext, handlePrev]
  );

  // Autoplay logic
  React.useEffect(() => {
    if (!autoPlay || isHovering) return;
    const timer = setInterval(() => handleNext(), interval);
    return () => clearInterval(timer);
  }, [autoPlay, isHovering, handleNext, interval]);

  // Keyboard navigation
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "ArrowRight") handleNext();
  };

  // --- SWIPE / DRAG LOGIC ---
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const onDragEnd = (
    _e: MouseEvent | TouchEvent | PointerEvent,
    { offset, velocity }: PanInfo
  ) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      handleNext();
    } else if (swipe > swipeConfidenceThreshold) {
      handlePrev();
    }
  };

  // Responsive offset for card spacing and container height
  const [cardOffset, setCardOffset] = React.useState(140);
  const [containerHeight, setContainerHeight] = React.useState(520);
  React.useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 400) {
        setCardOffset(140);
        setContainerHeight(520);
      } else if (w < 640) {
        setCardOffset(180);
        setContainerHeight(540);
      } else if (w < 1024) {
        setCardOffset(240);
        setContainerHeight(580);
      } else {
        setCardOffset(280);
        setContainerHeight(600);
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const visibleIndices = [-2, -1, 0, 1, 2];

  return (
    <div
      className={cn(
        "group relative flex w-full flex-col overflow-hidden rounded-2xl border border-white/40 bg-white/20 text-white shadow-lg shadow-black/10 outline-none backdrop-blur-xl select-none",
        className
      )}
      style={{ minHeight: containerHeight }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onWheel={onWheel}
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={`bg-${activeItem.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.25 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img
              src={activeItem.imageSrc}
              alt=""
              className="h-full w-full object-cover blur-3xl saturate-200"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-white/10 to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main Stage */}
      <div className="relative z-10 flex flex-1 flex-col justify-center px-4 md:px-8">
        {/* DRAGGABLE RAIL CONTAINER */}
        <motion.div
          className="relative mx-auto flex h-[260px] sm:h-[320px] lg:h-[400px] w-full max-w-6xl items-center justify-center [perspective:1200px] cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={onDragEnd}
        >
          {visibleIndices.map((offset) => {
            const absIndex = active + offset;
            const index = wrap(0, count, absIndex);
            const item = items[index];

            if (!loop && (absIndex < 0 || absIndex >= count)) return null;

            const isCenter = offset === 0;
            const dist = Math.abs(offset);

            // Dynamic transforms
            const xOffset = offset * cardOffset;
            const zOffset = -dist * 180;
            const scale = isCenter ? 1 : 0.85;
            const rotateY = offset * -20;

            const opacity = isCenter ? 1 : Math.max(0.1, 1 - dist * 0.5);
            const blur = isCenter ? 0 : dist * 6;
            const brightness = isCenter ? 1 : 0.5;

            return (
              <motion.div
                key={absIndex}
                className={cn(
                  "absolute aspect-[3/4] w-[150px] sm:w-[200px] md:w-[240px] lg:w-[280px] rounded-2xl border-t border-white/10 bg-surface shadow-2xl transition-shadow duration-300",
                  isCenter ? "z-20 shadow-accent-primary/10" : "z-10"
                )}
                initial={false}
                animate={{
                  x: xOffset,
                  z: zOffset,
                  scale: scale,
                  rotateY: rotateY,
                  opacity: opacity,
                  filter: `blur(${blur}px) brightness(${brightness})`,
                }}
                transition={BASE_SPRING}
                style={{
                  transformStyle: "preserve-3d",
                }}
                onClick={() => {
                  if (offset !== 0) setActive((p) => p + offset);
                }}
              >
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  className="h-full w-full rounded-2xl object-cover pointer-events-none"
                />

                {/* Lighting layers */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                <div className="absolute inset-0 rounded-2xl bg-black/10 pointer-events-none mix-blend-multiply" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Info & Controls */}
        <div className="mx-auto mt-6 sm:mt-10 md:mt-12 flex w-full max-w-4xl flex-col items-center justify-between gap-4 sm:gap-6 md:flex-row pointer-events-auto">
          <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left min-h-[100px] sm:h-28 md:h-32 justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.3 }}
                className="space-y-2"
              >
                {activeItem.meta && (
                  <span className="font-mono text-xs font-medium uppercase tracking-wider text-accent-primary">
                    {activeItem.meta}
                  </span>
                )}
                <h3 className="text-xl font-bold tracking-tight text-accent-purple drop-shadow-[0_1px_2px_rgba(0,0,0,0.65)] sm:text-2xl md:text-3xl lg:text-4xl">
                  {activeItem.title}
                </h3>
                {(activeItem.issuer || activeItem.date) && (
                  <p className="font-mono text-xs text-white/90">
                    {activeItem.issuer}{activeItem.issuer && activeItem.date ? " \u2022 " : ""}{activeItem.date}
                  </p>
                )}
                {activeItem.description && (
                  <p className="max-w-md text-xs text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.75)] sm:text-sm md:text-base">
                    {activeItem.description}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 rounded-full bg-white/20 p-1 ring-1 ring-white/35 backdrop-blur-xl">
              <button
                onClick={handlePrev}
                className="rounded-full p-2 text-white transition hover:bg-white/20 active:scale-95 sm:p-3"
                aria-label="Previous"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="min-w-[40px] text-center font-mono text-xs text-white/85">
                {activeIndex + 1} / {count}
              </span>
              <button
                onClick={handleNext}
                className="rounded-full p-2 text-white transition hover:bg-white/20 active:scale-95 sm:p-3"
                aria-label="Next"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

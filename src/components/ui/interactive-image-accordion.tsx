"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

export interface AccordionItemData {
  id: string | number;
  title: string;
  imageUrl?: string;
  subtitle?: string;
}

interface InteractiveImageAccordionProps {
  items: AccordionItemData[];
  defaultActiveIndex?: number;
  className?: string;
  /** Width of each collapsed item (default: 64px) */
  collapsedWidth?: number;
  /** Width of the expanded item (default: 400px) */
  expandedWidth?: number;
  /** Height of the accordion (default: 450px) */
  height?: number;
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

const InteractiveImageAccordion = ({
  items,
  defaultActiveIndex = 0,
  className,
  collapsedWidth = 64,
  expandedWidth = 400,
  height = 450,
}: InteractiveImageAccordionProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(defaultActiveIndex);

  const handleItemHover = (index: number) => {
    setActiveIndex(index);
  };

  if (!items?.length) return null;

  return (
    <div
      className={cn("flex flex-row items-stretch gap-1 sm:gap-2 overflow-visible", className)}
      style={{ height, minHeight: height }}
    >
      {items.map((item, index) => {
        const isActive = index === activeIndex;
        const itemWidth = isActive ? expandedWidth : collapsedWidth;

        return (
          <div
            key={item.id}
            className={cn(
              "relative rounded-2xl overflow-hidden cursor-pointer",
              "transition-all duration-700 ease-in-out shrink-0",
              "group"
            )}
            style={{ width: itemWidth }}
            onMouseEnter={() => handleItemHover(index)}
            onFocus={() => handleItemHover(index)}
            tabIndex={0}
            role="button"
            aria-label={item.title}
            aria-expanded={isActive}
          >
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
              {/* Solid fallback shown when image is missing or fails */}
              <div className="absolute inset-0 bg-surface" />
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.style.display = "none";
                  }}
                />
              )}
              {/* Gradient overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
            </div>

            {/* Hover glow accent */}
            <div
              className={cn(
                "absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none",
                "bg-gradient-to-t from-accent-primary/10 via-accent-primary/5 to-transparent",
                isActive && "opacity-100"
              )}
            />

            {/* Title */}
            <span
              className={cn(
                "absolute text-white font-semibold whitespace-nowrap transition-all duration-300 ease-in-out z-10",
                "[text-shadow:0_2px_8px_rgba(0,0,0,0.6)]",
                isActive
                  ? "bottom-6 left-1/2 -translate-x-1/2 rotate-0 text-base sm:text-lg"
                  : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90 text-sm sm:text-base"
              )}
            >
              {item.title}
            </span>

            {/* Subtitle - only visible when expanded */}
            {item.subtitle && (
              <span
                className={cn(
                  "absolute bottom-12 left-1/2 -translate-x-1/2 text-xs text-white/60 font-mono whitespace-nowrap transition-all duration-300 ease-in-out z-10",
                  isActive
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2 pointer-events-none"
                )}
              >
                {item.subtitle}
              </span>
            )}

            {/* Active indicator bar */}
            <div
              className={cn(
                "absolute bottom-0 left-2 right-2 h-[3px] rounded-full transition-all duration-500 z-10",
                isActive
                  ? "bg-accent-primary scale-x-100"
                  : "bg-white/10 scale-x-0"
              )}
            />
          </div>
        );
      })}
    </div>
  );
};

export { InteractiveImageAccordion };

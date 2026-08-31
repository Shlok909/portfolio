"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface AnimatedTabsProps {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
  tabsClassName?: string;
  contentClassName?: string;
}

const AnimatedTabs = ({
  tabs,
  defaultTab,
  className,
  tabsClassName,
  contentClassName,
}: AnimatedTabsProps) => {
  const [activeTab, setActiveTab] = useState<string>(
    defaultTab || tabs[0]?.id
  );
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const handleTabClick = (id: string) => {
    setActiveTab(id);
  };

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const currentIndex = tabs.findIndex((t) => t.id === activeTab);
      let nextIndex: number | null = null;

      if (e.key === "ArrowRight") {
        nextIndex = (currentIndex + 1) % tabs.length;
      } else if (e.key === "ArrowLeft") {
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      }

      if (nextIndex !== null) {
        e.preventDefault();
        const nextId = tabs[nextIndex].id;
        setActiveTab(nextId);
        tabRefs.current.get(nextId)?.focus();
      }
    },
    [activeTab, tabs]
  );

  if (!tabs?.length) return null;

  return (
    <div className={cn("w-full flex flex-col gap-y-1", className)}>
      {/* Tab bar */}
      <div
        role="tablist"
        aria-orientation="horizontal"
        onKeyDown={handleKeyDown}
        className={cn(
          "flex gap-1 overflow-x-auto rounded-xl border border-white/35 bg-white/20 p-1 shadow-lg shadow-black/10 backdrop-blur-xl sm:gap-2",
          tabsClassName
        )}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            ref={(el) => {
              if (el) tabRefs.current.set(tab.id, el);
              else tabRefs.current.delete(tab.id);
            }}
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={activeTab === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
            tabIndex={activeTab === tab.id ? 0 : -1}
            onClick={() => handleTabClick(tab.id)}
            className={cn(
              "relative rounded-lg px-3 py-2 text-xs font-semibold text-white outline-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-1 focus-visible:ring-offset-transparent sm:px-4 sm:text-sm",
              activeTab === tab.id && "text-white"
            )}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="active-tab"
                className="absolute inset-0 rounded-lg border border-white/60 bg-white/25 shadow-[0_0_20px_rgba(255,255,255,0.16)] backdrop-blur-md"
                transition={{ type: "spring", duration: 0.6, bounce: 0.2 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content area */}
      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`tabpanel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          hidden={activeTab !== tab.id}
          className={cn(
            "min-h-[200px] rounded-xl border border-white/35 bg-white/20 p-4 shadow-lg shadow-black/10 backdrop-blur-xl sm:min-h-[300px] sm:p-6 md:p-8",
            activeTab !== tab.id && "hidden",
            contentClassName
          )}
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              x: -10,
              filter: "blur(10px)",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              x: -10,
              filter: "blur(10px)",
            }}
            transition={{
              duration: 0.5,
              ease: "circInOut",
              type: "spring",
            }}
          >
            {tab.content}
          </motion.div>
        </div>
      ))}
    </div>
  );
};

export { AnimatedTabs };

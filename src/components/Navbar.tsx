"use client";

import { useCallback } from "react";
import { useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useScrollContext } from "@/components/SmoothScrollProvider";

const NAV_LINKS = [
  { label: "Hero", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const { lenis, activeSection } = useScrollContext();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  const scrollTo = useCallback(
    (href: string) => {
      if (lenis) {
        lenis.scrollTo(href, { offset: -80, duration: 1.4 });
      }
    },
    [lenis]
  );

  const isActive = (href: string) => activeSection === href.replace("#", "");

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Background layer */}
      <div
        className={`absolute inset-0 transition-all duration-500 ${
          scrolled
            ? "border-b border-white/20 bg-black/35 shadow-lg shadow-black/10 backdrop-blur-lg"
            : "border-b border-white/10 bg-black/15 backdrop-blur-sm"
        }`}
      />

      <nav className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 h-14 sm:h-16 md:h-20 flex items-center justify-between">
        {/* Mobile menu toggle — left side */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden relative z-50 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-white hover:text-white transition-colors touch-target"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);          return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollTo(link.href);
                      }}
                      className="relative font-mono text-xs uppercase tracking-[0.2em] text-white transition-colors duration-200 group py-2"
                    >
                      {link.label}
                      {/* Active indicator line */}
                      <span
                        className={`absolute -bottom-1 left-0 w-full h-px bg-white transition-transform duration-300 origin-left ${
                          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                        }`}
                      />
                    </a>
            );
          })}
        </div>

        {/* Desktop Resume button */}
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] px-5 py-2.5 rounded-lg border border-white/60 text-white hover:bg-white/10 hover:border-white transition-all duration-200 focus-visible:ring-2 focus-visible:ring-white"
        >
          Resume
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className="opacity-60"
            aria-hidden="true"
          >
            <path
              d="M2 10L10 2M10 2H4M10 2V8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-6 sm:gap-10">
              {NAV_LINKS.map((link, i) => {
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    onClick={(e) => {
                      e.preventDefault();
                      setMobileOpen(false);
                      scrollTo(link.href);
                    }}
                    className="font-display text-2xl text-white transition-colors duration-200"
                  >
                    {link.label}
                  </motion.a>
                );
              })}
              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.08, duration: 0.4 }}
                className="mt-4 font-mono text-xs uppercase tracking-[0.2em] px-6 py-3 rounded-lg border border-white/60 text-white hover:bg-white/10 hover:border-white transition-all duration-200"
              >
                Resume
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

"use client";

import type { MouseEvent } from "react";
import { useScrollContext } from "@/components/SmoothScrollProvider";

export default function Hero() {
  const { lenis } = useScrollContext();

  const handleKnowMoreClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    if (lenis) {
      lenis.scrollTo("#about", { offset: -80, duration: 1.5 });
      return;
    }

    document.getElementById("about")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative h-screen min-h-[640px] w-full overflow-hidden bg-black"
    >
      <video
        className="absolute inset-0 h-full w-full object-cover object-[23%_center]"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src="/hero_section.mp4" type="video/mp4" />
      </video>

      <a
        href="#about"
        onClick={handleKnowMoreClick}
        aria-label="Click to know more about Shlok Sane"
        className="absolute left-[6%] top-[74%] z-10 h-[12%] w-[27%] cursor-pointer rounded-full transition-colors hover:bg-white/10 focus-visible:ring-4 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-transparent"
      >
        <span className="sr-only">Click to know more</span>
      </a>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const STATS = [
  { value: "4", label: "Live AI Products Shipped" },
  { value: "5", label: "AI/Dev Certifications" },
  { value: "100+", label: "Monthly Users (LearNova)" },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative min-h-[100dvh] min-h-screen flex items-center py-16 sm:py-24"
    >
      <div className="section-container w-full">
        {/* Section header */}
        <Reveal>
          <span className="section-label">About</span>
        </Reveal>

        {/* Two-column layout: text + stats */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Text column */}
          <Reveal className="lg:col-span-3">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary leading-tight">
              Building with AI, shipping fast
            </h2>
            <p className="mt-6 max-w-[620px] font-body text-base leading-relaxed text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] sm:text-lg">
              I&apos;m a third-year BCA student and full-stack developer with
              hands-on experience building and deploying AI-integrated web
              applications. I work mainly with Next.js, React, and Firebase,
              with practical expertise in AI API integration (Gemini, Groq),
              prompt engineering, and rapid MVP development. I hold five AI and
              software development certifications from Anthropic, Google, GUVI x
              HCL, Simplilearn, and LinkedIn Learning. I&apos;m currently
              looking for a full-stack or AI application development internship
              to bring this experience into a professional engineering team.
            </p>
          </Reveal>

          {/* Stats column */}
          <Reveal className="lg:col-span-2" delay={0.15}>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6 sm:gap-4 lg:gap-10 lg:mt-16"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {STATS.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={fadeInUp}
                  className="border-l-2 border-white/60 pl-5"
                >
                  <span className="block font-mono text-3xl font-bold leading-none text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] sm:text-4xl">
                    {stat.value}
                  </span>
                  <span className="mt-2 block font-mono text-xs uppercase tracking-[0.15em] text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

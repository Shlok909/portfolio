"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { staggerContainer, fadeInUp } from "@/lib/animations";

type Project = {
  name: string;
  tagline: string;
  description: string;
  tech: string[];
  url: string;
};

const PROJECTS: Project[] = [
  {
    name: "LearNova",
    tagline: "Educational Resource Platform",
    description:
      "A full-stack educational platform for college students offering semester-wise course materials and notes. Reached 100+ monthly active users within the first month of launch. Built with Firebase Authentication and role-based access.",
    tech: ["Next.js", "React", "Firebase", "TypeScript", "Vercel"],
    url: "https://learnova-mrk2.vercel.app/",
  },
  {
    name: "SpeakWeb.ai",
    tagline: "Voice-to-Website Generator",
    description:
      "Lets small business owners generate a live website just by describing their business out loud. Converts speech to text, extracts business details with AI, generates content, and publishes a working site in under 60 seconds.",
    tech: ["Next.js", "React", "Speech-to-Text API", "Groq API", "Prompt Engineering", "Vercel"],
    url: "https://learnova-mrk2.vercel.app/",
  },
  {
    name: "Rel.ai",
    tagline: "Conversational AI Assistant",
    description:
      "An AI assistant that helps decode messages and relationship signals, offering context-aware, multi-tone reply suggestions. Built with a specialised prompt-engineering system for focused, multi-turn conversation.",
    tech: ["Next.js", "Groq API", "Firebase Authentication", "JavaScript"],
    url: "https://relai-lake.vercel.app/",
  },
  {
    name: "ContentClarity",
    tagline: "AI Content Analysis Tool",
    description:
      "An AI tool that analyzes a user's YouTube watch history to surface patterns in their content consumption and deliver digital-wellness-focused recommendations.",
    tech: ["Next.js", "React", "Gemini API", "JavaScript"],
    url: "https://contentclarity-theta.vercel.app",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative min-h-[100dvh] min-h-screen flex items-center py-16 sm:py-24"
    >
      <div className="section-container w-full">
        {/* Section header */}
        <Reveal>
          <span className="section-label">Projects</span>
          <h2 className="section-title mt-1">
            Things I&apos;ve built
          </h2>
        </Reveal>

        {/* Project cards — vertical stack */}
        <motion.div
          className="mt-12 flex flex-col gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {PROJECTS.map((project) => (
            <motion.article
              key={project.name}
              variants={fadeInUp}
              className="group relative rounded-xl border border-white/40 bg-white/20 p-6 shadow-lg shadow-black/10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/70 hover:bg-white/30 hover:shadow-xl hover:shadow-black/20 sm:p-8"
            >
              {/* Left accent border — appears on hover (signal-strip motif) */}
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-accent-primary rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                {/* Project info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-text-primary">
                    {project.name}
                  </h3>
                  <span className="font-mono text-xs uppercase tracking-[0.15em] text-accent-primary block mt-1">
                    {project.tagline}
                  </span>
                  <p className="mt-4 max-w-[640px] font-body text-sm leading-relaxed text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.75)] sm:text-base">
                    {project.description}
                  </p>
                </div>

                {/* View Live link */}
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.15em] text-accent-primary hover:text-accent-primary/80 transition-colors duration-200 group/link focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
                >
                  View Live
                  <span className="inline-block transition-transform duration-200 group-hover/link:translate-x-1">
                    →
                  </span>
                </a>
              </div>

              {/* Tech tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-accent-purple/45 bg-white/10 px-2.5 py-1 font-mono text-[11px] text-accent-purple"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

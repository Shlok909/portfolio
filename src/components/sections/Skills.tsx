"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { AnimatedTabs } from "@/components/ui/animated-tabs";
import type { Tab } from "@/components/ui/animated-tabs";

/* ------------------------------------------------------------------ */
/*  Skill Data                                                        */
/* ------------------------------------------------------------------ */

type Skill = {
  name: string;
  description: string;
  tags?: string[];
};

type SkillCategory = {
  id: string;
  label: string;
  skills: Skill[];
};

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "frontend",
    label: "Frontend",
    skills: [
      {
        name: "React & Next.js",
        description:
          "Building performant SPAs and SSR applications with React 18+ and Next.js 14, leveraging App Router, Server Components, and streaming SSR.",
        tags: ["React 18", "Next.js 14", "SSR", "Server Components", "App Router"],
      },
      {
        name: "TypeScript",
        description:
          "Strongly-typed frontend and backend code with advanced generics, discriminated unions, and utility types for maintainable codebases.",
        tags: ["TypeScript 5", "Generics", "Utility Types", "Strict Mode"],
      },
      {
        name: "Tailwind CSS",
        description:
          "Utility-first responsive designs with custom design systems, animations, and dark-mode-first theming.",
        tags: ["Tailwind CSS", "Responsive", "Custom Config", "Dark Mode"],
      },
      {
        name: "UI / UX",
        description:
          "Crafting polished interfaces with Framer Motion, GSAP, glassmorphism aesthetics, and micro-interactions that delight users.",
        tags: ["Framer Motion", "GSAP", "Micro-interactions", "Glassmorphism"],
      },
    ],
  },
  {
    id: "backend",
    label: "Backend & Database",
    skills: [
      {
        name: "Firebase",
        description:
          "Full-stack backend with Firestore, Authentication, Cloud Functions, and real-time data sync for scalable web apps.",
        tags: ["Firestore", "Auth", "Cloud Functions", "Real-time"],
      },
      {
        name: "Supabase",
        description:
          "Open-source Firebase alternative with PostgreSQL, Row-Level Security, and real-time subscriptions for modern apps.",
        tags: ["PostgreSQL", "RLS", "Realtime", "Edge Functions"],
      },
      {
        name: "REST & APIs",
        description:
          "Designing and consuming RESTful APIs with proper error handling, rate limiting, and caching strategies.",
        tags: ["REST", "API Design", "HTTP", "JSON"],
      },
      {
        name: "Node.js",
        description:
          "Server-side JavaScript runtime for building scalable network applications and backend services.",
        tags: ["Node.js", "Express", "Middleware", "NPM"],
      },
    ],
  },
  {
    id: "ai",
    label: "AI & Automation",
    skills: [
      {
        name: "Prompt Engineering",
        description:
          "Crafting precision prompts, chain-of-thought reasoning, and system instructions for reliable multi-turn AI conversations.",
        tags: ["Chain-of-Thought", "System Prompts", "Few-shot", "Tuning"],
      },
      {
        name: "Gemini API",
        description:
          "Integrating Google's Gemini models for content analysis, generation, and multimodal understanding in web apps.",
        tags: ["Gemini", "Multimodal", "Content Gen", "Analysis"],
      },
      {
        name: "Groq API",
        description:
          "Leveraging ultra-fast inference with Groq LPU for real-time AI features like voice-to-website generation and chat assistants.",
        tags: ["Groq", "LPU Inference", "Real-time", "Speed"],
      },
      {
        name: "AI Integration",
        description:
          "Seamlessly integrating AI capabilities into user-facing products — from smart search to automated content workflows.",
        tags: ["AI Agents", "Automation", "Workflows", "Tooling"],
      },
    ],
  },
  {
    id: "tools",
    label: "Tools & Platforms",
    skills: [
      {
        name: "Git & GitHub",
        description:
          "Version control workflows with feature branching, pull requests, code reviews, and CI/CD pipelines.",
        tags: ["Git", "GitHub", "CI/CD", "Code Review"],
      },
      {
        name: "Vercel",
        description:
          "Deployment and hosting with automatic preview deployments, serverless functions, and edge caching.",
        tags: ["Vercel", "Deployment", "Serverless", "Edge"],
      },
      {
        name: "Cursor AI",
        description:
          "AI-assisted development workflow using Cursor for rapid prototyping, refactoring, and code generation.",
        tags: ["Cursor", "AI Coding", "Rapid Prototyping"],
      },
      {
        name: "VS Code & Dev Tools",
        description:
          "Customized development environment with extensions, debuggers, linting, and profiling for productive workflows.",
        tags: ["VS Code", "ESLint", "Prettier", "DevTools"],
      },
    ],
  },
  {
    id: "languages",
    label: "Languages",
    skills: [
      {
        name: "JavaScript",
        description:
          "Modern ES6+ JavaScript with async/await, closures, modules, and a deep understanding of the event loop and runtime.",
        tags: ["ES6+", "Async/Await", "Event Loop", "Modules"],
      },
      {
        name: "TypeScript",
        description:
          "Production-grade TypeScript with strict typing, interfaces, generics, and type-safe API contracts across full-stack projects.",
        tags: ["TypeScript 5", "Strict Mode", "Generics", "Type Safety"],
      },
      {
        name: "Python",
        description:
          "Scripting, automation, data processing, and lightweight backend services with Python 3.",
        tags: ["Python 3", "Scripting", "Automation", "Data"],
      },
      {
        name: "HTML & CSS",
        description:
          "Semantic HTML5, modern CSS3 features like Grid, Flexbox, custom properties, and accessible markup practices.",
        tags: ["HTML5", "CSS3", "Grid", "Flexbox", "Accessibility"],
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  SkillCard — displays a single skill inside a tab                   */
/* ------------------------------------------------------------------ */

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
      className="group relative rounded-xl border border-white/35 bg-white/15 p-5 shadow-lg shadow-black/10 backdrop-blur-xl transition-all duration-300 hover:border-white/60 hover:bg-white/25"
    >
      {/* Subtle top accent */}
      <div className="absolute top-0 left-4 right-4 h-[2px] bg-gradient-to-r from-transparent via-accent-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />

      <h4 className="font-display text-base sm:text-lg font-semibold text-white group-hover:text-accent-primary transition-colors duration-200">
        {skill.name}
      </h4>

      <p className="mt-2 text-xs leading-relaxed text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)] sm:text-sm">
        {skill.description}
      </p>

      {skill.tags && skill.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {skill.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-accent-purple/40 bg-white/10 px-2 py-0.5 font-mono text-[10px] text-accent-purple"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Tab content builder                                                */
/* ------------------------------------------------------------------ */

function buildTabs(categories: SkillCategory[]): Tab[] {
  return categories.map((cat) => ({
    id: cat.id,
    label: cat.label,
    content: (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {cat.skills.map((skill, i) => (
          <SkillCard key={skill.name} skill={skill} index={i} />
        ))}
      </div>
    ),
  }));
}

/* ------------------------------------------------------------------ */
/*  Skills Section                                                     */
/* ------------------------------------------------------------------ */

export default function Skills() {
  const tabs = buildTabs(SKILL_CATEGORIES);

  return (
    <section
      id="skills"
      className="relative min-h-[100dvh] min-h-screen flex flex-col justify-center py-16 sm:py-24"
    >
      <div className="section-container w-full">
        {/* Section header */}
        <Reveal>
          <span className="section-label">Skills</span>
          <h2 className="section-title mt-1">
            Technologies &amp; expertise
          </h2>
          <p className="mt-3 max-w-2xl font-body text-sm text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] sm:text-base">
            A curated overview of the tools, frameworks, and technologies I
            work with daily — from frontend to backend, AI to deployment.
          </p>
        </Reveal>

        {/* Animated Tabs */}
        <Reveal delay={0.2}>
          <div className="mt-10 sm:mt-12">
            <AnimatedTabs tabs={tabs} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

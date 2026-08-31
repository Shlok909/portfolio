"use client";

import Reveal from "@/components/Reveal";
import { FocusRail, type FocusRailItem } from "@/components/ui/focus-rail";

const CERTIFICATIONS: FocusRailItem[] = [
  {
    id: 1,
    title: "Google AI Essentials",
    description:
      "5-course specialization covering AI fundamentals, responsible AI practices, and practical AI工具应用.",
    issuer: "Google / Coursera",
    date: "June 2026",
    meta: "AI • 5-Course Specialization",
    imageSrc:
      "Google essential.jpeg",
  },
  {
    id: 2,
    title: "AI Fluency for Students",
    description:
      "Anthropic's program on AI fluency, covering core concepts and practical applications for students.",
    issuer: "Anthropic",
    date: "March 2026",
    meta: "AI Fluency • Anthropic",
    imageSrc:
      "AI fluency.jpeg",
  },
  {
    id: 3,
    title: "Generative AI Software Development",
    description:
      "SkillUp certification on building software applications powered by generative AI technologies.",
    issuer: "Simplilearn SkillUp",
    date: "June 2026",
    meta: "GenAI • Software Dev",
    imageSrc:
      "Simplilearn.jpeg",
  },
  {
    id: 4,
    title: "Google AI Studio & Multilingual AI Speech App",
    description:
      "Hands-on certification building and deploying apps with Google AI Studio and multilingual speech capabilities.",
    issuer: "GUVI x HCL",
    date: "March 2026",
    meta: "Google AI • Speech App",
    imageSrc:
      "HCL GUVVI.jpeg",
  },
  {
    id: 5,
    title: "Career Skills in Software Development",
    description:
      "Foundational certification covering essential career skills and best practices in software development.",
    issuer: "LinkedIn Learning",
    date: "October 2024",
    meta: "Career Skills • Dev",
    imageSrc:
      "Linkedin Learning.jpeg",
  },

  {
    id: 6,
    title: "AI Fluency : Framework and Foundation",
    description:
      "Foundational certification covering essential career skills and best practices in software development.",
    issuer: "LinkedIn Learning",
    date: "October 2024",
    meta: "Career Skills • Dev",
    imageSrc:
      "AI fluency frame works.jpeg",
  },
];

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="relative min-h-[100dvh] min-h-screen flex items-center py-16 sm:py-24"
    >
      <div className="section-container w-full">
        {/* Section header */}
        <Reveal>
          <span className="section-label">Certifications</span>
          <h2 className="section-title mt-1">Credentials & learning</h2>
        </Reveal>

        {/* FocusRail Carousel */}
        <Reveal delay={0.15}>
          <div className="mt-12">
            <FocusRail
              items={CERTIFICATIONS}
              autoPlay={false}
              loop={true}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

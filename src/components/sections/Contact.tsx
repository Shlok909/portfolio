"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Code2, Globe, MapPin } from "lucide-react";
import Reveal from "@/components/Reveal";
import Footer from "@/components/Footer";
import { staggerContainer, fadeInUp } from "@/lib/animations";

type ContactLink = {
  icon: React.ReactNode;
  label: string;
  href?: string;
  isExternal?: boolean;
};

const CONTACTS: ContactLink[] = [
  {
    icon: <Mail size={16} />,
    label: "shloksane11@gmail.com",
    href: "mailto:shloksane11@gmail.com",
  },
  {
    icon: <Phone size={16} />,
    label: "+91-8421366648",
    href: "tel:+918421366648",
  },
  {
    icon: <Code2 size={16} />,
    label: "github.com/Shlok909",
    href: "https://github.com/Shlok909",
    isExternal: true,
  },
  {
    icon: <Globe size={16} />,
    label: "linkedin.com/in/shlok-sane-902a613b9",
    href: "https://linkedin.com/in/shlok-sane-902a613b9",
    isExternal: true,
  },
  {
    icon: <MapPin size={16} />,
    label: "Nagpur, Maharashtra, India",
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative min-h-[100dvh] min-h-screen flex flex-col justify-center py-16 sm:py-24"
    >
      {/* Main contact content */}
      <div className="section-container w-full flex-1 flex items-center">
        <div className="w-full max-w-3xl mx-auto text-center">
          {/* Section header */}
          <Reveal>
            <span className="section-label !text-accent-purple">Get in Touch</span>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-tight mt-2">
              Let&apos;s build something
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-[520px] font-body text-base leading-relaxed text-accent-purple sm:text-lg">
              Open to full-stack and AI application development internships.
              Reach out directly or find me on GitHub and LinkedIn.
            </p>
          </Reveal>

          {/* Contact links */}
          <Reveal delay={0.3}>
            <motion.div
              className="mt-10 flex flex-wrap justify-center gap-2 sm:gap-3"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {CONTACTS.map((contact) => {
                const Tag = contact.href ? "a" : "span";
                const extraProps = contact.href
                  ? {
                      href: contact.href,
                      ...(contact.isExternal
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {}),
                    }
                  : {};

                return (
                  <motion.div key={contact.label} variants={fadeInUp} className="flex-shrink max-w-full">
                    <Tag
                      {...extraProps}
                      className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-accent-purple/45 px-3 py-2 font-mono text-[10px] text-accent-purple transition-all duration-200 hover:border-accent-purple hover:bg-accent-purple hover:text-black focus-visible:ring-2 focus-visible:ring-accent-purple focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:gap-2 sm:px-5 sm:py-2.5 sm:text-xs"
                    >
                      <span className="shrink-0" aria-hidden="true">{contact.icon}</span>
                      <span className="truncate min-w-0">{contact.label}</span>
                    </Tag>
                  </motion.div>
                );
              })}
            </motion.div>
          </Reveal>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-16">
        <Footer />
      </div>
    </section>
  );
}

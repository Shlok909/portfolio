"use client";
import React from "react";
import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import {
  FooterBackgroundGradient,
  TextHoverEffect,
} from "@/components/ui/hover-footer";

export default function Footer() {
  const contactInfo = [
    {
      icon: <Mail size={18} className="text-black" />,
      text: "shloksane11@gmail.com",
      href: "mailto:shloksane11@gmail.com",
    },
    {
      icon: <Phone size={18} className="text-black" />,
      text: "+91-8421366648",
      href: "tel:+918421366648",
    },
    {
      icon: <MapPin size={18} className="text-black" />,
      text: "Nagpur, Maharashtra, India",
    },
  ];

  const socialLinks = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      label: "GitHub",
      href: "https://github.com/Shlok909",
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      label: "LinkedIn",
      href: "https://linkedin.com/in/shlok-sane-902a613b9",
    },
  ];

  const quickLinks = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Certifications", href: "#certifications" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="relative m-3 overflow-hidden rounded-3xl border border-white/35 bg-white/[0.12] shadow-lg shadow-black/10 backdrop-blur-xl sm:m-6 lg:m-8">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-8 sm:py-10 lg:px-14 lg:py-14 z-40 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-8 lg:gap-16 pb-8 lg:pb-12">
          {/* Brand section */}
          <div className="flex flex-col space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center">
              <span className="text-text-primary text-2xl sm:text-3xl font-bold font-display">
                Shlok
              </span>
            </div>
            <p className="text-sm leading-relaxed text-accent-purple">
              Full-stack developer building AI-integrated web applications with
              Next.js, React, and Firebase.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-text-primary text-base sm:text-lg font-semibold mb-4 sm:mb-6 font-display">
              Quick Links
            </h4>
            <ul className="space-y-2.5 sm:space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="inline-block py-1 font-body text-sm text-accent-purple transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact section */}
          <div className="sm:col-span-2 lg:col-span-2">
            <h4 className="text-text-primary text-base sm:text-lg font-semibold mb-4 sm:mb-6 font-display">
              Contact
            </h4>
            <ul className="space-y-3 sm:space-y-4">
              {contactInfo.map((item, i) => (
                <li key={i} className="flex items-center space-x-3">
                  <span className="shrink-0">{item.icon}</span>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="break-all font-mono text-xs text-accent-purple transition-colors hover:text-white sm:text-sm"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span className="font-mono text-xs text-accent-purple sm:text-sm">
                      {item.text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="border-t border-white/[0.06] my-8" />

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0">
          {/* Social icons */}
          <div className="flex space-x-6 text-black">
            {socialLinks.map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="transition-colors hover:text-accent-purple"
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-center font-mono text-xs text-accent-purple/70 md:text-left">
            &copy; {new Date().getFullYear()} Shlok Sane &mdash; Built with
            Next.js, Framer Motion &amp; Lenis.
          </p>
        </div>
      </div>

      {/* Text hover effect */}
      <div className="lg:flex hidden h-[30rem] -mt-52 -mb-36">
        <TextHoverEffect text="SLOK" className="z-50" />
      </div>

      <FooterBackgroundGradient />
    </footer>
  );
}

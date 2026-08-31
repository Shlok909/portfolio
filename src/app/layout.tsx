import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import "@/styles/globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shlok Sane — Full-Stack Developer",
  description:
    "Portfolio of Shlok Sane — building AI-integrated web applications, from voice-to-website generators to conversational assistants. BCA student shipping real products with Next.js, React, Firebase, and AI APIs.",
  keywords: [
    "portfolio",
    "full-stack developer",
    "AI applications",
    "Next.js",
    "React",
    "voice-AI",
    "web development",
  ],
  openGraph: {
    title: "Shlok Sane — Full-Stack Developer",
    description:
      "Building AI-integrated web applications — from voice-to-website generators to conversational assistants.",
    type: "website",
    locale: "en_US",
    siteName: "Shlok Sane Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shlok Sane — Full-Stack Developer",
    description:
      "Building AI-integrated web applications — from voice-to-website generators to conversational assistants.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="relative min-h-screen bg-background text-text-primary font-body antialiased">
        <SmoothScrollProvider>
          <Navbar />
          <main className="relative">{children}</main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

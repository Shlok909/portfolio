import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Certifications from "@/components/sections/Certifications";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="relative isolate">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-20 bg-[url('/mobbackground.png')] bg-cover bg-center bg-fixed bg-no-repeat md:bg-[url('/background.png')] md:bg-[position:23%_center]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-black/20"
        />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />
      </div>
    </>
  );
}

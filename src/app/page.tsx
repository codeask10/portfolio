"use client";

import BackgroundBlobs from "@/components/ui/BackgroundBlobs";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Internship from "@/components/sections/Internship";
import FeatureHighlights from "@/components/sections/FeatureHighlights";
import Projects from "@/components/sections/Projects";
import Testimonials from "@/components/sections/Testimonials";
import FeedbackForm from "@/components/sections/FeedbackForm";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="noise-overlay">
      <BackgroundBlobs />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Internship />
        <FeatureHighlights />
        <Projects />
        <Testimonials />
        <FeedbackForm />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

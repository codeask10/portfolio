"use client";

import { motion, type Variants } from "framer-motion";
import { personalInfo } from "@/data/portfolioConfig";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center justify-center px-4 md:px-6 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] rounded-full bg-accent/12 blur-[120px]" />
        <div className="absolute top-1/2 left-1/3 w-[350px] h-[350px] rounded-full bg-purple-500/8 blur-[100px]" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-3xl text-center"
      >
        <motion.div variants={item} className="mb-3">
          <span className="glass-tag inline-block px-4 py-1.5 text-xs rounded-full">
            {personalInfo.role}
          </span>
        </motion.div>

        <motion.h1
          variants={item}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.15] text-foreground"
        >
          Hi, I&apos;m{" "}
          <span className="gradient-text">{personalInfo.name}</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-4 text-sm md:text-base text-muted max-w-xl mx-auto leading-relaxed"
        >
          {personalInfo.description}
        </motion.p>

        <motion.div
          variants={item}
          className="mt-7 flex flex-col sm:flex-row gap-3 justify-center"
        >
          <a
            href="#experience"
            className="px-6 py-2.5 rounded-full bg-accent/90 text-white text-sm font-medium hover:bg-accent hover:shadow-[0_0_24px_rgba(99,102,241,0.25)] transition-all duration-300"
          >
            View My Work
          </a>
          <a
            href={personalInfo.resumeUrl}
            download
            className="glass-btn px-6 py-2.5 rounded-full text-foreground text-sm font-medium"
          >
            Download Resume
          </a>
        </motion.div>

        <motion.div
          variants={item}
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-4 h-7 rounded-full flex items-start justify-center p-1"
            style={{ border: "1.5px solid var(--border-subtle)" }}
          >
            <motion.div className="w-0.5 h-1.5 rounded-full bg-muted" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

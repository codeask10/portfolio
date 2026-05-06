"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform, useSpring, type Variants } from "framer-motion";
import profileImg from "@/assets/SaquibProfile.jpg";
import { personalInfo } from "@/data/portfolioConfig";
import { useContactModal } from "@/hooks/useContactModal";

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.09, delayChildren: 0.2 } },
};

const reveal: Variants = {
  hidden: { opacity: 0, y: 30, clipPath: "inset(0 0 100% 0)" },
  show: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const ORBIT_DURATION = 22;

const orbitSkills = [
  { name: "React",      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",              angle: 0   },
  { name: "JavaScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",   angle: 45  },
  { name: "TypeScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",   angle: 90  },
  { name: "HTML5",      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",             angle: 135 },
  { name: "CSS3",       src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",               angle: 180 },
  { name: "Node.js",    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",           angle: 225 },
  { name: "Git",        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",                 angle: 270 },
  { name: "Tailwind",   src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", angle: 315 },
];

const stats = [
  { value: "1.5+", label: "Yrs Exp" },
  { value: "37+",  label: "Storefronts" },
  { value: "2M+",  label: "Users" },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { open: openContact } = useContactModal();

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const spring = { stiffness: 70, damping: 18, mass: 1 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [7, -7]), spring);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-7, 7]), spring);

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - r.left) / r.width);
    mouseY.set((e.clientY - r.top) / r.height);
  };

  const onMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative min-h-[92vh] flex items-center justify-center px-4 md:px-8 overflow-hidden"
    >
      {/* Dot grid */}
      <div className="hero-grid absolute inset-0 pointer-events-none" />

      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[300px] rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute top-1/2 right-1/4 w-[320px] h-[320px] rounded-full bg-purple-500/8 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center py-24 lg:py-0">

        {/* ── LEFT: Content ── */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1"
        >
          {/* Role badge */}
          <motion.div variants={reveal} className="mb-5">
            <span className="glass-tag inline-flex items-center gap-2 px-4 py-1.5 text-xs rounded-full">
              <span className="status-dot" />
              {personalInfo.role}
            </span>
          </motion.div>

          {/* Greeting */}
          <motion.p variants={reveal} className="text-base text-muted mb-1 font-medium">
            Hi, I&apos;m
          </motion.p>

          {/* Name — clip-path reveal */}
          <div className="overflow-hidden">
            <motion.h1
              variants={reveal}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] font-bold tracking-tight leading-[1.1] gradient-text"
            >
              {personalInfo.name}
            </motion.h1>
          </div>

          <motion.p variants={reveal} className="mt-4 text-sm md:text-base text-muted max-w-lg leading-relaxed">
            {personalInfo.tagline}
          </motion.p>

          <motion.p
            variants={reveal}
            className="mt-2 text-xs md:text-sm max-w-lg leading-relaxed"
            style={{ color: "var(--muted)", opacity: 0.65 }}
          >
            {personalInfo.description}
          </motion.p>

          {/* Stats */}
          <motion.div variants={reveal} className="mt-6 flex gap-8">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-xl font-bold gradient-text">{s.value}</div>
                <div className="text-[11px] text-muted mt-0.5 tracking-wide uppercase">{s.label}</div>
              </div>
            ))}
          </motion.div>
          <motion.div variants={reveal} className="mt-7 flex flex-col sm:flex-row gap-3">
            <a href="#experience" className="hero-cta-primary px-6 py-2.5 rounded-full text-white text-sm font-medium">
              View My Work
            </a>
            <button
              onClick={openContact}
              className="glass-btn px-6 py-2.5 rounded-full text-foreground text-sm font-medium"
            >
              Get In Touch
            </button>
          </motion.div>

          {/* Social */}
          <motion.div variants={reveal} className="mt-5 flex gap-3">
            <a href={personalInfo.social.github} target="_blank" rel="noopener noreferrer" className="glass-btn p-2.5 rounded-full" aria-label="GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px] text-muted-strong">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </a>
            <a href={personalInfo.social.linkedin} target="_blank" rel="noopener noreferrer" className="glass-btn p-2.5 rounded-full" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px] text-muted-strong">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </motion.div>
        </motion.div>

        {/* ── RIGHT: Orbit with 3D mouse parallax ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.82 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ rotateX, rotateY, transformPerspective: 900 }}
          className="flex justify-center items-center order-1 lg:order-2"
        >
          <div className="orbit-group" style={{ width: 300, height: 300 }}>

            {/* Outer dashed orbit path */}
            <div className="absolute inset-0 rounded-full" style={{ border: "1px dashed rgba(255,255,255,0.05)" }} />

            {/* Inner decorative ring */}
            <div className="absolute rounded-full" style={{ inset: "15%", border: "1px dashed rgba(99,102,241,0.1)" }} />

            {/* Spinning conic gradient border around profile */}
            <div className="profile-conic-ring absolute" style={{ inset: "21%" }} />

            {/* Profile glow */}
            <div
              className="absolute rounded-full profile-glow"
              style={{
                inset: "25%",
                background: "radial-gradient(circle, rgba(99,102,241,0.55) 0%, transparent 70%)",
                filter: "blur(18px)",
              }}
            />

            {/* Profile image */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute rounded-full overflow-hidden"
              style={{
                inset: "26%",
                border: "2px solid rgba(255,255,255,0.13)",
                boxShadow: "0 0 0 1px rgba(99,102,241,0.15), 0 8px 32px rgba(0,0,0,0.4)",
              }}
            >
              <Image
                src={profileImg}
                alt="Saquib Khan"
                fill
                sizes="148px"
                className="object-cover object-top"
                priority
              />
            </motion.div>

            {/* Orbiting skill icons */}
            {orbitSkills.map((skill) => (
              <div
                key={skill.name}
                className="orbit-arm"
                style={{ animationDelay: `${-(skill.angle / 360) * ORBIT_DURATION}s` }}
              >
                <div className="orbit-icon" title={skill.name}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={skill.src} alt={skill.name} width={18} height={18} loading="lazy" />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 select-none"
      >
        <span
          className="text-[9px] font-medium tracking-[0.3em] uppercase"
          style={{ color: "var(--muted)", opacity: 0.45 }}
        >
          Scroll
        </span>
        <div className="flex flex-col items-center" style={{ gap: "2px" }}>
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.12, 0.85, 0.12] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.22,
                repeatDelay: 0.2,
              }}
            >
              <svg
                width="12"
                height="7"
                viewBox="0 0 12 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ color: "var(--fg)", display: "block" }}
              >
                <path d="M1 1l5 5 5-5" />
              </svg>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

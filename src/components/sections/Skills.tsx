"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import { skillsData } from "@/data/portfolioConfig";

const marqueeIcons = [
  { name: "React",       src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "TypeScript",  src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "JavaScript",  src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "Next.js",     src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "Node.js",     src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Tailwind",    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "HTML5",       src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS3",        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "Git",         src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Redux",       src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" },
  { name: "MongoDB",     src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Figma",       src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
];

const categoryAccents: Record<string, string> = {
  Frontend:      "rgba(99,102,241,0.08)",
  Styling:       "rgba(167,139,250,0.08)",
  "State & APIs":"rgba(6,182,212,0.08)",
  Performance:   "rgba(236,72,153,0.08)",
  Architecture:  "rgba(249,115,22,0.08)",
  Tools:         "rgba(34,197,94,0.08)",
};
const categoryBorderAccents: Record<string, string> = {
  Frontend:      "rgba(99,102,241,0.16)",
  Styling:       "rgba(167,139,250,0.16)",
  "State & APIs":"rgba(6,182,212,0.16)",
  Performance:   "rgba(236,72,153,0.16)",
  Architecture:  "rgba(249,115,22,0.16)",
  Tools:         "rgba(34,197,94,0.16)",
};
const categoryTextAccents: Record<string, string> = {
  Frontend:      "#818CF8",
  Styling:       "#A78BFA",
  "State & APIs":"#22D3EE",
  Performance:   "#F472B6",
  Architecture:  "#FB923C",
  Tools:         "#4ADE80",
};

export default function Skills() {
  const doubled = [...marqueeIcons, ...marqueeIcons];

  return (
    <AnimatedSection id="skills" className="relative py-12 md:py-16 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="Skills & Technologies"
          subtitle="Tools and technologies I work with daily"
        />

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {skillsData.map((category, catIdx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: catIdx * 0.07, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -3 }}
              className="glass-card p-4"
            >
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-1 h-4 rounded-full"
                    style={{ background: categoryTextAccents[category.title] ?? "var(--accent-fg)" }}
                  />
                  <h3
                    className="text-[11px] font-semibold uppercase tracking-wider"
                    style={{ color: categoryTextAccents[category.title] ?? "var(--accent-fg)" }}
                  >
                    {category.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {category.skills.map((skill, i) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.22, delay: catIdx * 0.06 + i * 0.03 }}
                      whileHover={{ scale: 1.07 }}
                      className="skill-pill px-2.5 py-1 text-fluid-xs rounded-md"
                      style={{
                        background: categoryAccents[category.title],
                        borderColor: categoryBorderAccents[category.title],
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Icon marquee */}
        <div className="mt-10 overflow-hidden relative">
          <div
            className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, var(--bg), transparent)" }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, var(--bg), transparent)" }}
          />
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            className="flex gap-5 whitespace-nowrap"
          >
            {doubled.map((icon, i) => (
              <div
                key={`${icon.name}-${i}`}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl shrink-0"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={icon.src} alt={icon.name} width={18} height={18} loading="lazy" />
                <span className="text-fluid-xs text-muted font-medium">{icon.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}

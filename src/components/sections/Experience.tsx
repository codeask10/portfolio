"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import TechTag from "@/components/ui/TechTag";
import { experienceData, type ExperienceProject } from "@/data/portfolioConfig";

const categoryColors: Record<string, string> = {
  "Theme Development": "bg-indigo-500/15 text-indigo-400 border-indigo-500/25",
  "Feature Enhancement": "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  "Performance Optimization": "bg-amber-500/15 text-amber-400 border-amber-500/25",
  "Support / Bug Fix": "bg-rose-500/15 text-rose-400 border-rose-500/25",
};

function ExperienceCard({
  project,
  index,
}: Readonly<{
  project: ExperienceProject;
  index: number;
}>) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="min-w-[280px] md:min-w-[340px] max-w-[340px] snap-start shrink-0"
    >
      <motion.div
        whileHover={{ y: -4, scale: 1.015 }}
        transition={{ duration: 0.2 }}
        className="glass-card h-full overflow-hidden"
      >
        {/* Image preview */}
        <div className="relative h-36 overflow-hidden" style={{ background: "var(--surface)" }}>
          {project.image ? (
            <motion.img
              src={project.image}
              alt={project.title}
              animate={{ scale: hovered ? 1.04 : 1 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <motion.div
                animate={{ scale: hovered ? 1.08 : 1, opacity: hovered ? 0.7 : 0.35 }}
                transition={{ duration: 0.25 }}
                className="text-center"
              >
                <div className="w-12 h-12 mx-auto mb-2 rounded-xl flex items-center justify-center" style={{ background: "rgba(99,102,241,0.1)" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-light">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
                <span className="text-[10px] text-muted">Preview coming soon</span>
              </motion.div>
            </div>
          )}

          <div className="absolute top-2 left-2">
            <span
              className={`px-2 py-0.5 text-[10px] rounded-full border backdrop-blur-md ${categoryColors[project.category] ?? ""}`}
              style={{ background: "rgba(0,0,0,0.3)" }}
            >
              {project.category}
            </span>
          </div>

          {project.demoUrl && (
            <motion.a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={{ opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: "rgba(2,6,23,0.6)", backdropFilter: "blur(6px)" }}
            >
              <span className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-accent/90 text-white text-xs font-medium">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                View Demo
              </span>
            </motion.a>
          )}
        </div>

        {/* Content */}
        <div className="relative z-10 p-4">
          <h3 className="text-sm font-semibold text-foreground mb-1">{project.title}</h3>
          <p className="text-xs text-muted leading-relaxed mb-2.5 line-clamp-2">
            {project.description}
          </p>

          <ul className="space-y-0.5 mb-3">
            {project.highlights.slice(0, 2).map((h) => (
              <li key={h} className="text-xs text-muted flex items-start gap-1.5">
                <span className="text-accent mt-0.5 shrink-0 text-[10px]">&#9656;</span>
                <span className="line-clamp-1">{h}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-1">
            {project.techStack.map((tech, j) => (
              <TechTag key={tech} label={tech} index={j} />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Experience() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: scrollContainerRef });
  const progressWidth = useTransform(scrollXProgress, [0, 1], ["0%", "100%"]);

  return (
    <AnimatedSection id="experience" className="relative py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <SectionHeading
          title="Latest Work at Zopping"
          subtitle={`${experienceData.role} · ${experienceData.duration}`}
        />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-muted text-sm mb-5 max-w-2xl"
        >
          {experienceData.description}
        </motion.p>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto px-4 md:px-[max(1rem,calc((100vw-72rem)/2+1.5rem))] pb-4 snap-x snap-mandatory scrollbar-none"
      >
        {experienceData.projects.map((project, i) => (
          <ExperienceCard key={project.title} project={project} index={i} />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 mt-3">
        <div className="h-0.5 rounded-full overflow-hidden" style={{ background: "var(--border-subtle)" }}>
          <motion.div style={{ width: progressWidth }} className="h-full rounded-full bg-gradient-to-r from-accent to-accent-light" />
        </div>
        <p className="text-[10px] text-muted mt-1.5 opacity-50">Scroll to explore &rarr;</p>
      </div>
    </AnimatedSection>
  );
}

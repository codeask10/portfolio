"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import TechTag from "@/components/ui/TechTag";
import { internshipData } from "@/data/portfolioConfig";

export default function Internship() {
  return (
    <AnimatedSection className="relative py-12 md:py-16 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title={`Internship — ${internshipData.company}`}
          subtitle={`${internshipData.role} · ${internshipData.duration}`}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {internshipData.projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Card className="h-full flex flex-col">
                <h3 className="text-sm font-semibold text-foreground mb-1.5">{project.title}</h3>
                <p className="text-muted text-xs leading-relaxed mb-3 flex-1 line-clamp-3">
                  {project.description}
                </p>
                <div className="mb-3 p-2.5 rounded-lg" style={{ background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.1)" }}>
                  <span className="text-[10px] uppercase tracking-wider text-accent-light font-medium">
                    Key Learning
                  </span>
                  <p className="text-xs text-muted mt-0.5 line-clamp-2">
                    {project.keyLearning}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1">
                  {project.techStack.map((tech, j) => (
                    <TechTag key={tech} label={tech} index={j} />
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

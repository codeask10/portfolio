"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import { skillsData } from "@/data/portfolioConfig";

export default function Skills() {
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: catIdx * 0.06 }}
              whileHover={{ y: -2 }}
              className="glass-card p-4"
            >
              <div className="relative z-10">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-accent-light mb-3">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {category.skills.map((skill, i) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.25, delay: catIdx * 0.06 + i * 0.03 }}
                      whileHover={{ scale: 1.06 }}
                      className="skill-pill px-2.5 py-1 text-xs rounded-md"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Marquee */}
        <div className="mt-8 overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, var(--bg), transparent)" }} />
          <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, var(--bg), transparent)" }} />
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex gap-6 whitespace-nowrap"
          >
            {[skillsData, skillsData].flatMap((group, copyIdx) =>
              group.flatMap((cat) =>
                cat.skills.map((skill) => (
                  <span key={`${copyIdx}-${cat.title}-${skill}`} className="text-lg font-bold" style={{ color: "var(--border-subtle)" }}>
                    {skill}
                  </span>
                ))
              )
            )}
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}

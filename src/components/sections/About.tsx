"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import { aboutData } from "@/data/portfolioConfig";

export default function About() {
  return (
    <AnimatedSection id="about" className="relative py-12 md:py-16 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="About Me"
          subtitle="A snapshot of my journey and what drives me"
        />

        <div className="grid md:grid-cols-5 gap-6 md:gap-8 items-start">
          <div className="md:col-span-3 space-y-3">
            {aboutData.summary.map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="text-muted leading-relaxed text-sm"
              >
                {text}
              </motion.p>
            ))}
          </div>

          <div className="md:col-span-2 grid grid-cols-2 gap-3">
            {aboutData.highlights.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -2, scale: 1.02 }}
                className="glass-card p-4 text-center"
              >
                <div className="relative z-10">
                  <div className="text-xl md:text-2xl font-bold gradient-text">
                    {item.value}
                  </div>
                  <div className="mt-1 text-xs text-muted">
                    {item.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

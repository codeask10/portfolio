"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import { aboutData } from "@/data/portfolioConfig";

const highlightColors = [
  {
    bg: "rgba(99,102,241,0.08)",
    border: "rgba(99,102,241,0.16)",
    text: "#818CF8",
  },
  {
    bg: "rgba(167,139,250,0.08)",
    border: "rgba(167,139,250,0.16)",
    text: "#A78BFA",
  },
  {
    bg: "rgba(236,72,153,0.08)",
    border: "rgba(236,72,153,0.16)",
    text: "#F472B6",
  },
  {
    bg: "rgba(6,182,212,0.08)",
    border: "rgba(6,182,212,0.16)",
    text: "#22D3EE",
  },
];

export default function About() {
  return (
    <AnimatedSection
      id="about"
      className="relative py-12 md:py-16 px-4 md:px-6"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="About Me"
          subtitle="A snapshot of my journey and what drives me"
        />

        <div className="grid md:grid-cols-5 gap-6 md:gap-10 items-start">
          <div className="md:col-span-3 space-y-3.5">
            {aboutData.summary.map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.45,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-muted text-fluid-sm leading-relaxed"
              >
                {i === 0 && (
                  <span
                    className="font-semibold mr-1"
                    style={{ color: "var(--fg)" }}
                  >
                    Frontend Engineer
                  </span>
                )}
                {text}
              </motion.p>
            ))}
          </div>

          <div className="md:col-span-2 grid grid-cols-2 gap-3">
            {aboutData.highlights.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.45,
                  delay: i * 0.09,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -3, scale: 1.03 }}
                className="glass-card p-4 text-center"
                style={{
                  background: highlightColors[i].bg,
                  borderColor: highlightColors[i].border,
                }}
              >
                <div className="relative z-10">
                  <div
                    className="text-fluid-xl font-bold mb-1"
                    style={{ color: highlightColors[i].text }}
                  >
                    {item.value}
                  </div>
                  <div className="text-fluid-xs text-muted">{item.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

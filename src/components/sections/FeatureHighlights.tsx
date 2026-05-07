"use client";

import { ReactElement } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import { featureHighlights } from "@/data/portfolioConfig";

const icons: Record<string, ReactElement> = {
  store: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  settings: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  ),
  zap: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  layers: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
};

const iconColors = [
  "rgba(99,102,241,0.12)",
  "rgba(167,139,250,0.12)",
  "rgba(236,72,153,0.12)",
  "rgba(6,182,212,0.12)",
];
const iconBorders = [
  "rgba(99,102,241,0.2)",
  "rgba(167,139,250,0.2)",
  "rgba(236,72,153,0.2)",
  "rgba(6,182,212,0.2)",
];
const iconTextColors = ["#818CF8", "#A78BFA", "#F472B6", "#22D3EE"];

export default function FeatureHighlights() {
  return (
    <AnimatedSection className="relative py-12 md:py-16 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="What I've Built"
          subtitle="Key systems and features I've designed and shipped"
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
          {featureHighlights.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="glass-card group p-5"
            >
              <div className="relative z-10">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200"
                  style={{
                    background: iconColors[i],
                    border: `1px solid ${iconBorders[i]}`,
                    color: iconTextColors[i],
                  }}
                >
                  {icons[feature.icon]}
                </div>
                <h3 className="text-fluid-sm font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted text-fluid-xs leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

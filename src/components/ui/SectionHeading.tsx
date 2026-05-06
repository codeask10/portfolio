"use client";

import { motion } from "framer-motion";

interface Props {
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ title, subtitle }: Readonly<Props>) {
  return (
    <div className="mb-6 md:mb-8">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="text-fluid-2xl font-bold tracking-tight text-foreground"
      >
        {title}
      </motion.h2>

      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "left" }}
        className="section-accent-line"
      />

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mt-3 text-muted text-fluid-sm max-w-xl leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

"use client";

import { motion } from "framer-motion";

interface Props {
  label: string;
  index?: number;
}

export default function TechTag({ label, index = 0 }: Readonly<Props>) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.25, delay: index * 0.03 }}
      className="glass-tag inline-block px-2.5 py-0.5 text-xs rounded-full"
    >
      {label}
    </motion.span>
  );
}

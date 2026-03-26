"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = "", hover = true }: Props) {
  return (
    <motion.div
      whileHover={hover ? { y: -3, scale: 1.015 } : undefined}
      transition={{ duration: 0.2 }}
      className={`glass-card p-4 ${className}`}
    >
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

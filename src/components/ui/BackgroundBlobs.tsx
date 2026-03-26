"use client";

import { motion } from "framer-motion";

export default function BackgroundBlobs() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Primary blobs */}
      <div className="blob-blue absolute w-[500px] h-[500px] -top-32 -left-32 rounded-full" />
      <div className="blob-purple absolute w-[450px] h-[450px] top-1/4 right-0 rounded-full" />
      <div className="blob-pink absolute w-[400px] h-[400px] bottom-1/3 left-1/4 rounded-full" />
      <div className="blob-indigo absolute w-[350px] h-[350px] bottom-0 right-1/4 rounded-full" />

      {/* Extra subtle blobs for depth */}
      <motion.div
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="blob-blue absolute w-[300px] h-[300px] top-2/3 left-2/3 rounded-full"
      />
      <motion.div
        animate={{ x: [0, -30, 40, 0], y: [0, 40, -20, 0] }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        className="blob-purple absolute w-[350px] h-[350px] top-1/2 left-0 rounded-full"
      />
    </div>
  );
}

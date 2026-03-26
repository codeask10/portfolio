"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

interface Props {
  message: string;
  type: "success" | "error";
  visible: boolean;
  onClose: () => void;
}

export default function Toast({ message, type, visible, onClose }: Readonly<Props>) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 40, x: "-50%" }}
          className="fixed bottom-6 left-1/2 z-[60] px-5 py-3 rounded-xl text-sm font-medium shadow-lg"
          style={{
            background:
              type === "success"
                ? "rgba(16,185,129,0.15)"
                : "rgba(239,68,68,0.15)",
            border: `1px solid ${
              type === "success"
                ? "rgba(16,185,129,0.25)"
                : "rgba(239,68,68,0.25)"
            }`,
            color: type === "success" ? "#34D399" : "#F87171",
            backdropFilter: "blur(12px)",
          }}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

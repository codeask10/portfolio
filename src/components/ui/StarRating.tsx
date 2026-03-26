"use client";

import { motion } from "framer-motion";

interface Props {
  value: number;
  onChange?: (val: number) => void;
  readonly?: boolean;
  size?: number;
}

export default function StarRating({
  value,
  onChange,
  readonly = false,
  size = 20,
}: Readonly<Props>) {
  return (
    <div className="flex gap-0.5" role="radiogroup" aria-label="Rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.button
          key={star}
          type="button"
          whileHover={readonly ? undefined : { scale: 1.2 }}
          whileTap={readonly ? undefined : { scale: 0.9 }}
          onClick={() => onChange?.(star)}
          disabled={readonly}
          className={`transition-colors duration-150 ${
            readonly ? "cursor-default" : "cursor-pointer"
          }`}
          aria-label={`${star} star${star > 1 ? "s" : ""}`}
        >
          <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill={star <= value ? "#FBBF24" : "none"}
            stroke={star <= value ? "#FBBF24" : "var(--muted)"}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </motion.button>
      ))}
    </div>
  );
}

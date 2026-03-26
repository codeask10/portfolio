"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import StarRating from "@/components/ui/StarRating";
import type { FeedbackRow } from "@/lib/googleSheets";

function FeedbackCard({ fb, index }: Readonly<{ fb: FeedbackRow; index: number }>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -3, scale: 1.015 }}
      className="glass-card p-4 h-full"
    >
      <div className="relative z-10 flex flex-col h-full">
        {/* Header: Avatar + Info */}
        <div className="flex items-center gap-3 mb-3">
          {fb.imageUrl ? (
            <img
              src={fb.imageUrl}
              alt={fb.name}
              className="w-10 h-10 rounded-full object-cover border border-white/10"
            />
          ) : (
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-accent-light"
              style={{ background: "rgba(99,102,241,0.15)" }}
            >
              {fb.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>
          )}
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">{fb.name}</p>
            <p className="text-[11px] text-muted truncate">
              {fb.designation} at {fb.company}
              {fb.exCompany && (
                <span className="text-muted opacity-60"> · Ex-{fb.exCompany}</span>
              )}
            </p>
          </div>
        </div>

        {/* Rating */}
        <div className="mb-2">
          <StarRating value={fb.rating} readonly size={14} />
        </div>

        {/* Message */}
        <p className="text-xs text-muted leading-relaxed flex-1 line-clamp-4">
          &ldquo;{fb.message}&rdquo;
        </p>
      </div>
    </motion.div>
  );
}

// Fallback data when Google Sheets isn't configured
const fallbackFeedbacks: FeedbackRow[] = [
  {
    name: "Rahul Sharma",
    designation: "Tech Lead",
    company: "Zopping",
    exCompany: "",
    rating: 5,
    imageUrl: "",
    message:
      "Outstanding work on the theme system. The multi-tenant architecture is clean, well-structured, and easy to extend. A pleasure to work with.",
    status: "approved",
    timestamp: "",
  },
  {
    name: "Priya Patel",
    designation: "Product Manager",
    company: "Zopping",
    exCompany: "Flipkart",
    rating: 5,
    imageUrl: "",
    message:
      "Delivered features consistently ahead of schedule. The search and filter system improved our merchant experience significantly.",
    status: "approved",
    timestamp: "",
  },
  {
    name: "Amit Kumar",
    designation: "Senior Developer",
    company: "MountBlue",
    exCompany: "",
    rating: 4,
    imageUrl: "",
    message:
      "Quick learner who picks up new concepts fast. Built solid projects during the internship with clean code and good testing practices.",
    status: "approved",
    timestamp: "",
  },
];

export default function Testimonials() {
  const [feedbacks, setFeedbacks] = useState<FeedbackRow[]>(fallbackFeedbacks);

  useEffect(() => {
    fetch("/api/feedbacks")
      .then((r) => r.json())
      .then((data) => {
        if (data.feedbacks && data.feedbacks.length > 0) {
          setFeedbacks(data.feedbacks);
        }
      })
      .catch(() => {
        // Keep fallback data
      });
  }, []);

  if (feedbacks.length === 0) return null;

  return (
    <AnimatedSection className="relative py-12 md:py-16 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="What People Say"
          subtitle="Feedback from colleagues and collaborators"
        />

        {/* Desktop: grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {feedbacks.map((fb, i) => (
            <FeedbackCard key={`${fb.name}-${fb.timestamp}`} fb={fb} index={i} />
          ))}
        </div>

        {/* Mobile: horizontal scroll */}
        <div className="sm:hidden -mx-4 px-4">
          <div className="flex gap-3 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-none">
            {feedbacks.map((fb, i) => (
              <div
                key={`${fb.name}-${fb.timestamp}`}
                className="min-w-[260px] max-w-[280px] snap-start shrink-0"
              >
                <FeedbackCard fb={fb} index={i} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

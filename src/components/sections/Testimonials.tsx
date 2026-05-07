"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import StarRating from "@/components/ui/StarRating";
import type { FeedbackRow } from "@/lib/googleSheets";

const avatarColors = [
  { bg: "rgba(99,102,241,0.15)",  text: "#818CF8" },
  { bg: "rgba(167,139,250,0.15)", text: "#A78BFA" },
  { bg: "rgba(236,72,153,0.15)",  text: "#F472B6" },
  { bg: "rgba(6,182,212,0.15)",   text: "#22D3EE" },
  { bg: "rgba(249,115,22,0.15)",  text: "#FB923C" },
  { bg: "rgba(34,197,94,0.15)",   text: "#4ADE80" },
];

function SkeletonCard() {
  return (
    <div className="glass-card p-4 animate-pulse">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-white/10 shrink-0" />
        <div className="flex-1 space-y-1.5">
          <div className="h-3 rounded bg-white/10 w-3/5" />
          <div className="h-2.5 rounded bg-white/8 w-4/5" />
        </div>
      </div>
      <div className="flex gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-3 h-3 rounded bg-white/10" />
        ))}
      </div>
      <div className="space-y-1.5">
        <div className="h-2.5 rounded bg-white/8 w-full" />
        <div className="h-2.5 rounded bg-white/8 w-11/12" />
        <div className="h-2.5 rounded bg-white/8 w-3/4" />
      </div>
    </div>
  );
}

function FeedbackCard({ fb, index }: Readonly<{ fb: FeedbackRow; index: number }>) {
  const color = avatarColors[index % avatarColors.length];
  const initials = fb.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -4, scale: 1.015 }}
      className="glass-card p-4 h-full flex flex-col"
    >
      {/* Quote icon */}
      <svg
        className="mb-3 opacity-20"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        style={{ color: color.text }}
      >
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>

      {/* Message */}
      <p className="text-xs text-muted leading-relaxed flex-1 mb-4 line-clamp-4">
        {fb.message}
      </p>

      {/* Rating */}
      <div className="mb-3">
        <StarRating value={fb.rating} readonly size={13} />
      </div>

      {/* Divider */}
      <div className="border-t border-white/6 pt-3">
        <div className="flex items-center gap-3">
          {fb.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={fb.imageUrl}
              alt={fb.name}
              className="w-9 h-9 rounded-full object-cover border border-white/10 shrink-0"
            />
          ) : (
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
              style={{ background: color.bg, color: color.text }}
            >
              {initials}
            </div>
          )}
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">{fb.name}</p>
            <p className="text-[11px] text-muted truncate">
              {fb.designation}
              {fb.company && <span> · {fb.company}</span>}
              {fb.exCompany && (
                <span className="opacity-60"> · Ex-{fb.exCompany}</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

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
  const [feedbacks, setFeedbacks] = useState<FeedbackRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [fromSheets, setFromSheets] = useState(false);

  useEffect(() => {
    fetch("/api/feedbacks")
      .then((r) => r.json())
      .then((data) => {
        if (data.feedbacks && data.feedbacks.length > 0) {
          setFeedbacks(data.feedbacks);
          setFromSheets(true);
        } else {
          setFeedbacks(fallbackFeedbacks);
        }
      })
      .catch(() => setFeedbacks(fallbackFeedbacks))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AnimatedSection id="testimonials" className="relative py-12 md:py-16 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-6 md:mb-8">
          <SectionHeading
            title="What People Say"
            subtitle="Feedback from colleagues and collaborators"
          />
          {fromSheets && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium shrink-0 mt-1"
              style={{
                background: "rgba(34,197,94,0.08)",
                border: "1px solid rgba(34,197,94,0.18)",
                color: "#4ADE80",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]" />
              Live from Google Sheets
            </motion.div>
          )}
        </div>

        {loading ? (
          <>
            {/* Loading skeletons — desktop */}
            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
            {/* Loading skeletons — mobile */}
            <div className="sm:hidden flex gap-3 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-none -mx-4 px-4">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="min-w-[260px] max-w-[280px] snap-start shrink-0">
                  <SkeletonCard />
                </div>
              ))}
            </div>
          </>
        ) : feedbacks.length === 0 ? null : (
          <>
            {/* Desktop grid */}
            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {feedbacks.map((fb, i) => (
                <FeedbackCard key={`${fb.name}-${i}`} fb={fb} index={i} />
              ))}
            </div>

            {/* Mobile horizontal scroll */}
            <div className="sm:hidden -mx-4 px-4">
              <div className="flex gap-3 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-none">
                {feedbacks.map((fb, i) => (
                  <div
                    key={`${fb.name}-${i}`}
                    className="min-w-[270px] max-w-[285px] snap-start shrink-0"
                  >
                    <FeedbackCard fb={fb} index={i} />
                  </div>
                ))}
              </div>
            </div>

            {/* Summary row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="mt-6 flex items-center justify-center gap-2 text-xs text-muted"
            >
              <StarRating
                value={Math.round(feedbacks.reduce((s, f) => s + f.rating, 0) / feedbacks.length)}
                readonly
                size={13}
              />
              <span>
                {(feedbacks.reduce((s, f) => s + f.rating, 0) / feedbacks.length).toFixed(1)} avg
                · {feedbacks.length} review{feedbacks.length !== 1 ? "s" : ""}
              </span>
            </motion.div>
          </>
        )}
      </div>
    </AnimatedSection>
  );
}

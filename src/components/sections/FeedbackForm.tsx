"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import StarRating from "@/components/ui/StarRating";
import Toast from "@/components/ui/Toast";

interface FormData {
  name: string;
  designation: string;
  company: string;
  exCompany: string;
  rating: number;
  message: string;
  image: string;
}

const initial: FormData = {
  name: "",
  designation: "",
  company: "",
  exCompany: "",
  rating: 5,
  message: "",
  image: "",
};

export default function FeedbackForm() {
  const [form, setForm] = useState<FormData>(initial);
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" as "success" | "error" });
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setToast({ visible: true, message: "Image must be under 5MB", type: "error" });
      return;
    }

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setToast({ visible: true, message: "Only JPEG, PNG, or WebP allowed", type: "error" });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setForm((f) => ({ ...f, image: base64 }));
      setPreview(base64);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setToast({ visible: true, message: data.error ?? "Something went wrong", type: "error" });
      } else {
        setToast({ visible: true, message: "Feedback submitted! It will appear after approval.", type: "success" });
        setForm(initial);
        setPreview(null);
        if (fileRef.current) fileRef.current.value = "";
      }
    } catch {
      setToast({ visible: true, message: "Network error. Please try again.", type: "error" });
    } finally {
      setSending(false);
    }
  };

  const set = (key: keyof FormData, val: string | number) =>
    setForm((f) => ({ ...f, [key]: val }));

  return (
    <AnimatedSection id="feedback" className="relative py-12 md:py-16 px-4 md:px-6">
      <div className="max-w-2xl mx-auto">
        <SectionHeading
          title="Leave Your Feedback"
          subtitle="Your words help me grow. Feedback will be visible after approval."
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-card p-5"
        >
          <form onSubmit={handleSubmit} className="relative z-10 space-y-3.5">
            {/* Row 1: Name + Designation */}
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="fb-name" className="block text-xs font-medium text-foreground mb-1.5">
                  Name *
                </label>
                <input
                  id="fb-name"
                  type="text"
                  required
                  minLength={2}
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  className="glass-input w-full px-3.5 py-2.5 rounded-lg text-sm"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="fb-designation" className="block text-xs font-medium text-foreground mb-1.5">
                  Designation *
                </label>
                <input
                  id="fb-designation"
                  type="text"
                  required
                  value={form.designation}
                  onChange={(e) => set("designation", e.target.value)}
                  className="glass-input w-full px-3.5 py-2.5 rounded-lg text-sm"
                  placeholder="Senior Engineer"
                />
              </div>
            </div>

            {/* Row 2: Company + Ex-Company */}
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="fb-company" className="block text-xs font-medium text-foreground mb-1.5">
                  Current Company *
                </label>
                <input
                  id="fb-company"
                  type="text"
                  required
                  value={form.company}
                  onChange={(e) => set("company", e.target.value)}
                  className="glass-input w-full px-3.5 py-2.5 rounded-lg text-sm"
                  placeholder="Google"
                />
              </div>
              <div>
                <label htmlFor="fb-excompany" className="block text-xs font-medium text-foreground mb-1.5">
                  Ex-Company <span className="text-muted">(optional)</span>
                </label>
                <input
                  id="fb-excompany"
                  type="text"
                  value={form.exCompany}
                  onChange={(e) => set("exCompany", e.target.value)}
                  className="glass-input w-full px-3.5 py-2.5 rounded-lg text-sm"
                  placeholder="Meta"
                />
              </div>
            </div>

            {/* Row 3: Rating + Image */}
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">
                  Rating *
                </label>
                <StarRating value={form.rating} onChange={(v) => set("rating", v)} />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-medium text-foreground mb-1.5">
                  Profile Photo <span className="text-muted">(optional)</span>
                </label>
                <div className="flex items-center gap-3">
                  {preview && (
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-9 h-9 rounded-full object-cover border border-white/10"
                    />
                  )}
                  <label className="glass-btn px-3.5 py-2 rounded-lg text-xs font-medium cursor-pointer">
                    {preview ? "Change" : "Upload"}
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                  {preview && (
                    <button
                      type="button"
                      onClick={() => {
                        setPreview(null);
                        setForm((f) => ({ ...f, image: "" }));
                        if (fileRef.current) fileRef.current.value = "";
                      }}
                      className="text-xs text-muted hover:text-foreground transition-colors"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="fb-message" className="block text-xs font-medium text-foreground mb-1.5">
                Your Feedback *
              </label>
              <textarea
                id="fb-message"
                required
                minLength={10}
                rows={3}
                value={form.message}
                onChange={(e) => set("message", e.target.value)}
                className="glass-input w-full px-3.5 py-2.5 rounded-lg text-sm resize-none"
                placeholder="Share your experience working with me..."
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={sending}
              className="w-full py-2.5 rounded-lg bg-accent/90 text-white text-sm font-medium hover:bg-accent hover:shadow-[0_0_24px_rgba(99,102,241,0.2)] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {sending && (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              )}
              {sending ? "Submitting..." : "Submit Feedback"}
            </button>
          </form>
        </motion.div>
      </div>

      <Toast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onClose={() => setToast((t) => ({ ...t, visible: false }))}
      />
    </AnimatedSection>
  );
}

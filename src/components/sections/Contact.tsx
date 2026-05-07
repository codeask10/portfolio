"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import Toast from "@/components/ui/Toast";
import { personalInfo } from "@/data/portfolioConfig";
import { useContactModal } from "@/hooks/useContactModal";

const initForm = { name: "", email: "", message: "" };

function ContactModal() {
  const { isOpen, close } = useContactModal();
  const [form, setForm] = useState(initForm);
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success" as "success" | "error",
  });

  // ESC to close
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, close]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const set = (key: keyof typeof form, val: string) =>
    setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = useCallback(
    async (e: React.SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSending(true);
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        if (!res.ok) {
          setToast({ visible: true, message: data.error ?? "Something went wrong.", type: "error" });
        } else {
          setToast({ visible: true, message: "Message sent! I'll get back to you soon.", type: "success" });
          setForm(initForm);
          setTimeout(close, 1800);
        }
      } catch {
        setToast({ visible: true, message: "Network error. Please try again.", type: "error" });
      } finally {
        setSending(false);
      }
    },
    [form, close]
  );

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="contact-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={close}
              className="fixed inset-0 z-50"
              style={{
                background: "rgba(7,9,18,0.82)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
              }}
            />

            {/* Modal panel */}
            <motion.div
              key="contact-modal"
              initial={{ opacity: 0, scale: 0.93, y: 28 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 28 }}
              transition={{ type: "spring", stiffness: 340, damping: 28 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div
                className="glass-card w-full max-w-md pointer-events-auto"
                style={{ padding: "1.75rem" }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <h2 className="text-lg font-bold text-foreground">Get In Touch</h2>
                    <p className="text-[11px] text-muted mt-0.5">
                      I reply within 24 hours.
                    </p>
                  </div>
                  <button
                    onClick={close}
                    aria-label="Close modal"
                    className="p-1.5 rounded-lg text-muted hover:text-foreground transition-colors"
                    style={{ background: "var(--surface)" }}
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-medium text-foreground mb-1.5"
                      >
                        Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        minLength={2}
                        value={form.name}
                        onChange={(e) => set("name", e.target.value)}
                        className="glass-input w-full px-3.5 py-2.5 rounded-lg text-sm"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-medium text-foreground mb-1.5"
                      >
                        Email *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => set("email", e.target.value)}
                        className="glass-input w-full px-3.5 py-2.5 rounded-lg text-sm"
                        placeholder="you@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-medium text-foreground mb-1.5"
                    >
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      minLength={10}
                      rows={4}
                      value={form.message}
                      onChange={(e) => set("message", e.target.value)}
                      className="glass-input w-full px-3.5 py-2.5 rounded-lg text-sm resize-none"
                      placeholder="Tell me about your project or opportunity..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full py-2.5 rounded-lg bg-accent/90 text-white text-sm font-medium hover:bg-accent hover:shadow-[0_0_24px_rgba(99,102,241,0.2)] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {sending && (
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                    )}
                    {sending ? "Sending…" : "Send Message"}
                  </button>
                </form>

                {/* Quick links */}
                <div className="mt-4 pt-4 flex items-center justify-center gap-5" style={{ borderTop: "1px solid var(--border-subtle)" }}>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="flex items-center gap-1.5 text-[11px] text-muted hover:text-foreground transition-colors"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    {personalInfo.email}
                  </a>
                  <a
                    href={personalInfo.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[11px] text-muted hover:text-foreground transition-colors"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Toast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onClose={() => setToast((t) => ({ ...t, visible: false }))}
      />
    </>
  );
}

export default function Contact() {
  const { open } = useContactModal();

  return (
    <>
      <AnimatedSection id="contact" className="relative py-12 md:py-16 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Left: info */}
            <div>
              <SectionHeading
                title="Get In Touch"
                subtitle="Have a project in mind or just want to say hello?"
              />

              <div className="space-y-3 mt-5">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-2.5 text-sm text-muted hover:text-foreground transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  {personalInfo.email}
                </a>
                <a
                  href={personalInfo.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-muted hover:text-foreground transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
                <a
                  href={personalInfo.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-muted hover:text-foreground transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={open}
                  className="hero-cta-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-medium"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  Send Message
                </button>
                <a
                  href={personalInfo.resumeUrl}
                  download
                  className="glass-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-foreground text-sm font-medium"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download Resume
                </a>
              </div>
            </div>

            {/* Right: availability card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card p-6"
            >
              <div className="relative z-10 text-center">
                <div
                  className="w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center"
                  style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.18)" }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#818CF8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                  </svg>
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">Open to Opportunities</h3>
                <p className="text-xs text-muted leading-relaxed mb-5">
                  Whether it&apos;s a full-time role, freelance project, or a quick chat about
                  tech — I&apos;m happy to connect.
                </p>
                <div
                  className="flex items-center justify-center gap-2 text-[11px] font-medium mb-5 py-1.5 px-3 rounded-full mx-auto w-fit"
                  style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.16)", color: "#4ADE80" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
                  Available for new projects
                </div>
                <button
                  onClick={open}
                  className="w-full py-2.5 rounded-xl bg-accent/90 text-white text-sm font-medium hover:bg-accent hover:shadow-[0_0_24px_rgba(99,102,241,0.25)] transition-all duration-300"
                >
                  Start a Conversation
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Modal — rendered once, visible from anywhere via context */}
      <ContactModal />
    </>
  );
}

import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Frontend Engineer | React & Next.js Developer Portfolio",
  description:
    "Portfolio of a Frontend Engineer (SDE-1) with 1.5+ years of experience building high-performance e-commerce platforms, multi-tenant theme systems, and config-driven UIs using React, Next.js, TypeScript, and Tailwind CSS.",
  keywords: [
    "Frontend Engineer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Tailwind CSS",
    "E-Commerce",
    "SDE-1",
    "Web Developer Portfolio",
    "JavaScript Developer",
  ],
  openGraph: {
    title: "Frontend Engineer | React & Next.js Developer Portfolio",
    description:
      "Building fast, scalable, and pixel-perfect web experiences with React, Next.js, and TypeScript.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}

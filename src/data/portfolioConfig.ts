export const personalInfo = {
  name: "Annajmussaquib Khan",
  role: "Frontend Engineer (SDE-1)",
  tagline: "Building scalable, high-performance multi-tenant web applications",
  description:
    "Frontend Engineer with 1.5+ years of experience building production-grade multi-tenant e-commerce platforms serving 37+ storefronts and 2M+ users. Specialized in React, Next.js, performance optimization, and reusable UI architecture.",
  email: "annajmussaquib123@gmail.com",
  phone: "+91 7880539033",
  location: "Bengaluru, India",
  resumeUrl: "/resume.pdf",
  social: {
    github: "https://github.com/codeask10",
    linkedin: "https://linkedin.com/in/annajmussaquib-khan-22a27918b",
  },
};

export const aboutData = {
  summary: [
    "Frontend Engineer at Zopping working on a multi-tenant e-commerce platform powering 37+ storefronts and 2M+ users.",
    "Built 3 production-grade themes end-to-end with reusable architecture and dynamic theming.",
    "Strong in performance optimization, debugging production issues, and scalable UI systems.",
  ],
  highlights: [
    { label: "Experience", value: "1.5+ Years" },
    { label: "Storefronts", value: "37+" },
    { label: "Users Served", value: "2M+" },
    { label: "Themes Built", value: "3" },
  ],
};

export const skillsData = [
  {
    title: "Frontend",
    skills: ["React.js", "Next.js", "JavaScript (ES6+)", "TypeScript"],
  },
  {
    title: "Styling",
    skills: ["Tailwind CSS", "styled-components", "CSS Grid", "Flexbox"],
  },
  {
    title: "State & APIs",
    skills: ["Redux", "Context API", "REST APIs", "Axios"],
  },
  {
    title: "Performance",
    skills: [
      "Lazy Loading",
      "Code Splitting",
      "Intersection Observer",
      "Web Optimization",
    ],
  },
  {
    title: "Architecture",
    skills: [
      "Multi-Tenant Systems",
      "Config-driven UI",
      "Reusable Components",
      "E-Commerce Platforms",
    ],
  },
  {
    title: "Tools",
    skills: ["Git", "GitHub", "GitLab", "Chrome DevTools", "Figma"],
  },
];

export type ExperienceProject = {
  title: string;
  role: string;
  category: string;
  description: string;
  techStack: string[];
  highlights: string[];
  image?: string;
  demoUrl?: string;
};

export const experienceData: {
  company: string;
  role: string;
  duration: string;
  description: string;
  projects: ExperienceProject[];
} = {
  company: "Zopping",
  role: "Frontend Engineer (SDE-1)",
  duration: "Dec 2024 – Present",
  description:
    "Working on a scalable multi-tenant e-commerce platform supporting 37+ storefronts and 2M+ users.",
  projects: [
    {
      title: "Zavora Theme",
      role: "Frontend Engineer",
      category: "Theme Development",
      description:
        "Built a production-grade e-commerce theme from Figma to deployment with reusable components and dynamic layouts.",
      techStack: ["React.js", "Next.js", "styled-components", "REST APIs"],
      highlights: [
        "Developed 60+ reusable components",
        "Implemented dynamic product grid with filters",
        "Handled large dataset rendering efficiently",
        "Ensured responsive and cross-browser UI",
      ],
    },
    {
      title: "NutriHarvest Theme",
      role: "Frontend Engineer",
      category: "Theme Development",
      description:
        "Developed a scalable storefront theme using reusable component architecture.",
      techStack: ["React.js", "Tailwind CSS", "REST APIs"],
      highlights: [
        "Improved development speed using reusable architecture",
        "Built modular UI components",
      ],
    },
    {
      title: "Harvestly Theme",
      role: "Frontend Engineer",
      category: "Theme Development",
      description:
        "Built a modern e-commerce theme with responsive and category-driven UI.",
      techStack: ["React.js", "CSS", "Responsive Design"],
      highlights: [
        "Implemented mobile-first responsive layouts",
        "Optimized UI performance",
      ],
    },
    {
      title: "Real-time Website Builder",
      role: "Frontend Engineer",
      category: "Feature Enhancement",
      description:
        "Developed a config-driven website builder with real-time preview and draft/publish workflow.",
      techStack: ["React.js", "State Management", "REST APIs"],
      highlights: [
        "Reduced support effort by 45%",
        "Built dynamic UI rendering system",
      ],
    },
    {
      title: "Search & Filter System",
      role: "Frontend Engineer",
      category: "Feature Enhancement",
      description:
        "Built scalable search and filtering system for storefronts.",
      techStack: ["React.js", "Debouncing", "REST APIs"],
      highlights: [
        "Implemented debounced search",
        "Built multi-filter system",
      ],
    },
    {
      title: "Performance Optimization",
      role: "Frontend Engineer",
      category: "Performance Optimization",
      description:
        "Optimized frontend performance using modern techniques.",
      techStack: ["Lazy Loading", "Code Splitting"],
      highlights: [
        "Improved load speed by 15%",
        "Reduced unnecessary re-renders",
      ],
    },
    {
      title: "Production Support & Debugging",
      role: "Frontend Engineer",
      category: "Support / Bug Fix",
      description:
        "Resolved production issues and improved platform stability.",
      techStack: ["Debugging", "DevTools"],
      highlights: [
        "Resolved 50+ production issues",
        "Fixed iOS Safari issues",
      ],
    },
  ],
};

export const internshipData = {
  company: "MountBlue Technologies",
  role: "Software Engineering Intern",
  duration: "Aug 2024 – Nov 2024",
  description:
    "Worked on frontend and full-stack projects focusing on React and APIs.",
  projects: [
    {
      title: "UserHub",
      description:
        "Built a full-stack user management system with search and filtering.",
      techStack: ["React.js", "Redux", "Node.js", "MongoDB"],
      keyLearning: "Full-stack development and API design",
    },
    {
      title: "Trello Clone",
      description:
        "Developed task management app using React and Redux.",
      techStack: ["React.js", "Redux"],
      keyLearning: "State management",
    },
    {
      title: "Rest Countries App",
      description:
        "Built API-driven React app with filtering and sorting.",
      techStack: ["React.js", "Tailwind CSS"],
      keyLearning: "API integration",
    },
  ],
};

export const personalProjects = [
  {
    title: "Personal Portfolio Website",
    description:
      "Modern portfolio built with Next.js, animations, and config-driven UI with feedback system integration.",
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
    ],
    github: "https://github.com/codeask10/portfolio",
    live: "",
    featured: true,
  },
  {
    title: "Expense Tracker (Full Stack)",
    description:
      "Full-stack expense tracker with idempotent APIs, filtering, analytics, and optimized data handling.",
    techStack: [
      "React.js",
      "TypeScript",
      "Node.js",
      "MongoDB",
      "React Query",
    ],
    github: "https://github.com/codeask10/expense-tracker",
    featured: true,
  },
];

export const featureHighlights = [
  {
    title: "Multi-Tenant Architecture",
    description:
      "Built scalable frontend supporting 37+ storefronts from a single codebase.",
    icon: "store",
  },
  {
    title: "Website Builder System",
    description:
      "Developed real-time configurable UI system with preview workflow.",
    icon: "settings",
  },
  {
    title: "Performance Optimization",
    description:
      "Improved UX and load speed using modern optimization techniques.",
    icon: "zap",
  },
];

export const navItems = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Reviews", href: "#testimonials" },
  { label: "Feedback", href: "#feedback" },
  { label: "Contact", href: "#contact" },
];

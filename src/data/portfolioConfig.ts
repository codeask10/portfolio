export const personalInfo = {
  name: "Your Name",
  role: "Frontend Engineer (SDE-1)",
  tagline: "Building fast, scalable, and pixel-perfect web experiences",
  description:
    "Frontend Engineer with 1.5+ years of experience building high-performance e-commerce platforms, multi-tenant theme systems, and config-driven UIs. Passionate about creating seamless user experiences that drive business growth.",
  email: "your.email@example.com",
  phone: "+91-XXXXXXXXXX",
  location: "India",
  resumeUrl: "/resume.pdf",
  social: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    twitter: "https://twitter.com/yourusername",
  },
};

export const aboutData = {
  summary: [
    "1.5+ years of hands-on experience as a Frontend Engineer at Zopping, building production-grade e-commerce platforms serving thousands of merchants.",
    "Completed an intensive internship at MountBlue Technologies, mastering full-stack fundamentals and modern development workflows.",
    "Specialized in React/Next.js ecosystems, performance optimization, and building scalable multi-tenant architectures.",
  ],
  highlights: [
    { label: "Experience", value: "1.5+ Years" },
    { label: "Projects Shipped", value: "15+" },
    { label: "Themes Built", value: "3" },
    { label: "Platform", value: "E-Commerce" },
  ],
};

export type SkillCategory = {
  title: string;
  skills: string[];
};

export const skillsData: SkillCategory[] = [
  {
    title: "Frontend",
    skills: ["React.js", "Next.js", "JavaScript (ES6+)", "TypeScript"],
  },
  {
    title: "Styling",
    skills: ["Tailwind CSS", "styled-components", "CSS Grid", "Flexbox"],
  },
  {
    title: "Performance",
    skills: [
      "Code Splitting",
      "Lazy Loading",
      "Intersection Observer",
      "Web Vitals",
    ],
  },
  {
    title: "Architecture",
    skills: [
      "Multi-Tenant Systems",
      "Config-driven UI",
      "E-Commerce Platforms",
      "Component Libraries",
    ],
  },
  {
    title: "Tools & Others",
    skills: [
      "REST APIs",
      "Axios",
      "Git",
      "Jest",
      "SEO",
      "Accessibility",
      "Figma",
    ],
  },
];

export type ExperienceProject = {
  title: string;
  role: string;
  category:
    | "Theme Development"
    | "Feature Enhancement"
    | "Performance Optimization"
    | "Support / Bug Fix";
  description: string;
  techStack: string[];
  highlights: string[];
  image?: string;
  demoUrl?: string;
};

export const experienceData = {
  company: "Zopping",
  role: "Frontend Engineer (SDE-1)",
  duration: "2024 – Present",
  description:
    "Building and maintaining e-commerce storefront themes and features for a multi-tenant SaaS platform used by thousands of merchants.",
  projects: [
    {
      title: "NutriHarvest Theme",
      role: "Frontend Engineer (SDE-1)",
      category: "Theme Development" as const,
      description:
        "Built a complete e-commerce storefront theme from scratch, featuring a modern design system with reusable components, responsive layouts, and optimized product showcases.",
      techStack: ["React.js", "Tailwind CSS", "REST APIs", "Config-driven UI"],
      highlights: [
        "Designed and implemented 20+ reusable components",
        "Built responsive product grid with advanced filtering",
        "Implemented lazy loading for optimal performance",
      ],
    },
    {
      title: "Zavora Theme",
      role: "Frontend Engineer (SDE-1)",
      category: "Theme Development" as const,
      description:
        "Developed a premium, conversion-focused storefront theme with advanced product display, mega menus, and seamless checkout flow.",
      techStack: [
        "React.js",
        "styled-components",
        "Intersection Observer",
        "SEO",
      ],
      highlights: [
        "Built mega menu navigation system",
        "Implemented infinite scroll product listing",
        "Optimized Core Web Vitals scores",
      ],
    },
    {
      title: "Harvestly Theme",
      role: "Frontend Engineer (SDE-1)",
      category: "Theme Development" as const,
      description:
        "Created an organic/fresh produce themed storefront with category-driven navigation and location-based delivery UI.",
      techStack: [
        "React.js",
        "CSS Modules",
        "REST APIs",
        "Responsive Design",
      ],
      highlights: [
        "Category-driven product navigation",
        "Location-based delivery slot UI",
        "Mobile-first responsive design",
      ],
    },
    {
      title: "Search & Filter System",
      role: "Frontend Engineer (SDE-1)",
      category: "Feature Enhancement" as const,
      description:
        "Implemented a comprehensive search and filtering system across all themes, with debounced search, multi-faceted filters, and URL-synced state.",
      techStack: ["React.js", "URL State Management", "Debouncing", "REST APIs"],
      highlights: [
        "Debounced search with instant results",
        "Multi-faceted filter system",
        "URL-synced filter state for shareability",
      ],
    },
    {
      title: "Performance Optimization",
      role: "Frontend Engineer (SDE-1)",
      category: "Performance Optimization" as const,
      description:
        "Led performance optimization initiatives across all themes — implementing code splitting, lazy loading, image optimization, and reducing bundle sizes.",
      techStack: [
        "Code Splitting",
        "Lazy Loading",
        "Intersection Observer",
        "Web Vitals",
      ],
      highlights: [
        "Reduced initial bundle size by 40%",
        "Improved LCP scores across all themes",
        "Implemented progressive image loading",
      ],
    },
    {
      title: "Bug Fixes & Support",
      role: "Frontend Engineer (SDE-1)",
      category: "Support / Bug Fix" as const,
      description:
        "Resolved critical production bugs, handled cross-browser compatibility issues, and provided ongoing support for merchant-reported issues.",
      techStack: ["Debugging", "Cross-browser Testing", "Git", "REST APIs"],
      highlights: [
        "Resolved 50+ production bugs",
        "Improved cross-browser compatibility",
        "Reduced merchant support tickets by 30%",
      ],
    },
  ] satisfies ExperienceProject[],
};

export type InternshipProject = {
  title: string;
  description: string;
  techStack: string[];
  keyLearning: string;
};

export const internshipData = {
  company: "MountBlue Technologies",
  role: "Trainee / Intern",
  duration: "2023 – 2024",
  description:
    "Intensive bootcamp-style internship focused on mastering full-stack web development through project-based learning.",
  projects: [
    {
      title: "E-Commerce Application",
      description:
        "Built a full-featured e-commerce application with product listings, cart management, user authentication, and payment integration.",
      techStack: ["React.js", "Node.js", "Express", "MongoDB"],
      keyLearning:
        "End-to-end application architecture and state management patterns",
    },
    {
      title: "Task Management Dashboard",
      description:
        "Created a Trello-inspired task management tool with drag-and-drop, real-time updates, and team collaboration features.",
      techStack: ["React.js", "Firebase", "CSS Grid", "Drag & Drop API"],
      keyLearning:
        "Real-time data synchronization and complex UI interactions",
    },
    {
      title: "Blog Platform",
      description:
        "Developed a blogging platform with markdown support, comment system, user profiles, and SEO optimization.",
      techStack: ["Next.js", "PostgreSQL", "Tailwind CSS", "Markdown"],
      keyLearning: "Server-side rendering, SEO best practices, and database design",
    },
  ] satisfies InternshipProject[],
};

export type PersonalProject = {
  title: string;
  description: string;
  techStack: string[];
  github: string;
  live?: string;
  image?: string;
  featured?: boolean;
};

export const personalProjects: PersonalProject[] = [
  {
    title: "Portfolio Website",
    description:
      "A modern, animated portfolio website built with Next.js, Framer Motion, and Tailwind CSS. Features smooth scroll animations, dark/light mode, and config-driven content.",
    techStack: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
    github: "https://github.com/yourusername/portfolio",
    live: "https://yourportfolio.vercel.app",
    featured: true,
  },
  {
    title: "Weather Dashboard",
    description:
      "A real-time weather dashboard with location search, 7-day forecasts, and interactive charts. Integrates with OpenWeather API.",
    techStack: ["React.js", "Chart.js", "OpenWeather API", "Tailwind CSS"],
    github: "https://github.com/yourusername/weather-app",
    live: "https://weather-app.vercel.app",
    featured: true,
  },
  {
    title: "URL Shortener",
    description:
      "A URL shortener service with custom aliases, click analytics, and QR code generation. Built with a REST API backend.",
    techStack: ["Next.js", "Node.js", "MongoDB", "Tailwind CSS"],
    github: "https://github.com/yourusername/url-shortener",
    featured: false,
  },
];

export type FeatureHighlight = {
  title: string;
  description: string;
  icon: string;
};

export const featureHighlights: FeatureHighlight[] = [
  {
    title: "Multi-Tenant E-Commerce Platform",
    description:
      "Built and maintained a multi-tenant SaaS platform powering thousands of online stores with shared infrastructure and customizable themes.",
    icon: "store",
  },
  {
    title: "Search Optimization System",
    description:
      "Designed a performant search system with debounced queries, faceted filtering, and URL-synced state for seamless user experience.",
    icon: "search",
  },
  {
    title: "Product Grid System",
    description:
      "Created a flexible, responsive product grid with infinite scroll, lazy loading, and multiple layout options across all themes.",
    icon: "grid",
  },
  {
    title: "Admin CMS Integration",
    description:
      "Integrated config-driven UI systems allowing merchants to customize their storefront layout, colors, and content without code changes.",
    icon: "settings",
  },
];

export const navItems = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Feedback", href: "#feedback" },
  { label: "Contact", href: "#contact" },
];

export const site = {
  name: "Valentine Onyenwe",
  role: "Product Architect & Full-Stack Engineer",
  tagline:
    "I architect and build enterprise software systems — from product strategy to production.",
  email: "valibrwn@gmail.com",
  timezone: "WAT (UTC+1)",
  availability: "Available for new engagements",
  calendarUrl: "https://cal.com",
  linkedin: "https://linkedin.com",
  github: "https://github.com",
  /** Add path e.g. "/resume.pdf" when ready — file goes in /public */
  resumeUrl: "",
  location: "Global · Remote-first",
  /** Used for automatic sunrise/sunset theme (Lagos, WAT). */
  coordinates: { lat: 6.5244, lng: 3.3792 },
} as const;

export const abstract = {
  title: "Abstract",
  paragraphs: [
    "Software is not a collection of features — it is a system of decisions. Every architecture choice, every API boundary, and every interface detail reflects how an engineer thinks about complexity, scale, and the people who depend on the product.",
    "I operate at the intersection of product architecture and full-stack engineering. I design systems that enterprises can trust, build them with precision, and deliver experiences that feel effortless to the people who use them.",
    "My work spans real estate marketplaces, global e-commerce platforms, and enterprise-grade applications — always with the same standard: clarity in architecture, excellence in execution, and measurable impact in production.",
  ],
} as const;

export const capabilities = [
  {
    id: "platform-architecture",
    title: "Platform Architecture",
    description:
      "Designing scalable system boundaries, service layers, and data flows that support growth without accumulating technical debt.",
  },
  {
    id: "full-stack-engineering",
    title: "Full-Stack Product Engineering",
    description:
      "End-to-end delivery from database schema to pixel-perfect interfaces — unified vision across the entire stack.",
  },
  {
    id: "enterprise-integration",
    title: "Enterprise Integration & APIs",
    description:
      "RESTful and event-driven architectures, authentication systems, and third-party integrations built for reliability.",
  },
  {
    id: "performance",
    title: "Performance & Optimization",
    description:
      "Core Web Vitals, query optimization, caching strategies, and bundle architecture that keeps systems fast at scale.",
  },
  {
    id: "ux-engineering",
    title: "UI/UX Engineering",
    description:
      "Translating design intent into production interfaces with accessibility, responsiveness, and motion that serves purpose.",
  },
  {
    id: "technical-strategy",
    title: "Technical Strategy & Consulting",
    description:
      "Architecture reviews, technology selection, delivery planning, and engineering leadership for complex initiatives.",
  },
] as const;

export const approach = [
  {
    step: "01",
    title: "Discover",
    description:
      "Understand the business context, constraints, and success criteria before writing a single line of code. Map the problem space.",
  },
  {
    step: "02",
    title: "Architect",
    description:
      "Define system boundaries, data models, and technical decisions with documented trade-offs. Build for change, not just for today.",
  },
  {
    step: "03",
    title: "Ship",
    description:
      "Execute with precision — clean code, rigorous testing, performance budgets, and iterative delivery that reaches production with confidence.",
  },
] as const;

export const trustSignals = {
  sectors: ["Real Estate Tech", "E-Commerce", "Enterprise SaaS", "FinTech"],
  metrics: [
    { label: "Flagship platforms delivered", value: "2+" },
    { label: "Production systems", value: "100%" },
    { label: "Full-stack ownership", value: "End-to-end" },
  ],
} as const;

export const expertise = {
  title: "Technical Expertise",
  subtitle: "Engineering depth organized by domain — not a list of buzzwords.",
  categories: [
    {
      name: "Architecture & Systems",
      items: [
        "System design & microservices",
        "API design (REST, GraphQL)",
        "Event-driven architecture",
        "Database modeling & optimization",
        "Caching & CDN strategy",
      ],
    },
    {
      name: "Frontend Engineering",
      items: [
        "React / Next.js ecosystem",
        "TypeScript & type-safe systems",
        "Responsive & adaptive design",
        "Performance optimization",
        "Accessibility (WCAG 2.2 AA)",
      ],
    },
    {
      name: "Backend & Infrastructure",
      items: [
        "Node.js & server-side runtime",
        "Authentication & authorization",
        "Secure API development",
        "Cloud deployment & CI/CD",
        "Monitoring & observability",
      ],
    },
    {
      name: "Product & Delivery",
      items: [
        "Technical requirements analysis",
        "Agile delivery & sprint planning",
        "Code review & engineering standards",
        "Documentation & ADRs",
        "Cross-functional collaboration",
      ],
    },
  ],
} as const;

export const navigation = [
  { label: "Work", href: "/work" },
  { label: "Contact", href: "/contact" },
] as const;

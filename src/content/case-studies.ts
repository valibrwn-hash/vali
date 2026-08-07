export type CaseStudy = {
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  thesis: string;
  domain: string;
  role: string;
  year: string;
  tags: string[];
  links?: {
    live?: string;
    repo?: string;
  };
  context: {
    title: string;
    paragraphs: string[];
  };
  problem: {
    title: string;
    paragraphs: string[];
  };
  architecture: {
    title: string;
    description: string;
    components: { id: string; label: string; description: string }[];
  };
  decisions: {
    title: string;
    rows: {
      decision: string;
      options: string;
      choice: string;
      rationale: string;
    }[];
  };
  build: {
    title: string;
    highlights: { title: string; description: string }[];
  };
  impact: {
    title: string;
    metrics: { value: string; label: string; context: string }[];
    closing: string;
  };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "sellingnow",
    number: "01",
    title: "SellingNow",
    subtitle: "Modern Real Estate Marketplace",
    thesis:
      "A full-stack property marketplace engineered for discovery, trust, and scale.",
    domain: "Real Estate · Marketplace",
    role: "Product Architect & Full-Stack Engineer",
    year: "2025",
    tags: ["Next.js", "Full-Stack", "Marketplace", "Admin Platform"],
    links: {
      live: "https://selling-now.vercel.app",
    },
    context: {
      title: "Context",
      paragraphs: [
        "SellingNow is a modern real estate marketplace designed to connect property seekers with verified listings through an intuitive, high-performance platform. The product needed to handle complex property data, multi-role user systems, and advanced search — all while maintaining the speed and reliability expected of a production marketplace.",
        "I served as the product architect and full-stack engineer, owning the system design, backend architecture, frontend experience, admin platform, and performance strategy from initial architecture through production deployment.",
      ],
    },
    problem: {
      title: "Problem",
      paragraphs: [
        "Real estate marketplaces face a unique engineering challenge: they must present rich, structured property data through fast search experiences while supporting distinct user journeys for buyers, sellers, and administrators. Off-the-shelf solutions couldn't deliver the specific search logic, admin workflows, or performance characteristics the product required.",
        "The platform needed authenticated multi-role access, geospatial and filter-based property search, a responsive experience across all devices, an admin dashboard for listing management, and a secure backend capable of handling growth — without compromising on user experience or code quality.",
      ],
    },
    architecture: {
      title: "Architecture",
      description:
        "A layered full-stack architecture separating presentation, application logic, and data persistence — designed for independent scaling and clear ownership boundaries.",
      components: [
        {
          id: "client",
          label: "Client Layer",
          description:
            "Next.js application with server-side rendering for SEO-critical property pages and client-side interactivity for search and filtering.",
        },
        {
          id: "api",
          label: "API Gateway",
          description:
            "RESTful API layer with authentication middleware, rate limiting, and request validation — single entry point for all client operations.",
        },
        {
          id: "auth",
          label: "Auth Service",
          description:
            "Role-based authentication supporting buyers, agents, and administrators with secure session management and protected route enforcement.",
        },
        {
          id: "search",
          label: "Search Engine",
          description:
            "Advanced property search with multi-filter support, geospatial queries, full-text matching, and optimized indexing for sub-second response times.",
        },
        {
          id: "admin",
          label: "Admin Platform",
          description:
            "Dedicated admin interface for listing management, user moderation, analytics dashboards, and platform configuration.",
        },
        {
          id: "data",
          label: "Data Layer",
          description:
            "Relational database with normalized property schemas, optimized queries, connection pooling, and migration-managed schema evolution.",
        },
      ],
    },
    decisions: {
      title: "Key Decisions",
      rows: [
        {
          decision: "Rendering strategy",
          options: "Full CSR vs. SSR/SSG hybrid",
          choice: "SSR/SSG hybrid",
          rationale:
            "Property listing pages require SEO visibility for organic discovery. SSR for dynamic listings, SSG for static marketing pages — best of both performance and discoverability.",
        },
        {
          decision: "Search implementation",
          options: "Client-side filter vs. server-side indexed search",
          choice: "Server-side indexed search",
          rationale:
            "Property datasets exceed client-side filtering capacity. Server-side search with indexed fields delivers consistent sub-second results regardless of catalog size.",
        },
        {
          decision: "Admin architecture",
          options: "Shared codebase vs. separate admin app",
          choice: "Shared codebase, role-gated routes",
          rationale:
            "A unified codebase with role-based route protection reduces duplication, simplifies deployment, and maintains consistency between public and admin interfaces.",
        },
      ],
    },
    build: {
      title: "Build Highlights",
      highlights: [
        {
          title: "Property Marketplace Core",
          description:
            "Complete listing lifecycle — creation, search, detail views, and inquiry flows — with rich media support and structured property metadata.",
        },
        {
          title: "Advanced Search System",
          description:
            "Multi-dimensional filtering by location, price range, property type, amenities, and availability with real-time result updates and optimized query performance.",
        },
        {
          title: "Authentication & Authorization",
          description:
            "Secure multi-role auth with protected routes, session management, and granular permissions for buyers, agents, and platform administrators.",
        },
        {
          title: "Admin Platform",
          description:
            "Full-featured admin dashboard for listing moderation, user management, platform analytics, and operational controls — built for daily operational use.",
        },
        {
          title: "Performance Optimization",
          description:
            "Image optimization, lazy loading, query caching, and bundle splitting achieving strong Core Web Vitals scores across property-heavy pages.",
        },
        {
          title: "Secure Backend",
          description:
            "Input validation, SQL injection prevention, CORS configuration, rate limiting, and encrypted credential storage — security integrated at every layer.",
        },
      ],
    },
    impact: {
      title: "Impact",
      metrics: [
        {
          value: "Full-stack",
          label: "End-to-end ownership",
          context: "Architecture through production deployment",
        },
        {
          value: "< 2s",
          label: "Search response",
          context: "Optimized indexed queries across property catalog",
        },
        {
          value: "Multi-role",
          label: "User system",
          context: "Buyers, agents, and administrators in one platform",
        },
        {
          value: "Responsive",
          label: "Cross-device",
          context: "Intentionally designed for mobile through desktop",
        },
      ],
      closing:
        "SellingNow demonstrates the full spectrum of marketplace engineering — from architectural decisions that scale, to search systems that perform, to admin tools that operators rely on daily.",
    },
  },
  {
    slug: "dermalatey",
    number: "02",
    title: "Dermalatey",
    subtitle: "Premium Global Fashion & Lifestyle E-commerce",
    thesis:
      "An enterprise-grade e-commerce platform where luxury experience meets engineering precision.",
    domain: "Fashion · E-Commerce · Global",
    role: "Product Architect & Full-Stack Engineer",
    year: "2025",
    tags: ["E-Commerce", "Luxury UX", "Global", "Enterprise"],
    links: {
      live: "https://shopdermalatey.com",
    },
    context: {
      title: "Context",
      paragraphs: [
        "Dermalatey is a premium global fashion and lifestyle e-commerce platform built to deliver a luxury shopping experience at enterprise scale. The product targets international customers with high expectations for visual design, performance, and transactional security.",
        "As product architect and full-stack engineer, I designed the platform architecture, engineered the premium frontend experience — including hero video integration — and built the secure checkout, product catalog, and responsive systems that power the global storefront.",
      ],
    },
    problem: {
      title: "Problem",
      paragraphs: [
        "Premium e-commerce demands a fundamentally different engineering approach than standard online stores. Customers expect cinematic product presentation, seamless global checkout, and a shopping experience that feels as refined as a luxury boutique — not a generic web shop.",
        "The platform required a hero video experience for brand storytelling, a product catalog capable of handling complex variant logic (size, color, collection), secure payment processing, internationalization readiness, and responsive architecture that maintains visual integrity from mobile to large desktop displays.",
      ],
    },
    architecture: {
      title: "Architecture",
      description:
        "A commerce-focused architecture prioritizing frontend performance, transactional integrity, and content delivery — engineered for global reach and premium presentation.",
      components: [
        {
          id: "storefront",
          label: "Storefront",
          description:
            "Premium Next.js storefront with hero video, collection pages, product detail views, and cart — optimized for visual fidelity and load performance.",
        },
        {
          id: "catalog",
          label: "Product Catalog",
          description:
            "Structured product data with variant management, collection organization, inventory tracking, and media asset management.",
        },
        {
          id: "checkout",
          label: "Checkout Engine",
          description:
            "Secure checkout flow with cart persistence, address validation, payment processing integration, and order confirmation pipeline.",
        },
        {
          id: "media",
          label: "Media Delivery",
          description:
            "Optimized video and image delivery with adaptive loading, CDN integration, and format selection based on device capability and connection speed.",
        },
        {
          id: "auth-commerce",
          label: "Customer Accounts",
          description:
            "User registration, profile management, order history, and wishlist functionality with secure credential handling.",
        },
        {
          id: "api-commerce",
          label: "Commerce API",
          description:
            "Backend services for product queries, cart operations, order processing, and payment webhooks — designed for reliability and auditability.",
        },
      ],
    },
    decisions: {
      title: "Key Decisions",
      rows: [
        {
          decision: "Hero video strategy",
          options: "Autoplay video vs. user-initiated vs. optimized autoplay",
          choice: "Optimized autoplay with fallback",
          rationale:
            "Brand storytelling requires immediate visual impact. Optimized autoplay with muted default, poster frame fallback, and reduced-motion respect balances impact with accessibility and performance.",
        },
        {
          decision: "Checkout architecture",
          options: "Single-page vs. multi-step checkout",
          choice: "Multi-step with progress indicator",
          rationale:
            "Luxury purchases benefit from guided, low-anxiety checkout flows. Multi-step with clear progress reduces cart abandonment and allows validation at each stage.",
        },
        {
          decision: "Responsive strategy",
          options: "Adaptive vs. responsive with breakpoint-specific layouts",
          choice: "Responsive with intentional breakpoint layouts",
          rationale:
            "Premium fashion requires layout compositions that adapt thoughtfully — not just shrink. Dedicated layouts at key breakpoints preserve visual hierarchy and product presentation quality.",
        },
      ],
    },
    build: {
      title: "Build Highlights",
      highlights: [
        {
          title: "Luxury UI/UX",
          description:
            "Editorial product layouts, refined typography hierarchy, generous whitespace, and intentional motion that elevates the shopping experience to premium standard.",
        },
        {
          title: "Hero Video Experience",
          description:
            "Full-width cinematic hero with optimized video delivery, graceful fallback states, and performance-conscious loading that doesn't compromise first impression.",
        },
        {
          title: "Global E-Commerce Core",
          description:
            "Product catalog with variant logic, collection navigation, search, and filtering — structured for international product lines and future localization.",
        },
        {
          title: "Secure Checkout",
          description:
            "End-to-end secure checkout with encrypted transactions, input validation, order persistence, and confirmation flows built for customer trust.",
        },
        {
          title: "Responsive Architecture",
          description:
            "Breakpoint-intentional layouts ensuring the premium experience translates seamlessly from mobile shopping to large desktop browsing.",
        },
        {
          title: "Enterprise-Grade Engineering",
          description:
            "Type-safe codebase, modular component architecture, error boundaries, loading states, and production monitoring readiness throughout the stack.",
        },
      ],
    },
    impact: {
      title: "Impact",
      metrics: [
        {
          value: "Premium",
          label: "Experience tier",
          context: "Luxury-grade UI rivaling global fashion brands",
        },
        {
          value: "Global",
          label: "Platform scope",
          context: "Architecture ready for international expansion",
        },
        {
          value: "Secure",
          label: "Transaction layer",
          context: "Encrypted checkout with validation at every step",
        },
        {
          value: "Enterprise",
          label: "Engineering standard",
          context: "Production-grade patterns throughout the codebase",
        },
      ],
      closing:
        "Dermalatey proves that engineering excellence and luxury experience are not opposing forces — they are the same discipline applied with different intent.",
    },
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

export function getOtherCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug !== slug);
}

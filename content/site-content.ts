import { siteConfig } from "@/lib/site-config";
import type { LandingSiteContent } from "@/types/site";

const routeMap = {
  home: "/",
  contact: "/contact",
  demos: "/demos",
  privacy: "/privacy",
  terms: "/terms",
  startProject: "/start-a-project",
  startProjectBook: "/start-a-project/book",
  startProjectIntake: "/start-a-project/intake",
  servicesAnchor: "/#services",
  demosAnchor: "/#demos",
  aboutAnchor: "/#about",
} as const;

export const siteContent = {
  routeMap,
  externalReferences: {
    pantryApp: siteConfig.urls.externalApps.pantryApp,
    kitchenInventoryDemo: siteConfig.urls.externalApps.kitchenInventoryDemo,
    bookingsWebsiteDemo: siteConfig.urls.externalApps.bookingsWebsiteDemo,
    operationsDashboardDemo: siteConfig.urls.externalApps.operationsDashboardDemo,
  },
  navigation: {
    header: [
      { id: "work", label: "Work", href: routeMap.demosAnchor },
      { id: "services", label: "Services", href: routeMap.servicesAnchor },
      { id: "about", label: "About", href: routeMap.aboutAnchor },
      { id: "contact", label: "Contact", href: routeMap.contact },
    ],
    primaryCta: {
      label: "Start a Project",
      href: routeMap.contact,
    },
  },
  sharedLabels: {
    bookCall: "Book a Call",
    sendProjectDetails: "Send Project Details",
    exploreDemos: "Explore Our Work",
    viewServices: "View Services",
  },
  home: {
    hero: {
      eyebrow: "Custom software, real impact.",
      title: "Software built around your business.",
      body:
        "YojiLabs is a custom software and automation studio. We build tools and systems that match your workflow, automate the busywork, and help you scale with confidence.",
      primaryCta: {
        label: "Explore Our Work",
        href: routeMap.demosAnchor,
      },
      secondaryCta: {
        label: "Book a Call",
        href: routeMap.startProjectBook,
      },
      demoOrder: [
        "kitchen-inventory",
        "bookings-website",
        "operations-dashboard",
      ],
    },
    services: {
      eyebrow: "What we build",
      title: "Custom systems for how businesses operate.",
      intro:
        "From public-facing websites to internal workflow tools, we build the software layer that helps teams move faster with less manual friction.",
      cards: [
        {
          id: "custom-software",
          title: "Custom Software",
          description:
            "Web apps and internal tools built around your unique workflows.",
          supportingTopics: ["Web apps", "Internal tools", "Client portals"],
        },
        {
          id: "automation-integrations",
          title: "Automation & Integrations",
          description:
            "Connect the tools you use and automate repetitive manual work.",
          supportingTopics: ["Workflow automation", "CRM sync", "Lead routing"],
        },
        {
          id: "operations-systems",
          title: "Operations Systems",
          description:
            "Solutions for scheduling, inventory, bookings, and day-to-day operations.",
          supportingTopics: ["Scheduling", "Inventory", "Bookings"],
        },
        {
          id: "data-intelligence",
          title: "Data and Intelligence",
          description:
            "Dashboards, reporting, and AI-powered insights that help you make better decisions.",
          supportingTopics: ["Dashboards", "SEO + GEO", "Reporting layers"],
        },
      ],
    },
    demosPreview: {
      eyebrow: "Selected work",
      title: "Software designed around real operations.",
      intro:
        "A closer look at the systems, workflows, and operator tools we build for teams running real operations.",
      demoOrder: [
        "kitchen-inventory",
        "bookings-website",
        "operations-dashboard",
      ],
      cta: {
        label: "Explore Our Work",
        href: routeMap.demos,
      },
    },
    aboutContact: {
      eyebrow: "How we work",
      title: "Collaborative from start to scale.",
      description:
        "We shape the right workflow with you, then keep improving it as the system grows.",
      responseNote: "We typically reply within 1–2 business days.",
      process: [
        {
          id: "discover",
          stepNumber: "01",
          title: "Discover",
          description: "We learn the workflow and identify the highest-value opportunities first.",
        },
        {
          id: "prototype",
          stepNumber: "02",
          title: "Prototype",
          description: "We validate the solution quickly so you can react before the full build.",
        },
        {
          id: "build",
          stepNumber: "03",
          title: "Build",
          description: "We build reliable, secure systems with clean documentation and clear ownership.",
        },
        {
          id: "improve",
          stepNumber: "04",
          title: "Improve",
          description: "We iterate, optimize, and scale as the business and workflow evolve.",
        },
      ],
      contact: {
        email: siteConfig.contactEmail,
        formTitle: "Tell us what you're working on",
        formDescription:
          "Use the contact form for early ideas, project context, or questions before the next step.",
      },
    },
    finalCta: {
      title: "Let's build software that works for you.",
      description:
        "Start with the clearest next step and we'll guide the project from there.",
      primaryCta: {
        label: "Start a Project",
        href: routeMap.contact,
      },
      secondaryCta: {
        label: "Book a Call",
        href: routeMap.startProjectBook,
      },
    },
  },
  startProject: {
    title: "Start your project here.",
    description:
      "YojiLabs is a one-stop shop for websites, operations systems, automation, and internal tools. Choose the path that fits you best: book time first, or send enough detail that the follow-up call can start from something concrete.",
    primaryAction: {
      label: "Book a Call",
      href: routeMap.startProjectBook,
    },
    secondaryAction: {
      label: "Send Project Details",
      href: routeMap.startProjectIntake,
    },
  },
  demosRoute: {
    title: "See the systems we build, at the fidelity they exist.",
    description:
      "One is a working product you can click through. Two are concepts we've scoped and are ready to build with a first client.",
    demoOrder: [
      "kitchen-inventory",
      "bookings-website",
      "operations-dashboard",
    ],
  },
  footer: {
    brandSummary:
      "Custom software and automation for businesses that want to operate better.",
    contactLabel: "Contact",
    email: siteConfig.contactEmail,
    linkGroups: [
      {
        title: "Company",
        links: [
          { label: "About", href: routeMap.aboutAnchor },
          { label: "Work", href: routeMap.demosAnchor },
          { label: "Contact", href: routeMap.contact },
          { label: "Start a Project", href: routeMap.contact },
        ],
      },
      {
        title: "Services",
        links: [
          { label: "Custom Software", href: routeMap.servicesAnchor },
          { label: "Automation and Integrations", href: routeMap.servicesAnchor },
          { label: "Operations Systems", href: routeMap.servicesAnchor },
          { label: "Data and Intelligence", href: routeMap.servicesAnchor },
        ],
      },
    ],
    legalLinks: [
      { label: "Privacy", href: routeMap.privacy },
      { label: "Terms", href: routeMap.terms },
    ],
  },
} satisfies LandingSiteContent;

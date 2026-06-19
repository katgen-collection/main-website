import sirek from "../../public/assets/sirek.png"
import fontana from "../../public/assets/fontana-web.jpg"
import bujaopedia from "../../public/assets/bujaopedia.png"
import apapmedika from "../../public/assets/apapmedika.png"
import pacilflix from "../../public/assets/pacilflix.png"
import placeholder from "../../public/assets/placeholder.png"
import fontanaMobile from "../../public/assets/fontana-mobile.png"
import type { StaticImageData } from "next/image"

export type ProjectStatus = "live" | "in-progress" | "archived"

export interface Project {
  id: string
  title: string
  slug: string
  description: string
  longDescription: string
  image: string | StaticImageData
  technologies: string[]
  year: number
  client: string
  type: string
  status: ProjectStatus
  featured?: boolean
  liveUrl?: string
  githubUrl?: string
}

export const projects: Project[] = [
  {
    id: "thothai",
    title: "ThothAI",
    slug: "thothai",
    description: "An AI job aggregator that scrapes, filters, and ranks listings through an automated pipeline.",
    longDescription:
      "ThothAI is an automated job aggregator built around an intelligent data pipeline. A Python and Go backend pulls listings using SerpAPI and custom scrapers, then filters and enriches them through external AI platforms. The frontend is a responsive Next.js app, with backend testing across the aggregation, filtering, and AI workflows.",
    image: placeholder,
    technologies: ["Go", "Python", "Next.js", "TypeScript", "SerpAPI", "LLM APIs", "Docker", "PostgreSQL"],
    year: 2026,
    client: "Personal Project",
    type: "AI Platform",
    status: "live",
    featured: true,
    liveUrl: "https://jobs.katgen.pro",
    githubUrl: "https://github.com/katgen-collection/thoth-be",
  },
  {
    id: "sisyphus",
    title: "Sisyphus",
    slug: "sisyphus",
    description: "A local-first PWA of PDF and video tools that run entirely in your browser.",
    longDescription:
      "Sisyphus is an offline-capable toolkit for everyday tasks, built local-first. The PDF tools compress, rearrange, convert, and sign files, and the video tools compress, convert, resize, and extract audio. Everything runs in the browser through FFmpeg WASM, WebGPU, and Web Workers, so your files never leave your device.",
    image: placeholder,
    technologies: ["Next.js", "TypeScript", "WASM", "WebGPU", "FFmpeg", "Web Workers"],
    year: 2025,
    client: "Personal Project",
    type: "Progressive Web App",
    status: "live",
    featured: true,
    liveUrl: "https://sisyphus.katgen.pro",
    githubUrl: "https://github.com/katgen-collection/sisyphus",
  },
  {
    id: "gosilly",
    title: "Gosilly",
    slug: "gosilly",
    description: "A Go reimplementation of the SillyTavern backend for better performance and clean boundaries.",
    longDescription:
      "Gosilly rebuilds the SillyTavern backend in Go to cut runtime overhead and separate backend concerns from the frontend. It provides API-compatible modules for LLM client workflows, including request routing, session handling, and server-sent events. API contracts are documented with OpenAPI/Swagger and validated with unit, regression, and API tests.",
    image: placeholder,
    technologies: ["Go", "REST", "SSE", "OpenAPI/Swagger"],
    year: 2026,
    client: "Personal Project",
    type: "Backend Engineering",
    status: "in-progress",
    featured: true,
  },
  {
    id: "no-bs",
    title: "no_bs",
    slug: "no-bs",
    description: "A no-frills realtime chat app with direct messages, group chats, and built-in LLM access.",
    longDescription:
      "no_bs is a clean, fast chat application built for quick conversations without the clutter. It supports realtime direct and group messaging, authentication, and access to several LLM models right inside the chat. The Next.js frontend talks to a dedicated Go chat service for low-latency messaging.",
    image: placeholder,
    technologies: ["Next.js", "TypeScript", "Go", "WebSocket", "Redis", "OpenRouter API"],
    year: 2025,
    client: "Personal Project",
    type: "Realtime Chat",
    status: "live",
    featured: true,
    liveUrl: "https://chat.katgen.pro",
    githubUrl: "https://github.com/katgen-collection/no_bs",
  },
  {
    id: "apapmedika",
    title: "Apap Medika",
    slug: "apapmedika",
    description: "A multi-service healthcare platform for patients, appointments, prescriptions, and insurance.",
    longDescription:
      "Apap Medika is a Spring Boot microservices system covering patient data, appointments, prescriptions, and insurance. I led a team of five and personally designed the Auth and Pharmacy services, building REST APIs that integrate across the platform. Services are containerized with Docker and shipped through GitLab CI/CD, with unit and regression tests on the modules I owned.",
    image: apapmedika,
    technologies: ["Java", "Spring Boot", "PostgreSQL", "Docker", "GitLab CI/CD"],
    year: 2024,
    client: "APAP, Fasilkom UI",
    type: "Microservices Platform",
    status: "archived",
    featured: true,
  },
  {
    id: "sirek",
    title: "SiRek Tandika",
    slug: "sirek",
    description: "A recruitment platform built end to end for Tandika Learning Institute.",
    longDescription:
      "SiRek is a recruitment system built for Tandika Learning Institute. I led a team of five through PRDs, backlog, and feature planning, and engineered the security layer with custom authentication, logging middleware, and access control. It runs on DigitalOcean with Docker and Nginx behind a GitLab CI/CD pipeline, validated with JavaScript test suites and UAT.",
    image: sirek,
    technologies: ["React", "Express.js", "MongoDB", "Docker", "Nginx", "Linux", "GitLab CI/CD"],
    year: 2025,
    client: "Tandika Learning Institute",
    type: "Web Application",
    status: "archived",
    featured: true,
  },
  {
    id: "fontana-web",
    title: "Fontana Website",
    slug: "fontana-web",
    description: "A community-focused web platform for listing and reviewing books.",
    longDescription:
      "Fontana is a community platform for book lovers, built with a clean and modern interface. Users can browse and list books, leave reviews, and join a discussion forum. The site was built with a focus on performance and accessibility.",
    image: fontana,
    technologies: ["Django", "Tailwind CSS", "PostgreSQL"],
    year: 2023,
    client: "PBP, Fasilkom UI",
    type: "Website",
    status: "archived",
    githubUrl: "https://github.com/PBP-F12/fontana-django",
  },
  {
    id: "fontana-mobile",
    title: "Fontana Mobile",
    slug: "fontana-mobile",
    description: "A mobile companion app for the Fontana book community.",
    longDescription:
      "The Fontana mobile app complements the web platform, letting users browse and list books, read reviews, and join community discussions on the go. It integrates with the existing backend for a consistent experience across web and mobile.",
    image: fontanaMobile,
    technologies: ["Flutter", "Dart", "Django REST Framework", "PostgreSQL"],
    year: 2023,
    client: "PBP, Fasilkom UI",
    type: "Mobile Application",
    status: "archived",
    githubUrl: "https://github.com/PBP-F12/fontana-flutter",
  },
  {
    id: "bujaopedia",
    title: "Bujaopedia",
    slug: "bujaopedia",
    description: "A digital marketplace for buying and selling products with a promo system.",
    longDescription:
      "Bujaopedia is a digital marketplace where users can list products, manage orders, and use a promo system. It includes account management and an admin panel for handling listings and users.",
    image: bujaopedia,
    technologies: ["Next.js", "Express.js", "PostgreSQL", "Redis", "Docker", "Tailwind CSS"],
    year: 2025,
    client: "PKPL, Fasilkom UI",
    type: "Web Application",
    status: "archived",
  },
  {
    id: "pacilflix",
    title: "Pacilflix E10",
    slug: "pacilflix",
    description: "A movie listing and discovery site backed by a relational database.",
    longDescription:
      "Pacilflix is a movie listing site for browsing and discovering films, with search, details, and reviews. It was built with a focus on database design and a responsive, performant user experience.",
    image: pacilflix,
    technologies: ["Next.js", "Tailwind CSS", "PostgreSQL", "NeonDB"],
    year: 2024,
    client: "Databases, Fasilkom UI",
    type: "Web Application",
    status: "archived",
    githubUrl: "https://github.com/Pacilflix-E10/pacilflix-e10",
  },
]

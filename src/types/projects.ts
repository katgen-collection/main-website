import pacilflix from "../../public/assets/pacilflix.png"
import sirek from "../../public/assets/sirek.png"
import fontana from "../../public/assets/fontana-web.jpg"
import bujaopedia from "../../public/assets/bujaopedia.png"
import apapmedika from "../../public/assets/apapmedika.png"
import placeholder from "../../public/assets/placeholder.png"
import fontanaMobile from "../../public/assets/fontana-mobile.png"
import type { StaticImageData } from "next/image"

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
  liveUrl?: string
  githubUrl?: string
}

export const projects: Project[] = [
  {
    id: "1",
    title: "SiRek Tandika",
    slug: "sirek",
    description: "A modern job hunting site for Tandika Learning Institute",
    longDescription:
      "This project is a modern job hunting site designed for Tandika Learning Institute. It features a user-friendly interface, advanced search capabilities, and a responsive design. The site allows users to create profiles, upload resumes, and apply for jobs directly through the platform. It also includes an admin panel for managing job listings and user accounts.",
    image: sirek,
    technologies: ["React JS", "Javascript", "Tailwind CSS", "Nodemailer", "MongoDB", "Express JS", "Docker", "AWS S3", "Puppeteer"],
    year: 2025,
    client: "Tandika Learning Institute",
    type: "Web Application",
    liveUrl: "https://sirek.site",
    githubUrl: "Private GitLab Repository",
  },
  {
    id: "2",
    title: "Fontana Website",
    slug: "fontana-web",
    description: "A website for book listing and community",
    longDescription:
      "This project is a website for Fontana, a community-focused platform for book lovers. The site features a clean and modern design, allowing users to browse and list books easily. It includes user profiles, book reviews, and a community forum for discussions. The website is built with a focus on performance and accessibility.",
    image: fontana,
    technologies: ["Django", "Tailwind CSS", "PostgreSQL"],
    year: 2023,
    client: "PBP Fasilkom UI",
    type: "Website",
    liveUrl: "https://fontana.com",
    githubUrl: "https://github.com/PBP-F12/fontana-django",
  },
  {
    id: "3",
    title: "Fontana Mobile",
    slug: "fontana-mobile",
    description: "A mobile app for Fontana, a book listing and community platform",
    longDescription:
      "This project is a mobile application for Fontana, designed to complement the web platform. The app allows users to browse and list books, read reviews, and participate in community discussions on the go. It features a user-friendly interface and integrates with the existing web platform for seamless user experience.",
    image: fontanaMobile,
    technologies: ["Flutter", "Dart", "Django REST Framework", "PostgreSQL"],
    year: 2023,
    client: "PBP Fasilkom UI",
    type: "Mobile Application",
    liveUrl: "Mobile Application",
    githubUrl: "https://github.com/PBP-F12/fontana-flutter",
  },
  {
    id: "4",
    title: "no_bs",
    slug: "no-bs",
    description: "A Simple chat application with no bs",
    longDescription:
      "This project is a simple chat application designed to provide a no-frills messaging experience. It features real-time messaging, user authentication, and a clean interface. The app is built with a focus on performance and ease of use, making it ideal for quick conversations without unnecessary distractions. It includes features like direct messaging, group chats, and access to some LLM Models.",
    image: placeholder,
    technologies: ["React JS", "Tailwind CSS", "Express JS", "Socket.IO", "MongoDB", "OpenRouter API", "Cloudinary"],
    year: 2025,
    client: "Personal Project",
    type: "Web Application",
    liveUrl: "https://no_bs.vercel.app",
    githubUrl: "https://github.com/",
  },
  {
    id: "5",
    title: "Bujaopedia",
    slug: "bujaopedia",
    description: "A simple digital marketplace for buying and selling products",
    longDescription:
      "This project is a digital marketplace designed for buying and selling products. It features a user-friendly interface, product listings, and a promo system. The site allows users to create accounts, list products, and manage their orders. It also includes an admin panel for managing product listings and user accounts.",
    image: bujaopedia,
    technologies: ["Express JS", "Tailwind CSS", "PostgreSQL", "Docker", "Next JS", "Redis"],
    year: 2025,
    client: "PKPL Fasilkom UI",
    type: "Web Application",
    liveUrl: "https://kelompok-2-bujaopedia-fe.pkpl.cs.ui.ac.id/",
    githubUrl: "Private GitLab Repository",
  },
  {
    id: "6",
    title: "Apapmedika",
    slug: "apapmedika",
    description: "A complex medical platform for managing patient data, appointments, prescriptions, insurance, and more",
    longDescription:
      "This is a multi-service project designed to manage various aspects of a medical platform. It includes features for managing patient data, appointments, prescriptions, insurance, and more. The platform is built with a focus on security and scalability, ensuring that sensitive medical data is handled appropriately. It includes an admin panel for managing user accounts and system settings.",
    image: apapmedika,
    technologies: ["Spring Boot", "Vue JS", "PostgreSQL", "Docker"],
    year: 2024,
    client: "APAP Fasilkom UI",
    type: "Website",
    liveUrl: "https://apapmedika-a10.cs.ui.ac.id",
    githubUrl: "Private GitLab Repository",
  },
  {
    id: "7",
    title: "Pacilflix E10",
    slug: "pacilflix",
    description: "A simple movie listing website with a modern design",
    longDescription:
      "This project is a movie listing website designed to provide users with an easy way to browse and discover movies. It features a modern design, allowing users to search for movies, view details, and read reviews. The site is built with a focus on performance and user experience, ensuring that users can find the information they need quickly and easily.",
    image: pacilflix,
    technologies: ["Next JS", "Tailwind CSS", "PostgreSQL", "NeonDB"],
    year: 2024,
    client: "Databases Fasilkom UI",
    type: "Web Application",
    liveUrl: "https://pacilflix-e10.vercel.app/",
    githubUrl: "https://github.com/Pacilflix-E10/pacilflix-e10"
  },
]

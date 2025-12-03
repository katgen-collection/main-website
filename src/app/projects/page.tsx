import { Metadata } from "next"
import ProjectsListClient from "@/components/projects/ProjectsListClient"

export const metadata: Metadata = {
  title: "Projects | Portfolio",
  description: "Showcasing my creative journey and technical projects.",
  openGraph: {
    title: "Projects | Portfolio",
    description: "Showcasing my creative journey and technical projects.",
    type: "website",
  },
}

export default function ProjectsPage() {
  return <ProjectsListClient />
}

import { notFound } from "next/navigation"
import { projects } from "@/types/projects"
import { Metadata } from "next"
import ProjectDetails from "@/components/projects/ProjectDetails"

interface ProjectPageProps {
  readonly params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const project = projects.find((p) => p.slug === resolvedParams.slug)

  if (!project) {
    return {
      title: "Project Not Found",
    }
  }

  return {
    title: `${project.title} | Portfolio`,
    description: project.description,
    openGraph: {
      title: `${project.title} | Portfolio`,
      description: project.description,
      type: "article",
    },
  }
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const resolvedParams = await params
  const project = projects.find((p) => p.slug === resolvedParams.slug)

  if (!project) {
    notFound()
  }

  return <ProjectDetails project={project} />
}

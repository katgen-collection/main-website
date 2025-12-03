import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { Project } from "@/types/projects"

interface ProjectCardProps {
  readonly project: Project
  readonly onClick?: (project: Project) => void
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <div className="group relative rounded-xl border border-white/10 overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-1">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="aspect-video relative overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg?height=600&width=800"}
          alt={project.title}
          width={800}
          height={600}
          className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="relative p-6 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-bold text-xl text-white group-hover:text-purple-200 transition-colors duration-200">
            {project.title}
          </h3>
          <span className="shrink-0 text-xs bg-gradient-to-r from-purple-400/20 to-pink-400/20 text-purple-300 px-3 py-1.5 rounded-full border border-purple-400/20 backdrop-blur-sm">
            {project.type}
          </span>
        </div>

        <p className="text-sm text-gray-300 leading-relaxed line-clamp-2 group-hover:text-gray-200 transition-colors duration-200">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 pt-1">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-white/10 hover:bg-white/15 text-xs rounded-full border border-white/10 backdrop-blur-sm transition-all duration-200 hover:scale-105"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-3 py-1 bg-white/10 text-xs rounded-full border border-white/10 backdrop-blur-sm">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        {onClick ? (
          <button
            onClick={() => onClick(project)}
            className="inline-flex items-center gap-2 text-sm font-medium text-purple-300 hover:text-white transition-all duration-200 group/link pt-2 cursor-pointer"
          >
            <span>View Details</span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </button>
        ) : (
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-purple-300 hover:text-white transition-all duration-200 group/link pt-2"
          >
            <span>View Details</span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </Link>
        )}
      </div>
    </div>
  )
}
export default ProjectCard
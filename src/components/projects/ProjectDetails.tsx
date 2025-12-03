import Image from "next/image"
import Link from "next/link"
import placeholder from '../../../public/assets/placeholder.png';
import { ArrowLeft, ExternalLink, Github, Calendar, User, Tag } from "lucide-react"
import { Project } from "@/types/projects"

interface ProjectDetailsProps {
  project: Project
  onBack?: () => void
}

export default function ProjectDetails({ project, onBack }: ProjectDetailsProps) {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-pink-900/10" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-12">
          {onBack ? (
            <button
              onClick={onBack}
              className="group inline-flex items-center justify-center rounded-xl p-3 hover:bg-white/10 transition-all duration-200 border border-white/10 hover:border-white/20 backdrop-blur-sm cursor-pointer"
            >
              <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
              <span className="sr-only">Back to projects</span>
            </button>
          ) : (
            <Link
              href="/projects"
              className="group inline-flex items-center justify-center rounded-xl p-3 hover:bg-white/10 transition-all duration-200 border border-white/10 hover:border-white/20 backdrop-blur-sm"
            >
              <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
              <span className="sr-only">Back to projects</span>
            </Link>
          )}
          
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {project.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <Tag className="h-4 w-4" />
                {project.type}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {project.year}
              </span>
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {project.client}
              </span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project image */}
            <div className="group relative w-full rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Image
                src={project.image || placeholder}
                alt={project.title}
                width={800}
                height={600}
                className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* About section */}
            <div className="space-y-6 bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl border border-white/10 p-8 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full" />
                <h2 className="text-2xl font-bold">About this project</h2>
              </div>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p className="text-lg">{project.description}</p>
                <p>{project.longDescription}</p>
              </div>
            </div>

            {/* Technologies section */}
            <div className="space-y-6 bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl border border-white/10 p-8 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full" />
                <h2 className="text-2xl font-bold">Technologies Used</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech, index) => (
                  <span
                    key={tech}
                    className="group px-4 py-2 bg-gradient-to-r from-purple-400/20 to-pink-400/20 text-purple-300 rounded-xl text-sm border border-purple-400/20 backdrop-blur-sm hover:from-purple-400/30 hover:to-pink-400/30 hover:scale-105 transition-all duration-200 cursor-default"
                    style={{
                      animationDelay: `${index * 50}ms`,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project details card */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/20 p-6 space-y-6 backdrop-blur-sm relative overflow-hidden">
              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-2xl" />

              <div className="relative">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full" />
                  Project Details
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-gray-400 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Year
                    </span>
                    <span className="font-medium">{project.year}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-gray-400 flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Client
                    </span>
                    <span className="font-medium">{project.client}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-400 flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      Type
                    </span>
                    <span className="font-medium">{project.type}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-4 text-sm font-medium text-white hover:from-purple-400 hover:to-pink-400 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
                >
                  <ExternalLink className="h-4 w-4 transition-transform group-hover:scale-110" />
                  Live Preview
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full inline-flex items-center justify-center gap-3 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm px-6 py-4 text-sm font-medium text-white hover:bg-white/10 hover:border-white/30 transition-all duration-200 hover:scale-105"
                >
                  <Github className="h-4 w-4 transition-transform group-hover:scale-110" />
                  View Code
                </a>
              )}
            </div>

            {/* Additional info */}
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl border border-white/10 p-6 backdrop-blur-sm">
              <h3 className="font-semibold mb-3 text-gray-300">Quick Stats</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Technologies</span>
                  <span className="text-purple-300">{project.technologies.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Category</span>
                  <span className="text-purple-300">{project.type}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

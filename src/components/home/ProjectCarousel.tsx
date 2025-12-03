"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Grip } from "lucide-react"

import { ProjectCard } from "@/components/ProjectCard"
import type { Project } from "@/types/projects"

interface ProjectCarouselProps {
  readonly projects: Project[]
}

export function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [maxScroll, setMaxScroll] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState(0)
  const [showInstructions, setShowInstructions] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateMaxScroll = () => {
      if (containerRef.current) {
        setMaxScroll(containerRef.current.scrollWidth - containerRef.current.clientWidth)
      }
    }

    updateMaxScroll()
    window.addEventListener("resize", updateMaxScroll)
    return () => window.removeEventListener("resize", updateMaxScroll)
  }, [projects])

  useEffect(() => {
    const timer = setTimeout(() => setShowInstructions(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart(e.clientX)
    setShowInstructions(false)
    if (containerRef.current) {
      containerRef.current.style.cursor = "grabbing"
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return

    const dragDistance = dragStart - e.clientX
    const newScrollLeft = scrollPosition + dragDistance

    containerRef.current.scrollLeft = Math.max(0, Math.min(maxScroll, newScrollLeft))
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    if (containerRef.current) {
      containerRef.current.style.cursor = "grab"
      setScrollPosition(containerRef.current.scrollLeft)
    }
  }

  const handleScroll = () => {
    if (containerRef.current && !isDragging) {
      setScrollPosition(containerRef.current.scrollLeft)
    }
  }

  useEffect(() => {
    const preventSelection = (e: Event) => {
      if (isDragging) e.preventDefault()
    }

    document.addEventListener("selectstart", preventSelection)
    return () => document.removeEventListener("selectstart", preventSelection)
  }, [isDragging])

  const scrollProgress = maxScroll > 0 ? (scrollPosition / maxScroll) * 100 : 0

  return (
    <div className="relative group">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10" />

      {/* Instructions */}
      <AnimatePresence>
        {showInstructions && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 z-20"
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-black/80 backdrop-blur-sm rounded-full border border-white/10">
              <Grip className="h-4 w-4 text-purple-300" />
              <span className="text-sm text-gray-300">Click and drag to explore projects</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Drag indicator */}
      <motion.div
        className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        animate={{
          scale: isDragging ? 1.1 : 1,
          rotate: isDragging ? 5 : 0,
        }}
      >
      </motion.div>

      {/* Main carousel container */}
      <motion.div
        ref={containerRef}
        className="flex overflow-x-auto gap-6 pb-6 scrollbar-hide snap-x cursor-grab select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onScroll={handleScroll}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          cursor: isDragging ? "grabbing" : "grab",
        }}
        whileTap={{ cursor: "grabbing" }}
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className="min-w-[300px] md:min-w-[350px] snap-start"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: index * 0.1,
              duration: 0.5,
              ease: "easeOut",
            }}
            whileHover={{
              scale: isDragging ? 1 : 1.02,
              transition: { duration: 0.2 },
            }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>

      {/* Progress indicator */}
      <div className="mt-4 flex justify-center">
        <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
            style={{ width: `${scrollProgress}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${scrollProgress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-6 w-8 bg-gradient-to-r from-black/20 to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 bottom-6 w-8 bg-gradient-to-l from-black/20 to-transparent pointer-events-none z-10" />

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}

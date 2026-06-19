"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github, Lock, Clock } from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/home/SiteChrome";
import { StatusChip } from "./StatusChip";
import placeholder from "../../../public/assets/placeholder.png";
import { Project } from "@/types/projects";

const isUrl = (s?: string) => !!s && s.startsWith("http");

export default function ProjectDetailPage({ project }: { project: Project }) {
  const live = project.status === "live" && isUrl(project.liveUrl);
  const hasRepo = isUrl(project.githubUrl);

  const spec = [
    { k: "Year", v: String(project.year) },
    { k: "Client", v: project.client },
    { k: "Type", v: project.type },
    { k: "Stack", v: `${project.technologies.length} technologies` },
  ];

  return (
    <div className="min-h-screen bg-[#0B0C10] text-[#ECECEE] antialiased selection:bg-violet-500/30">
      <SiteNav />

      <main className="max-w-[1500px] mx-auto px-6 lg:px-10 pt-28 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 font-code text-[11px] uppercase tracking-[0.18em] text-[#8A8A94] hover:text-violet-400 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            All work
          </Link>

          <header className="mt-8">
            <div className="flex items-center gap-3 font-code text-[11px] uppercase tracking-[0.2em] text-violet-400">
              <span>{project.type}</span>
              <span className="h-px w-6 bg-violet-400/40" />
              <StatusChip status={project.status} />
            </div>
            <h1 className="font-display font-medium tracking-tight text-4xl md:text-6xl mt-5">
              {project.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-[#A6A6AE] leading-relaxed">
              {project.description}
            </p>
          </header>
        </motion.div>

        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 border border-white/[0.08] overflow-hidden bg-black/30"
        >
          <Image
            src={project.image || placeholder}
            alt={project.title}
            width={1200}
            height={750}
            className="w-full h-auto object-cover"
            priority
          />
        </motion.div>

        {/* Body */}
        <div className="mt-14 grid lg:grid-cols-[1.55fr_1fr] gap-12 lg:gap-16">
          {/* Left: writeup + tech */}
          <div className="space-y-12">
            <section>
              <h2 className="font-code text-[11px] uppercase tracking-[0.2em] text-[#6B6B74] pb-3 border-b border-white/[0.08]">
                Overview
              </h2>
              <p className="mt-6 max-w-[68ch] text-lg text-[#ECECEE] leading-relaxed">
                {project.longDescription}
              </p>
            </section>

            <section>
              <h2 className="font-code text-[11px] uppercase tracking-[0.2em] text-[#6B6B74] pb-3 border-b border-white/[0.08]">
                Technologies
              </h2>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="font-code text-xs tracking-wide text-[#ECECEE] border border-white/12 px-3 py-1.5 hover:border-violet-400/50 hover:text-violet-300 transition-colors"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* Right: spec sheet + actions */}
          <aside className="lg:sticky lg:top-24 self-start space-y-6">
            <div className="border border-white/[0.08]">
              {spec.map((s) => (
                <div
                  key={s.k}
                  className="flex items-start justify-between gap-4 px-5 py-4 border-b border-white/[0.06] last:border-b-0"
                >
                  <span className="font-code text-[10px] uppercase tracking-[0.18em] text-[#6B6B74] pt-0.5">
                    {s.k}
                  </span>
                  <span className="text-sm text-[#ECECEE] text-right">{s.v}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              {live && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full inline-flex items-center justify-center gap-2 bg-[#ECECEE] text-[#0B0C10] px-5 py-3 font-code text-xs uppercase tracking-[0.15em] hover:bg-violet-400 hover:text-white transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live preview
                </a>
              )}
              {hasRepo ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 border border-white/15 px-5 py-3 font-code text-xs uppercase tracking-[0.15em] text-[#ECECEE] hover:border-violet-400 hover:text-violet-300 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  View code
                </a>
              ) : project.status === "in-progress" ? (
                <div className="w-full inline-flex items-center justify-center gap-2 border border-white/[0.08] px-5 py-3 font-code text-xs uppercase tracking-[0.15em] text-[#6B6B74]">
                  <Clock className="w-3.5 h-3.5" />
                  Repo coming soon
                </div>
              ) : (
                <div className="w-full inline-flex items-center justify-center gap-2 border border-white/[0.08] px-5 py-3 font-code text-xs uppercase tracking-[0.15em] text-[#6B6B74]">
                  <Lock className="w-3.5 h-3.5" />
                  Private repository
                </div>
              )}
            </div>
          </aside>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

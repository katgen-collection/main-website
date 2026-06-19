"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/home/SiteChrome";
import { projects } from "@/types/projects";
import { StatusChip } from "./StatusChip";

const years = projects.map((p) => p.year);
const SPAN = `${Math.min(...years)} to ${Math.max(...years)}`;

// Featured first, then by most recent year.
const ordered = [...projects].sort(
  (a, b) => Number(b.featured ?? false) - Number(a.featured ?? false) || b.year - a.year
);

export default function ProjectsArchive() {
  return (
    <div className="min-h-screen bg-[#0B0C10] text-[#ECECEE] antialiased selection:bg-violet-500/30">
      <SiteNav />

      <main className="max-w-[1500px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <section className="pt-32 pb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 font-code text-[11px] uppercase tracking-[0.25em] text-violet-400">
              <span>Index</span>
              <span className="h-px w-8 bg-violet-400/40" />
              <span className="text-[#8A8A94]">All work</span>
            </div>
            <h1 className="font-display font-medium tracking-tight text-5xl md:text-6xl mt-7">
              The archive.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-[#A6A6AE] leading-relaxed">
              Everything I&apos;ve designed, built, and shipped, from AI platforms
              and backend systems to client work and university projects.
            </p>
            <p className="mt-6 font-code text-[11px] uppercase tracking-[0.18em] text-[#6B6B74]">
              {projects.length} Projects · {SPAN}
            </p>
          </motion.div>
        </section>

        {/* Grid */}
        <section className="pb-24 grid sm:grid-cols-2 gap-5 md:gap-7">
          {ordered.map((p, i) => {
            return (
              <motion.div
                key={p.id}
                className="h-full"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={`/projects/${p.slug}`}
                  className="group flex flex-col h-full border border-white/[0.08] bg-[#0B0C10] hover:border-violet-400/40 hover:bg-white/[0.015] transition-colors"
                >
                  <div className="relative aspect-video overflow-hidden border-b border-white/[0.07]">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover grayscale-[0.25] transition-all duration-500 group-hover:grayscale-0 group-hover:scale-[1.03]"
                    />
                    <div className="absolute top-3 right-3 bg-[#0B0C10]/80 backdrop-blur-sm border border-white/10 px-2 py-1">
                      <StatusChip status={p.status} />
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-baseline justify-between gap-3">
                      <h2 className="font-display text-xl md:text-2xl text-[#ECECEE] group-hover:text-white transition-colors flex items-center gap-2">
                        {p.title}
                        <ArrowUpRight className="w-4 h-4 text-violet-400 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                      </h2>
                      <span className="font-code text-xs text-[#6B6B74] shrink-0">{p.year}</span>
                    </div>
                    <p className="font-code text-[11px] uppercase tracking-[0.12em] text-[#6B6B74] mt-1.5">
                      {p.type} · {p.client}
                    </p>
                    <p className="text-sm text-[#A6A6AE] leading-relaxed mt-4 line-clamp-2">
                      {p.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-white/[0.06]">
                      {p.technologies.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="font-code text-[10px] tracking-wide text-[#8A8A94] border border-white/10 px-2 py-1"
                        >
                          {t}
                        </span>
                      ))}
                      {p.technologies.length > 4 && (
                        <span className="font-code text-[10px] tracking-wide text-[#6B6B74] px-2 py-1">
                          +{p.technologies.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

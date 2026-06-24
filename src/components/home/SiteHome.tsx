"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react";
import { WorkIndex } from "./WorkIndex";
import ContactForm from "./ContactForm";
import { SiteNav, SiteFooter } from "./SiteChrome";
import { HeroGrid } from "./HeroGrid";
import { skillCategories } from "@/components/skills";

const RESUME_URL =
  "https://drive.google.com/file/d/1pISl6NVG0hZe0xVmee6-dYzRP2Sw6Lqo/view?usp=sharing";

interface SiteHomeProps {
  onSwitchToDesktop: () => void;
  /** Which gimmick OS this device enters; tunes the switch button's look. */
  target?: "desktop" | "mobile";
}

/** Mono section eyebrow, e.g. "02 / SELECTED WORK". */
function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 font-code text-[11px] uppercase tracking-[0.25em] text-violet-400">
      <span>{index}</span>
      <span className="h-px w-8 bg-violet-400/40" />
      <span className="text-[#8A8A94]">{children}</span>
    </div>
  );
}

/** Scroll-reveal wrapper: a single quiet fade/lift, reused everywhere. */
function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const STATS = [
  { value: "3+", label: "Years building" },
  { value: "Go / TS", label: "Primary stack" },
  { value: "UI", label: "B.Sc Information Systems" },
];

const FACTS = [
  { k: "Location", v: "Depok / Jakarta, ID" },
  { k: "Education", v: "Information Systems, Universitas Indonesia (2022-2026)" },
  { k: "Focus", v: "Scalable systems and AI engineering" },
  { k: "Status", v: "Open to opportunities" },
];

export default function SiteHome({ onSwitchToDesktop, target = "desktop" }: SiteHomeProps) {
  return (
    <div className="min-h-screen bg-[#0B0C10] text-[#ECECEE] antialiased selection:bg-violet-500/30">
      <SiteNav onDesktop={onSwitchToDesktop} target={target} />

      {/* ---- Hero (full-bleed) ---- */}
      <section id="top" className="relative w-full min-h-screen overflow-hidden flex flex-col justify-center scroll-mt-20">
        <HeroGrid />

        {/* dim the grid behind the text */}
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              "radial-gradient(58% 60% at 50% 46%, rgba(11,12,16,0.92) 0%, rgba(11,12,16,0.5) 42%, rgba(11,12,16,0) 78%)",
          }}
        />
        {/* fade under the nav and smoothly into the next section */}
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(11,12,16,0.7) 0%, rgba(11,12,16,0) 22%, rgba(11,12,16,0) 66%, #0B0C10 100%)",
          }}
        />
        {/* faint violet accent */}
        <div
          className="pointer-events-none absolute inset-0 z-[1] opacity-[0.5]"
          style={{
            background:
              "radial-gradient(600px circle at 85% 15%, rgba(139,92,246,0.10), transparent 60%)",
          }}
        />

        <div className="relative z-10 w-full max-w-[1500px] mx-auto px-6 lg:px-10 pt-24 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <SectionLabel index="01">Software Engineer · Jakarta, ID</SectionLabel>

            <h1 className="font-display font-medium tracking-tight text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-7xl mt-8 max-w-4xl">
              I build scalable backend systems{" "}
              <span className="text-[#6B6B74]">and the AI-powered products that run on them.</span>
            </h1>

            <p className="mt-8 max-w-xl text-lg text-[#A6A6AE] leading-relaxed">
              Full-stack engineer working in Go, Spring, and TypeScript, with
              Python for AI and data. Lately I&apos;ve been focused on integrating
              AI into real products and keeping the systems behind them scalable.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#work"
                className="group inline-flex items-center gap-2 bg-[#ECECEE] text-[#0B0C10] px-6 py-3 font-code text-sm uppercase tracking-[0.15em] hover:bg-violet-400 hover:text-white transition-colors"
              >
                View work
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/15 px-6 py-3 font-code text-sm uppercase tracking-[0.15em] text-[#ECECEE] hover:border-violet-400 hover:text-violet-300 transition-colors"
              >
                Résumé
              </a>
            </div>

            {/* Stat strip */}
            <div className="mt-20 pt-10 border-t border-white/[0.08] flex flex-wrap gap-x-16 gap-y-8">
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-4xl text-[#ECECEE]">{s.value}</div>
                  <div className="mt-3 font-code text-[10px] uppercase tracking-[0.18em] text-[#6B6B74] leading-relaxed">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <a
          href="#work"
          className="absolute z-10 bottom-8 left-6 lg:left-10 hidden md:flex items-center gap-2 font-code text-[10px] uppercase tracking-[0.2em] text-[#6B6B74] hover:text-[#ECECEE] transition-colors"
        >
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          Scroll
        </a>
      </section>

      <main className="max-w-[1500px] mx-auto px-6 lg:px-10">
        {/* ---- Selected Work ---- */}
        <section id="work" className="py-24 scroll-mt-20">
          <Reveal className="flex items-end justify-between flex-wrap gap-4 mb-12">
            <div className="space-y-5">
              <SectionLabel index="02">Selected Work</SectionLabel>
              <h2 className="font-display text-3xl md:text-4xl tracking-tight">
                Things I&apos;ve shipped.
              </h2>
            </div>
            <Link
              href="/projects"
              className="font-code text-xs uppercase tracking-[0.15em] text-[#8A8A94] hover:text-violet-400 transition-colors"
            >
              Full archive →
            </Link>
          </Reveal>
          <Reveal>
            <WorkIndex />
          </Reveal>
        </section>

        {/* ---- About ---- */}
        <section id="about" className="py-24 scroll-mt-20 border-t border-white/[0.07]">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20">
            <Reveal className="space-y-5">
              <SectionLabel index="03">About</SectionLabel>
              <h2 className="font-display text-3xl md:text-4xl tracking-tight leading-tight">
                Engineer with a bias for shipping.
              </h2>
            </Reveal>
            <Reveal className="space-y-6">
              <p className="text-lg text-[#A6A6AE] leading-relaxed">
                I&apos;m a software engineer focused on building scalable backend
                systems, mostly in Go, Spring, and TypeScript. I work full-stack,
                with Next.js on the frontend and Python whenever there&apos;s AI or
                data work involved.
              </p>
              <p className="text-lg text-[#A6A6AE] leading-relaxed">
                Lately I&apos;ve been drawn to AI engineering: wiring LLMs and
                agents into real products, from an AI job aggregator to my thesis
                on an AI-powered discussion forum. I care about building things
                that are secure, reliable, and ready to scale.
              </p>

              <dl className="pt-4 grid sm:grid-cols-2 gap-x-8 gap-y-5">
                {FACTS.map((f) => (
                  <div key={f.k} className="border-t border-white/[0.08] pt-3">
                    <dt className="font-code text-[10px] uppercase tracking-[0.18em] text-[#6B6B74]">
                      {f.k}
                    </dt>
                    <dd className="mt-1.5 text-sm text-[#ECECEE]">{f.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>

        {/* ---- Stack ---- */}
        <section id="stack" className="py-24 scroll-mt-20 border-t border-white/[0.07]">
          <Reveal className="space-y-5 mb-12">
            <SectionLabel index="04">Stack</SectionLabel>
            <h2 className="font-display text-3xl md:text-4xl tracking-tight">
              Tools I reach for.
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.07] border border-white/[0.07]">
            {skillCategories.map((cat) => (
              <Reveal key={cat.title} className="bg-[#0B0C10] p-6">
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-violet-400">{cat.icon}</span>
                  <h3 className="font-code text-xs uppercase tracking-[0.18em] text-[#ECECEE]">
                    {cat.title}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {cat.skills.map((s) => (
                    <li key={s} className="flex items-start gap-2.5 text-sm text-[#A6A6AE]">
                      <span className="mt-1.5 w-1 h-1 bg-violet-400/70 shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---- Contact ---- */}
        <section id="contact" className="py-24 scroll-mt-20 border-t border-white/[0.07]">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20">
            <Reveal className="space-y-8">
              <SectionLabel index="05">Contact</SectionLabel>
              <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-[1.05]">
                Let&apos;s build something that lasts.
              </h2>
              <p className="text-lg text-[#A6A6AE] leading-relaxed max-w-md">
                Have a project, a role, or just want to talk shop? My inbox is
                open.
              </p>
              <a
                href="mailto:mikhailharitz@gmail.com"
                className="inline-block font-display text-xl md:text-2xl text-[#ECECEE] border-b border-violet-400/40 hover:border-violet-400 hover:text-violet-300 transition-colors"
              >
                mikhailharitz@gmail.com
              </a>
              <div className="flex items-center gap-3 pt-2">
                {[
                  { Icon: Github, href: "https://github.com/MikhailJBS", label: "GitHub" },
                  { Icon: Linkedin, href: "https://www.linkedin.com/in/mikhailharitz77/", label: "LinkedIn" },
                  { Icon: Mail, href: "mailto:mikhailharitz@gmail.com", label: "Email" },
                ].map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 flex items-center justify-center border border-white/15 text-[#8A8A94] hover:border-violet-400 hover:text-violet-300 transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </Reveal>
            <Reveal>
              <ContactForm />
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter onDesktop={onSwitchToDesktop} target={target} />
    </div>
  );
}

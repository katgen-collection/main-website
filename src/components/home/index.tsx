"use client";

import Link from "next/link";
import { ArrowRight, Linkedin, Twitter, Mail, Github, Phone, MapPin, Menu, X, ArrowBigUpDash, Monitor } from "lucide-react";
import { ProjectCarousel } from "./ProjectCarousel";
import Hero from "./HeroSection";
import ContactForm from "./ContactForm";
import { DesktopEnvironment } from "@/components/desktop/DesktopEnvironment";
import { projects } from "@/types/projects";
import { skillCategories } from "@/components/skills";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Animation variants
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, staggerChildren: 0.2 }
  }
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function HomeClient() {
  const [viewMode, setViewMode] = useState<'website' | 'desktop'>('desktop');
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if mobile on mount
    if (window.innerWidth < 768) {
      setViewMode('website');
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = ["about", "skills", "projects", "contact"];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });
      if (currentSection) setActiveSection(currentSection);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  interface NavLinkProps {
    href: string;
    title: string;
  }

  const NavLink = ({ href, title }: NavLinkProps) => (
    <a 
      href={href} 
      className={`text-sm font-medium transition-colors ${
        activeSection === href.replace("#", "") 
          ? "text-purple-400" 
          : "text-gray-300 hover:text-purple-400"
      }`}
    >
      {title}
    </a>
  );

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <AnimatePresence mode="wait">
        {viewMode === 'desktop' ? (
          <motion.div
            key="desktop"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50"
          >
            <DesktopEnvironment onSwitchToLegacy={() => setViewMode('website')} />
          </motion.div>
        ) : (
          <motion.div
            key="website"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen"
          >
            {/* Header */}
            <header 
              className={`sticky top-0 z-40 w-full border-b transition-all duration-300 ${
                isScrolled ? "border-white/10 bg-black/80 backdrop-blur-s" : "border-transparent bg-transparent"
              }`}
            >
              <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="text-xl font-bold tracking-tight">
                  <span className="text-purple-400">Mikhail</span>JBS
                </Link>
                <div className="flex items-center gap-4">
                  <nav className="hidden md:flex gap-6">
                    <NavLink href="#about" title="About" />
                    <NavLink href="#skills" title="Skills" />
                    <NavLink href="#projects" title="Projects" />
                    <NavLink href="#contact" title="Contact" />
                  </nav>
                  <button
                    onClick={() => setViewMode('desktop')}
                    className="hidden md:block p-2 rounded-full hover:bg-white/10 transition-colors text-gray-300 hover:text-purple-400"
                    title="Switch to Desktop Mode"
                  >
                    <Monitor className="w-5 h-5" />
                  </button>
                  <button 
                    className="md:hidden text-gray-400 hover:text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  >
                    <span className="sr-only">Menu</span>
                      {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                  </button>
                </div>
              </div>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="md:hidden bg-black/95 border-b border-white/10"
                >
                  <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
                    <a href="#about" className="text-sm font-medium py-2 hover:text-purple-400 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>About</a>
                    <a href="#skills" className="text-sm font-medium py-2 hover:text-purple-400 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Skills</a>
                    <a href="#projects" className="text-sm font-medium py-2 hover:text-purple-400 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Projects</a>
                    <a href="#contact" className="text-sm font-medium py-2 hover:text-purple-400 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
                  </nav>
                </motion.div>
              )}
            </header>

            {/* Hero Section */}
            <Hero />

            {/* About Section */}
            <motion.section
              id="about"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="py-24 md:py-32 bg-white/5 relative overflow-hidden"
            >
              <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row gap-12 items-start">
                  <motion.div variants={childVariants} className="md:w-1/3">
                    <h2 className="text-3xl font-bold mb-2">About Me</h2>
                    <div className="h-1 w-12 bg-purple-400 mb-6"></div>
                  </motion.div>
                  <motion.div variants={childVariants} className="md:w-2/3 space-y-6">
                    <p className="text-lg text-gray-300">
                      I’m a web developer with a passion for creating functional, user-friendly, and secure websites. I
                      specialize in modern frontend and backend frameworks, mainly working with Javascript and Typescript.
                    </p>
                    <p className="text-lg text-gray-300">
                      I’ve worked on a variety of projects ranging from personal fun projects, complex multiservices, to enterprise level projects
                      with some renowned clients.
                    </p>
                    <div className="pt-4 grid grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Education</h3>
                        <p className="text-gray-400">Bachelor in Information Systems</p>
                        <p className="text-gray-400">University Indonesia, 2022-2026</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.section>

            {/* Skills Section */}
            <motion.section
              id="skills"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="py-24 md:py-32"
            >
              <div className="container mx-auto px-4 space-y-12">
                <motion.div variants={childVariants} className="text-center max-w-2xl mx-auto">
                  <h2 className="text-3xl font-bold mb-2">My Skills</h2>
                  <div className="h-1 w-12 bg-purple-400 mx-auto mb-6"></div>
                  <p className="text-gray-300">
                    I’ve worked with various technologies across the full stack development spectrum. Here are my areas of expertise:
                  </p>
                </motion.div>

                <motion.div variants={childVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {skillCategories.map((category, index) => (
                    <motion.div
                      key={index}
                      variants={childVariants}
                      className="bg-white/5 p-6 rounded-lg border border-white/10 hover:border-purple-400/50 transition-colors"
                    >
                      <div className="bg-purple-400/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                        {category.icon}
                      </div>
                      <h3 className="font-medium text-lg mb-3">{category.title}</h3>
                      <ul className="space-y-2 text-gray-300">
                        {category.skills.map((skill, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span> {skill}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.section>

            {/* Projects Section */}
            <motion.section
              id="projects"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="py-24 md:py-32 bg-white/5 relative overflow-hidden"
            >
              <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>
              <div className="container mx-auto px-4 space-y-10 relative z-10">
                <motion.div variants={childVariants} className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">Featured Projects</h2>
                    <div className="h-1 w-12 bg-purple-400 mb-2"></div>
                    <p className="text-gray-400 max-w-xl">Here are some of my recent projects.</p>
                  </div>
                  <Link href="/projects" className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-md border border-white/10 bg-white/5 text-sm font-medium hover:bg-white/10 transition-colors">
                    View All Projects <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>
                <ProjectCarousel projects={projects} />
                <div className="md:hidden pt-6 flex justify-center">
                  <Link href="/projects" className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-white/10 bg-white/5 text-sm font-medium hover:bg-white/10 transition-colors">
                    View All Projects <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.section>

            {/* Contact Section */}
            <motion.section
              id="contact"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="pt-24 pb-32 md:pt-32 md:pb-40"
            >
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                  <motion.div variants={childVariants} className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-2">Get In Touch</h2>
                    <div className="h-1 w-12 bg-purple-400 mx-auto mb-6"></div>
                    <p className="text-gray-300 max-w-lg mx-auto">
                      Have a project in mind or want to chat? Feel free to reach out! I’m always open to discussing new projects, creative ideas or opportunities to be part of your vision.
                    </p>
                  </motion.div>
                  <motion.div variants={childVariants} className="grid md:grid-cols-5 gap-8">
                    <div className="md:col-span-2 space-y-6">
                      <motion.div variants={childVariants} className="flex gap-4 items-start">
                        <div className="bg-purple-400/20 w-10 h-10 rounded-lg flex items-center justify-center shrink-0">
                          <Mail className="h-5 w-5 text-purple-400" />
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">Email</h3>
                          <p className="text-gray-400">mikhailharitz@gmail.com</p>
                        </div>
                      </motion.div>
                      <motion.div variants={childVariants} className="flex gap-4 items-start">
                        <div className="bg-purple-400/20 w-10 h-10 rounded-lg flex items-center justify-center shrink-0">
                          <Phone className="h-5 w-5 text-purple-400" />
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">Phone</h3>
                          <p className="text-gray-400">+6281222439087</p>
                        </div>
                      </motion.div>
                      <motion.div variants={childVariants} className="flex gap-4 items-start">
                        <div className="bg-purple-400/20 w-10 h-10 rounded-lg flex items-center justify-center shrink-0">
                          <MapPin className="h-5 w-5 text-purple-400" />
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">Location</h3>
                          <p className="text-gray-400">Depok, Jawa Barat</p>
                        </div>
                      </motion.div>
                      <motion.div variants={childVariants} className="pt-4">
                        <h3 className="font-medium mb-4">Connect with me</h3>
                        <div className="flex gap-4">
                          <a
                            href="https://github.com/MikhailJBS"
                            className="bg-white/10 w-10 h-10 rounded-full flex items-center justify-center hover:bg-purple-400/30 transition-colors"
                            aria-label="GitHub"
                          >
                            <Github className="h-5 w-5" />
                          </a>
                          <a
                            href="https://www.linkedin.com/in/mikhailharitz77/"
                            className="bg-white/10 w-10 h-10 rounded-full flex items-center justify-center hover:bg-purple-400/30 transition-colors"
                            aria-label="LinkedIn"
                          >
                            <Linkedin className="h-5 w-5" />
                          </a>
                          <a
                            href="https://twitter.com"
                            className="bg-white/10 w-10 h-10 rounded-full flex items-center justify-center hover:bg-purple-400/30 transition-colors"
                            aria-label="Twitter"
                          >
                            <Twitter className="h-5 w-5" />
                          </a>
                        </div>
                      </motion.div>
                    </div>
                    <motion.div variants={childVariants} className="md:col-span-3">
                      <ContactForm />
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.section>


            {/* Back to top button */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="fixed bottom-6 right-6 w-12 h-12 bg-purple-400 rounded-full flex items-center justify-center shadow-lg z-50 hover:bg-purple-500 active:scale-90 transition-all"
              aria-label="Back to top"
              type="button"
            >
              <ArrowBigUpDash className="h-6 w-6 text-white" />
            </button>

            {/* Footer */}
            <footer className="border-t border-white/10 py-8 md:py-12">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                  <div>
                    <Link href="/" className="text-xl font-bold"><span className="text-purple-400">Mikhail</span>JBS</Link>
                    <p className="mt-4 text-gray-400 max-w-xs">A passionate web developer focused on creating functional and secure websites and applications.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-4">Quick Links</h3>
                    <nav className="flex flex-col space-y-2.5">
                      <a href="#about" className="text-gray-400 hover:text-white transition-colors">About</a>
                      <a href="#skills" className="text-gray-400 hover:text-white transition-colors">Skills</a>
                      <a href="#projects" className="text-gray-400 hover:text-white transition-colors">Projects</a>
                      <a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a>
                    </nav>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-4">Contact</h3>
                    <div className="space-y-2.5 text-gray-400">
                      <p>mikhailharitz@gmail.com</p>
                      <p>+6281222439087</p>
                      <p>Depok, Jawa Barat</p>
                    </div>
                  </div>
                </div>
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-4 w-full justify-center">
                    <p className="text-sm text-gray-400 text-center w-full">© {new Date().getFullYear()} Mikhail Haritz. All rights reserved.</p>
                  </div>
                </div>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

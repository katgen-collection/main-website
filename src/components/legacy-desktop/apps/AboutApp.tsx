"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Download, Mail, MapPin, Github, Linkedin } from 'lucide-react';
import SkillsGrid from '@/components/home/SkillsGrid';

export const AboutApp = () => {
  return (
    <div className="space-y-8 p-2">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
            Mikhail Haritz
          </h1>
          <h2 className="text-xl text-purple-400">Full Stack Developer</h2>
          <p className="text-gray-300 leading-relaxed">
            I craft robust and scalable web applications with modern technologies. 
            Passionate about creating seamless user experiences and solving complex problems through code.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-2">
            <a 
              href="/cv.pdf" 
              download 
              className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg text-white font-medium transition-colors"
            >
              <Download size={18} />
              Download CV
            </a>
            <div className="flex gap-2">
              <a href="https://github.com/mikhailharitz" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                <Github size={20} className="text-gray-300" />
              </a>
              <a href="https://linkedin.com/in/mikhailharitz" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                <Linkedin size={20} className="text-gray-300" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 my-6" />

      {/* Skills Section */}
      <div>
        <h3 className="text-xl font-bold mb-4 text-white">Technical Skills</h3>
        <SkillsGrid />
      </div>
    </div>
  );
};

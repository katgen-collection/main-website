"use client";

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FolderGit2, User, Mail, Grid, LogOut, Wifi, Battery, Volume2, Search, Music } from 'lucide-react';
import { LockScreen } from './LockScreen';
import { DesktopIcon } from './DesktopIcon';
import { Taskbar } from './Taskbar';
import { Window } from './Window';
import { AboutApp } from './apps/AboutApp';
import { ContactApp } from './apps/ContactApp';
import { ProjectsApp } from './apps/ProjectsApp';
import Image from 'next/image';
import backgroundImage from '../../../public/assets/desktop-background.jpg';

interface DesktopEnvironmentProps {
  onSwitchToLegacy: () => void;
}

export const DesktopEnvironment: React.FC<DesktopEnvironmentProps> = ({ onSwitchToLegacy }) => {
  const [isLocked, setIsLocked] = useState(true);
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [minimizedWindows, setMinimizedWindows] = useState<string[]>([]);
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const toggleWindow = (id: string) => {
    if (minimizedWindows.includes(id)) {
      setMinimizedWindows(prev => prev.filter(w => w !== id));
    } else if (openWindows.includes(id)) {
      setMinimizedWindows(prev => [...prev, id]);
    } else {
      setOpenWindows(prev => [...prev, id]);
    }
  };

  const closeWindow = (id: string) => {
    setOpenWindows(prev => prev.filter(w => w !== id));
    setMinimizedWindows(prev => prev.filter(w => w !== id));
  };

  const minimizeWindow = (id: string) => {
    setMinimizedWindows(prev => [...prev, id]);
  };

  return (
    <div className="fixed inset-0 bg-cover bg-center overflow-hidden font-mono" 
         style={{ backgroundImage: `url(${backgroundImage.src})` }}>
      
      {/* Purple Overlay */}
      <div className="absolute inset-0 bg-purple-900/40 mix-blend-overlay pointer-events-none" />
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 h-10 bg-black border-b-2 border-black flex items-center justify-between px-4 z-50 shadow-sm">
        <div className="flex items-center gap-4">
           <span className="font-p5 text-xl tracking-tightest text-white [word-spacing:0.5rem]">TAKE YOUR HEART</span>
        </div>
        <div className="flex items-center gap-6">
           <button 
             onClick={() => toggleWindow('spotify')}
             className="hover:scale-110 transition-transform"
             title="Spotify"
           >
             <Music className="w-4 h-4 text-green-600" />
           </button>
           <Search className="w-4 h-4" />
           <div className="flex items-center gap-3">
             <Wifi className="w-4 h-4" />
             <Volume2 className="w-4 h-4" />
             <Battery className="w-4 h-4" />
           </div>
           <span className="font-p5 text-xl tracking-tighter text-white">{currentTime}</span>
        </div>
      </div>

      <AnimatePresence>
        {isLocked && <LockScreen onUnlock={() => setIsLocked(false)} />}
      </AnimatePresence>

      {!isLocked && (
        <motion.div 
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="absolute inset-0"
        >
          {/* Desktop Icons Area */}
          <div className="absolute inset-0 pointer-events-none pt-10">
            <div className="pointer-events-auto w-full h-full relative">
              {/* Icons positioned absolutely */}
              <div className="absolute top-0 right-0 h-full w-full">
                <div className="absolute right-8 top-8 flex flex-col gap-4 items-end pointer-events-none">
                  {/* Placeholder for layout reference if needed, but we use absolute positioning for draggable items */}
                </div>
                
                {/* We place them initially on the right side using CSS positioning in the style prop or just initialPosition if we knew the width. 
                    Since we don't know width, we can use a container that is aligned to the right. 
                    However, Draggable needs a relative parent. 
                */}
                <div className="absolute top-8 right-8 w-32 h-[600px]">
                   <DesktopIcon 
                    label="Projects" 
                    icon={FolderGit2} 
                    initialPosition={{ x: 0, y: 0 }}
                    onDoubleClick={() => {
                      if (!openWindows.includes('projects')) {
                        setOpenWindows(prev => [...prev, 'projects']);
                      } else if (minimizedWindows.includes('projects')) {
                        setMinimizedWindows(prev => prev.filter(w => w !== 'projects'));
                      }
                    }}
                  />
                  <DesktopIcon 
                    label="ME" 
                    icon={User} 
                    initialPosition={{ x: 0, y: 130 }}
                    onDoubleClick={() => {
                      if (!openWindows.includes('about')) {
                        setOpenWindows(prev => [...prev, 'about']);
                      } else if (minimizedWindows.includes('about')) {
                        setMinimizedWindows(prev => prev.filter(w => w !== 'about'));
                      }
                    }}
                  />
                  <DesktopIcon 
                    label="Contact" 
                    icon={Mail} 
                    initialPosition={{ x: 0, y: 260 }}
                    onDoubleClick={() => {
                      if (!openWindows.includes('contact')) {
                        setOpenWindows(prev => [...prev, 'contact']);
                      } else if (minimizedWindows.includes('contact')) {
                        setMinimizedWindows(prev => prev.filter(w => w !== 'contact'));
                      }
                    }}
                  />
                  <DesktopIcon 
                    label="Misc" 
                    icon={Grid} 
                    initialPosition={{ x: 0, y: 390 }}
                    onDoubleClick={() => {
                      if (!openWindows.includes('misc')) {
                        setOpenWindows(prev => [...prev, 'misc']);
                      } else if (minimizedWindows.includes('misc')) {
                        setMinimizedWindows(prev => prev.filter(w => w !== 'misc'));
                      }
                    }}
                  />
                  <DesktopIcon 
                    label="WEB" 
                    icon={LogOut} 
                    initialPosition={{ x: 0, y: 520 }}
                    onDoubleClick={onSwitchToLegacy}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Windows */}
          <Window 
            id="projects" 
            title="Projects" 
            isOpen={openWindows.includes('projects')} 
            isMinimized={minimizedWindows.includes('projects')}
            onClose={() => closeWindow('projects')}
            onMinimize={() => minimizeWindow('projects')}
          >
            <ProjectsApp />
          </Window>

          <Window 
            id="about" 
            title="" 
            isOpen={openWindows.includes('about')} 
            isMinimized={minimizedWindows.includes('about')}
            onClose={() => closeWindow('about')}
            onMinimize={() => minimizeWindow('about')}
          >
            <AboutApp />
          </Window>

          <Window 
            id="contact" 
            title="Contact" 
            isOpen={openWindows.includes('contact')} 
            isMinimized={minimizedWindows.includes('contact')}
            onClose={() => closeWindow('contact')}
            onMinimize={() => minimizeWindow('contact')}
          >
            <ContactApp />
          </Window>

          <Window 
            id="misc" 
            title="Misc" 
            isOpen={openWindows.includes('misc')} 
            isMinimized={minimizedWindows.includes('misc')}
            onClose={() => closeWindow('misc')}
            onMinimize={() => minimizeWindow('misc')}
          >
            <div className="flex items-center justify-center h-full text-2xl text-gray-400 font-p5 tracking-tighter">
              <span>This folder is empty.</span>
            </div>
          </Window>

          <Window 
            id="spotify" 
            title="Spotify" 
            isOpen={openWindows.includes('spotify')} 
            isMinimized={minimizedWindows.includes('spotify')}
            onClose={() => closeWindow('spotify')}
            onMinimize={() => minimizeWindow('spotify')}
          >
            <div className="w-full h-full bg-black flex items-center justify-center">
              <iframe 
                style={{ borderRadius: '12px' }} 
                src="https://open.spotify.com/embed/playlist/22zh0cByp4gBqH2RVPABXn?utm_source=generator"
                width="100%" 
                height="100%" 
                frameBorder="0" 
                allowFullScreen 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
              />
            </div>
          </Window>

          {/* Taskbar */}
          <Taskbar 
            onSwitchToLegacy={onSwitchToLegacy} 
            onOpenWindow={toggleWindow}
            openWindows={openWindows}
          />
        </motion.div>
      )}
    </div>
  );
};

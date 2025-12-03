"use client";

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { FolderGit2, User, Mail, Grid, FileText, LogOut } from 'lucide-react';
import { LockScreen } from './LockScreen';
import { DesktopIcon } from './DesktopIcon';
import { Taskbar } from './Taskbar';
import { Window } from './Window';
import { AboutApp } from './apps/AboutApp';
import { ContactApp } from './apps/ContactApp';
import { ProjectsApp } from './apps/ProjectsApp';

interface DesktopEnvironmentProps {
  onSwitchToLegacy: () => void;
}

export const DesktopEnvironment: React.FC<DesktopEnvironmentProps> = ({ onSwitchToLegacy }) => {
  const [isLocked, setIsLocked] = useState(true);
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [minimizedWindows, setMinimizedWindows] = useState<string[]>([]);

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
    <div className="fixed inset-0 bg-cover bg-center overflow-hidden" 
         style={{ backgroundImage: "url('https://images.unsplash.com/photo-1477346611705-65d1883cee1e?q=80&w=2070&auto=format&fit=crop')" }}>
      
      <AnimatePresence>
        {isLocked && <LockScreen onUnlock={() => setIsLocked(false)} />}
      </AnimatePresence>

      {!isLocked && (
        <>
          {/* Desktop Icons Area */}
          <div className="absolute inset-0 pointer-events-none">
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
                    label="About Me" 
                    icon={User} 
                    initialPosition={{ x: 0, y: 100 }}
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
                    initialPosition={{ x: 0, y: 200 }}
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
                    initialPosition={{ x: 0, y: 300 }}
                    onDoubleClick={() => {
                      if (!openWindows.includes('misc')) {
                        setOpenWindows(prev => [...prev, 'misc']);
                      } else if (minimizedWindows.includes('misc')) {
                        setMinimizedWindows(prev => prev.filter(w => w !== 'misc'));
                      }
                    }}
                  />
                  <DesktopIcon 
                    label="Switch to Website" 
                    icon={LogOut} 
                    initialPosition={{ x: 0, y: 400 }}
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
            title="About Me" 
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
            <div className="flex items-center justify-center h-full text-gray-400">
              <p>This folder is empty.</p>
            </div>
          </Window>

          {/* Taskbar */}
          <Taskbar 
            onSwitchToLegacy={onSwitchToLegacy} 
            onOpenWindow={toggleWindow}
            openWindows={openWindows}
          />
        </>
      )}
    </div>
  );
};

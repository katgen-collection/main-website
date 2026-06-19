"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, Grid, User, Mail, FolderOpen, LogOut } from 'lucide-react';

interface TaskbarItemProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  isActive?: boolean;
  rotation?: number;
}

const TaskbarItem: React.FC<TaskbarItemProps> = ({ icon: Icon, label, onClick, isActive, rotation = 0 }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.2, rotate: 0, y: -10 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      style={{ rotate: rotation }}
      className={`relative flex flex-col items-center justify-center w-14 h-14 transition-all duration-300 group`}
      title={label}
    >
      <div className={`absolute inset-0 border-2 border-black transition-all duration-200 ${
        isActive 
          ? 'bg-purple-500 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-x-[2px] translate-y-[2px]' 
          : 'bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-[3px] group-hover:translate-y-[3px] group-hover:bg-purple-300'
      }`}></div>
      
      <div className="relative z-10">
        <Icon className={`w-7 h-7 transition-colors ${isActive ? 'text-white' : 'text-black'}`} />
      </div>
      
      {/* Tooltip-like label on hover */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
        <span className="bg-black text-white text-sm font-p5 tracking-tightest px-2 py-1 border border-white shadow-[2px_2px_0px_0px_rgba(255,255,255,0.5)]">
          {label}
        </span>
      </div>
    </motion.button>
  );
};

interface TaskbarProps {
  onSwitchToLegacy: () => void;
  onOpenWindow: (id: string) => void;
  openWindows: string[];
}

export const Taskbar: React.FC<TaskbarProps> = ({ onSwitchToLegacy, onOpenWindow, openWindows }) => {
  // Auto-hide dock: reveal when the cursor nears the bottom of the screen,
  // tuck it away otherwise so it never obstructs window content.
  const [revealed, setRevealed] = useState(true);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    // Hide shortly after mount so users see it, then it gets out of the way.
    const initial = setTimeout(() => setRevealed(false), 2200);

    const handleMove = (e: MouseEvent) => {
      // Distance from the bottom edge of the viewport.
      const fromBottom = window.innerHeight - e.clientY;
      setRevealed(fromBottom <= 130);
    };

    window.addEventListener('mousemove', handleMove);
    return () => {
      clearTimeout(initial);
      window.removeEventListener('mousemove', handleMove);
    };
  }, []);

  const show = revealed || hovered;

  return (
    <>
      {/* Invisible hit zone along the bottom edge to trigger the reveal */}
      <div
        className="fixed bottom-0 left-0 right-0 h-4 z-[99]"
        onMouseEnter={() => setRevealed(true)}
      />

      <motion.div
        className="fixed bottom-6 left-1/2 z-[100] w-auto"
        initial={false}
        animate={{ y: show ? 0 : 150, opacity: show ? 1 : 0.85 }}
        transition={{ type: 'spring', stiffness: 320, damping: 30 }}
        style={{ x: '-50%' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
      {/* Background container with skewed comic style */}
      <div className="relative px-8 py-4 bg-[#e0e0e0] border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] -skew-x-6 transform rotate-1">

        {/* Inner content un-skewed */}
        <div className="flex items-center gap-6 skew-x-6">
          <TaskbarItem icon={Grid} label="All Apps" rotation={-3} />
          
          <div className="w-1 h-10 bg-black rotate-12 mx-2" />
          
          <TaskbarItem 
            icon={FolderOpen} 
            label="Projects" 
            onClick={() => onOpenWindow('projects')}
            isActive={openWindows.includes('projects')}
            rotation={2}
          />
          <TaskbarItem 
            icon={User} 
            label="ME" 
            onClick={() => onOpenWindow('about')}
            isActive={openWindows.includes('about')}
            rotation={-2}
          />
          <TaskbarItem 
            icon={Mail} 
            label="CONTACT" 
            onClick={() => onOpenWindow('contact')}
            isActive={openWindows.includes('contact')}
            rotation={3}
          />
          
          <div className="w-1 h-10 bg-black -rotate-6 mx-2" />
          
          <TaskbarItem
            icon={LogOut}
            label="WEB"
            onClick={onSwitchToLegacy}
            rotation={-1}
          />
        </div>
      </div>
      </motion.div>
    </>
  );
};

"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, Monitor, Grid, User, Mail, FolderOpen, LogOut } from 'lucide-react';

interface TaskbarItemProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  isActive?: boolean;
}

const TaskbarItem: React.FC<TaskbarItemProps> = ({ icon: Icon, label, onClick, isActive }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.2, y: -10 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={`relative flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all ${
        isActive ? 'bg-white/20' : 'hover:bg-white/10'
      }`}
      title={label}
    >
      <Icon className="w-6 h-6 text-white" />
      {isActive && (
        <div className="absolute -bottom-2 w-1 h-1 bg-white rounded-full" />
      )}
    </motion.button>
  );
};

interface TaskbarProps {
  onSwitchToLegacy: () => void;
  onOpenWindow: (id: string) => void;
  openWindows: string[];
}

export const Taskbar: React.FC<TaskbarProps> = ({ onSwitchToLegacy, onOpenWindow, openWindows }) => {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-2 px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl">
        <TaskbarItem icon={Grid} label="All Apps" />
        <div className="w-px h-8 bg-white/20 mx-1" />
        <TaskbarItem 
          icon={FolderOpen} 
          label="Projects" 
          onClick={() => onOpenWindow('projects')}
          isActive={openWindows.includes('projects')}
        />
        <TaskbarItem 
          icon={User} 
          label="About Me" 
          onClick={() => onOpenWindow('about')}
          isActive={openWindows.includes('about')}
        />
        <TaskbarItem 
          icon={Mail} 
          label="Contact" 
          onClick={() => onOpenWindow('contact')}
          isActive={openWindows.includes('contact')}
        />
        <div className="w-px h-8 bg-white/20 mx-1" />
        <TaskbarItem icon={LogOut} label="Switch to Website" onClick={onSwitchToLegacy} />
      </div>
    </div>
  );
};

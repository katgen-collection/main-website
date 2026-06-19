"use client";

import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import { LucideIcon } from 'lucide-react';

interface DesktopIconProps {
  label: string;
  icon: LucideIcon;
  initialPosition?: { x: number; y: number };
  onDoubleClick?: () => void;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({ label, icon: Icon, initialPosition = { x: 0, y: 0 }, onDoubleClick }) => {
  const nodeRef = useRef(null);
  // Stagger the idle float so the icons don't bob in unison.
  const floatDelay = `${(initialPosition.y / 130) * 0.6}s`;

  return (
    <Draggable nodeRef={nodeRef} defaultPosition={initialPosition}>
      <div
        ref={nodeRef}
        className="absolute flex flex-col items-center gap-2 p-2 w-24 cursor-pointer group transition-colors"
        onDoubleClick={onDoubleClick}
      >
        <div
          className="w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-200 animate-float-y"
          style={{ animationDelay: floatDelay }}
        >
          {/* glow halo on hover for depth */}
          <div className="absolute inset-0 rounded-full bg-purple-500/50 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative w-14 h-14 bg-gradient-to-br from-purple-200 to-purple-400 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center group-hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] group-active:translate-x-0.5 group-active:translate-y-0.5 group-active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
            <Icon className="w-8 h-8 text-black" />
            {/* corner stud */}
            <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-yellow-400 border-2 border-black opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
        <span className="relative bg-white border-2 border-black px-2 py-1 text-lg font-p5 text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] -rotate-2 group-hover:rotate-0 group-hover:bg-yellow-400 transition-all select-none tracking-tightest">
          {label}
        </span>
      </div>
    </Draggable>
  );
};

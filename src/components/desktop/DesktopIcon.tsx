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

  return (
    <Draggable nodeRef={nodeRef} defaultPosition={initialPosition}>
      <div 
        ref={nodeRef}
        className="absolute flex flex-col items-center gap-2 p-2 w-24 cursor-pointer group transition-colors"
        onDoubleClick={onDoubleClick}
      >
        <div className="w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
          <div className="w-14 h-14 bg-yellow-300 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center group-active:translate-x-0.5 group-active:translate-y-0.5 group-active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
            <Icon className="w-8 h-8 text-black" />
          </div>
        </div>
        <span className="bg-white border-2 border-black px-2 py-1 text-lg font-p5 text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] -rotate-2 group-hover:rotate-0 transition-transform select-none tracking-tightest">
          {label}
        </span>
      </div>
    </Draggable>
  );
};

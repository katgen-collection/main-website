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
        className="absolute flex flex-col items-center gap-1 p-2 w-24 cursor-pointer group rounded-lg hover:bg-white/10 active:bg-white/20 transition-colors"
        onDoubleClick={onDoubleClick}
      >
        <div className="w-16 h-16 flex items-center justify-center group-hover:scale-105 transition-transform">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-black/20">
            <Icon className="w-8 h-8 text-white" />
          </div>
        </div>
        <span className="text-white text-xs font-medium text-center drop-shadow-md select-none px-2 py-0.5 rounded-md" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
          {label}
        </span>
      </div>
    </Draggable>
  );
};

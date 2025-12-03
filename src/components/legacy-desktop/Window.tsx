"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Maximize2, Minimize2 } from 'lucide-react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';

interface WindowProps {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized?: boolean;
  onClose: () => void;
  onMinimize?: () => void;
  children: React.ReactNode;
}

export const Window: React.FC<WindowProps> = ({ 
  id, 
  title, 
  isOpen, 
  isMinimized = false,
  onClose, 
  onMinimize,
  children 
}) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [isMaximized, setIsMaximized] = useState(false);
  const [size, setSize] = useState({ width: 800, height: 500 });
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isResizing, setIsResizing] = useState(false);

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  const startResizing = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      
      if (nodeRef.current) {
        const rect = nodeRef.current.getBoundingClientRect();
        const newWidth = e.clientX - rect.left;
        const newHeight = e.clientY - rect.top;
        
        if (newWidth > 400 && newHeight > 300) {
          setSize({ width: newWidth, height: newHeight });
        }
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  if (!isOpen) return null;

  const handleDragStop = (e: DraggableEvent, data: DraggableData) => {
    setPosition({ x: data.x, y: data.y });
  };

  const windowStyle: React.CSSProperties = {
    ...(isMaximized ? {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      transform: 'none',
      borderRadius: 0,
    } : {
      width: size.width,
      height: size.height,
    }),
    display: isMinimized ? 'none' : 'flex'
  };

  const content = (
    <div 
      ref={nodeRef}
      className={`absolute bg-[#1e1e1e] shadow-2xl border border-white/10 flex flex-col overflow-hidden z-40 ${
        !isMaximized ? 'rounded-xl' : ''
      }`}
      style={windowStyle}
    >
      <div 
        className="window-header h-10 bg-[#2d2d2d] flex items-center justify-between px-4 cursor-grab active:cursor-grabbing border-b border-white/5 shrink-0"
        onDoubleClick={toggleMaximize}
      >
        <div className="flex items-center gap-2">
          <button 
            onClick={onClose} 
            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors flex items-center justify-center group"
          >
            <X className="w-2 h-2 text-black opacity-0 group-hover:opacity-100" />
          </button>
          <button 
            onClick={onMinimize}
            className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors flex items-center justify-center group"
          >
            <Minus className="w-2 h-2 text-black opacity-0 group-hover:opacity-100" />
          </button>
          <button 
            onClick={toggleMaximize}
            className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors flex items-center justify-center group"
          >
            {isMaximized ? (
              <Minimize2 className="w-2 h-2 text-black opacity-0 group-hover:opacity-100" />
            ) : (
              <Maximize2 className="w-2 h-2 text-black opacity-0 group-hover:opacity-100" />
            )}
          </button>
        </div>
        <span className="text-sm text-gray-400 font-medium select-none">{title}</span>
        <div className="w-14" /> {/* Spacer for centering */}
      </div>
      <div className="flex-1 overflow-auto p-6 text-gray-300 relative">
        {children}
      </div>

      {!isMaximized && (
        <div 
          className="absolute bottom-0 right-0 w-6 h-6 cursor-se-resize flex items-center justify-center z-50 hover:bg-white/10 rounded-tl-lg"
          onMouseDown={startResizing}
        >
           <div className="w-2 h-2 border-r-2 border-b-2 border-gray-500 mr-1 mb-1" />
        </div>
      )}
    </div>
  );

  if (isMaximized) {
    return content;
  }

  return (
    <Draggable 
      handle=".window-header" 
      bounds="parent" 
      nodeRef={nodeRef}
      defaultPosition={position}
      onStop={handleDragStop}
    >
      {content}
    </Draggable>
  );
};

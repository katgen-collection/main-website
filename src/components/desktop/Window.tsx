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
      zIndex: 60,
      transform: 'none',
      borderRadius: 0,
      border: 'none',
      boxShadow: 'none',
    } : {
      width: size.width,
      height: size.height,
    }),
  };

  const content = (
    <motion.div
      initial={{ scale: 0, opacity: 0, rotate: 5 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      exit={{ scale: 0, opacity: 0, rotate: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`flex flex-col overflow-hidden h-full w-full ${
        !isMaximized 
          ? 'bg-white border-[6px] border-black shadow-[15px_15px_0px_0px_rgba(0,0,0,1)]' 
          : 'bg-white border-b-[6px] border-black'
      }`}
    >
      <div 
        className={`window-header h-16 flex items-center justify-between px-6 cursor-grab active:cursor-grabbing border-b-[6px] border-black shrink-0 ${
            isMaximized ? 'bg-purple-500' : 'bg-yellow-400'
        } relative overflow-hidden`}
        onDoubleClick={toggleMaximize}
      >
        {/* Decorative pattern overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] bg-size-[4px_4px]" />

        <div className="flex items-center gap-2 z-10 relative">
          <div className="bg-black text-white px-4 py-2 transform -rotate-2 border-2 border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:rotate-0 transition-transform duration-300">
            <span className="text-2xl font-p5 tracking-widest uppercase">{title}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-6 z-10">
          <button 
            onClick={onMinimize}
            className="group relative transition-transform hover:scale-110 hover:rotate-6"
            title="Minimize"
          >
            <Minus className="w-8 h-8 text-cyan-400 stroke-[5] drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] group-hover:text-cyan-300 group-active:translate-x-1 group-active:translate-y-1 group-active:drop-shadow-none transition-all" />
          </button>
          <button 
            onClick={toggleMaximize}
            className="group relative transition-transform hover:scale-110 hover:-rotate-6"
            title="Maximize"
          >
            {isMaximized ? (
              <Minimize2 className="w-8 h-8 text-green-400 stroke-[5] drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] group-hover:text-green-300 group-active:translate-x-1 group-active:translate-y-1 group-active:drop-shadow-none transition-all" />
            ) : (
              <Maximize2 className="w-8 h-8 text-green-400 stroke-[5] drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] group-hover:text-green-300 group-active:translate-x-1 group-active:translate-y-1 group-active:drop-shadow-none transition-all" />
            )}
          </button>
          <button 
            onClick={onClose} 
            className="group relative transition-transform hover:scale-110 hover:rotate-12"
            title="Close"
          >
            <X className="w-8 h-8 text-red-500 stroke-[5] drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] group-hover:text-red-400 group-active:translate-x-1 group-active:translate-y-1 group-active:drop-shadow-none transition-all" />
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto bg-zinc-900 text-gray-100 relative p-6">
        {children}
      </div>

      {!isMaximized && (
        <div 
          className="absolute bottom-0 right-0 w-8 h-8 cursor-se-resize flex items-center justify-center z-50 bg-yellow-400 border-t-[6px] border-l-[6px] border-black"
          onMouseDown={startResizing}
        >
           <div className="w-full h-full flex flex-col items-end justify-end p-1 gap-0.5">
             <div className="w-4 h-1 bg-black" />
             <div className="w-2 h-1 bg-black" />
           </div>
        </div>
      )}
    </motion.div>
  );

  return (
    <AnimatePresence>
      {(isOpen && !isMinimized) && (
        isMaximized ? (
          <div style={windowStyle} className="fixed z-[60]">
             {content}
          </div>
        ) : (
          <Draggable 
            handle=".window-header" 
            bounds="parent" 
            nodeRef={nodeRef}
            defaultPosition={position}
            onStop={handleDragStop}
          >
            <div ref={nodeRef} style={{ ...windowStyle, position: 'absolute', zIndex: 40 }}>
              {content}
            </div>
          </Draggable>
        )
      )}
    </AnimatePresence>
  );
};

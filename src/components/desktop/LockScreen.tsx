"use client";

import backgroundImage from '../../../public/assets/desktop-background.jpg';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, ArrowRight, Star } from 'lucide-react';

interface LockScreenProps {
  onUnlock: () => void;
}

export const LockScreen: React.FC<LockScreenProps> = ({ onUnlock }) => {
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
      setDate(now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
      exit={{ 
        clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
        transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] } 
      }}
      className="fixed inset-0 z-100 flex flex-col items-center justify-center gap-24 py-20 text-white overflow-hidden"
      style={{
        backgroundImage: "url(" + backgroundImage.src + ")",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      {/* Comic Halftone Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.8)_1px,transparent_1px)] pointer-events-none z-0" style={{ backgroundSize: '4px 4px' }} />
      <div className="absolute inset-0 bg-purple-900/60 mix-blend-multiply z-0" />
      
      {/* Diagonal Slice Decoration */}
      <div className="absolute top-0 right-0 w-2/3 h-full bg-black/40 -skew-x-12 translate-x-1/4 z-0 border-l-4 border-white/20" />

      <div className="relative z-10 flex flex-col items-center">
        <div className="bg-black px-8 py-4 transform -rotate-2 border-4 border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)]">
          <h1 className="text-9xl font-p5 tracking-widest text-white drop-shadow-[4px_4px_0px_rgba(168,85,247,1)]">
            {time}
          </h1>
        </div>
        <div className="mt-6 bg-yellow-400 px-6 py-2 transform rotate-1 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-3xl font-p5 text-black tracking-wider uppercase">{date}</p>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-4 group">
          <div className="relative">
            <div className="absolute inset-0 bg-black rounded-full transform translate-x-2 translate-y-2" />
            <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center overflow-hidden border-4 border-black relative z-10 group-hover:scale-105 transition-transform duration-300">
               <User className="w-16 h-16 text-black" />
            </div>
            <div className="absolute -top-2 -right-2">
              <Star className="w-8 h-8 text-yellow-400 fill-yellow-400 stroke-black stroke-2 animate-spin-slow" />
            </div>
          </div>
          <div className="bg-white px-6 py-1 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-1">
            <h2 className="text-2xl font-p5 text-black tracking-[0.15em] [word-spacing:0.8rem]">Mikhail Haritz</h2>
          </div>
        </div>
        
        <button 
          onClick={onUnlock}
          className="group relative px-12 py-4 bg-red-600 hover:bg-red-500 transition-colors border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl font-p5 text-white tracking-[0.15em] uppercase [word-spacing:0.5rem]">Take Your Heart</span>
            <ArrowRight className="w-6 h-6 text-white stroke-3 group-hover:translate-x-2 transition-transform" />
          </div>
          {/* Decorative corner */}
          <div className="absolute -top-2 -left-2 w-4 h-4 bg-yellow-400 border-2 border-black" />
          <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-yellow-400 border-2 border-black" />
        </button>
      </div>
    </motion.div>
  );
};

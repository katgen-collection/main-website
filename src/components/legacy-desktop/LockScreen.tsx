"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, ArrowRight } from 'lucide-react';

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
      initial={{ y: 0 }}
      exit={{ y: "-100%", transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-xl flex flex-col items-center justify-between py-20 text-white"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1477346611705-65d1883cee1e?q=80&w=2070&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      
      <div className="relative z-10 flex flex-col items-center mt-20">
        <h1 className="text-8xl font-thin tracking-tighter mb-4">{time}</h1>
        <p className="text-2xl font-medium">{date}</p>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 mb-20">
        <div className="flex flex-col items-center gap-4">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-4 border-white/20">
             <User className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold">Mikhail Haritz</h2>
        </div>
        
        <button 
          onClick={onUnlock}
          className="group flex items-center gap-2 px-6 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full transition-all border border-white/10"
        >
          <span className="text-sm font-medium">Click to Enter</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};

"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FolderGit2, User, Mail, Grid, LogOut, LucideIcon } from "lucide-react";

interface MenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

const ITEMS: MenuItem[] = [
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "about", label: "About Me", icon: User },
  { id: "contact", label: "Contact", icon: Mail },
  { id: "misc", label: "Misc", icon: Grid },
  { id: "web", label: "Switch to Web", icon: LogOut },
];

interface BattleMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onSelect: (id: string) => void;
}

/**
 * Persona-5 battle-command style context menu. Opens on desktop right-click;
 * each command is a slanted bar that pops out and reddens on hover, the way
 * the in-game command wheel highlights the active option.
 */
export const BattleMenu: React.FC<BattleMenuProps> = ({ x, y, onClose, onSelect }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    // Full-screen catcher: any click / right-click / scroll dismisses the menu.
    <div
      className="fixed inset-0 z-[150]"
      onClick={onClose}
      onContextMenu={(e) => {
        e.preventDefault();
        onClose();
      }}
      onWheel={onClose}
    >
      <motion.div
        className="absolute origin-top-left"
        style={{ left: x, top: y }}
        initial={{ opacity: 0, scale: 0.85, rotate: -2 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 420, damping: 24 }}
        onClick={(e) => e.stopPropagation()}
        onContextMenu={(e) => e.stopPropagation()}
      >
        {/* Header tab */}
        <div className="-skew-x-6 mb-2 w-fit bg-yellow-400 border-2 border-black px-3 py-0.5 -rotate-1 shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
          <span className="font-p5 text-black text-sm tracking-tighter [word-spacing:0.3rem]">
            COMMAND
          </span>
        </div>

        <div className="flex flex-col gap-1.5">
          {ITEMS.map((item, i) => (
            <motion.button
              key={item.id}
              type="button"
              initial={{ x: -36, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.03 * i, type: "spring", stiffness: 500, damping: 28 }}
              onClick={() => onSelect(item.id)}
              className="group relative -skew-x-6 flex items-center gap-3 w-56 bg-black text-white border-2 border-white px-4 py-2 shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:bg-red-600 hover:border-yellow-400 hover:translate-x-2 transition-all duration-150"
            >
              <item.icon className="w-5 h-5 skew-x-6 shrink-0" />
              <span className="skew-x-6 font-p5 text-lg tracking-tighter [word-spacing:0.25rem]">
                {item.label}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

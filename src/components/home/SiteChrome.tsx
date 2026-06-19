"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Monitor } from "lucide-react";

const NAV = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#stack", label: "Stack" },
  { href: "/#contact", label: "Contact" },
];

/**
 * Shared editorial top nav. On the home page it receives `onDesktop` (toggles
 * view state); on standalone routes it omits it and links back to "/" instead.
 */
export function SiteNav({ onDesktop }: { onDesktop?: () => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const desktopClasses =
    "flex items-center gap-2 font-code text-xs uppercase tracking-[0.15em] text-[#8A8A94] hover:text-violet-400 transition-colors";

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-[#0B0C10]/80 backdrop-blur-md border-b border-white/[0.07]"
          : "border-b border-transparent"
      }`}
    >
      <div className="max-w-[1500px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link href="/#top" className="font-code text-sm tracking-wide text-[#ECECEE]">
          MIKHAIL<span className="text-violet-400">.</span>HARITZ
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="font-code text-xs uppercase tracking-[0.15em] text-[#8A8A94] hover:text-[#ECECEE] transition-colors"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        {onDesktop ? (
          <button onClick={onDesktop} title="Switch to desktop mode" className={desktopClasses}>
            <Monitor className="w-4 h-4" />
            <span className="hidden sm:inline">Desktop</span>
          </button>
        ) : (
          <Link href="/" title="Switch to desktop mode" className={desktopClasses}>
            <Monitor className="w-4 h-4" />
            <span className="hidden sm:inline">Desktop</span>
          </Link>
        )}
      </div>
    </header>
  );
}

export function SiteFooter({ onDesktop }: { onDesktop?: () => void }) {
  const label = "font-code text-[11px] uppercase tracking-[0.15em] text-[#6B6B74] hover:text-violet-400 transition-colors";
  return (
    <footer className="border-t border-white/[0.07]">
      <div className="max-w-[1500px] mx-auto px-6 lg:px-10 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-code text-[11px] uppercase tracking-[0.15em] text-[#6B6B74]">
          © {new Date().getFullYear()} Mikhail Haritz
        </p>
        {onDesktop ? (
          <button onClick={onDesktop} className={label}>
            Enter desktop mode →
          </button>
        ) : (
          <Link href="/" className={label}>
            Enter desktop mode →
          </Link>
        )}
      </div>
    </footer>
  );
}

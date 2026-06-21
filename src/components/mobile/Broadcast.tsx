"use client";

/** Small reusable broadcast-chrome bits: ON AIR, signal bars, ticker, weather. */

export function OnAir({ label = "ON AIR", className = "" }: { label?: string; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <span className="h-2 w-2 rounded-full bg-[#c0392b] p4-blink" aria-hidden />
      <span className="font-p4-tele text-sm leading-none text-[#e85a4a]">{label}</span>
    </span>
  );
}

export function SignalBars({ color = "#8fd6d6", className = "" }: { color?: string; className?: string }) {
  return (
    <span className={`inline-flex items-end gap-0.5 ${className}`} aria-hidden>
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className="p4-bar block w-1"
          style={{ height: 5 + i * 3, background: color, animationDelay: `${i * 0.12}s` }}
        />
      ))}
    </span>
  );
}

export function Ticker({ text, className = "" }: { text: string; className?: string }) {
  const line = `${text}   `;
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <span className="p4-marquee font-p4-tele text-base text-[#cdd2a0]">
        {line}
        {line}
      </span>
    </div>
  );
}

export function WeatherChip({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <span className="font-p4-label text-[10px] tracking-[0.15em] text-[#6b7148]">FORECAST</span>
      <span className="font-p4-tele text-base leading-none text-[#8fd6d6]">FOG</span>
    </span>
  );
}

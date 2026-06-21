import type React from "react"
import type { Metadata } from "next"
import { Inter, Space_Grotesk, JetBrains_Mono, Rubik_Mono_One, VT323, DotGothic16 } from "next/font/google"
import localFont from "next/font/local";
import "./globals.css"

// Body — neutral, highly legible
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
// Display — characterful grotesk for headlines
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" })
// Mono — eyebrows, metadata, stack tags ("systems" voice)
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-code" })

// P4 mobile OS - broadcast display headlines (channel names, NOW PLAYING)
const rubikMonoOne = Rubik_Mono_One({ subsets: ["latin"], weight: "400", variable: "--font-p4-display" })
// P4 mobile OS - teletext numerals, clock, body readouts
const vt323 = VT323({ subsets: ["latin"], weight: "400", variable: "--font-p4-tele" })
// P4 mobile OS - pixel labels and channel tags
const dotGothic = DotGothic16({ subsets: ["latin"], weight: "400", variable: "--font-p4-label" })

const p5_font = localFont({
  src: [
    { path: "../../public/fonts/Persona5main.woff2", weight: "400", style: "normal" },
  ],
  variable: "--font-p5",
});

export const metadata: Metadata = {
  title: "Mikhail Haritz - Web Developer Portfolio",
  description: "A modern portfolio website showcasing web development projects",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${p5_font.variable} ${rubikMonoOne.variable} ${vt323.variable} ${dotGothic.variable} font-sans bg-black text-white`}>
          {children}
      </body>
    </html>
  )
}

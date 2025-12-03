import type React from "react"
import type { Metadata } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"
import localFont from "next/font/local";
import "./globals.css"

const plus_jakarta_sans = Plus_Jakarta_Sans({ subsets: ["latin"] })

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
      <body className={`${plus_jakarta_sans.className} ${p5_font.variable} bg-black text-white`}>
          {children}
      </body>
    </html>
  )
}

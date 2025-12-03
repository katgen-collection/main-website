import { Metadata } from "next";
import HomeClient from "@/components/home";

export const metadata: Metadata = {
  title: "Mikhail Haritz | Full Stack Developer",
  description: "Portfolio of Mikhail Haritz, a Full Stack Developer specializing in modern web technologies.",
  openGraph: {
    title: "Mikhail Haritz | Full Stack Developer",
    description: "Portfolio of Mikhail Haritz, a Full Stack Developer specializing in modern web technologies.",
    url: "https://mikhailjbs.my.id",
    siteName: "Mikhail Haritz Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function Home() {
  return <HomeClient />;
}

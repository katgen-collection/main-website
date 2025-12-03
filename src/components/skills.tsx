import type { ReactElement } from "react";

import {
  Code,
  Server,
  Database,
  Settings
} from "lucide-react";

export interface SkillCategory {
  title: string;
  icon: ReactElement;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    icon: <Code className="h-6 w-6 text-purple-400" />,
    skills: ["React / Next.js / Vue.js", "TypeScript", "JavaScript", "Tailwind CSS", "HTML / CSS"]
  },
  {
    title: "Backend",
    icon: <Server className="h-6 w-6 text-purple-400" />,
    skills: ["Node.js", "Express", "Spring Boot", "Django", "REST APIs"]
  },
  {
    title: "Database",
    icon: <Database className="h-6 w-6 text-purple-400" />,
    skills: ["MongoDB", "PostgreSQL", "NeonDB", "Supabase"]
  },
  {
    title: "Tools",
    icon: <Settings className="h-6 w-6 text-purple-400" />,
    skills: ["Git / GitHub", "VS Code", "Figma", "Docker", "Vercel / Netlify"]
  }
];

import type { ReactElement } from "react";

import { Server, Code, BrainCircuit, Cloud } from "lucide-react";

export interface SkillCategory {
  title: string;
  icon: ReactElement;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Backend & Systems",
    icon: <Server className="h-6 w-6 text-violet-400" />,
    skills: ["Go", "Spring Boot", "Node.js / Express", "Python", "Microservices", "Event-Driven (Kafka, RabbitMQ)", "Redis"]
  },
  {
    title: "Frontend",
    icon: <Code className="h-6 w-6 text-violet-400" />,
    skills: ["TypeScript", "Next.js", "React", "Tailwind CSS"]
  },
  {
    title: "AI Engineering",
    icon: <BrainCircuit className="h-6 w-6 text-violet-400" />,
    skills: ["LLM Integration", "Agentic Workflows & Tooling", "RAG & Retrieval", "Prompt Engineering & Evaluation", "NLP"]
  },
  {
    title: "Infrastructure",
    icon: <Cloud className="h-6 w-6 text-violet-400" />,
    skills: ["Docker", "Kubernetes", "CI/CD (GitHub Actions, GitLab)", "Linux", "PostgreSQL / MongoDB", "GCP"]
  }
];

import { motion } from "framer-motion";
import { skillCategories } from "@/components/skills";

export default function SkillsGrid() {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {skillCategories.map((category, index) => (
        <motion.div
          key={index}
          className="bg-white/5 p-6 rounded-lg border border-white/10 hover:border-purple-400/50 transition-colors"
        >
          <div className="bg-purple-400/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            {category.icon}
          </div>
          <h3 className="font-medium text-lg mb-3">{category.title}</h3>
          <ul className="space-y-2 text-gray-300">
            {category.skills.map((skill, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span> {skill}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </motion.div>
  );
}

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export default function QuizQuestion({ question, selectedSkills, onToggleSkill }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-8">
        <p className="text-sm font-medium text-secondary uppercase tracking-wider mb-2">
          {question.category}
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">
          {question.question}
        </h2>
        <p className="text-muted-foreground mt-2">{question.description}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {question.skills.map((skill) => {
          const isSelected = selectedSkills.includes(skill.id);
          return (
            <button
              key={skill.id}
              onClick={() => onToggleSkill(skill.id)}
              className={cn(
                "relative flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 text-left",
                isSelected
                  ? "border-secondary bg-secondary/10 shadow-md"
                  : "border-border bg-card hover:border-muted-foreground/30 hover:shadow-sm"
              )}
            >
              <span className="text-2xl">{skill.icon}</span>
              <span className={cn(
                "font-medium text-sm",
                isSelected ? "text-foreground" : "text-muted-foreground"
              )}>
                {skill.label}
              </span>
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-secondary flex items-center justify-center"
                >
                  <Check className="w-3.5 h-3.5 text-secondary-foreground" />
                </motion.div>
              )}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
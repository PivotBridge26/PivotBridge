import React from "react";
import { Badge } from "@/components/ui/badge";
import { quizQuestions } from "../quiz/quizData";

const skillLabels = {};
quizQuestions.forEach(q => {
  q.skills.forEach(s => {
    skillLabels[s.id] = { label: s.label, icon: s.icon };
  });
});

export default function SkillsList({ skills }) {
  if (!skills || skills.length === 0) return null;

  return (
    <div className="bg-card rounded-2xl border border-border p-6">
      <h3 className="text-lg font-bold text-foreground mb-4">
        Your Identified Skills ({skills.length})
      </h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skillId) => {
          const skill = skillLabels[skillId];
          return (
            <Badge
              key={skillId}
              variant="secondary"
              className="bg-primary/10 text-primary border border-primary/20 px-3 py-1.5 text-sm"
            >
              {skill?.icon} {skill?.label || skillId}
            </Badge>
          );
        })}
      </div>
    </div>
  );
}
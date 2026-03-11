import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import QuizQuestion from "../components/quiz/QuizQuestion";
import QuizProgress from "../components/quiz/QuizProgress";
import { quizQuestions, calculateSkillScores, matchJobs } from "../components/quiz/quizData";

export default function SkillQuiz() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [saving, setSaving] = useState(false);

  const currentQuestion = quizQuestions[currentStep];
  const selectedSkills = answers[currentQuestion.id] || [];

  const handleToggleSkill = (skillId) => {
    setAnswers(prev => {
      const current = prev[currentQuestion.id] || [];
      const updated = current.includes(skillId)
        ? current.filter(s => s !== skillId)
        : [...current, skillId];
      return { ...prev, [currentQuestion.id]: updated };
    });
  };

  const handleNext = () => {
    if (currentStep < quizQuestions.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleFinish = async () => {
    setSaving(true);

    const allSkills = Object.values(answers).flat();
    const skillScores = calculateSkillScores(allSkills);
    const matched = matchJobs(allSkills);

    const quizAnswersArr = Object.entries(answers).map(([qId, skills]) => ({
      question_id: parseInt(qId),
      selected_skills: skills,
    }));

    const user = await base44.auth.me();

    // Check if user already has a profile
    const existing = await base44.entities.UserProfile.filter({ created_by: user.email });

    const profileData = {
      quiz_answers: quizAnswersArr,
      identified_skills: allSkills,
      skill_scores: skillScores,
      matched_jobs: matched,
      quiz_completed: true,
    };

    if (existing.length > 0) {
      await base44.entities.UserProfile.update(existing[0].id, profileData);
    } else {
      await base44.entities.UserProfile.create(profileData);
    }

    navigate(createPageUrl("Results"));
  };

  const isLastStep = currentStep === quizQuestions.length - 1;

  return (
    <div className="max-w-2xl mx-auto">
      <QuizProgress current={currentStep} total={quizQuestions.length} />

      <AnimatePresence mode="wait">
        <QuizQuestion
          key={currentQuestion.id}
          question={currentQuestion}
          selectedSkills={selectedSkills}
          onToggleSkill={handleToggleSkill}
        />
      </AnimatePresence>

      <div className="flex items-center justify-between mt-10">
        <Button
          variant="ghost"
          onClick={handleBack}
          disabled={currentStep === 0}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        {isLastStep ? (
          <Button
            onClick={handleFinish}
            disabled={saving}
            className="bg-gradient-to-r from-primary to-secondary text-white gap-2 px-8 py-5 rounded-xl shadow-lg"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                See My Results
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            className="bg-primary text-primary-foreground gap-2 px-8 py-5 rounded-xl"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
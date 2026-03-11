import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowRight, RefreshCw } from "lucide-react";
import SkillRadar from "../components/results/SkillRadar";
import SkillsList from "../components/results/SkillsList";
import JobCard from "../components/jobs/JobCard";

export default function Results() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setLoading(true);
    const user = await base44.auth.me();
    const profiles = await base44.entities.UserProfile.filter({ created_by: user.email });
    if (profiles.length > 0) {
      setProfile(profiles[0]);
      setSavedJobs(profiles[0].saved_jobs || []);
    }
    setLoading(false);
  };

  const toggleSave = async (jobTitle) => {
    const updated = savedJobs.includes(jobTitle)
      ? savedJobs.filter(j => j !== jobTitle)
      : [...savedJobs, jobTitle];
    setSavedJobs(updated);
    await base44.entities.UserProfile.update(profile.id, { saved_jobs: updated });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!profile || !profile.quiz_completed) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-foreground mb-4">No Results Yet</h2>
        <p className="text-muted-foreground mb-8">Take the skill quiz first to see your personalized results.</p>
        <Link to={createPageUrl("SkillQuiz")}>
          <Button className="bg-primary text-primary-foreground gap-2">
            Start Skill Quiz <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    );
  }

  const topJobs = (profile.matched_jobs || []).slice(0, 6);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Your Results</h1>
          <p className="text-muted-foreground mt-1">Here's what we found based on your skills</p>
        </div>
        <Link to={createPageUrl("SkillQuiz")}>
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Retake Quiz
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SkillRadar skillScores={profile.skill_scores} />
        <SkillsList skills={profile.identified_skills} />
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Top Job Matches</h2>
          <Link to={createPageUrl("JobExplorer")}>
            <Button variant="ghost" className="text-primary gap-2">
              View All <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topJobs.map((job, i) => (
            <JobCard
              key={job.title}
              job={job}
              index={i}
              isSaved={savedJobs.includes(job.title)}
              onToggleSave={toggleSave}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Loader2 } from "lucide-react";
import JobCard from "../components/jobs/JobCard";
import JobFilters from "../components/jobs/JobFilters";
import { jobDatabase, matchJobs } from "../components/quiz/quizData";

export default function JobExplorer() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savedJobs, setSavedJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [risk, setRisk] = useState("All Risk Levels");

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
    if (profile) {
      await base44.entities.UserProfile.update(profile.id, { saved_jobs: updated });
    }
  };

  // If user took quiz, show matched jobs; otherwise show all from database with 0 match score
  const jobs = profile?.matched_jobs?.length
    ? profile.matched_jobs
    : jobDatabase.map(j => ({
        ...j,
        match_score: 0,
        transferable_skills: [],
        skills_to_develop: j.required_skills,
        training_time: j.training_time,
      }));

  const filtered = jobs.filter(job => {
    const matchSearch = search === "" || job.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "All Categories" || job.category === category;
    const matchRisk = risk === "All Risk Levels" || job.automation_risk.includes(risk);
    return matchSearch && matchCategory && matchRisk;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Job Explorer</h1>
        <p className="text-muted-foreground mt-1">
          {profile?.quiz_completed
            ? "Jobs ranked by how well they match your skills"
            : "Browse automation-resistant careers — take the quiz for personalized matches"}
        </p>
      </div>

      <JobFilters
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        risk={risk}
        setRisk={setRisk}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((job, i) => (
          <JobCard
            key={job.title}
            job={job}
            index={i}
            isSaved={savedJobs.includes(job.title)}
            onToggleSave={toggleSave}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          No jobs match your current filters. Try adjusting your search.
        </div>
      )}
    </div>
  );
}
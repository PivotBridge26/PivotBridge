import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, ArrowRight, Bookmark, TrendingUp, ShieldCheck, Target, ClipboardList } from "lucide-react";
import { motion } from "framer-motion";
import SkillRadar from "../components/results/SkillRadar";

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const u = await base44.auth.me();
    setUser(u);
    const profiles = await base44.entities.UserProfile.filter({ created_by: u.email });
    if (profiles.length > 0) {
      setProfile(profiles[0]);
    }
    setLoading(false);
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
        <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <ClipboardList className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Welcome{user?.full_name ? `, ${user.full_name}` : ""}!
        </h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Take the skill assessment to unlock your personalized dashboard with job matches and career insights.
        </p>
        <Link to={createPageUrl("SkillQuiz")}>
          <Button className="bg-primary text-primary-foreground gap-2 px-8 py-5 rounded-xl shadow-lg">
            Start Skill Assessment <ArrowRight className="w-5 h-5" />
          </Button>
        </Link>
      </div>
    );
  }

  const savedJobs = profile.saved_jobs || [];
  const matchedJobs = profile.matched_jobs || [];
  const topMatch = matchedJobs[0];
  const savedJobDetails = matchedJobs.filter(j => savedJobs.includes(j.title));
  const totalSkills = (profile.identified_skills || []).length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
          Welcome back{user?.full_name ? `, ${user.full_name}` : ""}
        </h1>
        <p className="text-muted-foreground mt-1">Here's your career transition overview</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Skills Identified", value: totalSkills, icon: Target, color: "text-primary" },
          { label: "Top Match Score", value: topMatch ? `${topMatch.match_score}%` : "—", icon: TrendingUp, color: "text-secondary" },
          { label: "Jobs Matched", value: matchedJobs.length, icon: ShieldCheck, color: "text-green-600" },
          { label: "Jobs Saved", value: savedJobs.length, icon: Bookmark, color: "text-primary" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card>
              <CardContent className="p-5">
                <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SkillRadar skillScores={profile.skill_scores} />

        {/* Top Match */}
        {topMatch && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Best Match</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-white">{topMatch.match_score}%</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground">{topMatch.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{topMatch.category}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Badge className="bg-green-100 text-green-700 border border-green-200 text-xs">
                      <ShieldCheck className="w-3 h-3 mr-1" />
                      {topMatch.automation_risk} AI Risk
                    </Badge>
                    <Badge variant="outline" className="text-xs">{topMatch.salary_range}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{topMatch.description}</p>
                </div>
              </div>
              <Link to={createPageUrl("Results")} className="block mt-4">
                <Button variant="outline" className="w-full gap-2">
                  View All Matches <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Saved Jobs */}
      {savedJobDetails.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-secondary" />
            Saved Jobs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedJobDetails.map((job) => (
              <Card key={job.title} className="hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">{job.category}</Badge>
                    <span className="text-sm font-bold text-secondary">{job.match_score}%</span>
                  </div>
                  <h3 className="font-bold text-foreground">{job.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{job.salary_range}</p>
                  <Badge className="mt-2 bg-green-100 text-green-700 border border-green-200 text-xs">
                    {job.automation_risk} AI Risk
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
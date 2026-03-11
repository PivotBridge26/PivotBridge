import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Briefcase, CheckCircle, Loader2, Building2, TrendingUp, DollarSign, Send } from "lucide-react";

export default function JobMatching() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState([]);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const user = await base44.auth.me();
    const profiles = await base44.entities.UserProfile.filter({ created_by: user.email });
    if (profiles.length > 0) setProfile(profiles[0]);
    setLoading(false);
  };

  const topJobs = (profile?.matched_jobs || []).slice(0, 8);

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mb-5">
          <Briefcase className="w-7 h-7 text-green-700" />
        </div>
        <Badge className="bg-secondary/10 text-secondary border-secondary/20 mb-3">Trailblazer Exclusive</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3">Priority Job Matching</h1>
        <p className="text-xl text-muted-foreground">Skip the black hole of online applications. We make warm introductions to hiring managers at partner employers.</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {[
          { icon: Building2, label: "Employer Partners", value: "200+", color: "text-primary" },
          { icon: TrendingUp, label: "Avg. Response Rate", value: "68%", color: "text-secondary" },
          { icon: CheckCircle, label: "Placements This Year", value: "1,400+", color: "text-green-600" },
        ].map((s, i) => (
          <div key={i} className="bg-card border border-border rounded-2xl p-5 text-center">
            <s.icon className={`w-6 h-6 ${s.color} mx-auto mb-2`} />
            <div className="text-2xl font-extrabold text-foreground">{s.value}</div>
            <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="w-7 h-7 animate-spin text-primary" /></div>
      ) : topJobs.length > 0 ? (
        <>
          <h2 className="text-xl font-bold text-foreground mb-5">Request Introductions Based on Your Profile</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {topJobs.map((job, i) => (
              <motion.div key={job.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs">{job.category}</Badge>
                      <span className="text-sm font-bold text-secondary">{job.match_score}% match</span>
                    </div>
                    <h3 className="font-bold text-foreground mb-1">{job.title}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                      <DollarSign className="w-3.5 h-3.5" />{job.salary_range}
                    </div>
                    {applied.includes(job.title) ? (
                      <div className="flex items-center gap-2 text-green-700 text-sm font-medium">
                        <CheckCircle className="w-4 h-4" /> Introduction Requested!
                      </div>
                    ) : (
                      <Button size="sm" className="w-full bg-primary text-primary-foreground gap-2" onClick={() => setApplied(p => [...p, job.title])}>
                        <Send className="w-3.5 h-3.5" /> Request Introduction
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          Take the skill quiz first to unlock personalized job matching.
        </div>
      )}
    </div>
  );
}
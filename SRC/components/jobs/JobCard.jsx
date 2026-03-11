import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ShieldCheck, TrendingUp, DollarSign, Clock, Bookmark, BookmarkCheck, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const riskColors = {
  "Very Low": "bg-green-100 text-green-700 border-green-200",
  "Low": "bg-emerald-100 text-emerald-700 border-emerald-200",
  "Moderate (long-haul) / Low (local)": "bg-amber-100 text-amber-700 border-amber-200",
};

export default function JobCard({ job, isSaved, onToggleSave, index = 0 }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-border">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="text-xs font-medium">
                  {job.category}
                </Badge>
                <Badge className={cn("text-xs border", riskColors[job.automation_risk] || "bg-muted text-muted-foreground")}>
                  <ShieldCheck className="w-3 h-3 mr-1" />
                  {job.automation_risk} AI Risk
                </Badge>
              </div>
              <h3 className="text-xl font-bold text-foreground mt-2">{job.title}</h3>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary">
                <span className="text-xl font-bold text-white">{job.match_score}%</span>
              </div>
              <span className="text-xs text-muted-foreground">match</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <DollarSign className="w-4 h-4 text-secondary" />
              <span className="truncate">{job.salary_range}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="truncate">{job.growth_outlook}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Clock className="w-4 h-4 text-primary" />
              <span className="truncate">{job.training_time}</span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            {job.description}
          </p>

          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="space-y-4 mb-4"
            >
              {job.transferable_skills?.length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-foreground mb-2">Skills You Already Have</p>
                  <div className="flex flex-wrap gap-1.5">
                    {job.transferable_skills.map(s => (
                      <Badge key={s} className="bg-green-100 text-green-700 border border-green-200 text-xs">
                        ✓ {s.replace(/_/g, ' ')}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {job.skills_to_develop?.length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-foreground mb-2">Skills to Develop</p>
                  <div className="flex flex-wrap gap-1.5">
                    {job.skills_to_develop.map(s => (
                      <Badge key={s} variant="outline" className="text-xs">
                        {s.replace(/_/g, ' ')}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpanded(!expanded)}
              className="text-muted-foreground"
            >
              {expanded ? <ChevronUp className="w-4 h-4 mr-1" /> : <ChevronDown className="w-4 h-4 mr-1" />}
              {expanded ? "Less" : "More Details"}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onToggleSave(job.title)}
              className={isSaved ? "text-secondary" : "text-muted-foreground"}
            >
              {isSaved ? <BookmarkCheck className="w-4 h-4 mr-1" /> : <Bookmark className="w-4 h-4 mr-1" />}
              {isSaved ? "Saved" : "Save"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
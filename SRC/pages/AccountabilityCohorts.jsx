import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Users, Calendar, CheckCircle, Clock, Star } from "lucide-react";

const cohorts = [
  {
    name: "Trades Transition Crew",
    focus: "Manufacturing & Warehouse → Skilled Trades",
    members: 8,
    max: 10,
    next_meeting: "Thursday, 7:00 PM EST",
    facilitator: "James W.",
    description: "A group for workers moving from manufacturing and warehouse jobs into HVAC, electrical, or plumbing trades.",
    level: "Beginner–Intermediate",
    emoji: "🔧",
  },
  {
    name: "Healthcare Hopefuls",
    focus: "Any Background → Healthcare Support",
    members: 6,
    max: 10,
    next_meeting: "Tuesday, 6:30 PM EST",
    facilitator: "Tanya B.",
    description: "For workers pursuing home health aide, medical assistant, and other healthcare support careers.",
    level: "All Levels",
    emoji: "🏥",
  },
  {
    name: "Green Career Pioneers",
    focus: "Any Background → Solar, Wind, Green Energy",
    members: 5,
    max: 10,
    next_meeting: "Wednesday, 7:00 PM EST",
    facilitator: "Maria D.",
    description: "Exploring the booming green energy sector together — solar installation, wind tech, energy efficiency.",
    level: "All Levels",
    emoji: "🌿",
  },
  {
    name: "Service to Service",
    focus: "Retail & Food Service → Better-Paying Service Careers",
    members: 9,
    max: 10,
    next_meeting: "Monday, 6:00 PM EST",
    facilitator: "Carlos R.",
    description: "Helping retail, restaurant, and service workers transition into higher-paying service and trades roles.",
    level: "All Levels",
    emoji: "🌟",
  },
];

export default function AccountabilityCohorts() {
  const [joined, setJoined] = useState([]);

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <div className="w-14 h-14 rounded-2xl bg-rose-100 flex items-center justify-center mb-5">
          <Users className="w-7 h-7 text-rose-700" />
        </div>
        <Badge className="bg-secondary/10 text-secondary border-secondary/20 mb-3">Trailblazer Exclusive</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3">Peer Accountability Cohorts</h1>
        <p className="text-xl text-muted-foreground">Join a small group of people on similar journeys. Weekly check-ins, shared wins, real accountability.</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {[
          { icon: Users, label: "Active Cohorts", value: "12", color: "text-rose-600" },
          { icon: Star, label: "Avg. Completion Rate", value: "83%", color: "text-secondary" },
          { icon: Calendar, label: "Sessions Per Month", value: "4", color: "text-primary" },
        ].map((s, i) => (
          <div key={i} className="bg-card border border-border rounded-2xl p-5 text-center">
            <s.icon className={`w-6 h-6 ${s.color} mx-auto mb-2`} />
            <div className="text-2xl font-extrabold text-foreground">{s.value}</div>
            <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {cohorts.map((cohort, i) => {
          const spotsLeft = cohort.max - cohort.members;
          const isJoined = joined.includes(cohort.name);
          return (
            <motion.div key={cohort.name} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-3xl">{cohort.emoji}</span>
                    <div>
                      <h3 className="font-bold text-foreground">{cohort.name}</h3>
                      <p className="text-sm text-secondary font-medium">{cohort.focus}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{cohort.description}</p>
                  <div className="space-y-1.5 mb-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="w-3.5 h-3.5" />Next: {cohort.next_meeting}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Users className="w-3.5 h-3.5" />Facilitated by {cohort.facilitator} · {cohort.level}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-3.5 h-3.5" />{cohort.members}/{cohort.max} members · {spotsLeft} spot{spotsLeft !== 1 ? "s" : ""} left
                    </div>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full mb-4 overflow-hidden">
                    <div className="h-full bg-rose-400 rounded-full" style={{ width: `${(cohort.members / cohort.max) * 100}%` }} />
                  </div>
                  {isJoined ? (
                    <div className="flex items-center gap-2 text-green-700 text-sm font-medium">
                      <CheckCircle className="w-4 h-4" /> You're in! See you {cohort.next_meeting.split(",")[0]}.
                    </div>
                  ) : (
                    <Button onClick={() => setJoined(p => [...p, cohort.name])} className="w-full bg-primary text-primary-foreground gap-2" disabled={spotsLeft === 0}>
                      {spotsLeft === 0 ? "Full — Join Waitlist" : "Join This Cohort"}
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
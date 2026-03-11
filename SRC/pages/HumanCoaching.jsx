import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Users, Star, Calendar, Clock, CheckCircle } from "lucide-react";

const coaches = [
  {
    name: "Maria Delgado",
    specialty: "Skilled Trades & Construction Transitions",
    experience: "12 years",
    background: "Former union electrician, now certified career coach. Specializes in helping manual workers enter the trades and healthcare fields.",
    rating: 4.9,
    sessions: 847,
    availability: "Mon–Fri, 8am–5pm EST",
    languages: ["English", "Spanish"],
    emoji: "👩",
  },
  {
    name: "James Whitfield",
    specialty: "Manufacturing & Logistics to Healthcare",
    experience: "9 years",
    background: "Ex-factory supervisor who transitioned to healthcare administration. Expert in highlighting operational skills for medical roles.",
    rating: 4.8,
    sessions: 612,
    availability: "Tue–Sat, 10am–7pm EST",
    languages: ["English"],
    emoji: "👨",
  },
  {
    name: "Tanya Brooks",
    specialty: "Retail & Service Workers",
    experience: "14 years",
    background: "Former retail district manager who pivoted to workforce development. Expert in translating customer service skills into high-value careers.",
    rating: 5.0,
    sessions: 1203,
    availability: "Mon–Thu, 9am–6pm EST",
    languages: ["English"],
    emoji: "👩",
  },
  {
    name: "Carlos Rivera",
    specialty: "Transportation & Delivery Workers",
    experience: "7 years",
    background: "Former long-haul trucker and CDL instructor, now helping drivers transition into logistics management and trade careers.",
    rating: 4.9,
    sessions: 431,
    availability: "Mon–Fri, 12pm–8pm EST",
    languages: ["English", "Spanish"],
    emoji: "👨",
  },
];

const process = [
  { step: "1", title: "Complete your profile", desc: "Your skill quiz results help us match you with the right coach." },
  { step: "2", title: "Choose your coach", desc: "Browse coaches by specialty and select the best fit for your situation." },
  { step: "3", title: "Book your first session", desc: "Schedule a 45-minute intro call — free with your Trailblazer plan." },
  { step: "4", title: "Build your plan together", desc: "Your coach creates a personalized action plan for your career transition." },
];

export default function HumanCoaching() {
  const [requested, setRequested] = useState(null);

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mb-5">
          <Users className="w-7 h-7 text-blue-700" />
        </div>
        <Badge className="bg-secondary/10 text-secondary border-secondary/20 mb-3">Trailblazer Exclusive</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3">1-on-1 Human Career Coaching</h1>
        <p className="text-xl text-muted-foreground">Work directly with a certified career coach who has walked the path you're on.</p>
      </motion.div>

      {/* How it works */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {process.map((p, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <div className="bg-card border border-border rounded-2xl p-4 text-center h-full">
              <div className="w-9 h-9 rounded-full bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center mx-auto mb-3">{p.step}</div>
              <h3 className="font-semibold text-sm text-foreground mb-1">{p.title}</h3>
              <p className="text-xs text-muted-foreground">{p.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-foreground mb-5">Meet Our Coaches</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {coaches.map((coach, i) => (
          <motion.div key={coach.name} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl flex-shrink-0">{coach.emoji}</div>
                  <div>
                    <h3 className="font-bold text-foreground">{coach.name}</h3>
                    <p className="text-sm text-secondary font-medium">{coach.specialty}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-secondary fill-secondary" />
                        <span className="text-sm font-semibold">{coach.rating}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">· {coach.sessions} sessions</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{coach.background}</p>
                <div className="space-y-1.5 mb-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" />{coach.availability}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Users className="w-3.5 h-3.5" />{coach.languages.join(" · ")}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5" />{coach.experience} coaching experience
                  </div>
                </div>
                {requested === coach.name ? (
                  <div className="flex items-center gap-2 text-green-700 text-sm font-medium">
                    <CheckCircle className="w-4 h-4" /> Booking request sent!
                  </div>
                ) : (
                  <Button onClick={() => setRequested(coach.name)} className="w-full bg-primary text-primary-foreground gap-2">
                    <Calendar className="w-4 h-4" /> Book a Session
                  </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
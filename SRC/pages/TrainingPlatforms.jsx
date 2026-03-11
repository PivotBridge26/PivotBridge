import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BookOpen, ExternalLink, Clock, DollarSign, Star } from "lucide-react";

const platforms = [
  {
    name: "Coursera",
    description: "University-backed courses and professional certificates in high-demand fields. Many are free to audit.",
    url: "https://www.coursera.org",
    cost: "Free–$49/mo",
    best_for: "Professional certificates, college-level courses",
    rating: "4.8",
    tags: ["Healthcare", "Tech", "Business"],
  },
  {
    name: "LinkedIn Learning",
    description: "Short, practical courses taught by industry professionals. Pairs directly with your LinkedIn profile.",
    url: "https://www.linkedin.com/learning",
    cost: "$39.99/mo",
    best_for: "Business skills, soft skills, tech basics",
    rating: "4.6",
    tags: ["Business", "Tech", "Leadership"],
  },
  {
    name: "Google Career Certificates",
    description: "Google-designed certificates in IT, project management, UX, and data analytics. No degree required.",
    url: "https://grow.google/certificates",
    cost: "$49/mo via Coursera",
    best_for: "Career changers entering tech-adjacent roles",
    rating: "4.7",
    tags: ["Tech", "Data", "Project Mgmt"],
  },
  {
    name: "Khan Academy",
    description: "Completely free foundational learning — math, science, and basic computing skills to build confidence.",
    url: "https://www.khanacademy.org",
    cost: "Free",
    best_for: "Foundational skills, brushing up on basics",
    rating: "4.9",
    tags: ["Free", "Foundations", "Math"],
  },
  {
    name: "Udemy",
    description: "Thousands of affordable courses in trades, tech, and business — often on sale for under $15.",
    url: "https://www.udemy.com",
    cost: "$10–$200 per course",
    best_for: "Specific skills, trades prep, software tools",
    rating: "4.5",
    tags: ["Trades", "Tech", "DIY Learning"],
  },
  {
    name: "USA Trade Apprenticeships",
    description: "The official U.S. Department of Labor apprenticeship finder for registered trade programs near you.",
    url: "https://www.apprenticeship.gov",
    cost: "Paid while learning",
    best_for: "Electrician, plumber, HVAC, construction",
    rating: "4.9",
    tags: ["Trades", "Apprenticeship", "Earn & Learn"],
  },
  {
    name: "Skillshare",
    description: "Creative, entrepreneurial, and professional skills in a short, accessible video format.",
    url: "https://www.skillshare.com",
    cost: "$167/year",
    best_for: "Creative careers, design, marketing",
    rating: "4.4",
    tags: ["Creative", "Design", "Business"],
  },
  {
    name: "edX",
    description: "MIT, Harvard, and top universities offer professional certificates and micro-degrees on edX.",
    url: "https://www.edx.org",
    cost: "Free to audit; $150–$300 for certificate",
    best_for: "Formal credentials from top universities",
    rating: "4.6",
    tags: ["University", "Certificates", "STEM"],
  },
];

export default function TrainingPlatforms() {
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mb-5">
          <BookOpen className="w-7 h-7 text-blue-700" />
        </div>
        <Badge className="bg-blue-100 text-blue-700 border-blue-200 mb-3">Pathfinder & Trailblazer</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3">Training Platforms</h1>
        <p className="text-xl text-muted-foreground">
          Handpicked learning platforms to build the skills your new career demands — at every budget level.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {platforms.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
          >
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-lg text-foreground">{p.name}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-3.5 h-3.5 text-secondary fill-secondary" />
                      <span className="text-sm text-muted-foreground">{p.rating}</span>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">{p.cost}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{p.description}</p>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Best for: {p.best_for}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.tags.map(t => (
                    <Badge key={t} className="bg-blue-50 text-blue-700 text-xs border border-blue-100">{t}</Badge>
                  ))}
                </div>
                <a href={p.url} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="w-full gap-2">
                    Visit {p.name} <ExternalLink className="w-3.5 h-3.5" />
                  </Button>
                </a>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { BookOpen, DollarSign, FileText, Bot, ArrowRight, ExternalLink, Zap } from "lucide-react";

const sections = [
  {
    id: "training",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-700",
    title: "Training Platforms",
    subtitle: "Learn new skills at your own pace",
    description: "Access the world's top online learning platforms, pre-filtered for the careers most relevant to your skill profile.",
    page: "TrainingPlatforms",
    cta: "Explore Training Platforms",
    highlights: ["Coursera", "LinkedIn Learning", "Khan Academy", "Udemy", "Google Career Certificates", "Trade-specific apprenticeship programs"],
  },
  {
    id: "funding",
    icon: DollarSign,
    color: "bg-green-100 text-green-700",
    title: "Financial Resources",
    subtitle: "Scholarships, grants & funding for your training",
    description: "Don't let cost be a barrier. We connect you with government programs, private grants, and scholarship opportunities that pay for your training.",
    page: "FinancialResources",
    cta: "Find Funding Options",
    highlights: ["Pell Grants", "WIOA workforce funds", "State trade grants", "Union training funds", "Private scholarships", "Employer tuition assistance"],
  },
  {
    id: "resume",
    icon: FileText,
    color: "bg-amber-100 text-amber-700",
    title: "Resume Builder & Enhancement",
    subtitle: "Turn your work history into your biggest asset",
    description: "Our AI-powered resume tools help you translate hands-on experience into language that hiring managers understand and value.",
    page: "ResumeBuilder",
    cta: "Build Your Resume",
    highlights: ["AI resume builder", "Skills translation tool", "Industry-specific formats", "ATS optimization", "Before/after examples", "Downloadable templates"],
  },
  {
    id: "templates",
    icon: FileText,
    color: "bg-purple-100 text-purple-700",
    title: "Document Templates",
    subtitle: "Professional templates for every step",
    description: "Ready-to-use templates crafted for career changers — from cover letters to reference requests, we've got every document you need.",
    page: "DocumentTemplates",
    cta: "Browse Templates",
    highlights: ["Cover letter templates", "Reference request letters", "Thank-you notes", "Career change explanation letters", "LinkedIn summary templates", "Follow-up email scripts"],
  },
  {
    id: "coach",
    icon: Bot,
    color: "bg-primary/10 text-primary",
    title: "AI Career Coach",
    subtitle: "Your personal guide, available 24/7",
    description: "Get personalized, judgment-free career guidance at any hour. Your AI coach knows your skill profile and helps you navigate every step of your pivot.",
    page: "AICoach",
    cta: "Talk to Your Coach",
    highlights: ["Personalized to your skills", "Career path planning", "Answers your questions 24/7", "Tracks your progress", "Adapts as you grow", "Encouragement & accountability"],
  },
];

export default function PathfinderPlan() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-14"
      >
        <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
          <Zap className="w-8 h-8 text-primary" />
        </div>
        <Badge className="bg-primary/10 text-primary border-primary/20 mb-3">$29 / month</Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-4">Pathfinder Plan</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Everything you need to discover, plan, and launch your career transition — powered by smart tools and guided by AI.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <Button className="bg-primary text-primary-foreground px-8 py-5 rounded-xl text-base gap-2">
            Start Pathfinder — $29/mo <ArrowRight className="w-4 h-4" />
          </Button>
          <Link to={createPageUrl("Pricing")}>
            <Button variant="outline" className="px-8 py-5 rounded-xl text-base">
              Compare Plans
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Feature Sections */}
      <div className="space-y-6">
        {sections.map((section, i) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-card border border-border rounded-2xl overflow-hidden"
          >
            <div className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                <div className={`w-12 h-12 rounded-2xl ${section.color} flex items-center justify-center flex-shrink-0`}>
                  <section.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-foreground">{section.title}</h2>
                  <p className="text-secondary font-medium text-sm mt-0.5">{section.subtitle}</p>
                  <p className="text-muted-foreground mt-2 leading-relaxed">{section.description}</p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
                    {section.highlights.map((h, j) => (
                      <div key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                        {h}
                      </div>
                    ))}
                  </div>

                  <Link to={createPageUrl(section.page)} className="inline-block mt-5">
                    <Button variant="outline" className="gap-2">
                      {section.cta} <ExternalLink className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Upgrade nudge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-10 bg-gradient-to-r from-primary/10 to-secondary/10 border border-border rounded-2xl p-6 text-center"
      >
        <p className="text-muted-foreground mb-3">Want real human coaching and direct employer connections?</p>
        <Link to={createPageUrl("TrailblazerPlan")}>
          <Button variant="outline" className="gap-2">
            Explore Trailblazer ($49/mo) <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
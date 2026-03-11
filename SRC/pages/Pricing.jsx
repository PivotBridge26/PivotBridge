import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Check, Zap, Star, ArrowRight, BookOpen, DollarSign, FileText,
  Bot, Users, Building2, Briefcase, ShieldCheck
} from "lucide-react";

const pathfinderFeatures = [
  { icon: BookOpen, text: "Access to top training platforms (Coursera, LinkedIn Learning, etc.)" },
  { icon: DollarSign, text: "Financial links: scholarships, grants & state/private funding" },
  { icon: FileText, text: "AI-powered resume creation & enhancement" },
  { icon: FileText, text: "Templates: cover letters, reference letters & more" },
  { icon: Bot, text: "Personal AI coach for your career pivot journey" },
  { icon: ShieldCheck, text: "Full skill quiz & job matching engine" },
  { icon: Zap, text: "Personalized career path roadmap" },
];

const trailblazerFeatures = [
  { icon: Users, text: "Everything in Pathfinder, plus:" },
  { icon: Users, text: "1-on-1 coaching with a real career professional" },
  { icon: Building2, text: "Direct introductions to trade orgs, unions & employers" },
  { icon: Briefcase, text: "Priority job referrals & warm hiring manager introductions" },
  { icon: Users, text: "Mock interview coaching (industry-specific)" },
  { icon: DollarSign, text: "Salary negotiation guidance" },
  { icon: Star, text: "LinkedIn profile optimization by a human reviewer" },
  { icon: Users, text: "Peer accountability cohort groups" },
  { icon: ShieldCheck, text: "Benefits & workers' rights guidance" },
  { icon: DollarSign, text: "Family financial planning during transition" },
  { icon: Check, text: "Credential verification & prior experience recognition" },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  const pathfinderPrice = annual ? 24 : 29;
  const trailblazerPrice = annual ? 41 : 49;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <Badge className="bg-secondary/10 text-secondary border-secondary/20 mb-4">Simple Pricing</Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-4">
          Choose Your Path
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Whether you prefer self-guided tools or hands-on human support, we have a plan built for your journey.
        </p>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <span className={`text-sm font-medium ${!annual ? "text-foreground" : "text-muted-foreground"}`}>Monthly</span>
          <button
            onClick={() => setAnnual(!annual)}
            className={`relative w-12 h-6 rounded-full transition-colors ${annual ? "bg-secondary" : "bg-muted"}`}
          >
            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${annual ? "translate-x-7" : "translate-x-1"}`} />
          </button>
          <span className={`text-sm font-medium ${annual ? "text-foreground" : "text-muted-foreground"}`}>
            Annual <Badge className="ml-1 bg-green-100 text-green-700 text-xs">Save 17%</Badge>
          </span>
        </div>
      </motion.div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pathfinder */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border-2 border-border rounded-3xl p-8 flex flex-col"
        >
          <div className="mb-6">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Pathfinder</h2>
            <p className="text-muted-foreground mt-1">Self-directed with AI tools & resources</p>
          </div>

          <div className="flex items-end gap-1 mb-6">
            <span className="text-5xl font-extrabold text-foreground">${pathfinderPrice}</span>
            <span className="text-muted-foreground mb-2">/month</span>
          </div>

          <Link to={createPageUrl("PathfinderPlan")} className="block mb-8">
            <Button className="w-full bg-primary text-primary-foreground py-5 rounded-xl text-base gap-2">
              Get Started <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>

          <ul className="space-y-3 flex-1">
            {pathfinderFeatures.map((f, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">{f.text}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Trailblazer */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-primary to-primary/80 border-2 border-primary rounded-3xl p-8 flex flex-col relative overflow-hidden"
        >
          <div className="absolute top-4 right-4">
            <Badge className="bg-secondary text-secondary-foreground font-semibold">Most Popular</Badge>
          </div>
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/5 rounded-full translate-x-16 translate-y-16" />

          <div className="mb-6">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-4">
              <Star className="w-6 h-6 text-secondary" />
            </div>
            <h2 className="text-2xl font-bold text-white">Trailblazer</h2>
            <p className="text-white/70 mt-1">Human-guided with real connections</p>
          </div>

          <div className="flex items-end gap-1 mb-6">
            <span className="text-5xl font-extrabold text-white">${trailblazerPrice}</span>
            <span className="text-white/70 mb-2">/month</span>
          </div>

          <Link to={createPageUrl("TrailblazerPlan")} className="block mb-8">
            <Button className="w-full bg-secondary text-secondary-foreground py-5 rounded-xl text-base gap-2 hover:bg-secondary/90">
              Get Started <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>

          <ul className="space-y-3 flex-1 relative z-10">
            {trailblazerFeatures.map((f, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${i === 0 ? "bg-secondary/30" : "bg-white/20"}`}>
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className={`text-sm ${i === 0 ? "text-white font-semibold" : "text-white/80"}`}>{f.text}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Guarantee */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-12 text-center bg-card border border-border rounded-2xl p-8"
      >
        <ShieldCheck className="w-10 h-10 text-green-600 mx-auto mb-3" />
        <h3 className="text-xl font-bold text-foreground mb-2">30-Day Money-Back Guarantee</h3>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Not satisfied in your first 30 days? We'll refund you — no questions asked. Your transition matters too much to risk.
        </p>
      </motion.div>
    </div>
  );
}
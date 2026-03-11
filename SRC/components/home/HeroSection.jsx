import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, TrendingUp, Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Your skills are more valuable than you think
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight tracking-tight">
            Turn Your Experience Into{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-secondary">
              Automation-Proof
            </span>{" "}
            Career Opportunities
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Discover how your existing skills connect to in-demand jobs that AI and automation can't replace. Take our free skill assessment and find your bridge to a secure future.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to={createPageUrl("SkillQuiz")}>
              <Button size="lg" className="bg-primary text-primary-foreground text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
                Start Skill Assessment
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to={createPageUrl("JobExplorer")}>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 rounded-xl">
                Browse Jobs
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto"
        >
          {[
            { icon: ShieldCheck, label: "AI-Proof Careers", value: "20+", color: "text-green-600" },
            { icon: TrendingUp, label: "Avg. Growth Rate", value: "+12%", color: "text-secondary" },
            { icon: Sparkles, label: "Skills Assessed", value: "36", color: "text-primary" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center bg-card rounded-2xl border border-border p-6 shadow-sm">
              <stat.icon className={`w-6 h-6 ${stat.color} mb-2`} />
              <span className="text-3xl font-extrabold text-foreground">{stat.value}</span>
              <span className="text-sm text-muted-foreground mt-1">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
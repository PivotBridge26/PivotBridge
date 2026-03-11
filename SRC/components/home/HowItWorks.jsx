import React from "react";
import { motion } from "framer-motion";
import { ClipboardList, BarChart3, Briefcase, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    title: "Take the Skill Quiz",
    description: "Answer 6 quick questions about your hands-on experience, people skills, and work preferences.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: BarChart3,
    title: "See Your Skill Profile",
    description: "Get a visual breakdown of your strengths across 6 categories — from physical skills to problem solving.",
    color: "bg-secondary/10 text-secondary",
  },
  {
    icon: Briefcase,
    title: "Discover Your Matches",
    description: "Explore automation-resistant careers ranked by how well they fit your existing skills.",
    color: "bg-green-100 text-green-700",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground">How It Works</h2>
        <p className="mt-3 text-muted-foreground text-lg">Three simple steps to your next career</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.4 }}
            className="relative"
          >
            <div className="bg-card rounded-2xl border border-border p-8 text-center h-full">
              <div className={`w-14 h-14 rounded-2xl ${step.color} flex items-center justify-center mx-auto mb-5`}>
                <step.icon className="w-7 h-7" />
              </div>
              <div className="text-sm font-bold text-muted-foreground mb-2">Step {i + 1}</div>
              <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
            {i < steps.length - 1 && (
              <div className="hidden md:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                <ArrowRight className="w-6 h-6 text-border" />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
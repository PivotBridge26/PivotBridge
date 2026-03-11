import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Users, Building2, Briefcase, Star, DollarSign, Linkedin, ShieldCheck, Heart, Award, ArrowRight, ExternalLink } from "lucide-react";

const sections = [
  {
    id: "coaching",
    icon: Users,
    color: "bg-blue-100 text-blue-700",
    title: "1-on-1 Human Career Coach",
    subtitle: "Real guidance from a real person",
    description: "Connect with a certified career coach from our vetted network who specializes in workforce transitions. Schedule sessions, get honest feedback, and stay accountable.",
    page: "HumanCoaching",
    cta: "Meet Your Coach",
    highlights: ["Certified career coaches", "Workforce transition specialists", "Flexible scheduling", "Session notes & action plans", "Ongoing accountability", "Industry-matched coaching"],
  },
  {
    id: "tradeorgs",
    icon: Building2,
    color: "bg-amber-100 text-amber-700",
    title: "Trade Organizations & Unions",
    subtitle: "Direct introductions to the people who hire",
    description: "We make warm introductions to trade associations, union halls, and industry groups in your target field — the insider network most job seekers never access.",
    page: "TradeOrganizations",
    cta: "Explore Connections",
    highlights: ["Union apprenticeship access", "Trade association memberships", "Industry networking events", "Mentorship programs", "Certification pathways", "Member job boards"],
  },
  {
    id: "jobmatching",
    icon: Briefcase,
    color: "bg-green-100 text-green-700",
    title: "Job Matching & Priority Referrals",
    subtitle: "Warm introductions, not cold applications",
    description: "Skip the black hole of online applications. Our network of employer partners receives your profile directly, and we facilitate warm introductions to hiring managers.",
    page: "JobMatching",
    cta: "Get Matched",
    highlights: ["Employer partner network", "Warm hiring manager intros", "Priority application status", "Job matching algorithm", "Company culture insights", "Role-specific prep support"],
  },
  {
    id: "mockinterview",
    icon: Star,
    color: "bg-purple-100 text-purple-700",
    title: "Mock Interview Coaching",
    subtitle: "Industry-specific interview prep with a real coach",
    description: "Practice makes permanent. Work with a coach who knows your target industry to rehearse real interview scenarios, get candid feedback, and walk in confident.",
    page: "MockInterview",
    cta: "Schedule a Mock Interview",
    highlights: ["Trades & technical interviews", "Behavioral question prep", "Video session recording", "Written feedback report", "Industry-specific scenarios", "Follow-up coaching"],
  },
  {
    id: "salary",
    icon: DollarSign,
    color: "bg-emerald-100 text-emerald-700",
    title: "Salary Negotiation Guidance",
    subtitle: "Know your worth — and ask for it",
    description: "Most career changers undersell themselves. Our salary negotiation coaching teaches you how to research market rates, make a strong case, and negotiate confidently.",
    page: "SalaryNegotiation",
    cta: "Learn to Negotiate",
    highlights: ["Market rate research tools", "Negotiation scripts", "Offer evaluation framework", "Benefits negotiation", "Role-play practice", "Real coach feedback"],
  },
  {
    id: "linkedin",
    icon: Linkedin,
    color: "bg-sky-100 text-sky-700",
    title: "LinkedIn Profile Optimization",
    subtitle: "A human expert makes you stand out",
    description: "Your LinkedIn profile is your digital first impression. A real human reviewer rewrites, optimizes, and advises on your profile to maximize visibility with recruiters.",
    page: "LinkedInOptimization",
    cta: "Optimize Your Profile",
    highlights: ["Human profile reviewer", "Keyword optimization", "Headline & summary rewrite", "Skills section strategy", "Connection growth tips", "Recruiter visibility boost"],
  },
  {
    id: "accountability",
    icon: Users,
    color: "bg-rose-100 text-rose-700",
    title: "Peer Accountability Cohorts",
    subtitle: "You're not doing this alone",
    description: "Join a small group of workers on similar career pivots. Weekly check-ins, shared wins, and mutual encouragement make a measurable difference in follow-through.",
    page: "AccountabilityCohorts",
    cta: "Join a Cohort",
    highlights: ["Small groups of 6–10", "Weekly video check-ins", "Shared progress tracking", "Peer support & celebration", "Facilitator-guided sessions", "Ongoing community access"],
  },
  {
    id: "benefits",
    icon: ShieldCheck,
    color: "bg-indigo-100 text-indigo-700",
    title: "Benefits & Workers' Rights Guidance",
    subtitle: "Protect yourself during your transition",
    description: "Understand your rights, what benefits you're entitled to, and how to navigate healthcare, unemployment, and workers' comp during a career change.",
    page: "BenefitsGuidance",
    cta: "Understand Your Rights",
    highlights: ["Unemployment eligibility", "Healthcare transition options", "Workers' comp guidance", "COBRA & marketplace plans", "Union benefits overview", "State assistance programs"],
  },
  {
    id: "financial",
    icon: Heart,
    color: "bg-orange-100 text-orange-700",
    title: "Family Financial Planning",
    subtitle: "Budget through the transition with confidence",
    description: "Career transitions often mean a temporary income dip. Our financial planning resources help you and your family budget wisely, reduce stress, and stay on track.",
    page: "FinancialPlanning",
    cta: "Plan Your Finances",
    highlights: ["Transition budget templates", "Income gap planning", "Emergency fund guidance", "Debt management tips", "Spouse/family communication", "Financial counselor referrals"],
  },
  {
    id: "credentials",
    icon: Award,
    color: "bg-teal-100 text-teal-700",
    title: "Credential Verification & Recognition",
    subtitle: "Your experience deserves to be recognized",
    description: "Years of hands-on work may qualify you for certifications and formal credentials. We help identify and pursue prior learning assessment to fast-track your qualifications.",
    page: "CredentialVerification",
    cta: "Explore Your Credentials",
    highlights: ["Prior learning assessment", "Military to civilian credits", "Competency-based credentials", "Industry certification pathways", "Portfolio development", "Accreditation guidance"],
  },
];

export default function TrailblazerPlan() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-14"
      >
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-5">
          <Star className="w-8 h-8 text-white" />
        </div>
        <Badge className="bg-secondary/10 text-secondary border-secondary/20 mb-3">$49 / month · Most Popular</Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-4">Trailblazer Plan</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Every Pathfinder tool, plus real human coaches, direct industry connections, and the full support network to accelerate your career pivot.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <Button className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-5 rounded-xl text-base gap-2 shadow-lg">
            Start Trailblazer — $49/mo <ArrowRight className="w-4 h-4" />
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
            transition={{ delay: i * 0.06 }}
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

      {/* All Pathfinder included */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-10 bg-primary/5 border border-primary/20 rounded-2xl p-6 text-center"
      >
        <p className="text-foreground font-semibold mb-1">Everything in Pathfinder is included</p>
        <p className="text-muted-foreground text-sm mb-4">Training platforms, AI coach, resume builder, templates, and financial resources — all included in Trailblazer.</p>
        <Link to={createPageUrl("PathfinderPlan")}>
          <Button variant="ghost" className="gap-2 text-primary">
            See Pathfinder features <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
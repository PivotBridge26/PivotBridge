import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { ShieldCheck, ExternalLink, Sparkles, Loader2 } from "lucide-react";

const resources = [
  { name: "Unemployment Benefits (UI)", desc: "Check your state's unemployment eligibility and apply online.", url: "https://www.careeronestop.org/LocalHelp/UnemploymentBenefits/find-unemployment-benefits.aspx", icon: "🏛️" },
  { name: "Healthcare Marketplace (ACA)", desc: "Find health insurance after losing employer coverage. Open enrollment or special enrollment period.", url: "https://www.healthcare.gov", icon: "🏥" },
  { name: "COBRA Continuation Coverage", desc: "Continue your employer's health plan for up to 18 months after leaving.", url: "https://www.dol.gov/sites/dolgov/files/ebsa/about-ebsa/our-activities/resource-center/faqs/cobra-continuation-health-coverage-consumer.pdf", icon: "📋" },
  { name: "Medicaid & CHIP", desc: "Low-income health coverage programs available through your state.", url: "https://www.medicaid.gov/about-us/contact-us/contact-your-state-questions/index.html", icon: "💊" },
  { name: "SNAP Food Assistance", desc: "Supplemental Nutrition Assistance Program during income gaps.", url: "https://www.fns.usda.gov/snap/recipient/eligibility", icon: "🥗" },
  { name: "Workers' Compensation Guide", desc: "Understand your rights if you were injured on the job before your transition.", url: "https://www.dol.gov/agencies/owcp", icon: "⚖️" },
];

export default function BenefitsGuidance() {
  const [form, setForm] = useState({ state: "", situation: "", has_dependents: "" });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    setResult(null);
    const res = await base44.integrations.Core.InvokeLLM({
      prompt: `A worker in ${form.state} is going through a career transition. Their situation: ${form.situation}. They have dependents: ${form.has_dependents}.

List the top 5 benefits programs or protections they should investigate, with brief explanations of eligibility and how to apply. Be specific to their state where possible. Focus on: unemployment, healthcare, food assistance, housing help, and worker rights.

Return as JSON with array of benefit objects.`,
      add_context_from_internet: true,
      response_json_schema: {
        type: "object",
        properties: {
          benefits: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
                eligibility: { type: "string" },
                how_to_apply: { type: "string" },
                priority: { type: "string" }
              }
            }
          }
        }
      }
    });
    setResult(res);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center mb-5">
          <ShieldCheck className="w-7 h-7 text-indigo-700" />
        </div>
        <Badge className="bg-secondary/10 text-secondary border-secondary/20 mb-3">Trailblazer Exclusive</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3">Benefits & Workers' Rights</h1>
        <p className="text-xl text-muted-foreground">Know exactly what you're entitled to while you make your career transition.</p>
      </motion.div>

      <Card className="mb-8">
        <CardContent className="p-6 space-y-4">
          <h3 className="font-bold text-foreground">Get Personalized Benefits Guidance</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label>Your State</Label>
              <Input placeholder="e.g. Texas" value={form.state} onChange={e => setForm(p => ({ ...p, state: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <Label>Your Situation</Label>
              <Select value={form.situation} onValueChange={v => setForm(p => ({ ...p, situation: v }))}>
                <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="laid off and looking for new work">Recently laid off</SelectItem>
                  <SelectItem value="voluntarily leaving for a career change">Voluntarily leaving</SelectItem>
                  <SelectItem value="currently employed but planning a transition">Still employed, planning transition</SelectItem>
                  <SelectItem value="on a leave of absence">On leave of absence</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Dependents?</Label>
              <Select value={form.has_dependents} onValueChange={v => setForm(p => ({ ...p, has_dependents: v }))}>
                <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="No dependents">No dependents</SelectItem>
                  <SelectItem value="Children under 18">Children under 18</SelectItem>
                  <SelectItem value="Children and a spouse/partner">Family with children</SelectItem>
                  <SelectItem value="Elderly dependents">Elderly dependents</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={handleAnalyze} disabled={!form.state || !form.situation || loading} className="w-full bg-primary text-primary-foreground py-5 gap-2">
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Researching benefits...</> : <><Sparkles className="w-4 h-4" />Find My Benefits</>}
          </Button>
        </CardContent>
      </Card>

      {result?.benefits && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 mb-10">
          <h3 className="font-bold text-foreground text-lg">Your Recommended Benefits</h3>
          {result.benefits.map((b, i) => (
            <Card key={i}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-foreground">{b.name}</h4>
                  <Badge className={b.priority === "High" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}>{b.priority} Priority</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1"><span className="font-medium text-foreground">Eligibility:</span> {b.eligibility}</p>
                <p className="text-sm text-muted-foreground"><span className="font-medium text-foreground">How to apply:</span> {b.how_to_apply}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      )}

      <h3 className="font-bold text-foreground text-lg mb-4">Key Resources</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {resources.map((r, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
            <Card className="hover:shadow-sm transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{r.icon}</span>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground text-sm">{r.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{r.desc}</p>
                    <a href={r.url} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="sm" className="mt-2 h-7 text-xs gap-1 px-2">
                        Learn More <ExternalLink className="w-3 h-3" />
                      </Button>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
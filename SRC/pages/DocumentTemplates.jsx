import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Sparkles, Loader2, Copy, Check } from "lucide-react";

const templateTypes = [
  { id: "cover_letter", label: "Cover Letter", icon: "📄", description: "For applying to a specific job" },
  { id: "reference_request", label: "Reference Request Letter", icon: "🤝", description: "Ask a colleague or manager for a reference" },
  { id: "thank_you", label: "Thank-You Note", icon: "💌", description: "Post-interview thank you" },
  { id: "career_change_explanation", label: "Career Change Explanation", icon: "🔄", description: "Explain your pivot to an employer" },
  { id: "linkedin_summary", label: "LinkedIn Summary", icon: "💼", description: "About section for your LinkedIn profile" },
  { id: "followup_email", label: "Follow-Up Email", icon: "📧", description: "After applying or interviewing" },
];

export default function DocumentTemplates() {
  const [selected, setSelected] = useState(null);
  const [fields, setFields] = useState({ your_name: "", target_job: "", company: "", your_background: "" });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setResult(null);
    const prompts = {
      cover_letter: `Write a compelling cover letter for a career changer. Name: ${fields.your_name}, transitioning from: ${fields.your_background}, applying for: ${fields.target_job} at ${fields.company}. Keep it warm, confident, and concise (3 paragraphs).`,
      reference_request: `Write a professional reference request letter. Name: ${fields.your_name}, asking a former colleague/manager for a reference for a ${fields.target_job} position at ${fields.company}.`,
      thank_you: `Write a sincere thank-you note after a job interview for ${fields.target_job} at ${fields.company}. From: ${fields.your_name}, career changer with background in: ${fields.your_background}.`,
      career_change_explanation: `Write a brief, confident explanation of a career change for a cover letter or interview. Person: ${fields.your_name}, previous background: ${fields.your_background}, transitioning to: ${fields.target_job}. Should address the change proactively and positively.`,
      linkedin_summary: `Write a professional LinkedIn "About" summary for a career changer. Name: ${fields.your_name}, background: ${fields.your_background}, targeting: ${fields.target_job} roles. Keep it under 250 words, first-person, engaging.`,
      followup_email: `Write a brief, professional follow-up email after applying for a ${fields.target_job} position at ${fields.company}. From: ${fields.your_name} who is a career changer with ${fields.your_background} experience.`,
    };
    const res = await base44.integrations.Core.InvokeLLM({ prompt: prompts[selected.id] });
    setResult(res);
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center mb-5">
          <FileText className="w-7 h-7 text-purple-700" />
        </div>
        <Badge className="bg-purple-100 text-purple-700 border-purple-200 mb-3">Pathfinder & Trailblazer</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3">Document Templates</h1>
        <p className="text-xl text-muted-foreground">Select a template, fill in a few details, and get a personalized professional document instantly.</p>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
        {templateTypes.map(t => (
          <button
            key={t.id}
            onClick={() => { setSelected(t); setResult(null); }}
            className={`p-4 rounded-2xl border-2 text-left transition-all ${selected?.id === t.id ? "border-secondary bg-secondary/10" : "border-border bg-card hover:border-muted-foreground/30"}`}
          >
            <div className="text-2xl mb-2">{t.icon}</div>
            <div className="font-semibold text-sm text-foreground">{t.label}</div>
            <div className="text-xs text-muted-foreground mt-1">{t.description}</div>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <Card className="mb-6">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-bold text-foreground">{selected.icon} {selected.label}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label>Your Name</Label>
                    <Input placeholder="Full name" value={fields.your_name} onChange={e => setFields(p => ({ ...p, your_name: e.target.value }))} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Target Job Title</Label>
                    <Input placeholder="e.g. HVAC Technician" value={fields.target_job} onChange={e => setFields(p => ({ ...p, target_job: e.target.value }))} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Company Name (if applicable)</Label>
                    <Input placeholder="e.g. ABC Mechanical" value={fields.company} onChange={e => setFields(p => ({ ...p, company: e.target.value }))} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Your Background / Previous Work</Label>
                    <Input placeholder="e.g. 10 years in retail management" value={fields.your_background} onChange={e => setFields(p => ({ ...p, your_background: e.target.value }))} />
                  </div>
                </div>
                <Button onClick={handleGenerate} disabled={!fields.your_name || !fields.target_job || loading} className="w-full bg-primary text-primary-foreground py-5 gap-2">
                  {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Generating...</> : <><Sparkles className="w-4 h-4" />Generate {selected.label}</>}
                </Button>
              </CardContent>
            </Card>

            {result && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-foreground">Your {selected.label}</h3>
                      <Button variant="outline" size="sm" onClick={handleCopy} className="gap-2">
                        {copied ? <><Check className="w-3.5 h-3.5 text-green-600" />Copied!</> : <><Copy className="w-3.5 h-3.5" />Copy</>}
                      </Button>
                    </div>
                    <pre className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed font-sans">{result}</pre>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
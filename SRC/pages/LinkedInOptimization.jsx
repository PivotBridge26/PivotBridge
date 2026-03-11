import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Linkedin, Sparkles, Loader2, CheckCircle } from "lucide-react";

export default function LinkedInOptimization() {
  const [form, setForm] = useState({ current_title: "", target_title: "", background: "", skills: "", accomplishments: "" });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reviewRequested, setReviewRequested] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setResult(null);
    const res = await base44.integrations.Core.InvokeLLM({
      prompt: `You are a LinkedIn profile optimization expert helping a career changer maximize visibility with recruiters.

Current Title: ${form.current_title}
Target Role: ${form.target_title}
Background: ${form.background}
Skills: ${form.skills}
Accomplishments: ${form.accomplishments}

Generate a complete LinkedIn optimization package including:
1. An optimized headline (max 220 chars) that bridges their past and target role
2. A compelling About section (250-300 words, first person, storytelling approach)
3. 10 high-impact keywords to sprinkle throughout their profile
4. 3 tips for their Experience section
5. 5 skills to add to their Skills section

Return as JSON.`,
      response_json_schema: {
        type: "object",
        properties: {
          headline: { type: "string" },
          about_section: { type: "string" },
          keywords: { type: "array", items: { type: "string" } },
          experience_tips: { type: "array", items: { type: "string" } },
          skills_to_add: { type: "array", items: { type: "string" } },
        }
      }
    });
    setResult(res);
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <div className="w-14 h-14 rounded-2xl bg-sky-100 flex items-center justify-center mb-5">
          <Linkedin className="w-7 h-7 text-sky-700" />
        </div>
        <Badge className="bg-secondary/10 text-secondary border-secondary/20 mb-3">Trailblazer Exclusive</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3">LinkedIn Profile Optimization</h1>
        <p className="text-xl text-muted-foreground">Get AI-generated LinkedIn content plus an optional human reviewer to maximize recruiter visibility.</p>
      </motion.div>

      <Card className="mb-6">
        <CardHeader><CardTitle>Your Profile Info</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Current Job Title</Label>
              <Input placeholder="e.g. Forklift Operator" value={form.current_title} onChange={e => setForm(p => ({ ...p, current_title: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <Label>Target Role</Label>
              <Input placeholder="e.g. HVAC Technician" value={form.target_title} onChange={e => setForm(p => ({ ...p, target_title: e.target.value }))} />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Your Background (brief)</Label>
            <Textarea rows={2} placeholder="e.g. 10 years in warehouse logistics, team lead for 3 years..." value={form.background} onChange={e => setForm(p => ({ ...p, background: e.target.value }))} />
          </div>
          <div className="space-y-1.5">
            <Label>Key Skills</Label>
            <Input placeholder="e.g. equipment operation, safety compliance, problem-solving" value={form.skills} onChange={e => setForm(p => ({ ...p, skills: e.target.value }))} />
          </div>
          <div className="space-y-1.5">
            <Label>Key Accomplishments (optional)</Label>
            <Input placeholder="e.g. zero safety incidents for 3 years, reduced errors 25%" value={form.accomplishments} onChange={e => setForm(p => ({ ...p, accomplishments: e.target.value }))} />
          </div>
          <Button onClick={handleGenerate} disabled={!form.current_title || !form.target_title || loading} className="w-full bg-primary text-primary-foreground py-5 gap-2">
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Optimizing...</> : <><Sparkles className="w-4 h-4" />Generate My LinkedIn Content</>}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
          <Card className="bg-sky-50 border-sky-100">
            <CardContent className="p-6">
              <p className="text-xs font-semibold text-sky-700 uppercase tracking-wide mb-2">Optimized Headline</p>
              <p className="text-lg font-bold text-foreground">{result.headline}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="font-semibold text-foreground mb-3">About Section</p>
              <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-sans leading-relaxed">{result.about_section}</pre>
            </CardContent>
          </Card>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Card>
              <CardContent className="p-6">
                <p className="font-semibold text-foreground mb-3">Keywords to Include</p>
                <div className="flex flex-wrap gap-2">
                  {result.keywords?.map((k, i) => <Badge key={i} className="bg-sky-100 text-sky-700 border border-sky-200">{k}</Badge>)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="font-semibold text-foreground mb-3">Skills to Add</p>
                <div className="flex flex-wrap gap-2">
                  {result.skills_to_add?.map((s, i) => <Badge key={i} className="bg-primary/10 text-primary border border-primary/20">{s}</Badge>)}
                </div>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardContent className="p-6">
              <p className="font-semibold text-foreground mb-3">Experience Section Tips</p>
              <ul className="space-y-2">{result.experience_tips?.map((t, i) => (
                <li key={i} className="flex gap-2 text-sm text-muted-foreground"><span className="text-secondary font-bold">•</span>{t}</li>
              ))}</ul>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-secondary/20">
            <CardContent className="p-6">
              <p className="font-semibold text-foreground mb-2">Want a human expert to review your profile?</p>
              <p className="text-sm text-muted-foreground mb-4">As a Trailblazer member, you get one full LinkedIn profile review by a human career specialist included per quarter.</p>
              {reviewRequested ? (
                <div className="flex items-center gap-2 text-green-700 font-medium">
                  <CheckCircle className="w-4 h-4" /> Review requested! We'll be in touch within 48 hours.
                </div>
              ) : (
                <Button onClick={() => setReviewRequested(true)} className="bg-secondary text-secondary-foreground gap-2">
                  <Linkedin className="w-4 h-4" /> Request Human Review
                </Button>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
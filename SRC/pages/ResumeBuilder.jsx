import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { FileText, Sparkles, Loader2, Download, RefreshCw } from "lucide-react";

export default function ResumeBuilder() {
  const [form, setForm] = useState({
    current_title: "",
    years_experience: "",
    key_skills: "",
    target_job: "",
    accomplishments: "",
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerate = async () => {
    setLoading(true);
    setResult(null);
    const res = await base44.integrations.Core.InvokeLLM({
      prompt: `You are a professional resume writer specializing in career transitions for blue-collar and manual workers moving into new fields.

Create a professional resume summary and 5 strong bullet points for a career changer with the following background:
- Current/Previous Job Title: ${form.current_title}
- Years of Experience: ${form.years_experience}
- Key Skills & Strengths: ${form.key_skills}
- Target Job/Career: ${form.target_job}
- Notable Accomplishments: ${form.accomplishments}

Translate their hands-on experience into language that resonates for their target career. Emphasize transferable skills. Use action verbs. Make it ATS-friendly.

Respond in JSON with:
- summary: a 3-4 sentence professional summary paragraph
- bullets: array of 5 resume bullet points
- skills_section: array of 8-10 relevant skills to list
- tips: array of 3 personalized resume tips for this person's transition`,
      response_json_schema: {
        type: "object",
        properties: {
          summary: { type: "string" },
          bullets: { type: "array", items: { type: "string" } },
          skills_section: { type: "array", items: { type: "string" } },
          tips: { type: "array", items: { type: "string" } },
        }
      }
    });
    setResult(res);
    setLoading(false);
  };

  const isReady = form.current_title && form.key_skills && form.target_job;

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center mb-5">
          <FileText className="w-7 h-7 text-amber-700" />
        </div>
        <Badge className="bg-amber-100 text-amber-700 border-amber-200 mb-3">Pathfinder & Trailblazer</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3">Resume Builder</h1>
        <p className="text-xl text-muted-foreground">
          Tell us about your experience and target career — our AI will translate your hands-on work into a powerful resume.
        </p>
      </motion.div>

      <Card className="mb-6">
        <CardHeader><CardTitle>Your Background</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Current or Most Recent Job Title</Label>
              <Input placeholder="e.g. Warehouse Associate" value={form.current_title} onChange={e => handleChange("current_title", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Years of Work Experience</Label>
              <Input placeholder="e.g. 8 years" value={form.years_experience} onChange={e => handleChange("years_experience", e.target.value)} />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Your Key Skills & Strengths</Label>
            <Textarea placeholder="e.g. operating forklifts, team leadership, attention to detail, safety compliance..." rows={3} value={form.key_skills} onChange={e => handleChange("key_skills", e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Target Job / Career You're Transitioning To</Label>
            <Input placeholder="e.g. HVAC Technician" value={form.target_job} onChange={e => handleChange("target_job", e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Notable Accomplishments (optional)</Label>
            <Textarea placeholder="e.g. Reduced warehouse errors by 30%, trained 5 new employees..." rows={2} value={form.accomplishments} onChange={e => handleChange("accomplishments", e.target.value)} />
          </div>

          <Button onClick={handleGenerate} disabled={!isReady || loading} className="w-full bg-primary text-primary-foreground py-5 gap-2">
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Building your resume...</> : <><Sparkles className="w-4 h-4" />Generate My Resume Content</>}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
          <Card>
            <CardHeader><CardTitle className="text-lg">Professional Summary</CardTitle></CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed italic">"{result.summary}"</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-lg">Experience Bullet Points</CardTitle></CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {result.bullets?.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-secondary font-bold mt-0.5">•</span>{b}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-lg">Skills to Highlight</CardTitle></CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {result.skills_section?.map((s, i) => (
                  <Badge key={i} className="bg-primary/10 text-primary border border-primary/20">{s}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-lg">Personalized Tips For You</CardTitle></CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {result.tips?.map((t, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="w-6 h-6 rounded-full bg-secondary/20 text-secondary font-bold text-xs flex items-center justify-center flex-shrink-0">{i + 1}</span>
                    {t}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Button variant="outline" onClick={handleGenerate} className="w-full gap-2">
            <RefreshCw className="w-4 h-4" /> Regenerate
          </Button>
        </motion.div>
      )}
    </div>
  );
}
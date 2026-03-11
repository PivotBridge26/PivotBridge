import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Award, Sparkles, Loader2, ExternalLink } from "lucide-react";

const resources = [
  { name: "CLEP — College Level Exam Program", desc: "Turn work experience into college credits. 34 exams available covering subjects from business to sciences.", url: "https://clep.collegeboard.org", icon: "🎓" },
  { name: "NCCER — Construction Credentials", desc: "Prior Learning Assessment for construction, maintenance, and pipeline workers. Recognized nationwide.", url: "https://www.nccer.org", icon: "🏗️" },
  { name: "CompTIA Certifications", desc: "Validate technical skills with industry-recognized IT certifications. Many waive exams for proven experience.", url: "https://www.comptia.org", icon: "💻" },
  { name: "Military Transcript (JST)", desc: "Veterans can translate military training into civilian academic credits via the Joint Services Transcript.", url: "https://jst.doded.mil", icon: "🎖️" },
  { name: "National Portfolio Assessment", desc: "Document and formalize your work experience into an academic or professional portfolio for credit recognition.", url: "https://www.cael.org/prior-learning-assessment", icon: "📁" },
];

export default function CredentialVerification() {
  const [form, setForm] = useState({ job_history: "", skills: "", target_credential: "", education: "" });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    setResult(null);
    const res = await base44.integrations.Core.InvokeLLM({
      prompt: `A worker wants to turn their hands-on experience into formal credentials.

Job History: ${form.job_history}
Skills & Training: ${form.skills}
Target Credential/Career: ${form.target_credential}
Current Education Level: ${form.education}

Identify:
1. What formal credentials or certifications they may already qualify for
2. Any prior learning assessment opportunities
3. Fastest pathway to the credential they need
4. Whether any of their experience might qualify for college credits
5. Specific programs or testing bodies they should contact

Return as JSON.`,
      response_json_schema: {
        type: "object",
        properties: {
          potential_credentials: { type: "array", items: { type: "object", properties: { name: { type: "string" }, why_qualified: { type: "string" }, next_step: { type: "string" } } } },
          prior_learning_opportunities: { type: "string" },
          fastest_pathway: { type: "string" },
          college_credit_potential: { type: "string" },
          specific_programs: { type: "array", items: { type: "string" } },
        }
      }
    });
    setResult(res);
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <div className="w-14 h-14 rounded-2xl bg-teal-100 flex items-center justify-center mb-5">
          <Award className="w-7 h-7 text-teal-700" />
        </div>
        <Badge className="bg-secondary/10 text-secondary border-secondary/20 mb-3">Trailblazer Exclusive</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3">Credential Verification & Recognition</h1>
        <p className="text-xl text-muted-foreground">Your years of experience may already qualify you for formal credentials. Let's find out.</p>
      </motion.div>

      <Card className="mb-8">
        <CardContent className="p-6 space-y-4">
          <h3 className="font-bold text-foreground">Tell Us About Your Experience</h3>
          <div className="space-y-1.5">
            <Label>Job History & Roles</Label>
            <Textarea rows={2} placeholder="e.g. 8 years as a forklift operator, 3 years as a team lead in manufacturing..." value={form.job_history} onChange={e => setForm(p => ({ ...p, job_history: e.target.value }))} />
          </div>
          <div className="space-y-1.5">
            <Label>Skills & Any Training Received</Label>
            <Input placeholder="e.g. OSHA 10, forklift certification, first aid, quality control..." value={form.skills} onChange={e => setForm(p => ({ ...p, skills: e.target.value }))} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Target Credential or Career</Label>
              <Input placeholder="e.g. HVAC license, LPN certification" value={form.target_credential} onChange={e => setForm(p => ({ ...p, target_credential: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <Label>Highest Education Level</Label>
              <Input placeholder="e.g. High school diploma, some college" value={form.education} onChange={e => setForm(p => ({ ...p, education: e.target.value }))} />
            </div>
          </div>
          <Button onClick={handleAnalyze} disabled={!form.job_history || !form.target_credential || loading} className="w-full bg-primary text-primary-foreground py-5 gap-2">
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Analyzing your credentials...</> : <><Sparkles className="w-4 h-4" />Find My Credential Opportunities</>}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-5 mb-10">
          {result.potential_credentials?.length > 0 && (
            <div>
              <h3 className="font-bold text-foreground text-lg mb-3">Credentials You May Already Qualify For</h3>
              <div className="space-y-3">
                {result.potential_credentials.map((c, i) => (
                  <Card key={i} className="bg-teal-50 border-teal-100">
                    <CardContent className="p-5">
                      <p className="font-semibold text-teal-900">{c.name}</p>
                      <p className="text-sm text-teal-800 mt-1"><span className="font-medium">Why you qualify:</span> {c.why_qualified}</p>
                      <p className="text-sm text-teal-800 mt-1"><span className="font-medium">Next step:</span> {c.next_step}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Card>
              <CardContent className="p-5">
                <p className="font-semibold text-foreground mb-2">🏃 Fastest Pathway</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{result.fastest_pathway}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <p className="font-semibold text-foreground mb-2">🎓 College Credit Potential</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{result.college_credit_potential}</p>
              </CardContent>
            </Card>
          </div>
          {result.specific_programs?.length > 0 && (
            <Card>
              <CardContent className="p-5">
                <p className="font-semibold text-foreground mb-3">Specific Programs to Contact</p>
                <ul className="space-y-1">{result.specific_programs.map((p, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex gap-2"><span className="text-secondary">•</span>{p}</li>
                ))}</ul>
              </CardContent>
            </Card>
          )}
        </motion.div>
      )}

      <h3 className="font-bold text-foreground text-lg mb-4">Prior Learning Resources</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {resources.map((r, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
            <Card className="hover:shadow-sm transition-shadow">
              <CardContent className="p-5 flex gap-3">
                <span className="text-2xl">{r.icon}</span>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-foreground mb-1">{r.name}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-2">{r.desc}</p>
                  <a href={r.url} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="sm" className="h-7 text-xs gap-1 px-2">Learn More <ExternalLink className="w-3 h-3" /></Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { DollarSign, Sparkles, Loader2 } from "lucide-react";

export default function SalaryNegotiation() {
  const [form, setForm] = useState({ job_title: "", location: "", experience: "", offer: "", situation: "" });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setResult(null);
    const res = await base44.integrations.Core.InvokeLLM({
      prompt: `You are a salary negotiation expert helping a career changer negotiate their first offer in a new field.

Job Title: ${form.job_title}
Location: ${form.location}
Years of Relevant Experience: ${form.experience}
Current Offer Received: $${form.offer}
Situation: ${form.situation}

Provide:
1. Market rate range for this role in this location
2. Whether this offer is below, at, or above market
3. A recommended counter-offer amount and reasoning
4. A word-for-word negotiation script they can use
5. Key talking points to emphasize their transferable skills
6. What to do if the employer says no

Return as JSON.`,
      add_context_from_internet: true,
      response_json_schema: {
        type: "object",
        properties: {
          market_range: { type: "string" },
          offer_assessment: { type: "string" },
          recommended_counter: { type: "string" },
          negotiation_script: { type: "string" },
          talking_points: { type: "array", items: { type: "string" } },
          if_they_say_no: { type: "string" },
        }
      }
    });
    setResult(res);
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center mb-5">
          <DollarSign className="w-7 h-7 text-emerald-700" />
        </div>
        <Badge className="bg-secondary/10 text-secondary border-secondary/20 mb-3">Trailblazer Exclusive</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3">Salary Negotiation Coach</h1>
        <p className="text-xl text-muted-foreground">Know your market value and get a word-for-word script to negotiate your offer confidently.</p>
      </motion.div>

      <Card className="mb-6">
        <CardHeader><CardTitle>Your Offer Details</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Job Title</Label>
              <Input placeholder="e.g. HVAC Technician" value={form.job_title} onChange={e => setForm(p => ({ ...p, job_title: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <Label>Location (City, State)</Label>
              <Input placeholder="e.g. Austin, TX" value={form.location} onChange={e => setForm(p => ({ ...p, location: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <Label>Years of Relevant Experience</Label>
              <Select value={form.experience} onValueChange={v => setForm(p => ({ ...p, experience: v }))}>
                <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Entry level (0-1 years)">Entry level (0–1 years)</SelectItem>
                  <SelectItem value="1-3 years">1–3 years</SelectItem>
                  <SelectItem value="3-5 years">3–5 years</SelectItem>
                  <SelectItem value="5-10 years">5–10 years</SelectItem>
                  <SelectItem value="10+ years">10+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Offer You Received ($/year)</Label>
              <Input type="number" placeholder="e.g. 42000" value={form.offer} onChange={e => setForm(p => ({ ...p, offer: e.target.value }))} />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Anything else relevant? (optional)</Label>
            <Input placeholder="e.g. I have 8 years in manufacturing that transfers well..." value={form.situation} onChange={e => setForm(p => ({ ...p, situation: e.target.value }))} />
          </div>
          <Button onClick={handleGenerate} disabled={!form.job_title || !form.offer || loading} className="w-full bg-primary text-primary-foreground py-5 gap-2">
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Researching market rates...</> : <><Sparkles className="w-4 h-4" />Get My Negotiation Strategy</>}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-5">
                <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">Market Rate</p>
                <p className="text-2xl font-extrabold text-foreground">{result.market_range}</p>
              </CardContent>
            </Card>
            <Card className="bg-secondary/10 border-secondary/20">
              <CardContent className="p-5">
                <p className="text-xs font-semibold text-secondary uppercase tracking-wide mb-1">Recommended Counter</p>
                <p className="text-2xl font-extrabold text-foreground">{result.recommended_counter}</p>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardContent className="p-6">
              <p className="font-semibold text-foreground mb-2">Offer Assessment</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{result.offer_assessment}</p>
            </CardContent>
          </Card>
          <Card className="bg-green-50 border-green-100">
            <CardContent className="p-6">
              <p className="font-semibold text-green-800 mb-3">📞 Your Negotiation Script</p>
              <pre className="text-sm text-green-900 whitespace-pre-wrap font-sans leading-relaxed">{result.negotiation_script}</pre>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="font-semibold text-foreground mb-3">Key Talking Points</p>
              <ul className="space-y-2">{result.talking_points?.map((t, i) => (
                <li key={i} className="flex gap-2 text-sm text-muted-foreground"><span className="text-secondary font-bold">•</span>{t}</li>
              ))}</ul>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="font-semibold text-foreground mb-2">If They Say No...</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{result.if_they_say_no}</p>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
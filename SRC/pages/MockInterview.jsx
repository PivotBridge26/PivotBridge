import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Sparkles, Loader2, ChevronRight, RefreshCw } from "lucide-react";

const INTERVIEW_TYPES = [
  { id: "behavioral", label: "Behavioral Interview", desc: "Tell me about a time when..." },
  { id: "technical", label: "Trade/Technical Interview", desc: "Hands-on skills & knowledge questions" },
  { id: "career_change", label: "Career Change Interview", desc: "Why are you switching careers?" },
  { id: "first_job", label: "First Interview in New Field", desc: "Entry-level role for career changers" },
];

export default function MockInterview() {
  const [type, setType] = useState(null);
  const [targetJob, setTargetJob] = useState("");
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState("setup"); // setup | question | feedback

  const generateQuestion = async () => {
    setLoading(true);
    const res = await base44.integrations.Core.InvokeLLM({
      prompt: `Generate a realistic ${type.label} interview question for someone applying for a ${targetJob} position who is a career changer. Make it specific to the role and realistic. Return just the question, nothing else.`
    });
    setQuestion(res);
    setAnswer("");
    setFeedback(null);
    setStage("question");
    setLoading(false);
  };

  const getFeedback = async () => {
    setLoading(true);
    const res = await base44.integrations.Core.InvokeLLM({
      prompt: `You are an experienced interview coach. A candidate for a ${targetJob} position (career changer) was asked:

"${question}"

Their answer was:
"${answer}"

Please provide:
1. A score out of 10
2. What they did well (2-3 specific points)
3. What to improve (2-3 specific points)
4. A suggested better answer or key phrases they should incorporate

Be encouraging but honest. Format as JSON.`,
      response_json_schema: {
        type: "object",
        properties: {
          score: { type: "number" },
          did_well: { type: "array", items: { type: "string" } },
          improve: { type: "array", items: { type: "string" } },
          suggested_answer: { type: "string" },
        }
      }
    });
    setFeedback(res);
    setStage("feedback");
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center mb-5">
          <Star className="w-7 h-7 text-purple-700" />
        </div>
        <Badge className="bg-secondary/10 text-secondary border-secondary/20 mb-3">Trailblazer Exclusive</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3">Mock Interview Coach</h1>
        <p className="text-xl text-muted-foreground">Practice real interview questions and get instant AI feedback — then book a session with a human coach.</p>
      </motion.div>

      <AnimatePresence mode="wait">
        {stage === "setup" && (
          <motion.div key="setup" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Card className="mb-6">
              <CardContent className="p-6 space-y-5">
                <div className="space-y-1.5">
                  <Label>Target Job Title</Label>
                  <Input placeholder="e.g. HVAC Technician, Home Health Aide" value={targetJob} onChange={e => setTargetJob(e.target.value)} />
                </div>
                <div>
                  <Label className="mb-3 block">Interview Type</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {INTERVIEW_TYPES.map(t => (
                      <button key={t.id} onClick={() => setType(t)} className={`p-4 rounded-xl border-2 text-left transition-all ${type?.id === t.id ? "border-secondary bg-secondary/10" : "border-border bg-muted/30 hover:border-muted-foreground/30"}`}>
                        <div className="font-semibold text-sm text-foreground">{t.label}</div>
                        <div className="text-xs text-muted-foreground mt-1">{t.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
                <Button onClick={generateQuestion} disabled={!type || !targetJob || loading} className="w-full bg-primary text-primary-foreground py-5 gap-2">
                  {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Generating...</> : <><Sparkles className="w-4 h-4" />Start Mock Interview</>}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {stage === "question" && (
          <motion.div key="question" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <Card className="mb-5 bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">Interview Question</p>
                <p className="text-xl font-bold text-foreground">{question}</p>
              </CardContent>
            </Card>
            <Card className="mb-5">
              <CardContent className="p-6 space-y-4">
                <Label>Your Answer</Label>
                <Textarea placeholder="Take your time. Answer as you would in a real interview..." rows={6} value={answer} onChange={e => setAnswer(e.target.value)} />
                <div className="flex gap-3">
                  <Button onClick={getFeedback} disabled={!answer.trim() || loading} className="flex-1 bg-primary text-primary-foreground gap-2">
                    {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Analyzing...</> : <><ChevronRight className="w-4 h-4" />Get Feedback</>}
                  </Button>
                  <Button variant="outline" onClick={() => { setStage("setup"); setQuestion(null); }}>Start Over</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {stage === "feedback" && feedback && (
          <motion.div key="feedback" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-5">
            <div className="flex items-center gap-4 bg-card border border-border rounded-2xl p-5">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-3xl font-extrabold text-white">{feedback.score}/10</span>
              </div>
              <div>
                <p className="font-bold text-foreground text-lg">Interview Score</p>
                <p className="text-muted-foreground text-sm">For: {targetJob} · {type?.label}</p>
              </div>
            </div>
            <Card>
              <CardContent className="p-6">
                <p className="font-semibold text-green-700 mb-3">✅ What You Did Well</p>
                <ul className="space-y-2">{feedback.did_well?.map((d, i) => <li key={i} className="text-sm text-muted-foreground flex gap-2"><span className="text-green-600">•</span>{d}</li>)}</ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="font-semibold text-amber-700 mb-3">💡 Areas to Improve</p>
                <ul className="space-y-2">{feedback.improve?.map((d, i) => <li key={i} className="text-sm text-muted-foreground flex gap-2"><span className="text-amber-600">•</span>{d}</li>)}</ul>
              </CardContent>
            </Card>
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <p className="font-semibold text-primary mb-3">⭐ Suggested Answer Direction</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{feedback.suggested_answer}</p>
              </CardContent>
            </Card>
            <Button variant="outline" onClick={() => { generateQuestion(); }} className="w-full gap-2">
              <RefreshCw className="w-4 h-4" /> Try Another Question
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
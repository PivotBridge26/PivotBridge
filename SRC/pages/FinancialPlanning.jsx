import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Heart, Sparkles, Loader2, DollarSign } from "lucide-react";

const tips = [
  { icon: "🎯", title: "Build a 3-Month Buffer", desc: "Before transitioning, try to save 3 months of essential expenses. Even $1,000–$2,000 provides breathing room." },
  { icon: "✂️", title: "Cut Non-Essentials First", desc: "Subscriptions, dining out, and entertainment can be paused. Protect housing, food, utilities, and healthcare." },
  { icon: "💬", title: "Talk to Your Family Early", desc: "Transitions go better when everyone understands the plan. Involve your spouse/partner in the decision." },
  { icon: "📋", title: "Know Your Income Gap", desc: "Calculate exactly how long your savings will last. This tells you how urgently you need to complete training." },
  { icon: "🤝", title: "Explore Side Income", desc: "Gig work, freelancing with current skills, or part-time work can bridge the income gap during training." },
  { icon: "📞", title: "Call Creditors Proactively", desc: "Many credit card companies and lenders offer hardship programs. Call before you miss a payment." },
];

export default function FinancialPlanning() {
  const [form, setForm] = useState({ monthly_income: "", monthly_expenses: "", savings: "", training_duration: "", has_family: "" });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    setResult(null);
    const gap = parseFloat(form.monthly_income) - parseFloat(form.monthly_expenses);
    const months = parseFloat(form.savings) / Math.max(parseFloat(form.monthly_expenses), 1);

    const res = await base44.integrations.Core.InvokeLLM({
      prompt: `A career-transitioning worker needs a financial transition plan.
Monthly take-home income: $${form.monthly_income}
Monthly essential expenses: $${form.monthly_expenses}
Current savings: $${form.savings}
Training duration: ${form.training_duration}
Has family/dependents: ${form.has_family}
Monthly surplus/deficit: $${gap.toFixed(0)}
Estimated months of savings runway: ${months.toFixed(1)} months

Provide:
1. A brief financial health assessment (1-2 sentences)
2. A realistic transition budget (key categories with $ amounts)
3. Top 3 money-saving moves specific to their situation
4. Whether their timeline is financially feasible, and what adjustments to consider
5. One creative income bridge idea

Return as JSON.`,
      response_json_schema: {
        type: "object",
        properties: {
          health_assessment: { type: "string" },
          transition_budget: { type: "array", items: { type: "object", properties: { category: { type: "string" }, amount: { type: "string" }, note: { type: "string" } } } },
          money_saving_moves: { type: "array", items: { type: "string" } },
          timeline_feasibility: { type: "string" },
          income_bridge_idea: { type: "string" },
        }
      }
    });
    setResult(res);
    setLoading(false);
  };

  const isReady = form.monthly_income && form.monthly_expenses && form.savings && form.training_duration;

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center mb-5">
          <Heart className="w-7 h-7 text-orange-700" />
        </div>
        <Badge className="bg-secondary/10 text-secondary border-secondary/20 mb-3">Trailblazer Exclusive</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3">Family Financial Planning</h1>
        <p className="text-xl text-muted-foreground">Navigate the income transition period with a clear, realistic financial plan for you and your family.</p>
      </motion.div>

      <Card className="mb-6">
        <CardHeader><CardTitle>Your Financial Snapshot</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Monthly Take-Home Income ($)</Label>
              <Input type="number" placeholder="e.g. 3200" value={form.monthly_income} onChange={e => setForm(p => ({ ...p, monthly_income: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <Label>Monthly Essential Expenses ($)</Label>
              <Input type="number" placeholder="e.g. 2800" value={form.monthly_expenses} onChange={e => setForm(p => ({ ...p, monthly_expenses: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <Label>Current Savings ($)</Label>
              <Input type="number" placeholder="e.g. 5000" value={form.savings} onChange={e => setForm(p => ({ ...p, savings: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <Label>Training Duration</Label>
              <Input placeholder="e.g. 6 months" value={form.training_duration} onChange={e => setForm(p => ({ ...p, training_duration: e.target.value }))} />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Family situation</Label>
            <Input placeholder="e.g. spouse working part-time, 2 kids" value={form.has_family} onChange={e => setForm(p => ({ ...p, has_family: e.target.value }))} />
          </div>
          <Button onClick={handleAnalyze} disabled={!isReady || loading} className="w-full bg-primary text-primary-foreground py-5 gap-2">
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Analyzing...</> : <><Sparkles className="w-4 h-4" />Create My Financial Plan</>}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-5 mb-10">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-5">
              <p className="font-semibold text-foreground mb-1">Financial Health Assessment</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{result.health_assessment}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="font-semibold text-foreground mb-3">Transition Budget</p>
              <div className="space-y-2">
                {result.transition_budget?.map((b, i) => (
                  <div key={i} className="flex items-center justify-between py-1.5 border-b border-border last:border-0">
                    <div>
                      <span className="text-sm font-medium text-foreground">{b.category}</span>
                      {b.note && <span className="text-xs text-muted-foreground ml-2">({b.note})</span>}
                    </div>
                    <span className="text-sm font-bold text-secondary">{b.amount}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Card>
              <CardContent className="p-5">
                <p className="font-semibold text-foreground mb-3">💡 Income Bridge Idea</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{result.income_bridge_idea}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <p className="font-semibold text-foreground mb-3">📅 Timeline Feasibility</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{result.timeline_feasibility}</p>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardContent className="p-5">
              <p className="font-semibold text-foreground mb-3">Top Money-Saving Moves</p>
              <ul className="space-y-2">{result.money_saving_moves?.map((m, i) => (
                <li key={i} className="flex gap-2 text-sm text-muted-foreground"><span className="text-secondary font-bold">•</span>{m}</li>
              ))}</ul>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <h3 className="font-bold text-foreground text-lg mb-4">Essential Financial Tips</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {tips.map((t, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
            <Card>
              <CardContent className="p-5 flex gap-3">
                <span className="text-2xl">{t.icon}</span>
                <div>
                  <p className="font-semibold text-sm text-foreground mb-1">{t.title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{t.desc}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
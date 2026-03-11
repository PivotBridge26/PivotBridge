import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { DollarSign, ExternalLink, Info } from "lucide-react";

const resources = [
  {
    category: "Federal Government",
    color: "bg-blue-100 text-blue-700",
    items: [
      {
        name: "WIOA — Workforce Innovation & Opportunity Act",
        description: "The largest federal workforce training program. Provides funding for training, career services, and support for displaced workers.",
        url: "https://www.careeronestop.org/LocalHelp/AmericanJobCenters/find-american-job-centers.aspx",
        type: "Grant / Free Training",
      },
      {
        name: "Pell Grant (via FAFSA)",
        description: "Federal grants up to $7,395/year for low-income students pursuing vocational or technical credentials. Doesn't have to be repaid.",
        url: "https://studentaid.gov/understand-aid/types/grants/pell",
        type: "Grant",
      },
      {
        name: "Trade Adjustment Assistance (TAA)",
        description: "If your job was lost due to trade or foreign competition, TAA may fund full retraining and provide a living stipend.",
        url: "https://www.dol.gov/agencies/eta/tradeact",
        type: "Stipend + Training",
      },
    ],
  },
  {
    category: "State Programs",
    color: "bg-green-100 text-green-700",
    items: [
      {
        name: "State Workforce Agencies",
        description: "Every state has a workforce development board that funds local training programs. Find yours through CareerOneStop.",
        url: "https://www.careeronestop.org/ResourcesFor/Workers/workers.aspx",
        type: "State Funding",
      },
      {
        name: "Registered Apprenticeship Programs",
        description: "State-sponsored apprenticeships let you earn a paycheck while getting certified. Available in hundreds of trades.",
        url: "https://www.apprenticeship.gov/apprenticeship-job-finder",
        type: "Earn While Learning",
      },
    ],
  },
  {
    category: "Private & Nonprofit Scholarships",
    color: "bg-amber-100 text-amber-700",
    items: [
      {
        name: "SkillPointe Foundation Scholarships",
        description: "Scholarships specifically for workers pursuing skilled trades and technical careers.",
        url: "https://skillpointefoundation.org",
        type: "Scholarship",
      },
      {
        name: "Mike Rowe WORKS Foundation",
        description: "Scholarships for students who value skilled trades. Up to $15,000 for trade school or apprenticeships.",
        url: "https://www.mikeroweworks.org/scholarship",
        type: "Scholarship",
      },
      {
        name: "AFL-CIO Union Plus Scholarships",
        description: "Scholarships for union members and their families pursuing education or retraining.",
        url: "https://www.unionplus.org/benefits/education/union-plus-scholarship",
        type: "Union Scholarship",
      },
    ],
  },
  {
    category: "Employer & Industry Funding",
    color: "bg-purple-100 text-purple-700",
    items: [
      {
        name: "Amazon Career Choice",
        description: "Amazon pre-pays 100% of tuition for employees pursuing in-demand fields — even if unrelated to Amazon work.",
        url: "https://www.amazoncareerchoice.com",
        type: "Employer Benefit",
      },
      {
        name: "Walmart Live Better U",
        description: "$1/day college program for Walmart associates to earn degrees and certificates.",
        url: "https://corporate.walmart.com/purpose/opportunity/live-better-u",
        type: "Employer Benefit",
      },
    ],
  },
];

export default function FinancialResources() {
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mb-5">
          <DollarSign className="w-7 h-7 text-green-700" />
        </div>
        <Badge className="bg-green-100 text-green-700 border-green-200 mb-3">Pathfinder & Trailblazer</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3">Financial Resources</h1>
        <p className="text-xl text-muted-foreground mb-5">
          Don't let cost stop your career transition. These programs can fund your training — often completely free.
        </p>
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-800">Many workers qualify for multiple programs. We recommend applying to as many as possible simultaneously.</p>
        </div>
      </motion.div>

      <div className="space-y-8">
        {resources.map((group, gi) => (
          <motion.div key={group.category} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: gi * 0.1 }}>
            <div className="flex items-center gap-3 mb-4">
              <Badge className={`${group.color} border-0 font-semibold`}>{group.category}</Badge>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {group.items.map((item, i) => (
                <Card key={i} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-foreground leading-snug flex-1 pr-2">{item.name}</h3>
                      <Badge variant="outline" className="text-xs flex-shrink-0">{item.type}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{item.description}</p>
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" className="w-full gap-2">
                        Learn More <ExternalLink className="w-3.5 h-3.5" />
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
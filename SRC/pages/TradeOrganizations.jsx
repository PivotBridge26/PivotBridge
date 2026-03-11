import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Building2, ExternalLink, Users } from "lucide-react";

const organizations = [
  {
    category: "Unions & Labor Orgs",
    color: "bg-blue-100 text-blue-700",
    items: [
      { name: "AFL-CIO", desc: "The largest federation of unions in the U.S. Access member benefits, job boards, and apprenticeship directories.", url: "https://aflcio.org", type: "Union Federation" },
      { name: "IBEW — Int'l Brotherhood of Electrical Workers", desc: "Apprenticeship programs and job placement for electricians nationwide.", url: "https://www.ibew.org", type: "Union" },
      { name: "UA — United Association (Plumbers & Pipefitters)", desc: "Training, apprenticeships, and union membership for plumbers, pipefitters, and HVAC workers.", url: "https://www.ua.org", type: "Union" },
      { name: "Carpenters Union (UBC)", desc: "Apprenticeships, training funds, and job placement for carpentry and construction trades.", url: "https://www.carpenters.org", type: "Union" },
    ]
  },
  {
    category: "Trade Associations",
    color: "bg-amber-100 text-amber-700",
    items: [
      { name: "ACCA — HVAC/R Industry", desc: "The leading trade association for HVAC contractors. Find employers, training, and certification programs.", url: "https://www.acca.org", type: "Trade Assoc." },
      { name: "NECA — Electrical Contractors", desc: "National Electrical Contractors Association. Job board and contractor network for electricians.", url: "https://www.necanet.org", type: "Trade Assoc." },
      { name: "Associated Builders & Contractors", desc: "Merit shop construction industry association with apprenticeships and a nationwide contractor network.", url: "https://www.abc.org", type: "Trade Assoc." },
      { name: "Home Care Association of America", desc: "Connecting home health workers with employers, training, and professional community.", url: "https://www.hcaoa.org", type: "Trade Assoc." },
    ]
  },
  {
    category: "Professional Networks & Job Boards",
    color: "bg-green-100 text-green-700",
    items: [
      { name: "Apprenticeship.gov", desc: "The official U.S. DOL apprenticeship finder. Search by location and trade for paid training programs.", url: "https://www.apprenticeship.gov", type: "Gov. Program" },
      { name: "iHireConstruction", desc: "Specialized job board for construction and skilled trades professionals.", url: "https://www.ihireconstruction.com", type: "Job Board" },
      { name: "NursingJobs.com", desc: "Healthcare-specific job board for nurses, aides, and medical support staff.", url: "https://www.nursingjobs.com", type: "Job Board" },
      { name: "SkillPointe", desc: "Career guidance and job opportunities specifically for skilled trade workers.", url: "https://www.skillpointe.com", type: "Career Platform" },
    ]
  },
];

export default function TradeOrganizations() {
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center mb-5">
          <Building2 className="w-7 h-7 text-amber-700" />
        </div>
        <Badge className="bg-secondary/10 text-secondary border-secondary/20 mb-3">Trailblazer Exclusive</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3">Trade Organizations & Unions</h1>
        <p className="text-xl text-muted-foreground">Direct introductions to the insider networks most job seekers never access.</p>
      </motion.div>

      <div className="space-y-8">
        {organizations.map((group, gi) => (
          <motion.div key={group.category} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: gi * 0.1 }}>
            <Badge className={`${group.color} border-0 font-semibold mb-4`}>{group.category}</Badge>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {group.items.map((item, i) => (
                <Card key={i} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-foreground flex-1 pr-2">{item.name}</h3>
                      <Badge variant="outline" className="text-xs flex-shrink-0">{item.type}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{item.desc}</p>
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" className="w-full gap-2">
                        Visit <ExternalLink className="w-3.5 h-3.5" />
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
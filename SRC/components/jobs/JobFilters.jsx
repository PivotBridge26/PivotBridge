import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

const categories = [
  "All Categories",
  "Skilled Trades",
  "Healthcare Support",
  "Healthcare",
  "Green Energy",
  "Education & Childcare",
  "Health & Wellness",
  "Field Services",
  "Outdoor Services",
  "Animal Care",
  "Building Services",
  "Transportation",
  "Social Services",
  "Construction",
];

const riskLevels = [
  "All Risk Levels",
  "Very Low",
  "Low",
];

export default function JobFilters({ search, setSearch, category, setCategory, risk, setRisk }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>
      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger className="w-full sm:w-48">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map(c => (
            <SelectItem key={c} value={c}>{c}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={risk} onValueChange={setRisk}>
        <SelectTrigger className="w-full sm:w-44">
          <SelectValue placeholder="AI Risk" />
        </SelectTrigger>
        <SelectContent>
          {riskLevels.map(r => (
            <SelectItem key={r} value={r}>{r}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
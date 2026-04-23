import { useState } from "react";
import { motion } from "framer-motion";
import { Search, GitMerge, Eye, Check, X, AlertTriangle, MapPin, ArrowLeft, ChevronRight, Image } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface DuplicatePair {
  id: string;
  templeA: {
    name: string;
    location: string;
    state: string;
    category: string;
    lastUpdated: string;
    contributorCount: number;
    description: string;
    timings: string;
    contact: string;
    imageCount: number;
  };
  templeB: {
    name: string;
    location: string;
    state: string;
    category: string;
    lastUpdated: string;
    contributorCount: number;
    description: string;
    timings: string;
    contact: string;
    imageCount: number;
  };
  similarity: number;
  detectedBy: "Auto" | "Manual";
  status: "Pending" | "Merged" | "Not Duplicate";
  detectedDate: string;
}

const mockData: DuplicatePair[] = [
  {
    id: "1",
    templeA: { name: "Sri Meenakshi Temple", location: "Madurai", state: "TN", category: "Shakti Peetha", lastUpdated: "Feb 6, 2026", contributorCount: 12, description: "Ancient Dravidian temple dedicated to Goddess Meenakshi", timings: "5:00 AM - 12:30 PM, 4:00 PM - 10:00 PM", contact: "+91 452 234 5678", imageCount: 24 },
    templeB: { name: "Meenakshi Amman Temple", location: "Madurai", state: "TN", category: "Shakti Peetha", lastUpdated: "Feb 4, 2026", contributorCount: 5, description: "Historic temple dedicated to Goddess Meenakshi in Madurai", timings: "5:00 AM - 12:30 PM, 4:00 PM - 10:00 PM", contact: "+91 452 234 5679", imageCount: 8 },
    similarity: 94,
    detectedBy: "Auto",
    status: "Pending",
    detectedDate: "Feb 6, 2026"
  },
  {
    id: "2",
    templeA: { name: "Kashi Vishwanath Temple", location: "Varanasi", state: "UP", category: "Jyotirlinga", lastUpdated: "Feb 5, 2026", contributorCount: 15, description: "One of the most famous Hindu temples dedicated to Lord Shiva", timings: "3:00 AM - 11:00 PM", contact: "+91 542 239 2629", imageCount: 32 },
    templeB: { name: "Vishwanath Temple Varanasi", location: "Varanasi", state: "UP", category: "Jyotirlinga", lastUpdated: "Feb 3, 2026", contributorCount: 3, description: "Famous Shiva temple in Varanasi", timings: "3:00 AM - 11:00 PM", contact: "+91 542 239 2630", imageCount: 5 },
    similarity: 89,
    detectedBy: "Auto",
    status: "Pending",
    detectedDate: "Feb 5, 2026"
  },
  {
    id: "3",
    templeA: { name: "Golden Temple", location: "Amritsar", state: "PB", category: "Sikh", lastUpdated: "Feb 4, 2026", contributorCount: 18, description: "Holiest Gurdwara and spiritual center of Sikhism", timings: "Open 24 hours", contact: "+91 183 255 3954", imageCount: 45 },
    templeB: { name: "Harmandir Sahib", location: "Amritsar", state: "PB", category: "Sikh", lastUpdated: "Feb 2, 2026", contributorCount: 8, description: "Also known as Golden Temple, holiest site in Sikhism", timings: "Open 24 hours", contact: "+91 183 255 3955", imageCount: 20 },
    similarity: 92,
    detectedBy: "Manual",
    status: "Pending",
    detectedDate: "Feb 4, 2026"
  },
  {
    id: "4",
    templeA: { name: "Tirumala Temple", location: "Tirupati", state: "AP", category: "Vaishnavism", lastUpdated: "Feb 3, 2026", contributorCount: 23, description: "Temple of Lord Venkateswara", timings: "3:00 AM - 12:00 AM", contact: "+91 877 227 7777", imageCount: 38 },
    templeB: { name: "Tirupati Balaji Temple", location: "Tirupati", state: "AP", category: "Vaishnavism", lastUpdated: "Feb 1, 2026", contributorCount: 10, description: "Famous Balaji temple in Tirupati hills", timings: "3:00 AM - 12:00 AM", contact: "+91 877 227 7778", imageCount: 15 },
    similarity: 88,
    detectedBy: "Auto",
    status: "Merged",
    detectedDate: "Feb 3, 2026"
  },
];

const statusColors: Record<string, string> = {
  Pending: "bg-warning/10 text-warning",
  Merged: "bg-success/10 text-success",
  "Not Duplicate": "bg-muted text-muted-foreground",
};

const getSimilarityColor = (score: number) => {
  if (score >= 90) return "text-destructive bg-destructive/10";
  if (score >= 80) return "text-warning bg-warning/10";
  return "text-info bg-info/10";
};

const Duplicates = () => {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedPair, setSelectedPair] = useState<DuplicatePair | null>(null);
  const [mergeChoice, setMergeChoice] = useState<"A" | "B" | "merge" | null>(null);

  const filtered = statusFilter === "all"
    ? mockData
    : mockData.filter((d) => d.status === statusFilter);

  if (selectedPair) {
    return (
      <div className="p-6 lg:px-8 lg:pt-4 lg:pb-8 max-w-7xl">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="sm" onClick={() => { setSelectedPair(null); setMergeChoice(null); }} className="gap-1.5">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-foreground">Duplicate Review</h1>
              <p className="text-sm text-muted-foreground">Compare and decide: {selectedPair.similarity}% similarity detected</p>
            </div>
            <span className={cn("text-xs font-medium px-3 py-1 rounded-full", statusColors[selectedPair.status])}>
              {selectedPair.status}
            </span>
          </div>

          {/* Side-by-Side Comparison */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Temple A */}
            <div 
              className={cn(
                "bg-card rounded-lg border card-shadow overflow-hidden cursor-pointer transition-all",
                mergeChoice === "A" && "ring-2 ring-success",
                mergeChoice === "B" && "opacity-50"
              )}
              onClick={() => setMergeChoice("A")}
            >
              <div className="px-5 py-4 border-b bg-muted/30 flex items-center justify-between">
                <h2 className="font-semibold text-foreground">Temple A</h2>
                {mergeChoice === "A" && (
                  <span className="text-xs bg-success text-success-foreground px-2 py-0.5 rounded-full">Selected</span>
                )}
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wider">Name</label>
                  <p className="text-sm font-medium text-foreground mt-1">{selectedPair.templeA.name}</p>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wider">Location</label>
                  <div className="flex items-center gap-1.5 mt-1">
                    <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                    <p className="text-sm text-foreground">{selectedPair.templeA.location}, {selectedPair.templeA.state}</p>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wider">Category</label>
                  <p className="text-sm text-foreground mt-1">{selectedPair.templeA.category}</p>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wider">Description</label>
                  <p className="text-sm text-foreground mt-1">{selectedPair.templeA.description}</p>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wider">Timings</label>
                  <p className="text-sm text-foreground mt-1">{selectedPair.templeA.timings}</p>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wider">Contact</label>
                  <p className="text-sm text-foreground mt-1">{selectedPair.templeA.contact}</p>
                </div>
                <div className="pt-3 border-t flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Image className="h-3.5 w-3.5" />
                      {selectedPair.templeA.imageCount} images
                    </span>
                    <span>{selectedPair.templeA.contributorCount} contributors</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{selectedPair.templeA.lastUpdated}</span>
                </div>
              </div>
            </div>

            {/* Temple B */}
            <div 
              className={cn(
                "bg-card rounded-lg border card-shadow overflow-hidden cursor-pointer transition-all",
                mergeChoice === "B" && "ring-2 ring-success",
                mergeChoice === "A" && "opacity-50"
              )}
              onClick={() => setMergeChoice("B")}
            >
              <div className="px-5 py-4 border-b bg-muted/30 flex items-center justify-between">
                <h2 className="font-semibold text-foreground">Temple B</h2>
                {mergeChoice === "B" && (
                  <span className="text-xs bg-success text-success-foreground px-2 py-0.5 rounded-full">Selected</span>
                )}
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wider">Name</label>
                  <p className="text-sm font-medium text-foreground mt-1">{selectedPair.templeB.name}</p>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wider">Location</label>
                  <div className="flex items-center gap-1.5 mt-1">
                    <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                    <p className="text-sm text-foreground">{selectedPair.templeB.location}, {selectedPair.templeB.state}</p>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wider">Category</label>
                  <p className="text-sm text-foreground mt-1">{selectedPair.templeB.category}</p>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wider">Description</label>
                  <p className="text-sm text-foreground mt-1">{selectedPair.templeB.description}</p>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wider">Timings</label>
                  <p className="text-sm text-foreground mt-1">{selectedPair.templeB.timings}</p>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wider">Contact</label>
                  <p className="text-sm text-foreground mt-1">{selectedPair.templeB.contact}</p>
                </div>
                <div className="pt-3 border-t flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Image className="h-3.5 w-3.5" />
                      {selectedPair.templeB.imageCount} images
                    </span>
                    <span>{selectedPair.templeB.contributorCount} contributors</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{selectedPair.templeB.lastUpdated}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Merge Options */}
          <div className="bg-card rounded-lg border card-shadow p-5 mb-6">
            <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <GitMerge className="h-4 w-4 text-accent" />
              Merge Options
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <button
                className={cn(
                  "p-4 rounded-lg border-2 text-left transition-all",
                  mergeChoice === "A" ? "border-success bg-success/5" : "border-muted hover:border-muted-foreground/30"
                )}
                onClick={() => setMergeChoice("A")}
              >
                <p className="font-medium text-foreground mb-1">Keep Temple A</p>
                <p className="text-xs text-muted-foreground">Discard Temple B and keep A as the master record</p>
              </button>
              <button
                className={cn(
                  "p-4 rounded-lg border-2 text-left transition-all",
                  mergeChoice === "B" ? "border-success bg-success/5" : "border-muted hover:border-muted-foreground/30"
                )}
                onClick={() => setMergeChoice("B")}
              >
                <p className="font-medium text-foreground mb-1">Keep Temple B</p>
                <p className="text-xs text-muted-foreground">Discard Temple A and keep B as the master record</p>
              </button>
              <button
                className={cn(
                  "p-4 rounded-lg border-2 text-left transition-all",
                  mergeChoice === "merge" ? "border-success bg-success/5" : "border-muted hover:border-muted-foreground/30"
                )}
                onClick={() => setMergeChoice("merge")}
              >
                <p className="font-medium text-foreground mb-1">Merge Fields</p>
                <p className="text-xs text-muted-foreground">Combine best data from both records</p>
              </button>
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="fixed bottom-0 left-0 right-0 lg:left-56 bg-card border-t p-4 flex items-center justify-end gap-3">
            <Button variant="outline" size="sm" className="gap-1.5">
              <X className="h-4 w-4" />
              Not a Duplicate
            </Button>
            <Button size="sm" className="gap-1.5" disabled={!mergeChoice}>
              <GitMerge className="h-4 w-4" />
              {mergeChoice === "A" ? "Keep A & Remove B" : mergeChoice === "B" ? "Keep B & Remove A" : mergeChoice === "merge" ? "Merge Records" : "Select an Option"}
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:px-8 lg:pt-4 lg:pb-8 max-w-7xl">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-1">Duplicates</h1>
            <p className="text-sm text-muted-foreground">Identify and merge duplicate temple records</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-warning/10 text-warning px-3 py-1.5 rounded-full font-medium">
              {mockData.filter(d => d.status === "Pending").length} Pending Review
            </span>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40 h-9 text-sm bg-card">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Merged">Merged</SelectItem>
            <SelectItem value="Not Duplicate">Not Duplicate</SelectItem>
          </SelectContent>
        </Select>

        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search duplicates..." className="h-9 pl-9 text-sm bg-card" />
        </div>
      </div>

      {/* Duplicate Pairs */}
      <div className="space-y-4">
        {filtered.map((pair, i) => (
          <motion.div
            key={pair.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.05 }}
            className="bg-card rounded-lg border card-shadow overflow-hidden hover:card-shadow-hover transition-all cursor-pointer"
            onClick={() => setSelectedPair(pair)}
          >
            <div className="p-4">
              <div className="flex items-center gap-4 mb-4">
                <span className={cn("text-sm font-bold px-3 py-1 rounded-lg", getSimilarityColor(pair.similarity))}>
                  {pair.similarity}%
                </span>
                <span className={cn("text-[11px] font-medium px-2.5 py-1 rounded-full", statusColors[pair.status])}>
                  {pair.status}
                </span>
                <span className="text-xs text-muted-foreground">
                  {pair.detectedBy === "Auto" ? "Auto-detected" : "Manually flagged"} · {pair.detectedDate}
                </span>
                <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto" />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Temple A */}
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm font-medium text-foreground mb-1">{pair.templeA.name}</p>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {pair.templeA.location}, {pair.templeA.state}
                  </div>
                </div>

                {/* Temple B */}
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm font-medium text-foreground mb-1">{pair.templeB.name}</p>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {pair.templeB.location}, {pair.templeB.state}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Duplicates;

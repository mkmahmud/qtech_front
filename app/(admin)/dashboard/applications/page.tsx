"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Search, MapPin, DollarSign, Clock, Calendar,
  ExternalLink, Trash2, ChevronDown
} from "lucide-react";

const STATUS_CONFIG: Record<string, { label: string; variant: "default" | "green" | "yellow" | "red"; desc: string }> = {
  applied:       { label: "Applied",       variant: "default", desc: "Application submitted, awaiting review." },
  under_review:  { label: "Under Review",  variant: "yellow",  desc: "Hiring team is reviewing your profile." },
  shortlisted:   { label: "Shortlisted",   variant: "green",   desc: "You've been shortlisted! Expect a call soon." },
  rejected:      { label: "Rejected",      variant: "red",     desc: "This position has been filled." },
};

const APPLICATIONS = [
  {
    id: "1", jobId: "1", jobTitle: "Senior Product Designer", company: "Stripe",
    location: "Remote · US", salary: "$120k–$160k", type: "Full Time",
    category: "Design", status: "shortlisted",
    appliedAt: "Mar 14, 2025", deadline: "Jun 30, 2025",
    logo: "S", logoColor: "bg-brand-primary/15 text-brand-primary",
    tags: ["Figma", "Design Systems"],
  },
  {
    id: "2", jobId: "2", jobTitle: "Frontend Engineer (React)", company: "Vercel",
    location: "San Francisco, CA", salary: "$140k–$190k", type: "Full Time",
    category: "Engineering", status: "under_review",
    appliedAt: "Mar 11, 2025", deadline: "Jul 15, 2025",
    logo: "V", logoColor: "bg-brand-black/10 text-brand-black",
    tags: ["React", "TypeScript"],
  },
  {
    id: "3", jobId: "5", jobTitle: "Brand Designer", company: "Linear",
    location: "Remote · Europe", salary: "$80k–$110k", type: "Contract",
    category: "Design", status: "applied",
    appliedAt: "Mar 7, 2025", deadline: "May 1, 2025",
    logo: "L", logoColor: "bg-brand-red/15 text-brand-red",
    tags: ["Branding", "Illustration"],
  },
  {
    id: "4", jobId: "3", jobTitle: "Growth Marketing Manager", company: "Notion",
    location: "New York, NY", salary: "$90k–$130k", type: "Full Time",
    category: "Marketing", status: "rejected",
    appliedAt: "Feb 28, 2025", deadline: "Apr 15, 2025",
    logo: "N", logoColor: "bg-brand-green/15 text-brand-green",
    tags: ["SEO", "Analytics"],
  },
  {
    id: "5", jobId: "4", jobTitle: "Backend Engineer – Python", company: "Anthropic",
    location: "Remote · Worldwide", salary: "$160k–$220k", type: "Full Time",
    category: "Engineering", status: "under_review",
    appliedAt: "Feb 20, 2025", deadline: "Jun 1, 2025",
    logo: "A", logoColor: "bg-brand-yellow/15 text-brand-yellow",
    tags: ["Python", "AWS"],
  },
];

const FILTERS = ["All", "Applied", "Under Review", "Shortlisted", "Rejected"];
const statusKeyMap: Record<string, string> = {
  "All": "all",
  "Applied": "applied",
  "Under Review": "under_review",
  "Shortlisted": "shortlisted",
  "Rejected": "rejected",
};

export default function MyApplicationsPage() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = APPLICATIONS.filter((a) => {
    const matchStatus = filter === "All" || a.status === statusKeyMap[filter];
    const matchSearch =
      !search ||
      a.jobTitle.toLowerCase().includes(search.toLowerCase()) ||
      a.company.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const counts = {
    all: APPLICATIONS.length,
    applied: APPLICATIONS.filter((a) => a.status === "applied").length,
    under_review: APPLICATIONS.filter((a) => a.status === "under_review").length,
    shortlisted: APPLICATIONS.filter((a) => a.status === "shortlisted").length,
    rejected: APPLICATIONS.filter((a) => a.status === "rejected").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-heading font-bold text-3xl text-brand-neutrals-100">My Applications</h1>
        <p className="font-ui text-sm text-brand-neutrals-60 mt-1">
          You have applied to <span className="font-semibold text-brand-neutrals-100">{APPLICATIONS.length}</span> jobs
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-brand-neutrals-40" />
        <input
          placeholder="Search applications…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-10 pl-10 pr-4 border border-brand-neutrals-20 bg-white font-ui text-sm outline-none focus:border-brand-primary transition-colors"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {FILTERS.map((f) => {
          const key = statusKeyMap[f] as keyof typeof counts;
          const count = counts[key] ?? counts.all;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex items-center gap-1.5 px-4 py-1.5 font-ui text-sm font-medium border transition-colors ${
                filter === f
                  ? "bg-brand-primary text-white border-brand-primary"
                  : "bg-white border-brand-neutrals-20 text-brand-neutrals-80 hover:border-brand-primary hover:text-brand-primary"
              }`}
            >
              {f}
              <span className={`text-xs px-1.5 py-0.5 font-bold ${filter === f ? "bg-white/20 text-white" : "bg-brand-neutrals-20 text-brand-neutrals-60"}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Application Cards */}
      {filtered.length === 0 ? (
        <div className="bg-white border border-brand-neutrals-20 py-16 text-center">
          <p className="font-heading font-bold text-lg text-brand-neutrals-60">No applications found</p>
          <p className="font-ui text-sm text-brand-neutrals-40 mt-1">Try a different filter or search term.</p>
          <Link href="/jobs" className="inline-block mt-4">
            <Button>Browse Jobs</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((app) => {
            const s = STATUS_CONFIG[app.status];
            const isExpanded = expanded === app.id;
            return (
              <div key={app.id} className="bg-white border border-brand-neutrals-20 hover:border-brand-primary/40 transition-colors">
                {/* Main row */}
                <div className="flex items-start gap-4 p-5">
                  <div className={`size-11 shrink-0 grid place-items-center font-heading font-bold text-lg ${app.logoColor}`}>
                    {app.logo}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div>
                        <h3 className="font-heading font-bold text-base text-brand-neutrals-100">{app.jobTitle}</h3>
                        <p className="font-ui text-sm text-brand-neutrals-60">{app.company}</p>
                      </div>
                      <Badge variant={s.variant}>{s.label}</Badge>
                    </div>

                    <div className="flex flex-wrap gap-4 mt-2 text-xs font-ui text-brand-neutrals-60">
                      <span className="flex items-center gap-1"><MapPin className="size-3.5" />{app.location}</span>
                      <span className="flex items-center gap-1"><DollarSign className="size-3.5" />{app.salary}</span>
                      <span className="flex items-center gap-1"><Clock className="size-3.5" />Applied {app.appliedAt}</span>
                    </div>

                    <div className="flex gap-2 flex-wrap mt-2.5">
                      {app.tags.map((t) => (
                        <span key={t} className="font-ui text-xs border border-brand-neutrals-20 px-2 py-0.5 text-brand-neutrals-60">{t}</span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <Link href={`/jobs/${app.jobId}`}>
                      <button className="size-8 border border-brand-neutrals-20 grid place-items-center hover:border-brand-primary hover:text-brand-primary transition-colors text-brand-neutrals-60">
                        <ExternalLink className="size-3.5" />
                      </button>
                    </Link>
                    <button className="size-8 border border-brand-neutrals-20 grid place-items-center hover:border-brand-red hover:text-brand-red transition-colors text-brand-neutrals-60">
                      <Trash2 className="size-3.5" />
                    </button>
                    <button
                      onClick={() => setExpanded(isExpanded ? null : app.id)}
                      className="size-8 border border-brand-neutrals-20 grid place-items-center hover:border-brand-primary transition-colors text-brand-neutrals-60"
                    >
                      <ChevronDown className={`size-3.5 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                    </button>
                  </div>
                </div>

                {/* Expanded: Status Timeline */}
                {isExpanded && (
                  <div className="border-t border-brand-neutrals-20 px-5 py-4 bg-brand-light-gray">
                    <div className="grid sm:grid-cols-2 gap-4">
                      {/* Status info */}
                      <div>
                        <p className="font-ui text-xs font-semibold text-brand-neutrals-60 uppercase tracking-wider mb-2">Status Update</p>
                        <div className={`flex items-start gap-2 p-3 border-l-4 ${
                          app.status === "shortlisted" ? "border-brand-green bg-brand-green/5" :
                          app.status === "under_review" ? "border-brand-yellow bg-brand-yellow/5" :
                          app.status === "rejected" ? "border-brand-red bg-brand-red/5" :
                          "border-brand-primary bg-brand-primary/5"
                        }`}>
                          <p className="font-ui text-sm text-brand-neutrals-80">{s.desc}</p>
                        </div>
                      </div>
                      {/* Timeline dots */}
                      <div>
                        <p className="font-ui text-xs font-semibold text-brand-neutrals-60 uppercase tracking-wider mb-2">Progress</p>
                        <div className="flex items-center gap-1.5">
                          {["applied", "under_review", "shortlisted"].map((step, i) => {
                            const stages = ["applied", "under_review", "shortlisted"];
                            const currentIdx = stages.indexOf(app.status);
                            const stepIdx = i;
                            const done = currentIdx >= stepIdx && app.status !== "rejected";
                            return (
                              <div key={step} className="flex items-center gap-1.5">
                                <div className={`size-2.5 rounded-full border-2 ${done ? "bg-brand-primary border-brand-primary" : "border-brand-neutrals-20 bg-white"}`} />
                                <span className="font-ui text-[10px] text-brand-neutrals-60 hidden sm:inline capitalize">{step.replace("_", " ")}</span>
                                {i < 2 && <div className={`w-6 h-0.5 ${done && currentIdx > stepIdx ? "bg-brand-primary" : "bg-brand-neutrals-20"}`} />}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-3 font-ui text-xs text-brand-neutrals-60">
                      <span className="flex items-center gap-1"><Calendar className="size-3.5" />Applied: {app.appliedAt}</span>
                      <span className="flex items-center gap-1"><Calendar className="size-3.5" />Deadline: {app.deadline}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

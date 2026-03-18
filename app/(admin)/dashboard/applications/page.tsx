"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Search, MapPin, DollarSign, Clock, Calendar,
  ExternalLink, Trash2, ChevronDown, Loader2, CheckCircle2
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { toast } from "sonner";
import { applicationApi } from "@/lib/api/features/application";
import { Input } from "@/components/ui/input";

//  Status  
const STATUS_CONFIG: Record<string, { label: string; variant: "default" | "green" | "yellow" | "red"; desc: string }> = {
  submitted: { label: "Applied", variant: "default", desc: "Application submitted, awaiting review." },
  pending: { label: "Under Review", variant: "yellow", desc: "Hiring team is reviewing your profile." },
  selected: { label: "Shortlisted", variant: "green", desc: "You've been shortlisted! Expect a call soon." },
  rejected: { label: "Rejected", variant: "red", desc: "This position has been filled." },
};

const FILTERS = ["All", "Applied", "Under Review", "Shortlisted", "Rejected"];
const statusKeyMap: Record<string, string> = {
  "All": "all",
  "Applied": "submitted",
  "Under Review": "pending",
  "Shortlisted": "selected",
  "Rejected": "rejected",
};

export default function MyApplicationsPage() {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const jobId = searchParams.get("job");

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<number | null>(null);

  //    Fetch Data  
  const { data: response, isLoading, isError } = useQuery({
    queryKey: jobId ? ["applications", "job", jobId] : ["applications", "me"],
    queryFn: () => jobId ? applicationApi.getJobApplications(Number(jobId)) : applicationApi.getMyApplications(),
  });

  //   Admin Updates Status
  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      // @ts-ignore
      applicationApi.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      toast.success("Application status updated successfully");
    },
    onError: () => toast.error("Failed to update status"),
  });

  //  Withdraw Application (Seeker Only)
  const withdrawMutation = useMutation({
    mutationFn: (id: number) => applicationApi.withdraw(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      toast.success("Application withdrawn");
    },
  });

  const APPLICATIONS = response?.data || [];

  const filtered = APPLICATIONS.filter((a) => {
    const matchStatus = filter === "All" || a.status === statusKeyMap[filter];
    const matchSearch = !search ||
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.job?.title.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const counts = {
    all: APPLICATIONS.length,
    applied: APPLICATIONS.filter((a) => a.status === "submitted").length,
    under_review: APPLICATIONS.filter((a) => a.status === "pending").length,
    shortlisted: APPLICATIONS.filter((a) => a.status === "selected").length,
    rejected: APPLICATIONS.filter((a) => a.status === "rejected").length,
  };

  if (isLoading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="size-8 animate-spin text-brand-primary" />
        <p className="text-sm font-ui text-brand-neutrals-60 font-medium italic">Loading applications...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-heading font-bold text-3xl text-brand-neutrals-100">
            {jobId ? "Job Applicants" : "My Applications"}
          </h1>
          <p className="font-ui text-sm text-brand-neutrals-60 mt-1">
            Total entries: <span className="font-semibold text-brand-neutrals-100">{APPLICATIONS.length}</span>
          </p>
        </div>
        {jobId && (
          <Link href="/dashboard/jobs">
            <Button variant="ghost" size="sm" className="text-brand-neutrals-60 font-ui underline">Back to Job List</Button>
          </Link>
        )}
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-brand-neutrals-40" />
          <Input
            placeholder="Search by name or job title…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 pl-10 pr-4 border-b border-brand-neutrals-20 "
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {FILTERS.map((f) => {
            const key = statusKeyMap[f] as keyof typeof counts;
            const count = counts[key] ?? counts.all;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`flex items-center gap-1.5 px-4 py-1.5 font-ui text-sm font-medium border transition-colors ${filter === f
                  ? "bg-brand-primary text-white border-brand-primary"
                  : "bg-white border-brand-neutrals-20 text-brand-neutrals-80 hover:border-brand-primary hover:text-brand-primary"
                  }`}
              >
                {f}
                <span className={`text-[10px] px-1.5 py-0.5 font-bold ${filter === f ? "bg-white/20 text-white" : "bg-brand-neutrals-20 text-brand-neutrals-60"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main List */}
      {filtered.length === 0 ? (
        <div className="bg-white border border-brand-neutrals-20 py-20 text-center">
          <p className="font-heading font-bold text-lg text-brand-neutrals-60">No records found</p>
          <p className="font-ui text-sm text-brand-neutrals-40 mt-1">Adjust your filters or search terms.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((app) => {
            const s = STATUS_CONFIG[app.status] || STATUS_CONFIG.submitted;
            const isExpanded = expanded === app.id;

            return (
              <div key={app.id} className="bg-white border border-brand-neutrals-20 hover:border-brand-primary/40 transition-colors">
                <div className="flex items-start gap-4 p-5">
                  <div className={`size-11 shrink-0 grid place-items-center font-heading font-bold text-lg bg-brand-primary/10 text-brand-primary`}>
                    {app.name.charAt(0)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div>
                        <h3 className="font-heading font-bold text-base text-brand-neutrals-100">{app.name}</h3>
                        <p className="font-ui text-sm text-brand-neutrals-60">{app.job?.title || "Project Application"}</p>
                      </div>
                      <Badge variant={s.variant}>{s.label}</Badge>
                    </div>

                    <div className="flex flex-wrap gap-4 mt-2 text-xs font-ui text-brand-neutrals-60">
                      <span className="flex items-center gap-1"><Clock className="size-3.5" />Applied {format(new Date(app.created_at), "MMM d, yyyy")}</span>
                      {app.email && <span className="underline">{app.email}</span>}
                    </div>
                  </div>

                  {/* Top Level Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <a href={app.resume_link} target="_blank" rel="noopener noreferrer">
                      <button className="size-8 border border-brand-neutrals-20 grid place-items-center hover:border-brand-primary hover:text-brand-primary transition-colors text-brand-neutrals-60">
                        <ExternalLink className="size-3.5" />
                      </button>
                    </a>
                    {!jobId && (
                      <button
                        onClick={() => withdrawMutation.mutate(app.id)}
                        disabled={withdrawMutation.isPending}
                        className="size-8 border border-brand-neutrals-20 grid place-items-center hover:border-brand-red hover:text-brand-red transition-colors text-brand-neutrals-60"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    )}
                    <button
                      onClick={() => setExpanded(isExpanded ? null : app.id)}
                      className="size-8 border border-brand-neutrals-20 grid place-items-center hover:border-brand-primary transition-colors text-brand-neutrals-60"
                    >
                      <ChevronDown className={`size-3.5 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                    </button>
                  </div>
                </div>

                {/* Expanded Section: Details & Admin Controls */}
                {isExpanded && (
                  <div className="border-t border-brand-neutrals-20 px-5 py-5 bg-brand-light-gray/50">
                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Left Side: Note */}
                      <div>
                        <p className="font-ui text-[11px] font-bold text-brand-neutrals-60 uppercase tracking-widest mb-3">Cover Message</p>
                        <div className="p-4 bg-white border border-brand-neutrals-20 text-sm font-ui text-brand-neutrals-80 leading-relaxed italic">
                          "{app.cover_note || "No message provided by candidate."}"
                        </div>
                      </div>

                      {/* Right Side: Admin Status Toggle */}
                      {jobId ? (
                        <div className="space-y-4">
                          <p className="font-ui text-[11px] font-bold text-brand-neutrals-60 uppercase tracking-widest">Update Recruitment Status</p>
                          <div className="flex flex-col gap-2">
                            {Object.entries(STATUS_CONFIG).map(([key, config]) => (
                              <button
                                key={key}
                                disabled={updateStatusMutation.isPending || app.status === key}
                                onClick={() => updateStatusMutation.mutate({ id: app.id, status: key })}
                                className={`flex items-center justify-between px-4 py-2 text-xs font-semibold border transition-all ${app.status === key
                                  ? "bg-white border-brand-neutrals-100 text-brand-neutrals-100 cursor-default shadow-sm"
                                  : "bg-white border-brand-neutrals-20 text-brand-neutrals-40 hover:border-brand-primary hover:text-brand-primary"
                                  }`}
                              >
                                <span>{config.label}</span>
                                {app.status === key && <CheckCircle2 className="size-4 text-brand-green" />}
                              </button>
                            ))}
                          </div>
                          {updateStatusMutation.isPending && <p className="text-[10px] text-brand-primary animate-pulse text-center">Saving changes...</p>}
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <p className="font-ui text-[11px] font-bold text-brand-neutrals-60 uppercase tracking-widest">Application Progress</p>
                          <div className="p-4 border-l-4 border-brand-primary bg-brand-primary/5">
                            <p className="font-ui text-sm font-semibold text-brand-neutrals-100">{s.label}</p>
                            <p className="font-ui text-xs text-brand-neutrals-60 mt-1">{s.desc}</p>
                          </div>
                        </div>
                      )}
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
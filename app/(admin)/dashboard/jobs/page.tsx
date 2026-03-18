"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Plus, Search, Edit2, Trash2, Eye, Users,
  MapPin, ChevronDown, Loader2
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { format } from "date-fns";
import { jobsApi } from "@/lib/api/features/jobs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CATEGORIES = ["All", "engineering", "design", "marketing", "customer_support", "other"];
const STATUSES = ["All", "Active", "Closed", "Draft"];

export default function AdminJobsPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // Get All data
  const { data: response, isLoading, isError } = useQuery({
    queryKey: ["jobs", "admin"],
    queryFn: () => jobsApi.getMyJobs(),
  });

  const JOBS = response?.data || [];

  // Delete
  const deleteMutation = useMutation({
    mutationFn: (id: number) => jobsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      toast.success("Job deleted successfully");
    },
    onError: () => toast.error("Failed to delete job"),
  });

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this job? This action cannot be undone.")) {
      deleteMutation.mutate(id);
    }
  };

  const filtered = JOBS.filter((j) => {
    const matchSearch = !search || j.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || j.category === category;
    const matchStatus = statusFilter === "All" || (j as any).status === statusFilter.toLowerCase();
    return matchSearch && matchCat && matchStatus;
  });

  if (isLoading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-2">
        <Loader2 className="size-8 animate-spin text-brand-primary" />
        <p className="text-sm text-brand-neutrals-60">Loading your listings...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <p className="text-destructive">Failed to load jobs. Please try refreshing.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-heading font-bold text-3xl text-brand-neutrals-100">Manage Jobs</h1>
          <p className="font-ui text-sm text-brand-neutrals-60 mt-1">
            You have <span className="font-semibold text-brand-neutrals-100">{JOBS.length}</span> job listings
          </p>
        </div>
        <Link href="/dashboard/jobs/create">
          <Button className="gap-2"><Plus className="size-4" /> Post New Job</Button>
        </Link>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Active", value: JOBS.length, color: "text-brand-green", bg: "bg-brand-green/10" },
          { label: "Total Applicants", value: JOBS.reduce((s, j) => s + (j.applications_count || 0), 0), color: "text-brand-primary", bg: "bg-brand-primary/10" },
          { label: "Shortlisted", value: 0, color: "text-brand-yellow", bg: "bg-brand-yellow/10" },
        ].map(({ label, value, color, bg }) => (
          <div key={label} className={`${bg} border border-transparent p-4`}>
            <p className={`font-heading font-bold text-2xl ${color}`}>{value}</p>
            <p className="font-ui text-sm text-brand-neutrals-60">{label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-brand-neutrals-40" />
          <Input
            placeholder="Search job titles…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 pl-10 pr-4 border-b border-brand-neutrals-20  "
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <div className="relative">

            <Select
            >
              <SelectTrigger className="h-12 border-none outline-none text-sm text-gray-600 w-full">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent onChange={(e: any) => setCategory(e.target.value)}>
                {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c.replace("_", " ")}</SelectItem>)}

              </SelectContent>
            </Select>
          </div>

          <div className="relative">

            <Select
            >
              <SelectTrigger className="h-12 border-none outline-none text-sm text-gray-600 w-full">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent onChange={(e: any) => setStatusFilter(e.target.value)}>
                {STATUSES.map((c) => <SelectItem key={c} value={c}>{c.replace("_", " ")}</SelectItem>)}

              </SelectContent>
            </Select>

          </div>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="bg-white border border-brand-neutrals-20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-brand-neutrals-20 bg-brand-light-gray">
                <th className="text-left px-6 py-3 font-ui text-xs font-semibold text-brand-neutrals-60 uppercase tracking-wider">Job</th>
                <th className="text-left px-4 py-3 font-ui text-xs font-semibold text-brand-neutrals-60 uppercase tracking-wider">Category</th>
                <th className="text-left px-4 py-3 font-ui text-xs font-semibold text-brand-neutrals-60 uppercase tracking-wider">Applicants</th>
                <th className="text-left px-4 py-3 font-ui text-xs font-semibold text-brand-neutrals-60 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-right font-ui text-xs font-semibold text-brand-neutrals-60 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-neutrals-20">
              {filtered.map((job) => (
                <tr key={job.id} className="hover:bg-brand-light-gray transition-colors group">
                  <td className="px-6 py-4">
                    <p className="font-ui text-sm font-semibold text-brand-neutrals-100">{job.title}</p>
                    <div className="flex items-center gap-3 mt-0.5 text-xs font-ui text-brand-neutrals-60">
                      <span className="flex items-center gap-1"><MapPin className="size-3" />{job.location}</span>
                      <span className="capitalize">{job.company}</span>
                    </div>
                    <p className="font-ui text-xs text-brand-neutrals-40 mt-0.5">
                      Posted {format(new Date(job.created_at), "MMM d, yyyy")}
                    </p>
                  </td>
                  <td className="px-4 py-4">
                    <Badge variant="green" className="capitalize">
                      {job.category.replace("_", " ")}
                    </Badge>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1 font-ui text-sm font-semibold text-brand-neutrals-100">
                      <Users className="size-3.5 text-brand-neutrals-40" />
                      {job.applications_count}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <Badge
                      variant={
                        (job as any).status === "active" ? "green" :
                          (job as any).status === "draft" ? "yellow" : "default"
                      }
                    >
                      {(job as any).status?.toUpperCase() || "ACTIVE"}
                    </Badge>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link href={`/dashboard/applications?job=${job.id}`}>
                        <button className="flex items-center gap-1.5 font-ui text-xs font-medium text-brand-primary border border-brand-primary/30 px-2.5 py-1.5 hover:bg-brand-primary hover:text-white transition-colors">
                          <Eye className="size-3.5" /> View
                        </button>
                      </Link>
                      <Link href={`/dashboard/jobs/${job.id}/edit`}>
                        <button className="size-8 border border-brand-neutrals-20 grid place-items-center hover:border-brand-primary hover:text-brand-primary transition-colors text-brand-neutrals-60">
                          <Edit2 className="size-3.5" />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(job.id)}
                        disabled={deleteMutation.isPending}
                        className="size-8 border border-brand-neutrals-20 grid place-items-center hover:border-brand-red hover:text-brand-red transition-colors text-brand-neutrals-60 disabled:opacity-50"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <p className="font-heading font-bold text-brand-neutrals-60">No jobs match your filters</p>
            <Link href="/dashboard/jobs/create" className="inline-block mt-4">
              <Button size="sm"><Plus className="size-4 mr-1.5" /> Post a Job</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
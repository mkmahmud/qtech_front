"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Plus, Search, Edit2, Trash2, Eye, Users,
  MapPin, MoreVertical, ChevronDown
} from "lucide-react";

const JOBS = [
  {
    id: "1", title: "Senior Product Designer", company: "Stripe",
    location: "Remote · US", category: "Design", type: "Full Time",
    salary: "$120k–$160k", status: "active",
    applicants: 48, shortlisted: 5, posted: "Mar 14, 2025",
  },
  {
    id: "2", title: "Frontend Engineer (React)", company: "Stripe",
    location: "San Francisco, CA", category: "Engineering", type: "Full Time",
    salary: "$140k–$190k", status: "active",
    applicants: 72, shortlisted: 8, posted: "Mar 7, 2025",
  },
  {
    id: "3", title: "Growth Marketing Manager", company: "Stripe",
    location: "New York, NY", category: "Marketing", type: "Full Time",
    salary: "$90k–$130k", status: "active",
    applicants: 35, shortlisted: 3, posted: "Feb 28, 2025",
  },
  {
    id: "4", title: "Backend Engineer – Python", company: "Stripe",
    location: "Remote · Worldwide", category: "Engineering", type: "Full Time",
    salary: "$160k–$220k", status: "closed",
    applicants: 91, shortlisted: 12, posted: "Feb 10, 2025",
  },
  {
    id: "5", title: "Customer Success Lead", company: "Stripe",
    location: "Dublin, Ireland", category: "Customer Support", type: "Full Time",
    salary: "$70k–$95k", status: "draft",
    applicants: 0, shortlisted: 0, posted: "Mar 18, 2025",
  },
];

const CATEGORIES = ["All", "Engineering", "Design", "Marketing", "Customer Support"];
const STATUSES = ["All", "Active", "Closed", "Draft"];

export default function AdminJobsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const filtered = JOBS.filter((j) => {
    const matchSearch = !search || j.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || j.category === category;
    const matchStatus = statusFilter === "All" || j.status === statusFilter.toLowerCase();
    return matchSearch && matchCat && matchStatus;
  });

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
          { label: "Active", value: JOBS.filter((j) => j.status === "active").length, color: "text-brand-green", bg: "bg-brand-green/10" },
          { label: "Total Applicants", value: JOBS.reduce((s, j) => s + j.applicants, 0), color: "text-brand-primary", bg: "bg-brand-primary/10" },
          { label: "Shortlisted", value: JOBS.reduce((s, j) => s + j.shortlisted, 0), color: "text-brand-yellow", bg: "bg-brand-yellow/10" },
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
          <input
            placeholder="Search job titles…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 pl-10 pr-4 border border-brand-neutrals-20 bg-white font-ui text-sm outline-none focus:border-brand-primary transition-colors"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="appearance-none h-10 pl-3 pr-8 border border-brand-neutrals-20 bg-white font-ui text-sm text-brand-neutrals-80 outline-none focus:border-brand-primary"
            >
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 size-3.5 text-brand-neutrals-40 pointer-events-none" />
          </div>
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none h-10 pl-3 pr-8 border border-brand-neutrals-20 bg-white font-ui text-sm text-brand-neutrals-80 outline-none focus:border-brand-primary"
            >
              {STATUSES.map((s) => <option key={s}>{s}</option>)}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 size-3.5 text-brand-neutrals-40 pointer-events-none" />
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
                      <span>{job.salary}</span>
                    </div>
                    <p className="font-ui text-xs text-brand-neutrals-40 mt-0.5">Posted {job.posted}</p>
                  </td>
                  <td className="px-4 py-4">
                    <span className="font-ui text-xs border border-brand-neutrals-20 px-2 py-1 text-brand-neutrals-60">{job.category}</span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1 font-ui text-sm font-semibold text-brand-neutrals-100">
                      <Users className="size-3.5 text-brand-neutrals-40" />
                      {job.applicants}
                    </div>
                    <p className="font-ui text-xs text-brand-green mt-0.5">{job.shortlisted} shortlisted</p>
                  </td>
                  <td className="px-4 py-4">
                    <Badge
                      variant={
                        job.status === "active" ? "green" :
                        job.status === "draft" ? "yellow" : "default"
                      }
                    >
                      {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
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
                      <button className="size-8 border border-brand-neutrals-20 grid place-items-center hover:border-brand-red hover:text-brand-red transition-colors text-brand-neutrals-60">
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

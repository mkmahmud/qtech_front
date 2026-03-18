import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FileText, Bookmark, Clock, CheckCircle2, XCircle,
  TrendingUp, Briefcase, Users, Plus, ArrowRight, Eye
} from "lucide-react";

const MOCK_ROLE = "admin";

const USER_STATS = [
  { label: "Total Applied", value: 12, icon: FileText, color: "text-brand-primary", bg: "bg-brand-primary/10" },
  { label: "Under Review", value: 5, icon: Clock, color: "text-brand-yellow", bg: "bg-brand-yellow/10" },
  { label: "Shortlisted", value: 3, icon: CheckCircle2, color: "text-brand-green", bg: "bg-brand-green/10" },
  { label: "Rejected", value: 2, icon: XCircle, color: "text-brand-red", bg: "bg-brand-red/10" },
];

const ADMIN_STATS = [
  { label: "Active Jobs", value: 8, icon: Briefcase, color: "text-brand-primary", bg: "bg-brand-primary/10" },
  { label: "Total Applications", value: 247, icon: FileText, color: "text-brand-yellow", bg: "bg-brand-yellow/10" },
  { label: "Shortlisted", value: 34, icon: CheckCircle2, color: "text-brand-green", bg: "bg-brand-green/10" },
  { label: "Total Candidates", value: 189, icon: Users, color: "text-brand-neutrals-80", bg: "bg-brand-neutrals-20" },
];

const RECENT_APPLICATIONS = [
  { id: "1", jobTitle: "Senior Product Designer", company: "Stripe", status: "shortlisted", appliedAt: "2 days ago", logo: "S", logoColor: "bg-brand-primary/15 text-brand-primary" },
  { id: "2", jobTitle: "Frontend Engineer (React)", company: "Vercel", status: "under_review", appliedAt: "5 days ago", logo: "V", logoColor: "bg-brand-black/10 text-brand-black" },
  { id: "3", jobTitle: "Brand Designer", company: "Linear", status: "applied", appliedAt: "1 week ago", logo: "L", logoColor: "bg-brand-red/15 text-brand-red" },
  { id: "4", jobTitle: "Growth Manager", company: "Notion", status: "rejected", appliedAt: "2 weeks ago", logo: "N", logoColor: "bg-brand-green/15 text-brand-green" },
];

const ADMIN_RECENT_JOBS = [
  { id: "1", title: "Senior Product Designer", applicants: 48, shortlisted: 5, status: "active", posted: "2 days ago" },
  { id: "2", title: "Frontend Engineer (React)", applicants: 72, shortlisted: 8, status: "active", posted: "1 week ago" },
  { id: "3", title: "Customer Success Lead", applicants: 18, shortlisted: 2, status: "active", posted: "3 weeks ago" },
  { id: "4", title: "Backend Engineer – Python", applicants: 91, shortlisted: 12, status: "closed", posted: "1 month ago" },
];

const ADMIN_RECENT_APPLICANTS = [
  { name: "Sarah Johnson", job: "Senior Product Designer", status: "shortlisted", appliedAt: "Today", avatar: "SJ" },
  { name: "Michael Chen", job: "Frontend Engineer", status: "under_review", appliedAt: "Yesterday", avatar: "MC" },
  { name: "Priya Patel", job: "Senior Product Designer", status: "applied", appliedAt: "2 days ago", avatar: "PP" },
];

const STATUS_CONFIG: Record<string, { label: string; variant: "default" | "green" | "yellow" | "red" }> = {
  applied: { label: "Applied", variant: "default" },
  under_review: { label: "Under Review", variant: "yellow" },
  shortlisted: { label: "Shortlisted", variant: "green" },
  rejected: { label: "Rejected", variant: "red" },
};


export default function DashboardPage() {
  const isAdmin = MOCK_ROLE === "admin";
  const stats = isAdmin ? ADMIN_STATS : USER_STATS;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-heading font-bold text-3xl text-brand-neutrals-100">
            {isAdmin ? "Dashboard" : "My Dashboard"}
          </h1>
          <p className="font-ui text-sm text-brand-neutrals-60 mt-1">
            {isAdmin ? "Manage your job listings and review applications." : "Track your job applications and stay on top of your search."}
          </p>
        </div>
        {isAdmin ? (
          <Link href="/dashboard/jobs/create">
            <Button className="gap-2"><Plus className="size-4" /> Post a Job</Button>
          </Link>
        ) : (
          <Link href="/jobs">
            <Button variant="outline" className="gap-2"><Briefcase className="size-4" /> Browse Jobs</Button>
          </Link>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white border border-brand-neutrals-20 p-5">
            <div className="flex items-start justify-between mb-4">
              <div className={`size-10 ${bg} grid place-items-center`}>
                <Icon className={`size-5 ${color}`} />
              </div>
              <TrendingUp className="size-4 text-brand-green opacity-60" />
            </div>
            <p className="font-heading font-bold text-3xl text-brand-neutrals-100">{value}</p>
            <p className="font-ui text-sm text-brand-neutrals-60 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* ── USER VIEW ── */}
      {!isAdmin && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Recent Applications */}
          <div className="xl:col-span-2 bg-white border border-brand-neutrals-20">
            <div className="flex items-center justify-between px-6 py-4 border-b border-brand-neutrals-20">
              <h2 className="font-heading font-bold text-lg text-brand-neutrals-100">Recent Applications</h2>
              <Link href="/dashboard/applications" className="font-ui text-sm text-brand-primary hover:underline flex items-center gap-1">
                View all <ArrowRight className="size-3.5" />
              </Link>
            </div>
            <div className="divide-y divide-brand-neutrals-20">
              {RECENT_APPLICATIONS.map((app) => {
                const s = STATUS_CONFIG[app.status];
                return (
                  <div key={app.id} className="flex items-center gap-4 px-6 py-4 hover:bg-brand-light-gray transition-colors">
                    <div className={`size-10 shrink-0 grid place-items-center font-heading font-bold text-base ${app.logoColor}`}>
                      {app.logo}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-ui text-sm font-semibold text-brand-neutrals-100 truncate">{app.jobTitle}</p>
                      <p className="font-ui text-xs text-brand-neutrals-60">{app.company} · {app.appliedAt}</p>
                    </div>
                    <Badge variant={s.variant}>{s.label}</Badge>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar: Application Progress */}
          <div className="space-y-4">
            <div className="bg-white border border-brand-neutrals-20 p-5">
              <h3 className="font-heading font-bold text-base text-brand-neutrals-100 mb-4">Application Funnel</h3>
              {[
                { label: "Applied", count: 12, max: 12, color: "bg-brand-primary" },
                { label: "Under Review", count: 5, max: 12, color: "bg-brand-yellow" },
                { label: "Shortlisted", count: 3, max: 12, color: "bg-brand-green" },
                { label: "Offers", count: 1, max: 12, color: "bg-brand-green" },
              ].map(({ label, count, max, color }) => (
                <div key={label} className="mb-3">
                  <div className="flex justify-between font-ui text-sm mb-1">
                    <span className="text-brand-neutrals-80">{label}</span>
                    <span className="font-semibold text-brand-neutrals-100">{count}</span>
                  </div>
                  <div className="h-2 bg-brand-neutrals-20 w-full">
                    <div
                      className={`h-2 ${color} transition-all`}
                      style={{ width: `${(count / max) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-brand-primary p-5">
              <p className="font-heading font-bold text-white text-base mb-1">Keep applying!</p>
              <p className="font-ui text-xs text-white/70 mb-4 leading-relaxed">
                Candidates who apply to 15+ jobs are 3× more likely to get hired.
              </p>
              <Link href="/jobs">
                <Button variant="secondary" size="sm" className="w-full">Browse Jobs</Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ── ADMIN VIEW ── */}
      {isAdmin && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Job Listings Table */}
          <div className="xl:col-span-2 bg-white border border-brand-neutrals-20">
            <div className="flex items-center justify-between px-6 py-4 border-b border-brand-neutrals-20">
              <h2 className="font-heading font-bold text-lg text-brand-neutrals-100">Your Job Listings</h2>
              <Link href="/dashboard/jobs" className="font-ui text-sm text-brand-primary hover:underline flex items-center gap-1">
                Manage all <ArrowRight className="size-3.5" />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-brand-neutrals-20 bg-brand-light-gray">
                    <th className="text-left px-6 py-3 font-ui text-xs font-semibold text-brand-neutrals-60 uppercase tracking-wider">Job Title</th>
                    <th className="text-left px-4 py-3 font-ui text-xs font-semibold text-brand-neutrals-60 uppercase tracking-wider">Applicants</th>
                    <th className="text-left px-4 py-3 font-ui text-xs font-semibold text-brand-neutrals-60 uppercase tracking-wider">Shortlisted</th>
                    <th className="text-left px-4 py-3 font-ui text-xs font-semibold text-brand-neutrals-60 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-neutrals-20">
                  {ADMIN_RECENT_JOBS.map((job) => (
                    <tr key={job.id} className="hover:bg-brand-light-gray transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-ui text-sm font-semibold text-brand-neutrals-100">{job.title}</p>
                        <p className="font-ui text-xs text-brand-neutrals-40">{job.posted}</p>
                      </td>
                      <td className="px-4 py-4">
                        <span className="font-ui text-sm font-semibold text-brand-neutrals-100">{job.applicants}</span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="font-ui text-sm font-semibold text-brand-green">{job.shortlisted}</span>
                      </td>
                      <td className="px-4 py-4">
                        <Badge variant={job.status === "active" ? "green" : "default"}>
                          {job.status === "active" ? "Active" : "Closed"}
                        </Badge>
                      </td>
                      <td className="px-4 py-4">
                        <Link href={`/dashboard/applications?job=${job.id}`}>
                          <Button variant="outline" className="gap-1.5">
                            <Eye className="size-3.5" /> View
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Applicants */}
          <div className="space-y-4">
            <div className="bg-white border border-brand-neutrals-20">
              <div className="flex items-center justify-between px-5 py-4 border-b border-brand-neutrals-20">
                <h3 className="font-heading font-bold text-base text-brand-neutrals-100">Recent Applicants</h3>
                <Link href="/dashboard/applications" className="font-ui text-xs text-brand-primary hover:underline">See all</Link>
              </div>
              <div className="divide-y divide-brand-neutrals-20">
                {ADMIN_RECENT_APPLICANTS.map((a) => {
                  const s = STATUS_CONFIG[a.status];
                  return (
                    <div key={a.name} className="flex items-center gap-3 px-5 py-3.5">
                      <div className="size-8 bg-brand-primary grid place-items-center font-ui text-xs font-bold text-white shrink-0">
                        {a.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-ui text-sm font-semibold text-brand-neutrals-100 truncate">{a.name}</p>
                        <p className="font-ui text-xs text-brand-neutrals-60 truncate">{a.job}</p>
                      </div>
                      <Badge variant={s.variant}>{s.label}</Badge>
                    </div>
                  );
                })}
              </div>
            </div>


          </div>
        </div>
      )}
    </div>
  );
}

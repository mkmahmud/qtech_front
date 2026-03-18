"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Search, Filter, ChevronDown, ExternalLink, X,
  MapPin, Mail, Phone, Linkedin, FileText,
  CheckCircle2, XCircle, Clock, Eye
} from "lucide-react";

type AppStatus = "applied" | "under_review" | "shortlisted" | "rejected";

interface Applicant {
  id: string; jobId: string; jobTitle: string;
  name: string; email: string; phone: string;
  linkedin: string; portfolio: string; resumeLink: string;
  coverNote: string; yearsExp: string; currentRole: string;
  currentCompany: string; noticePeriod: string; salaryExpectation: string;
  status: AppStatus; appliedAt: string; avatar: string;
  q1: string; q2: string; q3: string;
}

const STATUS_CFG: Record<AppStatus, { label: string; variant: "default" | "green" | "yellow" | "red" }> = {
  applied:       { label: "Applied",       variant: "default" },
  under_review:  { label: "Under Review",  variant: "yellow" },
  shortlisted:   { label: "Shortlisted",   variant: "green" },
  rejected:      { label: "Rejected",      variant: "red" },
};

const APPLICANTS: Applicant[] = [
  { id: "1", jobId: "1", jobTitle: "Senior Product Designer", name: "Sarah Johnson", email: "sarah@example.com", phone: "+1 555 010 2030", linkedin: "linkedin.com/in/sarah", portfolio: "sarahdesigns.com", resumeLink: "#", coverNote: "I've spent 6 years crafting B2B design systems and would love to bring that expertise to Stripe's platform.", yearsExp: "5–8 years", currentRole: "Lead Designer", currentCompany: "Figma", noticePeriod: "2 weeks", salaryExpectation: "$140,000", status: "shortlisted", appliedAt: "Mar 14, 2025", avatar: "SJ", q1: "At my last role I redesigned the billing flow end-to-end, reducing drop-off by 34%.", q2: "I've contributed components to multiple design systems and written Storybook documentation.", q3: "Stripe's focus on developer experience aligns perfectly with my design philosophy." },
  { id: "2", jobId: "1", jobTitle: "Senior Product Designer", name: "Michael Chen", email: "michael@example.com", phone: "+1 555 020 3040", linkedin: "linkedin.com/in/michael", portfolio: "mcdesign.io", resumeLink: "#", coverNote: "Huge fan of Stripe's product philosophy. I bring 7 years of fintech design experience.", yearsExp: "5–8 years", currentRole: "Senior Designer", currentCompany: "PayPal", noticePeriod: "1 month", salaryExpectation: "$135,000", status: "under_review", appliedAt: "Mar 15, 2025", avatar: "MC", q1: "I redesigned PayPal's checkout flow which improved conversion by 18%.", q2: "I maintain our core Figma component library used by 12 designers.", q3: "Stripe's API-first mindset inspires me to think beyond just pretty interfaces." },
  { id: "3", jobId: "1", jobTitle: "Senior Product Designer", name: "Priya Patel", email: "priya@example.com", phone: "+44 7911 234567", linkedin: "linkedin.com/in/priya", portfolio: "priyapatel.design", resumeLink: "#", coverNote: "My experience in global financial products makes me an ideal fit for this role.", yearsExp: "3–5 years", currentRole: "Product Designer", currentCompany: "Revolut", noticePeriod: "2 months", salaryExpectation: "$115,000", status: "applied", appliedAt: "Mar 16, 2025", avatar: "PP", q1: "I led the dark mode redesign across all Revolut mobile screens.", q2: "I've built and maintained 200+ component tokens in our design system.", q3: "Stripe's mission to increase the GDP of the internet resonates deeply with me." },
  { id: "4", jobId: "2", jobTitle: "Frontend Engineer (React)", name: "James Wilson", email: "james@example.com", phone: "+1 555 030 4050", linkedin: "linkedin.com/in/james", portfolio: "jameswilson.dev", resumeLink: "#", coverNote: "React enthusiast with 6 years building production-grade web apps.", yearsExp: "5–8 years", currentRole: "Senior Frontend Engineer", currentCompany: "Airbnb", noticePeriod: "2 weeks", salaryExpectation: "$175,000", status: "shortlisted", appliedAt: "Mar 10, 2025", avatar: "JW", q1: "I rebuilt Airbnb's search page with React Server Components, cutting LCP by 40%.", q2: "Contributor to Radix UI and several open source React libraries.", q3: "Vercel's commitment to DX and the Next.js ecosystem is second to none." },
  { id: "5", jobId: "2", jobTitle: "Frontend Engineer (React)", name: "Aisha Okonkwo", email: "aisha@example.com", phone: "+234 801 234 5678", linkedin: "linkedin.com/in/aisha", portfolio: "aishaokonkwo.com", resumeLink: "#", coverNote: "Passionate about performance and accessibility. Open source contributor.", yearsExp: "3–5 years", currentRole: "Frontend Developer", currentCompany: "Flutterwave", noticePeriod: "Immediately available", salaryExpectation: "$150,000", status: "rejected", appliedAt: "Mar 8, 2025", avatar: "AO", q1: "I built a real-time payment dashboard with sub-100ms updates.", q2: "I maintain an accessible React component kit used by 500+ developers.", q3: "Vercel's edge network aligns with my experience building globally distributed apps." },
];

const JOBS_FILTER = ["All Jobs", "Senior Product Designer", "Frontend Engineer (React)"];

export default function AdminApplicationsPage() {
  const [search, setSearch] = useState("");
  const [jobFilter, setJobFilter] = useState("All Jobs");
  const [statusFilter, setStatusFilter] = useState<AppStatus | "all">("all");
  const [selected, setSelected] = useState<Applicant | null>(null);
  const [statuses, setStatuses] = useState<Record<string, AppStatus>>(
    Object.fromEntries(APPLICANTS.map((a) => [a.id, a.status]))
  );

  const updateStatus = (id: string, s: AppStatus) =>
    setStatuses((prev) => ({ ...prev, [id]: s }));

  const filtered = APPLICANTS.filter((a) => {
    const s = statuses[a.id];
    return (
      (statusFilter === "all" || s === statusFilter) &&
      (jobFilter === "All Jobs" || a.jobTitle === jobFilter) &&
      (!search || a.name.toLowerCase().includes(search.toLowerCase()) || a.email.toLowerCase().includes(search.toLowerCase()))
    );
  });

  const counts = {
    all: APPLICANTS.length,
    applied: Object.values(statuses).filter((s) => s === "applied").length,
    under_review: Object.values(statuses).filter((s) => s === "under_review").length,
    shortlisted: Object.values(statuses).filter((s) => s === "shortlisted").length,
    rejected: Object.values(statuses).filter((s) => s === "rejected").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-heading font-bold text-3xl text-brand-neutrals-100">All Applications</h1>
        <p className="font-ui text-sm text-brand-neutrals-60 mt-1">
          Review, shortlist, or reject candidates across all your job listings.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {(["all", "under_review", "shortlisted", "rejected"] as const).map((k) => {
          const labels: Record<string, string> = { all: "Total", under_review: "Under Review", shortlisted: "Shortlisted", rejected: "Rejected" };
          const colors: Record<string, string> = { all: "text-brand-primary", under_review: "text-brand-yellow", shortlisted: "text-brand-green", rejected: "text-brand-red" };
          return (
            <button
              key={k}
              onClick={() => setStatusFilter(k)}
              className={`bg-white border p-4 text-left transition-colors hover:border-brand-primary ${statusFilter === k ? "border-brand-primary" : "border-brand-neutrals-20"}`}
            >
              <p className={`font-heading font-bold text-2xl ${colors[k]}`}>{counts[k]}</p>
              <p className="font-ui text-xs text-brand-neutrals-60 mt-0.5">{labels[k]}</p>
            </button>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-brand-neutrals-40" />
          <input
            placeholder="Search by name or email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 pl-10 pr-4 border border-brand-neutrals-20 bg-white font-ui text-sm outline-none focus:border-brand-primary transition-colors"
          />
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <select value={jobFilter} onChange={(e) => setJobFilter(e.target.value)}
              className="appearance-none h-10 pl-3 pr-8 border border-brand-neutrals-20 bg-white font-ui text-sm text-brand-neutrals-80 outline-none focus:border-brand-primary">
              {JOBS_FILTER.map((j) => <option key={j}>{j}</option>)}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 size-3.5 text-brand-neutrals-40 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-brand-neutrals-20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-brand-neutrals-20 bg-brand-light-gray">
                <th className="text-left px-6 py-3 font-ui text-xs font-semibold text-brand-neutrals-60 uppercase tracking-wider">Candidate</th>
                <th className="text-left px-4 py-3 font-ui text-xs font-semibold text-brand-neutrals-60 uppercase tracking-wider">Applied For</th>
                <th className="text-left px-4 py-3 font-ui text-xs font-semibold text-brand-neutrals-60 uppercase tracking-wider">Experience</th>
                <th className="text-left px-4 py-3 font-ui text-xs font-semibold text-brand-neutrals-60 uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 font-ui text-xs font-semibold text-brand-neutrals-60 uppercase tracking-wider">Update Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-neutrals-20">
              {filtered.map((a) => {
                const currentStatus = statuses[a.id];
                const s = STATUS_CFG[currentStatus];
                return (
                  <tr key={a.id} className="hover:bg-brand-light-gray transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-9 bg-brand-primary grid place-items-center font-ui text-xs font-bold text-white shrink-0">
                          {a.avatar}
                        </div>
                        <div>
                          <p className="font-ui text-sm font-semibold text-brand-neutrals-100">{a.name}</p>
                          <p className="font-ui text-xs text-brand-neutrals-60">{a.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <p className="font-ui text-sm text-brand-neutrals-80 font-medium">{a.jobTitle}</p>
                      <p className="font-ui text-xs text-brand-neutrals-40">{a.appliedAt}</p>
                    </td>
                    <td className="px-4 py-4">
                      <p className="font-ui text-sm text-brand-neutrals-80">{a.yearsExp}</p>
                      <p className="font-ui text-xs text-brand-neutrals-40">{a.currentRole}</p>
                    </td>
                    <td className="px-4 py-4">
                      <Badge variant={s.variant}>{s.label}</Badge>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex gap-1.5">
                        {currentStatus !== "shortlisted" && (
                          <button
                            onClick={() => updateStatus(a.id, "shortlisted")}
                            className="flex items-center gap-1 font-ui text-xs font-medium text-brand-green border border-brand-green/30 px-2 py-1 hover:bg-brand-green hover:text-white transition-colors"
                          >
                            <CheckCircle2 className="size-3" /> Shortlist
                          </button>
                        )}
                        {currentStatus !== "rejected" && (
                          <button
                            onClick={() => updateStatus(a.id, "rejected")}
                            className="flex items-center gap-1 font-ui text-xs font-medium text-brand-red border border-brand-red/30 px-2 py-1 hover:bg-brand-red hover:text-white transition-colors"
                          >
                            <XCircle className="size-3" /> Reject
                          </button>
                        )}
                        {(currentStatus === "shortlisted" || currentStatus === "rejected") && (
                          <button
                            onClick={() => updateStatus(a.id, "under_review")}
                            className="flex items-center gap-1 font-ui text-xs font-medium text-brand-yellow border border-brand-yellow/30 px-2 py-1 hover:bg-brand-yellow hover:text-white transition-colors"
                          >
                            <Clock className="size-3" /> Review
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <button
                        onClick={() => setSelected(a)}
                        className="flex items-center gap-1.5 font-ui text-xs font-medium text-brand-primary border border-brand-primary/30 px-2.5 py-1.5 hover:bg-brand-primary hover:text-white transition-colors"
                      >
                        <Eye className="size-3.5" /> View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <p className="font-heading font-bold text-brand-neutrals-60">No applications match your filters</p>
          </div>
        )}
      </div>

      {/* ── Candidate Detail Drawer ── */}
      {selected && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setSelected(null)} />
          <aside className="fixed right-0 top-0 h-full w-full max-w-lg bg-white z-50 shadow-2xl flex flex-col overflow-hidden">
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-brand-neutrals-20 bg-brand-light-gray shrink-0">
              <div className="flex items-center gap-3">
                <div className="size-10 bg-brand-primary grid place-items-center font-ui font-bold text-sm text-white">
                  {selected.avatar}
                </div>
                <div>
                  <p className="font-heading font-bold text-base text-brand-neutrals-100">{selected.name}</p>
                  <p className="font-ui text-xs text-brand-neutrals-60">{selected.jobTitle}</p>
                </div>
              </div>
              <button onClick={() => setSelected(null)} className="size-8 grid place-items-center border border-brand-neutrals-20 hover:border-brand-red hover:text-brand-red transition-colors">
                <X className="size-4" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {/* Status + Actions */}
              <div className="flex items-center gap-3 flex-wrap">
                <Badge variant={STATUS_CFG[statuses[selected.id]].variant}>{STATUS_CFG[statuses[selected.id]].label}</Badge>
                <button onClick={() => updateStatus(selected.id, "shortlisted")}
                  className="flex items-center gap-1.5 font-ui text-xs font-semibold text-brand-green border border-brand-green/40 px-3 py-1.5 hover:bg-brand-green hover:text-white transition-colors">
                  <CheckCircle2 className="size-3.5" /> Shortlist
                </button>
                <button onClick={() => updateStatus(selected.id, "rejected")}
                  className="flex items-center gap-1.5 font-ui text-xs font-semibold text-brand-red border border-brand-red/40 px-3 py-1.5 hover:bg-brand-red hover:text-white transition-colors">
                  <XCircle className="size-3.5" /> Reject
                </button>
              </div>

              {/* Contact */}
              <DrawerSection title="Contact Information">
                <InfoRow icon={Mail} label="Email" value={selected.email} />
                <InfoRow icon={Phone} label="Phone" value={selected.phone} />
                <InfoRow icon={Linkedin} label="LinkedIn" value={selected.linkedin} />
                <InfoRow icon={ExternalLink} label="Portfolio" value={selected.portfolio} />
              </DrawerSection>

              {/* Experience */}
              <DrawerSection title="Professional Background">
                <InfoRow icon={FileText} label="Experience" value={selected.yearsExp} />
                <InfoRow icon={FileText} label="Current Role" value={`${selected.currentRole} @ ${selected.currentCompany}`} />
                <InfoRow icon={Clock} label="Notice Period" value={selected.noticePeriod} />
                <InfoRow icon={FileText} label="Salary Expectation" value={selected.salaryExpectation} />
              </DrawerSection>

              {/* Cover Note */}
              <DrawerSection title="Cover Note">
                <p className="font-ui text-sm text-brand-neutrals-80 leading-relaxed">{selected.coverNote}</p>
              </DrawerSection>

              {/* Screening Q&A */}
              <DrawerSection title="Screening Answers">
                <div className="space-y-4">
                  {[
                    { q: "Describe a complex design challenge you led from discovery to launch.", a: selected.q1 },
                    { q: "How do you approach working with design systems?", a: selected.q2 },
                    { q: "Why this company?", a: selected.q3 },
                  ].map(({ q, a }, i) => (
                    <div key={i}>
                      <p className="font-ui text-xs font-semibold text-brand-neutrals-60 mb-1">Q{i + 1}: {q}</p>
                      <p className="font-ui text-sm text-brand-neutrals-80 leading-relaxed border-l-2 border-brand-primary/30 pl-3">{a}</p>
                    </div>
                  ))}
                </div>
              </DrawerSection>

              {/* Resume */}
              <div className="border border-brand-neutrals-20 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="size-5 text-brand-primary" />
                  <div>
                    <p className="font-ui text-sm font-semibold text-brand-neutrals-100">Resume / CV</p>
                    <p className="font-ui text-xs text-brand-neutrals-60">PDF · Submitted {selected.appliedAt}</p>
                  </div>
                </div>
                <a href={selected.resumeLink} className="font-ui text-sm text-brand-primary hover:underline flex items-center gap-1">
                  <ExternalLink className="size-3.5" /> Download
                </a>
              </div>
            </div>
          </aside>
        </>
      )}
    </div>
  );
}

function DrawerSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-ui text-xs font-semibold text-brand-neutrals-60 uppercase tracking-wider mb-3">{title}</p>
      <div className="space-y-2.5">{children}</div>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <Icon className="size-4 text-brand-neutrals-40 shrink-0" />
      <div className="flex-1 min-w-0 flex items-center justify-between gap-2">
        <span className="font-ui text-xs text-brand-neutrals-40 shrink-0">{label}</span>
        <span className="font-ui text-sm text-brand-neutrals-80 font-medium truncate text-right">{value}</span>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

const CATEGORIES = ["engineering", "design", "marketing", "sales", "finance", "hr", "operations", "product", "customer_support", "other"];
const CATEGORY_LABELS: Record<string, string> = {
  engineering: "Engineering", design: "Design", marketing: "Marketing",
  sales: "Sales", finance: "Finance", hr: "HR", operations: "Operations",
  product: "Product", customer_support: "Customer Support", other: "Other",
};

export default function CreateJobPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    title: "", company: "", location: "", category: "",
    type: "Full Time", salary_min: "", salary_max: "",
    description: "", requirements: "", benefits: "",
  });

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="bg-white border border-brand-neutrals-20 p-10 text-center max-w-md w-full">
          <div className="size-16 bg-brand-green/15 grid place-items-center mx-auto mb-5">
            <CheckCircle2 className="size-8 text-brand-green" />
          </div>
          <h2 className="font-heading font-bold text-2xl text-brand-neutrals-100 mb-2">Job Published!</h2>
          <p className="font-ui text-sm text-brand-neutrals-60 mb-6 leading-relaxed">
            <strong>{form.title}</strong> has been posted successfully and is now live.
          </p>
          <div className="flex flex-col gap-3">
            <Link href="/dashboard/jobs"><Button className="w-full">Manage Jobs</Button></Link>
            <Button variant="outline" className="w-full" onClick={() => { setSubmitted(false); setForm({ title:"",company:"",location:"",category:"",type:"Full Time",salary_min:"",salary_max:"",description:"",requirements:"",benefits:"" }); }}>
              Post Another
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-6">
      {/* Header */}
      <div>
        <Link href="/dashboard/jobs" className="inline-flex items-center gap-2 font-ui text-sm text-brand-neutrals-60 hover:text-brand-primary transition-colors mb-3">
          <ArrowLeft className="size-4" /> Back to Jobs
        </Link>
        <h1 className="font-heading font-bold text-3xl text-brand-neutrals-100">Post a New Job</h1>
        <p className="font-ui text-sm text-brand-neutrals-60 mt-1">Fill in the details below. Fields marked * are required.</p>
      </div>

      {/* ── Section 1: Basic Info ── */}
      <Section title="Basic Information" subtitle="Core details about the position.">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Job Title *" placeholder="e.g. Senior Product Designer" value={form.title} onChange={(v) => set("title", v)} />
          <Field label="Company *" placeholder="e.g. Stripe" value={form.company} onChange={(v) => set("company", v)} />
          <Field label="Location *" placeholder="e.g. Remote · US or New York, NY" value={form.location} onChange={(v) => set("location", v)} />
          <div>
            <label className="font-ui text-sm font-semibold text-brand-neutrals-80 block mb-1.5">Category *</label>
            <select
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
              className="w-full h-10 border border-brand-neutrals-20 px-3 font-ui text-sm text-brand-neutrals-80 bg-white outline-none focus:border-brand-primary transition-colors"
            >
              <option value="">Select category…</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>)}
            </select>
          </div>
        </div>
      </Section>

      

      {/* ── Section 3: Description ── */}
      <Section title="Job Description" subtitle="Describe the role, responsibilities, and requirements.">
        <div className="space-y-4">
          <div>
            <label className="font-ui text-sm font-semibold text-brand-neutrals-80 block mb-1.5">
              Description *
              <span className="font-normal text-brand-neutrals-40 ml-2">Tell candidates what this role is about.</span>
            </label>
            <textarea
              rows={6}
              placeholder="Describe the role, team, and what makes this opportunity exciting…"
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              className="w-full border border-brand-neutrals-20 px-3 py-2.5 font-ui text-sm text-brand-neutrals-80 outline-none focus:border-brand-primary transition-colors resize-none"
            />
          </div> 
        </div>
      </Section>

      {/* ── Preview strip ── */}
      {form.title && (
        <div className="bg-brand-primary/5 border border-brand-primary/20 p-4 flex items-center gap-3">
          <div className="size-10 bg-brand-primary/15 grid place-items-center font-heading font-bold text-brand-primary">
            {form.title.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-heading font-semibold text-brand-neutrals-100 text-sm">{form.title}</p>
            <p className="font-ui text-xs text-brand-neutrals-60">
              {[form.company, form.location, form.salary_min && form.salary_max && `$${Number(form.salary_min)/1000}k–$${Number(form.salary_max)/1000}k`].filter(Boolean).join(" · ")}
            </p>
          </div>
          <span className="ml-auto font-ui text-xs text-brand-primary font-medium border border-brand-primary/30 px-2 py-1">Preview</span>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <Button
          className="px-8"
          onClick={() => {
            if (form.title && form.company && form.location && form.category && form.description) {
              setSubmitted(true);
            }
          }}
        >
          Publish Job
        </Button>
        <Button variant="outline">Save as Draft</Button>
        <Link href="/dashboard/jobs">
          <Button variant="ghost" className="text-brand-neutrals-60">Cancel</Button>
        </Link>
      </div>
    </div>
  );
}

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-brand-neutrals-20 p-6">
      <div className="mb-5 pb-4 border-b border-brand-neutrals-20">
        <h2 className="font-heading font-bold text-lg text-brand-neutrals-100">{title}</h2>
        {subtitle && <p className="font-ui text-sm text-brand-neutrals-60 mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

function Field({ label, placeholder, value, onChange, type = "text" }: {
  label: string; placeholder: string; value: string;
  onChange: (v: string) => void; type?: string;
}) {
  return (
    <div>
      <label className="font-ui text-sm font-semibold text-brand-neutrals-80 block mb-1.5">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-10 border border-brand-neutrals-20 px-3 font-ui text-sm text-brand-neutrals-80 outline-none focus:border-brand-primary transition-colors bg-white"
      />
    </div>
  );
}

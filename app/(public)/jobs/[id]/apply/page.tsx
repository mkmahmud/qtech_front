"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Upload, CheckCircle2, MapPin, DollarSign } from "lucide-react";
import { Input } from "@/components/ui/input";

const JOB = {
  id: "1",
  title: "Senior Product Designer",
  company: "Stripe",
  location: "Remote · US",
  salary: "$120k–$160k",
  type: "Full Time",
  logo: "S",
  logoColor: "bg-brand-primary/15 text-brand-primary",
};


export default function ApplyPage({ params }: { params: { id: string } }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    portfolio: "",
    resume: null as File | null,
    resumeName: ""
  });

  const set = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = () => {
    setSubmitted(true);
    console.log("Form submitted:", form);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-brand-light-gray flex items-center justify-center px-6">
        <div className="bg-white border border-brand-neutrals-20 p-10 text-center max-w-md w-full">
          <div className="size-16 bg-brand-green/15 grid place-items-center mx-auto mb-5">
            <CheckCircle2 className="size-8 text-brand-green" />
          </div>
          <h2 className="font-heading font-bold text-2xl text-brand-neutrals-100 mb-2">Application Sent!</h2>
          <p className="font-ui text-sm text-brand-neutrals-60 leading-relaxed mb-6">
            Your application for <strong>{JOB.title}</strong> at <strong>{JOB.company}</strong> has been received. We'll be in touch within 5–7 business days.
          </p>
          <div className="flex flex-col gap-3">
            <Link href="/jobs">
              <Button className="w-full">Browse More Jobs</Button>
            </Link>
            <Link href={`/jobs/${JOB.id}`}>
              <Button variant="outline" className="w-full">Back to Job</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-light-gray">


      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Back */}
        <Link href={`/jobs/${JOB.id}`} className="inline-flex items-center gap-2 font-ui text-sm text-brand-neutrals-60 hover:text-brand-primary transition-colors mb-6">
          <ArrowLeft className="size-4" /> Back to job
        </Link>

        {/* Job Mini Card */}
        <div className="bg-white border border-brand-neutrals-20 p-5 mb-6 flex gap-4 items-center">
          <div className={`size-12 shrink-0 grid place-items-center font-heading font-bold text-xl ${JOB.logoColor}`}>
            {JOB.logo}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-heading font-bold text-lg text-brand-neutrals-100 leading-tight">{JOB.title}</h2>
            <div className="flex flex-wrap gap-3 mt-1 font-ui text-sm text-brand-neutrals-60">
              <span>{JOB.company}</span>
              <span className="flex items-center gap-1"><MapPin className="size-3.5" />{JOB.location}</span>
              <span className="flex items-center gap-1"><DollarSign className="size-3.5" />{JOB.salary}</span>
            </div>
          </div>
          <Badge variant="green" className="shrink-0 hidden sm:inline-flex">{JOB.type}</Badge>
        </div>

        {/* Stepper */}

        {/* Step Content */}
        <div className="bg-white border border-brand-neutrals-20 p-8">
          <h2 className="font-heading font-bold text-xl text-brand-neutrals-100 mb-1">Personal Info</h2>
          <p className="font-ui text-sm text-brand-neutrals-60 mb-6">
            Tell us a bit about yourself.

          </p>

          {/* ── Step 0: Personal Info ── */}
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <Field label="Full Name *" placeholder="Jane Smith" value={form.name} onChange={(v) => set("name", v)} />
              <Field label="Email Address *" type="email" placeholder="jane@example.com" value={form.email} onChange={(v) => set("email", v)} />
              <Field label="Phone Number" placeholder="+1 (555) 000-0000" value={form.phone} onChange={(v) => set("phone", v)} />
              <Field label="LinkedIn Profile" placeholder="linkedin.com/in/jane" value={form.linkedin} onChange={(v) => set("linkedin", v)} />
            </div>
            <Field label="Portfolio / Website" placeholder="janesmithdesign.com" value={form.portfolio} onChange={(v) => set("portfolio", v)} />

            {/* Resume Upload */}
            <div>
              <label className="font-ui text-sm font-semibold text-brand-neutrals-80 block mb-1.5">Resume / CV *</label>
              <label className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-brand-neutrals-20 hover:border-brand-primary transition-colors cursor-pointer py-8 px-4 text-center group">
                <Upload className="size-6 text-brand-neutrals-40 group-hover:text-brand-primary transition-colors" />
                <div>
                  <p className="font-ui text-sm font-medium text-brand-neutrals-80">
                    {form.resumeName || "Click to upload or drag & drop"}
                  </p>
                  <p className="font-ui text-xs text-brand-neutrals-40 mt-0.5">PDF, DOC, DOCX up to 10MB</p>
                </div>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="sr-only"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) setForm((prev) => ({ ...prev, resume: f, resumeName: f.name }));
                  }}
                />
              </label>
            </div>
          </div>



          {/* Navigation Buttons */}
          <div className="flex items-center justify-center mt-8 pt-6 border-t border-brand-neutrals-20">
            <Button onClick={handleSubmit} className="px-8">
              Submit Application
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Helpers ──

function Field({
  label, placeholder, value, onChange, type = "text",
}: {
  label: string; placeholder: string; value: string; onChange: (v: string) => void; type?: string;
}) {
  return (
    <div>
      <label className="font-ui text-sm font-semibold text-brand-neutrals-80 block mb-1.5">{label}</label>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-10 border-b border-brand-neutrals-20 "
      />
    </div>
  );
}

"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Upload, CheckCircle2, MapPin, Loader2, FileText, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuth } from "@/lib/hooks/use-auth";
import { jobsApi } from "@/lib/api/features/jobs";
import { applicationApi } from "@/lib/api/features/application";
import { useUploadThing } from "@/lib/uploadthing";

export default function ApplyPage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  const resolvedParams = params instanceof Promise ? use(params) : params;
  const jobId = parseInt(resolvedParams.id);
  const { user } = useAuth();

  const [submitted, setSubmitted] = useState(false);

  //   UploadThing Hook
  const { startUpload, isUploading } = useUploadThing("resumeUploader", {
    onClientUploadComplete: (res) => {
      setForm(prev => ({
        ...prev,
        resume_link: res[0].url,
        resumeName: res[0].name
      }));
      toast.success("Resume uploaded successfully");
    },
    onUploadError: (error: Error) => {
      toast.error(`Upload failed: ${error.message}`);
    },
  });

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    portfolio: "",
    resume_link: "",
    resumeName: ""
  });

  useEffect(() => {
    if (user) {
      setForm(f => ({ ...f, name: user.name || "", email: user.email || "" }));
    }
  }, [user]);

  const { data: jobResponse } = useQuery({
    queryKey: ["job", jobId],
    queryFn: () => jobsApi.getById(jobId),
    enabled: !isNaN(jobId),
  });
  const JOB = jobResponse?.data;

  const applyMutation = useMutation({
    mutationFn: (data: any) => applicationApi.apply(data),
    onSuccess: () => {
      setSubmitted(true);
      toast.success("Application submitted successfully!");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to submit application");
    }
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Please upload a PDF file only");
      return;
    }

    await startUpload([file]);
  };

  const handleSubmit = () => {
    if (!form.resume_link) {
      toast.error("Please upload your resume first");
      return;
    }
    applyMutation.mutate({
      job_id: jobId,
      name: form.name,
      email: form.email,
      resume_link: form.resume_link,
      cover_note: `Application from ${form.name}. Portfolio: ${form.portfolio}`,
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-brand-light-gray flex items-center justify-center px-6">
        <div className="bg-white border border-brand-neutrals-20 p-10 text-center max-w-md w-full">
          <div className="size-16 bg-brand-green/15 grid place-items-center mx-auto mb-5">
            <CheckCircle2 className="size-8 text-brand-green" />
          </div>
          <h2 className="font-heading font-bold text-2xl text-brand-neutrals-100 mb-2">Application Sent!</h2>
          <p className="font-ui text-sm text-brand-neutrals-60 mb-6">
            Your application for <strong>{JOB?.title}</strong> has been received.
          </p>
          <Link href="/jobs">
            <Button className="w-full">Browse More Jobs</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-light-gray">
      <div className="max-w-3xl mx-auto px-6 py-8">
        <Link href={`/jobs/${jobId}`} className="inline-flex items-center gap-2 font-ui text-sm text-brand-neutrals-60 hover:text-brand-primary mb-6 transition-colors">
          <ArrowLeft className="size-4" /> Back to job
        </Link>

        {JOB && (
          <div className="bg-white border border-brand-neutrals-20 p-5 mb-6 flex gap-4 items-center">
            <div className="size-12 shrink-0 grid place-items-center font-heading font-bold text-xl bg-brand-primary/10 text-brand-primary">
              {JOB.company.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-heading font-bold text-lg text-brand-neutrals-100 leading-tight">{JOB.title}</h2>
              <div className="flex flex-wrap gap-3 mt-1 font-ui text-sm text-brand-neutrals-60">
                <span>{JOB.company}</span>
                <span className="flex items-center gap-1"><MapPin className="size-3.5" />{JOB.location}</span>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white border border-brand-neutrals-20 p-8">
          <h2 className="font-heading font-bold text-xl text-brand-neutrals-100 mb-6">Personal Info</h2>

          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Full Name" value={form.name} onChange={() => { }} disabled />
              <Field label="Email Address" value={form.email} onChange={() => { }} disabled />
              <Field label="Phone Number" placeholder="+1..." value={form.phone} onChange={(v: string) => setForm(f => ({ ...f, phone: v }))} />
              <Field label="LinkedIn Profile" placeholder="linkedin.com/in/..." value={form.linkedin} onChange={(v: string) => setForm(f => ({ ...f, linkedin: v }))} />
            </div>
            <Field label="Portfolio / Website" placeholder="yoursite.com" value={form.portfolio} onChange={(v: string) => setForm(f => ({ ...f, portfolio: v }))} />

            <div>
              <label className="font-ui text-sm font-semibold text-brand-neutrals-80 block mb-1.5">Resume / CV (PDF only) *</label>
              {!form.resume_link ? (
                <label className={`flex flex-col items-center justify-center gap-3 border-2 border-dashed border-brand-neutrals-20 transition-colors py-10 px-4 text-center ${isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:border-brand-primary cursor-pointer'}`}>
                  {isUploading ? (
                    <Loader2 className="size-8 text-brand-primary !animate-spin" />
                  ) : (
                    <Upload className="size-8 text-brand-neutrals-40" />
                  )}
                  <div>
                    <p className="font-ui text-sm font-medium text-brand-neutrals-80">
                      {isUploading ? "Uploading to secure server..." : "Upload your resume"}
                    </p>
                    <p className="font-ui text-xs text-brand-neutrals-40 mt-1">Only PDF files accepted</p>
                  </div>
                  <input type="file" accept="application/pdf" className="sr-only" onChange={handleFileUpload} disabled={isUploading} />
                </label>
              ) : (
                <div className="flex items-center justify-between bg-brand-primary/5 border border-brand-primary/20 p-4 rounded-sm">
                  <div className="flex items-center gap-3">
                    <FileText className="size-6 text-brand-primary" />
                    <div>
                      <p className="font-ui text-sm font-bold text-brand-neutrals-100">{form.resumeName}</p>
                      <p className="font-ui text-[10px] text-brand-primary uppercase font-bold tracking-widest">Ready to submit</p>
                    </div>
                  </div>
                  <button onClick={() => setForm(f => ({ ...f, resume_link: "", resumeName: "" }))} className="p-1 hover:bg-brand-red/10 rounded-full transition-colors">
                    <X className="size-4 text-brand-red" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-center mt-8 pt-6 border-t border-brand-neutrals-20">
            <Button
              onClick={handleSubmit}
              className=" h-12 text-base font-bold"
              disabled={applyMutation.isPending || isUploading || !form.resume_link}
            >
              {applyMutation.isPending ? <><Loader2 className="mr-2 animate-spin" /> Submitting...</> : "Submit Application"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder = "", disabled = false }: any) {
  return (
    <div>
      <label className="font-ui text-xs font-bold text-brand-neutrals-40 uppercase tracking-wider block mb-1.5">{label}</label>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`w-full h-11 border-brand-neutrals-20 font-ui transition-all ${disabled ? "bg-brand-light-gray text-brand-neutrals-40 cursor-not-allowed border-none" : "focus:border-brand-primary"}`}
      />
    </div>
  );
}
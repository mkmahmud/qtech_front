"use client";

import { use } from "react"; // Add this
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MapPin, Clock, Briefcase, DollarSign, Users, ArrowLeft,
  Share2, Bookmark, Loader2
} from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import { jobsApi } from "@/lib/api/features/jobs";

export default function JobDetailPage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  // 1. Unwrap the params safely
  const resolvedParams = params instanceof Promise ? use(params) : params;
  const jobId = parseInt(resolvedParams.id);

  // 2. Fetch Job Data with a safety check on the ID
  const { data: response, isLoading, isError } = useQuery({
    queryKey: ["job", jobId],
    queryFn: () => jobsApi.getById(jobId),
    enabled: !isNaN(jobId), // Only run the query if jobId is a valid number
  });

  const job = response?.data;

  // 3. Handle Invalid ID or Loading
  if (isNaN(jobId)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-brand-red font-ui">Invalid Job ID provided.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 bg-brand-light-gray">
        <Loader2 className="size-10 animate-spin text-brand-primary" />
        <p className="font-ui text-brand-neutrals-60">Loading job details...</p>
      </div>
    );
  }

  if (isError || !job) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h2 className="font-heading font-bold text-2xl text-brand-neutrals-100">Job not found</h2>
        <Link href="/jobs" className="text-brand-primary underline font-ui">Return to job board</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-light-gray">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Link href="/jobs" className="inline-flex items-center gap-2 font-ui text-sm text-brand-neutrals-60 hover:text-brand-primary mb-6 transition-colors">
          <ArrowLeft className="size-4" /> Back to jobs
        </Link>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="flex-1 min-w-0 w-full">
            <div className="bg-white border border-brand-neutrals-20 p-8 mb-6">
              <div className="flex gap-5 items-start">
                <div className="size-16 shrink-0 grid place-items-center font-heading font-bold text-2xl bg-brand-primary/10 text-brand-primary">
                  {job.company.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between flex-wrap gap-3">
                    <div>
                      <h1 className="font-heading font-bold text-2xl text-brand-neutrals-100 leading-tight">{job.title}</h1>
                      <p className="font-ui text-brand-neutrals-80 mt-1">{job.company}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="size-9 border border-brand-neutrals-20 grid place-items-center hover:border-brand-primary transition-colors"><Bookmark className="size-4" /></button>
                      <button className="size-9 border border-brand-neutrals-20 grid place-items-center hover:border-brand-primary transition-colors"><Share2 className="size-4" /></button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 mt-4 text-sm font-ui text-brand-neutrals-60">
                    <span className="flex items-center gap-1.5"><MapPin className="size-4" />{job.location}</span>
                    <span className="flex items-center gap-1.5"><Clock className="size-4" />{formatDistanceToNow(new Date(job.created_at), { addSuffix: true })}</span>
                  </div>

                  <div className="flex gap-2 flex-wrap mt-4">
                    <Badge variant="green">Full Time</Badge>
                    <Badge variant="default" className="capitalize">{job.category}</Badge>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-6 pt-6 border-t border-brand-neutrals-20">
                <Link href={`/jobs/${job.id}/apply`}>
                  <Button className="px-8 py-2.5 text-base">Apply Now</Button>
                </Link>
              </div>
            </div>

            <div className="bg-white border border-brand-neutrals-20 p-8">
              <h2 className="font-heading font-bold text-xl text-brand-neutrals-100 mb-4">Job Description</h2>
              <div
                className="prose prose-sm max-w-none font-ui text-brand-neutrals-80 leading-relaxed"
                // @ts-ignore
                dangerouslySetInnerHTML={{ __html: job.description_html || job.description }}
              />
            </div>
          </div>

          <aside className="w-full lg:w-72 shrink-0">
            <div className="bg-white border border-brand-neutrals-20 p-5 sticky top-24">
              <h3 className="font-heading font-bold text-base text-brand-neutrals-100 mb-4">Quick Overview</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Briefcase className="size-4 text-brand-neutrals-40" />
                  <p className="font-ui text-sm text-brand-neutrals-80 capitalize">{job.category}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="size-4 text-brand-neutrals-40" />
                  <p className="font-ui text-sm text-brand-neutrals-80">{job.applications_count} Applied</p>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="size-4 text-brand-neutrals-40" />
                  <p className="font-ui text-sm text-brand-neutrals-80">{format(new Date(job.created_at), "MMM d, yyyy")}</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
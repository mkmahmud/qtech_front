"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Search, SlidersHorizontal, Loader2 } from "lucide-react";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import JobpageCard from "@/components/cards/jobs/jobpageCard";
import { PaginationControls } from "@/components/pagination/pagination-controls";
import { formatDistanceToNow } from "date-fns";
import { jobsApi } from "@/lib/api/features/jobs";
import { useSearchParams } from "next/navigation";

// Assuming you have a central API helper

const CATEGORIES = ["All", "Engineering", "Design", "Marketing", "Sales", "Finance", "Operations", "Customer Support"];

export default function JobsPage() {
  const searchParams = useSearchParams();

  const searchTerm = searchParams.get("search");
  const locationTerm = searchParams.get("location");

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(searchTerm || "");
  const [location, setLocation] = useState(locationTerm || "");
  const [selectedCategory, setSelectedCategory] = useState("All");




  //   Fetch Data using React Query
  const { data: response, isLoading, isPlaceholderData } = useQuery({
    queryKey: ["jobs", page, search, location, selectedCategory],
    queryFn: () => {
      const params: any = { page, search, location };
      if (selectedCategory !== "All") {
        params.category = selectedCategory.toLowerCase();
      }
      return jobsApi.getAll(params);
    },
  });

  const jobs = response?.data || [];
  // @ts-ignore
  const pagination = response?.pagination;

  return (
    <div className="min-h-screen bg-brand-light-gray">
      {/* Hero Search Bar */}
      <section className="bg-white border-b border-brand-neutrals-20 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="font-heading text-4xl font-bold text-brand-neutrals-100 mb-2">
            Find your next <span className="text-brand-primary">opportunity</span>
          </h1>
          <p className="text-brand-neutrals-60 font-ui mb-6">
            {pagination?.total || 0} jobs available across categories
          </p>

          <div className="flex gap-3 flex-col sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-brand-neutrals-40" />
              <Input
                placeholder="Job title, keyword, or company"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-10 pl-10 pr-4 border-b border-brand-neutrals-20"
              />
            </div>
            <div className="relative w-full sm:w-56">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-brand-neutrals-40" />
              <Input
                placeholder="City, state, or remote"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full h-10 pl-10 pr-4 border-b border-brand-neutrals-20"
              />
            </div>
            <Button className="shrink-0">Search Jobs</Button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-8 flex gap-8">
        {/* Sidebar Filters */}
        <aside className="hidden lg:block w-60 shrink-0">
          <div className="bg-white border border-brand-neutrals-20 p-5 mb-4 sticky top-24">
            <div className="flex items-center gap-2 mb-4">
              <SlidersHorizontal className="size-4 text-brand-neutrals-60" />
              <span className="font-ui font-semibold text-sm text-brand-neutrals-100">Filters</span>
            </div>

            <div className="mb-5">
              <p className="font-ui text-sm font-semibold text-brand-neutrals-60 mb-3">Category</p>
              {CATEGORIES.filter((c) => c !== "All").map((c) => (
                <FieldGroup className="w-full mb-2" key={c}>
                  <Field orientation="horizontal" className="flex items-center gap-2">
                    <Checkbox
                      id={c}
                      checked={selectedCategory === c}
                      onCheckedChange={() => setSelectedCategory(c)}
                    />
                    <FieldLabel htmlFor={c} className="font-ui text-sm text-brand-neutrals-80 capitalize">
                      {c}
                    </FieldLabel>
                  </Field>
                </FieldGroup>
              ))}
            </div>
          </div>
        </aside>

        {/* Jobs List */}
        <main className="flex-1 min-w-0">
          <div className="flex gap-2 flex-wrap mb-6">
            {CATEGORIES.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "secondary"}
                onClick={() => setSelectedCategory(cat)}
                className="rounded-full"
              >
                {cat}
              </Button>
            ))}
          </div>

          <div className="flex items-center justify-between mb-4">
            <p className="font-ui text-sm text-brand-neutrals-60">
              Showing <span className="font-semibold text-brand-neutrals-100">{jobs.length}</span> results
            </p>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="animate-spin text-brand-primary size-10" />
              <p className="text-brand-neutrals-60 font-ui">Loading opportunities...</p>
            </div>
          ) : (
            <div className={`flex flex-col gap-3 transition-opacity ${isPlaceholderData ? 'opacity-50' : 'opacity-100'}`}>
              {jobs.map((job: any) => (
                <JobpageCard
                  key={job.id}
                  id={job.id.toString()}
                  title={job.title}
                  company={job.company}
                  location={job.location}
                  category={job.category}
                  description={job.description.replace(/<[^>]*>?/gm, '').substring(0, 160) + "..."}
                  posted={formatDistanceToNow(new Date(job.created_at), { addSuffix: true })}
                  applicants={job.applications_count}
                  logo={job.company.charAt(0).toUpperCase()}
                  logoColor="bg-brand-primary/15 text-brand-primary"
                  type="Full Time"
                  tags={[job.category, job.location]}
                />
              ))}

              {jobs.length === 0 && (
                <div className="text-center py-20 bg-white border border-dashed border-brand-neutrals-20">
                  <p className="text-brand-neutrals-60">No jobs found matching your criteria.</p>
                </div>
              )}
            </div>
          )}

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="mt-8">
              <PaginationControls
                page={pagination.page}
                pageSize={pagination.limit}
                totalItems={pagination.total}
                totalPages={pagination.totalPages}
                onPageChange={(newPage) => setPage(newPage)}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
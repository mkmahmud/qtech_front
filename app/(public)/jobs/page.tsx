"use client"
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Search, SlidersHorizontal, Briefcase, Clock } from "lucide-react";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import JobpageCard from "@/components/cards/jobs/jobpageCard";
import { PaginationControls } from "@/components/pagination/pagination-controls";

const JOBS = [
  {
    id: "1",
    title: "Senior Product Designer",
    company: "Stripe",
    location: "Remote · US",
    category: "Design",
    type: "Full Time",
    salary: "$120k–$160k",
    description: "Shape the future of financial infrastructure by designing world-class user experiences for millions of businesses worldwide.",
    tags: ["Figma", "Design Systems", "UX Research"],
    posted: "2 days ago",
    applicants: 48,
    logo: "S",
    logoColor: "bg-brand-primary/15 text-brand-primary",
  },
  {
    id: "6",
    title: "Customer Success Lead",
    company: "Intercom",
    location: "Dublin, Ireland",
    category: "Customer Support",
    type: "Full Time",
    salary: "$70k–$95k",
    description: "Be the voice of Intercom for enterprise customers. Drive adoption, retention, and expansion across key accounts.",
    tags: ["CRM", "Enterprise", "Onboarding"],
    posted: "1 week ago",
    applicants: 18,
    logo: "I",
    logoColor: "bg-brand-primary/15 text-brand-primary",
  },
];

const CATEGORIES = ["All", "Engineering", "Design", "Marketing", "Sales", "Finance", "Customer Support"];

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-brand-light-gray">


      {/* Hero Search Bar */}
      <section className="bg-white border-b border-brand-neutrals-20 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="font-heading text-4xl font-bold text-brand-neutrals-100 mb-2">
            Find your next <span className="text-brand-primary">opportunity</span>
          </h1>
          <p className="text-brand-neutrals-60 font-ui mb-6">
            {JOBS.length.toLocaleString()} jobs available across 120+ categories
          </p>

          {/* Search Row */}
          <div className="flex gap-3 flex-col sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-brand-neutrals-40" />
              <Input
                placeholder="Job title, keyword, or company"
                className="w-full h-10 pl-10 pr-4 border-b border-brand-neutrals-20 "
              />
            </div>
            <div className="relative w-full sm:w-56">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-brand-neutrals-40" />
              <Input
                placeholder="City, state, or remote"
                className="w-full h-10 pl-10 pr-4 border-b border-brand-neutrals-20 "
              />
            </div>
            <Button className="shrink-0  ">Search Jobs</Button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-8 flex gap-8">
        {/* Sidebar Filters */}
        <aside className="hidden lg:block w-60 shrink-0">
          <div className="bg-white border border-brand-neutrals-20 p-5 mb-4">
            <div className="flex items-center gap-2 mb-4">
              <SlidersHorizontal className="size-4 text-brand-neutrals-60" />
              <span className="font-ui font-semibold text-sm text-brand-neutrals-100">Filters</span>
            </div>

            <div className="mb-5">
              <p className="font-ui  text-sm font-semibold text-brand-neutrals-60     mb-3">Job Type</p>
              {["Full Time", "Part Time", "Contract", "Internship"].map((t) => (
                <FieldGroup className="mx-auto w-56" key={t}>
                  <Field orientation="horizontal">
                    <Checkbox id={`terms-checkbox-${t.toLowerCase().replace(/\s+/g, '-')}`} name={`terms-checkbox-${t.toLowerCase().replace(/\s+/g, '-')}`} />
                    <FieldLabel htmlFor={`terms-checkbox-${t.toLowerCase().replace(/\s+/g, '-')}`} className="font-ui text-base text-brand-neutrals-80">
                      {t}
                    </FieldLabel>
                  </Field>
                </FieldGroup>
              ))}
            </div>


            <div className="mb-5">
              <p className="font-ui text-sm font-semibold text-brand-neutrals-60   mb-3">Category</p>
              {CATEGORIES.filter((c) => c !== "All").map((c) => (
                <FieldGroup className="mx-auto w-56" key={c}>
                  <Field orientation="horizontal">
                    <Checkbox id={`terms-checkbox-${c.toLowerCase().replace(/\s+/g, '-')}`} name={`terms-checkbox-${c.toLowerCase().replace(/\s+/g, '-')}`} />
                    <FieldLabel htmlFor={`terms-checkbox-${c.toLowerCase().replace(/\s+/g, '-')}`} className="font-ui text-base text-brand-neutrals-80">
                      {c}
                    </FieldLabel>
                  </Field>
                </FieldGroup>
              ))}
            </div>

            <div>
              <p className="font-ui text-sm font-semibold text-brand-neutrals-60   mb-3">Salary Range</p>
              <Select>
                <SelectTrigger className="h-12 border-none outline-none text-sm text-gray-600 w-full">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="florence">Florence, Italy</SelectItem>
                  <SelectItem value="london">London, UK</SelectItem>
                  <SelectItem value="newyork">New York, USA</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </aside>

        {/* Jobs List */}
        <main className="flex-1 min-w-0">
          {/* Category Pills */}
          <div className="flex gap-2 flex-wrap mb-6">
            {CATEGORIES.map((cat) => (
              <Button
                key={cat}
                variant={"secondary"}
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* Sort + Count */}
          <div className="flex items-center justify-between mb-4">
            <p className="font-ui text-sm text-brand-neutrals-60">
              Showing <span className="font-semibold text-brand-neutrals-100">{JOBS.length}</span> jobs
            </p>
            <div>
              <Select>
                <SelectTrigger className="h-12 border-none outline-none text-sm text-gray-600  ">
                  <SelectValue placeholder="Lattest" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="florence">Florence, Italy</SelectItem>
                  <SelectItem value="london">London, UK</SelectItem>
                  <SelectItem value="newyork">New York, USA</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Job Cards */}
          <div className="flex flex-col gap-3">
            {JOBS.map((job) => (
              <JobpageCard key={job.id} {...job} />
            ))}
          </div>

          {/* Pagination */}


          <PaginationControls
            page={1}
            pageSize={10}
            totalItems={100}
            totalPages={10}
            onPageChange={(newPage) => console.log("Go to page:", newPage)}
          />
        </main>
      </div>
    </div>
  );
}

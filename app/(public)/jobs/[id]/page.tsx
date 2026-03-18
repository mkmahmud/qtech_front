import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MapPin, Clock, Briefcase, DollarSign, Users, ArrowLeft,
  Globe, Linkedin, Twitter, Share2, Bookmark, CheckCircle2
} from "lucide-react";

 const JOB = {
  id: "1",
  title: "Senior Product Designer",
  company: "Stripe",
  location: "Remote · US",
  category: "Design",
  type: "Full Time",
  salary: "$120k–$160k",
  posted: "2 days ago",
  applicants: 48,
  deadline: "June 30, 2025",
  logo: "S",
  logoColor: "bg-brand-primary/15 text-brand-primary",
  website: "stripe.com",
  companySize: "1,000–5,000",
  founded: "2010",
  about: "Stripe is a technology company that builds economic infrastructure for the internet. Businesses of every size—from new startups to public companies—use our software to accept payments and manage their businesses online.",
  description: `We're looking for a Senior Product Designer to shape the future of financial infrastructure. You'll work closely with PMs, engineers, and fellow designers to craft experiences that help millions of businesses grow and thrive.

This is a rare opportunity to work on products that are used by some of the world's most innovative companies—from early-stage startups to Fortune 500 enterprises.`,
  responsibilities: [
    "Lead end-to-end design of complex product features from discovery to launch",
    "Partner with product managers and engineers to define scope and requirements",
    "Conduct user research and usability testing to validate design decisions",
    "Establish and maintain design system components and documentation",
    "Mentor junior designers and contribute to design culture",
    "Communicate design rationale to executive stakeholders",
  ],
  requirements: [
    "5+ years of product design experience at a tech company",
    "Exceptional Figma and prototyping skills",
    "Strong portfolio demonstrating complex B2B or fintech product work",
    "Experience with design systems at scale",
    "Excellent written and verbal communication",
    "Ability to work independently and drive projects autonomously",
  ],
  niceToHave: [
    "Experience with developer tools or financial products",
    "Background in motion design or interaction design",
    "Familiarity with accessibility standards (WCAG 2.1)",
  ],
  benefits: [
    "Competitive salary + equity",
    "Remote-first culture",
    "Comprehensive health, dental & vision",
    "Unlimited PTO",
    "$2,000 home office stipend",
    "Annual learning & development budget",
  ],
  tags: ["Figma", "Design Systems", "UX Research", "Prototyping", "B2B"],
};

const RELATED = [
  { id: "5", title: "Brand Designer", company: "Linear", location: "Remote · Europe", type: "Contract", logo: "L", logoColor: "bg-brand-red/15 text-brand-red" },
  { id: "3", title: "Growth Marketing Manager", company: "Notion", location: "New York, NY", type: "Full Time", logo: "N", logoColor: "bg-brand-green/15 text-brand-green" },
];

export default function JobDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-brand-light-gray">
      

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Back */}
        <Link href="/jobs" className="inline-flex items-center gap-2 font-ui text-sm text-brand-neutrals-60 hover:text-brand-primary transition-colors mb-6">
          <ArrowLeft className="size-4" /> Back to jobs
        </Link>

        <div className="flex gap-8 items-start">
          {/* Main Content */}
          <div className="flex-1 min-w-0">

            {/* Job Hero Card */}
            <div className="bg-white border border-brand-neutrals-20 p-8 mb-6">
              <div className="flex gap-5 items-start">
                <div className={`size-16 shrink-0 grid place-items-center font-heading font-bold text-2xl ${JOB.logoColor}`}>
                  {JOB.logo}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between flex-wrap gap-3">
                    <div>
                      <h1 className="font-heading font-bold text-2xl text-brand-neutrals-100 leading-tight">
                        {JOB.title}
                      </h1>
                      <p className="font-ui text-brand-neutrals-80 mt-1">{JOB.company}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="size-9 border border-brand-neutrals-20 grid place-items-center hover:border-brand-primary hover:text-brand-primary transition-colors">
                        <Bookmark className="size-4" />
                      </button>
                      <button className="size-9 border border-brand-neutrals-20 grid place-items-center hover:border-brand-primary hover:text-brand-primary transition-colors">
                        <Share2 className="size-4" />
                      </button>
                    </div>
                  </div>

                  {/* Meta row */}
                  <div className="flex flex-wrap gap-4 mt-4 text-sm font-ui text-brand-neutrals-60">
                    <span className="flex items-center gap-1.5"><MapPin className="size-4 text-brand-neutrals-40" />{JOB.location}</span>
                    <span className="flex items-center gap-1.5"><DollarSign className="size-4 text-brand-neutrals-40" />{JOB.salary}/yr</span>
                    <span className="flex items-center gap-1.5"><Clock className="size-4 text-brand-neutrals-40" />Posted {JOB.posted}</span>
                    <span className="flex items-center gap-1.5"><Users className="size-4 text-brand-neutrals-40" />{JOB.applicants} applicants</span>
                  </div>

                  {/* Badges */}
                  <div className="flex gap-2 flex-wrap mt-4">
                    <Badge variant="green">{JOB.type}</Badge>
                    <Badge variant="default">{JOB.category}</Badge>
                   
                  </div>
                </div>
              </div>

              {/* Apply CTA */}
              <div className="flex items-center gap-4 mt-6 pt-6 border-t border-brand-neutrals-20">
                <Link href={`/jobs/${JOB.id}/apply`} className="flex-1 sm:flex-none">
                  <Button className="w-full sm:w-auto px-8 py-2.5 text-base">Apply Now</Button>
                </Link>
                <p className="font-ui text-sm text-brand-neutrals-60">
                  Deadline: <span className="text-brand-red font-medium">{JOB.deadline}</span>
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white border border-brand-neutrals-20 p-8 mb-6">
              <h2 className="font-heading font-bold text-xl text-brand-neutrals-100 mb-4">About the Role</h2>
              <div className="font-ui text-sm text-brand-neutrals-80 leading-relaxed whitespace-pre-line mb-6">
                {JOB.description}
              </div>

              <h3 className="font-heading font-bold text-lg text-brand-neutrals-100 mb-3">Responsibilities</h3>
              <ul className="space-y-2 mb-6">
                {JOB.responsibilities.map((r) => (
                  <li key={r} className="flex items-start gap-2.5 font-ui text-sm text-brand-neutrals-80">
                    <CheckCircle2 className="size-4 text-brand-green shrink-0 mt-0.5" />
                    {r}
                  </li>
                ))}
              </ul>

              <h3 className="font-heading font-bold text-lg text-brand-neutrals-100 mb-3">Requirements</h3>
              <ul className="space-y-2 mb-6">
                {JOB.requirements.map((r) => (
                  <li key={r} className="flex items-start gap-2.5 font-ui text-sm text-brand-neutrals-80">
                    <CheckCircle2 className="size-4 text-brand-primary shrink-0 mt-0.5" />
                    {r}
                  </li>
                ))}
              </ul>

              <h3 className="font-heading font-bold text-lg text-brand-neutrals-100 mb-3">Nice to Have</h3>
              <ul className="space-y-2 mb-6">
                {JOB.niceToHave.map((r) => (
                  <li key={r} className="flex items-start gap-2.5 font-ui text-sm text-brand-neutrals-60">
                    <CheckCircle2 className="size-4 text-brand-neutrals-40 shrink-0 mt-0.5" />
                    {r}
                  </li>
                ))}
              </ul>

              <h3 className="font-heading font-bold text-lg text-brand-neutrals-100 mb-3">Benefits & Perks</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {JOB.benefits.map((b) => (
                  <div key={b} className="flex items-center gap-2.5 bg-brand-light-gray px-3 py-2.5 font-ui text-sm text-brand-neutrals-80">
                    <CheckCircle2 className="size-4 text-brand-yellow shrink-0" />
                    {b}
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="bg-brand-primary p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-heading font-bold text-white text-lg">Interested in this role?</p>
                <p className="font-ui text-sm text-white/70 mt-0.5">Join {JOB.applicants} others who have already applied.</p>
              </div>
              <Link href={`/jobs/${JOB.id}/apply`}>
                <Button variant="secondary" className="px-8">Apply Now →</Button>
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block w-72 shrink-0 space-y-4">
            {/* Company Info */}
            <div className="bg-white border border-brand-neutrals-20 p-5">
              <h3 className="font-heading font-bold text-base text-brand-neutrals-100 mb-4">About {JOB.company}</h3>
              <p className="font-ui text-sm text-brand-neutrals-60 leading-relaxed mb-4">{JOB.about}</p>
              <div className="space-y-2.5">
                {[
                  { label: "Website", value: JOB.website, icon: Globe },
                  { label: "Company size", value: JOB.companySize + " employees", icon: Users },
                  { label: "Founded", value: JOB.founded, icon: Briefcase },
                  { label: "Industry", value: JOB.category, icon: Briefcase },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="flex items-center gap-2.5">
                    <Icon className="size-4 text-brand-neutrals-40 shrink-0" />
                    <div>
                      <p className="font-ui text-xs text-brand-neutrals-40">{label}</p>
                      <p className="font-ui text-sm text-brand-neutrals-80 font-medium">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-4 pt-4 border-t border-brand-neutrals-20">
                <button className="size-8 border border-brand-neutrals-20 grid place-items-center hover:border-brand-primary transition-colors">
                  <Globe className="size-3.5 text-brand-neutrals-60" />
                </button>
                <button className="size-8 border border-brand-neutrals-20 grid place-items-center hover:border-brand-primary transition-colors">
                  <Linkedin className="size-3.5 text-brand-neutrals-60" />
                </button>
                <button className="size-8 border border-brand-neutrals-20 grid place-items-center hover:border-brand-primary transition-colors">
                  <Twitter className="size-3.5 text-brand-neutrals-60" />
                </button>
              </div>
            </div>

            {/* Similar Jobs */}
            <div className="bg-white border border-brand-neutrals-20 p-5">
              <h3 className="font-heading font-bold text-base text-brand-neutrals-100 mb-4">Similar Jobs</h3>
              <div className="space-y-3">
                {RELATED.map((j) => (
                  <Link key={j.id} href={`/jobs/${j.id}`} className="flex gap-3 items-center group">
                    <div className={`size-10 shrink-0 grid place-items-center font-heading font-bold text-base ${j.logoColor}`}>
                      {j.logo}
                    </div>
                    <div>
                      <p className="font-ui text-sm font-semibold text-brand-neutrals-100 group-hover:text-brand-primary transition-colors leading-tight">
                        {j.title}
                      </p>
                      <p className="font-ui text-xs text-brand-neutrals-60">{j.company} · {j.type}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <Link href="/jobs" className="mt-4 pt-4 border-t border-brand-neutrals-20 flex font-ui text-sm text-brand-primary font-medium hover:underline">
                View all jobs →
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

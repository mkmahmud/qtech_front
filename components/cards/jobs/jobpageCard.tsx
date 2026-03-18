import { Badge } from '@/components/ui/badge'
import { Briefcase, Clock } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function JobpageCard(job: any) {
    return (
        <Link key={job.id} href={`/jobs/${job.id}`} className="group block">
            <article className="bg-white border border-brand-neutrals-20 p-5 hover:border-brand-primary hover:shadow-sm transition-all duration-200">
                <div className="flex gap-4 items-start">
                    {/* Logo */}
                    <div className={`size-12 shrink-0 grid place-items-center font-heading font-bold text-xl ${job.logoColor}`}>
                        {job.logo}
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 flex-wrap">
                            <div>
                                <h2 className="font-heading font-bold text-lg text-brand-neutrals-100 group-hover:text-brand-primary transition-colors">
                                    {job.title}
                                </h2>
                                <p className="font-ui text-sm text-brand-neutrals-80 mt-0.5">
                                    {job.company} · {job.location}
                                </p>
                            </div>
                            <div className="text-right shrink-0">
                                <p className="font-heading font-bold text-brand-neutrals-100">{job.salary}</p>
                                <p className="font-ui text-xs text-brand-neutrals-60 mt-0.5">/year</p>
                            </div>
                        </div>

                        <p className="font-ui text-sm text-brand-neutrals-60 mt-2 line-clamp-2 leading-relaxed">
                            {job.description}
                        </p>

                        <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
                            <div className="flex gap-2 flex-wrap">
                                <Badge variant={job.type === "Full Time" ? "green" : "yellow"}>{job.type}</Badge>

                            </div>
                            <div className="flex items-center gap-3 text-brand-neutrals-40">
                                <span className="flex items-center gap-1 font-ui text-xs">
                                    <Clock className="size-3" /> {job.posted}
                                </span>
                                <span className="flex items-center gap-1 font-ui text-xs">
                                    <Briefcase className="size-3" /> {job.applicants} applied
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    )
}

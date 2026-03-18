"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-brand-light-gray flex items-center justify-center px-6">
            <div className="max-w-md w-full text-center">

                <h1 className="font-heading font-bold text-4xl text-brand-neutrals-100 mb-4">
                    Page Not Found
                </h1>

                <p className="font-ui text-brand-neutrals-60 mb-8 leading-relaxed">
                    The job or page you're looking for doesn't exist or has been moved.
                    Let's get you back on track to finding your next career move.
                </p>

                <div className="flex flex-col gap-3">
                    <Button className="h-12 text-base">
                        <Link href="/jobs">
                            Browse All Jobs
                        </Link>
                    </Button>

                    <Button variant="ghost" className="text-brand-neutrals-60 hover:text-brand-primary">
                        <Link href="/" className="inline-flex items-center gap-2">
                            <ArrowLeft className="size-4" /> Back to Home
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
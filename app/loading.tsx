"use client";
import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="min-h-screen bg-brand-light-gray flex flex-col items-center justify-center">
            <div className="relative flex items-center justify-center">
                {/* Outer pulse ring */}
                <div className="absolute size-16 bg-brand-primary/20 rounded-full animate-ping" />

                {/* Inner spinning loader */}
                <div className="relative size-12 bg-white border border-brand-neutrals-20 shadow-sm grid place-items-center">
                    <Loader2 className="size-6 text-brand-primary animate-spin" />
                </div>
            </div>

            <div className="mt-8 text-center">
                <p className="font-heading font-bold text-brand-neutrals-100 text-lg">
                    Just a moment
                </p>
                <p className="font-ui text-sm text-brand-neutrals-40 mt-1 animate-pulse">
                    Fetching the latest opportunities...
                </p>
            </div>
        </div>
    );
}
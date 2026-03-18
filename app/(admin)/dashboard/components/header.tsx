"use client";

import { useAuth } from "@/lib/hooks/use-auth";
import {
    Bell, ChevronDown, Loader2, Menu, X
} from "lucide-react";
import Link from 'next/link';


export default function Header({
    sidebarOpen,
    setSidebarOpen,
}: {
    sidebarOpen: boolean;
    setSidebarOpen: (value: boolean) => void;
}) {


    const { user, logout, isLoading } = useAuth();

    if (isLoading) return <Loader2 className="animate-spin" />;

    return (
        <header className="bg-white border-b border-brand-neutrals-20 sticky top-0 z-40 h-16 flex items-center">
            <div className="flex items-center gap-4 px-6 w-full">
                {/* Mobile menu toggle */}
                <button
                    className="lg:hidden size-8 grid place-items-center border border-brand-neutrals-20 hover:border-brand-primary transition-colors"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                    {sidebarOpen ? <X className="size-4" /> : <Menu className="size-4" />}
                </button>

                {/* Logo */}
                <Link href="/" className="font-heading font-bold text-xl text-brand-neutrals-100 tracking-tight shrink-0">
                    Quick<span className="text-brand-primary">Hire</span>
                </Link>

                {/* Role badge */}
                <span className={`hidden sm:inline font-ui text-xs font-semibold px-2.5 py-0.5 ${user.role === "admin"
                    ? "bg-brand-primary/10 text-brand-primary"
                    : "bg-brand-green/10 text-brand-green"
                    }`}>
                    {user.role === "admin" ? "Admin Panel" : "Candidate Dashboard"}
                </span>

                <div className="flex-1" />

                {/* Notifications */}
                <button className="relative size-9 border border-brand-neutrals-20 grid place-items-center hover:border-brand-primary transition-colors">
                    <Bell className="size-4 text-brand-neutrals-60" />
                    <span className="absolute -top-1 -right-1 size-4 bg-brand-red grid place-items-center rounded-full">
                        <span className="text-white text-[9px] font-bold font-ui">3</span>
                    </span>
                </button>

                {/* User Menu */}
                <div className="flex items-center gap-2.5 pl-3 border-l border-brand-neutrals-20">
                    <div className="size-8 bg-brand-primary grid place-items-center font-heading font-bold text-sm text-white">
                        {user.avatar}
                    </div>
                    <div className="hidden md:block text-left">
                        <p className="font-ui text-sm font-semibold text-brand-neutrals-100 leading-none">{user.name}</p>
                        <p className="font-ui text-xs text-brand-neutrals-40 mt-0.5">{user.email}</p>
                    </div>
                    <ChevronDown className="size-3.5 text-brand-neutrals-40 hidden md:block" />
                </div>
            </div>
        </header>
    )
}

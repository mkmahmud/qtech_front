import React, { useState } from 'react'
import {
    LayoutDashboard, Briefcase, FileText, Bookmark,
    Users, Plus, Settings, LogOut, Bell, ChevronDown, Menu, X
} from "lucide-react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// Mock: swap with real auth context
const MOCK_USER = { name: "Sarah Johnson", email: "sarah@example.com", role:  "admin", avatar: "SJ" };
// const MOCK_USER = { name: "Admin User", email: "admin@quickhire.com", role: "admin" as "user" | "admin", avatar: "AU" };

const USER_NAV = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Overview" },
    { href: "/dashboard/applications", icon: FileText, label: "My Applications" },
    { href: "/dashboard/saved", icon: Bookmark, label: "Saved Jobs" },
    { href: "/dashboard/settings", icon: Settings, label: "Settings" },
];

const ADMIN_NAV = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Overview" },
    { href: "/dashboard/jobs", icon: Briefcase, label: "Manage Jobs" },
    { href: "/dashboard/jobs/create", icon: Plus, label: "Post a Job" },
    { href: "/dashboard/applications", icon: Users, label: "All Applications" },
    { href: "/dashboard/settings", icon: Settings, label: "Settings" },
];

export default function Sidebar({
    sidebarOpen,
    setSidebarOpen,
}: {
    sidebarOpen: boolean;
    setSidebarOpen: (value: boolean) => void;
}) {
    const pathname = usePathname();
    const user = MOCK_USER;
    const nav = user.role === "admin" ? ADMIN_NAV : USER_NAV;

    return (
        <>
            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/30 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <aside
                className={`fixed lg:sticky top-16 z-30 h-[calc(100vh-4rem)] w-60 bg-white border-r border-brand-neutrals-20 flex flex-col transition-transform duration-200 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <nav className="flex-1 p-4 overflow-y-auto">
                    <p className="font-ui text-[10px] font-semibold text-brand-neutrals-40 uppercase tracking-widest mb-3 px-3">
                        {user.role === "admin" ? "Administration" : "My Account"}
                    </p>
                    <ul className="space-y-0.5">
                        {nav.map(({ href, icon: Icon, label }) => {
                            const active = pathname === href;
                            return (
                                <li key={href}>
                                    <Link
                                        href={href}
                                        onClick={() => setSidebarOpen(false)}
                                        className={`flex items-center gap-3 px-3 py-2.5 font-ui text-sm font-medium transition-colors ${active
                                            ? "bg-brand-primary text-white"
                                            : "text-brand-neutrals-80 hover:bg-brand-light-gray hover:text-brand-primary"
                                            }`}
                                    >
                                        <Icon className="size-4 shrink-0" />
                                        {label}
                                        {label === "Post a Job" && (
                                            <span className="ml-auto size-4 bg-brand-primary/15 text-brand-primary text-[10px] font-bold grid place-items-center">+</span>
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    {/* Browse Jobs link for users */}
                    {user.role === "user" && (
                        <div className="mt-6 pt-4 border-t border-brand-neutrals-20">
                            <Link
                                href="/jobs"
                                className="flex items-center gap-3 px-3 py-2.5 font-ui text-sm font-medium text-brand-neutrals-60 hover:text-brand-primary transition-colors"
                            >
                                <Briefcase className="size-4" />
                                Browse Jobs
                            </Link>
                        </div>
                    )}
                </nav>

                {/* Sign out */}
                <div className="p-4 border-t border-brand-neutrals-20">
                    <button className="flex items-center gap-3 px-3 py-2.5 font-ui text-sm font-medium text-brand-neutrals-60 hover:text-brand-red transition-colors w-full">
                        <LogOut className="size-4" />
                        Sign Out
                    </button>
                </div>
            </aside>
        </>
    )
}

"use client";

import { useState } from "react";
import Sidebar from "./dashboard/components/sidebar";
import Header from "./dashboard/components/header";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/lib/hooks/use-auth";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { isLoading, isLoggedIn } = useAuth();


  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-brand-light-gray">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-sm text-brand-neutrals-60 animate-pulse">Loading workspace...</p>
        </div>
      </div>
    );
  }


  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-brand-light-gray flex flex-col">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Page Content */}
        <main className="flex-1 min-w-0 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
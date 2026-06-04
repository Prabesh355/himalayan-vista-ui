import React from "react";
import { Link } from "@tanstack/react-router";
import { Globe } from "lucide-react";
import { AdminSidebar } from "./AdminSidebar";

export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <AdminSidebar />
      <main className="flex-1 overflow-x-hidden pt-[60px] md:pt-0">
        <div className="sticky top-0 z-30 flex justify-end border-b bg-background/90 px-4 py-3 backdrop-blur md:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-secondary"
          >
            <Globe className="h-4 w-4" />
            View Website
          </Link>
        </div>
        <div className="p-4 md:p-8 max-w-[1600px] mx-auto min-h-screen">{children}</div>
      </main>
    </div>
  );
};

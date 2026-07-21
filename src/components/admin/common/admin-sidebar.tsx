"use client";

import { cn } from "@/lib/utils";

import { useAdminSidebar } from "./admin-sidebar-context";
import { AdminSidebarContent } from "./admin-sidebar-content";

export function AdminSidebar() {
  const { sidebarOpen, initialized } = useAdminSidebar();

  if (!initialized) {
    return null;
  }

  return (
    <aside
      className={cn(
        "hidden h-screen shrink-0 overflow-hidden border-r transition-all duration-200 md:flex",
        sidebarOpen ? "w-64" : "w-0",
      )}
    >
      <AdminSidebarContent onNavigate={() => undefined} />
    </aside>
  );
}

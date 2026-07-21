"use client";

import { cn } from "@/lib/utils";

import { useAdminSidebar } from "./admin-sidebar-context";
import { AdminSidebarContent } from "./admin-sidebar-content";

export function AdminSidebar() {
  const { sidebarCollapsed, initialized } = useAdminSidebar();

  if (!initialized) {
    return null;
  }

  return (
    <aside
      className={cn(
        "hidden h-screen shrink-0 overflow-hidden border-r transition-[width] duration-200 md:flex",
        sidebarCollapsed ? "w-14" : "w-64",
      )}
    >
      <AdminSidebarContent onNavigate={() => undefined} />
    </aside>
  );
}

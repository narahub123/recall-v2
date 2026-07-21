"use client";

import { AdminSidebarContent } from "./admin-sidebar-content";

const desktopSidebarClassName =
  "hidden h-screen w-64 shrink-0 border-r md:flex";

export function AdminSidebar() {
  return (
    <aside className={desktopSidebarClassName}>
      <AdminSidebarContent onNavigate={() => undefined} />
    </aside>
  );
}

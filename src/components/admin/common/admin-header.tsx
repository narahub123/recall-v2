"use client";

import { PanelLeft, PanelLeftClose } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useAdminSidebar } from "./admin-sidebar-context";
import { AdminSidebarTrigger } from "./admin-sidebar-trigger";

export function AdminHeader() {
  const { sidebarOpen, initialized, toggleSidebar } = useAdminSidebar();

  const SidebarIcon = sidebarOpen ? PanelLeftClose : PanelLeft;

  if (!initialized) {
    return null;
  }

  return (
    <header className="flex h-14 items-center gap-2 border-b px-4">
      {/* Mobile */}
      <AdminSidebarTrigger />

      {/* Desktop */}
      <div className="hidden md:block">
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          <SidebarIcon />
          <span className="sr-only">사이드바 토글</span>
        </Button>
      </div>

      <span>Admin</span>
    </header>
  );
}

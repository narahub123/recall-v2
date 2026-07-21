"use client";

import { ADMIN_MENU } from "@/constants/admin-menu";

import { ScrollArea } from "@/components/ui/scroll-area";

import { cn } from "@/lib/utils";

import { useAdminSidebar } from "./admin-sidebar-context";
import { AdminSidebarMenuItem } from "./admin-sidebar-menu-item";

type AdminSidebarContentProps = {
  onNavigate: () => void;
};

export function AdminSidebarContent({ onNavigate }: AdminSidebarContentProps) {
  const { sidebarCollapsed, expandSidebar } = useAdminSidebar();

  return (
    <ScrollArea className="h-full">
      <nav
        className={cn(
          "flex flex-col gap-2",
          sidebarCollapsed ? "items-center p-2" : "p-4",
        )}
      >
        {ADMIN_MENU.map((item) => (
          <AdminSidebarMenuItem
            key={item.label}
            item={item}
            onNavigate={onNavigate}
            collapsed={sidebarCollapsed}
            onExpandSidebar={expandSidebar}
          />
        ))}
      </nav>
    </ScrollArea>
  );
}

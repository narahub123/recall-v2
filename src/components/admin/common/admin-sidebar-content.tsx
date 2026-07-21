"use client";

import { ADMIN_MENU } from "@/constants/admin-menu";

import { ScrollArea } from "@/components/ui/scroll-area";

import { AdminSidebarMenuItem } from "./admin-sidebar-menu-item";

type AdminSidebarContentProps = {
  onNavigate: () => void;
};

export function AdminSidebarContent({ onNavigate }: AdminSidebarContentProps) {
  return (
    <ScrollArea className="h-full">
      <nav className="flex flex-col gap-2 p-4">
        {ADMIN_MENU.map((item) => (
          <AdminSidebarMenuItem
            key={item.label}
            item={item}
            onNavigate={onNavigate}
          />
        ))}
      </nav>
    </ScrollArea>
  );
}

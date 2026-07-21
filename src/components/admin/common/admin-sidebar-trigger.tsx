"use client";

import { useState } from "react";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { cn } from "@/lib/utils";

import { AdminSidebarContent } from "./admin-sidebar-content";

const sidebarContentClassName = cn(
  "fixed inset-y-0 left-0 top-0 h-screen w-64",
  "max-w-none translate-x-0 translate-y-0",
  "rounded-none p-0",
  "duration-200",
  "data-open:slide-in-from-left data-open:fade-in-0",
  "data-closed:slide-out-to-left data-closed:fade-out-0",
);

export function AdminSidebarTrigger() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger render={<Button variant="ghost" size="icon" />}>
          <Menu />
          <span className="sr-only">메뉴 열기</span>
        </DialogTrigger>

        <DialogContent
          showCloseButton={false}
          className={sidebarContentClassName}
        >
          <AdminSidebarContent onNavigate={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

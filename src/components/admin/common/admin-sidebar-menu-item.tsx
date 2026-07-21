"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import type { AdminMenuItem as AdminMenuItemType } from "@/types/admin";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";

type AdminSidebarMenuItemProps = {
  item: AdminMenuItemType;
  onNavigate: () => void;
  collapsed: boolean;
  onExpandSidebar: () => void;
};

function isPathActive(href: string | undefined, pathname: string): boolean {
  if (!href) {
    return false;
  }

  if (href === ROUTES.ADMIN.DASHBOARD) {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function hasActiveChild(item: AdminMenuItemType, pathname: string): boolean {
  if (!item.children) {
    return isPathActive(item.href, pathname);
  }

  return item.children.some((child) => hasActiveChild(child, pathname));
}

export function AdminSidebarMenuItem({
  item,
  onNavigate,
  collapsed,
  onExpandSidebar,
}: AdminSidebarMenuItemProps) {
  const pathname = usePathname();

  const hasActive = hasActiveChild(item, pathname);
  const isActive = isPathActive(item.href, pathname);

  const [open, setOpen] = useState(hasActive);
  const [manualControl, setManualControl] = useState(false);

  useEffect(() => {
    if (!manualControl && hasActive) {
      setOpen(true);
    }
  }, [hasActive, manualControl]);

  const Icon = item.icon;

  if (!item.children) {
    const menuLink = (
      <Link
        href={item.href ?? "#"}
        onClick={onNavigate}
        className={cn(
          "flex items-center rounded-md text-sm",
          collapsed ? "size-10 justify-center px-0" : "gap-2 px-3 py-2",
          isActive
            ? "bg-accent font-medium"
            : "text-muted-foreground hover:bg-accent hover:text-foreground",
        )}
      >
        {Icon && <Icon className="size-4 shrink-0" />}

        {!collapsed && <span>{item.label}</span>}
      </Link>
    );

    if (!collapsed) {
      return menuLink;
    }

    return (
      <Tooltip>
        <TooltipTrigger render={menuLink} />

        <TooltipContent side="right">{item.label}</TooltipContent>
      </Tooltip>
    );
  }

  const collapsedTrigger = (
    <CollapsibleTrigger
      onClick={() => {
        if (collapsed) {
          onExpandSidebar();
        }
      }}
      className="flex size-10 items-center justify-center rounded-md hover:bg-accent"
    >
      {Icon && <Icon className="size-4 shrink-0" />}
    </CollapsibleTrigger>
  );

  return (
    <Collapsible
      open={open}
      onOpenChange={(value) => {
        setManualControl(true);
        setOpen(value);
      }}
    >
      {collapsed ? (
        <Tooltip>
          <TooltipTrigger render={collapsedTrigger} />

          <TooltipContent side="right">{item.label}</TooltipContent>
        </Tooltip>
      ) : (
        <CollapsibleTrigger
          className={cn(
            "group flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium hover:bg-accent",
          )}
        >
          <div className="flex items-center gap-2">
            {Icon && <Icon className="size-4 shrink-0" />}

            <span className={cn(hasActive && "font-medium")}>{item.label}</span>
          </div>

          <ChevronRight className="size-4 transition-transform group-data-panel-open:rotate-90" />
        </CollapsibleTrigger>
      )}

      {!collapsed && (
        <CollapsibleContent className="ml-4.5 mt-1 space-y-1 border-l pl-3">
          {item.children.map((child) => (
            <AdminSidebarMenuItem
              key={child.label}
              item={child}
              onNavigate={onNavigate}
              collapsed={collapsed}
              onExpandSidebar={onExpandSidebar}
            />
          ))}
        </CollapsibleContent>
      )}
    </Collapsible>
  );
}

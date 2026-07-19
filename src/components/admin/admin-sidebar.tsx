import Link from "next/link";

import { ADMIN_MENU } from "@/constants/admin-menu";
import type { AdminMenuItem } from "@/types/admin";

import { ScrollArea } from "@/components/ui/scroll-area";

function renderMenu(items: AdminMenuItem[]) {
  return items.map((item) => {
    if (item.children) {
      return (
        <div key={item.label}>
          <div>{item.label}</div>

          <div className="ml-4">{renderMenu(item.children)}</div>
        </div>
      );
    }

    return (
      <Link key={item.href} href={item.href ?? "#"}>
        {item.label}
      </Link>
    );
  });
}

export function AdminSidebar() {
  return (
    <aside className="w-64 border-r">
      <ScrollArea className="h-screen">
        <nav className="p-4 space-y-2 flex flex-col">
          {renderMenu(ADMIN_MENU)}
        </nav>
      </ScrollArea>
    </aside>
  );
}

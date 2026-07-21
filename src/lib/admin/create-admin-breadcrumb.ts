import { ADMIN_MENU } from "@/constants/admin-menu";
import { ROUTES } from "@/constants/routes";

import type { AdminBreadcrumbItem } from "@/types/admin-breadcrumb";

function isPathMatch(pathname: string, href?: string): boolean {
  if (!href) {
    return false;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function flattenMenu(
  items: typeof ADMIN_MENU,
  parents: AdminBreadcrumbItem[] = [],
): {
  item: (typeof ADMIN_MENU)[number];
  parents: AdminBreadcrumbItem[];
}[] {
  return items.flatMap((item) => {
    const current: AdminBreadcrumbItem = {
      label: item.label,
      href: item.href,
    };

    if (item.children) {
      return flattenMenu(
        item.children,
        item.href ? [...parents, current] : parents,
      );
    }

    return [
      {
        item,
        parents,
      },
    ];
  });
}

export function createAdminBreadcrumb(pathname: string): AdminBreadcrumbItem[] {
  const menus = flattenMenu(ADMIN_MENU);

  const matched = menus
    .filter(({ item }) => isPathMatch(pathname, item.href))
    .sort((a, b) => {
      const aLength = a.item.href?.length ?? 0;
      const bLength = b.item.href?.length ?? 0;

      return bLength - aLength;
    })[0];

  if (!matched || !matched.item.href) {
    return [
      {
        label: "대시보드",
      },
    ];
  }

  const dashboardItem = {
    label: "대시보드",
    href: ROUTES.ADMIN.DASHBOARD,
  };

  if (matched.item.href === ROUTES.ADMIN.DASHBOARD) {
    return [dashboardItem];
  }

  return [
    dashboardItem,
    ...matched.parents,
    {
      label: matched.item.label,
      href: matched.item.href,
    },
  ];
}

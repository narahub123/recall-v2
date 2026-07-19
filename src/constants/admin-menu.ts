import { AdminMenuItem } from "@/types/admin";

export const ADMIN_MENU: AdminMenuItem[] = [
  {
    label: "Dashboard",
    href: "/admin",
  },
  {
    label: "Knowledge",
    children: [
      {
        label: "Classification",
        href: "/admin/knowledge/classification",
      },
      {
        label: "Object",
        href: "/admin/knowledge/object",
      },
      {
        label: "Relation",
        href: "/admin/knowledge/relation",
      },
    ],
  },
];

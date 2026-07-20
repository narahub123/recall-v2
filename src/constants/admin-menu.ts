import { AdminMenuItem } from "@/types/admin";

export const ADMIN_MENU: AdminMenuItem[] = [
  {
    label: "Dashboard",
    href: "/admin",
  },
  {
    label: "프롬프트 관리",
    href: "/admin/prompts",
  },
  {
    label: "지식 추출 관리",
    href: "/admin/knowledge-extractions",
  },
  {
    label: "지식 객체 관리",
    href: "/admin/knowledge-objects",
  },
];

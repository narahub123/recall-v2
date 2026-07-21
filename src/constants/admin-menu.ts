import { AdminMenuItem } from "@/types/admin";
import { ROUTES } from "./routes";

export const ADMIN_MENU: AdminMenuItem[] = [
  {
    label: "Dashboard",
    href: ROUTES.ADMIN.DASHBOARD,
  },
  {
    label: "프롬프트 관리",
    href: ROUTES.ADMIN.PROMPTS,
  },
  {
    label: "지식 추출 관리",
    href: ROUTES.ADMIN.KNOWLEDGE_EXTRACTIONS,
  },
  {
    label: "지식 객체 작업 관리",
    href: ROUTES.ADMIN.KNOWLEDGE_OBJECT_GENERATIONS,
  },
  {
    label: "지식 객체 관리",
    href: ROUTES.ADMIN.KNOWLEDGE_OBJECTS,
  },
];

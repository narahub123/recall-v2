import {
  Brain,
  Database,
  FileSearch,
  FileText,
  LayoutDashboard,
  MessagesSquare,
  Workflow,
} from "lucide-react";

import { ROUTES } from "./routes";
import type { AdminMenuItem } from "@/types/admin";

export const ADMIN_MENU: AdminMenuItem[] = [
  {
    label: "Dashboard",
    href: ROUTES.ADMIN.DASHBOARD,
    icon: LayoutDashboard,
  },
  {
    label: "Knowledge",
    icon: Brain,
    children: [
      {
        label: "지식 추출 관리",
        href: ROUTES.ADMIN.KNOWLEDGE_EXTRACTIONS,
        icon: FileSearch,
      },
      {
        label: "지식 객체 작업 관리",
        href: ROUTES.ADMIN.KNOWLEDGE_OBJECT_GENERATIONS,
        icon: Workflow,
      },
      {
        label: "지식 객체 관리",
        href: ROUTES.ADMIN.KNOWLEDGE_OBJECTS,
        icon: Database,
      },
      {
        label: "지식 객체 관계 작업 관리",
        href: ROUTES.ADMIN.KNOWLEDGE_OBJECT_RELATION_GENERATIONS,
        icon: Workflow,
      },
    ],
  },
  {
    label: "Prompt",
    icon: MessagesSquare,
    children: [
      {
        label: "프롬프트 관리",
        href: ROUTES.ADMIN.PROMPTS,
        icon: FileText,
      },
    ],
  },
];

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminBreadcrumb } from "../common/admin-breadcrumb";
import { KnowledgeObjectCreateForm } from "./knowledge-object-create-form";

export function KnowledgeObjectCreateClient() {
  return (
    <Card>
      <div className="pl-4">
        <AdminBreadcrumb
          items={[
            {
              label: "관리자",
              href: "/admin",
            },
            {
              label: "Knowledge Object",
              href: "/admin/knowledge-objects",
            },
            {
              label: "생성",
            },
          ]}
        />
      </div>

      <CardHeader>
        <CardTitle>Knowledge Object 생성</CardTitle>
      </CardHeader>

      <CardContent>
        <KnowledgeObjectCreateForm />
      </CardContent>
    </Card>
  );
}

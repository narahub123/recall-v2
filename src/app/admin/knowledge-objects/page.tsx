import Link from "next/link";

import { Button } from "@/components/ui/button";

import { KnowledgeObjectListClient } from "@/components/admin/knowledge-object/knowledge-object-list-client";
import { ROUTES } from "@/constants/routes";

export default function KnowledgeObjectPage() {
  return (
    <main className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Knowledge Objects</h1>

          <p className="text-sm text-muted-foreground">
            저장된 Knowledge Object를 관리합니다.
          </p>
        </div>

        <Link href={ROUTES.ADMIN.KNOWLEDGE_OBJECTS_NEW}>
          <Button>생성</Button>
        </Link>
      </div>

      <KnowledgeObjectListClient />
    </main>
  );
}

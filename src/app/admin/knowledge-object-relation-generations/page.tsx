import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { KnowledgeObjectRelationGenerationListClient } from "@/components/admin/knowledge-object-relation-generation/knowledge-object-relation-generation-list-client";

export default function KnowledgeObjectRelationGenerationsPage() {
  return (
    <main className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">
            Knowledge Object Relation Generations
          </h1>

          <p className="text-sm text-muted-foreground">
            Knowledge Object Relation 생성 작업 기록을 관리합니다.
          </p>
        </div>

        <Button>
          <Link href={ROUTES.ADMIN.KNOWLEDGE_OBJECT_RELATION_GENERATIONS_NEW}>
            Create
          </Link>
        </Button>
      </div>

      <KnowledgeObjectRelationGenerationListClient />
    </main>
  );
}

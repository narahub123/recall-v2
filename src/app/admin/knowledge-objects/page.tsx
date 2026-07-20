import { KnowledgeObjectListClient } from "@/components/admin/knowledge-object/knowledge-object-list-client";

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
      </div>

      <KnowledgeObjectListClient />
    </main>
  );
}

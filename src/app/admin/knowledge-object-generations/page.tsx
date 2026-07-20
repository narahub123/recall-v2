import { KnowledgeObjectGenerationListClient } from "@/components/admin/knowledge-object-generation/knowledge-object-generation-list-client";

export default function KnowledgeObjectGenerationsPage() {
  return (
    <main className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold">Knowledge Object Generations</h1>

        <p className="text-sm text-muted-foreground">
          Knowledge Object 생성 작업 기록을 관리합니다.
        </p>
      </div>

      <KnowledgeObjectGenerationListClient />
    </main>
  );
}

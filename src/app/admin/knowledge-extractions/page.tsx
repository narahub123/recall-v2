import { KnowledgeExtractionClient } from "@/components/admin/knowledge-extraction/knowledge-extraction-client";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import Link from "next/link";

export default function KnowledgeExtractionPage() {
  return (
    <main className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Knowledge Extraction</h1>

          <p className="text-sm text-muted-foreground">
            LLM 추출 결과를 관리합니다.
          </p>
        </div>

        <Button>
          <Link href={ROUTES.ADMIN.KNOWLEDGE_EXTRACTIONS_NEW}>Create</Link>
        </Button>
      </div>

      <KnowledgeExtractionClient />
    </main>
  );
}

import { notFound } from "next/navigation";

import { KnowledgeExtractionDetailClient } from "@/components/admin/knowledge-extraction/knowledge-extraction-detail-client";

type KnowledgeExtractionDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function KnowledgeExtractionDetailPage({
  params,
}: KnowledgeExtractionDetailPageProps) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  return (
    <main className="p-6">
      <KnowledgeExtractionDetailClient id={id} />
    </main>
  );
}

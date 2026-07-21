import { KnowledgeExtractionDetail } from "@/components/admin/knowledge-extraction/knowledge-extraction-detail";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function KnowledgeExtractionDetailPage({ params }: Props) {
  const { id } = await params;

  return (
    <main className="p-6">
      <KnowledgeExtractionDetail id={id} />
    </main>
  );
}

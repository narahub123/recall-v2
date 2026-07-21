import { KnowledgeObjectRelationGenerationDetail } from "@/components/admin/knowledge-object-relation-generation/knowledge-object-relation-generation-detail";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function KnowledgeObjectRelationGenerationDetailPage({
  params,
}: Props) {
  const { id } = await params;

  return (
    <main className="space-y-6 p-6">
      <KnowledgeObjectRelationGenerationDetail id={id} />
    </main>
  );
}

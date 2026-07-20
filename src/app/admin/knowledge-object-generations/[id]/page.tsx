import { KnowledgeObjectGenerationDetail } from "@/components/admin/knowledge-object-generation/knowledge-object-generation-detail";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function KnowledgeObjectGenerationDetailPage({
  params,
}: Props) {
  const { id } = await params;

  return (
    <main className="space-y-6 p-6">
      <KnowledgeObjectGenerationDetail id={id} />
    </main>
  );
}

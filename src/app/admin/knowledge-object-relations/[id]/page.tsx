import { KnowledgeObjectRelationDetailClient } from "@/components/admin/knowledge-object-relation/knowledge-object-relation-detail-client";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function KnowledgeObjectRelationDetailPage({
  params,
}: Props) {
  const { id } = await params;

  return <KnowledgeObjectRelationDetailClient id={id} />;
}

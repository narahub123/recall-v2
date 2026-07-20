import { KnowledgeObjectDetail } from "@/components/admin/knowledge-object/knowledge-object-detail";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function KnowledgeObjectDetailPage({ params }: Props) {
  const { id } = await params;

  return <KnowledgeObjectDetail id={id} />;
}

import { NoteRelationDetailClient } from "@/components/admin/note-relation/note-relation-detail-client";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function NoteRelationDetailPage({ params }: Props) {
  const { id } = await params;

  return <NoteRelationDetailClient id={id} />;
}

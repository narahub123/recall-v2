import { NoteDetail } from "@/components/note/note-detail";

interface NotePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function NotePage({ params }: NotePageProps) {
  const { id } = await params;

  return <NoteDetail id={id} />;
}

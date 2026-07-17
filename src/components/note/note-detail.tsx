"use client";

import { useNote } from "@/hooks/notes/queries/use-note";
import { NoteEditor } from "./note-editor";

interface NoteDetailProps {
  id: string;
}

export function NoteDetail({ id }: NoteDetailProps) {
  const { data: note, isLoading, isError } = useNote(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !note) {
    return <div>Note not found</div>;
  }

  return (
    <main>
      <h1>{note.title}</h1>

      <NoteEditor initialContent={note.content} />
    </main>
  );
}

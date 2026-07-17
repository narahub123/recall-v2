"use client";

import { useNotes } from "@/hooks/note/queries/use-notes";

import { CreateNoteButton } from "./create-note-button";
import { NoteItem } from "./note-item";
import { NoteListSkeleton } from "./note-list-skeleton";

export function NoteList() {
  const { data: notes, isLoading } = useNotes();

  return (
    <section className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Notes</h1>

        <CreateNoteButton />
      </header>

      {isLoading && <NoteListSkeleton />}

      {!isLoading && (!notes || notes.length === 0) && (
        <div className="rounded-lg border p-8 text-center">
          <p className="text-muted-foreground">아직 작성된 노트가 없습니다.</p>

          <p className="mt-2 text-sm text-muted-foreground">
            새 노트를 만들어 시작하세요.
          </p>
        </div>
      )}

      {!isLoading && notes && notes.length > 0 && (
        <div className="space-y-4">
          {notes.map((note) => (
            <NoteItem key={note.id} note={note} />
          ))}
        </div>
      )}
    </section>
  );
}

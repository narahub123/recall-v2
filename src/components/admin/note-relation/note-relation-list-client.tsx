"use client";

import { useNoteRelations } from "@/hooks/note-relation/queries/use-note-relations";

import { NoteRelationList } from "./note-relation-list";

export function NoteRelationListClient() {
  const { data: noteRelations, isLoading } = useNoteRelations();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <NoteRelationList noteRelations={noteRelations ?? []} />;
}

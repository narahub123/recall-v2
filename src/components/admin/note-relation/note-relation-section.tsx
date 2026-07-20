"use client";

import { useState } from "react";

import { useNoteRelationsByNoteId } from "@/hooks/note-relation/queries/use-note-relations-by-note-id";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { NoteRelationCreateForm } from "./note-relation-create-form";
import { NoteRelationList } from "./note-relation-list";

interface Props {
  noteId: string;
}

export function NoteRelationSection({ noteId }: Props) {
  const [createOpen, setCreateOpen] = useState(false);

  const { data: noteRelations, isLoading } = useNoteRelationsByNoteId(noteId);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Note Relations</CardTitle>

          <Button
            variant="outline"
            onClick={() => setCreateOpen((prev) => !prev)}
          >
            {createOpen ? "닫기" : "Relation 추가"}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {createOpen && (
          <NoteRelationCreateForm
            sourceNoteId={noteId}
            onSuccess={() => setCreateOpen(false)}
          />
        )}

        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <NoteRelationList noteRelations={noteRelations ?? []} />
        )}
      </CardContent>
    </Card>
  );
}

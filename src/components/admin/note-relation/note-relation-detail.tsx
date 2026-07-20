"use client";

import { NoteRelationDTO } from "@/dto/note-relation.dto";

import { useNote } from "@/hooks/note/queries/use-note";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  noteRelation: NoteRelationDTO;
}

export function NoteRelationDetail({ noteRelation }: Props) {
  const { data: sourceNote } = useNote(noteRelation.sourceNoteId);

  const { data: targetNote } = useNote(noteRelation.targetNoteId);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{noteRelation.relationType}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">Source Note</p>

          <p>{sourceNote?.title ?? noteRelation.sourceNoteId}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Target Note</p>

          <p>{targetNote?.title ?? noteRelation.targetNoteId}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Relation Type</p>

          <p>{noteRelation.relationType}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Reason</p>

          <p>{noteRelation.reason || "-"}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Confidence</p>

          <p>{noteRelation.confidence}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Created At</p>

          <p>{new Date(noteRelation.createdAt).toLocaleString()}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Updated At</p>

          <p>{new Date(noteRelation.updatedAt).toLocaleString()}</p>
        </div>
      </CardContent>
    </Card>
  );
}

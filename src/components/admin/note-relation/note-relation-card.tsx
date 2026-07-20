"use client";

import Link from "next/link";

import { NoteRelationDTO } from "@/dto/note-relation.dto";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useNote } from "@/hooks/note/queries/use-note";

interface Props {
  noteRelation: NoteRelationDTO;
}

export function NoteRelationCard({ noteRelation }: Props) {
  const { data: sourceNote } = useNote(noteRelation.sourceNoteId);

  const { data: targetNote } = useNote(noteRelation.targetNoteId);

  return (
    <Link href={`/admin/note-relations/${noteRelation.id}`}>
      <Card className="cursor-pointer transition hover:bg-muted/50">
        <CardHeader>
          <CardTitle>{noteRelation.relationType}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          <div>
            <p className="text-sm text-muted-foreground">Source Note</p>

            <p>{sourceNote?.title ?? noteRelation.sourceNoteId}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Target Note</p>

            <p>{targetNote?.title ?? noteRelation.targetNoteId}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Reason</p>

            <p>{noteRelation.reason || "-"}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Confidence</p>

            <p>{noteRelation.confidence}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

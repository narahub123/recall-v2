"use client";

import { useCallback, useState } from "react";

import { NoteEditor } from "./note-editor";

import { debounce } from "@/lib/debounce";

import { useNote } from "@/hooks/notes/queries/use-note";
import { useUpdateNote } from "@/hooks/notes/mutations/use-update-note";

import type { Block } from "@blocknote/core";
import { NoteDetailSkeleton } from "./note-detail-skeleton";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Badge } from "lucide-react";
import { Separator } from "@base-ui/react";

interface NoteDetailProps {
  id: string;
}

type SaveStatus = "saved" | "saving" | "error";

export function NoteDetail({ id }: NoteDetailProps) {
  const { data: note, isLoading, isError } = useNote(id);

  const updateNoteMutation = useUpdateNote();

  const [saveStatus, setSaveStatus] = useState<SaveStatus>("saved");

  const saveNote = useCallback(
    debounce(async (content: Block[]) => {
      try {
        setSaveStatus("saving");

        await updateNoteMutation.mutateAsync({
          id,
          data: {
            content,
          },
        });

        setSaveStatus("saved");
      } catch {
        setSaveStatus("error");
      }
    }, 800),
    [id, updateNoteMutation],
  );

  if (isLoading) {
    return <NoteDetailSkeleton />;
  }

  if (isError || !note) {
    return <div>Note not found</div>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div>
            <h1 className="text-xl font-semibold">{note.title}</h1>

            <p className="text-sm text-muted-foreground">
              {new Date(note.createdAt).toLocaleDateString()} 작성
            </p>
          </div>

          <Badge>
            {saveStatus === "saving" && "저장 중"}

            {saveStatus === "saved" && "저장 완료"}

            {saveStatus === "error" && "저장 실패"}
          </Badge>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="pt-6">
        <NoteEditor initialContent={note.content} onChange={saveNote} />
      </CardContent>
    </Card>
  );
}

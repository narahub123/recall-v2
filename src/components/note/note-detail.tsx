"use client";

import { useEffect, useRef, useState } from "react";

import type { Block } from "@blocknote/core";

import { NoteEditor } from "./note-editor";
import { NoteDetailSkeleton } from "./note-detail-skeleton";

import { useNote } from "@/hooks/note/queries/use-note";
import { useUpdateNote } from "@/hooks/note/mutations/use-update-note";
import { useDebounceCallback } from "@/hooks/use-debounce-callback";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { DeleteNoteButton } from "./delete-note-button";

interface NoteDetailProps {
  id: string;
}

type SaveStatus = "saved" | "saving" | "error";

export function NoteDetail({ id }: NoteDetailProps) {
  const { data: note, isLoading, isError } = useNote(id);

  const updateNoteMutation = useUpdateNote();

  const [title, setTitle] = useState("");

  const [saveStatus, setSaveStatus] = useState<SaveStatus>("saved");

  /**
   * note 최초 로딩 시 title 초기화
   *
   * 이후 refetch로 title을 덮어쓰지 않음
   */
  const initialized = useRef(false);

  useEffect(() => {
    if (note && !initialized.current) {
      setTitle(note.title ?? "");
      initialized.current = true;
    }
  }, [note]);

  /**
   * title autosave
   */
  const saveTitle = useDebounceCallback(async (value: string) => {
    try {
      setSaveStatus("saving");

      await updateNoteMutation.mutateAsync({
        id,
        data: {
          title: value,
        },
      });

      setSaveStatus("saved");
    } catch {
      setSaveStatus("error");
    }
  }, 800);

  /**
   * content autosave
   */
  const saveContent = useDebounceCallback(async (content: Block[]) => {
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
  }, 800);

  if (isLoading) {
    return <NoteDetailSkeleton />;
  }

  if (isError || !note) {
    return <div>Note not found</div>;
  }

  return (
    <Card className="flex min-h-[calc(100vh-5rem)] flex-col ">
      <CardHeader className="mx-13.5">
        <div className="flex justify-between gap-4">
          <div className="flex-1 space-y-2">
            <Input
              value={title}
              placeholder="제목 없음"
              onChange={(event) => {
                const value = event.target.value;

                setTitle(value);
                saveTitle(value);
              }}
              className="border-none px-0 text-xl font-semibold shadow-none focus-visible:ring-0"
            />

            <p className="text-sm text-muted-foreground">
              {new Date(note.createdAt).toLocaleDateString()} 작성
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Badge>
              {saveStatus === "saving" && "저장 중"}

              {saveStatus === "saved" && "저장 완료"}

              {saveStatus === "error" && "저장 실패"}
            </Badge>

            <DeleteNoteButton id={id} />
          </div>
        </div>
      </CardHeader>

      <div className="mx-13.5">
        <Separator />
      </div>
      <CardContent className="pt-6 flex-1">
        <NoteEditor initialContent={note.content} onChange={saveContent} />
      </CardContent>
    </Card>
  );
}

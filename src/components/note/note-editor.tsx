"use client";

import { useEffect } from "react";

import type { Block } from "@blocknote/core";

import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

interface NoteEditorProps {
  initialContent: Block[];

  onChange?: (content: Block[]) => void;
}

export function NoteEditor({ initialContent, onChange }: NoteEditorProps) {
  const editor = useCreateBlockNote({
    initialContent,
  });

  useEffect(() => {
    return editor.onChange(() => {
      onChange?.(editor.document);
    });
  }, [editor, onChange]);

  return (
    <BlockNoteView
      editor={editor}
      editable
      sideMenu
      slashMenu
      formattingToolbar
    />
  );
}

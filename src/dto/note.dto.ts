import { Block } from "@blocknote/core";

export interface NoteDTO {
  id: string;
  userId: string;
  title: string;
  content: Block[];
  createdAt: string;
  updatedAt: string;
}

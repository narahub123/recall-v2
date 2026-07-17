"use server";

import { getCurrentUser } from "@/lib/auth-user";
import { NoteRepository } from "@/repositories/note.repository";
import { NoteService } from "@/services/note.service";

const noteService = new NoteService(new NoteRepository());

export async function createNoteAction(data: {
  title: string;
  content: unknown;
}) {
  const user = await getCurrentUser();

  return noteService.createNote({
    userId: user.id,
    title: data.title,
    content: data.content,
  });
}

export async function getNoteAction(id: string) {
  await getCurrentUser();

  return noteService.getNoteById(id);
}

export async function getUserNotesAction() {
  const user = await getCurrentUser();

  return noteService.getUserNotes(user.id);
}

export async function updateNoteAction(
  id: string,
  data: {
    title?: string;
    content?: unknown;
  },
) {
  await getCurrentUser();

  return noteService.updateNote(id, data);
}

export async function deleteNoteAction(id: string) {
  await getCurrentUser();

  return noteService.deleteNote(id);
}

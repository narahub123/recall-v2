"use server";

import { Block } from "@blocknote/core";

import { connectMongoDB } from "@/lib/mongodb";
import { getCurrentUser } from "@/lib/auth/auth-user";

import { NoteRepository } from "@/repositories/note.repository";
import { NoteService } from "@/services/note.service";
import { requireAdmin } from "@/lib/auth/require-admin";

const noteService = new NoteService(new NoteRepository());

export async function createNoteAction(data: {
  title?: string;
  content: Block[];
}) {
  await connectMongoDB();

  const user = await getCurrentUser();

  return noteService.createNote({
    userId: user.id,
    title: data.title,
    content: data.content,
  });
}

export async function getNoteAction(id: string) {
  await connectMongoDB();

  await getCurrentUser();

  return noteService.getNoteById(id);
}

export async function getUserNotesAction() {
  await connectMongoDB();

  const user = await getCurrentUser();

  return noteService.getUserNotes(user.id);
}

export async function getAdminNotesAction() {
  await connectMongoDB();

  await requireAdmin();

  return noteService.getAllNotes();
}

export async function updateNoteAction(
  id: string,
  data: {
    title?: string;
    content?: Block[];
  },
) {
  await connectMongoDB();

  await getCurrentUser();

  return noteService.updateNote(id, data);
}

export async function deleteNoteAction(id: string) {
  await connectMongoDB();

  await getCurrentUser();

  return noteService.deleteNote(id);
}

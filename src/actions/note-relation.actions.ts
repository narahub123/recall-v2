"use server";

import { NoteRelationRepository } from "@/repositories/note-relation.repository";

import { NoteRelationService } from "@/services/note-relation.service";

function createNoteRelationService() {
  return new NoteRelationService(new NoteRelationRepository());
}

export async function createNoteRelationAction(data: {
  sourceNoteId: string;

  targetNoteId: string;

  relationType: string;

  reason: string;

  confidence: number;
}) {
  const service = createNoteRelationService();

  return service.createRelation(data);
}

export async function getNoteRelationAction(id: string) {
  const service = createNoteRelationService();

  return service.getRelation(id);
}

export async function getNoteRelationsAction() {
  const service = createNoteRelationService();

  return service.getRelations();
}

export async function getNoteRelationsByNoteIdAction(noteId: string) {
  const service = createNoteRelationService();

  return service.getRelationsByNoteId(noteId);
}

export async function updateNoteRelationAction(
  id: string,

  data: {
    relationType?: string;

    reason?: string;

    confidence?: number;
  },
) {
  const service = createNoteRelationService();

  return service.updateRelation(
    id,

    data,
  );
}

export async function deleteNoteRelationAction(id: string) {
  const service = createNoteRelationService();

  return service.deleteRelation(id);
}

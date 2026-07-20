export interface NoteRelationDTO {
  id: string;

  sourceNoteId: string;

  targetNoteId: string;

  relationType: string;

  reason: string;

  confidence: number;

  createdAt: string;

  updatedAt: string;
}

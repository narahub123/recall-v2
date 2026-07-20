import { NoteRelationDTO } from "@/dto/note-relation.dto";

import { INoteRelation } from "@/models/note-relation.model";

export class NoteRelationMapper {
  static toDTO(
    relation: INoteRelation & {
      _id: unknown;
    },
  ): NoteRelationDTO {
    return {
      id: String(relation._id),

      sourceNoteId: relation.sourceNoteId,

      targetNoteId: relation.targetNoteId,

      relationType: relation.relationType,

      reason: relation.reason,

      confidence: relation.confidence,

      createdAt: relation.createdAt.toISOString(),

      updatedAt: relation.updatedAt.toISOString(),
    };
  }
}

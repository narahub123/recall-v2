import { NoteRelation } from "@/models/note-relation.model";

export class NoteRelationRepository {
  async create(data: {
    sourceNoteId: string;

    targetNoteId: string;

    relationType: string;

    reason: string;

    confidence: number;
  }) {
    return NoteRelation.create(data);
  }

  async findById(id: string) {
    return NoteRelation.findById(id).lean();
  }

  async findAll() {
    return NoteRelation.find()
      .sort({
        createdAt: -1,
      })
      .lean();
  }

  async findByNoteId(noteId: string) {
    return NoteRelation.find({
      $or: [
        {
          sourceNoteId: noteId,
        },
        {
          targetNoteId: noteId,
        },
      ],
    })
      .sort({
        createdAt: -1,
      })
      .lean();
  }

  async findByRelation(
    sourceNoteId: string,

    targetNoteId: string,

    relationType: string,
  ) {
    return NoteRelation.findOne({
      relationType,

      $or: [
        {
          sourceNoteId,

          targetNoteId,
        },
        {
          sourceNoteId: targetNoteId,

          targetNoteId: sourceNoteId,
        },
      ],
    });
  }

  async update(
    id: string,

    data: {
      relationType?: string;

      reason?: string;

      confidence?: number;
    },
  ) {
    return NoteRelation.findByIdAndUpdate(
      id,

      data,

      {
        new: true,
      },
    );
  }

  async delete(id: string) {
    return NoteRelation.findByIdAndDelete(id);
  }

  async deleteByNoteId(noteId: string) {
    return NoteRelation.deleteMany({
      $or: [
        {
          sourceNoteId: noteId,
        },
        {
          targetNoteId: noteId,
        },
      ],
    });
  }
}

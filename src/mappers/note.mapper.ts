import { NoteDTO } from "@/dto/note.dto";

export class NoteMapper {
  static toDTO(note: {
    _id: unknown;
    userId: unknown;
    title: string;
    content: unknown;
    createdAt: Date;
    updatedAt: Date;
  }): NoteDTO {
    return {
      id: String(note._id),
      userId: String(note.userId),
      title: note.title,
      content: note.content,
      createdAt: note.createdAt.toISOString(),
      updatedAt: note.updatedAt.toISOString(),
    };
  }
}

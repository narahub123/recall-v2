import { NoteRepository } from "@/repositories/note.repository";

export class NoteService {
  constructor(private readonly noteRepository: NoteRepository) {}

  async createNote(data: { userId: string; title: string; content: unknown }) {
    return this.noteRepository.save(data);
  }

  async getNoteById(id: string) {
    return this.noteRepository.findById(id);
  }

  async getUserNotes(userId: string) {
    return this.noteRepository.findByUserId(userId);
  }

  async updateNote(
    id: string,
    data: {
      title?: string;
      content?: unknown;
    },
  ) {
    return this.noteRepository.update(id, data);
  }

  async deleteNote(id: string) {
    return this.noteRepository.delete(id);
  }
}

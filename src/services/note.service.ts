import { NoteMapper } from "@/mappers/note.mapper";
import { NoteRepository } from "@/repositories/note.repository";
import { NoteDTO } from "@/dto/note.dto";
import { Block } from "@blocknote/core";

export class NoteService {
  constructor(private readonly noteRepository: NoteRepository) {}

  async createNote(data: {
    userId: string;
    title: string;
    content: Block[];
  }): Promise<NoteDTO> {
    const note = await this.noteRepository.save(data);

    return NoteMapper.toDTO(note);
  }

  async getNoteById(id: string): Promise<NoteDTO | null> {
    const note = await this.noteRepository.findById(id);

    if (!note) {
      return null;
    }

    return NoteMapper.toDTO(note);
  }

  async getUserNotes(userId: string): Promise<NoteDTO[]> {
    const notes = await this.noteRepository.findByUserId(userId);

    return notes.map((note) => NoteMapper.toDTO(note));
  }

  async updateNote(
    id: string,
    data: {
      title?: string;
      content?: Block[];
    },
  ): Promise<NoteDTO | null> {
    const note = await this.noteRepository.update(id, data);

    if (!note) {
      return null;
    }

    return NoteMapper.toDTO(note);
  }

  async deleteNote(id: string): Promise<NoteDTO | null> {
    const note = await this.noteRepository.delete(id);

    if (!note) {
      return null;
    }

    return NoteMapper.toDTO(note);
  }
}

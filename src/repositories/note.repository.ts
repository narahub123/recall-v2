import { Types } from "mongoose";
import { Note } from "@/models/note.model";

export class NoteRepository {
  async save(data: { userId: string; title: string; content: unknown }) {
    const note = await Note.create({
      userId: new Types.ObjectId(data.userId),
      title: data.title,
      content: data.content,
    });

    return note;
  }

  async findById(id: string) {
    return Note.findById(id);
  }

  async findByUserId(userId: string) {
    return Note.find({
      userId: new Types.ObjectId(userId),
    }).sort({
      createdAt: -1,
    });
  }

  async update(
    id: string,
    data: {
      title?: string;
      content?: unknown;
    },
  ) {
    return Note.findByIdAndUpdate(id, data, {
      new: true,
    });
  }

  async delete(id: string) {
    return Note.findByIdAndDelete(id);
  }
}

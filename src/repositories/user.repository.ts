import { connectMongoDB } from "@/lib/mongodb";
import { User } from "@/models/user.model";

export class UserRepository {
  async findByEmail(email: string) {
    await connectMongoDB();

    return User.findOne({
      email,
    });
  }

  async findById(id: string) {
    await connectMongoDB();

    return User.findById(id);
  }
}

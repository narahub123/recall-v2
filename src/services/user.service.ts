import { UserRepository } from "@/repositories/user.repository";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  async getUserById(id: string) {
    return this.userRepository.findById(id);
  }
}

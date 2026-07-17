import dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

async function main() {
  try {
    console.log("User verification started");

    const { connectMongoDB } = await import("@/lib/mongodb");
    const { UserRepository } = await import("@/repositories/user.repository");
    const { UserService } = await import("@/services/user.service");

    await connectMongoDB();

    const userRepository = new UserRepository();

    const userService = new UserService(userRepository);

    const email = process.env.TEST_USER_EMAIL;

    if (!email) {
      throw new Error("TEST_USER_EMAIL is not defined");
    }

    const user = await userService.getUserByEmail(email);

    if (!user) {
      console.log("User not found");
      return;
    }

    console.log("User found:");

    console.log({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      image: user.image,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    console.error("User verification failed", error);

    process.exit(1);
  }

  process.exit(0);
}

main();

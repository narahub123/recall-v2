import dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

async function main() {
  try {
    console.log("User role migration started");

    const { connectMongoDB } = await import("@/lib/mongodb");
    const { USER_ROLE } = await import("@/constants/user");
    const { User } = await import("@/models/user.model");

    await connectMongoDB();

    const result = await User.updateMany(
      {
        role: {
          $exists: false,
        },
      },
      {
        $set: {
          role: USER_ROLE.USER,
        },
      },
    );

    console.log("User role migration completed:");

    console.log({
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error("User role migration failed", error);

    process.exit(1);
  }

  process.exit(0);
}

main();

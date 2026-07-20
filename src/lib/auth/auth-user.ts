import { auth } from "@/auth";
import { UserRole } from "@/constants/user";

export async function getCurrentUser(): Promise<{
  id: string;
  email: string;
  name?: string | null;
  image?: string | null;
  role: UserRole;
}> {
  const session = await auth();

  if (!session?.user?.id || !session.user.email) {
    throw new Error("Unauthorized");
  }

  return {
    id: session.user.id,
    email: session.user.email,
    name: session.user.name,
    image: session.user.image,
    role: session.user.role,
  };
}

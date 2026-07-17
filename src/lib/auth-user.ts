import { auth } from "@/auth";

export async function getCurrentUser(): Promise<{
  id: string;
  email: string;
  name?: string | null;
  image?: string | null;
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
  };
}

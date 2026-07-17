import { auth } from "@/auth";

import { UserMenuClient } from "./user-menu-client";

export async function UserMenu() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  return (
    <UserMenuClient
      user={{
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
      }}
    />
  );
}

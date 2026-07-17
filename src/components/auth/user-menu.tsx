import { auth } from "@/auth";

import { LogoutButton } from "./logout-button";

export async function UserMenu() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  return (
    <div>
      <div>{session.user.name}</div>

      <div>{session.user.email}</div>

      <LogoutButton />
    </div>
  );
}

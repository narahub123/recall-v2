import { redirect } from "next/navigation";
import { getCurrentUser } from "./auth-user";
import { USER_ROLE } from "@/constants/user";

export async function requireAdmin() {
  const user = await getCurrentUser();

  if (user.role !== USER_ROLE.ADMIN) {
    redirect("/");
  }

  return user;
}

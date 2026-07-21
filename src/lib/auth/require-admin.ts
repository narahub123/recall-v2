import { redirect } from "next/navigation";
import { getCurrentUser } from "./auth-user";
import { USER_ROLE } from "@/constants/user";
import { ROUTES } from "@/constants/routes";

export async function requireAdmin() {
  const user = await getCurrentUser();

  if (user.role !== USER_ROLE.ADMIN) {
    redirect(ROUTES.HOME);
  }

  return user;
}

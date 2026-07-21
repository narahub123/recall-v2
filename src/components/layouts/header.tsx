import Link from "next/link";

import { auth } from "@/auth";

import { LoginLink } from "@/components/auth/login-link";
import { UserMenu } from "@/components/auth/user-menu";
import { ROUTES } from "@/constants/routes";

export async function Header() {
  const session = await auth();

  return (
    <header className="border-b">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
        <Link href={ROUTES.HOME} className="text-xl font-bold tracking-tight">
          recall
        </Link>

        <div>{session?.user ? <UserMenu /> : <LoginLink />}</div>
      </div>
    </header>
  );
}

import Link from "next/link";

import { auth } from "@/auth";

import { LoginLink } from "@/components/auth/login-link";
import { UserMenu } from "@/components/auth/user-menu";

export async function Header() {
  const session = await auth();

  return (
    <header className="border-b">
      <div className="flex h-16 items-center justify-between px-6">
        <Link href="/" className="font-bold">
          recall
        </Link>

        <nav>{session?.user ? <UserMenu /> : <LoginLink />}</nav>
      </div>
    </header>
  );
}

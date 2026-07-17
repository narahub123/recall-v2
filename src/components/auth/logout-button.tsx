"use client";

import { signOut } from "next-auth/react";

export function LogoutButton() {
  return (
    <button className="w-full text-left" onClick={() => signOut()}>
      Sign out
    </button>
  );
}

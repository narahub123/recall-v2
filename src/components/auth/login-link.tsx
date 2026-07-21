"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

export function LoginLink() {
  const router = useRouter();

  return <Button onClick={() => router.push(ROUTES.LOGIN)}>Login</Button>;
}

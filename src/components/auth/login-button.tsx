"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";

interface LoginButtonProps {
  provider: string;
  label: string;
  icon?: string;
}

export function LoginButton({ provider, label, icon }: LoginButtonProps) {
  return (
    <Button className="w-full" onClick={() => signIn(provider)}>
      {icon && <Image src={icon} alt="" width={18} height={18} />}

      {label}
    </Button>
  );
}

import { LoginButton } from "@/components/auth/login-button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
      <Card className="w-95">
        <CardHeader>
          <CardTitle>Welcome to recall</CardTitle>

          <CardDescription>Sign in to continue</CardDescription>
        </CardHeader>

        <CardContent>
          <LoginButton
            provider="google"
            label="Continue with Google"
            icon="/images/oauth-logos/google.webp"
          />
        </CardContent>
      </Card>
    </main>
  );
}

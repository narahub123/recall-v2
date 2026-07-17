import { LoginButton } from "@/components/auth/login-button";

export default function LoginPage() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
      <div className="flex w-full max-w-sm flex-col items-center gap-6 rounded-lg border p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Welcome to recall</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to continue
          </p>
        </div>

        <LoginButton />
      </div>
    </main>
  );
}

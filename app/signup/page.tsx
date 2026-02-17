"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button"; // shadcn Button
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaGoogle, FaGithub } from "react-icons/fa";

export default function AuthButtons() {
  const { data: session, status } = useSession();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg border border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            {status === "authenticated" ? "Welcome!" : "Sign In"}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {status === "authenticated" && session.user ? (
            <>
              <p className="text-center text-gray-700">
                Signed in as{" "}
                <span className="font-medium">{session.user.email}</span>
              </p>
              <Button
                variant="outline"
                onClick={() => signOut()}
                className="w-full"
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="default"
                onClick={() => signIn("google")}
                className="w-full flex items-center justify-center gap-2"
              >
                <FaGoogle className="size-4" />
                {/* Optional Google icon */}
                Sign in with Google
              </Button>

              <Button
                variant="secondary"
                onClick={() => signIn("github")}
                className="w-full flex items-center justify-center gap-2"
              >
                {/* Optional GitHub icon */}
                <FaGithub className="size-4" />
                Sign in with GitHub
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

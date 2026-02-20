import Link from "next/link";
import { AuthUserNav } from "@/components/auth-user-nav";
import { auth } from "@/lib/auth";

export async function Navbar() {
  const session = await auth();

  return (
    <header className="border-b bg-background">
      <div className="flex h-16 items-center justify-between w-full px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            MyApp
          </Link>

          {/* LEFT SIDE */}
          {session?.user && (
            <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
              <Link
                href="/dashboard"
                className="hover:text-foreground transition-colors"
              >
                Dashboard
              </Link>

              <Link
                href="/pricing"
                className="hover:text-foreground transition-colors"
              >
                Pricing
              </Link>

              <Link
                href="/settings"
                className="hover:text-foreground transition-colors"
              >
                Settings
              </Link>
            </nav>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          <AuthUserNav />
        </div>
      </div>
    </header>
  );
}

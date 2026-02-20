"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<string | null>(null);
  const [oAuthError, setOAuthError] = useState<string[]>([]);

  async function handleCredentials(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setOAuthError([]);
    setLoading("credentials");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(null);

    if (res?.error) {
      if (res.code?.includes("oauth:")) {
        const providers = res.code.replace("oauth:", "").split(",");
        setOAuthError(providers);
      } else {
        setError("Invalid email or password.");
      }
    } else {
      router.push("/");
    }
  }

  async function handleOAuth(provider: "github" | "google") {
    setLoading(provider);
    await signIn(provider, { callbackUrl: "/" });
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 mb-4">
            <svg
              className="w-5 h-5 text-zinc-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-white tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-zinc-500 mt-1">Sign in to your account</p>
        </div>

        {/* Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-xl">
          {/* OAuth buttons */}
          <div className="flex flex-col gap-3 mb-6">
            <button
              onClick={() => handleOAuth("github")}
              disabled={!!loading}
              className="flex items-center justify-center gap-3 w-full px-4 py-2.5 rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-200 text-sm font-medium hover:bg-zinc-700 hover:border-zinc-600 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading === "github" ? (
                <span className="w-4 h-4 border-2 border-zinc-500 border-t-zinc-200 rounded-full animate-spin" />
              ) : (
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              )}
              Continue with GitHub
            </button>

            <button
              onClick={() => handleOAuth("google")}
              disabled={!!loading}
              className="flex items-center justify-center gap-3 w-full px-4 py-2.5 rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-200 text-sm font-medium hover:bg-zinc-700 hover:border-zinc-600 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading === "google" ? (
                <span className="w-4 h-4 border-2 border-zinc-500 border-t-zinc-200 rounded-full animate-spin" />
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              )}
              Continue with Google
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-zinc-800" />
            <span className="text-xs text-zinc-600 uppercase tracking-widest">
              or
            </span>
            <div className="flex-1 h-px bg-zinc-800" />
          </div>

          {/* Credentials form */}
          <form onSubmit={handleCredentials} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-xs font-medium text-zinc-400 uppercase tracking-wider"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2.5 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-xs font-medium text-zinc-400 uppercase tracking-wider"
                >
                  Password
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2.5 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-colors"
              />
            </div>

            {/* Generic error */}
            {error && (
              <p className="text-xs text-red-400 bg-red-950/50 border border-red-900/50 rounded-lg px-3 py-2.5">
                {error}
              </p>
            )}

            {/* OAuth conflict banner */}
            {oAuthError.length > 0 && (
              <div className="flex flex-col gap-3 bg-amber-950/40 border border-amber-900/50 rounded-lg px-3 py-3">
                <div className="flex gap-2 items-start">
                  <svg
                    className="w-4 h-4 text-amber-500 mt-0.5 shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                  </svg>
                  <p className="text-xs text-amber-300 leading-relaxed">
                    This email is linked to{" "}
                    {oAuthError.map((p, i) => (
                      <span key={p}>
                        <span className="font-semibold capitalize text-amber-200">
                          {p}
                        </span>
                        {i < oAuthError.length - 1 ? " and " : ""}
                      </span>
                    ))}
                    . Password sign in is not available for this account.
                  </p>
                </div>

                <div className="flex flex-col gap-1.5">
                  {oAuthError.includes("github") && (
                    <button
                      type="button"
                      onClick={() => handleOAuth("github")}
                      disabled={!!loading}
                      className="flex items-center justify-center gap-2 w-full px-3 py-2 rounded-md border border-zinc-600 bg-zinc-800 text-zinc-200 text-xs font-medium hover:bg-zinc-700 transition-all disabled:opacity-50"
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      Continue with GitHub instead
                    </button>
                  )}
                  {oAuthError.includes("google") && (
                    <button
                      type="button"
                      onClick={() => handleOAuth("google")}
                      disabled={!!loading}
                      className="flex items-center justify-center gap-2 w-full px-3 py-2 rounded-md border border-zinc-600 bg-zinc-800 text-zinc-200 text-xs font-medium hover:bg-zinc-700 transition-all disabled:opacity-50"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      Continue with Google instead
                    </button>
                  )}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={!!loading}
              className="w-full py-2.5 rounded-lg bg-white text-zinc-900 text-sm font-semibold hover:bg-zinc-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-1"
            >
              {loading === "credentials" && (
                <span className="w-4 h-4 border-2 border-zinc-400 border-t-zinc-900 rounded-full animate-spin" />
              )}
              Sign in
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-zinc-600 mt-6">
          No account yet?{" "}
          <Link
            href="/auth/signup"
            className="text-zinc-400 hover:text-white transition-colors font-medium"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}

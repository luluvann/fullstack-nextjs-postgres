import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth();
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      {session?.user ? (
        <div className="text-lg text-zinc-500">
          Signed in as {session.user.email}
        </div>
      ) : (
        <div className="text-lg text-zinc-500">Not signed in</div>
      )}
    </div>
  );
}

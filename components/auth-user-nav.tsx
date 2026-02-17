"use client";

import { useSession, signOut, signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export function AuthUserNav() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />;
  }

  if (status === "authenticated" && session?.user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <Avatar className="cursor-pointer">
            <AvatarImage src={session.user.image ?? ""} />
            <AvatarFallback>
              {session.user.email?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem className="text-muted-foreground text-sm">
            {session.user.email}
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem>Profile</DropdownMenuItem>

          <DropdownMenuItem>Settings</DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => signOut()}
            className="text-red-500 focus:text-red-500"
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button onClick={() => signIn()} size="sm">
      Login
    </Button>
  );
}

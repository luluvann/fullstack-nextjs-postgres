import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import prisma from "./prisma";
import bcrypt from "bcrypt";
import { z } from "zod";
import { CredentialsSignin } from "next-auth";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(2),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin",
  },
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      name: "Email",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "you@example.com",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        // ✅ Credentials validation with zod
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        // 1️⃣ Find user by email
        const user = await prisma.user.findUnique({
          where: { email },
          include: { accounts: true }, // ✅ fetch linked OAuth accounts
        });

        if (!user) return null;

        // ✅ User exists but signed up via OAuth, has no password
        if (!user.hashedPassword) {
          const providers = user.accounts.map((a) => a.provider);
          class OAuthConflictError extends CredentialsSignin {
            code = `oauth:${providers.join(",")}`;
          }

          throw new OAuthConflictError();
        }

        // 2️⃣ Compare password
        const isValid = await bcrypt.compare(password, user.hashedPassword);
        if (!isValid) return null;

        // 3️⃣ Return user object
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      // Only check OAuth sign-ins
      if (account?.provider === "credentials") return true;

      // Check if a user with this email already exists with a password (credentials account)
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email! },
        include: { accounts: true },
      });

      if (!existingUser) return true; // new user, allow

      const hasCredentialsAccount = existingUser.accounts.some(
        (a) => a.provider === "credentials",
      );

      // ✅ If they signed up with credentials, block OAuth sign-in
      if (existingUser.hashedPassword || hasCredentialsAccount) {
        return `/auth/signin?error=credentials_conflict`;
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

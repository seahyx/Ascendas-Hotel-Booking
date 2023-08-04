import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcryptjs";
import NextAuth, { type AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
// import { type authOptions } from "~/server/auth";

const loginUserSchema = z.object({
  email: z.string(),

  password: z
    .string()
    .min(4, "Password should have at least a minimum of 5 character"),
});

const prisma = new PrismaClient();

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: "text", placeholder: "test@test.com" },
        password: { type: "password", placeholder: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = loginUserSchema.parse(credentials);
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) return null;

        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const isPassValid = await bcrypt.compare(password, user.password);

        if (!isPassValid) return null;

        return user;
      },
    }),
  ],

  callbacks: {
    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.name = token.name;
      return session;
    },
    jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = user.id;
        token.name = (user as User).name;
      }

      return token;
    },
  },

  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.JWT_SECRET,
};

export default NextAuth(authOptions);

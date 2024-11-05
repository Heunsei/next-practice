import { db, accounts, sessions, users, verificationTokens } from "@/db/schema";
import Credentials from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import GitHub from "next-auth/providers/github";
import NextAuth from "next-auth";
import mysql, { ConnectionOptions } from "mysql2";
import executeQuery from "@/public/utils/database";

const access: ConnectionOptions = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_AUTH_NAME,
  password: process.env.DB_PASSWORD,
  dateStrings: true,
  port: 3306,
};

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub,
    Credentials({
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      authorize: async (credentials) => {
        const user = await executeQuery(
          `SELECT * FROM account WHERE email="${credentials.email}"`
        );
        if (!user) {
          throw new Error("invalid");
        }
        return user;
      },
    }),
  ],
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  secret: process.env.NEXTAUTH_SECRET,
});

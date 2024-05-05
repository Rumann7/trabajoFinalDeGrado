import { connectDB } from "@/libs/mongodb";
import User from "@/models/usuario";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Username", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password", placeholder: "*****" },
      },
      async authorize(credentials, req) {
        await connectDB();
        console.log(credentials);

        const userFound = await User.findOne({
          email: credentials?.email,
        }).select("+password");
        if (!userFound) throw new Error("Invalid credentials");

        const passwordMatch = await bcrypt.compare(
          credentials!.password,
          userFound.password
        );
        if (!passwordMatch) throw new Error("Invalid passowrd");

        console.log(userFound);

        return userFound;
      },
    }),
  ],
  callbacks: {
    jwt({ account, token, user, profile, session }) {
      if (user) token.user = user;
      return token;
    },
    session({ session, token }) {
      return session;
    },
  },
});

export { handler as GET, handler as POST };

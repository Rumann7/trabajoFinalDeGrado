import { connectDB } from "@/libs/mongodb";
import User from "@/models/usuario";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credenciales",
      credentials: {
        email: { label: "Username", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          await connectDB();

          const userFound = await User.findOne({
            email: credentials?.email,
          }).select("+password");
          if (!userFound) {
            console.error("User not found with email:", credentials?.email);
            throw new Error("Credenciales inválidas");
          }

          const passwordMatch = await bcrypt.compare(
            credentials!.password,
            userFound.password
          );
          if (!passwordMatch) { 
            console.error("Invalid password for user:", credentials?.email);
            throw new Error("Contraseña inválida");
          }

          return userFound;
        } catch (error) {
          console.error("Error during authorization:", error);
          throw new Error("Internal server error");
        }
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    session({ session, token }) {
      return session;
    },
  },
});

export { handler as GET, handler as POST };

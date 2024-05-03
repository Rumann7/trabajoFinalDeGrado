import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        // `credentials` is used to generate a form on the sign in page.
        // You can specify which fields should be submitted, by adding keys to the `credentials` object.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                username: { label: "Username", type: "email", placeholder: "jsmith" },
                password: { label: "Password", type: "password", placeholder: "*****"}
            },
            authorize(credentials, req){
                const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
                return user;
            }
        }
    )]
});

export {handler as GET, handler as POST}
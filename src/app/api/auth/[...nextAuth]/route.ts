import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";


const handler = NextAuth({
    providers:[
        GoogleProvider({
            clientId:process.env.NEXT_ID_USER_GOOGLE as string,
            clientSecret:process.env.NEXT_USER_GOOGLE as string,
        }),
    ],
})



export {handler as GET, handler as POST};
import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import MongoClientPromise from "../../../lib/mongodb"

const THIRTY_DAYS = 30 * 24 * 60 * 60
const THIRTY_MINUTES = 30 * 60

export const authOptions: NextAuthOptions = {

    secret: process.env.SECRET as string,

    // session.
    session: {
        strategy: 'jwt',
        maxAge: THIRTY_DAYS,
        updateAge: THIRTY_MINUTES
    },
    
    // MongoDB adapter.
    adapter: MongoDBAdapter(MongoClientPromise),

    // Configure one or more authentication providers.
    providers: [
      GithubProvider({
        clientId: process.env.GITHUB_ID as string, 
        clientSecret: process.env.GITHUB_SECRET as string,
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_ID as string,
        clientSecret: process.env.GOOGLE_SECRET as string
      })
    ],
    debug: true
}

export default NextAuth(authOptions)
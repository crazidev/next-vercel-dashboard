import { DrizzleAdapter } from '@auth/drizzle-adapter';
import NextAuth from 'next-auth';
import Credentials from "next-auth/providers/credentials"
// import { db } from './db';

export const { handlers, signIn, signOut, auth } = NextAuth({
  // adapter: DrizzleAdapter(db),
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      }, 
      authorize(credentials, request) {
        return {};
      },
      
    })
  ]
});

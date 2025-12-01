/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import get from 'lodash.get';
import Credentials from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'text' },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.username || !credentials?.password) {
            return null;
          }

          // Confirm phone with code
          const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, {
            username: credentials.username,
            password: credentials.password,
          });

          if (response.status === 200) {
            return {
              id: get(response, 'data.result.id', ''),
              username: credentials?.username,
              accessToken: get(response, 'data.result.access_token', ''),
              email: get(response, 'data.result.email', ''),
              fullname: get(response, 'data.result.fullname', ''),
            };
          }

          return null;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.accessToken = user.accessToken;
        token.id = user.id;
        token.email = user.email;
        token.fullname = user.fullname;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.accessToken = token.accessToken as string;
      session.id = token.id as string;
      session.email = token.email as string;
      session.fullname = token.fullname as string;
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/login',
  },
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  debug: process.env.NODE_ENV === 'development',
};

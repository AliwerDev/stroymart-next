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

          const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/admin/sign`, {
            username: credentials.username,
            password: credentials.password,
          });

          console.log({ response });

          if (response.status === 200) {
            return {
              id: credentials?.username,
              username: credentials?.username,
              email: '',
              fullname: credentials?.username,
              accessToken: get(response, 'data.accessToken', ''),
              refreshToken: get(response, 'data.refreshToken', ''),
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
        token.refreshToken = user.refreshToken;
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
        token.fullname = user.fullname;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      session.id = token.id as string;
      session.username = token.username as string;
      session.email = token.email as string;
      session.fullname = token.fullname as string;
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/login-management',
  },
};

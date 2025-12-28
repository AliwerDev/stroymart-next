/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import Credentials from 'next-auth/providers/credentials';
import type { UserType } from '../../types/next-auth';

export const authOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'text' },
        user_type: { label: 'User Type', type: 'text' },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.username || !credentials?.password) {
            return null;
          }

          const userType = (credentials?.user_type || 'admin') as UserType;
          let endpoint = `${process.env.NEXT_PUBLIC_API_URL}/auth/admin/sign`;
          let requestBody: any = {
            username: credentials.username,
            password: credentials.password,
          };

          if (userType === 'seller') {
            endpoint = `${process.env.NEXT_PUBLIC_API_URL}/seller/confirm`;
            requestBody = {
              phoneNumber: credentials.username,
              code: credentials.password,
            };
          }

          const response = await axios.post(endpoint, requestBody);

          console.log({ endpoint, userType, response: response.data });

          if (response.status === 200 && response.data?.accessToken) {
            return {
              id: credentials?.username,
              username: credentials?.username,
              email: '',
              fullname: credentials?.username,
              user_type: userType,
              accessToken: response.data.accessToken,
              refreshToken: response.data.refreshToken,
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
        token.user_type = user.user_type || 'admin';
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
      session.user_type = token.user_type as UserType;
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/login',
  },
};

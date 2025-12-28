import 'next-auth';
import 'next-auth/jwt';

export type UserType = 'admin' | 'seller';

declare module 'next-auth' {
  interface Session {
    accessToken: string;
    refreshToken: string;
    id: string;
    username: string;
    email: string;
    fullname: string;
    user_type: UserType;
    roles?: string[];
    user: unknown;
  }

  interface User {
    id: string;
    username: string;
    email: string;
    fullname: string;
    user_type: UserType;
    roles?: string[];
    accessToken: string;
    refreshToken: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string;
    refreshToken: string;
    id: string;
    username: string;
    email: string;
    fullname: string;
    user_type: UserType;
    roles?: string[];
  }
}

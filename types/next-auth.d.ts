import 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken: string;
    id: string;
    email: string;
    fullname: string;
    user: unknown;
    username: string;
  }
  interface User {
    id: string;
    email: string;
    fullname: string;
    accessToken: string;
    username: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string;
    id: string;
    email: string;
    fullname: string;
    username: string;
  }
}

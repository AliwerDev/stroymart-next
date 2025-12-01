export default interface IUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  token: string;
  avatar?: string;
}

export interface LoginFormValues {
  username: string;
  password: string;
}

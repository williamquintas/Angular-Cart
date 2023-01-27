export interface IUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  gender: string;
  image: string;
  token?: string;
  role?: UserRole;
}

export enum UserRole {
  ADMIN = "Admin",
  COMMON = "Common",
}

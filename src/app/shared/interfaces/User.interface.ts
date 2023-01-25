export interface IUser {
  id: number;
  name: string;
  role: UserRole;
}

export enum UserRole {
  ADMIN = "Admin",
  COMMON = "Common",
}

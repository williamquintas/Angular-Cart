export interface IUser {
  id: number;
  email: string;
  phoneNumber?: string;
  firstName: string;
  lastName: string;
  username: string;
  gender: string;
  image: string;
  token?: string;
  role?: UserRole;
  addresses?: IUserAddress[];
}

export enum UserRole {
  ADMIN = "Admin",
  COMMON = "Common",
}

export interface IUserAddress {
  zipcode: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
}

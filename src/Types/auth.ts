import type { User } from "./user";

export type RegisterData = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type AuthResponse = {
  user: User;
};

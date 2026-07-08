import { createContext } from "react";

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

export type AuthContextValue = {
  user: User | null;
  isAuth: boolean;
  login: (user: User) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

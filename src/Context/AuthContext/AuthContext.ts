import { createContext } from "react";
import type { User } from "../../Types/user";

export type AuthContextValue = {
  user: User | null;
  isAuth: boolean;
  login: (user: User) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

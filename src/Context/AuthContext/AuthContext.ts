import { createContext } from "react";

import type { LoginData, RegisterData } from "../../Types/auth";
import type { User } from "../../Types/user";

export type AuthContextValue = {
  user: User | null;
  isAuth: boolean;
  isLoading: boolean;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

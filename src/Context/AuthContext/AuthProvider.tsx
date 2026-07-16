import { useEffect, useState, type ReactNode } from "react";

import { AuthContext, type AuthContextValue } from "./AuthContext";
import type { User } from "../../Types/user";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../../Api/authApi";
import type { LoginData, RegisterData } from "../../Types/auth";

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        const response = await getCurrentUser();

        setUser(response.user);
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadCurrentUser();
  }, []);

  const login = async (data: LoginData) => {
    const response = await loginUser(data);

    setUser(response.user);
  };

  const register = async (data: RegisterData) => {
    const response = await registerUser(data);

    setUser(response.user);
  };

  const logout = async () => {
    await logoutUser();

    setUser(null);
  };

  const value: AuthContextValue = {
    user,
    isAuth: user !== null,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

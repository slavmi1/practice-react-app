import type { ReactNode } from "react";
import { Navigate } from "react-router";

import { useAuth } from "../../../Context/AuthContext/useAuth";

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuth } = useAuth();

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

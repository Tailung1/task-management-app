import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuthContext from "../../../contexts/AuthContext";

export default function RequireAuth({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuthContext();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace state={{ from: location }} />;
  }

  return children;
}

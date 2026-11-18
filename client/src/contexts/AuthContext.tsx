import { createContext, useContext, type ReactNode, type SetStateAction, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { AUTH_SESSION_EXPIRED_EVENT } from "../api/clientApi";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<SetStateAction<boolean>>;
  sessionExpired: boolean;
  setSessionExpired: React.Dispatch<SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem("token"));
  const [sessionExpired, setSessionExpired] = useState(false);

  useEffect(() => {
    function handleSessionExpired() {
      if (!localStorage.getItem("token")) return;

      localStorage.removeItem("token");
      queryClient.clear();
      setIsAuthenticated(false);
      setSessionExpired(true);
    }

    window.addEventListener(AUTH_SESSION_EXPIRED_EVENT, handleSessionExpired);
    return () => window.removeEventListener(AUTH_SESSION_EXPIRED_EVENT, handleSessionExpired);
  }, [queryClient]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, sessionExpired, setSessionExpired }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used inside AuthProvider");
  }

  return context;
};

export default useAuthContext;

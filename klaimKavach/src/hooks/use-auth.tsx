import { useState, createContext, useContext, useEffect, ReactNode } from "react";

interface AuthContextType {
  user: string | null;
  isAuthenticated: boolean;
  login: (name: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("klaimkavach_user");
    }
    return null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return !!localStorage.getItem("klaimkavach_user");
    }
    return false;
  });

  const login = (name: string) => {
    localStorage.setItem("klaimkavach_user", name);
    setUser(name);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("klaimkavach_user");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

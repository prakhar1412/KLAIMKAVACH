import { useState, useEffect } from "react";

export function useAuth() {
  const [user, setUser] = useState<string | null>(() => {
    return localStorage.getItem("klaimkavach_user");
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem("klaimkavach_user");
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

  return { user, isAuthenticated, login, logout };
}

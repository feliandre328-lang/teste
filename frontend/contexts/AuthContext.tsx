import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { apiGet, apiPost, ensureCsrfCookie } from "../lib/api";

type AuthUser = {
  username: string;
  email?: string;
};

type AuthState = {
  loading: boolean;
  isAuthenticated: boolean;
  user: AuthUser | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<AuthUser | null>(null);

  const refresh = async () => {
    setLoading(true);
    try {
      const me = await apiGet("/api/me/");
      if (me?.ok) setUser(me.user);
      else setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await ensureCsrfCookie();
      await refresh();
    })();
  }, []);

  const login = async (username: string, password: string) => {
    await ensureCsrfCookie();
    const data = await apiPost("/api/login/", { username, password });
    setUser(data.user);
  };

  const logout = async () => {
    await ensureCsrfCookie();
    await apiPost("/api/logout/", {});
    setUser(null);
  };

  const value = useMemo(() => ({
    loading,
    isAuthenticated: Boolean(user),
    user,
    login,
    logout,
  }), [loading, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi } from '@/lib/api';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'ADMIN' | 'PROFESSOR' | 'STUDENT';
}

interface AuthCtx {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthCtx>({} as AuthCtx);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('edtech_auth');
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed.user);
      setToken(parsed.accessToken);
    }
    setLoading(false);
  }, []);

  const persist = (data: any) => {
    setUser(data.user);
    setToken(data.accessToken);
    localStorage.setItem('edtech_auth', JSON.stringify(data));
  };

  const login = async (email: string, password: string) => {
    const data = await authApi.login(email, password);
    persist(data);
  };

  const register = async (formData: any) => {
    const data = await authApi.register(formData);
    persist(data);
  };

  const logout = () => {
    if (token) authApi.logout(token).catch(() => {});
    setUser(null);
    setToken(null);
    localStorage.removeItem('edtech_auth');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

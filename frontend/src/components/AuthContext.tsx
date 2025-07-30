'use client'

import { createContext, useContext, useEffect, useState } from 'react';
import { User, Login, SignUp } from '@/lib/types';
import { loginAPI, registerAPI } from '@/services/AuthService';

interface AuthContextType {
  user: User | null;
  login: (credentials: Login) => void;
  register: (credentials: SignUp) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;

  const login = async (credentials: Login) => {
    const data = await loginAPI(credentials);
    console.log("Login response:", data);
    setUser(data);
  };

  const register = async (credentials: SignUp) => {
    const data = await registerAPI(credentials);
    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ _id: '', name: '', email: '', isAdmin: false, token });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

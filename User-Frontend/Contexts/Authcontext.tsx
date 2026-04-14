import { createContext } from 'react'
import { useContext } from 'react';

export type AuthContextType = {
  isAuthenticated: boolean;
  login: (form: { Username: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  user?: unknown;
}

export const Authcontext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(Authcontext);
  return context;
};

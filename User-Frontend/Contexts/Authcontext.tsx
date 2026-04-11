import { createContext } from 'react'

export type AuthContextType = {
  login: () => void
}

export const Authcontext = createContext<AuthContextType | null>(null);

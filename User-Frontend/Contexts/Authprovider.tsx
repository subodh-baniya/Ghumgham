import React from 'react'
import { Authcontext } from './Authcontext'

export const Authprovider = ({ children }: { children: React.ReactNode }) => {
  const login = () => {
    
  }

  return (
    <Authcontext.Provider value={{ login }}>
      {children}
    </Authcontext.Provider>
  )
}


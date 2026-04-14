import React, { useState } from 'react'
import { Authcontext } from './Authcontext'
import axios from "axios";



export const Authprovider = ({ children }: { children: React.ReactNode }) => {

  const [user,setUser]=useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (form: { Username: string; password: string }) => {
    const res = await axios.post(
      `${import.meta.env.VITE_AUTH_API_BASE_URL}/login`,
      form,
      { withCredentials: true }
    );

    setUser(res.data.data); 
    setIsAuthenticated(true);
  };

  const logout = async () => {
    setUser(undefined);
    setIsAuthenticated(false);
  };

  return (
    <Authcontext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </Authcontext.Provider>
  )
}



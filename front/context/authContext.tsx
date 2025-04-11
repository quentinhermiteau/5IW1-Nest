"use client";

import { createContext, useEffect, useState } from "react";

interface AuthContextType {
  user: null | any; // Replace 'any' with your actual user type
  setUser: (user: any) => void; // Replace 'any' with your actual user type
}

export const authContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthContextType["user"]>(null);

  useEffect(() => {
    const token = window.localStorage.getItem("token");

    setUser(token ?? "");
  }, []);

  return (
    <authContext.Provider value={{ user, setUser }}>
      {children}
    </authContext.Provider>
  );
};

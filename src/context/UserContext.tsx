"use client";

import React, { useState, useMemo, createContext, useContext } from "react";

interface UserContextType {
  usuario: any;
  setUsuario: React.Dispatch<React.SetStateAction<any>>;
  cargando: boolean;
  setCargando: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserContextProvider(props: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<any>(null);
  const [cargando, setCargando] = useState<boolean>(true);

  const value = useMemo(() => ({ usuario, setUsuario, cargando, setCargando }), [usuario, cargando]);

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
}

export function useUserContext(): UserContextType {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
}
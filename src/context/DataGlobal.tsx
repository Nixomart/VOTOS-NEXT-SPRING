"use client";

import React, { useState, createContext } from "react";
export const Consult = createContext<any | null>(null);

export function DataProvider(props:any) {
  const [data, setData] = useState<any>(null);
  return (
    <Consult.Provider value={{data, setData}}>{props.children}</Consult.Provider>
  );
}

export function useDataContext() {
  const context = React.useContext(Consult);
  if (context === undefined) {
    throw new Error("useConsult must be used within a UserContextProvider");
  }
  return context;
}
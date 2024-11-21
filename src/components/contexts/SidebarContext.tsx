"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SidebarContextProps {
  isMinimized: boolean;
  toggle: () => void;
}

const SidebarContext = createContext<SidebarContextProps | null>(null);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isMinimized, setIsMinimized] = useState(false);

  const toggle = () => setIsMinimized((prevState) => !prevState);

  return (
    <SidebarContext.Provider value={{ isMinimized, toggle }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};
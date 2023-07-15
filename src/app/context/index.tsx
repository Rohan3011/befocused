"use client";

import React from "react";
import { TimerContext } from "./timer";

interface ContextProviderProps {
  children?: React.ReactNode;
}

export default function ContextProvider({ children }: ContextProviderProps) {
  return (
    <>
      <TimerContext.Provider value={0}>{children}</TimerContext.Provider>
    </>
  );
}

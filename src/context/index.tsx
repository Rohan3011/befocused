"use client";

import React from "react";
import { FocusTimerContext } from "./focus-timer";
import { BreakTimerContext } from "./break-timer";

interface ContextProviderProps {
  children?: React.ReactNode;
}

export default function ContextProvider({ children }: ContextProviderProps) {
  const [focusTimer, setFocusTimer] = React.useState(25 * 60);
  const [breakTimer, setBreakTimer] = React.useState(5 * 60);

  function handleFocusTimer(val: number) {
    setFocusTimer(val);
  }

  function handleBreakTimer(val: number) {
    setBreakTimer(val);
  }

  return (
    <>
      <FocusTimerContext.Provider value={{ focusTimer, handleFocusTimer }}>
        <BreakTimerContext.Provider value={{ breakTimer, handleBreakTimer }}>
          {children}
        </BreakTimerContext.Provider>
      </FocusTimerContext.Provider>
    </>
  );
}

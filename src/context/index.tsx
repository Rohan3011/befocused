"use client";

import React from "react";

import { SettingsContext } from "./settings";

interface ContextProviderProps {
  children?: React.ReactNode;
}

export default function ContextProvider({ children }: ContextProviderProps) {
  const [focusTimer, setFocusTimer] = React.useState(25);
  const [breakTimer, setBreakTimer] = React.useState(5);
  const [isAudioEnabled, setIsAudioEnabled] = React.useState(true);

  function handleFocusTimer(e: React.ChangeEvent<HTMLInputElement>) {
    const newMinutes = parseInt(e.target.value, 10);
    setFocusTimer(newMinutes);
  }

  function handleBreakTimer(e: React.ChangeEvent<HTMLInputElement>) {
    const newMinutes = parseInt(e.target.value, 10);
    setBreakTimer(newMinutes);
  }

  function toggleAudio() {
    setIsAudioEnabled(!isAudioEnabled);
  }

  return (
    <>
      <SettingsContext.Provider
        value={{
          focusTimer,
          handleFocusTimer,
          breakTimer,
          handleBreakTimer,
          isAudioEnabled,
          toggleAudio,
        }}
      >
        {children}
      </SettingsContext.Provider>
    </>
  );
}

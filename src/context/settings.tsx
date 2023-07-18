"use client";

import React from "react";

interface ISettingsContext {
  focusTimer: number;
  handleFocusTimer: (e: React.ChangeEvent<HTMLInputElement>) => void;
  breakTimer: number;
  handleBreakTimer: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isAudioEnabled: boolean;
  toggleAudio: () => void;
}

const initialState = {
  focusTimer: 25,
  handleFocusTimer: () => {},
  breakTimer: 5,
  handleBreakTimer: () => {},
  isAudioEnabled: true,
  toggleAudio: () => {},
} satisfies ISettingsContext;

export const SettingsContext =
  React.createContext<ISettingsContext>(initialState);

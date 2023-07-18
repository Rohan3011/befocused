"use client";

import React from "react";

interface FocusTimerProps {
  focusTimer: number;
  handleFocusTimer: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const initialState = {
  focusTimer: 25,
  handleFocusTimer: () => {},
} satisfies FocusTimerProps;

export const FocusTimerContext =
  React.createContext<FocusTimerProps>(initialState);

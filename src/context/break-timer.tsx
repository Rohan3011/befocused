"use client";

import React from "react";

interface BreakTimerProps {
  breakTimer: number;
  handleBreakTimer: (val: number) => void;
}

const initialState = {
  breakTimer: 5,
  handleBreakTimer: () => {},
} satisfies BreakTimerProps;

export const BreakTimerContext =
  React.createContext<BreakTimerProps>(initialState);

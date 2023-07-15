"use client";
import React from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import { cn } from "~/lib/utils";

interface CircularProgressProps {
  percentage: number;
  children?: React.ReactNode;
}

export default function CircularProgress({
  percentage,
  children,
}: CircularProgressProps) {
  React.useEffect(() => console.log("percentage: ", percentage), [percentage]);

  return (
    <CircularProgressbarWithChildren
      className="w-[200px] h-[200px]"
      value={percentage}
      styles={buildStyles({
        // Rotation of path and trail, in number of turns (0-1)
        rotation: 0,

        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
        strokeLinecap: "butt",

        // Text size
        textSize: "16px",

        // How long animation takes to go from one percentage to another, in seconds
        pathTransitionDuration: 0.5,

        // Can specify path transition in more detail, or remove it entirely
        // pathTransition: 'none',
      })}
    >
      {children}
    </CircularProgressbarWithChildren>
  );
}

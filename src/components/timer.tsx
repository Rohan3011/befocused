"use client";

import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import CircularProgress from "./circular-progress";
import useAudioNotification from "~/hooks/audio-notification";

interface TimerProps {
  mode: "Focus" | "Break";
  timer: number;
}

const Timer: React.FC<TimerProps> = ({ mode, timer }) => {
  const [leftSeconds, setLeftSeconds] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const playStartSound = useAudioNotification({
    audioFile: "/assets/audio/start.mp3",
  });
  const playStopSound = useAudioNotification({
    audioFile: "/assets/audio/stop.mp3",
  });
  const playAlarmSound = useAudioNotification({
    audioFile: "/assets/audio/clock-alarm.mp3",
  });

  useEffect(() => {
    setLeftSeconds(timer * 60);
  }, [timer]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isRunning) return;
      if (leftSeconds > 0) {
        setLeftSeconds((prevSeconds) => prevSeconds - 1);
      } else {
        clearInterval(interval);
        playAlarmSound();
        setIsRunning(false);
      }
      const currentPercentage = (leftSeconds / (timer * 60)) * 100;
      setPercentage(currentPercentage);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, leftSeconds, isRunning, playAlarmSound]);

  const handleStartClick = () => {
    setPercentage(0);
    setIsRunning(true);
    playStartSound();
  };

  const handleStopClick = () => {
    setIsRunning(false);
    playStopSound();
  };

  const formatTime = (time: number): string => {
    return time.toString().padStart(2, "0");
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <CircularProgress percentage={percentage}>
        <div className="font-sans text-2xl text-center text-primary">
          {formatTime(Math.floor(leftSeconds / 60))}:
          {formatTime(leftSeconds % 60)}
        </div>
      </CircularProgress>
      {isRunning ? (
        <div className="mt-4 flex flex-col sm:flex-row gap-4">
          <Button variant="destructive" size="lg" onClick={handleStopClick}>
            Stop
          </Button>
        </div>
      ) : (
        <div className="mt-4 flex flex-col sm:flex-row gap-4">
          <Button size="lg" onClick={handleStartClick}>
            Start
          </Button>
        </div>
      )}
    </div>
  );
};

export default Timer;

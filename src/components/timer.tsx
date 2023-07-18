import React, { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import CircularProgress from "./circular-progress";
import useAudioNotification from "~/hooks/audio-notification";

interface TimerProps {
  defaultTime: number;
  handleTimer: (val: number) => void;
}

const Timer: React.FC<TimerProps> = ({ defaultTime, handleTimer }) => {
  const [remainingSeconds, setRemainingSeconds] = useState(defaultTime);
  const [isRunning, setIsRunning] = useState(false);
  const [percentage, setPercentage] = useState(0);

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
    let interval: NodeJS.Timeout | null = null;

    const tick = () => {
      setRemainingSeconds((prevRemainingSeconds) => prevRemainingSeconds - 1);
    };

    if (isRunning) {
      interval = setInterval(tick, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning]);

  useEffect(() => {
    const elapsedPercentage =
      ((defaultTime - remainingSeconds) / defaultTime) * 100;
    setPercentage(elapsedPercentage);

    if (remainingSeconds === 0 && isRunning) {
      setIsRunning(false);
      playAlarmSound();
    }
  }, [defaultTime, remainingSeconds, isRunning, playAlarmSound]);

  const handleStartClick = () => {
    if (remainingSeconds > 0) {
      setIsRunning(true);
      playStartSound();
      console.time("timer");
    }
  };

  const handleStopClick = () => {
    handleTimer(remainingSeconds);
    setIsRunning(false);
    playStopSound();
  };

  const handleSetMinutes = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMinutes = parseInt(e.target.value, 10);
    setRemainingSeconds((prevRemainingSeconds) => {
      const newRemainingSeconds = newMinutes * 60 + (prevRemainingSeconds % 60);
      return isNaN(newRemainingSeconds) || newRemainingSeconds < 0
        ? prevRemainingSeconds
        : newRemainingSeconds;
    });
  };

  const handleSetSeconds = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSeconds = parseInt(e.target.value, 10);
    setRemainingSeconds((prevRemainingSeconds) => {
      const newRemainingSeconds =
        Math.floor(prevRemainingSeconds / 60) * 60 + newSeconds;
      return isNaN(newRemainingSeconds) || newRemainingSeconds < 0
        ? prevRemainingSeconds
        : newRemainingSeconds;
    });
  };

  const formatTime = (time: number): string => {
    return time.toString().padStart(2, "0");
  };

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  return (
    <div className="flex flex-col items-center justify-center">
      <CircularProgress percentage={percentage}>
        <div className="font-sans text-2xl text-center text-primary">
          {formatTime(minutes)}:{formatTime(seconds)}
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
          <Input
            className="w-20"
            type="number"
            value={minutes}
            onChange={handleSetMinutes}
            placeholder="min"
            min={0}
            max={60}
          />
          <Input
            className="w-20"
            type="number"
            value={seconds}
            onChange={handleSetSeconds}
            placeholder="sec"
            min={0}
            max={60}
          />
          <Button onClick={handleStartClick}>Start</Button>
        </div>
      )}
    </div>
  );
};

export default Timer;

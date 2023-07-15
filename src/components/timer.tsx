import React, { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import CircularProgress from "./circular-progress";

interface TimerProps {
  defaultMinutes: number;
  defaultSeconds?: number;
}

const Timer: React.FC<TimerProps> = ({
  defaultMinutes = 5,
  defaultSeconds = 0,
}) => {
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [minutes, setMinutes] = useState(defaultMinutes);
  const [seconds, setSeconds] = useState(defaultSeconds);
  const [percentage, setPercentage] = useState(0);
  const [isTicking, setIsTicking] = useState(false);

  useEffect(() => {
    if (totalSeconds > 0) {
      const interval = setInterval(() => {
        if (isTicking) {
          if (seconds > 0) {
            setSeconds((prevSeconds) => prevSeconds - 1);
          } else if (minutes > 0) {
            setMinutes((prevMinutes) => prevMinutes - 1);
            setSeconds(59);
          } else {
            clearInterval(interval);
          }
          const elapsedSeconds = minutes * 60 + seconds;
          const currentPercentage = (elapsedSeconds / totalSeconds) * 100;
          setPercentage(currentPercentage);
        }
      }, 1000);

      return () => clearInterval(interval);
    } else setIsTicking(false);
  }, [minutes, seconds, totalSeconds, isTicking]);

  const handleStartClick = () => {
    const newTotalSeconds = minutes * 60 + seconds;
    if (!isNaN(newTotalSeconds) && newTotalSeconds >= 0) {
      setTotalSeconds(newTotalSeconds);
      setPercentage(0);
      setIsTicking(true);
    }
  };

  const handleStopClick = () => {
    setTotalSeconds(minutes * 60 + seconds);
    setIsTicking(false);
  };

  const formatTime = (time: number): string => {
    return time.toString().padStart(2, "0");
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <CircularProgress percentage={percentage}>
        <div className="font-sans text-2xl text-center text-primary">
          {formatTime(minutes)}:{formatTime(seconds)}
        </div>
      </CircularProgress>
      {isTicking ? (
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
            onChange={(e) => setMinutes(parseInt(e.target.value))}
            placeholder="MM"
            min={0}
            max={60}
          />
          <Input
            className="w-20"
            type="number"
            value={seconds}
            onChange={(e) => setSeconds(parseInt(e.target.value))}
            placeholder="SS"
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

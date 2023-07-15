import React, { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import CircularProgress from "./circular-progess";
// import CircularProgress from "./circular-progess";

const Timer: React.FC = () => {
  const [inputMinutes, setInputMinutes] = useState("");
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [isTicking, setIsTicking] = useState(false);

  useEffect(() => {
    const totalSeconds = parseInt(inputMinutes) * 60;

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
  }, [minutes, seconds, inputMinutes, isTicking]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputMinutes(event.target.value);
  };

  const handleStartClick = () => {
    const parsedMinutes = parseInt(inputMinutes, 10);
    if (!isNaN(parsedMinutes) && parsedMinutes >= 0) {
      setMinutes(parsedMinutes);
      setSeconds(0);
      setPercentage(0);
      setIsTicking(true);
    }
  };

  const handleStopClick = () => {
    const pausedTime = String(minutes);
    setInputMinutes(pausedTime);
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
            type="number"
            value={inputMinutes}
            onChange={handleInputChange}
            placeholder="Enter minutes"
          />
          <Button onClick={handleStartClick}>Start</Button>
        </div>
      )}
    </div>
  );
};

export default Timer;

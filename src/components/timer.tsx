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
  const [minutes, setMinutes] = useState(Math.floor(defaultTime / 60));
  const [seconds, setSeconds] = useState(defaultTime % 60);
  const [percentage, setPercentage] = useState(0);
  const [isTicking, setIsTicking] = useState(false);

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
    if (defaultTime > 0) {
      const interval = setInterval(() => {
        if (isTicking) {
          if (seconds > 0) {
            setSeconds((prevSeconds) => prevSeconds - 1);
          } else if (minutes > 0) {
            setMinutes((prevMinutes) => prevMinutes - 1);
            setSeconds(59);
          } else {
            clearInterval(interval);
            playAlarmSound();
            setIsTicking(false);
          }
          const elapsedSeconds = minutes * 60 + seconds;
          const currentPercentage = (elapsedSeconds / defaultTime) * 100;
          setPercentage(currentPercentage);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [minutes, seconds, defaultTime, isTicking, playAlarmSound]);

  const handleStartClick = () => {
    const newTotalSeconds = minutes * 60 + seconds;
    if (!isNaN(newTotalSeconds) && newTotalSeconds >= 0) {
      handleTimer(newTotalSeconds);
      setPercentage(0);
      setIsTicking(true);
      playStartSound();
    }
  };

  const handleStopClick = () => {
    handleTimer(minutes * 60 + seconds);
    setIsTicking(false);
    playStopSound();
  };

  const formatTime = (time: number): string => {
    return time.toString().padStart(2, "0");
  };

  const handleSetMinutes = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMinutes = parseInt(e.target.value, 10);
    if (newMinutes && newMinutes > 0 && newMinutes < 60) setMinutes(newMinutes);
    else setMinutes(0);
  };

  const handleSetSeconds = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSeconds = parseInt(e.target.value, 10);
    if (newSeconds && newSeconds > 0 && newSeconds < 60) setSeconds(newSeconds);
    else setSeconds(0);
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

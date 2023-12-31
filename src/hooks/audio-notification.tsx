"use client";

import { useContext, useEffect, useRef } from "react";
import { SettingsContext } from "~/context/settings";

interface AudioNotificationProps {
  audioFile:
    | "/assets/audio/start.mp3"
    | "/assets/audio/stop.mp3"
    | "/assets/audio/clock-alarm.mp3";
}

const useAudioNotification = ({ audioFile }: AudioNotificationProps) => {
  const { isAudioEnabled } = useContext(SettingsContext);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(audioFile);
    audioRef.current = audio;

    // Clean up audio on component unmount
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audioFile]);

  const playNotificationSound = () => {
    if (audioRef.current && isAudioEnabled) {
      audioRef.current.play();
    }
  };

  return playNotificationSound;
};

export default useAudioNotification;

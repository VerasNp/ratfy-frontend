"use client";

import React, { createContext, useContext, useState } from "react";
import { Track } from "@/components/generics/Player";
import { mockedPlaylist } from "@/app/test/TrackList";

interface PlayerContextType {
  queue: Track[];
  setQueue: React.Dispatch<React.SetStateAction<Track[]>>;
  currentTrack: Track | null;
  setCurrentTrack: React.Dispatch<React.SetStateAction<Track | null>>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  playNow: (tracks: Track[]) => void;
  playNext: (tracks: Track[]) => void;
  addToQueue: (tracks: Track[]) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [queue, setQueue] = useState<Track[]>(mockedPlaylist.slice(0, 5));
  const [currentTrack, setCurrentTrack] = useState<Track | null>(queue[0] || null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playNow = (incomingTracks: Track[]) => {
    const validTracks = incomingTracks?.filter(Boolean) || [];

    if (validTracks.length === 0) return;

    setQueue((prevQueue) => {
      const filteredPrev = prevQueue.filter((p) => !validTracks.find((t) => t.id === p.id));
      let insertIndex = 0;

      if (currentTrack) {
        const currentIndex = filteredPrev.findIndex((t) => t.id === currentTrack.id);
        if (currentIndex !== -1) {
          insertIndex = currentIndex + 1;
        }
      }
      return [
        ...filteredPrev.slice(0, insertIndex),
        ...validTracks,
        ...filteredPrev.slice(insertIndex),
      ];
    });
    setCurrentTrack(validTracks[0]);
    setIsPlaying(true);
  };
  const playNext = (incomingTracks: Track[]) => {
    const validTracks = incomingTracks?.filter(Boolean) || [];

    if (validTracks.length === 0) return;

    setQueue((prevQueue) => {
      const filteredPrev = prevQueue.filter((p) => !validTracks.find((t) => t.id === p.id));
      let insertIndex = 0;

      if (currentTrack) {
        const currentIndex = filteredPrev.findIndex((t) => t.id === currentTrack.id);
        if (currentIndex !== -1) {
          insertIndex = currentIndex + 1;
        }
      }
      return [
        ...filteredPrev.slice(0, insertIndex),
        ...validTracks,
        ...filteredPrev.slice(insertIndex),
      ];
    });

    setIsPlaying(true);
  };
  const addToQueue = (incomingTracks: Track[]) => {
    const validTracks = incomingTracks?.filter(Boolean) || [];

    if (validTracks.length === 0) return;

    setQueue((prevQueue) => [...prevQueue, ...validTracks]);
  };

  return (
    <PlayerContext.Provider
      value={{
        queue,
        setQueue,
        currentTrack,
        setCurrentTrack,
        isPlaying,
        setIsPlaying,
        playNow,
        addToQueue,
        playNext,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
export function usePlayer() {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
}

"use client";

import { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";
import Button from "../Button";
import Icon from "../Icon";
import Image from "../Image";
import ProgressBar from "../ProgressBar";

export interface Track {
  id: string;
  title: string;
  artist: string;
  album?: string;
  albumArtUrl: string;
  audioUrl: string;
  duration?: number;
}

interface PlayerProps {
  currentTrack: Track | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onSeek?: (time: number) => void;
  onVolumeChange?: (volume: number) => void;
  className?: string;
}

function formatTime(seconds: number): string {
  if (isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default function Player({
  currentTrack,
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
  onSeek,
  onVolumeChange,
  className = "",
}: PlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);

  // Load new track when currentTrack changes
  useEffect(() => {
    if (audioRef.current && currentTrack) {
      // Pause current playback and abort any in-flight fetch
      audioRef.current.pause();
      // Set new source and load
      audioRef.current.src = currentTrack.audioUrl;
      audioRef.current.load();

      // Reset progress state for the new track
      setCurrentTime(0);
      setDuration(0);

      // If the player was playing, resume playback (catch AbortError and ignore it)
      if (isPlaying) {
        audioRef.current.play().catch((err) => {
          if (err.name !== 'AbortError') {
            console.error("Play error:", err);
          }
        });
      }
    }
  }, [currentTrack]);

  // Handle play/pause based on isPlaying prop
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((err) => console.error("Play error:", err));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Set initial volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (newTime: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      onSeek?.(newTime);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    onVolumeChange?.(newVolume);
  };

  const toggleMute = () => {
    if (isMuted) {
      const newVolume = volume === 0 ? 0.7 : volume;
      handleVolumeChange(newVolume);
    } else {
      handleVolumeChange(0);
    }
  };

  const handleTrackEnd = () => {
    onNext();
  };

  if (!currentTrack) {
    return null;
  }

  const artistDisplay = currentTrack.album
    ? `${currentTrack.artist} • ${currentTrack.album}`
    : currentTrack.artist;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-lg border-t border-white/10 px-4 py-3 ${className}`}
    >
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleTrackEnd}
      />

      <div className="grid h-16 grid-cols-[minmax(0,1fr)_minmax(0,56rem)_minmax(0,1fr)] items-center gap-4">
        {/* Left section */}
        <div className="flex min-w-0 items-center gap-3 justify-self-start overflow-hidden">
          <Image
            src={currentTrack.albumArtUrl}
            alt={currentTrack.title}
            size={56}
            shape="rounded"
            className="shadow-lg shrink-0"
          />

          <div className="min-w-0 overflow-hidden">
            <p
              className="truncate text-sm font-medium leading-5 text-white"
              title={currentTrack.title}
            >
              {currentTrack.title}
            </p>
            <p
              className="truncate text-xs leading-4 text-zinc-400"
              title={artistDisplay}
            >
              {artistDisplay}
            </p>
          </div>
        </div>

        {/* Center section */}
        <div className="flex min-w-0 w-full flex-col items-center justify-center gap-1 justify-self-center">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onPrevious}
              aria-label="Previous track"
            >
              <Icon src={SkipBack} size={20} />
            </Button>

            <Button
              variant="brand"
              size="icon"
              onClick={onPlayPause}
              aria-label={isPlaying ? "Pause" : "Play"}
              className="h-10 w-10 rounded-full bg-white text-black transition-transform hover:scale-105"
            >
              <Icon src={isPlaying ? Pause : Play} size={20} />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={onNext}
              aria-label="Next track"
            >
              <Icon src={SkipForward} size={20} />
            </Button>
          </div>

          {/* Progress bar (time seek) */}
          <div className="flex w-full max-w-xl items-center gap-2">
            <span className="shrink-0 text-xs tabular-nums text-zinc-400">
              {formatTime(currentTime)}
            </span>

            <ProgressBar
              value={currentTime}
              max={duration || 0}
              onChange={handleSeek}
              formatValue={formatTime}
              showTooltip
            />

            <span className="shrink-0 text-xs tabular-nums text-zinc-400">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center justify-end gap-2 justify-self-end">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            <Icon src={isMuted ? VolumeX : Volume2} size={18} />
          </Button>

          {/* Volume control using the same ProgressBar */}
          <div className="w-24">
            <ProgressBar
              value={volume}
              max={1}
              onChange={handleVolumeChange}
              formatValue={(v) => `${Math.round(v * 100)}%`}
              showTooltip
            />
          </div>
        </div>
      </div>
    </div>
  );
}

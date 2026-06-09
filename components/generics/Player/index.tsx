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
import Text from "../Text";

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
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [hoverLeft, setHoverLeft] = useState<number>(0);

  // Load new track when currentTrack changes
  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.src = currentTrack.audioUrl;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch((err) => console.error("Play error:", err));
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

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      onSeek?.(newTime);
    }
  };

  const handleProgressHover = (e: React.MouseEvent<HTMLInputElement>) => {
    if (!duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    const time = ratio * duration;

    setHoverTime(time);
    setHoverLeft(ratio * 100);
  };

  const clearProgressHover = () => {
    setHoverTime(null);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
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
      setVolume(newVolume);
      if (audioRef.current) audioRef.current.volume = newVolume;
      setIsMuted(false);
      onVolumeChange?.(newVolume);
    } else {
      setVolume(0);
      if (audioRef.current) audioRef.current.volume = 0;
      setIsMuted(true);
      onVolumeChange?.(0);
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

      <div className="flex items-center gap-4 h-16">
        {/* Left section */}
        <div className="flex items-center gap-3 min-w-0 w-80 shrink-0 overflow-hidden">
          <Image
            src={currentTrack.albumArtUrl}
            alt={currentTrack.title}
            size={56}
            shape="rounded"
            className="shadow-lg shrink-0"
          />

          <div className="min-w-0 overflow-hidden">
            <p className="truncate text-sm font-medium text-white leading-5" title={currentTrack.title}>
              {currentTrack.title}
            </p>
            <p className="truncate text-xs text-zinc-400 leading-4" title={artistDisplay}>
              {artistDisplay}
            </p>
          </div>
        </div>

        {/* Center section */}
        <div className="flex flex-1 flex-col items-center justify-center gap-1 min-w-0">
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
              className="h-10 w-10 rounded-full bg-white text-black hover:scale-105 transition-transform"
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
          <div className="flex items-center gap-2 w-full max-w-xl">
            <span className="text-xs text-zinc-400 tabular-nums shrink-0">
              {formatTime(currentTime)}
            </span>

            <div className="relative flex-1">
              {hoverTime !== null && (
                <div
                  className="pointer-events-none absolute -top-8 z-10 -translate-x-1/2 rounded bg-zinc-900 px-2 py-1 text-xs text-white shadow-lg border border-white/10"
                  style={{ left: `${hoverLeft}%` }}
                >
                  {formatTime(hoverTime)}
                </div>
              )}

              <input
                type="range"
                min={0}
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                onMouseMove={handleProgressHover}
                onMouseEnter={handleProgressHover}
                onMouseLeave={clearProgressHover}
                className="w-full h-1 rounded-full bg-zinc-600 accent-white cursor-pointer"
                step={0.1}
              />
            </div>

            <span className="text-xs text-zinc-400 tabular-nums shrink-0">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2 w-44 justify-end shrink-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            <Icon src={isMuted ? VolumeX : Volume2} size={18} />
          </Button>

          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={handleVolumeChange}
            className="w-24 h-1 rounded-full bg-zinc-600 accent-white cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  List as ListMusicIcon,
} from "lucide-react";
import Button from "../Button";
import Icon from "../Icon";
import Image from "../Image";
import ProgressBar from "../ProgressBar";
import { QueuePanel } from "../QueuePanel";

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
  currentTrack:    Track | null;
  isPlaying:       boolean;
  onPlayPause:     () => void;
  onNext:          () => void;
  onPrevious:      () => void;
  onSeek?:         (time: number) => void;
  onVolumeChange?: (volume: number) => void;
  className?:      string;
  queue?:          Track[] | null;
  onTrackSelect?:  (track: Track) => void;
  onQueueReorder?: (newQueue: Track[]) => void;
  onQueueRemove?:   (trackId: string) => void;
  onQueueClear?:    () => void;
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
  queue,
  onTrackSelect,
  onQueueReorder,
  onQueueRemove,
  onQueueClear,
  className = "",
}: PlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration,    setDuration]    = useState(0);
  const [volume,      setVolume]      = useState(0.7);
  const [isMuted,     setIsMuted]     = useState(false);
  const [isQueueOpen, setIsQueueOpen] = useState(false);

  const onPlayPauseRef = useRef(onPlayPause);
  const onNextRef      = useRef(onNext);
  const onPreviousRef  = useRef(onPrevious);
  const onSeekRef      = useRef(onSeek);

  useEffect(() => {
    onPlayPauseRef.current = onPlayPause;
    onNextRef.current      = onNext;
    onPreviousRef.current  = onPrevious;
    onSeekRef.current      = onSeek;
  }, [onPlayPause, onNext, onPrevious, onSeek]);

  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.pause();
      audioRef.current.src = currentTrack.audioUrl;
      audioRef.current.load();
      setCurrentTime(0);
      setDuration(0);
      if (isPlaying) {
        audioRef.current.play().catch((err) => {
          if (err.name !== 'AbortError') console.error("Play error:", err);
        });
      }
    }
  }, [currentTrack]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch((err) => console.error("Play error:", err));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const handleTimeUpdate = () => {
    if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };

  const handleSeek = (newTime: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      onSeekRef.current?.(newTime);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    if (audioRef.current) audioRef.current.volume = newVolume;
    onVolumeChange?.(newVolume);
  };

  const toggleMute = () => {
    if (isMuted) {
      handleVolumeChange(volume === 0 ? 0.7 : volume);
    } else {
      handleVolumeChange(0);
    }
  };

  useEffect(() => {
    if (!currentTrack || !('mediaSession' in navigator)) return;

    navigator.mediaSession.metadata = new MediaMetadata({
      title:   currentTrack.title,
      artist:  currentTrack.artist,
      album:   currentTrack.album ?? '',
      artwork: [{ src: currentTrack.albumArtUrl, sizes: '512x512' }],
    });

    navigator.mediaSession.setPositionState({ duration: 0, position: 0, playbackRate: 1 });

    navigator.mediaSession.setActionHandler('play',           () => onPlayPauseRef.current());
    navigator.mediaSession.setActionHandler('pause',          () => onPlayPauseRef.current());
    navigator.mediaSession.setActionHandler('previoustrack',  () => onPreviousRef.current());
    navigator.mediaSession.setActionHandler('nexttrack',      () => onNextRef.current());

    if (onSeekRef.current) {
      navigator.mediaSession.setActionHandler('seekto', (details) => {
        if (details.seekTime !== undefined) onSeekRef.current?.(details.seekTime);
      });
    }

    return () => {
      if (!('mediaSession' in navigator)) return;
      navigator.mediaSession.setActionHandler('play',          null);
      navigator.mediaSession.setActionHandler('pause',         null);
      navigator.mediaSession.setActionHandler('previoustrack', null);
      navigator.mediaSession.setActionHandler('nexttrack',     null);
      navigator.mediaSession.setActionHandler('seekto',        null);
    };
  }, [currentTrack]);

  useEffect(() => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.playbackState = isPlaying ? 'playing' : 'paused';
    }
  }, [isPlaying]);

  useEffect(() => {
    if ('mediaSession' in navigator && duration > 0) {
      const safePosition = Math.max(0, Math.min(currentTime, duration));

      navigator.mediaSession.setPositionState({
        duration,
        position: safePosition,
        playbackRate: 1
      });
    }
  }, [currentTime, duration]);

  if (!currentTrack) return null;

  const artistDisplay = currentTrack.album
    ? `${currentTrack.artist} • ${currentTrack.album}`
    : currentTrack.artist;

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-lg border-t border-white/10 px-4 py-3 ${className}`}>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => onNextRef.current()}
      />

      <div className="grid h-16 grid-cols-[minmax(0,1fr)_minmax(0,56rem)_minmax(0,1fr)] items-center gap-4">

        {/* Left — track info */}
        <div className="flex min-w-0 items-center gap-3 justify-self-start overflow-hidden">
          <Image
            src={currentTrack.albumArtUrl}
            alt={currentTrack.title}
            size={56}
            shape="rounded"
            className="shadow-lg shrink-0"
          />
          <div className="min-w-0 overflow-hidden">
            <p className="truncate text-sm font-medium leading-5 text-white" title={currentTrack.title}>
              {currentTrack.title}
            </p>
            <p className="truncate text-xs leading-4 text-zinc-400" title={artistDisplay}>
              {artistDisplay}
            </p>
          </div>
        </div>

        {/* Center — controls + progress */}
        <div className="flex min-w-0 w-full flex-col items-center justify-center gap-1 justify-self-center">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="cursor-pointer" onClick={onPrevious} aria-label="Previous track">
              <Icon src={SkipBack} size={20} />
            </Button>
            <Button
              variant="brand"
              size="icon"
              onClick={onPlayPause}
              aria-label={isPlaying ? "Pause" : "Play"}
              className="h-10 w-10 rounded-full bg-white text-black transition-transform hover:scale-105 cursor-pointer"
            >
              <Icon src={isPlaying ? Pause : Play} size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="cursor-pointer" onClick={onNext} aria-label="Next track">
              <Icon src={SkipForward} size={20} />
            </Button>
          </div>

          <div className="flex w-full max-w-xl items-center gap-2">
            <span className="shrink-0 text-xs tabular-nums text-zinc-400">{formatTime(currentTime)}</span>
            <ProgressBar value={currentTime} max={duration || 0} onChange={handleSeek} formatValue={formatTime} showTooltip />
            <span className="shrink-0 text-xs tabular-nums text-zinc-400">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Right — volume + queue toggle */}
        <div className="flex items-center justify-end gap-2 justify-self-end">
          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer"
            onClick={() => setIsQueueOpen((q) => !q)}
            aria-label="Queue"
          >
            <ListMusicIcon
              size={18}
              color={isQueueOpen ? 'var(--bg-brand)' : 'var(--text-primary)'}
            />
          </Button>

          <Button variant="ghost" size="icon" className="cursor-pointer" onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"}>
            <Icon src={isMuted ? VolumeX : Volume2} size={18} />
          </Button>

          <div className="w-24">
            <ProgressBar
              value={isMuted ? 0 : volume}
              max={1}
              onChange={handleVolumeChange}
              formatValue={(v) => `${Math.round(v * 100)}%`}
              showTooltip
            />
          </div>
        </div>
      </div>

      {/* Queue panel — outside the grid so it doesn't affect layout */}
      {isQueueOpen && (
        <QueuePanel
          currentTrack={currentTrack}
          queue={queue ?? []}
          onClose={() => setIsQueueOpen(false)}
          onTrackSelect={(track) => {
            onTrackSelect?.(track)
            setIsQueueOpen(false)
          }}
          onQueueReorder={(newQueue) => onQueueReorder?.(newQueue)}
          onQueueRemove={(id) => onQueueRemove?.(id)}
          onQueueClear={onQueueClear}
        />
      )}
    </div>
  );
}

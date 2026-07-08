"use client"

import { Play, X, GripVertical } from 'lucide-react'
import Image from '../Image'
import Icon from '../Icon'
import type { Track } from '../Player'
import { NowPlayingBars } from './PlayingBars'

interface QueueTrackRowProps {
  track:        Track
  isPlaying?:   boolean
  onClick?:     () => void
  onRemove?:    () => void
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement>
  isDragging?:  boolean
}

function formatTime(seconds: number): string {
  if (isNaN(seconds)) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export function QueueTrackRow({
  track,
  isPlaying = false,
  onClick,
  onRemove,
  dragHandleProps,
  isDragging = false,
}: QueueTrackRowProps) {
  return (
    <div
      className={`
        group flex items-center gap-2 px-2 py-2 cursor-pointer
        hover:bg-white/5 transition-colors rounded-md mx-2
        ${isPlaying  ? 'bg-green-900': ''}
        ${isDragging ? 'opacity-50 bg-white/10 ring-1 ring-white/20' : ''}
      `}
    >
      <div
        {...dragHandleProps}
        className="shrink-0 text-zinc-600 group-hover:text-zinc-400
                   transition-colors cursor-grab active:cursor-grabbing
                   opacity-0 group-hover:opacity-100"
        aria-label="Drag to reorder"
      >
        <GripVertical size={14} />
      </div>
      <div
        className="relative shrink-0 w-10 h-10"
        onClick={onClick}
      >
        <Image
          src={track.albumArtUrl}
          alt={track.title}
          size={40}
          shape="rounded"
        />
        {isPlaying ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded">
            <NowPlayingBars />
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center
                          bg-black/50 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            <Icon src={Play} size={14} className="text-white" />
          </div>
        )}
      </div>

      {/* Track info */}
      <div className="flex-1 min-w-0" onClick={onClick}>
        <p className={`text-sm truncate leading-5 ${isPlaying ? 'text-green-400' : 'text-white'}`}>
          {track.title}
        </p>
        <p className="text-xs text-zinc-400 truncate leading-4">
          {track.artist}
        </p>
      </div>

      {/* Duration */}
      {track.duration != null && (
        <span className="text-xs text-zinc-500 tabular-nums shrink-0">
          {formatTime(track.duration)}
        </span>
      )}

      {/* Remove button — only visible on hover, only for queue items (not now playing) */}
      {onRemove && (
        <button
          onClick={(e) => { e.stopPropagation(); onRemove() }}
          className="shrink-0 text-zinc-600 hover:text-white transition-colors cursor-pointer
                     opacity-0 group-hover:opacity-100 rounded-full p-0.5
                     hover:bg-white/10"
          aria-label={`Remove ${track.title} from queue`}
        >
          <X size={14} />
        </button>
      )}
    </div>
  )
}

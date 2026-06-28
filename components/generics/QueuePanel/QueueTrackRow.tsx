// QueueTrackRow.tsx
import { Play } from 'lucide-react'
import Image from '../Image'
import Icon from '../Icon'
import type { Track } from '../Player'
import {
  NowPlayingBars
} from './PlayingBars'

interface QueueTrackRowProps {
  track:     Track
  isPlaying?: boolean
  onClick?:  () => void
}

function formatTime(seconds: number): string {
  if (isNaN(seconds)) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export function QueueTrackRow({ track, isPlaying = false, onClick }: QueueTrackRowProps) {
  return (
    <div
      onClick={onClick}
      className={`
        group flex items-center gap-3 px-4 py-2 cursor-pointer
        hover:bg-white/5 transition-colors
        ${isPlaying ? 'bg-white/5' : ''}
      `}
    >
      {/* Album art — shows play icon on hover, bars when playing */}
      <div className="relative shrink-0 w-10 h-10">
        <Image
          src={track.albumArtUrl}
          alt={track.title}
          size={40}
          shape="rounded"
        />
        {isPlaying ? (
          <div className="absolute inset-0 flex items-center justify-center
                          bg-black/40 rounded">
            <NowPlayingBars />
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center
                          bg-black/50 rounded opacity-0 group-hover:opacity-100
                          transition-opacity">
            <Icon src={Play} size={14} className="text-white" />
          </div>
        )}
      </div>

      {/* Track info */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm truncate leading-5
                       ${isPlaying ? 'text-green-400' : 'text-white'}`}>
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
    </div>
  )
}

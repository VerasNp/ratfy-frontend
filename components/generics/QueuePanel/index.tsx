"use client"

import { useState } from 'react'
import { X, Eraser } from 'lucide-react'
import { Track } from '../Player'
import Icon from '../Icon'
import { QueueTrackRow } from './QueueTrackRow'
export interface QueuePanelProps {
  currentTrack:   Track | null
  queue:          Track[]
  onClose:        () => void
  onTrackSelect:  (track: Track) => void
  onQueueReorder: (newQueue: Track[]) => void
  onQueueRemove: (trackId: string) => void
  onQueueClear: () => void
}

export function QueuePanel({
  currentTrack,
  queue,
  onClose,
  onTrackSelect,
  onQueueReorder,
  onQueueRemove,
  onQueueClear,
}: QueuePanelProps) {
  // Both as state — never read refs during render
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const [overIndex, setOverIndex] = useState<number | null>(null)

  const handleDragStart = (index: number) => {
    setDragIndex(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    setOverIndex(index)
  }

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    if (dragIndex === null || dragIndex === dropIndex) {
      setDragIndex(null)
      setOverIndex(null)
      return
    }

    const reordered = [...queue]
    const [moved]   = reordered.splice(dragIndex, 1)
    reordered.splice(dropIndex, 0, moved)

    onQueueReorder(reordered)
    setDragIndex(null)
    setOverIndex(null)
  }

  const handleDragEnd = () => {
    setDragIndex(null)
    setOverIndex(null)
  }

  return (
    <div className="fixed bottom-[88px] right-4 z-50 w-80 h-[80vh] bg-[#121212]
                    rounded-lg border border-white/10 flex flex-col overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 shrink-0 border-b border-white/10">
        <span className="text-white font-bold text-base">Queue</span>
        <div className='flex gap-3'>
          <button
            onClick={onQueueClear}
            className="text-zinc-500 hover:text-white transition-colors"
            aria-label="Clear Queue"
          >
            <Icon src={Eraser} size={16} />
          </button>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-white transition-colors"
            aria-label="Close queue"
          >
            <Icon src={X} size={16} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-2">

        {/* Now playing — not draggable, not removable */}
        <p className="px-4 py-1 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
          Now playing
        </p>
        {currentTrack && (
          <QueueTrackRow track={currentTrack} isPlaying />
        )}

        {/* Queue */}
        {queue.length > 0 ? (
          <>
            <div className="mx-4 my-2 border-t border-white/10" />
            <p className="px-4 py-1 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
              Next in queue
            </p>

            {queue.map((track, index) => (
              <div
                key={track.id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnd={handleDragEnd}
                className={`
                  transition-all duration-100 border-t-2
                  ${overIndex === index && dragIndex !== index
                    ? 'border-green-500'
                    : 'border-transparent'
                  }
                `}
              >
                <QueueTrackRow
                  track={track}
                  isDragging={dragIndex === index}
                  onClick={() => onTrackSelect(track)}
                  onRemove={() => onQueueRemove(track.id)}
                  dragHandleProps={{
                    onClick: (e) => e.stopPropagation()
                  }}
                  isPlaying={currentTrack && (currentTrack.id === track.id) ? true : false}
                />
              </div>
            ))}
          </>
        ) : (
          <p className="px-4 py-6 text-sm text-zinc-500 text-center">
            Queue is empty
          </p>
        )}
      </div>
    </div>
  )
}

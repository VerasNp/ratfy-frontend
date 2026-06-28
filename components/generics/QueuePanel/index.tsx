import { Track } from "../Player"
import Icon from "../Icon"
import { QueueTrackRow } from "./QueueTrackRow"
import { X } from "lucide-react";

export interface QueuePanelProps {
  currentTrack: Track | null
  queue: Track[]
  onClose: () => void
  onTrackSelect: (track: Track) => void
}

export function QueuePanel({ currentTrack, queue, onClose, onTrackSelect }: QueuePanelProps) {
  return (
    <div className="fixed bottom-[88px] right-4 z-50 w-72 h-[480px] bg-[#121212]
                    rounded-lg border border-white/10 flex flex-col overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 flex-shrink-0">
        <span className="text-white font-bold text-base">Queue</span>
        <button onClick={onClose} className="text-zinc-500 hover:text-white">
          <Icon src={X} size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Now playing */}
        <p className="px-4 py-1 text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
          Now playing
        </p>
        {currentTrack && <QueueTrackRow track={currentTrack} isPlaying />}

        {/* Next in queue */}
        {queue.length > 0 && (
          <>
            <div className="mx-4 my-2 border-t border-white/10" />
            <p className="px-4 py-1 text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
              Next in queue
            </p>
            {queue.map((track) => (
              <QueueTrackRow
                key={track.id}
                track={track}
                onClick={() => onTrackSelect(track)}
              />
            ))}
          </>
        )}
      </div>
    </div>
  )
}

"use client"

import { useState } from 'react'
import Player, { Track } from '@/components/generics/Player'
import { mockedPlaylist as playlist } from './TrackList'

export default function PlayerTest() {

  const [queue, setQueue] = useState<Track[]>(playlist)
  const [currentTrack, setCurrentTrack] = useState<Track | null>(queue[0])
  const [isPlaying,    setIsPlaying]    = useState(false)

  // ── Playback handlers ────────────────────────────────────────────────────

  const handlePlayPause = () => setIsPlaying((p) => !p)

  const handleNext = () => {
    if (queue.length === 0 || !currentTrack) {
      // No more tracks — stop playback
      setIsPlaying(false)
      return
    }
    const currentIndex = queue.findIndex((t) => t.id === currentTrack.id)
    setCurrentTrack(queue[currentIndex+1])
    setQueue(queue)
    setIsPlaying(true)
  }
  // Teste
  const getIdTrackFromDB = (id: string) => {
    return (queue.findIndex((t) => t.id === id))
  }

  const handlePrevious = () => {
    if (!currentTrack) return
    const currentIndex = queue.findIndex((t) => t.id === currentTrack.id)
    if (currentIndex <= 0) return   // already at the start, do nothing
    const prev = queue[currentIndex - 1]
    const prevMusic = playlist[getIdTrackFromDB(prev.id)]
    // Put the current track back at the front of the queue
    setCurrentTrack(prev)
    setIsPlaying(true)
  }

  // ── Queue handlers ───────────────────────────────────────────────────────

  const handleTrackSelect = (track: Track) => {
    // Remove everything up to and including the selected track from the queue
    setCurrentTrack(track)
    setIsPlaying(true)
  }

  const handleQueueReorder = (newQueue: Track[]) => {
    setQueue(newQueue)
  }

  const handleQueueRemove = (trackId: string) => {
    setQueue((q) => q.filter((t) => t.id !== trackId))
  }

  // ── Playlist row click — replaces queue with remaining tracks ────────────

  const handlePlaylistClick = (track: Track) => {
    setCurrentTrack(track)
    setIsPlaying(true)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pb-32">
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8">Now Playing</h1>

        {/* Current track hero */}
        <div key={currentTrack?.id ?? 'none'} className="flex items-center gap-6 mb-12">
          {currentTrack ? (
            <>
              <img
                src={currentTrack.albumArtUrl}
                alt={currentTrack.title}
                className="w-48 h-48 rounded-lg shadow-2xl object-cover"
                onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder-album.png' }}
              />
              <div>
                <h2 className="text-3xl font-bold">{currentTrack.title}</h2>
                <p className="text-xl text-gray-400">
                  {currentTrack.album
                    ? `${currentTrack.artist} • ${currentTrack.album}`
                    : currentTrack.artist}
                </p>
              </div>
            </>
          ) : (
            <div className="text-gray-400 italic">Select a track to start</div>
          )}
        </div>

        {/* Playlist */}
        <div className="space-y-2">
          <h3 className="text-2xl font-semibold mb-4">Playlist</h3>
          {playlist.map((track) => (
            <button
              key={track.id}
              onClick={() => handlePlaylistClick(track)}
              className={`w-full text-left p-4 rounded-lg transition ${
                currentTrack?.id === track.id
                  ? 'bg-green-900 text-white'
                  : 'hover:bg-white/10'
              }`}
            >
              <div className="font-medium">{track.title}</div>
              <div className="text-sm text-gray-400">{track.artist}</div>
            </button>
          ))}
        </div>
      </div>

      <Player
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onNext={handleNext}
        onPrevious={handlePrevious}
        queue={queue}
        onTrackSelect={handleTrackSelect}
        onQueueReorder={handleQueueReorder}
        onQueueRemove={handleQueueRemove}
      />
    </main>
  )
}

"use client";

import { useState } from "react";
import Player, { Track } from "@/components/generics/Player";

const playlist: Track[] = [
  {
    id: "1",
    title: "Rhymes Like Dimes",
    artist: "MF DOOM",
    album: "Operation: Doomsday",
    albumArtUrl: "https://dn710007.ca.archive.org/0/items/operation-doomsday-disc1-flac/cover.jpg",
    audioUrl: "https://archive.org/download/operation-doomsday-disc1-flac/03%20-%20Rhymes%20Like%20Dimes.mp3",
    duration: 298,
  },
  {
    id: "2",
    title: "Football, Nightmare And A Bolt From The Blue",
    artist: "A Last Failure",
    album: "Ok, We Move For A Desperate Goal",
    albumArtUrl: "https://dn721808.ca.archive.org/0/items/ALF-OWMFADG-2009/2009%20-%20Ok%2C%20We%20Move%20For%20A%20Desperate%20Goal/folder.jpg",
    audioUrl: "https://archive.org/download/ALF-OWMFADG-2009/2009%20-%20Ok%2C%20We%20Move%20For%20A%20Desperate%20Goal/03%20Football%2C%20Nightmare%20And%20A%20Bolt%20Fr.m4a",
    duration: 217,
  },
  {
    id: "3",
    title: "La Vie En Rose",
    artist: "Edith Piaf",
    albumArtUrl: "https://dn721601.ca.archive.org/0/items/78_la-vie-en-rose_edith-piaf-m-david-louiguy-robert-chauvigny_gbia3025698a/78_la-vie-en-rose_edith-piaf-m-david-louiguy-robert-chauvigny_gbia3025698a_itemimage.jpg",
    audioUrl: "https://archive.org/download/78_la-vie-en-rose_edith-piaf-m-david-louiguy-robert-chauvigny_gbia3025698a/LA%20VIE%20EN%20ROSE%20-%20EDITH%20PIAF%20-%20M.%20David%20-%20Louiguy.mp3",
    duration: 212,
  },
];

export default function Home() {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(playlist[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (!currentTrack) return;
    const currentIndex = playlist.findIndex((t) => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % playlist.length;
    setCurrentTrack(playlist[nextIndex]);
    setIsPlaying(true);
  };

  const handlePrevious = () => {
    if (!currentTrack) return;
    const currentIndex = playlist.findIndex((t) => t.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    setCurrentTrack(playlist[prevIndex]);
    setIsPlaying(true);
  };

  const handleSeek = (time: number) => {
    console.log("Seek to:", time);
  };

  const handleVolumeChange = (volume: number) => {
    console.log("Volume changed to:", volume);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pb-32">
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8">Now Playing</h1>

        <div key={currentTrack?.id || "none"} className="flex items-center gap-6 mb-12">
          {currentTrack ? (
            <>
              <img
                src={currentTrack.albumArtUrl}
                alt={currentTrack.title}
                className="w-48 h-48 rounded-lg shadow-2xl object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder-album.png";
                }}
              />
              <div>
                <h2 className="text-3xl font-bold">{currentTrack.title}</h2>
                <p className="text-xl text-gray-400">
                  {currentTrack.album
                    ? `${currentTrack.artist} • Album: "${currentTrack.album}"`
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
              onClick={() => {
                setCurrentTrack(track);
                setIsPlaying(true);
              }}
              className={`w-full text-left p-4 rounded-lg transition ${
                currentTrack?.id === track.id
                  ? "bg-green-900 text-white"
                  : "hover:bg-white/10"
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
        onSeek={handleSeek}
        onVolumeChange={handleVolumeChange}
      />
    </main>
  );
}

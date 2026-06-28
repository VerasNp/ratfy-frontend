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
  {
    id: "4",
    title: "Its Been So Long",
    artist: "Spencer Davis, Peter Jameson",
    albumArtUrl: "https://archive.org/download/lp_its-been-so-long_spencer-davis-peter-jameson/lp_its-been-so-long_spencer-davis-peter-jameson_itemimage.png",
    audioUrl: "https://archive.org/download/lp_its-been-so-long_spencer-davis-peter-jameson/disc1/01.01.%20It%27s%20Been%20So%20Long.mp3",
    duration: 305,
  },
  {
    id: "5",
    title: "Calm1",
    artist: "c418",
    albumArtUrl: "https://archive.org/download/minecraft-classic-soundtrack_202011/Minecraft%20Classic%20Soundtrack/minecraft_cover.jpg",
    audioUrl: "https://archive.org/download/minecraft-classic-soundtrack_202011/Minecraft%20Classic%20Soundtrack/01%20Calm%201.mp3",
    duration: 261,
  },
  {
    id: "6",
    title: "Nectar",
    artist: "Joji",
    albumArtUrl: "https://archive.org/download/nectar-flac/Nectar.jpg",
    audioUrl: "https://archive.org/download/nectar-flac/06%20Gimme%20Love.mp3",
    duration: 261,
  },
  {
    id: "7",
    title: "Spooky Scary Skeletons (Remix)",
    artist: "The Living Tombstone",
    albumArtUrl: "https://archive.org/download/soundcloud-222379095/222379095.jpg",
    audioUrl: "https://archive.org/download/soundcloud-222379095/222379095.mp3",
    duration: 230,
  },
  {
    id: "8",
    title: "Lithium",
    artist: "Nirvana",
    albumArtUrl: "https://archive.org/download/soundcloud-28211415/28211415.jpg",
    audioUrl: "https://archive.org/download/soundcloud-28211415/28211415.mp3",
    duration: 257,
  },
  {
    id: "9",
    title: "Firefly",
    artist: "Jim Yosef",
    albumArtUrl: "https://archive.org/download/soundcloud-212352246/Jim_Yosef_-_Firefly_NCS_Release-212352246.jpg",
    audioUrl: "https://archive.org/download/soundcloud-212352246/Jim_Yosef_-_Firefly_NCS_Release-212352246.mp3",
    duration: 257,
  },
  {
    id: "10",
    title: "Ghost n' Stuff",
    artist: "Deadmau5",
    albumArtUrl: "https://archive.org/download/ghost-n-stuff/31Qxd8OiDqL._UXNaN_FMjpg_QL85_.jpg",
    audioUrl: "https://archive.org/download/ghost-n-stuff/Ghost%20N%20Stuff.mp3",
    duration: 192,
  },

];
export default function PlayerTest() = {
const [currentTrack, setCurrentTrack] = useState<Track | null>(playlist[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [actualQueue, setActualQueue] = useState<Track[] | null>(playlist);
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (!actualQueue || actualQueue.length === 0) return
    const [next, ...rest] = actualQueue
    setCurrentTrack(next)
    setActualQueue(rest)
    setIsPlaying(true)
    //const currentIndex = playlist.findIndex((t) => t.id === currentTrack.id);
    //const nextIndex = (currentIndex + 1) % playlist.length;
    //setCurrentTrack(playlist[0]);
  };

  const handlePrevious = () => {
    if (!currentTrack) return
  setActualQueue((prev) => [currentTrack, ...(prev ?? [])])
  setCurrentTrack(playlist[playlist.findIndex((t) => t.id === currentTrack.id) - 1] ?? currentTrack)
  setIsPlaying(true)
  };

  const handleSeek = (time: number) => {
    console.log("Seek to:", time);
  };

  const handleVolumeChange = (volume: number) => {
    console.log("Volume changed to:", volume);
  };
  const handleTrackSelect = (track: Track) => {
    const idx = actualQueue?.findIndex((t) => t.id === track.id) ?? -1
    setActualQueue((prev) => prev?.slice(idx + 1) ?? [])
    setCurrentTrack(track)
    setIsPlaying(true)
  }

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
        queue={actualQueue ?? []}
        onTrackSelect={handleTrackSelect}
      />
    </main>
  );
}

"use client";

import Player from "@/components/generics/Player";
import CardTest from "./test/CardTest";
import { PlayerProvider } from "./context/PlayerContext";
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
    <PlayerProvider>
      <main className="min-h-screen bg-linear-to-b from-gray-900 to-black text-white pb-32">
        <CardTest />
        <Player />
      </main>
    </PlayerProvider>
  );
}

"use client";

import Player from "@/components/generics/Player";
import CardTest from "./test/CardTest";
import { PlayerProvider } from "./context/PlayerContext";
export default function Home() {
  return (
    <PlayerProvider>
      <main className="min-h-screen bg-linear-to-b from-gray-900 to-black text-white pb-32">
        <CardTest />
        <Player />
      </main>
    </PlayerProvider>
  );
}

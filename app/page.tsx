"use client";
import Player from "@/components/generics/Player";
import CardTest from "./test/CardTest";
import ContentPageTest from "./test/ContentPageTest";


export default function Home() {
  return (
      <main className="min-h-screen bg-linear-to-b from-gray-900 to-black text-white pb-32">
        <div className="flex flex-row h-[calc(100vh-150px)]">
          <div className="flex flex-col overflow-y-scroll">
            <ContentPageTest/>
            <CardTest/>
          </div>
        </div>
        <Player />
      </main>
  );
}

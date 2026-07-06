"use client";
import CardTest from "./test/CardTest";
import ContentPageTest from "./test/ContentPageTest";
import Sidebar from "@/components/generics/Sidebar";
import Player from "@/components/generics/Player";
import NavBar from "@/components/generics/NavBar";


export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-b from-gray-900 to-black text-white pb-32">
      <NavBar/>
      <div className="flex flex-row h-[calc(100vh-150px)]">
          <Sidebar/>
          <div className="flex flex-col overflow-y-scroll">
            <ContentPageTest/>
            <CardTest/>
          </div>
      </div>
      <Player/>
      </main>
  );
}

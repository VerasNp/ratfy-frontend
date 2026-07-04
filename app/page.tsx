"use client";

import Player from "@/components/generics/Player";
import CardTest from "./test/CardTest";
import ContentPageTest from "./test/ContentPageTest";
import Sidebar from "@/components/generics/Sidebar"
import { mockedPlaylist,mockedPlaylists,mockedAlbums } from "./test/TrackList";
import { SidebarItem } from "@/components/generics/Sidebar";


export default function Home() {
  const popularTracks = mockedPlaylist.slice(0, 40);
  const sidebarData: SidebarItem[] = [
    ...mockedPlaylists.map(p => ({
      id: p.id,
      title: p.title,
      type: "Playlist" as const,
      imageUrl: p.albumArtUrl,
      owner: Array.isArray(p.artistsIds) ? p.artistsIds.join(", ") : p.artistsIds,
      tracks: p.tracks
    })),
    ...mockedAlbums.map(a => ({
      id: a.id,
      title: a.title,
      type: "Album" as const,
      imageUrl: a.albumArtUrl,
      owner: "Various Artists",
      tracks: a.tracks
    })),
    ...popularTracks.map(t => ({
      id: t.id,
      title: t.title,
      type: "Single" as const,
      imageUrl: t.albumArtUrl,
      owner: t.artist,
      tracks: [t]
    }))
  ];
  return (
      <main className="min-h-screen bg-linear-to-b from-gray-900 to-black text-white pb-32">

        <div className="flex flex-row h-[calc(100vh-150px)]">
          <Sidebar items={sidebarData} />
          <div className="flex flex-col overflow-y-scroll">
            <ContentPageTest/>
            <CardTest/>
          </div>
        </div>
        <Player />
      </main>
  );
}

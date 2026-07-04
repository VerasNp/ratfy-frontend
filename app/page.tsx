"use client";

import Player from "@/components/generics/Player";
import CardTest from "./test/CardTest";
import ContentPageTest from "./test/ContentPageTest";
import Sidebar from "@/components/generics/Sidebar"
import { mockedPlaylist,mockedPlaylists,mockedAlbums } from "./test/TrackList";
import { usePlayer } from "./context/PlayerContext";
import { Track } from "@/components/generics/Player";
import { Play, ListPlus } from "lucide-react"
import { DropdownItem } from "@/components/generics/Card";

export default function Home() {
  const popularTracks = mockedPlaylist.slice(0, 40);
  const { playNow, playNext, addToQueue } = usePlayer();
  const cardDropdownActions = (tracks: Track[]): DropdownItem[] => [
    {
      id: "play-now",
      icon: <Play size={16} />,
      item: <span>Play Now</span>,
      onSelect: () => playNow(tracks),
    },
    {
      id: "Play next",
      icon: <ListPlus size={16} />,
      item: <span>Next in queue</span>,
      onSelect: () => playNext(tracks),
    },
    {
      id: "add-queue",
      icon: <ListPlus size={16} />,
      item: <span>Add to Queue</span>,
      onSelect: () => addToQueue(tracks),
    },
  ];
  const sidebarData: SidebarItem[] = [
    ...mockedPlaylists.map(p => ({
      id: p.id,
      title: p.title,
      type: "Playlist" as const,
      imageUrl: p.albumArtUrl,
      owner: Array.isArray(p.artistsIds) ? p.artistsIds.join(", ") : p.artistsIds
    })),
    ...mockedAlbums.map(a => ({
      id: a.id,
      title: a.title,
      type: "Album" as const,
      imageUrl: a.albumArtUrl,
      owner: "Various Artists"
    })),
    ...popularTracks.map(t => ({
      id: t.id,
      title: t.title,
      type: "Single" as const,
      imageUrl: t.albumArtUrl,
      owner: t.artist
    }))
  ];
  return (
      <main className="min-h-screen bg-linear-to-b from-gray-900 to-black text-white pb-32">
        <Sidebar items={sidebarData}>
        </Sidebar>
        <ContentPageTest>

        </ContentPageTest>
        <CardTest />
        <Player />
      </main>
  );
}

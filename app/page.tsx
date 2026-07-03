"use client";

import Player from "@/components/generics/Player";
import CardTest from "./test/CardTest";
import CardGroup from "@/components/generics/CardGroup";
import Card from "@/components/generics/Card";
import ContentPageTest from "./test/ContentPageTest";
import Sidebar from "@/components/generics/Sidebar"
import Placeholder from "@/public/placeholder_1024.jpg"
import { mockedPlaylist } from "./test/TrackList";
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
  return (
      <main className="min-h-screen bg-linear-to-b from-gray-900 to-black text-white pb-32">
        <Sidebar>
          <CardGroup title="" orientation="vertical">
            {popularTracks.map((track) => {
              return (
                <Card
                  key={track.id}
                  title={track.title}
                  subtitle={track.album ?? ""}
                  imageSrc={track.albumArtUrl || Placeholder}
                  cardType="Playlist"
                  cardOwner={track.artist}
                  orientation="vertical"
                  dropdownItems={cardDropdownActions([track])}
                />
              );
            })}
          </CardGroup>
        </Sidebar>
        <ContentPageTest>

        </ContentPageTest>
        <CardTest />
        <Player />
      </main>
  );
}

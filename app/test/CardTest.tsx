"use client";

import Card, { DropdownItem } from "@/components/generics/Card";
import CardGroup from "@/components/generics/CardGroup";
import Placeholder from "@/public/placeholder_1024.jpg";
import { Play, ListPlus } from "lucide-react";
import { Track } from "@/components/generics/Player";
import { mockedPlaylist, mockedArtists, mockedAlbums } from "./TrackList";
import { usePlayer } from "@/app/context/PlayerContext";

export default function CardTest() {
  const { playNow, playNext, addToQueue } = usePlayer();

  const popularTracks = mockedPlaylist.slice(0, 40);

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
    <>
      <CardGroup title="Albums Populares" orientation="horizontal">
        {mockedAlbums.map((album) => {
          const tracks = Array.isArray(album.tracks) ? album.tracks : [album.tracks];

          return (
            <Card
              key={album.id}
              title={album.title}
              subtitle={""}
              imageSrc={album.albumArtUrl || Placeholder}
              cardType={album.albumType}
              cardOwner={
                Array.isArray(album.artistIds)
                  ? album.artistIds
                      .map((artistId) => mockedArtists.find((a) => a.id === artistId)?.name)
                      .filter(Boolean)
                      .join(", ")
                  : album.artistIds
              }
              orientation="vertical"
              dropdownItems={cardDropdownActions(tracks)}
            />
          );
        })}
      </CardGroup>

      <CardGroup title="Populares" orientation="horizontal">
        {popularTracks.map((track) => {
          return (
            <Card
              key={track.id}
              title={track.title}
              subtitle={track.album ?? ""}
              imageSrc={track.albumArtUrl || Placeholder}
              cardType="Single"
              cardOwner={track.artist}
              orientation="vertical"
              dropdownItems={cardDropdownActions([track])}
            />
          );
        })}
      </CardGroup>
    </>
  );
}

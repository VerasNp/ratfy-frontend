"use client";

import React from "react";
import ContentHeader, { ContentType } from "@/components/generics/ContentContainer/ContentHeader";
import TrackTable from "@/components/generics/TrackTable";
import CardGroup from "@/components/generics/CardGroup";
import Card, { DropdownItem } from "@/components/generics/Card";
import { Play, ListPlus } from "lucide-react";
import { usePlayer } from "@/app/context/PlayerContext";
import { Track as PlayerTrack } from "@/components/generics/Player";
import { Track as TableTrack } from "@/components/generics/TrackTableItem";

export interface RelatedCardItem {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  type: string;
  owner?: string;
  tracks?: PlayerTrack[];
}

interface GenericContentPageProps {
  id: string;
  title: string;
  type: ContentType;
  coverUrl: string;
  tracks: PlayerTrack[];
  artists: string | string[];
  releaseDate: string | Date;
  totalTracks: number;
  durationTotal?: number;
  contentViews?: number;
  isLiked?: boolean;
  isFollow?: boolean;
  popularReleases?: RelatedCardItem[];
  albums?: RelatedCardItem[];
  singles?: RelatedCardItem[];
  publicPlaylists?: RelatedCardItem[];
  followers?: RelatedCardItem[];
  following?: RelatedCardItem[];
}

function formatTime(seconds?: number): string {
  if (!seconds || isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default function GenericContentPage({
  id,
  title,
  type,
  coverUrl,
  tracks,
  artists,
  releaseDate,
  totalTracks,
  durationTotal = 0,
  contentViews = 0,
  isLiked = false,
  isFollow = false,
  popularReleases,
  albums,
  singles,
  publicPlaylists,
  followers,
  following,
}: GenericContentPageProps) {

  const { playNow, playNext, addToQueue } = usePlayer();

  const isArtist = type === "Artist";
  const isUser = type === "User";
  const isMusic = !isArtist && !isUser;

  const tableVariant = type === "Playlist" ? "playlist" : isArtist ? "artist" : "album";

  const tableTracks: TableTrack[] = tracks.map((t) => ({
    id: t.id,
    title: t.title,
    artist: t.artist,
    album: t.album,
    duration: formatTime(t.duration),
    coverUrl: t.albumArtUrl,
    dateAdded: new Date().toLocaleDateString("pt-BR"),
    audioUrl: t.audioUrl,
    rawDuration: t.duration
  }));

  const calculatedDuration = durationTotal || tracks.reduce((acc, curr) => acc + (curr.duration || 0), 0);
  const getDropdownActions = (itemTracks?: PlayerTrack[]): DropdownItem[] => {
    if (!itemTracks || itemTracks.length === 0) return [];
    return [
      { id: "play-now", icon: <Play size={16} />, item: <span>Play Now</span>, onSelect: () => playNow(itemTracks) },
      { id: "play-next", icon: <ListPlus size={16} />, item: <span>Next in queue</span>, onSelect: () => playNext(itemTracks) },
      { id: "add-queue", icon: <ListPlus size={16} />, item: <span>Add to Queue</span>, onSelect: () => addToQueue(itemTracks) },
    ];
  };
  const renderCardGroup = (groupTitle: string, items?: RelatedCardItem[]) => {
    if (!items || items.length === 0) return null;
    return (
      <CardGroup title={groupTitle} orientation="horizontal" className="mb-4">
        {items.map(item => (
          <Card
            key={item.id}
            title={item.title}
            subtitle={item.subtitle}
            imageSrc={item.imageUrl || "/placeholder_1024.jpg"}
            cardType={item.type as any}
            cardOwner={item.owner || ""}
            orientation="vertical"
            dropdownItems={getDropdownActions(item.tracks)}
          />
        ))}
      </CardGroup>
    );
  };

  return (
    <div className="flex flex-col w-full h-auto bg-bg-main text-white pb-32">
      <ContentHeader
        id={id}
        title={title}
        headerType={type}
        headerArtUrl={coverUrl}
        totalTracks={totalTracks}
        tracks={tracks}
        releaseDate={releaseDate}
        artistsID={artists || []}
        durationTotal={calculatedDuration}
        contentViews={contentViews}
        isLiked={isLiked}
        isFollow={isFollow}
        onLike={() => console.log(`Liked ${title}`)}
        onFollow={() => console.log(`Followed ${title}`)}
        onMore={() => console.log(`More options for ${title}`)}
      />

      <div className="px-6 py-6 bg-linear-to-b from-black/20 to-transparent">
        {isMusic && <TrackTable tracks={tableTracks} variant={tableVariant} />}
        {isArtist && (
          <div className="flex flex-col gap-10">
            {tableTracks.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4 text-white">Popular</h2>
                <TrackTable tracks={tableTracks.slice(0, 10)} variant="artist" />
              </div>
            )}
            {renderCardGroup("Popular Releases", popularReleases)}
            {renderCardGroup("Albums", albums)}
            {renderCardGroup("Singles and EPs", singles)}
          </div>
        )}
        {isUser && (
          <div className="flex flex-col gap-10 mt-4">
            {renderCardGroup("Public Playlists", publicPlaylists)}
            {renderCardGroup("Followers", followers)}
            {renderCardGroup("Following", following)}
          </div>
        )}

      </div>
    </div>
  );
}

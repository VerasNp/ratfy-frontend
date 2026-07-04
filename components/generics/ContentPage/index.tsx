"use client";

import React from "react";
import ContentHeader, { ContentType } from "@/components/generics/ContentContainer/ContentHeader";
import TrackTable from "@/components/generics/TrackTable";
import { Track as PlayerTrack } from "@/components/generics/Player";
import { Track as TableTrack } from "@/components/generics/TrackTableItem";

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
}

// Helper to convert seconds into the "M:SS" string format expected by the TrackTable
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
}: GenericContentPageProps) {

  // 1. Determine the layout variant for the TrackTable
  const tableVariant = type === "Playlist" ? "playlist" : "album";

  // 2. Adapt the Player Tracks into the format expected by TrackTableItem
  const tableTracks: TableTrack[] = tracks.map((t) => ({
    id: t.id,
    title: t.title,
    artist: t.artist,
    album: t.album,
    duration: formatTime(t.duration),
    coverUrl: t.albumArtUrl,
    dateAdded: new Date().toLocaleDateString(), // Mocking date added
  }));

  // Calculate total duration for the header if not explicitly provided
  const calculatedDuration = durationTotal || tracks.reduce((acc, curr) => acc + (curr.duration || 0), 0);

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
        artistsID={artists}
        durationTotal={calculatedDuration}
        contentViews={contentViews}
        isLiked={isLiked}
        onLike={() => console.log(`Liked ${title}`)}
        onMore={() => console.log(`More options for ${title}`)}
      />
      <div className="px-6 py-6 bg-linear-to-b from-black/20 to-transparent">
        <TrackTable tracks={tableTracks} variant={tableVariant} />
      </div>
    </div>
  );
}

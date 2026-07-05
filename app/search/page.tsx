"use client";
import React, { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import CardGroup from "@/components/generics/CardGroup";
import Card, { DropdownItem } from "@/components/generics/Card";
import SearchFilterBar, { SearchFilterType } from "@/components/generics/SearchFilterBar";
import Placeholder from "@/public/placeholder_1024.jpg";
import { Play, ListPlus } from "lucide-react";
import { usePlayer } from "@/app/context/PlayerContext";
import { Track } from "@/components/generics/Player";
import { mockedAlbums, mockedPlaylists, mockedPlaylist, mockedArtists } from "../test/TrackList";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";
  const [activeFilter, setActiveFilter] = useState<SearchFilterType | null>(null);

  const { playNow, playNext, addToQueue } = usePlayer();

  const getDropdownActions = (tracks: Track[]): DropdownItem[] => [
    {
      id: "play-now",
      icon: <Play size={16} />,
      item: <span>Play Now</span>,
      onSelect: () => playNow(tracks),
    },
    {
      id: "play-next",
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

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];

    const results = [];
    if (!activeFilter || activeFilter === "Playlists") {
      const playlists = mockedPlaylists.filter(p => p.title.toLowerCase().includes(query));
      results.push(...playlists.map(p => ({
        id: `playlist-${p.id}`,
        title: p.title,
        type: "Playlist",
        owner: Array.isArray(p.artistIds) ? p.artistIds.join(", ") : p.artistIds,
        imageUrl: p.albumArtUrl,
        tracks: p.tracks
      })));
    }
    if (!activeFilter || activeFilter === "Albums") {
      const albums = mockedAlbums.filter(a => a.title.toLowerCase().includes(query));
      results.push(...albums.map(a => ({
        id: `album-${a.id}`,
        title: a.title,
        type: "Album",
        owner: Array.isArray(a.artistIds) ? a.artistIds.join(", ") : a.artistIds,
        imageUrl: a.albumArtUrl,
        tracks: a.tracks
      })));
    }
    if (!activeFilter || activeFilter === "Artists") {
      const artists = mockedArtists.filter(a => a.name.toLowerCase().includes(query));
      results.push(...artists.map(a => ({
        id: `artist-${a.id}`,
        title: a.name,
        type: "Artist",
        owner: a.name,
        imageUrl: Placeholder.src,
        tracks: []
      })));
    }
    if (!activeFilter || activeFilter === "Single Tracks") {
      const tracks = mockedPlaylist.filter(t =>
        t.title.toLowerCase().includes(query) || t.artist.toLowerCase().includes(query)
      );
      results.push(...tracks.map(t => ({
        id: `track-${t.id}`,
        title: t.title,
        type: "Single",
        owner: t.artist,
        imageUrl: t.albumArtUrl,
        tracks: [t]
      })));
    }

    return results;
  }, [query, activeFilter]);

  return (
    <main className="flex-1 overflow-y-auto bg-bg-main text-white p-6 pb-32 h-full">
      {query ? (
        <h1 className="text-2xl font-bold mb-6">Search Results for &quot;{searchParams.get("q")}&quot;</h1>
      ) : (
        <h1 className="text-2xl font-bold mb-6">Search</h1>
      )}

      <SearchFilterBar onFilterChange={(filter) => setActiveFilter(filter)} />

      <CardGroup orientation="vertical" className="h-full" title="" hiddenTitle>
        {searchResults.length > 0 ? (
          searchResults.map(item => (
             <Card
               key={item.id}
               title={item.title}
               subtitle={""}
               imageSrc={item.imageUrl || Placeholder}
               cardType={item.type as any}
               cardOwner={item.owner}
               orientation="horizontal"
               dropdownItems={item.tracks.length > 0 ? getDropdownActions(item.tracks as Track[]) : []}
             />
          ))
        ) : (
          query && <div className="text-zinc-400 mt-8">No results found. Please try another search.</div>
        )}
      </CardGroup>
    </main>
  );
}

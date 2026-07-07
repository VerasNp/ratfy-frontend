"use client";
import React, { useState, useMemo } from "react";
import Container from "../Container/index";
import Card, { DropdownItem } from "../Card/index";
import Text from "../Text/index";
import FilterBar from "./filterBar";
import Placeholder from "../../../public/placeholder_1024.jpg";
import { Library, Play, ListPlus, ArrowRightToLine } from "lucide-react";
import Icon from "../Icon";
import { usePlayer } from "@/app/context/PlayerContext";
import { Track } from "../Player/index";
import styles from "./SiderbarScroll.module.css";
import { useUserContext } from "@/app/context/UserContext";
import { mockedPlaylists, mockedArtists } from "@/app/test/TrackList";

export interface SidebarItem {
  id: string;
  title: string;
  type: "Playlist" | "Album" | "Artist" | "Single" | "";
  imageUrl?: string;
  owner?: string;
  tracks: Track[];
}

export default function Sidebar() {
  const { playNow, playNext, addToQueue } = usePlayer();
  const { playlists, followedArtists, favorites } = useUserContext();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [activeSort, setActiveSort] = useState("Recents");

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


  const items = useMemo(() => {
    const resolvedItems: SidebarItem[] = [];
    playlists.forEach(playlistId => {
      const p = mockedPlaylists.find(x => x.id === playlistId);
      if (p) {
        resolvedItems.push({
          id: p.id,
          title: p.title,
          type: "Playlist",
          imageUrl: p.albumArtUrl,
          owner: Array.isArray(p.artistsIds) ? p.artistsIds.join(", ") : p.artistsIds,
          tracks: p.tracks
        });
      }
    });
    followedArtists.forEach(artistId => {
      const a = mockedArtists.find(x => x.id === artistId);
      if (a) {
        resolvedItems.push({
          id: a.id,
          title: a.name,
          type: "Artist",
          imageUrl: Placeholder.src,
          owner: "Artist",
          tracks: []
        });
      }
    });
    const favArray = Array.isArray(favorites) ? favorites : (favorites ? [favorites] : []);
    favArray.forEach(fav => {
      resolvedItems.push({
        id: fav.id,
        title: fav.title,
        type: "Single",
        imageUrl: fav.imageUrl,
        owner: fav.owner || "Unknown Artist",
        tracks: fav.tracks || []
      });
    });

    return resolvedItems;
  }, [playlists, followedArtists, favorites]);
  const filteredItems = useMemo(() => {
    let result = [...items];
    if (activeFilter) {
      const typeMatch = activeFilter.replace(/s$/, "");
      result = result.filter((item) => item.type === typeMatch);
    }
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(lowerQuery) ||
          item.owner?.toLowerCase().includes(lowerQuery)
      );
    }
    if (activeSort === "Alphabetical") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }
    return result;
  }, [items, searchQuery, activeFilter, activeSort]);

  return (
    <aside
      className={`
        h-[calc(100vh-140px)]
        flex flex-col gap-2 p-2
        transition-all duration-200 ease-in-out
        ${isCollapsed ? "w-[55px]" : "w-100"}
        `}
    >
      <Container className="flex flex-col bg-bg-main rounded-lg p-2 h-full shadow-lg">
        <div
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`flex items-center py-2 mb-2 cursor-pointer hover:text-white text-[#a7a7a7] transition-colors ${
            isCollapsed ? "justify-center" : "gap-4 px-2"
          }`}
          title="Collapse/Expand Your Library"
        >
          <Icon src={isCollapsed ? ArrowRightToLine : Library} size={28} />
          {!isCollapsed && (
            <Text textString="Your Library" size="xl" color="inherit" weight="bold" />
          )}
        </div>

        {!isCollapsed && (
          <div className="flex gap-2 w-full mb-2">
            <FilterBar
              onFilterChange={(filter) => setActiveFilter(filter)}
              onSortChange={(sort) => setActiveSort(sort)}
              onSearchChange={(query) => setSearchQuery(query)}
            />
          </div>
        )}

        <div className={`flex-1 overflow-y-auto min-h-0 custom-scrollbar mt-2 ${styles.scrollSidebarContainer}`}>
          {filteredItems.length > 0 ? (
            <div className="flex flex-col gap-1 w-full pb-4">
              {filteredItems.map((item) => (
                <Card
                  key={`${item.type}-${item.id}`}
                  title={item.title}
                  subtitle={""}
                  imageSrc={item.imageUrl || Placeholder.src}
                  cardType={item.type}
                  cardOwner={item.owner || ""}
                  orientation="horizontal"
                  bgColor="transparent"
                  hoverBgColor="var(--bg-elevated-highlight)"
                  dropdownItems={getDropdownActions(item.tracks)}
                />
              ))}
            </div>
          ) : (
            !isCollapsed && (
              <div className="text-center mt-12 px-4 text-zinc-400 text-sm">
                No results found for "{searchQuery}"
              </div>
            )
          )}
        </div>
      </Container>
    </aside>
  );
}

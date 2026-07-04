"use client";

import React, { useState, useMemo } from "react";
import Container from "../Container/index";
import Card, { DropdownItem } from "../Card/index";
import Text from "../Text/index";
import FilterBar from "./filterBar";
import Placeholder from "../../../public/placeholder_1024.jpg";
import { Library, Play, ListPlus } from "lucide-react";
import Icon from "../Icon";

// Import your context and track interfaces
import { usePlayer } from "@/app/context/PlayerContext";
import { Track } from "../Player/index";

import styles from "./SiderbarScroll.module.css"

// Added 'tracks' to the interface so we can pass them to the player
export interface SidebarItem {
  id: string;
  title: string;
  type: "Playlist" | "Album" | "Artist" | "Single" | "";
  imageUrl?: string;
  owner?: string;
  tracks: Track[];
}

interface SidebarProps {
  items?: SidebarItem[];
}

export default function Sidebar({ items = [] }: SidebarProps) {
  // --- Global Player Context ---
  const { playNow, playNext, addToQueue } = usePlayer();

  // --- States ---
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [activeSort, setActiveSort] = useState("Recents");

  // --- Helper: Dropdown Actions (Exactly like CardTest.tsx) ---
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

  // --- Filtering Logic ---
  const filteredItems = useMemo(() => {
    let result = [...items];

    // 1. Filter by Tag
    if (activeFilter) {
      const typeMatch = activeFilter.replace(/s$/, "");
      result = result.filter((item) => item.type === typeMatch);
    }

    // 2. Filter by Search Text
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(lowerQuery) ||
          item.owner?.toLowerCase().includes(lowerQuery)
      );
    }

    // 3. Apply Sorting
    if (activeSort === "Alphabetical") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [items, searchQuery, activeFilter, activeSort]);

  return (
    <aside
      className={`h-[calc(100vh-80px)] flex flex-col gap-2 p-2 transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-[88px]" : "w-[340px]"
      }`}
    >
      <Container className="flex flex-col bg-[var(--bg-main)] rounded-lg p-2 h-full shadow-lg min-h-0">

        {/* Header & Collapse Toggle */}
        <div
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`flex items-center py-2 mb-2 cursor-pointer hover:text-white text-[#a7a7a7] transition-colors ${
            isCollapsed ? "justify-center" : "gap-4 px-2"
          }`}
          title="Collapse/Expand Your Library"
        >
          <Icon src={Library} size={28} />
          {!isCollapsed && (
            <Text textString="Your Library" size="xl" color="inherit" weight="bold" />
          )}
        </div>

        {/* FilterBar - Hidden when collapsed */}
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
            // Empty State
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

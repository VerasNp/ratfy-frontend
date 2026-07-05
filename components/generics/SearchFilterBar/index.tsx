'use client';
import React, { useState } from "react";
import Container from "../Container/index";

export type SearchFilterType = "Playlists" | "Albums" | "Artists" | "Single Tracks";
const FILTERS: SearchFilterType[] = ["Playlists", "Albums", "Artists", "Single Tracks"];

interface SearchFilterBarProps {
  onFilterChange?: (filter: SearchFilterType | null) => void;
}

export default function SearchFilterBar({ onFilterChange }: SearchFilterBarProps) {
  const [activeFilter, setActiveFilter] = useState<SearchFilterType | null>(null);

  function handleFilterClick(filter: SearchFilterType) {
    const next = activeFilter === filter ? null : filter;
    setActiveFilter(next);
    onFilterChange?.(next);
  }

  return (
    <Container className="flex flex-col gap-3 w-full py-2 mb-4">
      <Container className="flex flex-row items-center gap-2 w-full min-h-[32px]">
        <Container className="flex flex-row gap-2 overflow-x-auto scrollbar-hide flex-1">
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => handleFilterClick(filter)}
                className={`
                  flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium
                  transition-all duration-150 cursor-pointer
                  ${
                    isActive
                      ? "bg-white text-black"
                      : "bg-[#2a2a2a] text-[#eeeeee] hover:bg-[#3a3a3a]"
                  }
                `}
              >
                {filter}
              </button>
            );
          })}
        </Container>
      </Container>
    </Container>
  );
}

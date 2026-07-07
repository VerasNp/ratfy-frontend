'use client';
import React, { useState, useRef, useEffect } from "react";
import InputText from "../InputText/index";
import { Search as SearchIcon, Indent as IndentIcon} from "lucide-react"
import Button from "../Button/index";
import Text from "../Text/index";
import Image from "../Image/index";
import Container from "../Container/index";
import Icon from "../Icon/index"
import {
  LucideSearch,
  LucideArrowUpDown,
  LucideCheck,
  LucideList,
} from "lucide-react";
type FilterType = "Playlists" | "Albums" | "Artists";
type SortOption = "Recents" | "Recently Added" | "Alphabetical" | "Creator" | "";

const FILTERS: FilterType[] = ["Playlists", "Albums", "Artists"];
const SORT_OPTIONS: SortOption[] = [
  "Recents",
  "Recently Added",
  "Alphabetical",
  "Creator",
];

interface FilterBarProps {
  onFilterChange?: (filter: FilterType | null) => void;
  onSortChange?: (sort: SortOption) => void;
  onSearchChange?: (query: string) => void;
}

export default function FilterBar({
  onFilterChange,
  onSortChange,
  onSearchChange,
}: FilterBarProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType | null>(null);
  const [sortOpen, setSortOpen] = useState(false);
  const [activeSort, setActiveSort] = useState<SortOption>("Recents");

  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  function handleFilterClick(filter: FilterType) {
    const next = activeFilter === filter ? null : filter;
    setActiveFilter(next);
    onFilterChange?.(next);
  }
  function handleSortSelect(option: SortOption) {
    setActiveSort(option);
    setSortOpen(false);
    onSortChange?.(option);
  }
  function handleSearchClose() {
    setSearchOpen(false);
    setSearchQuery("");
    onSearchChange?.("");
  }
  function handleDropdownClose(){
    setSortOpen(false);
  }
  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
    onSearchChange?.(e.target.value);
  }
  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
    }
  }, [searchOpen]);
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setSortOpen(false);

      }
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target as Node)
      ) {
        handleSearchClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  return (
    <Container className="flex flex-col gap-3 w-full ">
      <Container className="flex flex-row items-center gap-2 w-full min-h-[32px]">
        <Container className="flex flex-row gap-2 overflow-x-auto scrollbar-hide flex-1">
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => handleFilterClick(filter)}
                className={`
                  flex-shrink-0 px-3 py-1 rounded-full text-sm font-medium
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
      <Container className="flex flex-row items-center ">
        <Container className="flex w-[80%]">
          {searchOpen ? (
            <div ref={searchRef} className="flex items-center gap-2 w-full">
              <Container className="flex-1 transition-all">
                <InputText
                  variant="roundedOutline"
                  size="sm"
                  leftIcon={LucideSearch}
                  clearable
                  placeholder="Search in Your Library"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="bg-[#2a2a2a] text-[#eeeeee] placeholder:text-[#777] text-sm w-full"
                />
              </Container>
            </div>
          ) : (
            <>
              <button
                aria-label="Open search"
                onClick={() => setSearchOpen(true)}
                className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-[#aaaaaa] hover:text-white hover:bg-[#2a2a2a] transition-all cursor-pointer"
              >
                <Icon src={LucideSearch} size={22} />
              </button>
            </>
          )}
        </Container>
        <Container className="flex flex-row justify-end w-[20%]">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setSortOpen((prev) => !prev)}
              className="flex items-center gap-1.5 text-[#aaaaaa] hover:text-white transition-colors text-sm cursor-pointer group"
            >
              <span
                className="font-medium whitespace-nowrap overflow-hidden transition-all duration-200"
                style={{
                  maxWidth: searchOpen ? "0px" : "120px",
                  opacity: searchOpen ? 0 : 1,
                }}
              >
                {activeSort}
              </span>
              <Icon src={LucideList} size={16} />
            </button>
            {sortOpen && (
              <div
                className="absolute right-0 top-full mt-1 z-50 min-w-[180px] rounded-md shadow-xl overflow-hidden"
                style={{ background: "#282828" }}
              >
                <div className="py-1">
                  <p className="px-4 py-2 text-[11px] font-semibold text-[#aaaaaa] uppercase tracking-wider">
                    Sort by
                  </p>
                  {SORT_OPTIONS.map((option) => {
                    const isSelected = activeSort === option;
                    return (
                      <button
                        key={option}
                        onClick={() => handleSortSelect(option)}
                        className="w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-[#3a3a3a] transition-all cursor-pointer"
                      >
                        <span
                          className={
                            isSelected ? "text-[#1db954]" : "text-[#eeeeee]"
                          }
                        >
                          {option}
                        </span>
                        {isSelected && (
                          <Icon src={LucideCheck} size={14} color="#1db954" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </Container>
      </Container>
    </Container>
  );
}

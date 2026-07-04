"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Home, Search, Music } from "lucide-react";
import Button from "../Button";
import InputText from "../InputText";
import Icon from "../Icon";
import Image from "../Image";

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchValue, setSearchValue] = useState(searchParams.get("q") || "");

  // 1. Dedicated search function to update the URL
  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (searchValue.trim()) {
      params.set("q", searchValue.trim());
    } else {
      params.delete("q");
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  // 2. Handler for the "Enter" key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <header className="flex items-center justify-between px-6 py-2 w-full bg-black">
      <div className="shrink-0 cursor-pointer hover:scale-105 transition-transform duration-200">
        <Icon src={Music} size={32} className="text-white" />
      </div>
      <div className="flex items-center gap-2 flex-1 justify-center max-w-2xl">
        <Button
          variant="ghost"
          size="icon"
          label="Home"
          className="w-12 h-12 bg-[var(--bg-elevated-highlight)] hover:scale-105 transition-transform duration-200 text-white rounded-full"
          onClick={() => {
            setSearchValue("");
            router.push('/');
          }}
        >
            <Icon src={Home} size={24} />
        </Button>
        <div className="w-full max-w-[450px]">
          <InputText
            variant="rounded"
            size="md"
            placeholder="What do you want to play?"
            // 3. Set the Search icon as a clickable button on the right side
            rightIcon={{ icon: Search, action: "button" }}
            onRightIconClick={handleSearch}
            // 4. Attach the Enter key listener
            onKeyDown={handleKeyDown}
            clearable
            fullWidth
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center gap-6 text-[var(--text-secondary)]">
        <div className="flex items-center justify-center p-1 rounded-full bg-black cursor-pointer hover:scale-105 transition-transform duration-200">
          <Image src="/avatar.png" alt="User avatar" size={32} className="rounded-full"/>
        </div>
      </div>
    </header>
  );
}

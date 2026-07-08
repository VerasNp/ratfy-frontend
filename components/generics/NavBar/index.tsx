"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Home, Search, Music, LogOut, User } from "lucide-react";
import Button from "../Button";
import InputText from "../InputText";
import Icon from "../Icon";
import Image from "../Image";
import Dropdown from "../Dropdown";
import { useUserContext } from "@/app/context/UserContext";

export default function NavBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get("q") || "");
  const { isLoggedIn, logout } = useUserContext();

  useEffect(() => {
    setSearchValue(searchParams.get("q") || "");
  }, [searchParams]);

  const handleSearch = () => {
    if (searchValue.trim()) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("q", searchValue);
      router.push(`/search?${params.toString()}`);
    } else {
      router.push(`/search`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
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
          className="w-12 h-12 bg-bg-elevated-highlight hover:scale-105 transition-transform duration-200 text-white rounded-full"
          onClick={() => {
            setSearchValue("");
            router.push("/");
          }}
        >
          <Icon src={Home} size={24} />
        </Button>
        <div className="w-full max-w-[450px]">
          <InputText
            variant="rounded"
            size="md"
            placeholder="What do you want to play?"
            rightIcon={{ icon: Search, action: "button" }}
            onRightIconClick={handleSearch}
            onKeyDown={handleKeyDown}
            clearable
            fullWidth
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center gap-6 text-text-secondary">
        {isLoggedIn ? (
          <Dropdown
            align="right"
            triggerComponent={
              <div className="flex items-center justify-center p-1 rounded-full bg-black cursor-pointer hover:scale-105 transition-transform duration-200">
                <Image src="/avatar.png" alt="User avatar" size={32} className="rounded-full" />
              </div>
            }
            items={[
              {
                id: "profile",
                icon: <User size={16} />,
                item: <span>Perfil</span>,
                onSelect: () => {},
              },
              {
                id: "logout",
                icon: <LogOut size={16} />,
                item: <span>Sair</span>,
                onSelect: () => {
                  logout();
                  router.push("/");
                },
              },
            ]}
          />
        ) : (
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              label="Entrar"
              className="text-white hover:scale-105 transition-transform duration-200"
              onClick={() => router.push("/login")}
            >
              Entrar
            </Button>
            <Button
              variant="brand"
              size="sm"
              label="Inscrever-se"
              className="hover:scale-105 transition-transform duration-200"
              onClick={() => router.push("/signup")}
            >
              Inscrever-se
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}

"use client"
import { RelatedCardItem } from "@/components/generics/ContentContainer";
import React, { createContext, useContext, useState } from "react";
import { mockedPlaylist } from "../test/TrackList";

export interface ObjectItem {
  id: string,
  title: string,
  type: string,
  url?: string,
}

interface UserContextType {
  favorites: RelatedCardItem[] | RelatedCardItem
  playlists: string[];
  followedArtists: string[];
  followingUsers: string[];
  setFollow: (items: ObjectItem[]) => void;
  setLike: (items: ObjectItem[]) => void;
  saveInPlaylist: (track: string, playlist: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  // Creating a simulated favored track based on the existing mocked database
  const mockFavoriteTrack: RelatedCardItem = {
    id: mockedPlaylist[0].id,
    title: mockedPlaylist[0].title,
    subtitle: mockedPlaylist[0].artist,
    imageUrl: mockedPlaylist[0].albumArtUrl,
    type: "Single",
    owner: mockedPlaylist[0].artist,
    tracks: [mockedPlaylist[0]]
  };

  const [favorites, setFavorites] = useState<RelatedCardItem[]>([mockFavoriteTrack]);
  const [playlists, setPlaylists] = useState<string[]>(["1"]); // Mapped to Workout Hype
  const [followedArtists, setFollowedArtists] = useState<string[]>(["1", "2"]); // Mapped to Synthwave Squad, The Woodsmen
  const [followingUsers, setFollowingUsers] = useState<string[]>([]);

  const setFollow = (items: ObjectItem[]) => {
  };

  const setLike = (items: ObjectItem[]) => {
  };

  const saveInPlaylist = (track: string, playlist: string) => {
  };

  return (
    <UserContext.Provider
      value={{
        favorites,
        playlists,
        followedArtists,
        followingUsers,
        setFollow,
        setLike,
        saveInPlaylist
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUserContext() {
  const context = useContext(UserContext)
  if (context === undefined) {
      throw new Error("useUserContext must be used within a UserContextProvider")
  }
  return context;
}

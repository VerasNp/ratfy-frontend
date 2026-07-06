"use client";
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export interface ObjectItem {
  id: string;
  title: string;
  type: "TRACK" | "ALBUM" | "ARTIST" | "PLAYLIST" | string;
  url?: string;
}

interface UserContextType {
  favorites: any[]; 
  playlists: any[];
  followedArtists: any[];
  followingUsers: any[];
  setFollow: (items: ObjectItem[]) => Promise<void>;
  setLike: (items: ObjectItem[]) => Promise<void>;
  saveInPlaylist: (trackId: string, playlistId: string) => Promise<void>;
  refreshData: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [followedArtists, setFollowedArtists] = useState<any[]>([]);
  const [followingUsers, setFollowingUsers] = useState<any[]>([]); // Preserved for future expansion

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  const getAuthHeaders = () => {
    // Assuming token is saved to localStorage on login as per login/page.tsx
    const token = typeof window !== 'undefined' ? localStorage.getItem("accessToken") : null;
    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  };

  const fetchUserData = useCallback(async () => {
    try {
      // 1. Fetch Favorite Playlists[cite: 4]
      const playlistsRes = await fetch(`${apiUrl}/favorites/playlists`, { headers: getAuthHeaders() });
      if (playlistsRes.ok) {
        const data = await playlistsRes.json();
        setPlaylists(data.data || []);
      }

      // 2. Fetch Favorite Artists[cite: 4]
      const artistsRes = await fetch(`${apiUrl}/favorites/artists`, { headers: getAuthHeaders() });
      if (artistsRes.ok) {
        const data = await artistsRes.json();
        setFollowedArtists(data.data || []);
      }

      // 3. Fetch Favorite Tracks[cite: 4]
      const tracksRes = await fetch(`${apiUrl}/favorites/tracks`, { headers: getAuthHeaders() });
      let tracksData = [];
      if (tracksRes.ok) {
        const data = await tracksRes.json();
        tracksData = data.data || [];
      }

      // 4. Fetch Favorite Albums[cite: 4]
      const albumsRes = await fetch(`${apiUrl}/favorites/albums`, { headers: getAuthHeaders() });
      let albumsData = [];
      if (albumsRes.ok) {
        const data = await albumsRes.json();
        albumsData = data.data || [];
      }

      // Consolidate generic favorites (Albums and Tracks)
      setFavorites([...tracksData, ...albumsData]);
    } catch (error) {
      console.error("Error fetching user context data:", error);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const setFollow = async (items: ObjectItem[]) => {
    for (const item of items) {
      const endpoint = item.type === "ARTIST" ? "artists" : "users";
      try {
        await fetch(`${apiUrl}/favorites/${endpoint}/${item.id}`, {
          method: "POST", //[cite: 4]
          headers: getAuthHeaders(),
        });
      } catch (error) {
        console.error(`Failed to follow ${item.type}:`, error);
      }
    }
    await fetchUserData();
  };

  const setLike = async (items: ObjectItem[]) => {
    for (const item of items) {
      let endpoint = "tracks";
      if (item.type === "ALBUM") endpoint = "albums";
      if (item.type === "PLAYLIST") endpoint = "playlists";

      try {
        await fetch(`${apiUrl}/favorites/${endpoint}/${item.id}`, {
          method: "POST", //[cite: 4]
          headers: getAuthHeaders(),
        });
      } catch (error) {
        console.error(`Failed to like ${item.type}:`, error);
      }
    }
    await fetchUserData();
  };

  const saveInPlaylist = async (trackId: string, playlistId: string) => {
    try {
      await fetch(`${apiUrl}/playlists/${playlistId}/tracks`, {
        method: "POST", 
        headers: getAuthHeaders(),
        body: JSON.stringify({ trackId }), // Required body format per PlaylistController[cite: 4]
      });
      await fetchUserData();
    } catch (error) {
      console.error("Failed to save track in playlist:", error);
    }
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
        saveInPlaylist,
        refreshData: fetchUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
}
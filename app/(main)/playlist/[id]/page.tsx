"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import GenericContentPage from "@/components/generics/ContentContainer";
import Icon from "@/components/generics/Icon";
import { Loader2, AlertCircle, XCircle } from "lucide-react";
import Placeholder from "@/public/placeholder_1024.jpg";
import { mockedPlaylists } from "@/app/test/TrackList";

export default function PlaylistPage() {
    const params = useParams();
    const router = useRouter();

    const playlistId = params.id as string;
    const [playlist, setPlaylist] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isNotFound, setIsNotFound] = useState(false);

    // Função auxiliar para fallback local caso a API falhe
    const handleFallbackMock = (id: string) => {
        const mockPlaylist = mockedPlaylists.find(p => p.id === id) || mockedPlaylists[0];

        setPlaylist({
            id: mockPlaylist.id,
            title: mockPlaylist.title,
            type: "Playlist",
            coverUrl: mockPlaylist.albumArtUrl || Placeholder.src,
            tracks: mockPlaylist.tracks,
            artists: Array.isArray(mockPlaylist.artistsIds) ? mockPlaylist.artistsIds.join(", ") : mockPlaylist.artistsIds,
            releaseDate: mockPlaylist.createdAt || new Date().toISOString(),
            totalTracks: mockPlaylist.tracks?.length || 0,
            contentViews: 0,
        });
    };

    useEffect(() => {
        const fetchPlaylist = async () => {
            try {
              /*
                const token = localStorage.getItem("accessToken");
                if (!token) {
                    //router.push("/login");
                    return;
                }

                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                const fetchPlaylistData = async (currentToken: string) => {
                    return await fetch(`${apiUrl}/playlists/${playlistId}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${currentToken}`
                        }
                    });
                };

                let response = await fetchPlaylistData(token);

                if (response.status === 401 || response.status === 403) {
                    try {
                        const refreshResponse = await fetch(`${apiUrl}/refresh-token`, {
                            method: "POST",
                            credentials: "include"
                        });

                        if (refreshResponse.ok) {
                            const refreshData = await refreshResponse.json();
                            const newAccessToken = refreshData.accessToken;
                            localStorage.setItem("accessToken", newAccessToken);
                            response = await fetchPlaylistData(newAccessToken);
                        } else {
                            handleFallbackMock(playlistId);
                            return;
                        }
                    } catch (err) {
                        handleFallbackMock(playlistId);
                        return;
                    }
                }

                if (!response.ok) {
                    if (response.status === 404) {
                        setIsNotFound(true);
                    } else {
                        handleFallbackMock(playlistId);
                    }
                    return;
                }

                const backendData = await response.json();
              const backendPlaylist = backendData.body || {};
              */
                const backendPlaylist = playlist[id]
                setPlaylist({
                    id: backendPlaylist.id || playlistId,
                    title: backendPlaylist.name || "Minha Playlist",
                    type: "Playlist",
                    coverUrl: backendPlaylist.coverUrl || Placeholder.src,
                    tracks: backendPlaylist.tracks || [],
                    artists: backendPlaylist.ownerName || "Usuário",
                    releaseDate: backendPlaylist.createdAt || new Date().toISOString(),
                    totalTracks: backendPlaylist.tracks?.length || 0,
                    contentViews: backendPlaylist.followersCount || 0,
                });

            } catch (err: any) {
                handleFallbackMock(playlistId);
            } finally {
                setIsLoading(false);
            }
        };

        if (playlistId) {
            fetchPlaylist();
        }
    }, [playlistId, router]);

    return (
        <div className="flex flex-col flex-1 w-full min-w-0 overflow-y-auto bg-transparent">
            {isLoading ? (
                <div className="flex-1 flex items-center justify-center w-full h-full">
                    <Icon src={Loader2} size={48} className="animate-spin text-[var(--text-secondary)]" color="currentColor" />
                </div>
            ) : isNotFound ? (
                <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center h-full">
                    <Icon src={AlertCircle} size={64} color="white" />
                    <h1 className="text-3xl font-bold text-white mt-2">
                        Não foi possível localizar esta playlist
                    </h1>
                    <p className="text-[var(--text-secondary)] text-base">
                        A playlist pode ter sido excluída ou tornada privada.
                    </p>
                </div>
            ) : !playlist ? (
                <div className="flex-1 flex items-center justify-center w-full h-full">
                    <Icon src={Loader2} size={48} className="animate-spin text-[var(--text-secondary)]" color="currentColor" />
                </div>
            ) : (
                <GenericContentPage
                    id={playlist.id}
                    title={playlist.title}
                    type={playlist.type}
                    coverUrl={playlist.coverUrl}
                    tracks={playlist.tracks}
                    artists={playlist.artists}
                    releaseDate={playlist.releaseDate}
                    totalTracks={playlist.totalTracks}
                    contentViews={playlist.contentViews}
                    isLiked={false}
                    isFollow={false}
                />
            )}
        </div>
    );
}

"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import GenericContentPage from "@/components/generics/ContentContainer";
import { mockedAlbums } from "@/app/test/TrackList";
import Icon from "@/components/generics/Icon";
import { Loader2, AlertCircle, XCircle } from "lucide-react";

export default function AlbumPage() {
    const params = useParams();
    const router = useRouter();

    const albumId = params.id as string;

    const [album, setAlbum] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isNotFound, setIsNotFound] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const fetchAlbum = async () => {
          try {
              /*
                const token = localStorage.getItem("accessToken");
                if (!token) {
                    router.push("/login");
                    return;
                }

                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                const fetchAlbumData = async (currentToken: string) => {
                    return await fetch(`${apiUrl}/albums/${albumId}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${currentToken}`
                        }
                    });
                };

                let response = await fetchAlbumData(token);

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
                            response = await fetchAlbumData(newAccessToken);
                        } else {
                            setHasError(true);
                            return;
                        }
                    } catch (err) {
                        setHasError(true);
                        return;
                    }
                }

                if (!response.ok) {
                    if (response.status === 404) {
                        setIsNotFound(true);
                    } else {
                        setHasError(true);
                    }
                    return;
                }

                const backendData = await response.json();
                const backendAlbum = backendData.body;
              */
                const fallbackMock = mockedAlbums[0]; // Mock

                setAlbum({
                    id: fallbackMock.id,
                    title: fallbackMock.title,
                    type: "Album",
                    coverUrl: fallbackMock.albumArtUrl, // Mock
                    tracks: fallbackMock.tracks, // Mock
                    artists: ["Vários Artistas"],
                    releaseDate: fallbackMock.releaseDate,
                    totalTracks: fallbackMock.totalTracks,
                });

            } catch (err: any) {
                setHasError(true);
            } finally {
                setIsLoading(false);
            }
        };

        if (albumId) {
            fetchAlbum();
        }
    }, [albumId, router]);

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
                        Não foi possível localizar esse álbum
                    </h1>
                    <p className="text-[var(--text-secondary)] text-base">
                        Quer fazer outra busca?
                    </p>
                </div>
            ) : hasError || !album ? (
                <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center h-full">
                    <Icon src={XCircle} size={64} color="white" />
                    <h1 className="text-3xl font-bold text-white mt-2">
                        Erro ao carregar o álbum
                    </h1>
                    <p className="text-[var(--text-secondary)] text-base">
                        Ocorreu um problema de conexão ou falha no servidor.
                    </p>
                </div>
            ) : (
                <GenericContentPage
                    id={album.id}
                    title={album.title}
                    type={album.type}
                    coverUrl={album.coverUrl}
                    tracks={album.tracks}
                    artists={album.artists}
                    releaseDate={album.releaseDate}
                    totalTracks={album.totalTracks}
                    contentViews={0}
                    isLiked={false}
                />
            )}
        </div>
    );
}

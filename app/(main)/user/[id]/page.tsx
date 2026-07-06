"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import GenericContentPage, { RelatedCardItem } from "@/components/generics/ContentContainer";
import Icon from "@/components/generics/Icon";
import { Loader2, AlertCircle, XCircle } from "lucide-react";
import Placeholder from "@/public/placeholder_1024.jpg";
import { extendedMockedArtists, mockUsersDatabase } from "@/app/test/TrackList";

export default function UserProfilePage() {
    const params = useParams();
    const router = useRouter();

    const userId = params.id as string;
    const [userProfile, setUserProfile] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isNotFound, setIsNotFound] = useState(false);

    const handleFallbackMock = (id: string) => {
        const mockUser = mockUsersDatabase[id] || mockUsersDatabase["user-1"];

        setUserProfile({
            id: mockUser.id,
            title: mockUser.name,
            type: "User",
            coverUrl: mockUser.avatarUrl,
            tracks: [],
            artists: [],
            releaseDate: mockUser.createdAt,
            totalTracks: mockUser.publicPlaylists.length,
            contentViews: mockUser.followers.length,
            publicPlaylists: mockUser.publicPlaylists,
            following: mockUser.followedArtists,
            followers: mockUser.followers,
        });
    };

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                /*
                const token = localStorage.getItem("accessToken");
                if (!token) {
                    router.push("/login");
                    return;
                }

                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                const fetchUserData = async (currentToken: string) => {
                    return await fetch(`${apiUrl}/users/${userId}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${currentToken}`
                        }
                    });
                };

                let response = await fetchUserData(token);

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
                            response = await fetchUserData(newAccessToken);
                        } else {
                            handleFallbackMock(userId);
                            return;
                        }
                    } catch (err) {
                        handleFallbackMock(userId);
                        return;
                    }
                }

                if (!response.ok) {
                    if (response.status === 404) {
                        setIsNotFound(true);
                    } else {
                        handleFallbackMock(userId);
                    }
                    return;
                }

                const backendData = await response.json();
                const backendUser = backendData.body || {};
                 */
              const backendUser = mockUsersDatabase["user-1"];
                setUserProfile({
                    id: backendUser?.id || userId,
                    title: backendUser?.name || "Nome do Usuário",
                    type: "User",
                    coverUrl: backendUser?.avatarUrl || Placeholder.src,
                    tracks: [],
                    artists: [],
                    releaseDate: backendUser?.createdAt || new Date().toISOString(),
                    totalTracks: backendUser?.publicPlaylistsCount || 0,
                    contentViews: backendUser?.followersCount || 0,
                    publicPlaylists: backendUser?.publicPlaylists || [],
                    following: backendUser?.followedArtists || [],
                    followers: backendUser?.followers || [],
                });

            } catch (err: any) {
                handleFallbackMock(userId);
            } finally {
                setIsLoading(false);
            }
        };

        if (userId) {
            fetchUserProfile();
        }
    }, [userId, router]);

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
                        Não foi possível localizar esse usuário
                    </h1>
                    <p className="text-[var(--text-secondary)] text-base">
                        Verifique se a URL está correta e tente novamente.
                    </p>
                </div>
            ) : !userProfile ? (
                <div className="flex-1 flex items-center justify-center w-full h-full">
                    <Icon src={Loader2} size={48} className="animate-spin text-[var(--text-secondary)]" color="currentColor" />
                </div>
            ) : (
                <GenericContentPage
                    id={userProfile.id}
                    title={userProfile.title}
                    type={userProfile.type}
                    coverUrl={userProfile.coverUrl}
                    tracks={userProfile.tracks}
                    artists={userProfile.artists}
                    releaseDate={userProfile.releaseDate}
                    totalTracks={userProfile.totalTracks}
                    contentViews={userProfile.contentViews}
                    isLiked={false}
                    isFollow={false}
                    publicPlaylists={userProfile.publicPlaylists}
                    following={userProfile.following}
                    followers={userProfile.followers}
                />
            )}
        </div>
    );
}

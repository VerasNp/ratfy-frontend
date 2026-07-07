import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import GenericContentPage, { RelatedCardItem } from "@/components/generics/ContentContainer";
import Icon from "@/components/generics/Icon";
import { Loader2, AlertCircle, Info } from "lucide-react";
import Placeholder from "@/public/placeholder_1024.jpg";
import { mockedArtists } from "@/app/test/TrackList";
import { mockArtistsDatabase} from "@/app/test/TrackList"

export default function ArtistProfilePage() {
    const params = useParams();
    const router = useRouter();

    const artistId = params.id as string;
    const [artistProfile, setArtistProfile] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isNotFound, setIsNotFound] = useState(false);


    const handleFallbackMock = (id: string) => {
        const mockArtist = mockArtistsDatabase[id] || mockArtistsDatabase["art-1"];

        setArtistProfile({
            id: mockArtist.id,
            title: mockArtist.name,
            type: "Artist",
            coverUrl: mockArtist.avatarUrl,
            tracks: mockArtist.popularTracks,
            artists: [],
            releaseDate: "",
            totalTracks: mockArtist.popularTracks.length,
            contentViews: mockArtist.monthlyListeners,
            publicPlaylists: mockArtist.albums,
            following: mockArtist.relatedArtists,
            followers: [],
            biography: mockArtist.biography,
            birthYear: mockArtist.birthYear,
        });
    };

    useEffect(() => {
        const fetchArtistProfile = async () => {
            try {
                // Simulação da lógica de requisição real comentada para focar no Fallback
                /*
                const token = localStorage.getItem("accessToken");
                if (!token) {
                    router.push("/login");
                    return;
                }
                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                const response = await fetch(`${apiUrl}/artists/${artistId}`, { ... });
                // Lógica de verificação de token e 404...
                */

                // Forçando o uso do Mock baseado no ID da URL (ou fallback padrão)
                const backendArtist = mockArtistsDatabase[artistId] ? artistId : "art-1";
                handleFallbackMock(backendArtist);

            } catch (err: any) {
                handleFallbackMock(artistId);
            } finally {
                setIsLoading(false);
            }
        };

        if (artistId) {
            fetchArtistProfile();
        }
    }, [artistId, router]);

    return (
        <div className="flex flex-col flex-1 w-full min-w-0 overflow-y-auto bg-transparent relative">
            {isLoading ? (
                <div className="flex-1 flex items-center justify-center w-full h-full">
                    <Icon src={Loader2} size={48} className="animate-spin text-[var(--text-secondary)]" color="currentColor" />
                </div>
            ) : isNotFound ? (
                <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center h-full">
                    <Icon src={AlertCircle} size={64} color="white" />
                    <h1 className="text-3xl font-bold text-white mt-2">
                        Não foi possível localizar esse artista
                    </h1>
                    <p className="text-[var(--text-secondary)] text-base">
                        Verifique se a URL está correta e tente novamente.
                    </p>
                </div>
            ) : !artistProfile ? (
                <div className="flex-1 flex items-center justify-center w-full h-full">
                    <Icon src={Loader2} size={48} className="animate-spin text-[var(--text-secondary)]" color="currentColor" />
                </div>
            ) : (
                <>
                    <GenericContentPage
                        id={artistProfile.id}
                        title={artistProfile.title}
                        type={artistProfile.type}
                        coverUrl={artistProfile.coverUrl}
                        tracks={artistProfile.tracks}
                        artists={artistProfile.artists}
                        releaseDate={artistProfile.releaseDate}
                        totalTracks={artistProfile.totalTracks}
                        contentViews={artistProfile.contentViews}
                        isLiked={false}
                        isFollow={false}
                        publicPlaylists={artistProfile.publicPlaylists}
                        following={artistProfile.following}
                        followers={artistProfile.followers}
                    />
                    <div className="px-6 pb-12 mt-8 max-w-5xl mx-auto w-full">
                        <h2 className="text-2xl font-bold text-white mb-6">Sobre o Artista</h2>

                        <div className="bg-[#181818] rounded-2xl p-8 hover:bg-[#282828] transition-colors duration-300">
                            <div className="flex flex-col md:flex-row gap-8 items-start">

                                {/* Biografia */}
                                <div className="flex-1">
                                    <p className="text-[#b3b3b3] text-base md:text-lg leading-relaxed whitespace-pre-line">
                                        {artistProfile.biography}
                                    </p>
                                </div>

                                {/* Informações e Estatísticas */}
                                <div className="w-full md:w-1/3 flex flex-col gap-4 border-l-0 md:border-l md:border-[#333] pt-6 md:pt-0 md:pl-8">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-3xl font-bold text-white">
                                            {artistProfile.contentViews.toLocaleString("pt-BR")}
                                        </span>
                                        <span className="text-sm font-medium text-[#b3b3b3] uppercase tracking-wider">
                                            Ouvintes Mensais
                                        </span>
                                    </div>

                                    <div className="h-[1px] w-full bg-[#333] my-2"></div>

                                    <div className="flex items-center gap-3 text-white">
                                        <div className="p-2 bg-[#333] rounded-full">
                                            <Icon src={Info} size={20} color="white" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm text-[#b3b3b3]">Nascimento / Formação</span>
                                            <span className="font-semibold text-lg">{artistProfile.birthYear}</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

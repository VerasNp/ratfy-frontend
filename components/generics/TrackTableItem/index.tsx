"use client";
import React from "react";
import Text from "../Text";
import Image from "../Image";
import Icon from "../Icon";
import Dropdown from "../Dropdown";
import Link from "../Link";
import { MoreHorizontal, Plus, ListPlus, User, Disc, Play } from "lucide-react";
import { usePlayer } from "@/app/context/PlayerContext";

export interface Track {
  id: string | number;
  title: string;
  artist?: string;
  album?: string;
  dateAdded?: string;
  duration: string;
  coverUrl?: string;
  plays?: string;
  trackUrl?: string;
  artistUrl?: string;
  albumUrl?: string;
  audioUrl?: string;
  rawDuration?: number; //segundos
}

interface TrackTableItemProps {
  track: Track;
  index: number;
  variant: "playlist" | "album" | "artist";
  gridClass: string;
}

export default function TrackTableItem({ track, index, variant, gridClass }: TrackTableItemProps) {
  const { playNow, playNext, addToQueue } = usePlayer();

  const showCover = variant === "playlist" || variant === "artist";
  const showArtist = variant === "playlist" || variant === "album";

  const playerTrackItem = {
    id: String(track.id),
    title: track.title,
    artist: track.artist || "Unknown Artist",
    album: track.album || "",
    albumArtUrl: track.coverUrl || "/placeholder_1024.jpg",
    audioUrl: track.audioUrl || "",
    duration: track.rawDuration || 0,
  };

  const dropdownItems = [
    {
      id: "play-now",
      item: <Text textString="Reproduzir" size="sm" color="--text-primary" />,
      icon: <Icon src={Play} size={18} color="currentColor" />,
      onSelect: () => playNow([playerTrackItem]),
    },
    {
      id: "play-next",
      item: <Text textString="Tocar a seguir" size="sm" color="--text-primary" />,
      icon: <Icon src={ListPlus} size={18} color="currentColor" />,
      onSelect: () => playNext([playerTrackItem]),
    },
    {
      id: "add-queue",
      item: <Text textString="Adicionar à fila" size="sm" color="--text-primary" />,
      icon: <Icon src={ListPlus} size={18} color="currentColor" />,
      onSelect: () => addToQueue([playerTrackItem]),
    },
    {
      id: "add-playlist",
      item: <Text textString="Adicionar à playlist" size="sm" color="--text-primary" />,
      icon: <Icon src={Plus} size={18} color="currentColor" />,
      onSelect: () => console.log("Adicionar à playlist:", track.id),
    },
    {
      id: "go-artist",
      item: <Text textString="Ir para o artista" size="sm" color="--text-primary" />,
      icon: <Icon src={User} size={18} color="currentColor" />,
      onSelect: () => console.log("Ir para o artista:", track.id),
    },
    {
      id: "go-album",
      item: <Text textString="Ir para o álbum" size="sm" color="--text-primary" />,
      icon: <Icon src={Disc} size={18} color="currentColor" />,
      onSelect: () => console.log("Ir para o álbum:", track.id),
    },
  ];

  return (
    <div
      onClick={() => playNow([playerTrackItem])}
      className={`items-center rounded-md hover:bg-[var(--bg-elevated-highlight)] transition-colors duration-200 ${gridClass} group cursor-pointer`}
    >
      <div className="flex justify-center relative">
        <span className="group-hover:hidden">
          <Text textString={String(index)} color="--text-secondary" size="base" />
        </span>
        <span className="hidden group-hover:flex">
          <Icon src={Play} size={16} color="var(--text-primary)" />
        </span>
      </div>
      <div className="flex items-center gap-3 overflow-hidden">
        {showCover && track.coverUrl && (
          <div onClick={(e) => e.stopPropagation()}>
            <Image src={track.coverUrl} alt={`Capa de ${track.title}`} size={40} shape="square" />
          </div>
        )}
        <div className="flex flex-col justify-center truncate">
          {track.trackUrl ? (
            <div onClick={(e) => e.stopPropagation()} className="hover:underline w-fit max-w-full truncate">
              <Link text={track.title} pathName={track.trackUrl} queryKey="" color="--text-primary" hoverColor="--text-primary" size="base" />
            </div>
          ) : (
            <Text textString={track.title} color="--text-primary" size="base" weight="normal" />
          )}
          <div className="flex items-center gap-1 mt-0.5">
            {showArtist && track.artist && (
              track.artistUrl ? (
                <div onClick={(e) => e.stopPropagation()} className="hover:underline w-fit max-w-full truncate">
                  <Link text={track.artist} pathName={track.artistUrl} queryKey="" color="--text-secondary" hoverColor="--text-primary" size="sm" />
                </div>
              ) : (
                <Text textString={track.artist} color="--text-secondary" size="sm" />
              )
            )}
          </div>
        </div>
      </div>

      {variant === "playlist" && (
        <div className="truncate">
          {track.albumUrl ? (
            <div onClick={(e) => e.stopPropagation()} className="hover:underline w-fit max-w-full truncate">
              <Link text={track.album || ""} pathName={track.albumUrl} queryKey="" color="--text-secondary" hoverColor="--text-primary" size="sm" />
            </div>
          ) : (
            <Text textString={track.album || ""} color="--text-secondary" size="sm" />
          )}
        </div>
      )}

      {variant === "artist" && (
        <div className="truncate">
          <Text textString={track.plays || ""} color="--text-secondary" size="sm" />
        </div>
      )}

      {variant === "playlist" && (
        <div className="truncate">
          <Text textString={track.dateAdded || ""} color="--text-secondary" size="sm" />
        </div>
      )}

      <div className="flex justify-end items-center gap-4 pr-4">
        <Text textString={track.duration} color="--text-secondary" size="sm" />
        <div className="opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200 w-[20px] flex justify-center">
          <Dropdown
            triggerComponent={
              <div
                onClick={(e) => e.stopPropagation()}
                className="text-[var(--text-secondary)] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <Icon src={MoreHorizontal} size={20} color="currentColor" />
              </div>
            }
            items={dropdownItems}
          />
        </div>
      </div>
    </div>
  );
}

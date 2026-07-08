"use client"

import { useEffect, useRef, useState } from "react"
import { Heart, MoreHorizontal, Play, Pause, Pencil } from "lucide-react"
import Image from "../Image"
import Icon from "../Icon"
import { getColorSync } from 'colorthief';
import { usePlayer } from "@/app/context/PlayerContext"
import { Track } from "../Player"

export type ContentType = "Album" | "Playlist" | "Track" | "Artist" | "User" | null

interface ContentHeaderProps {
  className?: string
  id:             string
  title:          string
  headerType:     ContentType
  headerArtUrl:   string
  totalTracks?:   number
  tracks:         Track[]
  releaseDate:    string | Date
  artistsID:      string | string[]
  durationTotal?: number               // seconds
  contentViews?:  number
  isLiked?:       boolean
  isFollow?:      boolean
  onPlay?:        () => void
  onLike?:        () => void
  onEdit?:        () => void
  onFollow?:      () => void
  onMore?:        () => void
}

function formatDuration(totalSeconds: number): string {
  if (!totalSeconds) return ""
  const h   = Math.floor(totalSeconds / 3600)
  const m   = Math.floor((totalSeconds % 3600) / 60)
  const s   = totalSeconds % 60
  if (h > 0) return `${h} hr ${m} min`
  if (m > 0) return `${m} min ${s > 0 ? `${s} sec` : ""}`
  return `${s} sec`
}

function formatYear(date: string | Date): string {
  if (!date) return ""
  return new Date(date).getFullYear().toString()
}

function formatViews(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M plays`
  if (n >= 1_000)     return `${(n / 1_000).toFixed(0)}K plays`
  return `${n} plays`
}

function deriveAccentFromUrl(url: string): string {
  let hash = 0
  for (let i = 0; i < url.length; i++) hash = url.charCodeAt(i) + ((hash << 5) - hash)
  const hue = Math.abs(hash) % 360
  return `hsl(${hue},35%,22%)`
}

export default function ContentHeader({
  className = "",
  id,
  title,
  headerType,
  headerArtUrl,
  totalTracks,
  releaseDate,
  artistsID,
  durationTotal   = 0,
  contentViews    = 0,
  isLiked         = false,
  isFollow        = false,
  tracks,
  onPlay,
  onLike,
  onEdit,
  onFollow,
  onMore,
}: ContentHeaderProps) {
  const { playNow, currentTrack, isPlaying } = usePlayer();
  const [ isAlbumPlaying, setAlbumPlaying ] = useState(false);
  const [accentColor, setAccentColor] = useState(() => deriveAccentFromUrl(headerArtUrl))
  const imgRef = useRef<HTMLImageElement>(null)

  const handleImageLoad = () => {
    try {
      if (imgRef.current) {
        const [r, g, b] = getColorSync(imgRef.current)
        setAccentColor(`rgb(${Math.round(r * 0.6)},${Math.round(g * 0.6)},${Math.round(b * 0.6)})`)
      }
    } catch {}
  }

  useEffect(() => {
    const isPlaying = tracks.some(t => t.id === currentTrack?.id);
    setAlbumPlaying(isPlaying);
  }, [currentTrack, tracks]);

  const artists       = Array.isArray(artistsID) ? artistsID : [artistsID]
  const isPlaylist    = headerType === "Playlist"
  const isArtist      = headerType === "Artist"
  const isUser        = headerType === "User"
  const isMusic       = !isArtist && !isUser
  const titleSize     = title.length > 20 ? "text-4xl sm:text-5xl" : "text-5xl sm:text-7xl"

  return (
    <div className={`flex flex-col ${className}`}>
      <div
        className="relative flex items-end gap-6 px-6 pt-16 pb-6 min-h-[260px]"
        style={{
          background: `linear-gradient(to bottom, ${accentColor} 0%, rgba(0,0,0,0.7) 100%)`,
        }}
      >
        {!isPlaylist && (
          <div className={`relative shrink-0 ${isArtist || isUser ? 'w-48 h-48 rounded-full' : 'w-48 h-48 rounded'} shadow-2xl`}>
            <img
              ref={imgRef}
              src={headerArtUrl}
              alt=""
              aria-hidden
              className="absolute opacity-0 w-0 h-0"
              crossOrigin="anonymous"
              onLoad={handleImageLoad}
            />
            <Image
              src={headerArtUrl}
              alt={title}
              size={192}
              shape={isArtist || isUser ? "circle" : "rounded"}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        {isPlaylist && (
          <div className="shrink-0 w-48 h-48 rounded shadow-2xl grid grid-cols-2 overflow-hidden">
            {[headerArtUrl, headerArtUrl, headerArtUrl, headerArtUrl].map((url, i) => (
              <Image key={i} src={url} alt="" size={96} className="w-full h-full object-cover" />
            ))}
          </div>
        )}

        {/* Text block */}
        <div className="flex flex-col gap-2 min-w-0 pb-1">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-white/70">
            {headerType}
          </span>

          <h1 className={`font-black text-white leading-tight ${titleSize}`}>
            {title}
          </h1>

          <div className="flex items-center gap-2 flex-wrap mt-1">
            {/* MUSIC META (Albums, Playlists, Tracks) */}
            {isMusic && (
              <>
                {artists.map((artist, i) => (
                  <span key={artist} className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[9px] font-bold text-white shrink-0">
                      {artist?.charAt(0)?.toUpperCase()}
                    </span>
                    <span className="text-sm font-semibold text-white hover:underline cursor-pointer">
                      {artist}
                    </span>
                    {i < artists.length - 1 && <span className="text-white/50">,</span>}
                  </span>
                ))}
                {releaseDate && (
                  <>
                    <span className="text-white/50 text-xs">•</span>
                    <span className="text-sm text-white/65">{formatYear(releaseDate)}</span>
                  </>
                )}
                <span className="text-white/50 text-xs">•</span>
                <span className="text-sm text-white/65">{totalTracks} {totalTracks === 1 ? "track" : "tracks"}</span>
                {durationTotal > 0 && (
                  <>
                    <span className="text-white/50 text-xs">•</span>
                    <span className="text-sm text-white/65">{formatDuration(durationTotal)}</span>
                  </>
                )}
              </>
            )}
            {isArtist && (
              <span className="text-sm text-white/65 font-medium">{formatViews(contentViews)} monthly listeners</span>
            )}
            {isUser && (
              <>
                <span className="text-sm text-white/65 font-medium">{totalTracks || 0} Public Playlists</span>
                <span className="text-white/50 text-xs">•</span>
                <span className="text-sm text-white/65 font-medium">{contentViews || 0} Followers</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Action bar ─────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-6 px-6 py-5 bg-black/60">
        {(!isUser || tracks.length > 0) && (
          <button
            onClick={() => playNow(tracks)}
            aria-label={`${isAlbumPlaying ? "Play" : "Pause"} ${title}`}
            className={`w-14 h-14 rounded-full bg-[#1db954] flex items-center justify-center cursor-pointer
                       hover:bg-[#1ed760] hover:scale-105 active:scale-95
                       transition-all duration-100 shrink-0`}
          >
            <Icon src={isAlbumPlaying && isPlaying ? Pause : Play } size={24} className="text-black ml-0.5" />
          </button>
        )}
        {isArtist || isUser ? (
          <button
            onClick={onFollow}
            className={`px-4 py-1.5 rounded-full border text-sm font-bold tracking-widest uppercase transition-all cursor-pointer
              ${isFollow ? "border-white/50 text-white hover:border-white" : "border-white text-white hover:scale-105"}`}
          >
            {isFollow ? "Following" : "Follow"}
          </button>
        ) : (
          <button
            onClick={onLike}
            aria-label={isLiked ? `Remove ${title} from library` : `Save ${title} to library`}
            className={`transition-colors cursor-pointer ${isLiked ? "text-[#1db954]" : "text-white/60 hover:text-white"}`}
          >
            <Icon src={Heart} size={28} className={isLiked ? "fill-[#1db954]" : ""} />
          </button>
        )}
        {isPlaylist && onEdit && (
          <button onClick={onEdit} aria-label="Edit playlist" className="text-white/60 hover:text-white transition-colors cursor-pointer">
            <Icon src={Pencil} size={20} />
          </button>
        )}
        <button onClick={onMore} aria-label="More options" className="text-white/60 hover:text-white transition-colors cursor-pointer">
          <Icon src={MoreHorizontal} size={24} />
        </button>
      </div>
    </div>
  )
}

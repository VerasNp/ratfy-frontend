import GenericContentPage from "@/components/generics/ContentPage";
import { mockedAlbums, mockedPlaylist, mockedPlaylists } from "./TrackList";
import Placeholder from "@/public/placeholder_1024.jpg"
export default function ContentPageTest() {
  const content = mockedAlbums[0];
  const content2 = mockedPlaylists[0]
  const content3 = mockedPlaylist[0]
  return (
    <>
      <GenericContentPage
            id={content.id}
            title={content.title}
            type={content.albumType as "Playlist" | "Album" | "Single"}
            coverUrl={content.albumArtUrl || Placeholder.src}
            tracks={content.tracks}
            artists={content.artistIds || content.artistIds || ["Unknown Artist"]}
            releaseDate={content.createdAt}
            totalTracks={content.totalTracks}
            contentViews={2450000}
            isLiked={true}
      />
        <GenericContentPage
              id={content2.id}
              title={content2.title}
              type={content2.albumType as "Playlist" | "Album" | "Single"}
              coverUrl={content2.albumArtUrl || Placeholder.src}
              tracks={[content3]}
              artists={content2.artistIds || content2.artistIds || ["Unknown Artist"]}
              releaseDate={content2.createdAt}
              totalTracks={content2.totalTracks}
              contentViews={2450000}
              isLiked={true}
        />
    </>
  )
}

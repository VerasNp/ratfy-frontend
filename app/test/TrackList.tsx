import { Track } from "@/components/generics/Player";
import { RelatedCardItem } from "@/components/generics/ContentContainer";
import Placeholder from "@/public/placeholder_1024.jpg"
export type ReleaseDatePrecision = "Full" | "Half" | "Year" ;
export interface Album {
  id:string
  title: string
  albumType: string
  releaseDate: string
  releasePrecision?:ReleaseDatePrecision
  totalTracks: number
  label?: string
  artistIds: string[] | string
  tracks: Track[]
  createdAt: string
  updatedAt?: string
  albumArtUrl?: string
}
export interface Playlist {
  id: string,
  title: string,
  albumType: string,
  artistIds: string | string[],
  totalTracks: number,
  tracks: Track[],
  createdAt: string,
  albumArtUrl: string,
}
export interface Artist {
  id: string,
  name: string,
  url?: string,
  tracks?: Track[]
}
export const extendedMockedArtists: RelatedCardItem[] = [
    { id: "art-1", title: "Alok", subtitle: "Artista", imageUrl: Placeholder.src, type: "Artist", owner: "Artista", tracks: [] },
    { id: "art-2", title: "Anitta", subtitle: "Artista", imageUrl: Placeholder.src, type: "Artist", owner: "Artista", tracks: [] },
    { id: "art-3", title: "Vintage Culture", subtitle: "Artista", imageUrl: Placeholder.src, type: "Artist", owner: "Artista", tracks: [] },
    { id: "art-4", title: "Ludmilla", subtitle: "Artista", imageUrl: Placeholder.src, type: "Artist", owner: "Artista", tracks: [] },
    { id: "art-5", title: "Jorge & Mateus", subtitle: "Artista", imageUrl: Placeholder.src, type: "Artist", owner: "Artista", tracks: [] }
];

export const mockedPlaylist: Track[] = [
  {
    id: "1",
    title: "Rhymes Like Dimes",
    artist: "MF DOOM",
    album: "Operation: Doomsday",
    albumArtUrl: "https://dn710007.ca.archive.org/0/items/operation-doomsday-disc1-flac/cover.jpg",
    audioUrl: "https://archive.org/download/operation-doomsday-disc1-flac/03%20-%20Rhymes%20Like%20Dimes.mp3",
    duration: 297,
  },
  {
    id: "2",
    title: "Football, Nightmare And A Bolt From The Blue",
    artist: "A Last Failure",
    album: "Ok, We Move For A Desperate Goal",
    albumArtUrl: "https://dn721808.ca.archive.org/0/items/ALF-OWMFADG-2009/2009%20-%20Ok%2C%20We%20Move%20For%20A%20Desperate%20Goal/folder.jpg",
    audioUrl: "https://archive.org/download/ALF-OWMFADG-2009/2009%20-%20Ok%2C%20We%20Move%20For%20A%20Desperate%20Goal/03%20Football%2C%20Nightmare%20And%20A%20Bolt%20Fr.m4a",
    duration: 217,
  },
  {
    id: "3",
    title: "La Vie En Rose",
    artist: "Edith Piaf",
    albumArtUrl: "https://dn721601.ca.archive.org/0/items/78_la-vie-en-rose_edith-piaf-m-david-louiguy-robert-chauvigny_gbia3025698a/78_la-vie-en-rose_edith-piaf-m-david-louiguy-robert-chauvigny_gbia3025698a_itemimage.jpg",
    audioUrl: "https://archive.org/download/78_la-vie-en-rose_edith-piaf-m-david-louiguy-robert-chauvigny_gbia3025698a/LA%20VIE%20EN%20ROSE%20-%20EDITH%20PIAF%20-%20M.%20David%20-%20Louiguy.mp3",
    duration: 212,
  },
  {
    id: "4",
    title: "Its Been So Long",
    artist: "Spencer Davis, Peter Jameson",
    albumArtUrl: "https://archive.org/download/lp_its-been-so-long_spencer-davis-peter-jameson/lp_its-been-so-long_spencer-davis-peter-jameson_itemimage.png",
    audioUrl: "https://archive.org/download/lp_its-been-so-long_spencer-davis-peter-jameson/disc1/01.01.%20It%27s%20Been%20So%20Long.mp3",
    duration: 305,
  },
  {
    id: "5",
    title: "Calm1",
    artist: "c418",
    albumArtUrl: "https://archive.org/download/minecraft-classic-soundtrack_202011/Minecraft%20Classic%20Soundtrack/minecraft_cover.jpg",
    audioUrl: "https://archive.org/download/minecraft-classic-soundtrack_202011/Minecraft%20Classic%20Soundtrack/01%20Calm%201.mp3",
    duration: 261,
  },
  {
    id: "6",
    title: "Nectar",
    artist: "Joji",
    albumArtUrl: "https://archive.org/download/nectar-flac/Nectar.jpg",
    audioUrl: "https://archive.org/download/nectar-flac/06%20Gimme%20Love.mp3",
    duration: 261,
  },
  {
    id: "7",
    title: "Spooky Scary Skeletons (Remix)",
    artist: "The Living Tombstone",
    albumArtUrl: "https://archive.org/download/soundcloud-222379095/222379095.jpg",
    audioUrl: "https://archive.org/download/soundcloud-222379095/222379095.mp3",
    duration: 230,
  },
  {
    id: "8",
    title: "Lithium",
    artist: "Nirvana",
    albumArtUrl: "https://archive.org/download/soundcloud-28211415/28211415.jpg",
    audioUrl: "https://archive.org/download/soundcloud-28211415/28211415.mp3",
    duration: 257,
  },
  {
    id: "9",
    title: "Firefly",
    artist: "Jim Yosef",
    albumArtUrl: "https://archive.org/download/soundcloud-212352246/Jim_Yosef_-_Firefly_NCS_Release-212352246.jpg",
    audioUrl: "https://archive.org/download/soundcloud-212352246/Jim_Yosef_-_Firefly_NCS_Release-212352246.mp3",
    duration: 257,
  },
  {
    id: "10",
    title: "Ghost n' Stuff",
    artist: "Deadmau5",
    albumArtUrl: "https://archive.org/download/ghost-n-stuff/31Qxd8OiDqL._UXNaN_FMjpg_QL85_.jpg",
    audioUrl: "https://archive.org/download/ghost-n-stuff/Ghost%20N%20Stuff.mp3",
    duration: 192,
  },
  {
    id: "11",
    title: "Neon Horizon",
    artist: "Synthwave Squad",
    album: "Future Retro",
    albumArtUrl: "https://picsum.photos/id/11/300/300",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    duration: 215,
  },
  {
    id: "12",
    title: "Midnight Drive",
    artist: "The Outrunners",
    albumArtUrl: "https://picsum.photos/id/12/300/300",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    duration: 184,
  },
  {
    id: "13",
    title: "Electric Dreams",
    artist: "Pixel Youth",
    album: "Arcade Summer",
    albumArtUrl: "https://picsum.photos/id/13/300/300",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    duration: 240,
  },
  {
    id: "14",
    title: "Ocean Breeze",
    artist: "Chill Vibes",
    albumArtUrl: "https://picsum.photos/id/14/300/300",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    duration: 312,
  },
  {
    id: "15",
    title: "Mountain High",
    artist: "Nature Sounds",
    album: "Earth Tones",
    albumArtUrl: "https://picsum.photos/id/15/300/300",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    duration: 198,
  },
  {
    id: "16",
    title: "City Lights",
    artist: "Urban Jazz Quartet",
    albumArtUrl: "https://picsum.photos/id/16/300/300",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    duration: 275,
  },
  {
    id: "17",
    title: "Desert Mirage",
    artist: "Nomad Beats",
    album: "Sands of Time",
    albumArtUrl: "https://picsum.photos/id/17/300/300",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    duration: 222,
  },
  {
    id: "18",
    title: "Rainy Day Cafe",
    artist: "Lo-Fi Lounge",
    albumArtUrl: "https://picsum.photos/id/18/300/300",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    duration: 180,
  },
  {
    id: "19",
    title: "Cosmic Journey",
    artist: "Astro",
    album: "Stellar",
    albumArtUrl: "https://picsum.photos/id/19/300/300",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
    duration: 340,
  },
  {
    id: "20",
    title: "Deep Sea",
    artist: "Marine Life",
    albumArtUrl: "https://picsum.photos/id/20/300/300",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
    duration: 290,
  },
  {
    id: "21",
    title: "Forest Canopy",
    artist: "Green Earth",
    album: "Nature's Lullaby",
    albumArtUrl: "https://picsum.photos/id/21/300/300",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
    duration: 210,
  },
  {
    id: "22",
    title: "Volcanic Ash",
    artist: "Fire Starters",
    albumArtUrl: "https://picsum.photos/id/22/300/300",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
    duration: 195,
  },
  {
    id: "23",
    title: "Glacier Melt",
    artist: "Ice Cold",
    album: "Winter Wonderland",
    albumArtUrl: "https://picsum.photos/id/23/300/300",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3",
    duration: 255,
  },
  {
    id: "24",
    title: "Jungle Groove",
    artist: "Wild Things",
    albumArtUrl: "https://picsum.photos/id/24/300/300",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3",
    duration: 230,
  },
  {
    id: "25",
    title: "Savannah Sunset",
    artist: "African Rhythms",
    album: "Safari",
    albumArtUrl: "https://picsum.photos/id/25/300/300",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3",
    duration: 270,
  },
  {
    id: "26",
    title: "Tundra Winds",
    artist: "Northern Lights",
    albumArtUrl: "https://picsum.photos/id/26/300/300",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3",
    duration: 205,
  },
  {
    id: "27",
    title: "Coral Reef",
    artist: "Oceanic",
    album: "Deep Blue",
    albumArtUrl: "https://picsum.photos/id/27/300/300",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    duration: 245,
  },
  {
    id: "28",
    title: "Space Station",
    artist: "Orbit",
    albumArtUrl: "https://picsum.photos/id/28/300/300",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    duration: 315,
  },
  {
    id: "29",
    title: "Cyber City",
    artist: "Neon",
    album: "Future Tense",
    albumArtUrl: "https://picsum.photos/id/29/300/300",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    duration: 280,
  },
  {
    id: "30",
    title: "Ancient Ruins",
    artist: "History",
    albumArtUrl: "https://picsum.photos/id/30/300/300",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    duration: 220,
  },
  {
    id: "31",
    title: "Mystic River",
    artist: "Flow",
    album: "Waterways",
    albumArtUrl: "https://picsum.photos/id/31/300/300",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    duration: 260,
  },
  {
    id: "32",
    title: "Thunderstorm",
    artist: "Weather",
    albumArtUrl: "https://picsum.photos/id/32/300/300",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    duration: 190,
  },
  {
    id: "33",
    title: "Morning Dew",
    artist: "Sunrise",
    album: "New Beginnings",
    albumArtUrl: "https://picsum.photos/id/33/300/300",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    duration: 235,
  },
  {
    id: "34",
    title: "Evening Shadows",
    artist: "Dusk",
    albumArtUrl: "https://picsum.photos/id/34/300/300",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    duration: 210,
  },
  {
    id: "35",
    title: "Starlight",
    artist: "Night Sky",
    album: "Constellations",
    albumArtUrl: "https://picsum.photos/id/35/300/300",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
    duration: 250,
  },
  {
    id: "36",
    title: "Solar Flare",
    artist: "Sun",
    albumArtUrl: "https://picsum.photos/id/36/300/300",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
    duration: 275,
  },
  {
    id: "37",
    title: "Lunar Eclipse",
    artist: "Moon",
    album: "Phases",
    albumArtUrl: "https://picsum.photos/id/37/300/300",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
    duration: 225,
  },
  {
    id: "38",
    title: "Meteor Shower",
    artist: "Comet",
    albumArtUrl: "https://picsum.photos/id/38/300/300",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
    duration: 200,
  },
  {
    id: "39",
    title: "Black Hole",
    artist: "Gravity",
    album: "Singularity",
    albumArtUrl: "https://picsum.photos/id/39/300/300",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3",
    duration: 295,
  },
  {
    id: "40",
    title: "Supernova",
    artist: "Explosion",
    albumArtUrl: "https://picsum.photos/id/40/300/300",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3",
    duration: 240,
  },
  { id: "41", title: "Intro: Dusk", artist: "Synthwave Squad", album: "Neon Nights", albumArtUrl: "https://picsum.photos/id/41/300/300", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", duration: 120 },
  { id: "42", title: "Grid Runner", artist: "Synthwave Squad", album: "Neon Nights", albumArtUrl: "https://picsum.photos/id/41/300/300", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", duration: 215 },
  { id: "43", title: "Cybernetic Heart", artist: "Synthwave Squad", album: "Neon Nights", albumArtUrl: "https://picsum.photos/id/41/300/300", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", duration: 198 },
  { id: "44", title: "Hologram Tears", artist: "Synthwave Squad", album: "Neon Nights", albumArtUrl: "https://picsum.photos/id/41/300/300", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", duration: 240 },
  { id: "45", title: "Mainframe", artist: "Synthwave Squad", album: "Neon Nights", albumArtUrl: "https://picsum.photos/id/41/300/300", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", duration: 185 },
  { id: "46", title: "Overclocked", artist: "Synthwave Squad", album: "Neon Nights", albumArtUrl: "https://picsum.photos/id/41/300/300", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", duration: 260 },
  { id: "47", title: "Data Stream", artist: "Synthwave Squad", album: "Neon Nights", albumArtUrl: "https://picsum.photos/id/41/300/300", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", duration: 210 },
  { id: "48", title: "Night City", artist: "Synthwave Squad", album: "Neon Nights", albumArtUrl: "https://picsum.photos/id/41/300/300", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", duration: 275 },
  { id: "49", title: "Rogue AI", artist: "Synthwave Squad", album: "Neon Nights", albumArtUrl: "https://picsum.photos/id/41/300/300", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", duration: 222 },
  { id: "50", title: "Outro: Dawn", artist: "Synthwave Squad", album: "Neon Nights", albumArtUrl: "https://picsum.photos/id/41/300/300", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", duration: 150 },
  { id: "51", title: "Morning Dew", artist: "The Woodsmen", album: "Acoustic Whispers", albumArtUrl: "https://picsum.photos/id/51/300/300", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3", duration: 180 },
  { id: "52", title: "Cabin Fire", artist: "The Woodsmen", album: "Acoustic Whispers", albumArtUrl: "https://picsum.photos/id/51/300/300", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3", duration: 205 },
  { id: "53", title: "River Stones", artist: "The Woodsmen", album: "Acoustic Whispers", albumArtUrl: "https://picsum.photos/id/51/300/300", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3", duration: 240 },
  { id: "54", title: "Pine Needles", artist: "The Woodsmen", album: "Acoustic Whispers", albumArtUrl: "https://picsum.photos/id/51/300/300", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3", duration: 195 },
  { id: "55", title: "Autumn Leaves", artist: "The Woodsmen", album: "Acoustic Whispers", albumArtUrl: "https://picsum.photos/id/51/300/300", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3", duration: 215 },
  { id: "56", title: "Footsteps", artist: "The Woodsmen", album: "Acoustic Whispers", albumArtUrl: "https://picsum.photos/id/51/300/300", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3", duration: 170 },
  { id: "57", title: "Wind Chimes", artist: "The Woodsmen", album: "Acoustic Whispers", albumArtUrl: "https://picsum.photos/id/51/300/300", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", duration: 230 },
  { id: "58", title: "Old Oak", artist: "The Woodsmen", album: "Acoustic Whispers", albumArtUrl: "https://picsum.photos/id/51/300/300", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", duration: 260 },
  { id: "59", title: "Stars Above", artist: "The Woodsmen", album: "Acoustic Whispers", albumArtUrl: "https://picsum.photos/id/51/300/300", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", duration: 210 },
  { id: "60", title: "Valley Echo", artist: "The Woodsmen", album: "Acoustic Whispers", albumArtUrl: "https://picsum.photos/id/51/300/300", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", duration: 190 },
  { id: "61", title: "Quiet Stream", artist: "The Woodsmen", album: "Acoustic Whispers", albumArtUrl: "https://picsum.photos/id/51/300/300", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", duration: 225 },
  { id: "62", title: "Rest", artist: "The Woodsmen", album: "Acoustic Whispers", albumArtUrl: "https://picsum.photos/id/51/300/300", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", duration: 165 },
  { id: "63", title: "Adrenaline", artist: "DJ Flex", album: "Pump Up", albumArtUrl: "https://picsum.photos/id/63/300/300", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", duration: 190 },
  { id: "64", title: "Heavy Lifter", artist: "Iron Core", albumArtUrl: "https://picsum.photos/id/64/300/300", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", duration: 210 },
  { id: "65", title: "Sprint", artist: "The Pace Makers", album: "Cardio Kings", albumArtUrl: "https://picsum.photos/id/65/300/300", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", duration: 175 },
  { id: "66", title: "Beast Mode", artist: "DJ Flex", album: "Pump Up", albumArtUrl: "https://picsum.photos/id/63/300/300", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", duration: 225 },
  { id: "67", title: "Endurance", artist: "Marathon Men", albumArtUrl: "https://picsum.photos/id/67/300/300", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3", duration: 310 },
  { id: "68", title: "Power Output", artist: "Wattage", album: "Spin Class", albumArtUrl: "https://picsum.photos/id/68/300/300", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3", duration: 200 },
  { id: "69", title: "Max Reps", artist: "Iron Core", albumArtUrl: "https://picsum.photos/id/64/300/300", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3", duration: 185 },
  { id: "70", title: "The Wall", artist: "Endurance", album: "Push Through", albumArtUrl: "https://picsum.photos/id/70/300/300", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3", duration: 245 },
  { id: "71", title: "Second Wind", artist: "The Pace Makers", album: "Cardio Kings", albumArtUrl: "https://picsum.photos/id/65/300/300", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3", duration: 195 },
  { id: "72", title: "Cool Down", artist: "Zen Masters", albumArtUrl: "https://picsum.photos/id/72/300/300", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3", duration: 280 },

];

// Album 1: 10 Tracks
const neonNightsAlbumTracks: Track[] = [
  { id: "41", title: "Intro: Dusk", artist: "Synthwave Squad", album: "Neon Nights", albumArtUrl: "https://picsum.photos/id/41/300/300", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", duration: 120 },
  { id: "42", title: "Grid Runner", artist: "Synthwave Squad", album: "Neon Nights", albumArtUrl: "https://picsum.photos/id/41/300/300", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", duration: 215 },
  { id: "43", title: "Cybernetic Heart", artist: "Synthwave Squad", album: "Neon Nights", albumArtUrl: "https://picsum.photos/id/41/300/300", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", duration: 198 },
  { id: "44", title: "Hologram Tears", artist: "Synthwave Squad", album: "Neon Nights", albumArtUrl: "https://picsum.photos/id/41/300/300", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", duration: 240 },
  { id: "45", title: "Mainframe", artist: "Synthwave Squad", album: "Neon Nights", albumArtUrl: "https://picsum.photos/id/41/300/300", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", duration: 185 },
  { id: "46", title: "Overclocked", artist: "Synthwave Squad", album: "Neon Nights", albumArtUrl: "https://picsum.photos/id/41/300/300", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", duration: 260 },
  { id: "47", title: "Data Stream", artist: "Synthwave Squad", album: "Neon Nights", albumArtUrl: "https://picsum.photos/id/41/300/300", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", duration: 210 },
  { id: "48", title: "Night City", artist: "Synthwave Squad", album: "Neon Nights", albumArtUrl: "https://picsum.photos/id/41/300/300", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", duration: 275 },
  { id: "49", title: "Rogue AI", artist: "Synthwave Squad", album: "Neon Nights", albumArtUrl: "https://picsum.photos/id/41/300/300", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", duration: 222 },
  { id: "50", title: "Outro: Dawn", artist: "Synthwave Squad", album: "Neon Nights", albumArtUrl: "https://picsum.photos/id/41/300/300", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", duration: 150 },
];
// Album 2: 12 Tracks
const acousticWhispersAlbumTracks: Track[] = [
  { id: "51", title: "Morning Dew", artist: "The Woodsmen", album: "Acoustic Whispers", albumArtUrl: "https://picsum.photos/id/51/300/300", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3", duration: 180 },
  { id: "52", title: "Cabin Fire", artist: "The Woodsmen", album: "Acoustic Whispers", albumArtUrl: "https://picsum.photos/id/51/300/300", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3", duration: 205 },
  { id: "53", title: "River Stones", artist: "The Woodsmen", album: "Acoustic Whispers", albumArtUrl: "https://picsum.photos/id/51/300/300", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3", duration: 240 },
  { id: "54", title: "Pine Needles", artist: "The Woodsmen", album: "Acoustic Whispers", albumArtUrl: "https://picsum.photos/id/51/300/300", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3", duration: 195 },
  { id: "55", title: "Autumn Leaves", artist: "The Woodsmen", album: "Acoustic Whispers", albumArtUrl: "https://picsum.photos/id/51/300/300", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3", duration: 215 },
  { id: "56", title: "Footsteps", artist: "The Woodsmen", album: "Acoustic Whispers", albumArtUrl: "https://picsum.photos/id/51/300/300", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3", duration: 170 },
  { id: "57", title: "Wind Chimes", artist: "The Woodsmen", album: "Acoustic Whispers", albumArtUrl: "https://picsum.photos/id/51/300/300", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", duration: 230 },
  { id: "58", title: "Old Oak", artist: "The Woodsmen", album: "Acoustic Whispers", albumArtUrl: "https://picsum.photos/id/51/300/300", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", duration: 260 },
  { id: "59", title: "Stars Above", artist: "The Woodsmen", album: "Acoustic Whispers", albumArtUrl: "https://picsum.photos/id/51/300/300", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", duration: 210 },
  { id: "60", title: "Valley Echo", artist: "The Woodsmen", album: "Acoustic Whispers", albumArtUrl: "https://picsum.photos/id/51/300/300", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", duration: 190 },
  { id: "61", title: "Quiet Stream", artist: "The Woodsmen", album: "Acoustic Whispers", albumArtUrl: "https://picsum.photos/id/51/300/300", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", duration: 225 },
  { id: "62", title: "Rest", artist: "The Woodsmen", album: "Acoustic Whispers", albumArtUrl: "https://picsum.photos/id/51/300/300", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", duration: 165 },
];
const workoutHypePlaylistTracks: Track[] = [
  { id: "63", title: "Adrenaline", artist: "DJ Flex", album: "Pump Up", albumArtUrl: "https://picsum.photos/id/63/300/300", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", duration: 190 },
  { id: "64", title: "Heavy Lifter", artist: "Iron Core", albumArtUrl: "https://picsum.photos/id/64/300/300", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", duration: 210 },
  { id: "65", title: "Sprint", artist: "The Pace Makers", album: "Cardio Kings", albumArtUrl: "https://picsum.photos/id/65/300/300", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", duration: 175 },
  { id: "66", title: "Beast Mode", artist: "DJ Flex", album: "Pump Up", albumArtUrl: "https://picsum.photos/id/63/300/300", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", duration: 225 },
  { id: "67", title: "Endurance", artist: "Marathon Men", albumArtUrl: "https://picsum.photos/id/67/300/300", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3", duration: 310 },
  { id: "68", title: "Power Output", artist: "Wattage", album: "Spin Class", albumArtUrl: "https://picsum.photos/id/68/300/300", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3", duration: 200 },
  { id: "69", title: "Max Reps", artist: "Iron Core", albumArtUrl: "https://picsum.photos/id/64/300/300", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3", duration: 185 },
  { id: "70", title: "The Wall", artist: "Endurance", album: "Push Through", albumArtUrl: "https://picsum.photos/id/70/300/300", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3", duration: 245 },
  { id: "71", title: "Second Wind", artist: "The Pace Makers", album: "Cardio Kings", albumArtUrl: "https://picsum.photos/id/65/300/300", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3", duration: 195 },
  { id: "72", title: "Cool Down", artist: "Zen Masters", albumArtUrl: "https://picsum.photos/id/72/300/300", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3", duration: 280 },
];

export const mockedArtists = [
  {
    id:"1",
    name:"Synthwave Squad"
  },
  {
    id:"2",
    name:"The Woodsmen"
  }
]
export const mockedPlaylists: Playlist[] = [
  {
      id: "1",
      title: "Workout Hype Playlist",
      albumType: "Playlist",
      artistIds: "Nokx",
      totalTracks: 10,
      tracks: workoutHypePlaylistTracks,
      createdAt: "28-06-2026",
      albumArtUrl: "https://picsum.photos/id/64/300/300",
  }
]
export const mockedAlbums: Album[] = [
  {
    id:"1",
    title:"Neon Nights",
    albumType: "Album",
    artistIds: ["1"],
    releaseDate:"28-06-2026",
    totalTracks:10,
    tracks:neonNightsAlbumTracks,
    createdAt: "28-06-2026",
    albumArtUrl: "https://picsum.photos/id/41/300/300"
  },
  {
    id:"2",
    title:"Acoustic Whispers",
    albumType: "Album",
    artistIds: ["2"],
    releaseDate:"28-06-2026",
    totalTracks:12,
    tracks:acousticWhispersAlbumTracks,
    createdAt: "28-06-2026",
    albumArtUrl: "https://picsum.photos/id/51/300/300"
  }
];
const mockPopularTracks = [
    { id: "t1", title: "Hit Song 1", artist: "Artist Name", albumArtUrl: Placeholder.src, duration: "3:15", url: "" },
    { id: "t2", title: "Hit Song 2", artist: "Artist Name", albumArtUrl: Placeholder.src, duration: "2:45", url: "" },
    { id: "t3", title: "Hit Song 3", artist: "Artist Name", albumArtUrl: Placeholder.src, duration: "4:00", url: "" },
];
const mockAlbums: RelatedCardItem[] = [
    { id: "al-1", title: "Greatest Hits", subtitle: "2023 • Álbum", imageUrl: Placeholder.src, type: "Album", owner: "Artist", tracks: [] },
    { id: "al-2", title: "Summer Vibes", subtitle: "2021 • EP", imageUrl: Placeholder.src, type: "Album", owner: "Artist", tracks: [] },
];
const mockRelatedArtists: RelatedCardItem[] = [
    { id: "art-2", title: "Anitta", subtitle: "Artista", imageUrl: Placeholder.src, type: "Artist", owner: "Artista", tracks: [] },
    { id: "art-3", title: "Vintage Culture", subtitle: "Artista", imageUrl: Placeholder.src, type: "Artist", owner: "Artista", tracks: [] },
];

export const mockArtistsDatabase: Record<string, any> = {
    "art-1": {
        id: "art-1",
        name: "Alok",
        avatarUrl: Placeholder.src,
        monthlyListeners: 25430900,
        birthYear: 1991,
        biography: "Alok Achkar Peres Petrillo é um DJ e produtor musical brasileiro de música eletrônica. Ele é conhecido mundialmente pelo seu hit 'Hear Me Now'. Tornou-se um dos maiores ícones da cena eletrônica internacional, participando dos maiores festivais do mundo e quebrando recordes de streaming em diversas plataformas.",
        popularTracks: mockPopularTracks,
        albums: mockAlbums,
        relatedArtists: mockRelatedArtists
    },
    "art-2": {
        id: "art-2",
        name: "Anitta",
        avatarUrl: Placeholder.src,
        monthlyListeners: 35120000,
        birthYear: 1993,
        biography: "Larissa de Macedo Machado, mais conhecida como Anitta, é uma cantora, compositora, atriz e empresária brasileira. Começou sua carreira cantando no coral da igreja e hoje é uma das artistas latinas mais ouvidas no mundo, com sucessos globais como 'Envolver'.",
        popularTracks: mockPopularTracks,
        albums: mockAlbums,
        relatedArtists: mockRelatedArtists
    },
    "art-3": {
        id: "art-3",
        name: "Vintage Culture",
        avatarUrl: Placeholder.src,
        monthlyListeners: 8300400,
        birthYear: 1993,
        biography: "Lukas Ruiz, conhecido como Vintage Culture, é um DJ e produtor brasileiro de música eletrônica. Ele ganhou enorme destaque misturando gêneros como deep house e indie pop, e hoje é atração principal em festivais como Tomorrowland e EDC.",
        popularTracks: mockPopularTracks,
        albums: mockAlbums,
        relatedArtists: mockRelatedArtists
    },
    "art-4": {
        id: "art-4",
        name: "Ludmilla",
        avatarUrl: Placeholder.src,
        monthlyListeners: 18500200,
        birthYear: 1995,
        biography: "Ludmilla Oliveira da Silva é uma cantora e compositora brasileira. Ela começou sua carreira no funk carioca e, posteriormente, expandiu seu repertório para o pop, R&B e pagode, tornando-se uma das artistas mais versáteis e premiadas do Brasil, incluindo vitórias no Grammy Latino.",
        popularTracks: mockPopularTracks,
        albums: mockAlbums,
        relatedArtists: mockRelatedArtists
    },
    "art-5": {
        id: "art-5",
        name: "Jorge & Mateus",
        avatarUrl: Placeholder.src,
        monthlyListeners: 14200000,
        birthYear: "1982 e 1986", // Exemplo para dupla
        biography: "Jorge & Mateus é uma das duplas sertanejas mais importantes do Brasil. Formada pelos cantores goianos Jorge Alves Barcelos e Mateus Pedro Liduário de Oliveira, eles são considerados os precursores do estilo sertanejo universitário e colecionam dezenas de hits que marcaram gerações.",
        popularTracks: mockPopularTracks,
        albums: mockAlbums,
        relatedArtists: mockRelatedArtists
    }
};
export const mockUsersDatabase: Record<string, any> = {
    "user-1": {
        id: "user-1",
        name: "Carlos Eduardo",
        avatarUrl: Placeholder.src,
        createdAt: "2024-01-15T12:00:00.000Z",
        publicPlaylists: mockedPlaylists.slice(0, 2).map(p => ({
            id: p.id, title: p.title, subtitle: "Playlist Pública", imageUrl: p.albumArtUrl, type: "Playlist", owner: "Carlos Eduardo", tracks: p.tracks
        })),
        followedArtists: [extendedMockedArtists[0], extendedMockedArtists[2]],
        followers: [
            { id: "f-1", title: "Ana Júlia", subtitle: "Usuário", imageUrl: Placeholder.src, type: "User", owner: "Usuário", tracks: [] }
        ]
    },
    "user-2": {
        id: "user-2",
        name: "Ana Júlia",
        avatarUrl: Placeholder.src,
        createdAt: "2023-05-20T14:30:00.000Z",
        publicPlaylists: mockedPlaylists.slice(1, 3).map(p => ({
            id: p.id, title: p.title, subtitle: "Playlist Pública", imageUrl: p.albumArtUrl, type: "Playlist", owner: "Ana Júlia", tracks: p.tracks
        })),
        followedArtists: [extendedMockedArtists[1], extendedMockedArtists[3], extendedMockedArtists[4]],
        followers: [
            { id: "f-2", title: "Bruno Henrique", subtitle: "Usuário", imageUrl: Placeholder.src, type: "User", owner: "Usuário", tracks: [] },
            { id: "f-3", title: "Mariana Costa", subtitle: "Usuário", imageUrl: Placeholder.src, type: "User", owner: "Usuário", tracks: [] }
        ]
    },
    "user-3": {
        id: "user-3",
        name: "Bruno Henrique",
        avatarUrl: Placeholder.src,
        createdAt: "2024-02-10T09:15:00.000Z",
        publicPlaylists: [],
        followedArtists: [extendedMockedArtists[0]],
        followers: []
    },
    "user-4": {
        id: "user-4",
        name: "Mariana Costa",
        avatarUrl: Placeholder.src,
        createdAt: "2022-11-05T18:22:00.000Z",
        publicPlaylists: mockedPlaylists.map(p => ({
            id: p.id, title: p.title, subtitle: "Playlist Pública", imageUrl: p.albumArtUrl, type: "Playlist", owner: "Mariana Costa", tracks: p.tracks
        })),
        followedArtists: extendedMockedArtists, // Segue todos
        followers: [
            { id: "f-1", title: "Carlos Eduardo", subtitle: "Usuário", imageUrl: Placeholder.src, type: "User", owner: "Usuário", tracks: [] },
            { id: "f-2", title: "Ana Júlia", subtitle: "Usuário", imageUrl: Placeholder.src, type: "User", owner: "Usuário", tracks: [] }
        ]
    },
    "user-5": {
        id: "user-5",
        name: "Felipe Almeida",
        avatarUrl: Placeholder.src,
        createdAt: "2025-01-01T00:00:00.000Z",
        publicPlaylists: mockedPlaylists.slice(0, 1).map(p => ({
            id: p.id, title: p.title, subtitle: "Playlist Pública", imageUrl: p.albumArtUrl, type: "Playlist", owner: "Felipe Almeida", tracks: p.tracks
        })),
        followedArtists: [extendedMockedArtists[2], extendedMockedArtists[4]],
        followers: [
            { id: "f-4", title: "Mariana Costa", subtitle: "Usuário", imageUrl: Placeholder.src, type: "User", owner: "Usuário", tracks: [] }
        ]
    }
};

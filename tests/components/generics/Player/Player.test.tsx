import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import Player, { Track } from "@/components/generics/Player";

const playMock = vi.fn().mockResolvedValue(undefined);
const pauseMock = vi.fn();
const loadMock = vi.fn();

window.HTMLMediaElement.prototype.play = playMock;
window.HTMLMediaElement.prototype.pause = pauseMock;
window.HTMLMediaElement.prototype.load = loadMock;

// Mock child generic components
vi.mock("@/components/generics/Button", () => ({
  default: ({ onClick, children, "aria-label": ariaLabel, className }: any) => (
    <button onClick={onClick} aria-label={ariaLabel} className={className}>
      {children}
    </button>
  ),
}));

vi.mock("@/components/generics/Icon", () => ({
  default: ({ src }: any) => (
    <span data-testid="mock-icon" data-icon-name={src?.displayName || "icon"}>
      Icon
    </span>
  ),
}));

vi.mock("@/components/generics/Image", () => ({
  default: ({ src, alt, size, className }: any) => (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={className}
      data-testid="album-art"
    />
  ),
}));

vi.mock("@/components/generics/Text", () => ({
  default: ({ textString }: any) => (
    <span data-testid="text">{textString}</span>
  ),
}));

vi.mock("lucide-react", () => ({
  Play: () => <span>PlayIcon</span>,
  Pause: () => <span>PauseIcon</span>,
  SkipBack: () => <span>SkipBackIcon</span>,
  SkipForward: () => <span>SkipForwardIcon</span>,
  Volume2: () => <span>Volume2Icon</span>,
  VolumeX: () => <span>VolumeXIcon</span>,
}));

const trackWithAlbum: Track = {
  id: "1",
  title: "Test Song",
  artist: "Test Artist",
  album: "Test Album",
  albumArtUrl: "https://example.com/art.jpg",
  audioUrl: "https://example.com/song.mp3",
  duration: 210,
};

const trackWithoutAlbum: Track = {
  id: "2",
  title: "Another Song",
  artist: "Another Artist",
  albumArtUrl: "https://example.com/art-2.jpg",
  audioUrl: "https://example.com/song-2.mp3",
};

function getAudioElement(): HTMLAudioElement {
  const audio = document.querySelector("audio");
  if (!audio) {
    throw new Error("Expected audio element to be rendered");
  }
  return audio as HTMLAudioElement;
}

function getSliders(): HTMLInputElement[] {
  return Array.from(document.querySelectorAll('input[type="range"]')) as HTMLInputElement[];
}

describe("Player", () => {
  const defaultProps = {
    currentTrack: trackWithAlbum,
    isPlaying: false,
    onPlayPause: vi.fn(),
    onNext: vi.fn(),
    onPrevious: vi.fn(),
    onSeek: vi.fn(),
    onVolumeChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders nothing when there is no current track", () => {
    render(<Player {...defaultProps} currentTrack={null} />);
    expect(screen.queryByText("Test Song")).not.toBeInTheDocument();
    expect(document.querySelector("audio")).not.toBeInTheDocument();
  });

  it("renders track information, including album when present", () => {
    render(<Player {...defaultProps} />);

    expect(screen.getByText("Test Song")).toBeInTheDocument();
    expect(screen.getByText("Test Artist • Test Album")).toBeInTheDocument();

    const albumArt = screen.getByTestId("album-art");
    expect(albumArt).toHaveAttribute("src", trackWithAlbum.albumArtUrl);
    expect(albumArt).toHaveAttribute("alt", trackWithAlbum.title);
  });

  it("renders artist only when album is absent", () => {
    render(<Player {...defaultProps} currentTrack={trackWithoutAlbum} />);

    expect(screen.getByText("Another Song")).toBeInTheDocument();
    expect(screen.getByText("Another Artist")).toBeInTheDocument();
    expect(screen.queryByText(/Another Artist •/)).not.toBeInTheDocument();
  });

  it("merges the custom className onto the root container", () => {
    const { container } = render(
      <Player {...defaultProps} className="custom-player-class" />
    );

    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveClass("fixed");
    expect(root).toHaveClass("bottom-0");
    expect(root).toHaveClass("custom-player-class");
  });

  it("calls onPlayPause when the play button is clicked", () => {
    render(<Player {...defaultProps} />);

    fireEvent.click(screen.getByLabelText("Play"));
    expect(defaultProps.onPlayPause).toHaveBeenCalledTimes(1);
  });

  it("shows pause state when isPlaying is true", () => {
    render(<Player {...defaultProps} isPlaying />);

    expect(screen.getByLabelText("Pause")).toBeInTheDocument();
    expect(screen.queryByLabelText("Play")).not.toBeInTheDocument();
  });

  it("calls onPrevious and onNext from the transport controls", () => {
    render(<Player {...defaultProps} />);

    fireEvent.click(screen.getByLabelText("Previous track"));
    fireEvent.click(screen.getByLabelText("Next track"));

    expect(defaultProps.onPrevious).toHaveBeenCalledTimes(1);
    expect(defaultProps.onNext).toHaveBeenCalledTimes(1);
  });

  it("loads a new track when currentTrack changes and updates the audio source", async () => {
    const { rerender } = render(<Player {...defaultProps} currentTrack={trackWithoutAlbum} />);

    vi.clearAllMocks();

    rerender(<Player {...defaultProps} currentTrack={trackWithAlbum} isPlaying />);

    const audio = getAudioElement();

    await waitFor(() => {
      expect(loadMock).toHaveBeenCalled();
      expect(playMock).toHaveBeenCalled();
    });

    expect(audio.src).toContain(trackWithAlbum.audioUrl);
  });

  it("plays and pauses the audio element when isPlaying changes", async () => {
    const { rerender } = render(<Player {...defaultProps} />);

    vi.clearAllMocks();

    rerender(<Player {...defaultProps} isPlaying />);

    await waitFor(() => {
      expect(playMock).toHaveBeenCalled();
    });

    rerender(<Player {...defaultProps} isPlaying={false} />);

    await waitFor(() => {
      expect(pauseMock).toHaveBeenCalled();
    });
  });

  it("displays formatted elapsed and total time after metadata loads", async () => {
    render(<Player {...defaultProps} />);

    const audio = getAudioElement();
    Object.defineProperty(audio, "duration", {
      value: 210,
      configurable: true,
    });

    fireEvent(audio, new Event("loadedmetadata"));

    await waitFor(() => {
      expect(screen.getByText("0:00")).toBeInTheDocument();
      expect(screen.getByText("3:30")).toBeInTheDocument();
    });

    const [seekSlider] = getSliders();
    expect(seekSlider).toHaveAttribute("max", "210");
  });

  it("updates the current time display when timeupdate fires", async () => {
    render(<Player {...defaultProps} />);

    const audio = getAudioElement();

    Object.defineProperty(audio, "duration", {
      value: 210,
      configurable: true,
    });
    fireEvent(audio, new Event("loadedmetadata"));

    Object.defineProperty(audio, "currentTime", {
      value: 45.5,
      configurable: true,
    });
    fireEvent(audio, new Event("timeupdate"));

    await waitFor(() => {
      expect(screen.getByText("0:45")).toBeInTheDocument();
    });
  });

  it("calls onSeek when the seek slider changes", async () => {
    render(<Player {...defaultProps} />);

    const audio = getAudioElement();
    Object.defineProperty(audio, "duration", {
      value: 210,
      configurable: true,
    });
    fireEvent(audio, new Event("loadedmetadata"));

    await waitFor(() => {
      expect(getSliders()[0]).toHaveAttribute("max", "210");
    });

    const [seekSlider] = getSliders();
    fireEvent.change(seekSlider, { target: { value: "30" } });

    expect(defaultProps.onSeek).toHaveBeenCalledWith(30);
    expect(audio.currentTime).toBe(30);
  });

  it("calls onVolumeChange when the volume slider changes", () => {
    render(<Player {...defaultProps} />);

    const sliders = getSliders();
    const volumeSlider = sliders[1];

    fireEvent.change(volumeSlider, { target: { value: "0.5" } });

    expect(defaultProps.onVolumeChange).toHaveBeenCalledWith(0.5);
  });

  it("mutes and restores the volume when the mute button is clicked", () => {
    render(<Player {...defaultProps} />);

    fireEvent.click(screen.getByLabelText("Mute"));
    expect(defaultProps.onVolumeChange).toHaveBeenCalledWith(0);
    expect(screen.getByLabelText("Unmute")).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Unmute"));
    expect(defaultProps.onVolumeChange).toHaveBeenCalledWith(0.7);
    expect(screen.getByLabelText("Mute")).toBeInTheDocument();
  });

  it("calls onNext when the audio ends", () => {
    render(<Player {...defaultProps} />);

    const audio = getAudioElement();
    fireEvent(audio, new Event("ended"));

    expect(defaultProps.onNext).toHaveBeenCalledTimes(1);
  });
});

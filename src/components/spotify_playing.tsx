"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { useTheme } from "@/context/themeProvider";
import { useSpotify } from "@/hooks/useSpotify";

type TrackListType = "recent" | "top";
type SpotifyEmbedProps = {
  className?: string;
  link: string;
  wide?: boolean;
};

function getEmbedUrl(link: string) {
  try {
    const parsed = new URL(link);
    const pathname = parsed.pathname.replace(/\/$/, "");
    return `https://open.spotify.com/embed${pathname}`;
  } catch {
    return link;
  }
}

const SpotifyEmbed = ({ className, link, wide = false }: SpotifyEmbedProps) => (
  <div className="overflow-hidden rounded-xl">
    <iframe
      className={className}
      src={getEmbedUrl(link)}
      width="100%"
      height={wide ? "80" : "352"}
      frameBorder="0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
      title="Spotify embed"
    />
  </div>
);

const smallListVariants: Variants = {
  hidden: {
    opacity: 1,
  },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.9,
      staggerChildren: 0.15,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

const smallItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 26,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -18,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

const SpotifyPlaying = () => {
  const {
    currentTrack,
    recentTracks,
    topTracks,
    loading,
    error,
    isConfigured,
  } = useSpotify();
  const [activeList, setActiveList] = useState<TrackListType>("recent");
  const { currentTheme, isDarkMode } = useTheme();
  const tracksRef = useRef<HTMLDivElement>(null);
  const preloadEmbedUrls = useMemo(() => {
    const uniqueUrls = new Set<string>();

    const addTrack = (spotifyUrl?: string) => {
      if (!spotifyUrl) {
        return;
      }

      uniqueUrls.add(getEmbedUrl(spotifyUrl));
    };

    for (const track of recentTracks) {
      addTrack(track.spotifyUrl);
    }

    for (const track of topTracks) {
      addTrack(track.spotifyUrl);
    }

    addTrack(currentTrack?.spotifyUrl);

    return Array.from(uniqueUrls).slice(0, 10);
  }, [recentTracks, topTracks, currentTrack?.spotifyUrl]);

  const { displayTrack, tracksList, heading } = useMemo(() => {
    const sourceTracks = activeList === "top" ? topTracks : recentTracks;
    const headingText =
      activeList === "top" ? "#1 Track This Month" : "Recently Played";
    const primaryTrack = sourceTracks[0] ?? currentTrack ?? null;

    return {
      displayTrack: primaryTrack,
      tracksList: sourceTracks
        .filter((track) => track.id !== primaryTrack?.id)
        .slice(0, 4),
      heading: headingText,
    };
  }, [activeList, currentTrack, recentTracks, topTracks]);
  const tracksListKey = useMemo(
    () => tracksList.map((track) => track.id).join(","),
    [tracksList],
  );

  const handleTabClick = (type: TrackListType) => {
    if (type === activeList) {
      return;
    }

    setActiveList(type);

    if (!tracksRef.current) {
      return;
    }

    const rect = tracksRef.current.getBoundingClientRect();
    const isFullyVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;

    if (!isFullyVisible) {
      tracksRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };

  const tabClassName = (type: TrackListType) =>
    `px-2.5 py-1 text-xs sm:text-sm rounded-lg transition-colors border ${
      activeList === type
        ? "font-semibold border-black/10 dark:border-white/10"
        : "border-transparent hover:border-black/10 dark:hover:border-white/10"
    }`;

  const tabStyle = (type: TrackListType) => ({
    backgroundColor:
      activeList === type ? currentTheme.nav.bubble : "transparent",
    color:
      activeList === type
        ? isDarkMode
          ? "#f9fafb"
          : "#0f172a"
        : isDarkMode
          ? "#9ca3af"
          : "#475569",
    transition:
      "background-color 0.2s ease-in-out, color 0.2s ease-in-out, border-color 0.2s ease-in-out",
  });

  if (!isConfigured && !loading) {
    return (
      <div className="w-full rounded-lg border border-border p-4 text-sm text-muted">
        Spotify credentials are not configured. Set
        <code className="px-1">SPOTIFY_CLIENT_ID</code>,
        <code className="px-1">SPOTIFY_CLIENT_SECRET</code>, and
        <code className="px-1">SPOTIFY_REFRESH_TOKEN</code>
        in <code className="px-1">.env.local</code>, then restart the dev
        server.
      </div>
    );
  }

  return (
    <div className="w-full max-w-[760px] mx-auto">
      {preloadEmbedUrls.length > 0 ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0"
        >
          {preloadEmbedUrls.map((embedUrl) => (
            <iframe
              key={`spotify-preload-${embedUrl}`}
              src={embedUrl}
              width="1"
              height="1"
              loading="eager"
              title="Spotify embed preload"
              tabIndex={-1}
            />
          ))}
        </div>
      ) : null}

      <div className={`mb-4 ${displayTrack ? "hidden sm:block" : "block"}`}>
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">{heading}</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => handleTabClick("recent")}
              className={tabClassName("recent")}
              style={tabStyle("recent")}
              type="button"
            >
              Recently Played
            </button>
            <button
              onClick={() => handleTabClick("top")}
              className={tabClassName("top")}
              style={tabStyle("top")}
              type="button"
            >
              Top Tracks
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:gap-4">
        <div className="w-full md:w-1/2 mb-4 md:mb-0">
          <div className="mb-4 sm:hidden">
            <h2 className="text-lg font-semibold">{heading}</h2>
          </div>

          {loading && !displayTrack ? (
            <div className="rounded-lg border border-border p-4 text-sm text-muted">
              Loading Spotify tracks...
            </div>
          ) : null}

          <AnimatePresence mode="wait">
            {displayTrack ? (
              <motion.div
                key={`${activeList}-${displayTrack.spotifyUrl}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{
                  opacity: 0,
                  y: -16,
                  transition: { duration: 0.2, ease: "easeOut" },
                }}
                transition={{
                  delay: 0.7,
                  duration: 0.35,
                  ease: "easeInOut",
                }}
              >
                <SpotifyEmbed
                  wide
                  link={displayTrack.spotifyUrl}
                  className="w-full sm:hidden"
                />
                <SpotifyEmbed
                  link={displayTrack.spotifyUrl}
                  className="hidden sm:block w-full"
                />

                <div className="mt-4 sm:hidden">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleTabClick("recent")}
                      className={tabClassName("recent")}
                      style={tabStyle("recent")}
                      type="button"
                    >
                      Recently Played
                    </button>
                    <button
                      onClick={() => handleTabClick("top")}
                      className={tabClassName("top")}
                      style={tabStyle("top")}
                      type="button"
                    >
                      Top Tracks
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          {error && !loading ? (
            <p className="mt-3 text-sm text-red-400">{error}</p>
          ) : null}
        </div>

        <div ref={tracksRef} className="w-full md:w-1/2">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeList}-${tracksListKey}`}
              className="grid gap-3"
              variants={smallListVariants}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              {tracksList.map((track) => (
                <motion.div key={track.id} variants={smallItemVariants}>
                  <SpotifyEmbed
                    wide
                    link={track.spotifyUrl}
                    className="w-full"
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {!loading && tracksList.length === 0 ? (
            <p className="rounded-lg border border-border p-4 text-sm text-muted">
              No tracks available for this list yet.
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SpotifyPlaying;

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSpotify } from "@/hooks/useSpotify";
import { useTheme } from "@/context/themeProvider";
import { FadeInSection } from "@/util/FadeInSection";

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

  const [visibleDisplayTrack, setVisibleDisplayTrack] = useState(displayTrack);
  const [visibleTracksList, setVisibleTracksList] = useState(tracksList);
  const [isBigDelaying, setIsBigDelaying] = useState(true);
  const [isSmallDelaying, setIsSmallDelaying] = useState(true);
  const tracksListKey = useMemo(
    () => tracksList.map((track) => track.id).join(","),
    [tracksList],
  );

  useEffect(() => {
    setIsBigDelaying(true);
    setIsSmallDelaying(true);

    const bigTimer = window.setTimeout(() => {
      setVisibleDisplayTrack(displayTrack);
      setIsBigDelaying(false);
    }, 800);

    const smallTimer = window.setTimeout(() => {
      setVisibleTracksList(tracksList);
      setIsSmallDelaying(false);
    }, 1000);

    return () => {
      window.clearTimeout(bigTimer);
      window.clearTimeout(smallTimer);
    };
  }, [activeList, displayTrack, tracksList, tracksListKey]);

  const handleTabClick = (type: TrackListType) => {
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

  if (!isConfigured) {
    return (
      <div className="w-full rounded-lg border border-border p-4 text-sm text-muted">
        Spotify token is not configured. Set
        <code className="px-1">NEXT_PUBLIC_SPOTIFY_ACCESS_TOKEN</code>
        or
        <code className="px-1">localStorage.spotify_access_token</code>
        to show your tracks.
      </div>
    );
  }

  return (
    <div className="w-full max-w-[760px] mx-auto">
      <div
        className={`mb-4 ${visibleDisplayTrack ? "hidden sm:block" : "block"}`}
      >
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

          {(loading || isBigDelaying) && !visibleDisplayTrack ? (
            <div className="rounded-lg border border-border p-4 text-sm text-muted">
              Loading Spotify tracks...
            </div>
          ) : null}

          <AnimatePresence mode="sync">
            <motion.div
              key={visibleDisplayTrack?.spotifyUrl ?? "empty-track"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {visibleDisplayTrack ? (
                <>
                  <SpotifyEmbed
                    wide
                    link={visibleDisplayTrack.spotifyUrl}
                    className="w-full sm:hidden"
                  />
                  <SpotifyEmbed
                    link={visibleDisplayTrack.spotifyUrl}
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
                </>
              ) : null}
            </motion.div>
          </AnimatePresence>

          {error && !loading && !isBigDelaying ? (
            <p className="mt-3 text-sm text-red-400">{error}</p>
          ) : null}
        </div>

        <div ref={tracksRef} className="w-full md:w-1/2">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeList}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="grid gap-3">
                {visibleTracksList.map((track, index) => (
                  <FadeInSection key={track.id} delay={0.1 + index * 0.08}>
                    <SpotifyEmbed
                      wide
                      link={track.spotifyUrl}
                      className="w-full"
                    />
                  </FadeInSection>
                ))}

                {!loading &&
                !isSmallDelaying &&
                visibleTracksList.length === 0 ? (
                  <p className="rounded-lg border border-border p-4 text-sm text-muted">
                    No tracks available for this list yet.
                  </p>
                ) : null}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SpotifyPlaying;

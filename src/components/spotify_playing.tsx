"use client";

import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useSpotify } from "@/hooks/useSpotify";
import { useTheme } from "@/context/themeProvider";
import { FadeInSection } from "@/util/FadeInSection";

type TrackListType = "recent" | "top";
type SpotifyEmbedProps = {
  className?: string;
  link: string;
  wide?: boolean;
};

const Spotify = dynamic<SpotifyEmbedProps>(
  () => import("react-spotify-embed").then((module) => module.Spotify),
  { ssr: false },
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
  const { currentTheme } = useTheme();
  const tracksRef = useRef<HTMLDivElement>(null);

  const { displayTrack, tracksList, heading } = useMemo(() => {
    const sourceTracks = activeList === "top" ? topTracks : recentTracks;

    if (currentTrack) {
      return {
        displayTrack: currentTrack,
        tracksList: sourceTracks
          .filter((track) => track.id !== currentTrack.id)
          .slice(0, 4),
        heading: "Now Playing",
      };
    }

    return {
      displayTrack: sourceTracks[0] ?? null,
      tracksList: sourceTracks.slice(1, 5),
      heading: activeList === "top" ? "#1 Track This Month" : "Recently Played",
    };
  }, [activeList, currentTrack, recentTracks, topTracks]);

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
    `px-3 py-1.5 text-sm rounded-lg transition-colors ${
      activeList === type
        ? "text-gray-900 dark:text-white font-medium"
        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
    }`;

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
    <div className="w-full">
      <div className={`mb-4 ${displayTrack ? "hidden sm:block" : "block"}`}>
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">{heading}</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => handleTabClick("recent")}
              className={tabClassName("recent")}
              style={{
                backgroundColor:
                  activeList === "recent"
                    ? currentTheme.nav.bubble
                    : "transparent",
                transition: "background-color 0.2s ease-in-out",
              }}
              type="button"
            >
              Recently Played
            </button>
            <button
              onClick={() => handleTabClick("top")}
              className={tabClassName("top")}
              style={{
                backgroundColor:
                  activeList === "top"
                    ? currentTheme.nav.bubble
                    : "transparent",
                transition: "background-color 0.2s ease-in-out",
              }}
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

          <AnimatePresence mode="sync">
            <motion.div
              key={displayTrack?.spotifyUrl ?? "empty-track"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {displayTrack ? (
                <>
                  <Spotify
                    wide
                    link={displayTrack.spotifyUrl}
                    className="w-full sm:hidden"
                  />
                  <Spotify
                    link={displayTrack.spotifyUrl}
                    className="hidden sm:block w-full"
                  />

                  <div className="mt-4 sm:hidden">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleTabClick("recent")}
                        className={tabClassName("recent")}
                        style={{
                          backgroundColor:
                            activeList === "recent"
                              ? currentTheme.nav.bubble
                              : "transparent",
                          transition: "background-color 0.2s ease-in-out",
                        }}
                        type="button"
                      >
                        Recently Played
                      </button>
                      <button
                        onClick={() => handleTabClick("top")}
                        className={tabClassName("top")}
                        style={{
                          backgroundColor:
                            activeList === "top"
                              ? currentTheme.nav.bubble
                              : "transparent",
                          transition: "background-color 0.2s ease-in-out",
                        }}
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

          {error && !loading ? (
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
                {tracksList.map((track, index) => (
                  <FadeInSection key={track.id} delay={0.1 + index * 0.08}>
                    <Spotify wide link={track.spotifyUrl} className="w-full" />
                  </FadeInSection>
                ))}

                {!loading && tracksList.length === 0 ? (
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

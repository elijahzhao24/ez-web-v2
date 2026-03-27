"use client";

import { useEffect, useState } from "react";
import { useSpotifyAuth } from "@/hooks/useSpotifyAuth";

export interface Track {
  id: string;
  name: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  spotifyUrl: string;
}

interface SpotifyArtist {
  name: string;
}

interface SpotifyImage {
  url: string;
}

interface SpotifyAlbum {
  name: string;
  images: SpotifyImage[];
}

interface SpotifyTrack {
  id: string;
  name: string;
  artists: SpotifyArtist[];
  album: SpotifyAlbum;
  external_urls: {
    spotify: string;
  };
}

interface SpotifyCurrentlyPlayingResponse {
  item: SpotifyTrack | null;
}

interface SpotifyRecentlyPlayedItem {
  track: SpotifyTrack;
}

interface SpotifyRecentlyPlayedResponse {
  items: SpotifyRecentlyPlayedItem[];
}

interface SpotifyTopTracksResponse {
  items: SpotifyTrack[];
}

class SpotifyApiError extends Error {
  status: number;
  details?: string;

  constructor(status: number, details?: string) {
    super(
      details
        ? `Spotify request failed (${status}): ${details}`
        : `Spotify request failed (${status})`,
    );
    this.name = "SpotifyApiError";
    this.status = status;
    this.details = details;
  }
}

function toTrack(track: SpotifyTrack): Track {
  return {
    id: track.id,
    name: track.name,
    artist: track.artists.map((artist) => artist.name).join(", "),
    album: track.album.name,
    albumImageUrl: track.album.images[0]?.url ?? "",
    spotifyUrl: track.external_urls.spotify,
  };
}

async function spotifyFetch<T>(
  url: string,
  token: string,
  signal: AbortSignal,
): Promise<T | null> {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
    signal,
  });

  if (response.status === 204) {
    return null;
  }

  if (!response.ok) {
    let details: string | undefined;
    try {
      const payload = (await response.json()) as
        | { error?: { message?: string } | string }
        | undefined;
      if (typeof payload?.error === "string") {
        details = payload.error;
      } else if (typeof payload?.error?.message === "string") {
        details = payload.error.message;
      }
    } catch {
      details = undefined;
    }

    throw new SpotifyApiError(response.status, details);
  }

  return (await response.json()) as T;
}

export function useSpotify() {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [recentTracks, setRecentTracks] = useState<Track[]>([]);
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {
    token,
    isConfigured,
    isLoading: isAuthLoading,
    error: authError,
  } = useSpotifyAuth();

  useEffect(() => {
    if (isAuthLoading) {
      setLoading(true);
      return;
    }

    if (!token) {
      setCurrentTrack(null);
      setRecentTracks([]);
      setTopTracks([]);
      setError(authError);
      setLoading(false);
      return;
    }

    let isActive = true;
    const controller = new AbortController();

    const fetchTracks = async () => {
      setLoading(true);
      setError(null);

      try {
        const [currentResponse, recentResponse, topResponse] =
          await Promise.all([
            spotifyFetch<SpotifyCurrentlyPlayingResponse>(
              "https://api.spotify.com/v1/me/player/currently-playing",
              token,
              controller.signal,
            ),
            spotifyFetch<SpotifyRecentlyPlayedResponse>(
              "https://api.spotify.com/v1/me/player/recently-played?limit=5",
              token,
              controller.signal,
            ),
            spotifyFetch<SpotifyTopTracksResponse>(
              "https://api.spotify.com/v1/me/top/tracks?limit=5&time_range=short_term",
              token,
              controller.signal,
            ),
          ]);

        if (!isActive) {
          return;
        }

        setCurrentTrack(
          currentResponse?.item ? toTrack(currentResponse.item) : null,
        );
        setRecentTracks(
          (recentResponse?.items ?? []).map((item) => toTrack(item.track)),
        );
        setTopTracks((topResponse?.items ?? []).map((track) => toTrack(track)));
      } catch (err) {
        if (!isActive || controller.signal.aborted) {
          return;
        }

        console.error("Error fetching Spotify data:", err);
        if (err instanceof SpotifyApiError && err.status === 401) {
          setError(
            `Spotify token is invalid or expired (401${err.details ? `: ${err.details}` : ""}). Check Spotify app scopes and refresh token.`,
          );
        } else {
          setError(
            "Could not fetch Spotify tracks. Check your Spotify credentials and permissions.",
          );
        }
        setCurrentTrack(null);
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    void fetchTracks();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [token, isAuthLoading, authError]);

  return {
    currentTrack,
    recentTracks,
    topTracks,
    loading,
    error,
    isConfigured,
  };
}

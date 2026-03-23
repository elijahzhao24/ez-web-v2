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
    throw new Error(`Spotify request failed (${response.status})`);
  }

  return (await response.json()) as T;
}

export function useSpotify() {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [recentTracks, setRecentTracks] = useState<Track[]>([]);
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token, isConfigured } = useSpotifyAuth();

  useEffect(() => {
    if (!token) {
      setCurrentTrack(null);
      setRecentTracks([]);
      setTopTracks([]);
      setError(null);
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
        setError(
          "Could not fetch Spotify tracks. Check your token and Spotify permissions.",
        );
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
  }, [token]);

  return {
    currentTrack,
    recentTracks,
    topTracks,
    loading,
    error,
    isConfigured,
  };
}

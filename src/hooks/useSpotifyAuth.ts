"use client";

import { useEffect, useState } from "react";

interface SpotifyCredsResponse {
  accessToken?: string;
  expiresIn?: number;
  error?: string;
  details?: string;
}

const SPOTIFY_CREDS_ENDPOINT = "/api/spotify/creds";

export function useSpotifyAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchToken = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(SPOTIFY_CREDS_ENDPOINT, {
          cache: "no-store",
          signal: controller.signal,
        });

        const payload = (await response.json()) as SpotifyCredsResponse;
        if (!response.ok || !payload.accessToken) {
          throw new Error(
            payload.details ??
              payload.error ??
              "Spotify credentials endpoint did not return an access token.",
          );
        }

        setToken(payload.accessToken);
      } catch (err) {
        if (controller.signal.aborted) {
          return;
        }

        setToken(null);
        setError(
          err instanceof Error
            ? err.message
            : "Failed to fetch Spotify credentials.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    void fetchToken();

    return () => {
      controller.abort();
    };
  }, []);

  return {
    token,
    isLoading,
    error,
    isConfigured: Boolean(token),
  };
}

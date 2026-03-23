"use client";

import { useEffect, useState } from "react";

const LOCAL_STORAGE_TOKEN_KEY = "spotify_access_token";

export function useSpotifyAuth() {
  const [token, setToken] = useState<string | null>(
    process.env.NEXT_PUBLIC_SPOTIFY_ACCESS_TOKEN ?? null,
  );

  useEffect(() => {
    const storedToken = window.localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    if (storedToken) {
      setToken(storedToken);
      return;
    }

    if (process.env.NEXT_PUBLIC_SPOTIFY_ACCESS_TOKEN) {
      setToken(process.env.NEXT_PUBLIC_SPOTIFY_ACCESS_TOKEN);
    }
  }, []);

  return {
    token,
    isConfigured: Boolean(token),
  };
}

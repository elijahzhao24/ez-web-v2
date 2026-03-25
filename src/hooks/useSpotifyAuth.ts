"use client";

import { useEffect, useState } from "react";

const LOCAL_STORAGE_TOKEN_KEY = "spotify_access_token";

function sanitizeToken(raw: string | null | undefined): string | null {
  if (!raw) {
    return null;
  }

  const trimmed = raw.trim();
  const unquoted = trimmed.replace(/^["']|["']$/g, "");

  return unquoted.length > 0 ? unquoted : null;
}

export function useSpotifyAuth() {
  const envToken = sanitizeToken(process.env.NEXT_PUBLIC_SPOTIFY_ACCESS_TOKEN);
  const [token, setToken] = useState<string | null>(envToken);

  useEffect(() => {
    // Prefer .env token. Only fall back to localStorage when env token is absent.
    if (envToken) {
      setToken(envToken);
      return;
    }

    const storedToken = sanitizeToken(
      window.localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY),
    );
    if (storedToken) {
      setToken(storedToken);
    }
  }, [envToken]);

  return {
    token,
    isConfigured: Boolean(token),
  };
}

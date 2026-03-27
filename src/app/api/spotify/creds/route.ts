import { NextResponse } from "next/server";

const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope?: string;
}

function readRequiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

export async function GET() {
  try {
    const clientId = readRequiredEnv("SPOTIFY_CLIENT_ID");
    const clientSecret = readRequiredEnv("SPOTIFY_CLIENT_SECRET");
    const refreshToken = readRequiredEnv("SPOTIFY_REFRESH_TOKEN");

    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
      "base64",
    );

    const body = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    });

    const response = await fetch(SPOTIFY_TOKEN_URL, {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        {
          error: "Could not fetch Spotify token.",
          details: errorText || "Unknown Spotify API error.",
        },
        { status: response.status },
      );
    }

    const payload = (await response.json()) as SpotifyTokenResponse;

    return NextResponse.json(
      {
        accessToken: payload.access_token,
        tokenType: payload.token_type,
        expiresIn: payload.expires_in,
        scope: payload.scope ?? null,
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Spotify credentials are not configured correctly.",
        details: error instanceof Error ? error.message : "Unknown error.",
      },
      { status: 500 },
    );
  }
}

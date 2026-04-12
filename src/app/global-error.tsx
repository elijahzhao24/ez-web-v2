"use client";

import type { ReactNode } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}): ReactNode {
  return (
    <html lang="en">
      <body className="bg-background text-foreground antialiased">
        <main className="container-width py-10">
          <section className="space-y-3 rounded-xl border border-border bg-surface/20 p-5">
            <h1 className="text-xl font-semibold text-foreground">
              Something went wrong
            </h1>
            <p className="text-sm text-muted">
              An unexpected error occurred while rendering this page.
            </p>
            {error?.digest ? (
              <p className="text-xs text-muted-2">Error ID: {error.digest}</p>
            ) : null}
            <button
              type="button"
              onClick={() => reset()}
              className="rounded-md border border-border px-3 py-1.5 text-sm text-foreground transition-colors hover:bg-surface/40"
            >
              Try again
            </button>
          </section>
        </main>
      </body>
    </html>
  );
}

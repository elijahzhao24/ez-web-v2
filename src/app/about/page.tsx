export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <section className="container-width section flex flex-1 items-center">
        <div className="w-full">
          <p className="text-sm uppercase tracking-[0.24em] text-muted">About</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
            About page
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
            Still a work in progress. Coming Soon.
          </p>
        </div>
      </section>
    </main>
  );
}

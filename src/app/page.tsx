export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <section className="container-width section flex flex-1 items-center">
        <div className="w-full">
          <p className="text-sm uppercase tracking-[0.24em] text-muted">Home</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
            Your Next.js app is now using App Router navigation.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
            The navbar now matches the tighter reference layout, and this filler
            content is centered inside the same page container.
          </p>
        </div>
      </section>
    </main>
  );
}

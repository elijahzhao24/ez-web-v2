export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <section className="container-width section flex flex-1 items-center">
        <div className="w-full">
          <p className="text-sm uppercase tracking-[0.24em] text-muted">Contact</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
            Contact page
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
            Placeholder App Router page for your contact links, form, or social
            details. The route is live at <code>/contact</code>.
          </p>
        </div>
      </section>
    </main>
  );
}

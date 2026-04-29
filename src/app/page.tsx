import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-6 sm:px-10 lg:px-12">
        <header className="flex items-center justify-between border-b border-secondary/35 pb-5">
          <Link
            href="/"
            className="font-display text-xl font-semibold uppercase text-foreground"
          >
            Jerry Robayo
          </Link>
          <p className="hidden font-display text-sm uppercase text-secondary sm:block">
            Portfolio
          </p>
        </header>

        <div className="grid flex-1 items-center gap-12 py-16 lg:grid-cols-[1fr_320px] lg:py-20">
          <div className="max-w-4xl">
            <p className="mb-5 font-display text-sm uppercase text-secondary">
              Full Stack Developer
            </p>
            <h1 className="font-display text-[clamp(4rem,14vw,9rem)] font-bold uppercase leading-[0.9] text-foreground">
              Jerry
              <span className="block text-accent">Robayo</span>
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-8 text-secondary sm:text-lg">
              I want to be a full stack developer, building thoughtful digital
              products from interface to infrastructure.
            </p>
            <a
              href="mailto:jerry@example.com"
              className="mt-10 inline-flex min-h-12 items-center justify-center rounded-[2px] bg-accent px-5 font-display text-sm font-semibold uppercase text-foreground transition-colors hover:bg-[#a82626] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
            >
              Get in touch
            </a>
          </div>

          <aside className="border-l-0 border-secondary/35 pt-8 lg:border-l lg:pl-8 lg:pt-0">
            <div className="h-px w-full bg-secondary/35 lg:hidden" />
            <dl className="mt-8 grid gap-7 text-sm lg:mt-0">
              <div>
                <dt className="font-display uppercase text-secondary">
                  Current Focus
                </dt>
                <dd className="mt-2 text-foreground">
                  Frontend, backend, and product-ready web apps.
                </dd>
              </div>
              <div>
                <dt className="font-display uppercase text-secondary">
                  Stack Direction
                </dt>
                <dd className="mt-2 text-foreground">
                  Next.js, React, TypeScript, APIs, and databases.
                </dd>
              </div>
              <div>
                <dt className="font-display uppercase text-secondary">
                  Availability
                </dt>
                <dd className="mt-2 text-foreground">
                  Portfolio details coming next.
                </dd>
              </div>
            </dl>
          </aside>
        </div>

        <footer className="flex flex-col gap-3 border-t border-secondary/35 pt-5 text-sm text-secondary sm:flex-row sm:items-center sm:justify-between">
          <p>Based in the United States</p>
          <p>Next.js App Router + Tailwind</p>
        </footer>
      </section>
    </main>
  );
}

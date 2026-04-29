import Link from "next/link";
import { FeaturedSpotlight } from "@/components/ui/feature-spotlight";

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

        <div className="flex flex-1 items-center justify-center py-16 lg:py-20">
          <FeaturedSpotlight />
        </div>

        <footer className="flex flex-col gap-3 border-t border-secondary/35 pt-5 text-sm text-secondary sm:flex-row sm:items-center sm:justify-between">
          <p>Based in the United States</p>
          <p>Next.js App Router + Tailwind</p>
        </footer>
      </section>
    </main>
  );
}

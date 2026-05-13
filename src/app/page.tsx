import { FeaturedSpotlight } from "@/components/ui/feature-spotlight";
import { SiteHeader } from "@/components/site-header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jerry Robayo | Full Stack Developer",
  description:
    "Portfolio home page for Jerry Robayo, a Brooklyn College computer science student and full stack developer.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-6 sm:px-10 lg:px-12">
        <SiteHeader />

        <div className="flex flex-1 items-center justify-center py-16 lg:py-20">
          <FeaturedSpotlight />
        </div>

        <footer className="flex flex-col gap-3 border-t border-secondary/35 pt-5 text-sm text-secondary sm:flex-row sm:items-center sm:justify-between">
          <p>Based in the United States</p>
          <a
            href="https://www.buymeacoffee.com/jerry.robayo"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-accent"
          >
            You can support my work by buying me a coffee :)
          </a>
        </footer>
      </section>
    </main>
  );
}

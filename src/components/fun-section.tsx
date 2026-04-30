import { CoffeeIcon } from "lucide-react";
import { WordleGame } from "@/components/wordle-game";

export function FunSection() {
  return (
    <section id="fun" className="py-10 sm:py-12 lg:py-14">
      <div className="mb-8 flex items-center gap-4">
        <p className="font-display text-sm uppercase tracking-[0.28em] text-accent">
          Need A Break?
        </p>
        <div className="h-px w-24 bg-secondary/25" />
      </div>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(360px,1fr)] lg:gap-10 xl:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)] xl:gap-14">
        <div>
          <div className="mb-5 flex h-12 w-12 items-center justify-center border border-secondary/25 bg-surface text-accent">
            <CoffeeIcon className="h-6 w-6" />
          </div>
          <h1 className="font-display text-6xl font-semibold uppercase leading-none text-foreground sm:text-7xl lg:text-7xl xl:text-8xl">
            Recruiter
            <span className="block text-accent">Reset.</span>
          </h1>
          <p className="mt-6 max-w-xl text-xl leading-9 text-secondary sm:text-2xl sm:leading-10">
            If you&apos;re a recruiter, maybe you need to relax before going to
            the next resume. Grab some coffee and play my little daily Wordle.
          </p>
          <p className="mt-6 max-w-lg text-sm leading-7 text-secondary">
            The guess check runs through a server route, so the answer stays off
            your computer.
          </p>
        </div>

        <WordleGame />
      </div>
    </section>
  );
}

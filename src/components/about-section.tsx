import { ArrowDownToLine, ArrowUpRight } from "lucide-react";

const profile = [
  ["Role", "Software engineer, CS student"],
  ["Based", "New York, NY"],
  ["Seeking", "2026 new-grad software role"],
];

const capabilities = [
  "Next.js",
  "TypeScript",
  "React",
  "Tailwind CSS",
  "API design",
  "SQL",
  "PHP",
  "Ruby on Rails",
];

export function AboutSection() {
  return (
    <section id="about-me" className="py-14 sm:py-16 lg:py-20">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start lg:gap-14">
        <div className="min-w-0">
          <div className="mb-9 flex items-center gap-4">
            <p className="font-display text-sm uppercase tracking-[0.28em] text-accent">
              Dossier
            </p>
            <div className="h-px w-24 bg-secondary/25" />
          </div>

          <h1 className="font-display text-6xl font-semibold uppercase leading-none text-foreground sm:text-7xl lg:text-8xl">
            About
            <span className="block text-accent">Me.</span>
          </h1>

          <p className="mt-8 max-w-4xl text-2xl leading-10 text-foreground sm:text-3xl sm:leading-[1.45]">
            Brooklyn College computer science senior building full-stack web
            apps with polished interfaces, reliable APIs, and product-ready
            delivery.
          </p>

          <div className="mt-10 border border-secondary/25 bg-surface/45 p-5">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-3 w-3 rounded-full border border-accent bg-accent/70" />
              <p className="font-display text-sm uppercase tracking-[0.24em] text-accent">
                Now
              </p>
            </div>
            <p className="text-base leading-7 text-secondary sm:text-lg sm:leading-8">
              Finishing my final semester, looking for 2026 new-grad Full Stack
              Developer roles, and sharpening the kind of work that connects
              frontend detail with backend reliability.
            </p>
          </div>

          <div className="mt-12 grid gap-8 text-base leading-8 text-secondary sm:text-lg sm:leading-9">
            <p>
              I&apos;m Jerry Robayo, a first-generation Hispanic student from
              Ecuador and a citizen of the United States. That background shapes
              how I work: steady, resourceful, and focused on making software
              that is useful beyond the demo.
            </p>

            <p id="experience">
              My experience spans responsive product interfaces, authenticated
              app flows, reusable component systems, API clients, and database
              backed features. I like moving between the browser and the server
              because that is where product decisions become real.
            </p>
          </div>

        </div>

        <div className="lg:mt-24">
          <aside className="border border-secondary/25 bg-surface/70 p-6">
            <dl className="grid gap-5">
              {profile.map(([label, value]) => (
                <div key={label} className="grid grid-cols-[92px_1fr] gap-4">
                  <dt className="font-display text-xs uppercase tracking-[0.22em] text-secondary/70">
                    {label}
                  </dt>
                  <dd className="text-base text-foreground">{value}</dd>
                </div>
              ))}
            </dl>

            <div
              id="contact"
              className="mt-7 border-t border-secondary/25 pt-6"
            >
              <p className="font-display text-xs uppercase tracking-[0.22em] text-secondary/70">
                Links
              </p>
              <div className="mt-4 flex flex-wrap gap-4 text-base text-foreground">
                <a
                  href="https://github.com/LJebry"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 border-b border-secondary/35 transition-colors hover:border-accent hover:text-accent"
                >
                  GitHub <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  href="https://linkedin.com/in/jerry-robayo/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 border-b border-secondary/35 transition-colors hover:border-accent hover:text-accent"
                >
                  LinkedIn <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            <a
              href="/jerry-robayo-resume.pdf"
              download
              className="mt-8 inline-flex w-full items-center justify-center gap-3 border border-accent px-5 py-4 font-display text-sm uppercase tracking-[0.18em] text-foreground transition-colors hover:bg-accent"
            >
              Download Resume
              <ArrowDownToLine className="h-4 w-4" />
            </a>
          </aside>

          <div id="projects" className="mt-6">
            <p className="font-display text-xs uppercase tracking-[0.22em] text-secondary/70">
              Skills
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {capabilities.map((item) => (
                <div
                  key={item}
                  className="border border-secondary/25 bg-background px-4 py-3"
                >
                  <p className="font-display text-sm uppercase text-foreground">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

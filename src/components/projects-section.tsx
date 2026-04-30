import { ArrowUpRight, Code2 } from "lucide-react";

const projects = [
  {
    index: "01",
    title: "Portfolio v2",
    status: "Live build",
    description:
      "A personal portfolio built with Next.js App Router and Tailwind CSS, designed around a cafe-racer visual system, sharp typography, and fast static routes.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/LJebry/portfolio-v2",
      },
    ],
  },
  {
    index: "02",
    title: "Full-Stack Product App",
    status: "Case study soon",
    description:
      "A product-focused web app case study for authenticated flows, reusable UI, API clients, validation, and state management.",
    stack: ["React", "APIs", "Auth", "Zod"],
    links: [],
  },
  {
    index: "03",
    title: "Backend Systems Work",
    status: "Case study soon",
    description:
      "A backend-oriented writeup for database-backed features, API reliability, and the work that keeps product interfaces connected to real data.",
    stack: ["SQL", "PHP", "Ruby on Rails", "Git"],
    links: [],
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="py-14 sm:py-16 lg:py-20">
      <div className="mb-10 flex items-center gap-4">
        <p className="font-display text-sm uppercase tracking-[0.28em] text-accent">
          Selected Work
        </p>
        <div className="h-px w-24 bg-secondary/25" />
      </div>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
        <div>
          <h1 className="font-display text-6xl font-semibold uppercase leading-none text-foreground sm:text-7xl lg:text-8xl">
            Projects
            <span className="block text-accent">Built.</span>
          </h1>
          <p className="mt-8 max-w-xl text-xl leading-9 text-secondary sm:text-2xl sm:leading-10">
            A working archive of web apps, systems practice, and case studies.
            I&apos;ll keep replacing these with deeper project pages as the
            portfolio fills out.
          </p>
        </div>

        <div className="grid gap-5">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group border border-secondary/25 bg-surface/55 p-5 transition-colors hover:border-accent/70"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <span className="font-display text-sm text-accent">
                      {project.index}
                    </span>
                    <span className="font-display text-xs uppercase tracking-[0.22em] text-secondary">
                      {project.status}
                    </span>
                  </div>
                  <h2 className="font-display text-3xl font-semibold uppercase text-foreground sm:text-4xl">
                    {project.title}
                  </h2>
                </div>

                <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-secondary/35 text-foreground transition-colors group-hover:border-accent group-hover:bg-accent">
                  <Code2 className="h-5 w-5" />
                </div>
              </div>

              <p className="mt-5 max-w-2xl text-base leading-8 text-secondary">
                {project.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="border border-secondary/25 px-3 py-2 font-display text-xs uppercase tracking-[0.16em] text-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap gap-4">
                {project.links.length > 0 ? (
                  project.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 border-b border-secondary/35 text-base text-foreground transition-colors hover:border-accent hover:text-accent"
                    >
                      {link.label}
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  ))
                ) : (
                  <span className="font-display text-xs uppercase tracking-[0.2em] text-secondary/70">
                    Details coming soon
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

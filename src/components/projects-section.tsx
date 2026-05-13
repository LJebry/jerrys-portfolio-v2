import { ExternalLink } from "lucide-react";

function GitHubMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M12 2C6.48 2 2 6.58 2 12.24c0 4.52 2.87 8.36 6.84 9.72.5.09.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.86.09-.66.35-1.12.63-1.37-2.22-.26-4.55-1.14-4.55-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 7c.85 0 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.95.68 1.92 0 1.38-.01 2.49-.01 2.83 0 .27.18.59.69.49A10.18 10.18 0 0 0 22 12.24C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

const projects = [
  {
    index: "01",
    title: "Jerry's Portfolio V2",
    status: "Live build",
    description:
      "This portfolio site, built with Next.js App Router, TypeScript, and Tailwind CSS. It uses a cafe-racer visual system, focused project pages, a gallery, a contact page, and a small daily Wordle break game.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/LJebry/jerrys-portfolio-v2",
        type: "github",
      },
      {
        label: "Live Demo",
        href: "/",
        type: "demo",
      },
    ],
  },
  {
    index: "02",
    title: "EchoLingo",
    status: "Hackathon build",
    description:
      "A mobile-first speech-to-speech translation app built in a 48-hour hackathon, enabling real-time cross-lingual communication with sub-2s latency. The app combines a full-stack translation pipeline using OpenAI Whisper/GPT-4o, ElevenLabs voice synthesis, Prisma, PostgreSQL, and fluid Framer Motion interactions.",
    stack: ["OpenAI", "ElevenLabs", "Prisma", "PostgreSQL", "Framer Motion"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/LJebry/EchoLingo",
        type: "github",
      },
      {
        label: "Live Demo",
        href: "https://echo-lingo-eight.vercel.app/",
        type: "demo",
      },
    ],
  },
  {
    index: "03",
    title: "VETPET",
    status: "Client frontend",
    description:
      "A sleek, high-performance veterinary SPA built for my dad's veterinary business. The project focuses on a polished frontend experience with React 19, TypeScript, Tailwind CSS, GSAP, a custom Bento gallery, Framer Motion animations, lazy-loaded media, and intersection observers for smooth performance across devices.",
    stack: ["React 19", "TypeScript", "Tailwind CSS", "GSAP", "Netlify"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/LJebry/VETPET",
        type: "github",
      },
      {
        label: "Live Demo",
        href: "https://vetpetveterinaria.netlify.app/",
        type: "demo",
      },
    ],
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="py-14 sm:py-16 lg:py-20">
      <div className="mb-10 flex items-center gap-4">
        <p className="font-display text-sm uppercase tracking-[0.28em] text-accent">
          04 / Selected Work
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
            A working archive of some of my projects.
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

                <div className="flex shrink-0 gap-2">
                  {project.links.map((link) => {
                    const Icon =
                      link.type === "github" ? GitHubMark : ExternalLink;
                    const isInternal = link.href.startsWith("/");

                    return (
                      <a
                        key={link.href}
                        href={link.href}
                        target={isInternal ? undefined : "_blank"}
                        rel={isInternal ? undefined : "noreferrer"}
                        aria-label={`${project.title} ${link.label}`}
                        title={link.label}
                        className="inline-flex size-11 items-center justify-center border border-secondary/35 text-foreground transition-colors hover:border-accent hover:bg-accent"
                      >
                        <Icon className="size-5" />
                      </a>
                    );
                  })}
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

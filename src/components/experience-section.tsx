import { ProjectCards } from "@/components/ui/animated-project-cards";

const experiences = [
  {
    id: "unadat",
    title: "Software Engineering Intern",
    pricePerHour: "Unadat · Full-stack product work",
    status: "Paid" as const,
    categories: ["React", "PHP", "JavaScript", "Backend"],
    description:
      "Worked across frontend and backend surfaces, including reusable product UI, API-connected features, and backend hardening for safer application behavior.",
    location: "New York, NY",
    timeAgo: "Internship experience",
    logoColor: "bg-accent",
    logoIcon: "U",
  },
  {
    id: "brooklyn-college",
    title: "Computer Science Senior",
    pricePerHour: "Brooklyn College · Final semester",
    status: "Paid" as const,
    categories: ["CS", "Systems", "Databases", "Software Design"],
    description:
      "Focused on software engineering fundamentals, full-stack development, and the practical bridge between product interfaces, data, and maintainable systems.",
    location: "Brooklyn, NY",
    timeAgo: "Graduating 2026",
    logoColor: "bg-surface",
    logoIcon: "BC",
  },
  {
    id: "portfolio",
    title: "Independent Product Builds",
    pricePerHour: "Personal projects · Web applications",
    status: "Not Paid" as const,
    categories: ["Next.js", "TypeScript", "Tailwind CSS", "APIs"],
    description:
      "Building and refining portfolio projects that show production-minded UI, routing, responsive layouts, and clean implementation details.",
    location: "Remote",
    timeAgo: "Ongoing",
    logoColor: "bg-background",
    logoIcon: "JR",
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="py-14 sm:py-16 lg:py-20">
      <div className="mb-10 flex items-center gap-4">
        <p className="font-display text-sm uppercase tracking-[0.28em] text-accent">
          Timeline
        </p>
        <div className="h-px w-24 bg-secondary/25" />
      </div>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-16">
        <div>
          <h1 className="font-display text-5xl font-semibold uppercase leading-none text-foreground sm:text-6xl lg:text-7xl">
            Experience
            <span className="block text-accent">Log.</span>
          </h1>
          <p className="mt-8 max-w-xl text-xl leading-9 text-secondary sm:text-2xl sm:leading-10">
            A compact view of the work, coursework, and product practice behind
            my full-stack development path.
          </p>
        </div>

        <div className="relative z-10 border border-secondary/25 bg-surface px-5 py-2">
          <ProjectCards projects={experiences} />
        </div>
      </div>
    </section>
  );
}

import { ProjectsSection } from "@/components/projects-section";
import { SiteHeader } from "@/components/site-header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Jerry Robayo",
  description:
    "Selected full stack, frontend, and product-ready web projects by Jerry Robayo.",
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-6 sm:px-10 lg:px-12">
        <SiteHeader />

        <ProjectsSection />

        <footer className="flex flex-col gap-3 border-t border-secondary/35 pt-5 text-sm text-secondary sm:flex-row sm:items-center sm:justify-between">
          <p>Selected work by Jerry Robayo</p>
          <p>Full-stack web projects</p>
        </footer>
      </section>
    </main>
  );
}

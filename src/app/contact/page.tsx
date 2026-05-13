import { ContactSection } from "@/components/contact-section";
import { SiteHeader } from "@/components/site-header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Jerry Robayo",
  description:
    "Contact Jerry Robayo about software engineering roles, projects, and collaboration.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-6 sm:px-10 lg:px-12">
        <SiteHeader />

        <ContactSection />

        <footer className="flex flex-col gap-3 border-t border-secondary/35 pt-5 text-sm text-secondary sm:flex-row sm:items-center sm:justify-between">
          <p>Contact Jerry Robayo</p>
          <p>Open to 2026 new-grad roles</p>
        </footer>
      </section>
    </main>
  );
}

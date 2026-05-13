import { MailIcon, MapPinIcon, UserRoundIcon } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { ContactCard } from "@/components/ui/contact-card";

export function ContactSection() {
  return (
    <section id="contact" className="py-14 sm:py-16 lg:py-20">
      <div className="mb-10 flex items-center gap-4">
        <p className="font-display text-sm uppercase tracking-[0.28em] text-accent">
          06 / Contact
        </p>
        <div className="h-px w-24 bg-secondary/25" />
      </div>

      <ContactCard
        title="Get In Touch"
        description="Have a role, project, collaboration, or question? Send a message and it will land directly in my inbox."
        contactInfo={[
          {
            icon: MailIcon,
            label: "Email",
            value: "jerryrobayo1130@gmail.com",
          },
          {
            icon: MapPinIcon,
            label: "Based",
            value: "New York, NY",
          },
          {
            icon: UserRoundIcon,
            label: "Focus",
            value: "Full Stack Developer roles",
            className: "sm:col-span-2 xl:col-span-1",
          },
        ]}
      >
        <ContactForm />
      </ContactCard>
    </section>
  );
}

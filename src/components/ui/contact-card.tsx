import React from "react";
import { type LucideIcon, PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ContactInfoProps = React.ComponentProps<"div"> & {
  icon: LucideIcon;
  label: string;
  value: string;
};

type ContactCardProps = React.ComponentProps<"div"> & {
  title?: string;
  description?: string;
  contactInfo?: ContactInfoProps[];
  formSectionClassName?: string;
};

export function ContactCard({
  title = "Contact With Us",
  description = "If you have any questions regarding our services or need help, please fill out the form here.",
  contactInfo,
  className,
  formSectionClassName,
  children,
  ...props
}: ContactCardProps) {
  return (
    <div
      className={cn(
        "relative grid h-full w-full border border-secondary/25 bg-surface shadow md:grid-cols-2 lg:grid-cols-3",
        className,
      )}
      {...props}
    >
      <PlusIcon className="absolute -left-3 -top-3 size-6 text-accent" />
      <PlusIcon className="absolute -right-3 -top-3 size-6 text-accent" />
      <PlusIcon className="absolute -bottom-3 -left-3 size-6 text-accent" />
      <PlusIcon className="absolute -bottom-3 -right-3 size-6 text-accent" />

      <div className="flex flex-col justify-between lg:col-span-2">
        <div className="relative h-full space-y-5 px-5 py-8 md:p-8">
          <h1 className="font-display text-4xl font-semibold uppercase leading-none text-foreground md:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="max-w-xl text-base leading-8 text-secondary lg:text-lg">
            {description}
          </p>
          <div className="grid max-w-3xl gap-4 sm:grid-cols-2">
            {contactInfo?.map((info) => (
              <ContactInfo key={info.label} {...info} />
            ))}
          </div>
        </div>
      </div>

      <div
        className={cn(
          "flex h-full w-full items-center border-t border-secondary/25 bg-background/60 p-5 md:col-span-1 md:border-l md:border-t-0",
          formSectionClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}

function ContactInfo({
  icon: Icon,
  label,
  value,
  className,
  ...props
}: ContactInfoProps) {
  return (
    <div
      className={cn("flex min-w-0 items-center gap-3 py-3", className)}
      {...props}
    >
      <div className="shrink-0 border border-secondary/25 bg-background p-3">
        <Icon className="size-5 text-accent" />
      </div>
      <div className="min-w-0">
        <p className="font-display text-sm uppercase text-foreground">{label}</p>
        <p className="break-words text-xs text-secondary">{value}</p>
      </div>
    </div>
  );
}

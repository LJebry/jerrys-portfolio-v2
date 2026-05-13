"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const menuItems = [
  { label: "JR", href: "/" },
  { label: "About Me", href: "/about-me" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
  { label: "Fun", href: "/fun" },
];

export default function NavMenu() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="min-w-0" aria-label="Primary navigation">
      <div className="flex items-center justify-between sm:hidden">
        <Link
          href="/"
          aria-current={pathname === "/" ? "page" : undefined}
          className="font-display text-2xl font-semibold uppercase text-foreground"
        >
          J<span className="text-accent">R</span>
        </Link>

        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          className="inline-flex size-11 items-center justify-center border border-secondary/35 text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-controls="mobile-navigation"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <ul
        id="mobile-navigation"
        className={[
          "mt-4 grid gap-2 border-t border-secondary/25 pt-4 sm:hidden",
          isOpen ? "block" : "hidden",
        ].join(" ")}
      >
        {menuItems.slice(1).map((item) => {
          const isActive = pathname === item.href;

          return (
            <li key={item.label} className="list-none">
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                onClick={() => setIsOpen(false)}
                className={[
                  "block border border-secondary/25 px-4 py-3 font-display text-sm font-semibold uppercase tracking-[0.16em] transition-colors",
                  isActive
                    ? "border-foreground bg-foreground text-background"
                    : "text-foreground hover:border-accent hover:text-accent",
                ].join(" ")}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>

      <ul className="hidden items-center justify-between gap-3 sm:flex lg:gap-5">
        {menuItems.map((item) => {
          const isActive =
            item.href === "/" ? pathname === "/" : pathname === item.href;

          return (
            <li key={item.label} className="shrink-0 list-none">
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className="group relative inline-block"
              >
                <span
                  className={[
                    "relative z-10 block whitespace-nowrap px-2 py-2 font-display text-sm font-semibold uppercase transition-colors duration-300 sm:px-2 sm:text-base lg:px-3 lg:text-lg",
                    isActive
                      ? "text-background"
                      : "text-foreground group-hover:text-background",
                  ].join(" ")}
                >
                  {item.label === "JR" ? (
                    <>
                      J
                      <span
                        className={
                          isActive
                            ? "text-accent"
                            : "text-accent group-hover:text-background"
                        }
                      >
                        R
                      </span>
                    </>
                  ) : (
                    item.label
                  )}
                </span>
                <span
                  className={[
                    "absolute inset-0 origin-center border-y-2 border-foreground transition-all duration-300 group-hover:scale-y-100 group-hover:opacity-100",
                    isActive ? "scale-y-100 opacity-100" : "scale-y-[2] opacity-0",
                  ].join(" ")}
                />
                <span
                  className={[
                    "absolute left-0 top-[2px] h-full w-full origin-top bg-foreground transition-all duration-300 group-hover:scale-100 group-hover:opacity-100",
                    isActive ? "scale-100 opacity-100" : "scale-0 opacity-0",
                  ].join(" ")}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

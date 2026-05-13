"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

export function FeaturedSpotlight() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative flex cursor-pointer flex-col items-center gap-8 md:flex-row md:items-start md:gap-12 lg:gap-16"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative z-10 flex w-full max-w-[420px] shrink-0 flex-col items-center text-center md:w-[340px] md:items-start md:text-left lg:w-[420px] lg:pt-4">
        <div className="mb-6 flex items-center gap-3 md:mb-8 md:gap-4">
          <div
            className="h-px bg-foreground transition-all duration-700"
            style={{
              width: isHovered ? 48 : 32,
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
          <span
            className="text-[10px] font-medium uppercase text-foreground transition-all duration-700 md:text-xs"
            style={{
              letterSpacing: isHovered ? "0.3em" : "0.25em",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            01 / Portfolio
          </span>
        </div>

        <h2 className="relative font-display uppercase">
          <span
            className="block text-5xl font-semibold tracking-normal text-foreground transition-all duration-700 sm:text-6xl md:text-6xl lg:text-7xl"
            style={{
              transform: isHovered ? "translateY(-2px)" : "translateY(0)",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            Jerry
          </span>
          <span
            className="block text-5xl font-semibold tracking-normal text-accent transition-all duration-700 sm:text-6xl md:text-6xl lg:text-7xl"
            style={{
              transform: isHovered ? "translateX(12px)" : "translateX(0)",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            Robayo
          </span>
        </h2>

        <div
          className="mt-6 max-w-[390px] text-sm leading-relaxed transition-all duration-700 md:mt-8 md:max-w-[340px] md:text-base lg:mt-10 lg:max-w-[390px]"
          style={{
            color: isHovered ? "var(--secondary)" : "#9b968c99",
            transform: isHovered ? "translateY(-4px)" : "translateY(0)",
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <p>
            I&apos;m a{" "}
            <span className="group/marker relative inline-block font-semibold text-foreground">
              <span
                aria-hidden
                className="absolute inset-x-[-0.1em] inset-y-[0.08em] origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover/marker:scale-x-100"
              />
              <span className="relative z-10">Full stack developer</span>
            </span>{" "}
            focused on polished interfaces, solid APIs, and product-ready web
            apps.
          </p>
        </div>

        <Link
          href="/contact"
          className="mt-6 flex items-center gap-4 md:mt-8 lg:mt-10"
        >
          <div
            className="flex size-10 items-center justify-center rounded-full border transition-all duration-500 md:size-11 lg:size-12"
            style={{
              borderColor: isHovered ? "var(--foreground)" : "#9b968c4d",
              backgroundColor: isHovered ? "var(--foreground)" : "transparent",
              color: isHovered ? "var(--background)" : "var(--foreground)",
              transform: isHovered ? "scale(1.05)" : "scale(1)",
              boxShadow: isHovered
                ? "0 8px 32px rgb(232 228 219 / 0.15)"
                : "0 0 0 transparent",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <ArrowUpRight
              className="size-3.5 transition-transform duration-500 md:size-4"
              style={{
                transform: isHovered ? "rotate(45deg)" : "rotate(0deg)",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            />
          </div>
          <span
            className="text-[10px] font-medium uppercase tracking-widest transition-all duration-700 md:text-xs"
            style={{
              opacity: isHovered ? 1 : 0.5,
              transform: isHovered ? "translateX(0)" : "translateX(-8px)",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              transitionDelay: isHovered ? "100ms" : "0ms",
            }}
          >
            Get in touch
          </span>
        </Link>
      </div>

      <div
        className="relative transition-all duration-700"
        style={{
          transform: isHovered
            ? "translateX(4px) translateY(-4px)"
            : "translateX(0) translateY(0)",
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div
          className="absolute -inset-3 border transition-all duration-700 md:-inset-4"
          style={{
            borderColor: isHovered ? "rgb(232 228 219 / 0.15)" : "transparent",
            transform: isHovered ? "scale(1.01)" : "scale(1)",
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />

        <div className="relative h-[280px] w-[260px] overflow-hidden sm:h-[320px] sm:w-[300px] md:h-[360px] md:w-[320px] lg:h-[420px] lg:w-[380px]">
          <div
            className="absolute -inset-1 transition-all duration-700"
            style={{
              boxShadow: isHovered
                ? "0 24px 64px rgb(232 228 219 / 0.1)"
                : "0 0 0 transparent",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
          <Image
            src="/jerry-robayo-portrait-1821.jpeg"
            alt="Portrait of Jerry Robayo"
            fill
            priority
            sizes="(min-width: 1024px) 380px, (min-width: 768px) 320px, 260px"
            className="object-cover transition-all duration-1000"
            style={{
              transform: isHovered ? "scale(1.03)" : "scale(1)",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />

          <div
            className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent transition-opacity duration-700"
            style={{
              opacity: isHovered ? 1 : 0,
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />

          <div
            className="absolute left-2 top-2 h-5 w-px bg-white/80 transition-all duration-500 md:left-3 md:top-3 md:h-6"
            style={{
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? "scaleY(1)" : "scaleY(0)",
              transformOrigin: "top",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              transitionDelay: "50ms",
            }}
          />
          <div
            className="absolute left-2 top-2 h-px w-5 bg-white/80 transition-all duration-500 md:left-3 md:top-3 md:w-6"
            style={{
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: "left",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              transitionDelay: "100ms",
            }}
          />
          <div
            className="absolute bottom-2 right-2 h-5 w-px bg-white/80 transition-all duration-500 md:bottom-3 md:right-3 md:h-6"
            style={{
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? "scaleY(1)" : "scaleY(0)",
              transformOrigin: "bottom",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              transitionDelay: "150ms",
            }}
          />
          <div
            className="absolute bottom-2 right-2 h-px w-5 bg-white/80 transition-all duration-500 md:bottom-3 md:right-3 md:w-6"
            style={{
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: "right",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              transitionDelay: "200ms",
            }}
          />
        </div>

        <span
          className="absolute -bottom-6 right-0 font-mono text-xs text-secondary transition-all duration-700 md:-bottom-8 md:text-sm"
          style={{
            opacity: isHovered ? 1 : 0.4,
            transform: isHovered ? "translateY(12px)" : "translateY(0)",
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          01
        </span>
      </div>
    </div>
  );
}

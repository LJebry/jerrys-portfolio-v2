"use client";

import { useEffect, useState } from "react";

import SqueezeLoader from "@/components/ui/loading-indicator";

const STORAGE_KEY = "jr-portfolio-loader-seen";
const LOADER_DURATION_MS = 3000;

export function InitialLoader({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (window.localStorage.getItem(STORAGE_KEY) === "true") {
      const timeout = window.setTimeout(() => setIsLoading(false), 0);
      return () => window.clearTimeout(timeout);
    }

    const timeout = window.setTimeout(() => {
      window.localStorage.setItem(STORAGE_KEY, "true");
      setIsLoading(false);
    }, LOADER_DURATION_MS);

    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <>
      {children}
      {isLoading && (
        <div className="fixed inset-0 z-[100] bg-background text-foreground">
          <SqueezeLoader size={72} color1="#e8e4db" color2="#c42e2e" />
        </div>
      )}
    </>
  );
}

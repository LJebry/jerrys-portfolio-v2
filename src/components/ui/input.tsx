import * as React from "react";

import { cn } from "@/lib/utils";

export type InputProps = React.ComponentPropsWithRef<"input">;

function Input({ className, type, ref, ...props }: InputProps) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full border border-secondary/25 bg-background px-3 py-2 text-sm text-foreground placeholder:text-secondary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
}
Input.displayName = "Input";

export { Input };

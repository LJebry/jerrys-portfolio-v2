"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";
import type { ComponentType } from "react";
import { motion } from "framer-motion";
import {
  Toaster as SonnerToaster,
  toast as sonnerToast,
} from "sonner";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Variant = "default" | "success" | "error" | "warning";
type Position =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

interface ActionButton {
  label: string;
  onClick: () => void;
  variant?: "default" | "outline" | "ghost";
}

interface ToasterProps {
  title?: string;
  message: string;
  variant?: Variant;
  duration?: number;
  position?: Position;
  actions?: ActionButton;
  onDismiss?: () => void;
  highlightTitle?: boolean;
}

export interface ToasterRef {
  show: (props: ToasterProps) => void;
}

const variantStyles: Record<Variant, string> = {
  default: "border-secondary/25 bg-surface text-foreground",
  success: "border-green-600/50 bg-surface text-foreground",
  error: "border-destructive/50 bg-surface text-foreground",
  warning: "border-amber-600/50 bg-surface text-foreground",
};

const titleColor: Record<Variant, string> = {
  default: "text-foreground",
  success: "text-green-500",
  error: "text-destructive",
  warning: "text-amber-500",
};

const iconColor: Record<Variant, string> = {
  default: "text-secondary",
  success: "text-green-500",
  error: "text-destructive",
  warning: "text-amber-500",
};

const variantIcons: Record<Variant, ComponentType<{ className?: string }>> = {
  default: Info,
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
};

const toastAnimation = {
  initial: { opacity: 0, y: 50, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 50, scale: 0.95 },
};

const Toaster = forwardRef<ToasterRef, { defaultPosition?: Position }>(
  ({ defaultPosition = "bottom-right" }, ref) => {
    const toastReference = useRef<ReturnType<
      typeof sonnerToast.custom
    > | null>(null);

    useImperativeHandle(ref, () => ({
      show({
        title,
        message,
        variant = "default",
        duration = 4000,
        position = defaultPosition,
        actions,
        onDismiss,
        highlightTitle,
      }) {
        const Icon = variantIcons[variant];

        toastReference.current = sonnerToast.custom(
          (toastId) => (
            <motion.div
              variants={toastAnimation}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={cn(
                "flex w-full max-w-xs items-center justify-between rounded-xl border p-3 shadow-md",
                variantStyles[variant],
              )}
            >
              <div className="flex items-start gap-2">
                <Icon
                  className={cn(
                    "mt-0.5 h-4 w-4 flex-shrink-0",
                    iconColor[variant],
                  )}
                />
                <div className="space-y-0.5">
                  {title && (
                    <h3
                      className={cn(
                        "text-xs font-medium leading-none",
                        titleColor[variant],
                        highlightTitle && titleColor.success,
                      )}
                    >
                      {title}
                    </h3>
                  )}
                  <p className="text-xs text-secondary">{message}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {actions?.label && (
                  <Button
                    variant={actions.variant || "outline"}
                    size="sm"
                    onClick={() => {
                      actions.onClick();
                      sonnerToast.dismiss(toastId);
                    }}
                    className={cn(
                      "cursor-pointer",
                      variant === "success" &&
                        "border-green-600 text-green-500 hover:bg-green-600/10",
                      variant === "error" &&
                        "border-destructive text-destructive hover:bg-destructive/10",
                      variant === "warning" &&
                        "border-amber-600 text-amber-500 hover:bg-amber-600/10",
                    )}
                  >
                    {actions.label}
                  </Button>
                )}

                <button
                  onClick={() => {
                    sonnerToast.dismiss(toastId);
                    onDismiss?.();
                  }}
                  className="rounded-full p-1 transition-colors hover:bg-secondary/10 focus:outline-none focus:ring-2 focus:ring-accent"
                  aria-label="Dismiss notification"
                >
                  <X className="h-3 w-3 text-secondary" />
                </button>
              </div>
            </motion.div>
          ),
          { duration, position },
        );
      },
    }));

    return (
      <SonnerToaster
        position={defaultPosition}
        toastOptions={{ unstyled: true, className: "flex justify-end" }}
      />
    );
  },
);

Toaster.displayName = "Toaster";

export default Toaster;

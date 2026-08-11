import { Link } from "@tanstack/react-router";
import type { ComponentProps, ReactNode } from "react";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 px-6 py-3 text-sm font-medium tracking-wide transition-all duration-300";

export const buttonStyles = {
  primary: `${base} bg-primary text-primary-foreground hover:bg-secondary hover:shadow-soft`,
  outline: `${base} border border-primary/30 text-primary hover:border-primary hover:bg-mist`,
  light: `${base} bg-white text-primary hover:bg-mist`,
  ghostLight: `${base} border border-white/40 text-white hover:bg-white/10`,
} as const;

type Variant = keyof typeof buttonStyles;

export function LinkButton({
  variant = "primary",
  className = "",
  children,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant; children: ReactNode }) {
  return (
    <Link className={`${buttonStyles[variant]} ${className}`} {...props}>
      {children}
    </Link>
  );
}

export function AnchorButton({
  variant = "primary",
  className = "",
  children,
  ...props
}: ComponentProps<"a"> & { variant?: Variant; children: ReactNode }) {
  return (
    <a className={`${buttonStyles[variant]} ${className}`} {...props}>
      {children}
    </a>
  );
}

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "gold" | "outline" | "ghost" | "wa";
type Size = "sm" | "md" | "lg";

const baseStyles =
  "inline-flex items-center justify-center gap-2 font-semibold transition-[transform,background-color,color,box-shadow] duration-300 ease-[var(--ease-out-soft)] will-change-transform leading-none rounded-[10px]";

const variants: Record<Variant, string> = {
  gold: "bg-[var(--color-gold)] text-[var(--color-ink)] hover:bg-[var(--color-gold-2)] hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(0,0,0,.5),0_0_32px_color-mix(in_oklch,var(--color-gold)_30%,transparent)]",
  outline:
    "border border-[color-mix(in_oklch,var(--color-cream)_35%,transparent)] text-[var(--color-cream)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] hover:-translate-y-px",
  ghost: "text-[var(--color-cream)] hover:text-[var(--color-gold)]",
  wa: "bg-[var(--color-green)] text-white hover:bg-[var(--color-green-2)] hover:-translate-y-px hover:shadow-lg",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2.5 text-xs tracking-wide",
  md: "px-6 py-3.5 text-sm tracking-wide",
  lg: "px-8 py-4 text-base tracking-wide",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = CommonProps & {
  href: string;
  external?: boolean;
};

type ButtonAsButton = CommonProps & ComponentPropsWithoutRef<"button"> & { href?: undefined };

type ButtonProps = ButtonAsLink | ButtonAsButton;

export function Button(props: ButtonProps) {
  const variant: Variant = props.variant ?? "gold";
  const size: Size = props.size ?? "md";
  const className = cn(baseStyles, variants[variant], sizes[size], props.className);

  if ("href" in props && props.href !== undefined) {
    const { href, external, children } = props;
    if (external || href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:")) {
      return (
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className={className}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children, ...rest } = props as ButtonAsButton;
  return (
    <button {...rest} className={className}>
      {children}
    </button>
  );
}

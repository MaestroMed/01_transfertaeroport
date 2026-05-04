import Link from "next/link";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2 group ${className ?? ""}`} aria-label="01 Transfert Aéroport">
      <span className="font-display text-xl tracking-wider text-[var(--color-gold)] font-bold">01</span>
      <span className="font-display text-base tracking-[0.04em] text-[var(--color-cream)]">TRANSFERT</span>
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="text-[var(--color-gold)] ml-0.5 transition-transform duration-500 ease-[var(--ease-out)] group-hover:translate-x-1 group-hover:-rotate-12"
        aria-hidden
      >
        <path d="M2.5 19l19-7-19-7v5l13 2-13 2z" />
      </svg>
    </Link>
  );
}

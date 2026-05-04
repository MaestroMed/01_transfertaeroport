import { Container } from "@/components/ui/Container";

const items = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    label: "Prix fixe annoncé avant trajet",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <rect x="3" y="6" width="18" height="13" rx="2" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    label: "Paiement CB sécurisé Stripe",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    label: "Assurance tous risques pro",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    label: "Suivi de vol en temps réel",
  },
];

export function TrustStrip() {
  return (
    <section className="border-y border-[var(--color-line-2)] bg-[color-mix(in_oklch,var(--color-ink)_85%,transparent)] py-6">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8">
          {items.map((item) => (
            <div key={item.label} className="flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--color-cream-2)]">
              <span className="text-[var(--color-gold)] flex-shrink-0">{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

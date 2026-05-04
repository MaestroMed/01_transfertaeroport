import { Container } from "@/components/ui/Container";

const features = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Prix fixe annoncé",
    desc: "Pas de compteur, pas de surge pricing, pas de supplément bagage. Le prix est fixé à la réservation. Point.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "Ponctualité garantie",
    desc: "Suivi de vol en temps réel. 30 minutes d'attente gratuite après l'atterrissage. Panneau nominatif à l'arrivée.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    title: "Confort 7 places",
    desc: "Toyota Highlander récente, climatisée, Wifi à bord, eau fraîche offerte. Sièges bébé gratuits sur demande.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: "WhatsApp dédié",
    desc: "Confirmation instantanée. Photo du chauffeur et plaque envoyées avant le pickup. Contact direct à tout moment.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 0 0 1 1h3m10-11l2 2m-2-2v10a1 1 0 0 1-1 1h-3m-4 0h4" />
      </svg>
    ),
    title: "Porte-à-porte",
    desc: "Prise en charge à votre adresse, dépose au terminal exact. Aucun arrêt intermédiaire. Trajet direct, rien que pour vous.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
        <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
      </svg>
    ),
    title: "Conducteur pro",
    desc: "12 ans d'expérience, anglais & arabe parlés. Aide aux bagages, accueil personnalisé. Disponible 24h/24, 7j/7.",
  },
];

export function Vehicle() {
  return (
    <section id="vehicule" className="py-20 md:py-28 reveal border-t border-[var(--color-line-2)]">
      <Container>
        <div className="mb-14">
          <span className="inline-block text-[11px] font-semibold tracking-[0.25em] uppercase text-[var(--color-gold)] mb-4">
            Le véhicule
          </span>
          <h2 className="text-h2 font-display uppercase max-w-[18ch] mb-4">Toyota Highlander. 7 places.</h2>
          <p className="font-serif italic text-lead text-[var(--color-cream-2)] max-w-[56ch]">
            Récent, climatisé, espace généreux. Pensé pour les familles, les groupes, et tous vos bagages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="p-8 bg-[color-mix(in_oklch,var(--color-ink-2)_80%,transparent)] border border-[var(--color-line-2)] rounded-2xl transition-all duration-500 ease-[var(--ease-out)] hover:-translate-y-0.5 hover:border-[var(--color-gold)] hover:bg-[color-mix(in_oklch,var(--color-gold)_4%,var(--color-ink-2))]"
            >
              <div className="w-11 h-11 inline-flex items-center justify-center rounded-md bg-[color-mix(in_oklch,var(--color-gold)_12%,transparent)] text-[var(--color-gold)] mb-4">
                {f.icon}
              </div>
              <h3 className="text-base font-semibold text-[var(--color-cream)] mb-1.5 normal-case tracking-normal" style={{ fontFamily: "var(--font-sans)" }}>
                {f.title}
              </h3>
              <p className="text-sm text-[var(--color-mute)] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

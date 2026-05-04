import { Container } from "@/components/ui/Container";

const prices = [
  { route: "Val d'Oise ↔ CDG", price: 60, meta: "95xxx · ~25 min" },
  { route: "Paris Nord ↔ CDG", price: 70, meta: "75 N · 92 N · 93 · ~35 min" },
  { route: "Paris Sud ↔ CDG", price: 80, meta: "75 S · 92 S · 94 · 91 · ~45 min" },
  { route: "Val d'Oise ↔ Beauvais", price: 90, meta: "95xxx · ~60 min" },
  { route: "Paris Nord ↔ Beauvais", price: 100, meta: "75 N · 92 N · 93 · ~75 min" },
  { route: "Paris Sud ↔ Beauvais", price: 110, meta: "75 S · 92 S · 94 · 91 · ~90 min" },
];

export function Pricing() {
  return (
    <section id="tarifs" className="py-20 md:py-28 reveal">
      <Container>
        <div className="mb-14">
          <span className="inline-block text-[11px] font-semibold tracking-[0.25em] uppercase text-[var(--color-gold)] mb-4">
            Tarifs
          </span>
          <h2 className="text-h2 font-display uppercase max-w-[18ch] mb-4">Prix annoncés. Aucune surprise.</h2>
          <p className="font-serif italic text-lead text-[var(--color-cream-2)] max-w-[56ch]">
            Tarif par véhicule, jusqu&apos;à 7 passagers et bagages inclus. Même prix de jour comme de nuit, jours fériés inclus.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {prices.map((p) => (
            <div
              key={p.route}
              className="group relative p-8 bg-[color-mix(in_oklch,var(--color-ink-2)_90%,transparent)] border border-[var(--color-line-2)] rounded-2xl transition-all duration-500 ease-[var(--ease-out)] hover:-translate-y-1 hover:border-[var(--color-gold)] hover:bg-[color-mix(in_oklch,var(--color-gold)_4%,var(--color-ink-2))]"
            >
              <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[var(--color-cream-2)] mb-3">
                {p.route}
              </div>
              <div className="font-display text-5xl lg:text-6xl text-[var(--color-gold)] leading-none mb-3">
                {p.price}
                <span className="font-sans text-sm text-[var(--color-mute)] ml-1 align-top">€</span>
              </div>
              <div className="text-[11px] text-[var(--color-mute)]">{p.meta}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-5 bg-[color-mix(in_oklch,var(--color-gold)_8%,var(--color-ink-2))] border-l-2 border-[var(--color-gold)] rounded-md text-[var(--color-cream-2)] text-sm">
          <strong className="text-[var(--color-gold)]">Calcul malin</strong> — pour un groupe de 7 passagers, Val d&apos;Oise ↔ CDG revient à <strong className="text-[var(--color-cream)]">8,57 €/personne</strong>. Moins cher que le RER B (14 €/pers), dans un véhicule privé porte-à-porte.
        </div>
      </Container>
    </section>
  );
}

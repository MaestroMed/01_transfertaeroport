import { Container } from "@/components/ui/Container";

const steps = [
  { num: "1", title: "Réservez en ligne", desc: "Choisissez aéroport, date, heure. Prix affiché immédiatement." },
  { num: "2", title: "Confirmation WhatsApp", desc: "Nom du chauffeur, plaque d'immatriculation, photo." },
  { num: "3", title: "On vient vous chercher", desc: "Panneau nominatif à l'arrivée. Installez-vous, on s'occupe du reste." },
];

export function HowItWorks() {
  return (
    <section className="py-20 md:py-28 reveal border-t border-[var(--color-line-2)]">
      <Container>
        <div className="mb-12">
          <span className="inline-block text-[11px] font-semibold tracking-[0.25em] uppercase text-[var(--color-gold)] mb-4">
            3 étapes
          </span>
          <h2 className="text-h2 font-display uppercase">Simple. Rapide.</h2>
        </div>

        <div className="grid md:grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-4">
          {steps.map((s, i) => (
            <div key={s.num} className="contents">
              <div className="p-8 border border-[var(--color-line-2)] rounded-2xl text-center bg-[color-mix(in_oklch,var(--color-ink-2)_80%,transparent)]">
                <div className="font-display text-4xl text-[var(--color-gold)] leading-none mb-4">{s.num}</div>
                <h3 className="text-base font-semibold text-[var(--color-cream)] mb-1.5 normal-case tracking-normal" style={{ fontFamily: "var(--font-sans)" }}>
                  {s.title}
                </h3>
                <p className="text-sm text-[var(--color-mute)]">{s.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden md:flex justify-center text-[var(--color-gold)] opacity-50">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

import { Container } from "@/components/ui/Container";

const rows = [
  { route: "Val d'Oise ↔ CDG", price: "60 €", taxi: "56-65 €", uber: "40-55 €" },
  { route: "Paris Nord ↔ CDG", price: "70 €", taxi: "56-65 €", uber: "40-75 €" },
  { route: "Paris Sud ↔ CDG", price: "80 €", taxi: "56-65 €", uber: "50-85 €" },
  { route: "Val d'Oise ↔ Beauvais", price: "90 €", taxi: "185-230 €", uber: "100-190 €" },
  { route: "Paris Nord ↔ Beauvais", price: "100 €", taxi: "185-230 €", uber: "100-190 €" },
  { route: "Paris Sud ↔ Beauvais", price: "110 €", taxi: "200-250 €", uber: "120-210 €" },
];

export function Comparison() {
  return (
    <section className="py-20 md:py-28 reveal border-t border-[var(--color-line-2)]">
      <Container>
        <div className="mb-14">
          <span className="inline-block text-[11px] font-semibold tracking-[0.25em] uppercase text-[var(--color-gold)] mb-4">
            Comparatif
          </span>
          <h2 className="text-h2 font-display uppercase max-w-[18ch] mb-4">Pourquoi un van privé.</h2>
          <p className="font-serif italic text-lead text-[var(--color-cream-2)] max-w-[56ch]">
            Le van 7 places au prix d&apos;un taxi. Aucune négociation. Aucun supplément.
          </p>
        </div>

        <div className="overflow-x-auto border border-[var(--color-line-2)] rounded-2xl">
          <table className="w-full min-w-[600px] border-collapse">
            <thead>
              <tr>
                <th className="text-left p-5 text-xs font-display tracking-wider uppercase text-[var(--color-gold)] bg-[color-mix(in_oklch,var(--color-gold)_8%,var(--color-ink))] border-b border-[var(--color-line-2)]">
                  Trajet
                </th>
                <th className="text-left p-5 text-xs font-display tracking-wider uppercase text-[var(--color-gold)] bg-[color-mix(in_oklch,var(--color-gold)_8%,var(--color-ink))] border-b border-[var(--color-line-2)]">
                  01 Transfert
                  <span className="block font-sans text-[10px] text-[var(--color-mute)] font-normal mt-0.5 normal-case tracking-normal">7 places</span>
                </th>
                <th className="text-left p-5 text-xs font-display tracking-wider uppercase text-[var(--color-gold)] bg-[color-mix(in_oklch,var(--color-gold)_8%,var(--color-ink))] border-b border-[var(--color-line-2)]">
                  Taxi
                  <span className="block font-sans text-[10px] text-[var(--color-mute)] font-normal mt-0.5 normal-case tracking-normal">4 places</span>
                </th>
                <th className="text-left p-5 text-xs font-display tracking-wider uppercase text-[var(--color-gold)] bg-[color-mix(in_oklch,var(--color-gold)_8%,var(--color-ink))] border-b border-[var(--color-line-2)]">
                  Uber
                  <span className="block font-sans text-[10px] text-[var(--color-mute)] font-normal mt-0.5 normal-case tracking-normal">4 places</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.route} className="border-b border-[var(--color-line-2)] last:border-0 transition-colors hover:bg-[color-mix(in_oklch,var(--color-gold)_4%,transparent)]">
                  <td className="p-5 text-sm text-[var(--color-cream-2)] font-semibold">{r.route}</td>
                  <td className="p-5 text-base text-[var(--color-gold)] font-bold">{r.price}</td>
                  <td className="p-5 text-sm text-[var(--color-cream-2)]">{r.taxi}</td>
                  <td className="p-5 text-sm text-[var(--color-cream-2)]">{r.uber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
}

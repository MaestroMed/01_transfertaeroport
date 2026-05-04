import { Container } from "@/components/ui/Container";

const faqs = [
  {
    q: "Combien coûte un transfert CDG → Paris ?",
    a: "Entre 60 € et 80 € tout compris, selon votre zone : 60 € depuis le Val d'Oise, 70 € Paris Nord, 80 € Paris Sud. Prix fixe garanti, jusqu'à 7 passagers et tous les bagages inclus. Comparable au taxi forfait officiel mais pour un van privé au lieu d'une berline 4 places.",
  },
  {
    q: "Comment aller de Beauvais à Paris en van privé ?",
    a: "Réservez en ligne ou par WhatsApp. Votre chauffeur vous attend avec un panneau nominatif. Trajet direct ~75 minutes. 90 € depuis le Val d'Oise, 100 € Paris Nord, 110 € Paris Sud — pour le véhicule, jusqu'à 7 passagers, bagages inclus, 30 min d'attente gratuite.",
  },
  {
    q: "Combien de passagers et bagages puis-je emmener ?",
    a: "Notre Toyota Highlander accueille jusqu'à 7 passagers avec tous leurs bagages. Le prix est par véhicule, pas par passager : que vous soyez 1 ou 7, c'est le même tarif. Sièges bébé disponibles gratuitement sur demande.",
  },
  {
    q: "Que se passe-t-il si mon vol est en retard ?",
    a: "Votre chauffeur suit votre vol en temps réel et adapte automatiquement l'heure de prise en charge. 30 minutes d'attente gratuite sont incluses après l'atterrissage. Aucun supplément en cas de retard de vol.",
  },
  {
    q: "Puis-je annuler ma réservation ?",
    a: "Oui, annulation gratuite jusqu'à 24h avant la prise en charge. Remboursement intégral. Au-delà : montant dû en totalité.",
  },
  {
    q: "Quels modes de paiement acceptez-vous ?",
    a: "Carte bancaire en ligne (paiement sécurisé chiffré) ou espèces à bord. Pour les espèces, le montant exact est demandé.",
  },
  {
    q: "Le prix change-t-il la nuit ou les jours fériés ?",
    a: "Non. Même prix 24h/24, 7j/7, jours fériés inclus. Contrairement aux taxis (+40 % la nuit) et à Uber (surge pricing), notre tarif est fixe et garanti.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-20 md:py-28 reveal border-t border-[var(--color-line-2)]">
      <Container>
        <div className="mb-12">
          <span className="inline-block text-[11px] font-semibold tracking-[0.25em] uppercase text-[var(--color-gold)] mb-4">
            Questions fréquentes
          </span>
          <h2 className="text-h2 font-display uppercase">Tout savoir.</h2>
        </div>

        <div className="grid gap-3 max-w-3xl">
          {faqs.map((item, i) => (
            <details
              key={item.q}
              className="group border border-[var(--color-line-2)] rounded-md overflow-hidden bg-[color-mix(in_oklch,var(--color-ink-2)_70%,transparent)] transition-colors open:border-[var(--color-gold)]"
              {...(i === 0 ? { open: true } : {})}
            >
              <summary className="px-6 py-4 font-medium text-[var(--color-cream)] cursor-pointer flex items-center justify-between gap-4 transition-colors hover:text-[var(--color-gold)] [&::-webkit-details-marker]:hidden list-none">
                {item.q}
                <span className="font-display text-2xl text-[var(--color-gold)] transition-transform duration-300 group-open:rotate-45 flex-shrink-0">
                  +
                </span>
              </summary>
              <p className="px-6 pb-5 text-sm text-[var(--color-mute)] leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </Container>

      {/* JSON-LD FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
    </section>
  );
}

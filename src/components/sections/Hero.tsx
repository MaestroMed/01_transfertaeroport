import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PHONE_TEL } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative min-h-[88vh] lg:min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/img/highlander-paris.png"
        alt="Toyota Highlander 01 Transfert Aéroport devant la Tour Eiffel illuminée la nuit, Avenue de New York"
        fill
        priority
        sizes="100vw"
        quality={90}
        className="object-cover object-[60%_center] lg:object-center"
      />

      {/* Cinematic gradients for legibility */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(90deg,color-mix(in_oklch,var(--color-ink)_85%,transparent)_0%,color-mix(in_oklch,var(--color-ink)_60%,transparent)_45%,transparent_75%)] pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_oklch,var(--color-ink)_50%,transparent)_0%,transparent_30%,transparent_70%,color-mix(in_oklch,var(--color-ink)_70%,transparent)_100%)] pointer-events-none"
      />

      {/* Content overlay */}
      <Container className="relative z-10 py-16 lg:py-24">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2.5 mb-6 lg:mb-8 text-[11px] tracking-[0.2em] uppercase text-[var(--color-gold)] font-semibold">
            <span aria-hidden className="h-px w-6 bg-[var(--color-gold)] opacity-60" />
            <span>Transfert VIP · Île-de-France · 7j/7</span>
          </div>

          <h1 className="text-hero font-display uppercase text-[var(--color-cream)] mb-6 lg:mb-8 [text-shadow:0_2px_24px_rgba(0,0,0,.5)]">
            Vers l&apos;Aéroport.<br />
            Dans les meilleurs<br />
            <span className="text-[var(--color-gold)]">
              délais<span className="text-[var(--color-gold)]">.</span>
            </span>
          </h1>

          <p className="font-serif italic text-lead font-normal leading-snug text-[var(--color-cream-2)] mb-8 lg:mb-10 max-w-[560px] [text-shadow:0_1px_12px_rgba(0,0,0,.6)]">
            Toyota Highlander 7 places<span className="text-[var(--color-gold)] mx-1.5">·</span>
            Wifi<span className="text-[var(--color-gold)] mx-1.5">·</span>
            Eau fraîche<span className="text-[var(--color-gold)] mx-1.5">·</span>
            Suivi de vol<span className="text-[var(--color-gold)] mx-1.5">·</span>
            <em>Prix fixe annoncé. Point.</em>
          </p>

          <div className="flex flex-wrap gap-3 mb-8 lg:mb-10">
            <Button href="#tarifs" variant="gold" size="lg">
              Voir les tarifs
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Button>
            <Button href={PHONE_TEL} variant="outline" size="lg">
              Appeler maintenant
            </Button>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] uppercase tracking-[0.12em] text-[var(--color-cream-2)] font-semibold [text-shadow:0_1px_8px_rgba(0,0,0,.7)]">
            {["CDG", "Beauvais", "Disney", "Porte à porte", "Carte bancaire"].map((label, i, arr) => (
              <span key={label} className="inline-flex items-center">
                {label}
                {i < arr.length - 1 && <span aria-hidden className="text-[var(--color-gold)] ml-4 opacity-80">·</span>}
              </span>
            ))}
          </div>
        </div>
      </Container>

      {/* Live availability badge — top right */}
      <div className="absolute top-6 right-6 lg:top-10 lg:right-10 inline-flex items-center gap-2.5 px-4 py-2.5 glass border border-[var(--color-line)] rounded-full text-[11px] font-semibold tracking-[0.15em] uppercase text-[var(--color-cream)] z-10">
        <span className="live-dot" aria-hidden />
        <span>Disponible maintenant</span>
      </div>

      {/* Driver caption — bottom right */}
      <p className="hidden lg:block absolute bottom-10 right-10 max-w-[300px] font-serif italic text-sm leading-snug text-[var(--color-cream-2)] text-right z-10 [text-shadow:0_2px_12px_rgba(0,0,0,.9)]">
        Conducteur professionnel<span className="text-[var(--color-gold)] mx-1">·</span>
        12 ans d&apos;expérience<span className="text-[var(--color-gold)] mx-1">·</span>
        Anglais &amp; arabe parlés
      </p>
    </section>
  );
}

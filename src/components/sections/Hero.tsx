import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PHONE_TEL } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative py-12 md:py-20 overflow-hidden">
      <Container>
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-20 items-center min-h-[76vh]">
          {/* Content */}
          <div className="relative z-10 max-w-[640px]">
            <div className="inline-flex items-center gap-2.5 mb-6 text-[11px] tracking-[0.2em] uppercase text-[var(--color-gold)] font-semibold">
              <span aria-hidden className="h-px w-6 bg-[var(--color-gold)] opacity-60" />
              <span>Transfert privé · Île-de-France · 7j/7</span>
              <span aria-hidden className="h-px w-6 bg-[var(--color-gold)] opacity-60" />
            </div>

            <h1 className="text-hero font-display uppercase text-[var(--color-cream)] mb-6 lg:mb-8">
              Paris à CDG.<br />
              En 35 minutes.<br />
              <span className="text-[var(--color-gold)]">
                Sans stress<span className="text-[var(--color-gold)]">.</span>
              </span>
            </h1>

            <p className="font-serif italic text-lead font-normal leading-snug text-[var(--color-cream-2)] mb-8 lg:mb-10 max-w-[560px]">
              Toyota Highlander 7 places<span className="text-[var(--color-gold)] mx-1.5">·</span>
              Wifi<span className="text-[var(--color-gold)] mx-1.5">·</span>
              Eau fraîche<span className="text-[var(--color-gold)] mx-1.5">·</span>
              Suivi de vol<span className="text-[var(--color-gold)] mx-1.5">·</span>
              <em>Prix fixe annoncé. Point.</em>
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
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

            <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] uppercase tracking-[0.12em] text-[var(--color-mute)] font-semibold">
              {["CDG", "Beauvais", "Disney", "Porte à porte", "Carte bancaire"].map((label, i, arr) => (
                <span key={label} className="inline-flex items-center">
                  {label}
                  {i < arr.length - 1 && <span aria-hidden className="text-[var(--color-gold)] ml-4 opacity-80">·</span>}
                </span>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="relative aspect-[4/5] rounded-[20px] overflow-hidden border border-[var(--color-line)] shadow-[0_24px_60px_rgba(0,0,0,.6)]">
            <Image
              src="/img/paris-hero.jpg"
              alt="Pont Alexandre III à Paris au crépuscule, lampadaires dorés illuminés — atmosphère premium"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover scale-[1.05] hover:scale-100 transition-transform duration-[1200ms] ease-[var(--ease-out)]"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[color-mix(in_oklch,var(--color-ink)_70%,transparent)] pointer-events-none"
            />

            {/* Live availability badge */}
            <div className="absolute top-6 right-6 inline-flex items-center gap-2.5 px-4 py-2.5 glass border border-[var(--color-line)] rounded-full text-[11px] font-semibold tracking-[0.15em] uppercase text-[var(--color-cream)] z-10">
              <span className="live-dot" aria-hidden />
              <span>Disponible maintenant</span>
            </div>

            {/* Driver caption */}
            <p className="hidden md:block absolute bottom-6 right-6 left-6 lg:left-auto font-serif italic text-sm leading-snug text-[var(--color-cream-2)] text-right max-w-[280px] ml-auto z-10 [text-shadow:0_2px_12px_rgba(0,0,0,.8)]">
              Conducteur professionnel<span className="text-[var(--color-gold)] mx-1">·</span>
              12 ans d&apos;expérience<span className="text-[var(--color-gold)] mx-1">·</span>
              Anglais &amp; arabe parlés
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

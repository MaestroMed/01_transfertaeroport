import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { PHONE_DISPLAY, PHONE_TEL, WHATSAPP_NUMBER } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="bg-[color-mix(in_oklch,var(--color-ink)_95%,var(--color-gold))] border-t border-[var(--color-line-2)] py-16">
      <Container>
        <div className="grid md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 mb-12">
          <div>
            <Logo />
            <p className="text-sm text-[var(--color-mute)] mt-4">
              Le spécialiste du transfert aéroport en van privé 7 places, pour les familles &amp; groupes en Île-de-France.
            </p>
          </div>
          <div>
            <h4 className="font-display text-sm tracking-[0.15em] text-[var(--color-gold)] mb-4">Tarifs</h4>
            <FooterLink href="#tarifs">Val d&apos;Oise ↔ CDG · 60 €</FooterLink>
            <FooterLink href="#tarifs">Paris Nord ↔ CDG · 70 €</FooterLink>
            <FooterLink href="#tarifs">Paris Sud ↔ CDG · 80 €</FooterLink>
            <FooterLink href="#tarifs">Val d&apos;Oise ↔ Beauvais · 90 €</FooterLink>
            <FooterLink href="#tarifs">Paris Nord ↔ Beauvais · 100 €</FooterLink>
            <FooterLink href="#tarifs">Paris Sud ↔ Beauvais · 110 €</FooterLink>
          </div>
          <div>
            <h4 className="font-display text-sm tracking-[0.15em] text-[var(--color-gold)] mb-4">Liens</h4>
            <FooterLink href="#booking">Réserver</FooterLink>
            <FooterLink href="#tarifs">Tarifs</FooterLink>
            <FooterLink href="#vehicule">Véhicule</FooterLink>
            <FooterLink href="#faq">FAQ</FooterLink>
          </div>
          <div>
            <h4 className="font-display text-sm tracking-[0.15em] text-[var(--color-gold)] mb-4">Contact</h4>
            <FooterLink href={PHONE_TEL}>{PHONE_DISPLAY}</FooterLink>
            <FooterLink href={`https://wa.me/${WHATSAPP_NUMBER}`} external>
              WhatsApp
            </FooterLink>
            <FooterLink href="mailto:contact@01-transfert-aeroport.fr">contact@01-transfert-aeroport.fr</FooterLink>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-[var(--color-line-2)]">
          <div className="flex gap-5 text-xs">
            <a href="/mentions-legales" className="text-[var(--color-mute)] hover:text-[var(--color-gold)] transition-colors">
              Mentions légales &amp; CGV
            </a>
            <a href="/confidentialite" className="text-[var(--color-mute)] hover:text-[var(--color-gold)] transition-colors">
              Confidentialité
            </a>
          </div>
          <p className="text-[11px] text-[var(--color-mute-2)]">
            © 2026 01 Transfert Aéroport · Rachid NAFAA · SIRET 843 968 066 00020
          </p>
        </div>
      </Container>
    </footer>
  );
}

function FooterLink({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) {
  const props = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <a
      href={href}
      {...props}
      className="block text-sm text-[var(--color-mute)] py-1 hover:text-[var(--color-gold)] transition-colors"
    >
      {children}
    </a>
  );
}

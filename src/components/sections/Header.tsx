"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { PHONE_DISPLAY, PHONE_TEL, WHATSAPP_NUMBER } from "@/lib/utils";

const navLinks = [
  { href: "#tarifs", label: "Tarifs" },
  { href: "#vehicule", label: "Véhicule" },
  { href: "#avis", label: "Avis" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Top utility bar */}
      <div className="border-b border-[var(--color-line-2)] glass relative z-50">
        <Container className="flex items-center justify-between gap-4 py-2.5 text-[11px] uppercase tracking-[0.15em] text-[var(--color-mute)] flex-wrap">
          <span className="hidden sm:inline-flex items-center gap-3">
            <span className="text-[var(--color-gold)] font-bold">TRANSFERT VIP</span>
            <span aria-hidden className="text-[var(--color-gold)]">·</span>
            <span className="text-[var(--color-cream-2)]">ÎLE-DE-FRANCE</span>
            <span aria-hidden className="text-[var(--color-gold)]">·</span>
            <span className="text-[var(--color-cream-2)]">7J/7</span>
            <span aria-hidden className="text-[var(--color-gold)]">·</span>
            <span className="text-[var(--color-cream-2)]">24H/24</span>
          </span>
          <div className="flex items-center gap-4 ml-auto">
            <a href={PHONE_TEL} className="hover:text-[var(--color-gold)] transition-colors">
              {PHONE_DISPLAY}
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-gold)] transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </Container>
      </div>

      {/* Sticky nav */}
      <nav className="sticky top-0 z-40 glass border-b border-[var(--color-line-2)] py-4">
        <Container className="flex items-center justify-between gap-6">
          <Logo />

          <ul className="hidden lg:flex gap-8 items-center">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-xs uppercase tracking-wider text-[var(--color-mute)] hover:text-[var(--color-cream)] relative py-2 transition-colors after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-px after:w-0 after:bg-[var(--color-gold)] after:transition-[width] hover:after:w-full"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Button href="#booking" variant="gold" size="sm" className="hidden sm:inline-flex">
              Réserver maintenant
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Button>
            <a
              href={PHONE_TEL}
              className="hidden md:inline-flex items-center gap-1.5 text-[var(--color-cream)] font-semibold text-sm"
              aria-label={`Téléphone ${PHONE_DISPLAY}`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-[var(--color-gold)]" aria-hidden>
                <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2a15.07 15.07 0 0 1-6.59-6.58l2.2-2.21a.96.96 0 0 0 .25-1A11.36 11.36 0 0 1 8.5 4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1c0 9.39 7.61 17 17 17a1 1 0 0 0 1-1v-3.5a1 1 0 0 0-1-1z" />
              </svg>
              <span className="hidden xl:inline">{PHONE_DISPLAY}</span>
            </a>

            <button
              type="button"
              className="lg:hidden flex flex-col gap-1 p-2 z-50"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
            >
              <span className={`block w-5 h-0.5 bg-[var(--color-cream)] transition-transform duration-300 ${open ? "translate-y-1.5 rotate-45" : ""}`} />
              <span className={`block w-5 h-0.5 bg-[var(--color-cream)] transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-0.5 bg-[var(--color-cream)] transition-transform duration-300 ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
            </button>
          </div>
        </Container>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden fixed top-0 right-0 bottom-0 w-[80vw] max-w-[320px] z-30 bg-[var(--color-ink)] border-l border-[var(--color-line)] pt-24 px-6 pb-6 flex flex-col gap-3 transition-transform duration-300 ease-[var(--ease-out)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className="text-lg py-3 text-[var(--color-cream)] border-b border-[var(--color-line-2)] last:border-0"
          >
            {link.label}
          </a>
        ))}
        <Button href="#booking" variant="gold" className="mt-4">
          Réserver maintenant →
        </Button>
        <Button href={PHONE_TEL} variant="outline" className="mt-2">
          {PHONE_DISPLAY}
        </Button>
      </div>
    </>
  );
}

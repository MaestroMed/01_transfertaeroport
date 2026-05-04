"use client";

import { useState, useEffect, useMemo, type FormEvent } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import {
  detectZone,
  getPrice,
  ZONE_NAMES,
  WHATSAPP_NUMBER,
  type Airport,
  type Zone,
} from "@/lib/utils";

type Step = 1 | 2;

export function Booking() {
  const [step, setStep] = useState<Step>(1);
  const [route, setRoute] = useState<"aeroport-paris" | "paris-aeroport">("aeroport-paris");
  const [address, setAddress] = useState("");
  const [airport, setAirport] = useState<Airport>("cdg");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [passengers, setPassengers] = useState("4");
  const [luggage, setLuggage] = useState("3");
  const [flight, setFlight] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [terms, setTerms] = useState(false);
  const [payment, setPayment] = useState<"card" | "cash">("card");
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  // Default : date = demain, heure = maintenant (le client peut modifier)
  useEffect(() => {
    const now = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setDate(tomorrow.toISOString().split("T")[0] ?? "");
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    setTime(`${hh}:${mm}`);
  }, []);

  const zone: Zone | null = useMemo(() => detectZone(address), [address]);
  const price = useMemo(() => getPrice(zone, airport), [zone, airport]);

  const routeLabel = useMemo(() => {
    const ap = airport === "cdg" ? "CDG" : "Beauvais";
    const z = zone ? ZONE_NAMES[zone] : "—";
    return route === "aeroport-paris" ? `${ap} → ${z}` : `${z} → ${ap}`;
  }, [route, airport, zone]);

  function next(e: React.MouseEvent) {
    e.preventDefault();
    if (!address || !date || !time || !zone) return;
    setStep(2);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!terms || submitting) return;
    setSubmitting(true);

    const message = `🚐 *NOUVELLE RÉSERVATION*
━━━━━━━━━━━━━━
📍 *${routeLabel}*
📅 ${date} à ${time}
📌 ${address}
${flight ? `✈️ Vol : ${flight}` : ""}
👥 ${passengers} passagers · ${luggage} bagages

👤 ${firstname} ${lastname}
📱 ${phone}
📧 ${email}
${notes ? `📝 ${notes}` : ""}

💰 *${price}€* (van 7 places, tout compris)
💳 ${payment === "card" ? "Carte bancaire" : "Espèces à bord"}
━━━━━━━━━━━━━━
✅ Via 01-transfert-aeroport.fr`;

    // Simulation delay (replace by Server Action when Stripe configured)
    await new Promise((r) => setTimeout(r, 1500));

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
    setConfirmed(true);
    setSubmitting(false);
  }

  function reset() {
    setStep(1);
    setConfirmed(false);
    setAddress("");
    setFirstname("");
    setLastname("");
    setPhone("");
    setEmail("");
    setNotes("");
    setTerms(false);
  }

  return (
    <section id="booking" className="py-20 md:py-24 reveal">
      <Container>
        <div className="text-center mb-12">
          <span className="inline-block text-[11px] font-semibold tracking-[0.25em] uppercase text-[var(--color-gold)] mb-4">
            Réservation en 2 minutes
          </span>
          <h2 className="text-h2 font-display uppercase max-w-3xl mx-auto">
            Votre transfert. Prix fixe garanti.
          </h2>
        </div>

        <div className="max-w-[560px] mx-auto bg-[color-mix(in_oklch,var(--color-ink-2)_95%,transparent)] glass border border-[var(--color-line)] rounded-3xl p-6 md:p-10 shadow-[0_24px_60px_rgba(0,0,0,.6)]">
          {confirmed ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[color-mix(in_oklch,var(--color-green)_18%,transparent)] text-[var(--color-green)] inline-flex items-center justify-center">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <path d="M22 4L12 14.01l-3-3" />
                </svg>
              </div>
              <h3 className="font-display text-2xl mb-2">Réservation confirmée</h3>
              <p className="text-[var(--color-cream-2)] mb-6">
                WhatsApp ouvert. Confirmez l&apos;envoi du message à votre chauffeur.
              </p>
              <Button onClick={reset} variant="outline">
                Nouvelle réservation
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              {/* Step 1 */}
              {step === 1 && (
                <div>
                  <StepIndicator step={1} />

                  <div className="grid grid-cols-2 gap-2 p-1 bg-[color-mix(in_oklch,var(--color-ink)_60%,transparent)] border border-[var(--color-line-2)] rounded-md mb-4">
                    <Pill active={route === "aeroport-paris"} onClick={() => setRoute("aeroport-paris")}>
                      Aéroport → Adresse
                    </Pill>
                    <Pill active={route === "paris-aeroport"} onClick={() => setRoute("paris-aeroport")}>
                      Adresse → Aéroport
                    </Pill>
                  </div>

                  <Field label="Votre adresse">
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      autoComplete="street-address"
                      placeholder="Ex : 15 Rue de Rivoli, 75001 Paris"
                      required
                      className="form-input"
                    />
                    <ZoneDetect zone={zone} address={address} />
                  </Field>

                  <Field label="Aéroport">
                    <select
                      value={airport}
                      onChange={(e) => setAirport(e.target.value as Airport)}
                      required
                      className="form-input"
                    >
                      <option value="cdg">✈ Charles de Gaulle (CDG · Roissy)</option>
                      <option value="beauvais">✈ Beauvais-Tillé (BVA)</option>
                    </select>
                  </Field>

                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Date">
                      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required className="form-input" />
                    </Field>
                    <Field label="Heure">
                      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required className="form-input" />
                    </Field>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Passagers">
                      <select value={passengers} onChange={(e) => setPassengers(e.target.value)} className="form-input">
                        {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                          <option key={n} value={n}>
                            {n} {n === 1 ? "passager" : "passagers"}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Bagages">
                      <select value={luggage} onChange={(e) => setLuggage(e.target.value)} className="form-input">
                        {[0, 1, 2, 3, 4].map((n) => (
                          <option key={n} value={n}>
                            {n === 4 ? "4+ bagages" : `${n} ${n === 1 ? "bagage" : "bagages"}`}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  <Field label="N° de vol" hint="(optionnel)">
                    <input
                      type="text"
                      value={flight}
                      onChange={(e) => setFlight(e.target.value)}
                      placeholder="Ex : FR1234"
                      autoComplete="off"
                      className="form-input"
                    />
                  </Field>

                  <div className="flex justify-between items-center px-5 py-4 my-6 bg-[color-mix(in_oklch,var(--color-gold)_10%,var(--color-ink-2))] border border-[var(--color-line)] rounded-md">
                    <span className="text-[11px] font-medium text-[var(--color-cream-2)] tracking-[0.03em]">
                      Prix total · van 7 places
                    </span>
                    <span className="font-display text-3xl text-[var(--color-gold)] leading-none">
                      {price ? `${price}€` : "—"}
                    </span>
                  </div>

                  <Button onClick={next} variant="gold" className="w-full">
                    Continuer
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Button>

                  <div className="flex items-center justify-center gap-1.5 mt-4 text-[11px] text-[var(--color-mute)]">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-[var(--color-green)]">
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                    </svg>
                    Annulation gratuite 24h · Paiement sécurisé
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div>
                  <StepIndicator step={2} />

                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Prénom">
                      <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} autoComplete="given-name" required className="form-input" />
                    </Field>
                    <Field label="Nom">
                      <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} autoComplete="family-name" required className="form-input" />
                    </Field>
                  </div>

                  <Field label="Téléphone">
                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" placeholder="06 00 00 00 00" required className="form-input" />
                  </Field>

                  <Field label="Email">
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" placeholder="votre@email.com" required className="form-input" />
                  </Field>

                  <Field label="Notes" hint="(siège bébé, instructions...)">
                    <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} className="form-input resize-none" />
                  </Field>

                  <div className="p-4 bg-[color-mix(in_oklch,var(--color-ink)_70%,transparent)] border border-[var(--color-line-2)] rounded-md my-4 text-sm">
                    <RecapLine label="Trajet" value={routeLabel} />
                    <RecapLine label="Date" value={`${date} à ${time}`} />
                    <RecapLine label="Passagers" value={`${passengers} pax · ${luggage} bagages`} />
                    <div className="flex justify-between pt-3 mt-1 border-t border-[var(--color-gold)]">
                      <span className="font-semibold text-[var(--color-cream-2)]">Total</span>
                      <span className="font-display text-2xl text-[var(--color-gold)]">{price}€</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 p-1 bg-[color-mix(in_oklch,var(--color-ink)_60%,transparent)] border border-[var(--color-line-2)] rounded-md mb-4">
                    <Pill active={payment === "card"} onClick={() => setPayment("card")}>
                      💳 Carte bancaire
                    </Pill>
                    <Pill active={payment === "cash"} onClick={() => setPayment("cash")}>
                      💵 Espèces à bord
                    </Pill>
                  </div>

                  <label className="flex gap-2.5 items-start my-4 text-sm text-[var(--color-mute)]">
                    <input
                      type="checkbox"
                      checked={terms}
                      onChange={(e) => setTerms(e.target.checked)}
                      required
                      className="mt-1 accent-[var(--color-gold)]"
                    />
                    <span>
                      J&apos;accepte les <a href="#" className="text-[var(--color-gold)]">CGV</a> et la{" "}
                      <a href="#" className="text-[var(--color-gold)]">politique de confidentialité</a>
                    </span>
                  </label>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-5 py-3.5 border border-[var(--color-line)] rounded-md text-[var(--color-cream-2)] text-sm inline-flex items-center gap-1.5 hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-colors"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                      </svg>
                      Retour
                    </button>
                    <button
                      type="submit"
                      disabled={submitting || !terms}
                      className="flex-1 px-6 py-3.5 bg-[var(--color-gold)] text-[var(--color-ink)] rounded-md font-semibold text-sm inline-flex items-center justify-center gap-2 hover:bg-[var(--color-gold-2)] hover:shadow-[0_8px_24px_rgba(0,0,0,.5),0_0_32px_color-mix(in_oklch,var(--color-gold)_30%,transparent)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      {submitting ? (
                        <>
                          <span className="inline-block w-4 h-4 border-2 border-[color-mix(in_oklch,var(--color-ink)_30%,transparent)] border-t-[var(--color-ink)] rounded-full animate-spin" />
                          Traitement…
                        </>
                      ) : (
                        "Confirmer la réservation"
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </Container>

      <style>{`
        .form-input {
          width: 100%;
          padding: 12px 14px;
          background: color-mix(in oklch, var(--color-ink) 50%, transparent);
          border: 1px solid var(--color-line-2);
          border-radius: 6px;
          color: var(--color-cream);
          font-size: 0.9375rem;
          transition: border-color .2s, background .2s;
        }
        .form-input:focus {
          outline: none;
          border-color: var(--color-gold);
          background: color-mix(in oklch, var(--color-ink) 30%, transparent);
        }
        .form-input::placeholder { color: var(--color-mute-2); }
        .form-input option { background: var(--color-ink-2); color: var(--color-cream); }
      `}</style>
    </section>
  );
}

function StepIndicator({ step }: { step: Step }) {
  return (
    <div className="flex items-center gap-2 mb-6">
      <span
        className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-[11px] font-bold ${
          step >= 1
            ? "bg-[var(--color-gold)] border border-[var(--color-gold)] text-[var(--color-ink)]"
            : "bg-[color-mix(in_oklch,var(--color-ink)_50%,transparent)] border border-[var(--color-line)] text-[var(--color-mute-2)]"
        }`}
      >
        {step > 1 ? "✓" : "1"}
      </span>
      <span className={`flex-shrink-0 w-6 h-px ${step >= 2 ? "bg-[var(--color-gold)]" : "bg-[var(--color-line)]"}`} />
      <span
        className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-[11px] font-bold ${
          step >= 2
            ? "bg-[var(--color-gold)] border border-[var(--color-gold)] text-[var(--color-ink)]"
            : "bg-[color-mix(in_oklch,var(--color-ink)_50%,transparent)] border border-[var(--color-line)] text-[var(--color-mute-2)]"
        }`}
      >
        2
      </span>
      <span className="ml-auto text-[11px] uppercase tracking-wider font-medium text-[var(--color-mute)]">
        Étape {step}/2
      </span>
    </div>
  );
}

function Pill({ active, children, onClick }: { active: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-2.5 rounded text-sm font-medium text-center transition-all duration-200 ${
        active ? "bg-[var(--color-gold)] text-[var(--color-ink)] font-semibold" : "text-[var(--color-mute)] hover:text-[var(--color-cream)]"
      }`}
    >
      {children}
    </button>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <label className="block text-[11px] font-semibold tracking-[0.08em] uppercase text-[var(--color-cream-2)] mb-1.5">
        {label}
        {hint && <span className="ml-1 normal-case tracking-normal font-normal text-[var(--color-mute-2)]">{hint}</span>}
      </label>
      {children}
    </div>
  );
}

function ZoneDetect({ zone, address }: { zone: Zone | null; address: string }) {
  if (zone) {
    return (
      <p className="mt-1.5 text-[11px] font-medium text-[var(--color-green)]">
        <span className="inline-block px-2 py-0.5 rounded-full bg-[color-mix(in_oklch,var(--color-green)_20%,transparent)] font-bold text-[10px] mr-1.5 tracking-wider">
          {ZONE_NAMES[zone]}
        </span>
        Zone détectée — tarif ajusté
      </p>
    );
  }
  if (address.length > 5) {
    return (
      <p className="mt-1.5 text-[11px] font-medium text-[var(--color-gold-2)]">
        <span className="inline-block px-2 py-0.5 rounded-full bg-[color-mix(in_oklch,var(--color-gold)_20%,transparent)] font-bold text-[10px] mr-1.5">
          ?
        </span>
        Entrez un code postal pour calculer le tarif
      </p>
    );
  }
  return null;
}

function RecapLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-1.5 border-b border-[var(--color-line-2)] last:border-0 text-[var(--color-mute)]">
      <span>{label}</span>
      <span className="text-[var(--color-cream)] font-medium text-right">{value}</span>
    </div>
  );
}

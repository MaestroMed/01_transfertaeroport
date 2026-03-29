#!/usr/bin/env node
// ============================================================
// GENERATEUR SEO MASSIF — 01 Transfert Aéroport
// Génère ~40 000 pages HTML optimisées SEO
// Usage: node seo/generate.js
// ============================================================

const fs = require('fs');
const path = require('path');
const communes = [...require('./data/communes.js'), ...require('./data/communes-extra.js'), ...require('./data/communes-final.js')];

const SITE_URL = 'https://01-transfert-aeroport.fr';
const WA_LINK = 'https://wa.me/33651161440';
const PHONE = '06 51 16 14 40';
const OUTPUT = path.join(__dirname, '..', 'pages');

// Dédupliquer les communes par slug
const seen = new Set();
const COMMUNES = communes.filter(c => {
    if (seen.has(c[0])) return false;
    seen.add(c[0]);
    return true;
});

console.log(`Communes uniques: ${COMMUNES.length}`);

const AIRPORTS = {
    cdg: { name: 'Charles de Gaulle (CDG)', slug: 'cdg', nameShort: 'CDG', nameFull: 'Roissy Charles de Gaulle', en: 'Charles de Gaulle Airport', es: 'Aeropuerto Charles de Gaulle', de: 'Flughafen Charles de Gaulle' },
    beauvais: { name: 'Beauvais-Tillé (BVA)', slug: 'beauvais', nameShort: 'Beauvais', nameFull: 'Beauvais-Tillé', en: 'Beauvais-Tillé Airport', es: 'Aeropuerto de Beauvais', de: 'Flughafen Beauvais-Tillé' }
};

const ZONES = {
    'val-doise':  { label: "Val d'Oise",  cdg: 60, beauvais: 90 },
    'paris-nord': { label: 'Paris Nord',   cdg: 70, beauvais: 100 },
    'paris-sud':  { label: 'Paris Sud',    cdg: 80, beauvais: 110 }
};

// Page types per language
const PAGE_TYPES = {
    fr: [
        { slug: 'transfert', title: 'Transfert {commune} → {airport}', h1: 'Transfert {commune} vers {airport_full}', desc: 'Réservez votre transfert {commune} → {airport} en van privé 7 places. Prix fixe {price}€, porte-à-porte, confirmation WhatsApp.' },
        { slug: 'vtc', title: 'VTC {commune} {airport} — Véhicule 7 places', h1: 'VTC {commune} ↔ {airport_full}', desc: 'VTC {commune} {airport} en véhicule 7 places. Tarif fixe {price}€ tout compris. Chauffeur privé, bagages inclus.' },
        { slug: 'navette', title: 'Navette privée {commune} {airport} — Prix fixe', h1: 'Navette privée {commune} ↔ {airport_full}', desc: 'Navette privée {commune} vers {airport}. Van 7 places à {price}€. Alternative premium aux navettes partagées.' },
        { slug: 'taxi', title: 'Taxi {commune} {airport} — Alternative van 7 places', h1: 'Alternative taxi {commune} → {airport_full}', desc: 'Mieux qu\'un taxi ! Van privé 7 places {commune} ↔ {airport} à {price}€. Même prix que le taxi, capacité double.' },
        { slug: 'chauffeur-prive', title: 'Chauffeur privé {commune} {airport}', h1: 'Chauffeur privé {commune} → {airport_full}', desc: 'Chauffeur privé {commune} {airport}. Van 7 places, {price}€ prix fixe. Ponctualité garantie, suivi de vol.' },
        { slug: 'prix', title: 'Prix transfert {commune} {airport} — Tarifs 2026', h1: 'Prix transfert {commune} ↔ {airport_full} en 2026', desc: 'Combien coûte un transfert {commune} {airport} ? {price}€ en van privé 7 places. Comparatif des prix et alternatives.' },
        { slug: 'comment-aller', title: 'Comment aller de {commune} à {airport} — Guide', h1: 'Comment aller de {commune} à {airport_full} ?', desc: 'Toutes les options pour aller de {commune} à {airport} : van privé ({price}€), taxi, bus, train. Comparatif complet.' },
        { slug: 'reservation', title: 'Réservation transfert {commune} {airport}', h1: 'Réserver votre transfert {commune} → {airport_full}', desc: 'Réservez en 2 min votre transfert {commune} {airport}. Van privé 7 places à {price}€. Confirmation WhatsApp immédiate.' },
    ],
    en: [
        { slug: 'transfer', title: '{commune} to {airport} Transfer — Private 7-seater', h1: 'Private transfer {commune} to {airport_full}', desc: 'Book your {commune} to {airport} transfer. Private 7-seater van, fixed price {price}€. Door-to-door, WhatsApp confirmation.' },
        { slug: 'private-car', title: 'Private car {commune} {airport} — Fixed price', h1: 'Private car service {commune} ↔ {airport_full}', desc: 'Private car {commune} to {airport}. 7-seater van at {price}€ all-inclusive. Professional driver, luggage included.' },
        { slug: 'shuttle', title: 'Private shuttle {commune} {airport}', h1: 'Private shuttle {commune} to {airport_full}', desc: 'Private shuttle from {commune} to {airport}. 7-seat van, {price}€ fixed price. Better than shared shuttles.' },
        { slug: 'taxi-alternative', title: 'Taxi alternative {commune} {airport} — 7-seater', h1: '{commune} to {airport_full}: better than a taxi', desc: 'Better than a taxi! Private 7-seat van {commune} to {airport} at {price}€. Same price as taxi, double capacity.' },
        { slug: 'price', title: '{commune} to {airport} transfer price — 2026 rates', h1: '{commune} to {airport_full} transfer prices in 2026', desc: 'How much does a {commune} to {airport} transfer cost? {price}€ for a private 7-seat van. Price comparison guide.' },
    ],
    es: [
        { slug: 'traslado', title: 'Traslado {commune} {airport} — Furgoneta privada', h1: 'Traslado privado {commune} → {airport_full}', desc: 'Reserve su traslado {commune} a {airport}. Furgoneta privada 7 plazas, precio fijo {price}€. Puerta a puerta.' },
        { slug: 'taxi', title: 'Taxi {commune} {airport} — Alternativa 7 plazas', h1: 'Alternativa al taxi: {commune} → {airport_full}', desc: 'Mejor que un taxi. Furgoneta privada 7 plazas {commune} a {airport} por {price}€. Mismo precio, doble capacidad.' },
        { slug: 'precio', title: 'Precio traslado {commune} {airport} — Tarifas 2026', h1: 'Precio del traslado {commune} ↔ {airport_full}', desc: '¿Cuánto cuesta un traslado {commune} {airport}? {price}€ en furgoneta privada 7 plazas. Guía de precios.' },
        { slug: 'reserva', title: 'Reservar traslado {commune} {airport}', h1: 'Reservar traslado {commune} → {airport_full}', desc: 'Reserve en 2 min su traslado {commune} {airport}. Furgoneta 7 plazas a {price}€. Confirmación WhatsApp.' },
    ],
    de: [
        { slug: 'transfer', title: 'Transfer {commune} {airport} — Privater 7-Sitzer', h1: 'Privater Transfer {commune} → {airport_full}', desc: 'Buchen Sie Ihren Transfer {commune} zum {airport}. Privater 7-Sitzer-Van, Festpreis {price}€. Tür-zu-Tür.' },
        { slug: 'taxi', title: 'Taxi Alternative {commune} {airport} — 7-Sitzer', h1: 'Besser als ein Taxi: {commune} → {airport_full}', desc: 'Besser als ein Taxi! Privater 7-Sitzer {commune} zum {airport} für {price}€. Gleicher Preis, doppelte Kapazität.' },
        { slug: 'preis', title: 'Preis Transfer {commune} {airport} — Tarife 2026', h1: 'Transferpreis {commune} ↔ {airport_full} 2026', desc: 'Was kostet ein Transfer {commune} {airport}? {price}€ im privaten 7-Sitzer. Preisvergleich.' },
        { slug: 'buchung', title: 'Transfer buchen {commune} {airport}', h1: 'Transfer buchen: {commune} → {airport_full}', desc: 'Buchen Sie in 2 Min Ihren Transfer {commune} {airport}. 7-Sitzer-Van für {price}€. WhatsApp-Bestätigung.' },
    ],
    it: [
        { slug: 'trasferimento', title: 'Trasferimento {commune} {airport} — Van privato 7 posti', h1: 'Trasferimento privato {commune} → {airport_full}', desc: 'Prenota il trasferimento {commune} a {airport}. Van privato 7 posti, prezzo fisso {price}€. Porta a porta.' },
        { slug: 'taxi', title: 'Taxi {commune} {airport} — Alternativa 7 posti', h1: 'Alternativa al taxi: {commune} → {airport_full}', desc: 'Meglio di un taxi! Van privato 7 posti {commune} a {airport} per {price}€. Stesso prezzo, doppia capacità.' },
        { slug: 'prezzo', title: 'Prezzo trasferimento {commune} {airport} — Tariffe 2026', h1: 'Prezzo trasferimento {commune} ↔ {airport_full}', desc: 'Quanto costa un trasferimento {commune} {airport}? {price}€ in van privato 7 posti. Guida ai prezzi.' },
        { slug: 'prenotazione', title: 'Prenotazione trasferimento {commune} {airport}', h1: 'Prenota trasferimento {commune} → {airport_full}', desc: 'Prenota in 2 min il trasferimento {commune} {airport}. Van 7 posti a {price}€. Conferma WhatsApp.' },
    ],
    pt: [
        { slug: 'transfer', title: 'Transfer {commune} {airport} — Van privado 7 lugares', h1: 'Transfer privado {commune} → {airport_full}', desc: 'Reserve seu transfer {commune} para {airport}. Van privado 7 lugares, preço fixo {price}€. Porta a porta.' },
        { slug: 'taxi', title: 'Táxi {commune} {airport} — Alternativa 7 lugares', h1: 'Alternativa ao táxi: {commune} → {airport_full}', desc: 'Melhor que táxi! Van privado 7 lugares {commune} para {airport} por {price}€. Mesmo preço, dobro da capacidade.' },
        { slug: 'preco', title: 'Preço transfer {commune} {airport} — Tarifas 2026', h1: 'Preço transfer {commune} ↔ {airport_full}', desc: 'Quanto custa um transfer {commune} {airport}? {price}€ em van privado 7 lugares. Guia de preços.' },
        { slug: 'reserva', title: 'Reserva transfer {commune} {airport}', h1: 'Reservar transfer {commune} → {airport_full}', desc: 'Reserve em 2 min seu transfer {commune} {airport}. Van 7 lugares a {price}€. Confirmação WhatsApp.' },
    ]
};

// Count total pages
let totalPages = 0;
for (const lang of Object.keys(PAGE_TYPES)) {
    totalPages += COMMUNES.length * Object.keys(AIRPORTS).length * PAGE_TYPES[lang].length;
}
console.log(`Pages à générer: ${totalPages}`);

// ==================== HTML TEMPLATES ====================

function htmlHead(title, desc, canonical, lang) {
    return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)} | 01 Transfert Aéroport</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${canonical}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${canonical}">
<meta property="og:type" content="website">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap" rel="stylesheet">
<style>
:root{--accent:#276ef1;--green:#25d366;--dark:#0a0a0a;--r:12px;--font:'Inter',sans-serif}
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:var(--font);color:#fff;background:var(--dark);line-height:1.6}
a{color:inherit;text-decoration:none}
.container{max-width:900px;margin:0 auto;padding:0 20px}
/* NAV */
.nav{background:rgba(10,10,10,.95);border-bottom:1px solid rgba(255,255,255,.1);padding:14px 0;position:sticky;top:0;z-index:50}
.nav-inner{display:flex;align-items:center;justify-content:space-between}
.logo{display:flex;align-items:center;gap:8px;font-weight:900;font-size:14px}
.logo b{color:var(--accent);font-size:22px}
.nav-links{display:flex;gap:16px;align-items:center}
.nav-links a{font-size:13px;color:rgba(255,255,255,.7);transition:color .2s}
.nav-links a:hover{color:#fff}
.btn-sm{padding:7px 14px;border-radius:99px;font-size:12px;font-weight:600;display:inline-flex;align-items:center;gap:5px}
.btn-green{background:var(--green);color:#fff}
.btn-blue{background:var(--accent);color:#fff}
/* HERO */
.hero-seo{padding:60px 0 40px;text-align:center}
.hero-seo .tag{display:inline-block;padding:5px 14px;background:rgba(39,110,241,.15);color:var(--accent);border-radius:99px;font-size:12px;font-weight:700;letter-spacing:.03em;text-transform:uppercase;margin-bottom:16px}
.hero-seo h1{font-size:clamp(24px,4vw,42px);font-weight:900;letter-spacing:-.02em;line-height:1.15;margin-bottom:12px}
.hero-seo .sub{font-size:16px;color:rgba(255,255,255,.7);margin-bottom:28px}
.price-badge{display:inline-flex;align-items:baseline;gap:4px;background:rgba(39,110,241,.12);border:1px solid rgba(39,110,241,.3);border-radius:16px;padding:14px 28px;margin-bottom:20px}
.price-badge .amount{font-size:48px;font-weight:900}
.price-badge .eur{font-size:20px;color:rgba(255,255,255,.6)}
.price-badge .label{font-size:13px;color:rgba(255,255,255,.5);margin-left:10px}
.ctas{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-bottom:24px}
.cta-main{padding:14px 28px;background:var(--accent);color:#fff;border-radius:var(--r);font-weight:700;font-size:15px;transition:background .2s}
.cta-main:hover{background:#1a5cd4}
.cta-wa{padding:14px 28px;background:var(--green);color:#fff;border-radius:var(--r);font-weight:700;font-size:15px;display:inline-flex;align-items:center;gap:6px}
/* CONTENT */
.content{padding:40px 0 60px}
.content h2{font-size:24px;font-weight:800;margin:32px 0 14px;color:#fff}
.content h3{font-size:18px;font-weight:700;margin:24px 0 10px}
.content p{color:rgba(255,255,255,.75);margin-bottom:14px;font-size:15px}
.content ul{margin:0 0 16px 20px;color:rgba(255,255,255,.75)}
.content li{margin-bottom:6px;font-size:15px}
/* TABLE */
table{width:100%;border-collapse:collapse;margin:16px 0 24px}
th,td{padding:10px 12px;text-align:left;border-bottom:1px solid rgba(255,255,255,.1);font-size:14px}
th{color:rgba(255,255,255,.5);font-weight:600;font-size:12px;text-transform:uppercase;letter-spacing:.04em}
td{color:rgba(255,255,255,.8)}
tr:hover td{background:rgba(255,255,255,.03)}
.highlight{color:var(--accent);font-weight:700}
/* FAQ */
.faq{background:rgba(255,255,255,.03);border-radius:16px;padding:24px;margin:24px 0}
.faq h2{margin-top:0}
.faq-item{border-bottom:1px solid rgba(255,255,255,.08);padding:14px 0}
.faq-item:last-child{border:none}
.faq-q{font-weight:700;font-size:15px;margin-bottom:6px;color:#fff}
.faq-a{font-size:14px;color:rgba(255,255,255,.65);line-height:1.5}
/* CTA BOX */
.cta-box{background:linear-gradient(135deg,rgba(39,110,241,.15),rgba(37,211,102,.1));border:1px solid rgba(39,110,241,.25);border-radius:16px;padding:28px;text-align:center;margin:32px 0}
.cta-box h3{font-size:20px;margin-bottom:8px}
.cta-box p{color:rgba(255,255,255,.7);margin-bottom:16px}
/* BREADCRUMB */
.bc{padding:14px 0;font-size:12px;color:rgba(255,255,255,.4)}
.bc a{color:rgba(255,255,255,.5);transition:color .2s}
.bc a:hover{color:#fff}
/* FOOTER */
.footer{background:rgba(0,0,0,.5);border-top:1px solid rgba(255,255,255,.08);padding:24px 0;text-align:center;font-size:12px;color:rgba(255,255,255,.35)}
/* LINKS */
.related{display:flex;flex-wrap:wrap;gap:8px;margin:16px 0}
.related a{padding:6px 12px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:8px;font-size:12px;color:rgba(255,255,255,.7);transition:all .2s}
.related a:hover{background:rgba(39,110,241,.15);border-color:var(--accent);color:#fff}
@media(max-width:640px){.nav-links{display:none}.price-badge .amount{font-size:36px}.ctas{flex-direction:column;align-items:center}}
</style>
</head>`;
}

function nav(lang) {
    const home = lang === 'fr' ? '../../index.html' : `../../index.html`;
    const labels = {
        fr: { book: 'Réserver', prices: 'Tarifs', wa: 'WhatsApp' },
        en: { book: 'Book now', prices: 'Prices', wa: 'WhatsApp' },
        es: { book: 'Reservar', prices: 'Precios', wa: 'WhatsApp' },
        de: { book: 'Buchen', prices: 'Preise', wa: 'WhatsApp' },
        it: { book: 'Prenota', prices: 'Prezzi', wa: 'WhatsApp' },
        pt: { book: 'Reservar', prices: 'Preços', wa: 'WhatsApp' }
    }[lang];
    return `<nav class="nav"><div class="container nav-inner">
<a href="${home}" class="logo"><b>01</b> Transfert Aéroport</a>
<div class="nav-links">
<a href="${home}#booking">${labels.book}</a>
<a href="${home}#compare">${labels.prices}</a>
<a href="${WA_LINK}" class="btn-sm btn-green" target="_blank" rel="noopener">${labels.wa}</a>
</div></div></nav>`;
}

function breadcrumb(lang, communeName, airportShort, pageType) {
    const homeNames = { fr:'Accueil', en:'Home', es:'Inicio', de:'Startseite', it:'Home', pt:'Início' };
    const home = homeNames[lang] || 'Home';
    return `<div class="bc container"><a href="../../index.html">${home}</a> › <a href="../index.html">${communeName}</a> › ${airportShort}</div>`;
}

function footer() {
    return `<footer class="footer"><div class="container">
<p>01 Transfert Aéroport — SIRET 93480658800015 — ${PHONE}</p>
<p>Rachid NAFAA — 9 Rue d'Estienne d'Orves, 95200 Sarcelles</p>
</div></footer>`;
}

// ==================== CONTENT GENERATORS ====================

function frContent(commune, airport, price, dist, time) {
    const cn = commune[1], an = AIRPORTS[airport].nameFull, as = AIRPORTS[airport].nameShort;
    const zone = ZONES[commune[3]];
    const otherAirport = airport === 'cdg' ? 'beauvais' : 'cdg';
    const otherPrice = zone[otherAirport];
    const ppPerson = Math.round(price / 7 * 100) / 100;

    return `
<div class="content"><div class="container">

<h2>Votre transfert ${cn} ↔ ${an}</h2>
<p>Profitez d'un transfert privé entre <strong>${cn}</strong> et l'<strong>aéroport ${an}</strong> en véhicule 7 places pour seulement <strong>${price}€</strong>. Notre chauffeur professionnel vous prend en charge directement à votre adresse et vous dépose à l'aéroport (ou inversement), avec tous vos bagages. C'est simple, confortable et au meilleur prix.</p>

<h2>Pourquoi choisir 01 Transfert Aéroport depuis ${cn} ?</h2>
<ul>
<li><strong>Prix fixe garanti :</strong> ${price}€ tout compris, pas de compteur ni de surge pricing</li>
<li><strong>Véhicule 7 places :</strong> idéal pour les familles et groupes, au prix d'un taxi pour 4</li>
<li><strong>Porte-à-porte :</strong> prise en charge à votre adresse à ${cn} (${commune[4]})</li>
<li><strong>${dist} km en ${time} min</strong> environ — trajet direct sans arrêt intermédiaire</li>
<li><strong>Seulement ${ppPerson.toFixed(2)}€ par personne</strong> si vous êtes 7 — moins cher que le RER !</li>
<li><strong>Confirmation WhatsApp</strong> avec nom du chauffeur et plaque d'immatriculation</li>
<li><strong>Suivi de vol</strong> : votre chauffeur s'adapte aux retards, 30 min d'attente gratuite</li>
<li><strong>Sièges bébé gratuits</strong> sur demande — parfait pour voyager en famille</li>
</ul>

<h2>Tarifs ${cn} ↔ Aéroports</h2>
<table>
<tr><th>Trajet</th><th>Prix van 7 places</th><th>Prix par personne (7 pax)</th></tr>
<tr><td>${cn} ↔ CDG</td><td class="highlight">${zone.cdg}€</td><td>${(zone.cdg/7).toFixed(2)}€</td></tr>
<tr><td>${cn} ↔ Beauvais</td><td class="highlight">${zone.beauvais}€</td><td>${(zone.beauvais/7).toFixed(2)}€</td></tr>
</table>
<p><em>Prix par véhicule, jusqu'à 7 passagers et bagages inclus. Même tarif jour et nuit.</em></p>

<h2>Comparatif des prix : ${cn} → ${as}</h2>
<table>
<tr><th>Transport</th><th>Prix</th><th>Passagers max</th><th>Porte-à-porte</th></tr>
<tr><td class="highlight">01 Transfert (van 7 pl.)</td><td class="highlight">${price}€</td><td>7</td><td>Oui</td></tr>
<tr><td>Taxi</td><td>${airport==='cdg'?'56-65':'185-230'}€</td><td>4</td><td>Oui</td></tr>
<tr><td>Uber / Bolt</td><td>${airport==='cdg'?'40-75':'100-190'}€</td><td>4</td><td>Oui</td></tr>
<tr><td>VTC premium (Blacklane)</td><td>${airport==='cdg'?'90-140':'180-250'}€</td><td>3</td><td>Oui</td></tr>
${airport==='beauvais'?'<tr><td>Navette bus (Aérobus)</td><td>17,90€/pers</td><td>50</td><td>Non (Porte Maillot)</td></tr>':'<tr><td>RER B</td><td>14€/pers</td><td>Illimité</td><td>Non (gare)</td></tr>'}
</table>

<h2>Informations pratiques : trajet ${cn} → ${as}</h2>
<ul>
<li><strong>Distance :</strong> environ ${dist} km</li>
<li><strong>Durée estimée :</strong> ${time} minutes (selon trafic)</li>
<li><strong>Zone tarifaire :</strong> ${zone.label}</li>
<li><strong>Code postal :</strong> ${commune[4]}</li>
<li><strong>Département :</strong> ${commune[2]}</li>
</ul>

${faqFr(cn, as, price, dist, time)}

</div></div>`;
}

function enContent(commune, airport, price, dist, time) {
    const cn = commune[1], an = AIRPORTS[airport].en, as = AIRPORTS[airport].nameShort;
    const zone = ZONES[commune[3]];
    const ppPerson = Math.round(price / 7 * 100) / 100;

    return `
<div class="content"><div class="container">

<h2>Your ${cn} ↔ ${an} transfer</h2>
<p>Enjoy a private transfer between <strong>${cn}</strong> and <strong>${an}</strong> in a 7-seat vehicle for only <strong>${price}€</strong>. Our professional driver picks you up directly at your address and drops you at the airport (or vice versa), with all your luggage. Simple, comfortable, and at the best price.</p>

<h2>Why choose 01 Transfert Aéroport from ${cn}?</h2>
<ul>
<li><strong>Fixed price guaranteed:</strong> ${price}€ all-inclusive, no meter or surge pricing</li>
<li><strong>7-seat vehicle:</strong> perfect for families and groups, at the price of a 4-seat taxi</li>
<li><strong>Door-to-door:</strong> pickup at your address in ${cn} (${commune[4]})</li>
<li><strong>${dist} km in ${time} min</strong> approximately — direct route, no stops</li>
<li><strong>Only ${ppPerson.toFixed(2)}€ per person</strong> with 7 passengers — cheaper than the RER!</li>
<li><strong>WhatsApp confirmation</strong> with driver name and license plate</li>
<li><strong>Flight tracking:</strong> driver adapts to delays, 30 min free waiting time</li>
<li><strong>Free baby seats</strong> on request — perfect for family travel</li>
</ul>

<h2>Prices: ${cn} ↔ Paris airports</h2>
<table>
<tr><th>Route</th><th>7-seat van price</th><th>Per person (7 pax)</th></tr>
<tr><td>${cn} ↔ CDG</td><td class="highlight">${zone.cdg}€</td><td>${(zone.cdg/7).toFixed(2)}€</td></tr>
<tr><td>${cn} ↔ Beauvais</td><td class="highlight">${zone.beauvais}€</td><td>${(zone.beauvais/7).toFixed(2)}€</td></tr>
</table>

<h2>Price comparison: ${cn} → ${as}</h2>
<table>
<tr><th>Transport</th><th>Price</th><th>Max passengers</th><th>Door-to-door</th></tr>
<tr><td class="highlight">01 Transfert (7-seat van)</td><td class="highlight">${price}€</td><td>7</td><td>Yes</td></tr>
<tr><td>Taxi</td><td>${airport==='cdg'?'56-65':'185-230'}€</td><td>4</td><td>Yes</td></tr>
<tr><td>Uber / Bolt</td><td>${airport==='cdg'?'40-75':'100-190'}€</td><td>4</td><td>Yes</td></tr>
<tr><td>Premium VTC (Blacklane)</td><td>${airport==='cdg'?'90-140':'180-250'}€</td><td>3</td><td>Yes</td></tr>
</table>

${faqEn(cn, as, price, dist, time)}

</div></div>`;
}

function esContent(commune, airport, price, dist, time) {
    const cn = commune[1], an = AIRPORTS[airport].es, as = AIRPORTS[airport].nameShort;
    const zone = ZONES[commune[3]];

    return `
<div class="content"><div class="container">

<h2>Su traslado ${cn} ↔ ${an}</h2>
<p>Disfrute de un traslado privado entre <strong>${cn}</strong> y el <strong>${an}</strong> en una furgoneta de 7 plazas por solo <strong>${price}€</strong>. Nuestro conductor profesional le recoge directamente en su dirección.</p>

<h2>¿Por qué elegir 01 Transfert Aéroport desde ${cn}?</h2>
<ul>
<li><strong>Precio fijo garantizado:</strong> ${price}€ todo incluido</li>
<li><strong>Furgoneta 7 plazas:</strong> ideal para familias y grupos</li>
<li><strong>Puerta a puerta:</strong> recogida en ${cn} (${commune[4]})</li>
<li><strong>${dist} km en ${time} min</strong> aproximadamente</li>
<li><strong>Confirmación WhatsApp</strong> con nombre del conductor</li>
<li><strong>Sillas de bebé gratis</strong> bajo petición</li>
</ul>

<h2>Precios: ${cn} ↔ aeropuertos de París</h2>
<table>
<tr><th>Ruta</th><th>Precio furgoneta 7 plazas</th><th>Por persona (7 pax)</th></tr>
<tr><td>${cn} ↔ CDG</td><td class="highlight">${zone.cdg}€</td><td>${(zone.cdg/7).toFixed(2)}€</td></tr>
<tr><td>${cn} ↔ Beauvais</td><td class="highlight">${zone.beauvais}€</td><td>${(zone.beauvais/7).toFixed(2)}€</td></tr>
</table>

${faqEs(cn, as, price)}

</div></div>`;
}

function deContent(commune, airport, price, dist, time) {
    const cn = commune[1], an = AIRPORTS[airport].de, as = AIRPORTS[airport].nameShort;
    const zone = ZONES[commune[3]];

    return `
<div class="content"><div class="container">

<h2>Ihr Transfer ${cn} ↔ ${an}</h2>
<p>Genießen Sie einen privaten Transfer zwischen <strong>${cn}</strong> und dem <strong>${an}</strong> in einem 7-Sitzer-Van für nur <strong>${price}€</strong>. Unser professioneller Fahrer holt Sie direkt an Ihrer Adresse ab.</p>

<h2>Warum 01 Transfert Aéroport ab ${cn}?</h2>
<ul>
<li><strong>Festpreis garantiert:</strong> ${price}€ all-inclusive</li>
<li><strong>7-Sitzer-Van:</strong> ideal für Familien und Gruppen</li>
<li><strong>Tür-zu-Tür:</strong> Abholung in ${cn} (${commune[4]})</li>
<li><strong>${dist} km in ${time} Min</strong> ungefähr</li>
<li><strong>WhatsApp-Bestätigung</strong> mit Fahrername</li>
<li><strong>Kostenlose Kindersitze</strong> auf Anfrage</li>
</ul>

<h2>Preise: ${cn} ↔ Pariser Flughäfen</h2>
<table>
<tr><th>Strecke</th><th>7-Sitzer-Preis</th><th>Pro Person (7 Pax)</th></tr>
<tr><td>${cn} ↔ CDG</td><td class="highlight">${zone.cdg}€</td><td>${(zone.cdg/7).toFixed(2)}€</td></tr>
<tr><td>${cn} ↔ Beauvais</td><td class="highlight">${zone.beauvais}€</td><td>${(zone.beauvais/7).toFixed(2)}€</td></tr>
</table>

${faqDe(cn, as, price)}

</div></div>`;
}

function itContent(commune, airport, price, dist, time) {
    const cn = commune[1], an = 'Aeroporto ' + AIRPORTS[airport].nameShort, as = AIRPORTS[airport].nameShort;
    const zone = ZONES[commune[3]];
    return `
<div class="content"><div class="container">
<h2>Il vostro trasferimento ${cn} ↔ ${an}</h2>
<p>Godetevi un trasferimento privato tra <strong>${cn}</strong> e l'<strong>${an}</strong> in un van da 7 posti per soli <strong>${price}€</strong>. Il nostro autista professionista vi preleva direttamente al vostro indirizzo.</p>
<h2>Perché scegliere 01 Transfert Aéroport da ${cn}?</h2>
<ul>
<li><strong>Prezzo fisso garantito:</strong> ${price}€ tutto incluso</li>
<li><strong>Van 7 posti:</strong> ideale per famiglie e gruppi</li>
<li><strong>Porta a porta:</strong> prelievo a ${cn} (${commune[4]})</li>
<li><strong>${dist} km in ${time} min</strong> circa</li>
<li><strong>Conferma WhatsApp</strong> con nome dell'autista</li>
<li><strong>Seggiolini gratuiti</strong> su richiesta</li>
</ul>
<h2>Prezzi: ${cn} ↔ aeroporti di Parigi</h2>
<table>
<tr><th>Percorso</th><th>Prezzo van 7 posti</th><th>Per persona (7 pax)</th></tr>
<tr><td>${cn} ↔ CDG</td><td class="highlight">${zone.cdg}€</td><td>${(zone.cdg/7).toFixed(2)}€</td></tr>
<tr><td>${cn} ↔ Beauvais</td><td class="highlight">${zone.beauvais}€</td><td>${(zone.beauvais/7).toFixed(2)}€</td></tr>
</table>
${faqIt(cn, as, price)}
</div></div>`;
}

function ptContent(commune, airport, price, dist, time) {
    const cn = commune[1], an = 'Aeroporto ' + AIRPORTS[airport].nameShort, as = AIRPORTS[airport].nameShort;
    const zone = ZONES[commune[3]];
    return `
<div class="content"><div class="container">
<h2>Seu transfer ${cn} ↔ ${an}</h2>
<p>Aproveite um transfer privado entre <strong>${cn}</strong> e o <strong>${an}</strong> em van de 7 lugares por apenas <strong>${price}€</strong>. Nosso motorista profissional busca você diretamente no seu endereço.</p>
<h2>Por que escolher 01 Transfert Aéroport de ${cn}?</h2>
<ul>
<li><strong>Preço fixo garantido:</strong> ${price}€ tudo incluído</li>
<li><strong>Van 7 lugares:</strong> ideal para famílias e grupos</li>
<li><strong>Porta a porta:</strong> busca em ${cn} (${commune[4]})</li>
<li><strong>${dist} km em ${time} min</strong> aproximadamente</li>
<li><strong>Confirmação WhatsApp</strong> com nome do motorista</li>
<li><strong>Cadeirinhas grátis</strong> sob pedido</li>
</ul>
<h2>Preços: ${cn} ↔ aeroportos de Paris</h2>
<table>
<tr><th>Rota</th><th>Preço van 7 lugares</th><th>Por pessoa (7 pax)</th></tr>
<tr><td>${cn} ↔ CDG</td><td class="highlight">${zone.cdg}€</td><td>${(zone.cdg/7).toFixed(2)}€</td></tr>
<tr><td>${cn} ↔ Beauvais</td><td class="highlight">${zone.beauvais}€</td><td>${(zone.beauvais/7).toFixed(2)}€</td></tr>
</table>
${faqPt(cn, as, price)}
</div></div>`;
}

// ==================== FAQ GENERATORS ====================

function faqFr(cn, as, price, dist, time) {
    const items = [
        [`Combien coûte un transfert ${cn} ${as} ?`, `Le transfert ${cn} ↔ ${as} coûte ${price}€ en van privé 7 places. C'est un prix fixe par véhicule, tout compris : jusqu'à 7 passagers et tous les bagages. Pas de supplément nuit ni jour férié.`],
        [`Combien de temps dure le trajet ${cn} → ${as} ?`, `Le trajet ${cn} vers ${as} dure environ ${time} minutes pour ${dist} km, selon les conditions de trafic. Votre chauffeur optimise l'itinéraire en temps réel.`],
        [`Comment réserver un transfert depuis ${cn} ?`, `Réservez en 2 minutes sur notre site ou par WhatsApp au ${PHONE}. Vous recevez une confirmation immédiate avec le nom de votre chauffeur et sa plaque d'immatriculation.`],
        [`Est-ce moins cher qu'un taxi ${cn} ${as} ?`, `Oui ! Notre van 7 places coûte ${price}€ pour le véhicule entier, soit ${(price/7).toFixed(2)}€ par personne si vous êtes 7. Un taxi standard ne prend que 4 passagers pour un prix similaire.`],
        [`Que se passe-t-il si mon vol est en retard ?`, `Votre chauffeur suit votre vol en temps réel. En cas de retard, il adapte automatiquement l'heure d'arrivée. 30 minutes d'attente gratuite sont incluses après l'atterrissage.`],
        [`Proposez-vous des sièges bébé ?`, `Oui, les sièges bébé et rehausseurs sont disponibles gratuitement sur demande. Précisez-le lors de la réservation ou par WhatsApp.`],
    ];
    return faqBlock(items);
}

function faqEn(cn, as, price, dist, time) {
    const items = [
        [`How much does a ${cn} to ${as} transfer cost?`, `The ${cn} ↔ ${as} transfer costs ${price}€ for a private 7-seat van. Fixed price per vehicle, all-inclusive: up to 7 passengers and all luggage. No night or holiday surcharge.`],
        [`How long is the ${cn} → ${as} journey?`, `The journey from ${cn} to ${as} takes approximately ${time} minutes for ${dist} km, depending on traffic. Your driver optimizes the route in real-time.`],
        [`How do I book a transfer from ${cn}?`, `Book in 2 minutes on our website or via WhatsApp at ${PHONE}. You'll receive instant confirmation with your driver's name and license plate.`],
        [`Is it cheaper than a taxi from ${cn} to ${as}?`, `Yes! Our 7-seat van costs ${price}€ for the entire vehicle, that's ${(price/7).toFixed(2)}€ per person with 7 passengers. A standard taxi only takes 4 passengers for a similar price.`],
        [`What if my flight is delayed?`, `Your driver tracks your flight in real-time. In case of delay, the pickup time is automatically adjusted. 30 minutes of free waiting time are included after landing.`],
    ];
    return faqBlock(items);
}

function faqEs(cn, as, price) {
    const items = [
        [`¿Cuánto cuesta un traslado ${cn} ${as}?`, `El traslado ${cn} ↔ ${as} cuesta ${price}€ en furgoneta privada de 7 plazas. Precio fijo por vehículo, todo incluido.`],
        [`¿Cómo reservar un traslado desde ${cn}?`, `Reserve en 2 minutos en nuestra web o por WhatsApp al ${PHONE}. Confirmación instantánea.`],
        [`¿Qué pasa si mi vuelo se retrasa?`, `Su conductor sigue su vuelo en tiempo real. 30 minutos de espera gratuita incluidos.`],
    ];
    return faqBlock(items);
}

function faqDe(cn, as, price) {
    const items = [
        [`Was kostet ein Transfer ${cn} ${as}?`, `Der Transfer ${cn} ↔ ${as} kostet ${price}€ im privaten 7-Sitzer-Van. Festpreis pro Fahrzeug, alles inklusive.`],
        [`Wie buche ich einen Transfer ab ${cn}?`, `Buchen Sie in 2 Minuten auf unserer Website oder per WhatsApp unter ${PHONE}. Sofortige Bestätigung.`],
        [`Was passiert bei Flugverspätung?`, `Ihr Fahrer verfolgt Ihren Flug in Echtzeit. 30 Minuten kostenlose Wartezeit inklusive.`],
    ];
    return faqBlock(items);
}

function faqIt(cn, as, price) {
    const items = [
        [`Quanto costa un trasferimento ${cn} ${as}?`, `Il trasferimento ${cn} ↔ ${as} costa ${price}€ in van privato da 7 posti. Prezzo fisso per veicolo, tutto incluso.`],
        [`Come prenotare un trasferimento da ${cn}?`, `Prenota in 2 minuti sul nostro sito o via WhatsApp al ${PHONE}. Conferma istantanea.`],
        [`Cosa succede se il mio volo è in ritardo?`, `Il vostro autista segue il volo in tempo reale. 30 minuti di attesa gratuita inclusi.`],
    ];
    return faqBlock(items);
}

function faqPt(cn, as, price) {
    const items = [
        [`Quanto custa um transfer ${cn} ${as}?`, `O transfer ${cn} ↔ ${as} custa ${price}€ em van privado de 7 lugares. Preço fixo por veículo, tudo incluído.`],
        [`Como reservar um transfer de ${cn}?`, `Reserve em 2 minutos no nosso site ou via WhatsApp ${PHONE}. Confirmação instantânea.`],
        [`O que acontece se meu voo atrasar?`, `Seu motorista acompanha o voo em tempo real. 30 minutos de espera gratuita incluídos.`],
    ];
    return faqBlock(items);
}

function faqBlock(items) {
    let html = `<div class="faq"><h2>Questions fréquentes</h2>`;
    let schema = [];
    for (const [q, a] of items) {
        html += `<div class="faq-item"><div class="faq-q">${esc(q)}</div><div class="faq-a">${esc(a)}</div></div>`;
        schema.push({ "@type": "Question", "name": q, "acceptedAnswer": { "@type": "Answer", "text": a } });
    }
    html += `</div>`;
    html += `<script type="application/ld+json">${JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":schema})}</script>`;
    return html;
}

// ==================== RELATED LINKS ====================

function relatedLinks(commune, airport, lang, currentSlug) {
    const cn = commune[0], cnName = commune[1];
    const types = PAGE_TYPES[lang];
    let html = `<div class="related">`;
    for (const t of types) {
        if (t.slug === currentSlug) continue;
        const href = `../${cn}/${lang}-${t.slug}-${airport}.html`;
        const label = t.slug.replace(/-/g, ' ');
        html += `<a href="${href}">${label}</a>`;
    }
    // Link to other airport
    const otherAp = airport === 'cdg' ? 'beauvais' : 'cdg';
    html += `<a href="../${cn}/${lang}-${currentSlug}-${otherAp}.html">${cnName} → ${AIRPORTS[otherAp].nameShort}</a>`;
    html += `</div>`;
    return html;
}

// ==================== CTA BOX ====================

function ctaBox(lang, commune, airport, price) {
    const cn = commune[1];
    const waText = encodeURIComponent(`Bonjour, je souhaite réserver un transfert ${cn} → ${AIRPORTS[airport].nameShort}.`);
    const labels = {
        fr: { title: `Réservez votre transfert ${cn} maintenant`, sub: `Van privé 7 places — ${price}€ prix fixe`, btn1: 'Réserver en ligne', btn2: 'Réserver par WhatsApp' },
        en: { title: `Book your ${cn} transfer now`, sub: `Private 7-seat van — ${price}€ fixed price`, btn1: 'Book online', btn2: 'Book via WhatsApp' },
        es: { title: `Reserve su traslado ${cn} ahora`, sub: `Furgoneta privada 7 plazas — ${price}€`, btn1: 'Reservar online', btn2: 'Reservar por WhatsApp' },
        de: { title: `Buchen Sie Ihren ${cn} Transfer jetzt`, sub: `Privater 7-Sitzer — ${price}€ Festpreis`, btn1: 'Online buchen', btn2: 'Per WhatsApp buchen' },
        it: { title: `Prenota il tuo trasferimento ${cn} ora`, sub: `Van privato 7 posti — ${price}€ prezzo fisso`, btn1: 'Prenota online', btn2: 'Prenota via WhatsApp' },
        pt: { title: `Reserve seu transfer ${cn} agora`, sub: `Van privado 7 lugares — ${price}€ preço fixo`, btn1: 'Reservar online', btn2: 'Reservar via WhatsApp' },
    }[lang];
    return `<div class="cta-box">
<h3>${labels.title}</h3>
<p>${labels.sub}</p>
<div class="ctas">
<a href="../../index.html#booking" class="cta-main">${labels.btn1}</a>
<a href="${WA_LINK}?text=${waText}" class="cta-wa" target="_blank" rel="noopener">${labels.btn2}</a>
</div></div>`;
}

// ==================== PAGE BUILDER ====================

function buildPage(commune, airport, pageType, lang) {
    const zone = ZONES[commune[3]];
    const price = zone[airport];
    const distIdx = airport === 'cdg' ? 5 : 6;
    const timeIdx = airport === 'cdg' ? 7 : 8;
    const dist = commune[distIdx];
    const time = commune[timeIdx];
    const cn = commune[1];
    const as = AIRPORTS[airport].nameShort;
    const af = AIRPORTS[airport].nameFull;

    const rpl = (s) => s.replace(/{commune}/g, cn).replace(/{airport}/g, as).replace(/{airport_full}/g, af).replace(/{price}/g, price);

    const title = rpl(pageType.title);
    const desc = rpl(pageType.desc);
    const h1 = rpl(pageType.h1);
    const slug = commune[0];
    const canonical = `${SITE_URL}/pages/${slug}/${lang}-${pageType.slug}-${airport}.html`;

    let content;
    switch(lang) {
        case 'fr': content = frContent(commune, airport, price, dist, time); break;
        case 'en': content = enContent(commune, airport, price, dist, time); break;
        case 'es': content = esContent(commune, airport, price, dist, time); break;
        case 'de': content = deContent(commune, airport, price, dist, time); break;
        case 'it': content = itContent(commune, airport, price, dist, time); break;
        case 'pt': content = ptContent(commune, airport, price, dist, time); break;
    }

    const heroLabel = {
        fr: 'Van privé 7 places — Prix fixe garanti',
        en: 'Private 7-seat van — Fixed price guaranteed',
        es: 'Furgoneta privada 7 plazas — Precio fijo',
        de: 'Privater 7-Sitzer — Festpreis garantiert',
        it: 'Van privato 7 posti — Prezzo fisso garantito',
        pt: 'Van privado 7 lugares — Preço fixo garantido'
    }[lang];

    const waText = encodeURIComponent(`Bonjour, je souhaite réserver un transfert ${cn} → ${as}.`);

    const html = `${htmlHead(title, desc, canonical, lang)}
<body>
${nav(lang)}
${breadcrumb(lang, cn, as, pageType.slug)}
<section class="hero-seo">
<div class="container">
<div class="tag">${heroLabel}</div>
<h1>${h1}</h1>
<div class="sub">${cn} (${commune[4]}) — ${dist} km, ~${time} min</div>
<div class="price-badge"><span class="amount">${price}</span><span class="eur">€</span><span class="label">/ véhicule<br>7 places</span></div>
<div class="ctas">
<a href="../../index.html#booking" class="cta-main">${{fr:'Réserver en ligne',en:'Book online',es:'Reservar',de:'Buchen',it:'Prenota',pt:'Reservar'}[lang]}</a>
<a href="${WA_LINK}?text=${waText}" class="cta-wa" target="_blank" rel="noopener">WhatsApp</a>
</div>
</div>
</section>
${content}
<div class="container">
${ctaBox(lang, commune, airport, price)}
<h3>${{fr:'Pages associées',en:'Related pages',es:'Páginas relacionadas',de:'Verwandte Seiten',it:'Pagine correlate',pt:'Páginas relacionadas'}[lang]}</h3>
${relatedLinks(commune, airport, lang, pageType.slug)}
</div>
${footer()}
</body></html>`;

    return html;
}

// ==================== GENERATION ====================

function esc(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

function ensureDir(dir) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

console.log('Nettoyage...');
if (fs.existsSync(OUTPUT)) fs.rmSync(OUTPUT, { recursive: true, force: true });
ensureDir(OUTPUT);

let count = 0;
const sitemapEntries = [];
const startTime = Date.now();

for (const commune of COMMUNES) {
    const slug = commune[0];
    const dir = path.join(OUTPUT, slug);
    ensureDir(dir);

    for (const airport of Object.keys(AIRPORTS)) {
        for (const lang of Object.keys(PAGE_TYPES)) {
            for (const pageType of PAGE_TYPES[lang]) {
                const filename = `${lang}-${pageType.slug}-${airport}.html`;
                const filepath = path.join(dir, filename);
                const html = buildPage(commune, airport, pageType, lang);
                fs.writeFileSync(filepath, html);

                const url = `${SITE_URL}/pages/${slug}/${filename}`;
                sitemapEntries.push(url);
                count++;

                if (count % 5000 === 0) {
                    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
                    console.log(`  ${count} pages générées (${elapsed}s)...`);
                }
            }
        }
    }
}

// ==================== SITEMAP ====================

console.log('Génération des sitemaps...');

// Split sitemap into chunks of 40000 URLs (Google limit is 50000)
const CHUNK_SIZE = 40000;
const sitemapFiles = [];

for (let i = 0; i < sitemapEntries.length; i += CHUNK_SIZE) {
    const chunk = sitemapEntries.slice(i, i + CHUNK_SIZE);
    const idx = Math.floor(i / CHUNK_SIZE) + 1;
    const filename = `sitemap-pages-${idx}.xml`;

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    for (const url of chunk) {
        xml += `<url><loc>${url}</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>\n`;
    }
    xml += `</urlset>`;

    fs.writeFileSync(path.join(__dirname, '..', filename), xml);
    sitemapFiles.push(filename);
}

// Sitemap index
let sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
sitemapIndex += `<sitemap><loc>${SITE_URL}/sitemap-main.xml</loc></sitemap>\n`;
for (const f of sitemapFiles) {
    sitemapIndex += `<sitemap><loc>${SITE_URL}/${f}</loc></sitemap>\n`;
}
sitemapIndex += `</sitemapindex>`;
fs.writeFileSync(path.join(__dirname, '..', 'sitemap.xml'), sitemapIndex);

// Main sitemap (homepage + sections)
let mainSitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
mainSitemap += `<url><loc>${SITE_URL}/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>\n`;
mainSitemap += `</urlset>`;
fs.writeFileSync(path.join(__dirname, '..', 'sitemap-main.xml'), mainSitemap);

// Robots.txt
const robots = `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`;
fs.writeFileSync(path.join(__dirname, '..', 'robots.txt'), robots);

const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
console.log(`\n✅ Terminé !`);
console.log(`   ${count} pages générées en ${totalTime}s`);
console.log(`   ${sitemapFiles.length} sitemap(s) créé(s)`);
console.log(`   Communes: ${COMMUNES.length}`);
console.log(`   Langues: FR (${PAGE_TYPES.fr.length} types), EN (${PAGE_TYPES.en.length}), ES (${PAGE_TYPES.es.length}), DE (${PAGE_TYPES.de.length})`);
console.log(`   Output: ${OUTPUT}`);

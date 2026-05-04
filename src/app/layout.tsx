import type { Metadata, Viewport } from "next";
import { Anton, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans-instance",
});

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display-instance",
});

const cormorant = Cormorant_Garamond({
  weight: ["400", "500"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif-instance",
});

export const viewport: Viewport = {
  themeColor: "#0A0907",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://01-transfert-aeroport.fr"),
  title: {
    default: "01 Transfert Aéroport — Van privé 7 places · CDG · Beauvais ↔ Paris",
    template: "%s · 01 Transfert Aéroport",
  },
  description:
    "Transfert privé 7 places vers CDG et Beauvais. Toyota Highlander, prix fixe annoncé avant trajet, suivi de vol, paiement CB sécurisé. Val d'Oise dès 60 €, Paris dès 70 €.",
  keywords: [
    "transfert aéroport Paris",
    "navette CDG Paris",
    "VTC aéroport",
    "van privé 7 places",
    "transfert Beauvais Paris",
    "chauffeur privé Paris",
  ],
  authors: [{ name: "01 Transfert Aéroport" }],
  creator: "01 Transfert Aéroport",
  publisher: "01 Transfert Aéroport",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, "max-image-preview": "large" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://01-transfert-aeroport.fr",
    title: "01 Transfert Aéroport — Van privé 7 places · Prix fixe",
    description:
      "Transfert VIP CDG · Beauvais. Toyota Highlander 7 places · Wifi · Eau fraîche · Suivi de vol · Prix fixe annoncé. Point.",
    siteName: "01 Transfert Aéroport",
    images: [
      {
        url: "/img/paris-hero.jpg",
        width: 1600,
        height: 1067,
        alt: "Pont Alexandre III à Paris au crépuscule",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "01 Transfert Aéroport — Van privé 7 places",
    description: "Transfert VIP CDG · Beauvais. Prix fixe annoncé. Point.",
    images: ["/img/paris-hero.jpg"],
  },
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%230A0907' rx='6'/%3E%3Ctext x='16' y='22' font-family='Anton,sans-serif' font-size='18' fill='%23F5C842' text-anchor='middle'%3E01%3C/text%3E%3C/svg%3E",
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${anton.variable} ${cormorant.variable} ${inter.variable}`}>
      <body>
        {children}

        {/* Schema.org TaxiService — données structurées éditoriales */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TaxiService",
              name: "01 Transfert Aéroport",
              alternateName: "01 Transfert",
              description:
                "Service de transfert aéroport en van privé 7 places. CDG et Beauvais. Prix fixe annoncé avant trajet.",
              url: "https://01-transfert-aeroport.fr",
              telephone: "+33651161440",
              email: "contact@01-transfert-aeroport.fr",
              image: "https://01-transfert-aeroport.fr/img/paris-hero.jpg",
              address: {
                "@type": "PostalAddress",
                streetAddress: "9 Rue d'Estienne d'Orves",
                addressLocality: "Sarcelles",
                postalCode: "95200",
                addressCountry: "FR",
              },
              areaServed: [
                { "@type": "City", name: "Paris" },
                { "@type": "AdministrativeArea", name: "Île-de-France" },
                { "@type": "Airport", name: "Charles de Gaulle Airport", iataCode: "CDG" },
                { "@type": "Airport", name: "Beauvais-Tillé Airport", iataCode: "BVA" },
              ],
              priceRange: "60€-110€",
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                opens: "00:00",
                closes: "23:59",
              },
              currenciesAccepted: "EUR",
              paymentAccepted: "Carte bancaire, Espèces",
            }),
          }}
        />
      </body>
    </html>
  );
}

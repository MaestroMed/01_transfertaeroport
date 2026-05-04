import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Booking } from "@/components/sections/Booking";
import { Pricing } from "@/components/sections/Pricing";
import { Comparison } from "@/components/sections/Comparison";
import { Vehicle } from "@/components/sections/Vehicle";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { FAQ } from "@/components/sections/FAQ";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <Booking />
        <Pricing />
        <Comparison />
        <Vehicle />
        <HowItWorks />
        <FAQ />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

import SolamoHeader from "@/components/SolamoHeader";
import Hero from "@/components/Hero";
import WhyFounder from "@/components/WhyFounder";
import MarqueeSection from "@/components/MarqueeSection";
import ProductSection from "@/components/ProductSection";
import TrustedBrands from "@/components/TrustedBrands";
import WhyChoose from "@/components/WhyChoose";
import CtaBanner from "@/components/CtaBanner";
import Testimonials from "@/components/Testimonials";
import SolamoFooter from "@/components/SolamoFooter";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import ServiceSection from "@/components/ServiceSection";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <SolamoHeader />
      <Hero />
      <WhyFounder />
      <ServiceSection />
      <MarqueeSection />
      <ProductSection />
      <TrustedBrands />
      <WhyChoose />
      <CtaBanner />
      <Testimonials />
      <SolamoFooter />
      <WhatsAppFloat />
    </main>
  );
}

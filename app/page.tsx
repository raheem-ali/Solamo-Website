import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhyFounder from "@/components/WhyFounder";
import MarqueeSection from "@/components/MarqueeSection";
import ProductSection from "@/components/ProductSection";
import TrustedBrands from "@/components/TrustedBrands";
import WhyChoose from "@/components/WhyChoose";
import CtaBanner from "@/components/CtaBanner";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import ServiceSection from "@/components/ServiceSection";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <Hero />
      <WhyFounder />
      <ServiceSection />
      <MarqueeSection />
      <ProductSection />
      <TrustedBrands />
      <WhyChoose />
      <CtaBanner />
      <Testimonials />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}

import SolamoHeader from "@/components/SolamoHeader";
import SolamoHero from "@/components/SolamoHero";
import SolamoInstallationReminder from "@/components/SolamoInstallationReminder";
import BrandAdBanner from "@/components/BrandAdBanner";
import SolamoFlashdeals from "@/components/Solamoflashdeals";
import SolamoMarquee from "@/components/SolamoMarquee";
import SolamoProductCarousel from "@/components/SolamoProductCarousel";
import SolamoBrands from "@/components/SolamoBrands";
import SolamoWhySolamo from "@/components/SolamoWhySolamo";
import SolamoCtaBanner from "@/components/SolamoCtaBanner";
import SolamoTestimonials from "@/components/SolamoTestinomials";
import SolamoFooter from "@/components/SolamoFooter";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function SolamoHomePage() {
  return (
    <main className="min-h-screen bg-gray-100">
      <SolamoHeader />
      <SolamoHero /> {/* Hero */}
      <SolamoInstallationReminder />{" "}
      {/* Reminder 1: Between Hero and FlashDeals */}
      <BrandAdBanner video="/ads/banner-1.mp4.mp4" /> {/* Ad Slot 1 */}
      <SolamoFlashdeals /> {/* noon: Deals & Offers */}
      <SolamoMarquee /> {/* MarqueeSection */}
      <SolamoProductCarousel
        title="Batteries"
        subtitle="Solar batteries & energy storage"
        categoryFilter="Batteries"
        badgeText="BATTERY"
        viewAllHref="/batteries"
      />
      <SolamoProductCarousel
        title="Inverters"
        subtitle="Hybrid & on-grid solar inverters"
        categoryFilter="Inverters"
        badgeText="INVERTER"
        viewAllHref="category/inverters"
      />
      <BrandAdBanner video="/ads/banner-1.mp4.mp4" /> {/* Ad Slot: After Inverters */}
      <SolamoProductCarousel
        title="Solar Panels"
        subtitle="High-efficiency photovoltaic modules"
        categoryFilter="Solar Panel"
        badgeText="PANEL"
        viewAllHref="category/solar-panels"
      />     
      <SolamoProductCarousel
        title="Power Banks"
        subtitle="DC breakers, SPDs & electrical safety"
        categoryFilter="Power Banks"
        badgeText="BREAKER"
        viewAllHref="category/power-banks"
      />
      <BrandAdBanner video="/ads/banner-2.mp4.mp4" /> {/* Ad Slot: After Fire Extinguisher */}
      <SolamoBrands /> {/* noon: Brand/Store highlights (with product counts) */}
      <SolamoWhySolamo /> {/* WhyChoose + ServiceSection (combined) */}
      <SolamoCtaBanner /> {/* CtaBanner */}
      <SolamoTestimonials /> {/* Testimonials */}
      <SolamoInstallationReminder variant="homepage" />{" "}
      {/* Reminder 2: Between Testimonials and Footer */}
      <BrandAdBanner video="/ads/banner-2.mp4.mp4" /> {/* Ad Slot 2 */}
      <SolamoFooter /> {/* Footer */}
      <WhatsAppFloat />{" "}
      {/* unchanged — floating button, no Noon redesign needed */}
    </main>
  );
}

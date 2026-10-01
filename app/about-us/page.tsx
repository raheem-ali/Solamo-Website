import AboutSection from "@/components/AboutSection";
import SolamoHeader from "@/components/SolamoHeader";
import SolamoFooter from "@/components/SolamoFooter";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <SolamoHeader />
      <AboutSection />
      <SolamoFooter />
      <WhatsAppFloat />
    </main>
  );
}

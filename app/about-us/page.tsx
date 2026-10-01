import AboutSection from "@/components/AboutSection";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <AboutSection />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}

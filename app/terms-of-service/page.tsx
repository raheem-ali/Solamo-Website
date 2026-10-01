import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TermsOfServiceContent from "@/components/TermsOfServiceContent";

export const metadata = {
  title: "Terms of Service - Solamo Energy",
  description:
    "Terms of Service for Solamo Energy Solutions regarding solar engineering, installation, maintenance, quotations, and pricing.",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <TermsOfServiceContent />
      <Footer />
    </div>
  );
}

import SolamoHeader from "@/components/SolamoHeader";
import SolamoFooter from "@/components/SolamoFooter";
import TermsOfServiceContent from "@/components/TermsOfServiceContent";

export const metadata = {
  title: "Terms of Service - Solamo Energy",
  description:
    "Terms of Service for Solamo Energy Solutions regarding solar engineering, installation, maintenance, quotations, and pricing.",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-white">
      <SolamoHeader />
      <TermsOfServiceContent />
      <SolamoFooter />
    </div>
  );
}

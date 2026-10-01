import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PrivacyPolicyContent from "@/components/PrivacyPolicyContent";

export const metadata = {
  title: "Privacy Policy - Solamo Energy",
  description:
    "Solamo Energy's commitment to maintaining data privacy and security for residential and industrial clients.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white text-[#172217] font-['Albert_Sans',sans-serif]">
      <Header />

      <PrivacyPolicyContent />

      <Footer />
    </div>
  );
}

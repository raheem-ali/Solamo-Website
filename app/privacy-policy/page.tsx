import SolamoHeader from "@/components/SolamoHeader";
import SolamoFooter from "@/components/SolamoFooter";
import PrivacyPolicyContent from "@/components/PrivacyPolicyContent";

export const metadata = {
  title: "Privacy Policy - Solamo Energy",
  description:
    "Solamo Energy's commitment to maintaining data privacy and security for residential and industrial clients.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white text-[#172217] font-['Albert_Sans',sans-serif]">
      <SolamoHeader />

      <PrivacyPolicyContent />

      <SolamoFooter />
    </div>
  );
}

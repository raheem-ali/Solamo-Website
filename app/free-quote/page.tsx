import SolamoHeader from "@/components/SolamoHeader";
import SolamoFooter from "@/components/SolamoFooter";
import FreeQuoteClient from "@/components/FreeQuoteClient";

export const metadata = {
  title: "Free Solar Quote in Karachi | Solamo Energy",
  description:
    "Request a free solar quote for your residential or commercial property in Karachi and across Pakistan.",
};

export default function FreeQuotePage() {
  return (
    <div className="min-h-screen bg-white">
      <SolamoHeader />

      <FreeQuoteClient />

      <SolamoFooter />
    </div>
  );
}

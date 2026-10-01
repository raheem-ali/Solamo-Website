import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FreeQuoteClient from "@/components/FreeQuoteClient";

export const metadata = {
  title: "Free Solar Quote in Karachi | Solamo Energy",
  description:
    "Request a free solar quote for your residential or commercial property in Karachi and across Pakistan.",
};

export default function FreeQuotePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <FreeQuoteClient />

      <Footer />
    </div>
  );
}

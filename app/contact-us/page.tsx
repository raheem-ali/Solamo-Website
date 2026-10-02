import React from "react";
import SolamoHeader from "@/components/SolamoHeader";
import SolamoFooter from "@/components/SolamoFooter";
import ContactSection from "@/components/ContactSection";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#F8F9F5] flex flex-col">
      <SolamoHeader />
      <main className="flex-grow">
        <ContactSection />
      </main>
      <SolamoFooter />
    </div>
  );
}

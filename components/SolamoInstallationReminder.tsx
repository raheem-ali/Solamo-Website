import React from "react";
import Link from "next/link";
import { MessageCircle, FileText, Wrench } from "lucide-react";

interface SolamoInstallationReminderProps {
  copy?: string;
  variant?: "homepage" | "cart";
}

export default function SolamoInstallationReminder({
  copy,
  variant = "homepage",
}: SolamoInstallationReminderProps) {
  const defaultHomepageCopy =
    "Just here for the equipment? Solamo also handles full installation — get a free site visit quote before you decide.";
  const defaultCartCopy =
    "Buying equipment only? Solamo also handles full installation, ask for a free quote before you checkout.";

  const textToDisplay =
    copy || (variant === "cart" ? defaultCartCopy : defaultHomepageCopy);

  if (variant === "cart") {
    return (
      <div className="bg-[#F7FEE7] border-2 border-[#84CC16]/60 rounded-2xl p-5 shadow-sm relative overflow-hidden flex flex-col items-start gap-4">
        {/* Background subtle decoration */}
        <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-[#84CC16]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col items-start gap-2 text-left w-full">
          <div className="w-10 h-10 rounded-xl bg-[#84CC16] text-black flex items-center justify-center shrink-0 shadow-sm">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <span className="inline-block text-xs font-bold tracking-wider uppercase text-[#4D7C0F] mb-1">
              Professional Service Available
            </span>
            <p className="text-gray-900 font-medium text-sm leading-relaxed">
              {textToDisplay}
            </p>
          </div>
        </div>

        <div className="flex flex-col w-full gap-2.5">
          <Link
            href="/free-quote"
            className="w-full inline-flex items-center justify-center gap-2 bg-[#84CC16] hover:bg-[#65A30D] text-black font-bold px-4 py-2.5 rounded-xl transition shadow-sm text-sm"
          >
            <FileText className="w-4 h-4" />
            Get Free Quote
          </Link>
          <a
            href="https://wa.me/923141349717"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-900 border-2 border-[#84CC16] font-bold px-4 py-2.5 rounded-xl transition shadow-sm text-sm"
          >
            <MessageCircle className="w-4 h-4 text-[#84CC16]" />
            WhatsApp Us
          </a>
        </div>
      </div>
    );
  }

  return (
    <section className="max-w-[1400px] mx-auto px-3 sm:px-5 lg:px-6 xl:px-8 my-8">
      <div className="bg-[#F7FEE7] border-2 border-[#84CC16]/60 rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-6">
        {/* Background subtle decoration */}
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#84CC16]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-start sm:items-center gap-4 text-left">
          <div className="w-12 h-12 rounded-xl bg-[#84CC16] text-black flex items-center justify-center shrink-0 shadow-sm">
            <Wrench className="w-6 h-6" />
          </div>
          <div>
            <span className="inline-block text-xs font-bold tracking-wider uppercase text-[#4D7C0F] mb-1">
              Professional Service Available
            </span>
            <p className="text-gray-900 font-medium text-base sm:text-lg leading-relaxed max-w-3xl">
              {textToDisplay}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0 w-full lg:w-auto justify-end">
          <Link
            href="/free-quote"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-[#84CC16] hover:bg-[#65A30D] text-black font-bold px-6 py-3 rounded-xl transition shadow-sm text-sm"
          >
            <FileText className="w-4 h-4" />
            Get Free Quote
          </Link>
          <a
            href="https://wa.me/923141349717"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-900 border-2 border-[#84CC16] font-bold px-6 py-3 rounded-xl transition shadow-sm text-sm"
          >
            <MessageCircle className="w-4 h-4 text-[#84CC16]" />
            WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}

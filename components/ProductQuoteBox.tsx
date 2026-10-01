import React from "react";
import { Product } from "@/lib/brand-data";

interface ProductQuoteBoxProps {
  product: Product;
}

const Check = ({ text }: { text: string }) => (
  <div className="flex items-center gap-2 text-[12px] text-[#344034]">
    <svg
      className="h-4 w-4 shrink-0 text-[#79B900]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>

    <span>{text}</span>
  </div>
);

export default function ProductQuoteBox({ product }: ProductQuoteBoxProps) {
  const price = product.price ?? 0;
  const hasPrice = price > 0;

  const whatsappUrl = `https://wa.me/923141349717?text=${encodeURIComponent(
    `I am interested in getting a quote for ${product.name}`,
  )}`;

  return (
    <aside
      className="
        font-noon
        lg:sticky
        lg:top-24
        rounded-[8px]
        border
        border-[#e5e8e1]
        bg-white
        text-[#172217]
      "
    >
      {/* Heading */}
      <div className="border-b border-[#e5e8e1] px-4 py-3.5">
        <h2 className="text-[15px] font-bold">Get a Quote</h2>
      </div>

      {/* Price */}
      <div className="px-4 py-3">
        <div className="text-[10px] font-medium uppercase tracking-wide text-[#7e857b]">
          Estimated Price
        </div>

        <div className="mt-1 text-[20px] font-bold leading-7 text-[#172217]">
          {hasPrice ? `Rs ${price.toLocaleString()}` : "Price on Request"}
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 pb-3">
        <a
          href="/free-quote"
          className="
            flex
            h-[42px]
            w-full
            items-center
            justify-center
            rounded-[6px]
            bg-[#79B900]
            text-[12px]
            font-bold
            uppercase
            tracking-wide
            text-white
            transition-colors
            hover:bg-[#5f9200]
          "
        >
          Get Free Quote
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="
            mt-2
            flex
            h-[42px]
            w-full
            items-center
            justify-center
            rounded-[6px]
            border
            border-[#25D366]
            text-[12px]
            font-bold
            uppercase
            tracking-wide
            text-[#128C7E]
            transition-colors
            hover:bg-[#25D366]
            hover:text-white
          "
        >
          WhatsApp Us
        </a>
      </div>

      {/* Trust points */}
      <div className="border-t border-[#e5e8e1] px-4 py-3.5">
        <div className="space-y-2">
          <Check text="Free Site Assessment" />
          <Check text="Professional Installation" />
          <Check text="Certified Solar Team" />
        </div>
      </div>
    </aside>
  );
}

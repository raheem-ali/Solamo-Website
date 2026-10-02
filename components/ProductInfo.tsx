import React from "react";
import { Product, BrandData } from "@/lib/brand-data";

interface ProductInfoProps {
  product: Product;
  brand: BrandData;
}

const Label = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-2 text-[11px] font-medium uppercase tracking-wide text-[#7e857b]">
    {children}
  </div>
);

export default function ProductInfo({ product, brand }: ProductInfoProps) {
  const price = product.price ?? 0;
  const hasPrice = price > 0;

  return (
    <div className="min-w-0 font-noon text-[#172217]">
      {/* Brand */}
      <a
        href="/shop"
        className="
          inline-flex
          items-center
          gap-1
          text-[13px]
          font-semibold
          text-[#4D7C0F]
          hover:underline
        "
      >
        {brand.name}

        <svg
          className="h-3 w-3"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </a>

      {/* Product title */}
      <h1
        className="
          mt-1
          text-[18px]
          font-semibold
          leading-[25px]
          text-[#172217]
          md:text-[19px]
          md:leading-[27px]
        "
      >
        {product.name}
      </h1>

      {/* Price */}
      <div className="mt-4 border-b border-[#e7eae4] pb-4">
        <div className="text-[24px] font-bold leading-8 text-[#172217]">
          {hasPrice ? `Rs ${price.toLocaleString()}` : "Price on Request"}
        </div>

        {hasPrice && (
          <div className="mt-1 text-[11px] text-[#7e857b]">
            Inclusive of all applicable taxes &amp; standard warranty
          </div>
        )}
      </div>

      {/* Explore products */}
      <a
        href="/shop"
        className="
          mt-3
          flex
          min-h-[40px]
          items-center
          justify-between
          rounded-[6px]
          bg-[#f2f9e6]
          px-3
          py-2
          text-[12px]
          transition-colors
          hover:bg-[#e8f3d2]
        "
      >
        <span className="min-w-0 truncate">
          <span className="font-semibold">Explore other products in</span>{" "}
          <span className="font-semibold text-[#4D7C0F]">
            {product.category}
          </span>
        </span>

        <svg
          className="ml-3 h-4 w-4 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </a>

      {/* Service information */}
      <div className="mt-5 border-t border-[#e7eae4] pt-4">
        <Label>Service Information</Label>

        <div
          className="
            flex
            min-h-[42px]
            items-center
            justify-between
            gap-3
            rounded-[6px]
            bg-[#f7fbeF]
            px-3
            py-2.5
            text-[12px]
          "
        >
          <div className="flex min-w-0 items-center gap-2">
            <svg
              className="h-4 w-4 shrink-0 text-[#79B900]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>

            <span className="truncate">
              Professional installation in Karachi
            </span>
          </div>

          <span className="shrink-0 font-semibold text-[#4D7C0F]">
            Free Site Assessment
          </span>
        </div>
      </div>

      {/* Highlights */}
      <div className="mt-5 border-t border-[#e7eae4] pt-4">
        <Label>Highlights</Label>

        <ul className="space-y-1.5 text-[12px] leading-5 text-[#4b554b]">
          <li>
            <span className="mr-2 text-[#79B900]">•</span>
            Brand: {brand.name}
          </li>

          <li>
            <span className="mr-2 text-[#79B900]">•</span>
            Category: {product.category}
          </li>

          <li>
            <span className="mr-2 text-[#79B900]">•</span>
            Availability: In Stock / Ready
          </li>
        </ul>
      </div>
    </div>
  );
}

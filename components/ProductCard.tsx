import Link from "next/link";
import { Product } from "@/lib/brand-data";

interface ProductCardProps {
  // Works with the API-built product from app/shop/page.tsx.
  // `shortDescription` is the product's subtitle from the dashboard.
  product: Product & { shortDescription?: string };
}

export default function ProductCard({ product }: ProductCardProps) {
  const hasPrice = Boolean(product?.price && product.price > 0);

  return (
    <div className="bg-white border border-gray-200 rounded-md p-4 flex flex-col h-full">
      {/* Product image */}
      <div className="flex items-center justify-center h-52 mb-5 w-100">
        <img
          src={
            product?.image ||
            "https://solamoenergy.com/wp-content/uploads/2026/07/default-banner.png"
          }
          alt={product?.name || "Solar Product"}
          className="max-h-full max-w-100 object-cover"
        />
      </div>

      {/* Title */}
      <h3 className="text-[15px] text-gray-900 leading-snug line-clamp-3">
        {product?.name}
      </h3>

      {/* Price row + button, pinned to the bottom so all cards line up */}
      <div className="mt-auto pt-4">
        <div className="flex items-baseline justify-between border-t border-gray-200 pt-3">
          <span className="text-sm font-bold text-gray-900">Price</span>
          <span className="text-xl font-bold text-[#79B900]">
            {hasPrice
              ? `Rs${product.price.toLocaleString("en-US")}`
              : "Price on Request"}
          </span>
        </div>

        <Link
          href={product?.link || "#"}
          className="mt-3 block w-full text-center bg-[#79B900] hover:bg-[#689f00] text-white text-sm font-semibold py-2.5 rounded-md transition-colors"
        >
          See Details
        </Link>
      </div>
    </div>
  );
}
import Link from "next/link";
import { Product } from "@/lib/brand-data";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
      {/* Product Image */}
      <div className="flex-1 flex items-center justify-center mb-4 min-h-[180px]">
        <img
          src={
            product?.image ||
            "https://solamoenergy.com/wp-content/uploads/2026/07/default-banner.png"
          }
          alt={product?.name || "Solar Product"}
          className="max-h-44 w-auto object-contain"
        />
      </div>

      {/* Product Name */}
      <h3 className="font-semibold text-[15px] text-gray-900 mb-3 leading-snug line-clamp-2 min-h-[42px]">
        {product?.name}
      </h3>

      {/* Price + Button */}
      <div className="mt-auto">
        <div className="mb-4">
          <span className="text-sm text-gray-600">Price</span>
          <div className="text-lime-600 font-bold text-xl">
            {product?.price && product.price > 0
              ? `Rs${product.price.toLocaleString()}`
              : "Price on Request"}
          </div>
        </div>

        <Link
          href={product?.link || "#"}
          className="block w-full text-center bg-lime-500 hover:bg-lime-600 text-white py-2.5 rounded-md font-medium transition-colors"
        >
          See Details
        </Link>
      </div>
    </div>
  );
}

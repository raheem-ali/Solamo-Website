import type { Product } from "@/lib/api";
import type { CardProduct } from "@/app/shop/ShopClient";

/** API product -> the shape the shop page and ProductCard use. */
export function toCardProduct(p: Product): CardProduct {
  return {
    id: p.id,
    slug: p.slug,
    link: `/${p.category_slug ?? "shop"}/${p.slug}`,
    name: p.name,
    shortDescription: p.subtitle ?? "",
    price: Number(p.sale_price || p.regular_price || 0),
    regularPrice: Number(p.regular_price),
    salePrice: p.sale_price ? Number(p.sale_price) : null,
    image: p.images[0] ?? "",
    images: p.images,
    category: p.category_name ?? "",
    brand: p.brand_name,
    inStock: p.stock_status === "in_stock",
  };
}
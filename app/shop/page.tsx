import ShopClient, { CardProduct } from "./ShopClient";
import { getAllProducts, getBrands, getCategories } from "@/lib/api";

export const metadata = { title: "Shop | Solamo Energy" };

export default async function ShopPage() {
  const [products, categories, brands] = await Promise.all([
    getAllProducts(),
    getCategories(),
    getBrands(),
  ]);

  // Turn the API shape into the shape the design's ProductCard uses.
  // If ProductCard expects different field names, change them here only.
  const cards: CardProduct[] = products.map((p) => ({
    id: p.id,
    slug: p.slug,
    link: `/shop/${p.slug}`, // ProductCard's "See Details" button uses this
    name: p.name,
    price: Number(p.sale_price || p.regular_price || 0),
    regularPrice: Number(p.regular_price),
    salePrice: p.sale_price ? Number(p.sale_price) : null,
    image: p.images[0] ?? "",
    images: p.images,
    category: p.category_name ?? "",
    brand: p.brand_name,
    inStock: p.stock_status === "in_stock",
    shortDescription: p.subtitle ?? "",
  }));

  return (
    <ShopClient
      products={cards}
      categories={categories.map((c) => c.name)}
      brands={brands.map((b) => b.name).sort()}
    />
  );
}
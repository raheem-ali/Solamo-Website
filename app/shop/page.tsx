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
  const cards: CardProduct[] = products.map((p) => ({
    id: p.id,
    slug: p.slug,
    link: `/${p.category_slug ?? "shop"}/${p.slug}`, // "See Details" button
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
  }));

  return (
    <ShopClient
      products={cards}
      categories={categories.map((c) => c.name)}
      brands={brands
        .map((b) => ({ name: b.name, slug: b.slug }))
        .sort((a, b) => a.name.localeCompare(b.name))}
    />
  );
}
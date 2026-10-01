import { notFound } from "next/navigation";
import ShopClient from "../ShopClient";
import { getAllProducts, getBrands, getCategories } from "@/lib/api";
import { toCardProduct } from "@/lib/shop";

type Props = { params: Promise<{ brand: string }> };

export async function generateMetadata({ params }: Props) {
  const { brand: brandSlug } = await params;
  const brands = await getBrands();
  const brand = brands.find((b) => b.slug === brandSlug);

  return {
    title: brand ? `${brand.name} Products | Solamo Energy` : "Brand not found | Solamo Energy",
    description: brand?.description || undefined,
  };
}

// /shop/aiko  ->  the shop page with the AIKO brand already ticked
export default async function ShopBrandPage({ params }: Props) {
  const { brand: brandSlug } = await params;

  const [products, categories, brands] = await Promise.all([
    getAllProducts(),
    getCategories(),
    getBrands(),
  ]);

  const brand = brands.find((b) => b.slug === brandSlug);
  if (!brand) notFound();

  return (
    <ShopClient
      products={products.map(toCardProduct)}
      categories={categories.map((c) => c.name)}
      brands={brands
        .map((b) => ({ name: b.name, slug: b.slug }))
        .sort((a, b) => a.name.localeCompare(b.name))}
      initialBrands={[brand.name]}
      lockBrand
      title={brand.name}
    />
  );
}
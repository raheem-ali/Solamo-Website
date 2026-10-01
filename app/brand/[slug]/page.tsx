import { notFound } from "next/navigation";
import type { BrandData } from "@/lib/brand-data";
import BrandArchiveClient from "@/components/BrandArchiveClient";
import { getAllProducts, getBrands } from "@/lib/api";

type Props = { params: Promise<{ slug: string }> };

// Used by the old design when a brand has no banner of its own
const DEFAULT_BANNER =
  "https://solamoenergy.com/wp-content/uploads/2026/07/default-banner.png";

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const brands = await getBrands();
  const brand = brands.find((b) => b.slug === slug);

  return {
    title: brand ? `${brand.name} | Solamo Energy` : "Brand not found | Solamo Energy",
    description: brand?.description || undefined,
  };
}

export default async function BrandPage({ params }: Props) {
  const { slug } = await params;

  const brands = await getBrands();
  const brand = brands.find((b) => b.slug === slug);

  if (!brand) notFound();

  const products = await getAllProducts({ brand_id: brand.id });

  // Same shape as BrandData in lib/brand-data, so BrandArchiveClient needs no changes
  const brandData: BrandData = {
    name: brand.name,
    slug: brand.slug,
    description: brand.description ?? "",
    bannerImage: DEFAULT_BANNER,
    image: brand.image ?? undefined,
    products: products.map((p) => ({
      id: String(p.id),
      name: p.name,
      price: Number(p.sale_price || p.regular_price || 0),
      image: p.images[0] ?? "",
      link: `/${p.category_slug ?? "shop"}/${p.slug}`,
      category: (p.category_name ?? "Solar Panel") as BrandData["products"][number]["category"],
      description: p.subtitle ?? "",
    })),
  };

  return <BrandArchiveClient brand={brandData} />;
}
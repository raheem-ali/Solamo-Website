import { brandsData, BrandData } from "@/lib/brand-data";
import BrandArchiveClient from "@/components/BrandArchiveClient";
import { notFound } from "next/navigation";

interface PageProps {
  params: { slug: string };
}

export default async function BrandPage({ params }: PageProps) {
  const brand: BrandData | undefined = brandsData[params.slug];

  if (!brand) {
    notFound();
  }

  return <BrandArchiveClient brand={brand} />;
}

import BrandsClient from "./BrandsClient";
import { getBrands } from "@/lib/api";

export const metadata = { title: "Our Brands | Solamo Energy" };

export default async function BrandsPage() {
  const brands = await getBrands();

  return (
    <BrandsClient
      brands={brands.map((b) => ({
        slug: b.slug,
        name: b.name,
        description: b.description ?? "",
        image: b.image,
      }))}
    />
  );
}
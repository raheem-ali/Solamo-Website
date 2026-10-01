import { notFound } from "next/navigation";
import ShopClient from "@/app/shop/ShopClient";
import { getAllProducts, getBrands, getCategories } from "@/lib/api";
import { toCardProduct } from "@/lib/shop";

type Props = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: Props) {
  const { category: slug } = await params;
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);

  return {
    title: category
      ? `${category.name} | Solamo Energy`
      : "Category not found | Solamo Energy",
  };
}

// /solar-panels  ->  the shop page showing only products of that category
export default async function CategoryPage({ params }: Props) {
  const { category: slug } = await params;

  const [categories, brands] = await Promise.all([getCategories(), getBrands()]);

  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  // The category itself plus its sub-categories
  const family = categories.filter(
    (c) => c.id === category.id || c.parent_id === category.id,
  );

  const lists = await Promise.all(
    family.map((c) => getAllProducts({ category_id: c.id })),
  );
  const products = lists.flat();

  // Only offer brands that actually have products in this category
  const brandNames = new Set(products.map((p) => p.brand_name));

  return (
    <ShopClient
      products={products.map(toCardProduct)}
      categories={categories.map((c) => c.name)}
      brands={brands
        .filter((b) => brandNames.has(b.name))
        .map((b) => ({ name: b.name, slug: b.slug }))
        .sort((a, b) => a.name.localeCompare(b.name))}
      lockCategory={{
        name: category.name,
        slug: category.slug,
        matchNames: family.map((c) => c.name),
      }}
      title={category.name}
    />
  );
}
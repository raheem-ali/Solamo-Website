import CategoriesClient from "./CategoriesClient";
import { getAllProducts, getCategories } from "@/lib/api";

export const metadata = { title: "Product Categories | Solamo Energy" };

export default async function CategoriesPage() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getAllProducts(),
  ]);

  const items = categories
    // Top-level categories only; sub-categories are counted inside their parent
    .filter((c) => !c.parent_id)
    .map((c) => {
      const ids = [
        c.id,
        ...categories.filter((x) => x.parent_id === c.id).map((x) => x.id),
      ];
      const inside = products.filter((p) => ids.includes(p.category_id));

      return {
        slug: c.slug,
        name: c.name,
        count: inside.length,
        image: inside.find((p) => p.images[0])?.images[0] ?? null,
      };
    })
    // Hide empty categories so visitors never land on an empty page
    .filter((c) => c.count > 0)
    .sort((a, b) => a.name.localeCompare(b.name));

  return <CategoriesClient categories={items} />;
}
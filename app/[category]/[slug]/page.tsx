import { notFound, redirect } from "next/navigation";
import { getProduct, getProducts, waLink } from "@/lib/api";
import ProductView from "./ProductView";

type Props = { params: Promise<{ category: string; slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const p = await getProduct(slug);

  if (!p) return { title: "Product not found | Solamo Energy" };

  return {
    title: `${p.name} | Solamo Energy`,
    description: p.subtitle || undefined,
    openGraph: p.images[0] ? { images: [p.images[0]] } : undefined,
  };
}

export default async function ProductPage({ params }: Props) {
  const { category, slug } = await params;

  const product = await getProduct(slug);

  // Unknown slug, or a product that is not approved yet (API returns 404)
  if (!product) notFound();

  // Wrong category in the URL -> send visitors to the right one
  if (product.category_slug && product.category_slug !== category) {
    redirect(`/${product.category_slug}/${product.slug}`);
  }

  // Related products: same category, not this one, max 4
  const related = await getProducts({
    category_id: product.category_id,
    per_page: 5,
  });

  const relatedProducts = (related?.data ?? [])
    .filter((r) => r.id !== product.id)
    .slice(0, 4)
    .map((r) => ({
      title: r.name,
      description: r.subtitle ?? "",
      price: Number(r.sale_price || r.regular_price || 0),
      image: r.images[0] ?? "",
      link: `/${r.category_slug}/${r.slug}`,
    }));

  // Contact links are built here so the client component stays simple
  const whatsappHref = product.tenant_whatsapp
    ? waLink(product.tenant_whatsapp, `Hi, I would like to order ${product.name}`)
    : null;

  const callHref = product.tenant_phone
    ? `tel:${product.tenant_phone.replace(/[^\d+]/g, "")}`
    : null;

  return (
    <ProductView
      product={product}
      related={relatedProducts}
      whatsappHref={whatsappHref}
      callHref={callHref}
    />
  );
}
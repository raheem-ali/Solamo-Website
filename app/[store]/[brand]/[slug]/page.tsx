"use client";

import React, { useState, useEffect, useRef } from "react";
import localFont from "next/font/local";
import { useParams, usePathname } from "next/navigation";
import SolamoHeader from "@/components/SolamoHeader";
import SolamoFooter from "@/components/SolamoFooter";
import BrandAdBanner from "@/components/BrandAdBanner";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import ScrollRow from "./ScrollRow";

const helvetica = localFont({
  src: [
    { path: "./fonts/HelveticaNeueRoman.otf", weight: "400", style: "normal" },
    { path: "./fonts/HelveticaNeueMedium.otf", weight: "500", style: "normal" },
    { path: "./fonts/HelveticaNeueBold.otf", weight: "700", style: "normal" },
  ],
  display: "swap",
  fallback: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
});

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
const DEFAULT_WHATSAPP = "923141349717";

const PLACEHOLDER = "https://via.placeholder.com/600";
const SHOW_COUPONS = false; // coupons are hidden for now
const MAX_VISIBLE_THUMBS = 6; // thumbnails shown before the strip starts to scroll

// ---------- API types ----------
interface ApiAttribute {
  id?: number;
  attribute_name: string;
  attribute_value: string;
}

interface ApiProduct {
  id: number;
  slug: string;
  name: string;
  subtitle: string | null;
  description: string | null; // sanitized HTML from the rich text editor
  regular_price: number | string;
  sale_price: number | string | null;
  stock_status: string;
  stock_quantity: number;
  images: string[]; // full URLs, up to 10
  brand_id: number;
  brand_name: string;
  brand_logo?: string | null;
  brand_city?: string | null;
  tenant_city?: string | null;
  tenant_logo?: string | null;
  category_id: number | null;
  category_name: string | null;
  category_slug: string | null;
  tenant_name: string;
  tenant_phone: string | null;
  tenant_whatsapp: string | null;
  attributes: ApiAttribute[];
}

// ---------- helpers ----------
const slugify = (s: string) =>
  (s || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

function waDigits(num?: string | null) {
  if (!num) return null;
  let d = String(num).replace(/\D/g, "");
  if (!d) return null;
  if (d.startsWith("0")) d = "92" + d.slice(1); // Pakistan local -> international
  return d;
}

function currentPrice(p: { regular_price: number | string; sale_price: number | string | null }) {
  const regular = Number(p.regular_price) || 0;
  const sale = p.sale_price != null ? Number(p.sale_price) : 0;
  return sale > 0 && sale < regular ? sale : regular;
}

/** API product -> the card shape the carousel already understands */
function toCard(p: ApiProduct) {
  return {
    id: p.slug, // the carousel links by slug
    name: p.name,
    image: p.images?.[0] || PLACEHOLDER,
    price: currentPrice(p),
    category: p.category_name || "Products",
    description: p.subtitle || "",
    brandName: p.brand_name,
    brandSlug: slugify(p.brand_name),
  };
}
type Card = ReturnType<typeof toCard>;

async function fetchProducts(query: string): Promise<ApiProduct[]> {
  try {
    const res = await fetch(`${API_URL}/products?${query}`, {
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return Array.isArray(json?.data) ? json.data : [];
  } catch {
    return [];
  }
}

const SpecRow = ({ label, value }: { label: string; value: string }) => (
  <div className="grid grid-cols-[42%_58%] min-h-[42px] items-center border-b border-white bg-[#f3f4f0] px-3 py-2 text-[14px]">
    <div className="text-[#6b7280] font-normal">{label}</div>
    <div className="break-words font-medium text-[#1f2937]">{value}</div>
  </div>
);

// Self-contained product carousel (plain links, no dependency on the old static data)
function DbProductCarousel({
  title,
  subtitle,
  products,
  badgeText,
  viewAllHref,
  hrefFor,
}: {
  title: string;
  subtitle?: string;
  products: Card[];
  badgeText?: string;
  viewAllHref: string;
  hrefFor: (c: Card) => string;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => {
    const el = rowRef.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section className="mx-auto max-w-[1800px] px-4 py-6 md:px-6 lg:px-8">
      <div className="mb-4 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-[20px] font-bold text-[#1f2937]">{title}</h2>
          {subtitle && <p className="text-[13px] text-[#6b7280]">{subtitle}</p>}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <a href={viewAllHref} className="text-[13px] font-bold text-[#4D7C0F] hover:underline">
            View all
          </a>
          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label="Scroll left"
            className="hidden h-8 w-8 items-center justify-center rounded-full border border-[#d8ddd3] bg-white hover:bg-[#f3f4f0] sm:flex"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label="Scroll right"
            className="hidden h-8 w-8 items-center justify-center rounded-full border border-[#d8ddd3] bg-white hover:bg-[#f3f4f0] sm:flex"
          >
            ›
          </button>
        </div>
      </div>

      <div ref={rowRef} className="flex gap-3 overflow-x-auto scroll-smooth pb-2 snap-x">
        {products.map((c) => (
          <a
            key={c.id}
            href={hrefFor(c)}
            className="snap-start flex w-[180px] shrink-0 flex-col overflow-hidden rounded-[10px] border border-[#e5e8e1] bg-white transition-shadow hover:shadow-md sm:w-[210px]"
          >
            <div className="relative flex h-[170px] items-center justify-center bg-[#f3f4f0] p-3">
              <img src={c.image} alt={c.name} className="max-h-full max-w-full object-contain" />
              {badgeText && (
                <span className="absolute left-2 top-2 rounded bg-[#79B900] px-1.5 py-0.5 text-[10px] font-bold text-white">
                  {badgeText}
                </span>
              )}
            </div>
            <div className="p-3">
              <div className="text-[12px] text-[#6b7280]">{c.brandName}</div>
              <div className="line-clamp-2 min-h-[36px] text-[13px] font-medium text-[#1f2937]">{c.name}</div>
              <div className="mt-1 text-[14px] font-bold text-[#4D7C0F]">
                {c.price ? `Rs ${c.price.toLocaleString()}` : "Price on Request"}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

// Seller avatar: shows the shop/brand image, falls back to the first letter
function SellerAvatar({ src, name }: { src: string | null; name: string }) {
  const [failed, setFailed] = useState(false);
  if (src && !failed) {
    return (
      <img
        src={src}
        alt={name}
        onError={() => setFailed(true)}
        className="h-9 w-9 shrink-0 rounded-full border border-[#e5e8e1] bg-white object-cover"
      />
    );
  }
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f2f9e6] text-[#4D7C0F] font-bold text-[14px]">
      {(name || "S").charAt(0).toUpperCase()}
    </div>
  );
}

// Gallery: thumbnails on the left (boxes fit each image), first 6 visible, the rest scroll
function DbProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const [maxH, setMaxH] = useState<number | undefined>(undefined);
  const safe = active < images.length ? active : 0;

  // Limit the strip's height to exactly the first 6 thumbnails
  const measure = () => {
    const el = thumbsRef.current;
    if (!el || images.length <= MAX_VISIBLE_THUMBS) {
      setMaxH(undefined);
      return;
    }
    const kids = Array.from(el.children) as HTMLElement[];
    const last = kids[MAX_VISIBLE_THUMBS - 1];
    if (!last || !kids[0]) return;
    setMaxH(last.offsetTop + last.offsetHeight - kids[0].offsetTop);
  };

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  const step = (dir: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    setActive((safe + dir + images.length) % images.length);
  };

  return (
    <div className="flex flex-col-reverse gap-3 md:flex-row md:items-start">
      {images.length > 1 && (
        <div
          ref={thumbsRef}
          style={{ maxHeight: maxH }}
          className="relative flex gap-2 overflow-x-auto md:w-[72px] md:shrink-0 md:flex-col md:overflow-x-hidden md:overflow-y-auto [scrollbar-width:thin]"
        >
          {images.map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1}`}
              className={`block w-[64px] shrink-0 overflow-hidden rounded-lg border-2 bg-white md:w-full ${
                i === safe ? "border-[#1f2937]" : "border-[#e5e8e1] hover:border-[#79B900]"
              }`}
            >
              <img src={src} alt={`${alt} ${i + 1}`} onLoad={measure} className="block h-auto w-full" />
            </button>
          ))}
        </div>
      )}

      <div className="flex min-w-0 flex-1 justify-center md:justify-start">
        <div className="relative inline-flex max-w-full overflow-hidden rounded-xl border border-[#e5e8e1] bg-white">
          <img src={images[safe]} alt={alt} className="block h-auto max-h-[520px] w-auto max-w-full object-contain" />
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={step(-1)}
                aria-label="Previous image"
                className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#1f2937] shadow hover:bg-white"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={step(1)}
                aria-label="Next image"
                className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#1f2937] shadow hover:bg-white"
              >
                ›
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

type Status = "loading" | "ready" | "notfound" | "error";

export default function ProductDetailPage() {
  // useParams works on every Next.js version (in Next 15 the params prop is a Promise)
  const routeParams = useParams() as Record<string, string | string[] | undefined>;
  const pick = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) || "";
  const params = { brand: pick(routeParams?.brand), slug: pick(routeParams?.slug) };

  // First part of the URL (e.g. "new3" in /new3/aiko/some-product), reused for product links
  const pathname = usePathname() || "";
  const firstSegment = pathname.split("/").filter(Boolean)[0] || "shop";

  const [product, setProduct] = useState<ApiProduct | null>(null);
  const [status, setStatus] = useState<Status>("loading");

  // carousels
  const [moreFromBrand, setMoreFromBrand] = useState<Card[]>([]);
  const [alsoViewed, setAlsoViewed] = useState<Card[]>([]);
  const [related, setRelated] = useState<Card[]>([]);
  const [topPicks, setTopPicks] = useState<Card[]>([]);

  const [showStickyBar, setShowStickyBar] = useState(false);
  const buyBoxRef = useRef<HTMLDivElement>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // ---------- load the product ----------
  useEffect(() => {
    if (!params.slug) return; // route params not ready yet
    let cancelled = false;
    setStatus("loading");
    setProduct(null);

    (async () => {
      try {
        const res = await fetch(`${API_URL}/products/${encodeURIComponent(params.slug)}`, {
          headers: { Accept: "application/json" },
        });
        if (cancelled) return;
        if (res.status === 404) {
          setStatus("notfound");
          return;
        }
        if (!res.ok) {
          setStatus("error");
          return;
        }
        const data: ApiProduct = await res.json();
        setProduct(data);
        setStatus("ready");
      } catch {
        if (!cancelled) setStatus("error");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [params.slug]);

  // ---------- load carousel products once we know the product ----------
  useEffect(() => {
    if (!product) return;
    let cancelled = false;

    (async () => {
      const [brandRows, categoryRows, latestRows] = await Promise.all([
        fetchProducts(`brand_id=${product.brand_id}&per_page=14`),
        product.category_id ? fetchProducts(`category_id=${product.category_id}&per_page=40`) : Promise.resolve([]),
        fetchProducts(`per_page=40`),
      ]);
      if (cancelled) return;

      const used = new Set<string>([product.slug]);
      const take = (rows: ApiProduct[], filter: (p: ApiProduct) => boolean) => {
        const out = rows.filter((p) => !used.has(p.slug) && filter(p)).slice(0, 12);
        out.forEach((p) => used.add(p.slug));
        return out.map(toCard);
      };

      setMoreFromBrand(take(brandRows, () => true));
      setAlsoViewed(take(categoryRows, (p) => p.brand_id !== product.brand_id));
      setRelated(take(categoryRows, () => true));
      setTopPicks(take(latestRows, (p) => p.category_id !== product.category_id));
    })();

    return () => {
      cancelled = true;
    };
  }, [product]);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // the buy box only exists after the product has loaded
  useEffect(() => {
    const node = buyBoxRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setShowStickyBar(!entry.isIntersecting), {
      threshold: 0.1,
    });
    observer.observe(node);
    return () => observer.unobserve(node);
  }, [product]);

  // ---------- loading / not found ----------
  if (status !== "ready" || !product) {
    return (
      <>
        <SolamoHeader />
        <div
          className={`${helvetica.className} [&_:is(h1,h2,h3,h4,h5,h6,p,span,a,button,input,table,th,td,li,label)]:![font-family:inherit] min-h-screen bg-white text-[#1f2937]`}
        >
          <main className="mx-auto flex min-h-[60vh] max-w-[1800px] items-center justify-center px-4 py-20 md:px-6">
            {status === "loading" ? (
              <div className="flex flex-col items-center gap-3">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#e5e8e1] border-t-[#79B900]" />
                <p className="text-[14px] text-[#6b7280]">Loading product...</p>
              </div>
            ) : (
              <div className="text-center">
                <h1 className="mb-4 text-[22px] font-bold text-[#1f2937]">
                  {status === "notfound" ? "Product Not Found" : "Something went wrong"}
                </h1>
                <p className="mb-8 text-[14px] font-normal text-[#6b7280]">
                  {status === "notfound"
                    ? "The product you are looking for does not exist or has been removed."
                    : "We could not load this product. Please try again."}
                </p>
                <a
                  href="/shop"
                  className="inline-flex rounded-[6px] bg-[#79B900] px-6 py-3 text-[14px] font-bold text-white transition-colors hover:bg-[#5f9200]"
                >
                  Back to Shop
                </a>
              </div>
            )}
          </main>
        </div>
        <SolamoFooter />
      </>
    );
  }

  // ---------- derived values ----------
  const galleryImages = product.images && product.images.length ? product.images : [PLACEHOLDER];

  const regularPrice = Number(product.regular_price) || 0;
  const price = currentPrice(product);
  const hasPrice = price > 0;
  const onSale = hasPrice && price < regularPrice;
  const discountPct = onSale ? Math.round((1 - price / regularPrice) * 100) : 0;
  const inStock = product.stock_status === "in_stock";
  const serviceCity = (product.brand_city || product.tenant_city || "").trim();

  const categoryName = product.category_name || "Products";
  const categoryRouteMap: Record<string, string> = {
    batteries: "/batteries",
    inverters: "/inverters",
    "solar panel": "/solar-panels",
    "solar panels": "/solar-panels",
  };
  const categoryHref = categoryRouteMap[categoryName.toLowerCase()] || "/shop";

  const brandHref = `/brand/${params.brand}`;
  const productHref = (c: Card) => `/${firstSegment}/${c.brandSlug}/${c.id}`;

  const waNumber = waDigits(product.tenant_whatsapp) || DEFAULT_WHATSAPP;
  const whatsappUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    `I am interested in getting a quote for ${product.name}`,
  )}`;

  const sidebarProduct = moreFromBrand[0];
  const promoProducts = moreFromBrand.slice(1, 3);

  return (
    <>
      <SolamoHeader />
      <div
        className={`${helvetica.className} [&_:is(h1,h2,h3,h4,h5,h6,p,span,a,button,input,table,th,td,li,label)]:![font-family:inherit] min-h-screen bg-white text-[#1f2937] pb-24 sm:pb-0 overflow-x-clip`}
      >
        {/* Styles for the HTML description coming from the admin editor */}
        <style>{`
          .pdp-desc { font-size: 14px; line-height: 1.7; color: #4f584f; max-width: 1000px; }
          .pdp-desc p { margin: 0 0 10px; }
          .pdp-desc h2 { font-size: 18px; font-weight: 700; margin: 16px 0 8px; color: #1f2937; }
          .pdp-desc h3 { font-size: 16px; font-weight: 700; margin: 14px 0 6px; color: #1f2937; }
          .pdp-desc h4 { font-size: 15px; font-weight: 700; margin: 12px 0 6px; color: #1f2937; }
          .pdp-desc ul { list-style: disc; padding-left: 1.4rem; margin: 0 0 10px; }
          .pdp-desc ol { list-style: decimal; padding-left: 1.4rem; margin: 0 0 10px; }
          .pdp-desc blockquote { border-left: 3px solid #79B900; padding-left: 12px; margin: 10px 0; color: #6b7280; }
          .pdp-desc table { border-collapse: collapse; width: 100%; margin: 12px 0; display: block; overflow-x: auto; }
          .pdp-desc th, .pdp-desc td { border: 1px solid #d8ddd3; padding: 8px 12px; text-align: left; vertical-align: top; }
          .pdp-desc th { background: #f3f4f0; font-weight: 600; }
        `}</style>

        <main className="w-full min-w-0">
          {/* =========================
              PDP TOP AREA
          ========================== */}
          <div className="mx-auto max-w-[1800px] px-4 pb-8 pt-4 md:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="mb-4 flex min-w-0 items-center gap-2 overflow-x-auto whitespace-nowrap text-[13px] text-[#6b7280]"
            >
              <a href="/" className="shrink-0 hover:text-[#5f9200]">
                Home
              </a>
              <span>/</span>
              <a href="/shop" className="shrink-0 hover:text-[#5f9200]">
                Shop
              </a>
              <span>/</span>
              <a href={brandHref} className="shrink-0 hover:text-[#5f9200]">
                {product.brand_name}
              </a>
              <span>/</span>
              <span className="max-w-[320px] truncate font-medium text-[#1f2937]">{product.name}</span>
            </nav>

            <div className="grid grid-cols-1 items-start gap-x-6 gap-y-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)_300px] xl:grid-cols-[minmax(0,1.08fr)_minmax(400px,0.92fr)_320px]">
              {/* LEFT — Gallery (all images from the database) */}
              <div className="min-w-0 lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto">
                <DbProductGallery images={galleryImages} alt={product.name} />
              </div>

              {/* CENTER — Product Information */}
              <div className="min-w-0 text-[#1f2937]">
                {/* Brand link */}
                <a
                  href={brandHref}
                  className="inline-flex items-center gap-1 text-[13px] font-bold text-[#4D7C0F] hover:underline"
                >
                  {product.brand_name}
                  <svg className="h-3 w-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </a>

                <h1 className="mt-1 text-[20px] sm:text-[22px] font-medium leading-[1.3] text-[#1f2937]">
                  {product.name}
                </h1>
                {product.subtitle && (
                  <p className="mt-1 text-[14px] text-[#6b7280]">{product.subtitle}</p>
                )}

                {/* Price block */}
                <div className="mt-4 border-b border-[#e7eae4] pb-4">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="text-[24px] sm:text-[28px] font-bold text-[#1f2937]">
                      {hasPrice ? `Rs ${price.toLocaleString()}` : "Price on Request"}
                    </span>
                    {onSale && (
                      <>
                        <span className="text-[13px] text-[#6b7280] line-through">
                          Rs {regularPrice.toLocaleString()}
                        </span>
                        <span className="rounded bg-[#f2f9e6] px-1.5 py-0.5 text-[13px] font-bold text-[#4D7C0F]">
                          {discountPct}% Off
                        </span>
                      </>
                    )}
                  </div>

                  {hasPrice && (
                    <div className="mt-1 text-[13px] text-[#6b7280]">
                      Inclusive of all applicable taxes &amp; standard warranty
                    </div>
                  )}

                  <div className="mt-2 text-[13px] font-medium">
                    {inStock ? (
                      <span className="text-[#4D7C0F]">
                        In stock{product.stock_quantity > 0 ? ` (${product.stock_quantity} available)` : ""}
                      </span>
                    ) : (
                      <span className="text-rose-600">Out of stock</span>
                    )}
                  </div>
                </div>

                {/* Explore other products in category */}
                <a
                  href={categoryHref}
                  className="mt-3 flex min-h-[40px] items-center justify-between rounded-[6px] bg-[#f2f9e6] px-3 py-2 text-[14px] font-normal text-[#1f2937] transition-colors hover:bg-[#e8f3d2]"
                >
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#79B900] text-white text-[10px]">
                      ★
                    </span>
                    <span className="min-w-0 truncate">
                      Explore other products in <span className="font-medium text-[#4D7C0F]">{categoryName}</span>
                    </span>
                  </div>
                  <svg className="ml-3 h-4 w-4 shrink-0 text-[#4D7C0F]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </a>

                {/* Service information */}
                <div className="mt-5 border-t border-[#e7eae4] pt-4">
                  <div className="mb-2 text-[13px] font-bold text-[#6b7280] tracking-[0.02em] uppercase">
                    SERVICE INFORMATION
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2 gap-x-3 rounded-[6px] bg-[#f7fbef] px-3 py-2.5 text-[14px]">
                    <div className="flex items-center gap-2">
                      <svg className="h-4 w-4 shrink-0 text-[#79B900]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>
                        {serviceCity ? `Professional installation in ${serviceCity}` : "Professional installation available"}
                      </span>
                    </div>
                    <span className="font-bold text-[#4D7C0F]">Free Site Assessment</span>
                  </div>
                </div>

                {SHOW_COUPONS && (
                <div className="mt-5 border-t border-[#e7eae4] pt-4">
                  <div className="mb-2 text-[13px] font-bold text-[#6b7280] tracking-[0.02em] uppercase">COUPONS</div>
                  <ScrollRow className="gap-3">
                    <div className="flex-none w-[300px] sm:w-[340px] snap-start flex items-center justify-between rounded-[8px] border border-[#d8ddd3] bg-white p-3 text-[14px]">
                      <div className="flex items-start gap-2.5 min-w-0">
                        <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded bg-[#f2f9e6] text-[#4D7C0F]">🏷️</div>
                        <div className="min-w-0">
                          <div className="font-medium text-[#1f2937] line-clamp-2">Get 15% cashback up to Rs 5,000</div>
                          <a href="#learn-more" className="text-[13px] text-[#4D7C0F] underline hover:text-[#5f9200]">Learn more</a>
                        </div>
                      </div>
                      <div className="flex-none ml-2 flex items-center gap-1 rounded border border-dashed border-[#79B900] bg-[#f2f9e6] px-2 py-1 font-mono font-bold text-[#4D7C0F] text-[12px]" title="Coupon code">
                        <span>SAVE15</span>
                        <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path></svg>
                      </div>
                    </div>

                    <div className="flex-none w-[300px] sm:w-[340px] snap-start flex items-center justify-between rounded-[8px] border border-[#d8ddd3] bg-white p-3 text-[14px]">
                      <div className="flex items-start gap-2.5 min-w-0">
                        <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded bg-[#f2f9e6] text-[#4D7C0F]">🏷️</div>
                        <div className="min-w-0">
                          <div className="font-medium text-[#1f2937] line-clamp-2">Rs 2,000 off on Inverters &amp; Panels</div>
                          <a href="#learn-more" className="text-[13px] text-[#4D7C0F] underline hover:text-[#5f9200]">Learn more</a>
                        </div>
                      </div>
                      <div className="flex-none ml-2 flex items-center gap-1 rounded border border-dashed border-[#79B900] bg-[#f2f9e6] px-2 py-1 font-mono font-bold text-[#4D7C0F] text-[12px]" title="Coupon code">
                        <span>SOLAMO2K</span>
                        <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path></svg>
                      </div>
                    </div>
                  </ScrollRow>
                </div>
                )}

                {/* Payment discounts */}
                <div className="mt-5 border-t border-[#e7eae4] pt-4">
                  <div className="mb-2 text-[13px] font-bold text-[#6b7280] tracking-[0.02em] uppercase">PAYMENT DISCOUNTS</div>
                  <ScrollRow className="gap-3">
                    <div className="flex-none min-w-[280px] snap-start flex items-center justify-between rounded-[8px] bg-[#f2f9e6] p-3 text-[14px]">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#4D7C0F] font-bold text-[12px] shadow-sm">MB</div>
                        <div className="min-w-0">
                          <div className="font-medium text-[#1f2937] line-clamp-2">Meezan Bank Credit Cards</div>
                          <div className="text-[13px] text-[#6b7280] line-clamp-2">Save Rs 500 &amp; 0% markup installments</div>
                        </div>
                      </div>
                      <a href="#apply" className="flex-none ml-2 font-medium text-[#4D7C0F] underline hover:text-[#5f9200]">Coming Soon</a>
                    </div>

                    <div className="flex-none min-w-[280px] snap-start flex items-center justify-between rounded-[8px] bg-[#f2f9e6] p-3 text-[14px]">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#4D7C0F] font-bold text-[12px] shadow-sm">HB</div>
                        <div className="min-w-0">
                          <div className="font-medium text-[#1f2937] line-clamp-2">HBL Solar Financing</div>
                          <div className="text-[13px] text-[#6b7280] line-clamp-2">Flexible monthly payment plans</div>
                        </div>
                      </div>
                      <a href="#apply" className="flex-none ml-2 font-medium text-[#4D7C0F] underline hover:text-[#5f9200]">Coming Soon</a>
                    </div>
                  </ScrollRow>
                </div>

                {/* Promo banners */}
                <div className="mt-5 flex flex-col gap-3">
                  <div className="relative flex min-h-[110px] sm:min-h-[120px] items-center justify-between overflow-hidden rounded-[12px] bg-gradient-to-r from-[#4D7C0F] to-[#79B900] p-5 text-white shadow-sm">
                    <h1>video ad</h1>
                  </div>
                  <div className="relative flex min-h-[110px] sm:min-h-[120px] items-center justify-between overflow-hidden rounded-[12px] bg-gradient-to-r from-[#1f2937] to-[#344034] p-5 text-white shadow-sm">
                    video ad
                  </div>
                </div>
              </div>

              {/* RIGHT SIDEBAR */}
              <div ref={buyBoxRef}>
                <aside className="lg:sticky lg:top-24 flex flex-col rounded-[8px] border border-[#e5e8e1] bg-white text-[#1f2937] overflow-hidden shadow-sm">
                  {/* Seller (the shop that owns this product) */}
                  <div className="p-4 border-b border-[#e5e8e1] flex items-center gap-3">
                    <SellerAvatar src={product.tenant_logo || product.brand_logo || null} name={product.tenant_name} />
                    <div className="min-w-0 flex-1">
                      <div className="text-[14px] font-medium text-[#1f2937] truncate">
                        Sold by <span className="font-bold">{product.tenant_name}</span>
                      </div>
                      <div className="text-[13px] font-medium text-[#4D7C0F] mt-0.5">Trusted Partner ★</div>
                    </div>
                  </div>

                  <div className="px-4 py-3 border-b border-[#e5e8e1] space-y-2.5">
                    <div className="flex items-center gap-2.5 text-[14px] text-[#1f2937]">
                      <svg className="h-4 w-4 shrink-0 text-[#79B900]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      <span>Warranty Included</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-[14px] text-[#1f2937]">
                      <svg className="h-4 w-4 shrink-0 text-[#79B900]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                      <span>Secure Payments</span>
                    </div>
                  </div>

                  <div className="px-4 py-3.5 border-b border-[#e5e8e1]">
                    <div className="text-[14px] font-normal text-[#6b7280]">Estimated Price</div>
                    <div className="mt-1 text-[22px] font-bold leading-7 text-[#1f2937]">
                      {hasPrice ? `Rs ${price.toLocaleString()}` : "Price on Request"}
                    </div>
                    {onSale && (
                      <div className="text-[13px] text-[#6b7280] line-through">Rs {regularPrice.toLocaleString()}</div>
                    )}
                  </div>

                  <div className="p-4">
                    <a
                      href="/free-quote"
                      className="flex h-[44px] w-full items-center justify-center rounded-[6px] bg-[#79B900] text-[14px] font-bold uppercase text-white transition-colors hover:bg-[#5f9200]"
                    >
                      Get Free Quote
                    </a>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 flex h-[44px] w-full items-center justify-center rounded-[6px] border border-[#25D366] text-[14px] font-bold uppercase text-[#128C7E] transition-colors hover:bg-[#25D366] hover:text-white"
                    >
                      WhatsApp Us
                    </a>
                    {product.tenant_phone && (
                      <a
                        href={`tel:${product.tenant_phone}`}
                        className="mt-2 flex h-[44px] w-full items-center justify-center rounded-[6px] border border-[#d8ddd3] text-[14px] font-bold text-[#1f2937] transition-colors hover:bg-[#f3f4f0]"
                      >
                        Call {product.tenant_phone}
                      </a>
                    )}
                  </div>
                </aside>

                {/* Discover brand */}
                <div className="mt-4 rounded-[8px] border border-[#e5e8e1] bg-white p-4 shadow-sm">
                  <div className="text-[12px] font-bold text-[#6b7280] uppercase mb-2">Discover {product.brand_name}</div>
                  <a href={brandHref} className="block overflow-hidden rounded-md border border-[#e5e8e1] hover:opacity-95 transition">
                    {product.brand_logo && (
                      <div className="flex h-24 items-center justify-center bg-[#f9faf8] p-3">
                        <img src={product.brand_logo} alt={product.brand_name} className="max-h-full max-w-full object-contain" />
                      </div>
                    )}
                    <div className="p-2 text-center text-[13px] font-bold text-[#4D7C0F]">
                      Visit {product.brand_name} Store &gt;
                    </div>
                  </a>
                </div>

                {sidebarProduct && (
                  <a
                    href={productHref(sidebarProduct)}
                    className="mt-3 rounded-[8px] border border-[#e5e8e1] bg-white p-3 shadow-sm flex items-center gap-3 hover:shadow-md transition"
                  >
                    <div className="h-16 w-16 shrink-0 flex items-center justify-center bg-[#f3f4f0] rounded p-1">
                      <img src={sidebarProduct.image} alt={sidebarProduct.name} className="max-h-full max-w-full object-contain" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[12px] text-[#6b7280]">{sidebarProduct.brandName}</div>
                      <div className="text-[13px] font-medium text-[#1f2937] truncate">{sidebarProduct.name}</div>
                      <div className="text-[13px] font-bold text-[#4D7C0F] mt-0.5">
                        {sidebarProduct.price ? `Rs ${sidebarProduct.price.toLocaleString()}` : "Price on Request"}
                      </div>
                    </div>
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="h-3 w-full bg-[#f3f4f0]" />

          {/* Ad strip */}
          <div className="mx-auto max-w-[1800px] px-4 pt-3 md:px-6 lg:px-8">
            <div className="overflow-hidden rounded-[10px] shadow-xs">
              <BrandAdBanner video="/ads/banner-1.mp4.mp4" />
            </div>
          </div>

          {/* =========================
              TABS & PRODUCT OVERVIEW
          ========================== */}
          <div className="border-b border-[#eceee8] bg-white sticky top-0 z-20 shadow-xs">
            <div className="mx-auto flex max-w-[1800px] gap-3 overflow-x-auto px-4 py-3 md:px-6 lg:px-8 scrollbar-none">
              <a
                href="#overview"
                className="shrink-0 rounded-full border border-[#d8ddd3] bg-white px-4 py-2 text-[14px] font-medium text-[#1f2937] transition-colors hover:border-[#79B900] hover:text-[#5f9200]"
              >
                Product Overview
              </a>
              <a
                href="#specifications"
                className="shrink-0 rounded-full border border-[#d8ddd3] bg-white px-4 py-2 text-[14px] font-medium text-[#1f2937] transition-colors hover:border-[#79B900] hover:text-[#5f9200]"
              >
                Specifications
              </a>
            </div>
          </div>

          <div className="mx-auto max-w-[1800px] px-4 md:px-6 lg:px-8 py-8">
            <section id="overview" className="scroll-mt-24">
              <h2 className="mb-4 border-b border-[#e5e8e1] pb-3 text-[22px] font-bold leading-[1.3] text-[#1f2937]">
                Product Overview
              </h2>

              {product.description ? (
                <div className="pdp-desc" dangerouslySetInnerHTML={{ __html: product.description }} />
              ) : (
                <p className="text-[14px] text-[#6b7280]">No description has been added for this product yet.</p>
              )}

              {/* Specifications (from product_attributes) */}
              <div id="specifications" className="mt-8 scroll-mt-24">
                <div className="mb-3 text-[13px] font-bold text-[#6b7280] tracking-[0.02em] uppercase">SPECIFICATIONS</div>
                <div className="grid grid-cols-1 gap-x-3 md:grid-cols-2">
                  <SpecRow label="Model Name" value={product.name} />
                  <SpecRow label="Manufacturer" value={product.brand_name} />
                  <SpecRow label="Category" value={categoryName} />
                  <SpecRow
                    label="Availability"
                    value={inStock ? `In Stock${product.stock_quantity > 0 ? ` (${product.stock_quantity})` : ""}` : "Out of Stock"}
                  />
                  {(product.attributes || []).map((a) => (
                    <SpecRow key={a.id ?? a.attribute_name} label={a.attribute_name} value={a.attribute_value} />
                  ))}
                </div>
              </div>
            </section>
          </div>

          <div className="h-3 w-full bg-[#f3f4f0]" />

          {/* Brand promo strip */}
          <div className="mx-auto max-w-[1800px] px-4 py-6 md:px-6 lg:px-8">
            <div className="rounded-[12px] border border-[#e5e8e1] bg-white p-4 shadow-sm">
              <div className="grid grid-cols-1 gap-4 items-center">
                <div className="overflow-hidden rounded-lg shadow-xs h-[220px] min-w-0">
                  <BrandAdBanner brand={params.brand} video="/ads/banner-2.mp4.mp4" noWrapper />
                </div>
              </div>
              {promoProducts.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-4 mt-4">
                  {promoProducts.map((p) => (
                    <a
                      key={p.id}
                      href={productHref(p)}
                      className="rounded-lg border border-[#e5e8e1] p-3 flex items-center gap-3 bg-[#f9faf8]"
                    >
                      <div className="h-16 w-16 shrink-0 flex items-center justify-center bg-white rounded p-1">
                        <img src={p.image} alt={p.name} className="max-h-full max-w-full object-contain" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[12px] text-[#6b7280]">{p.brandName}</div>
                        <div className="text-[13px] font-medium text-[#1f2937] truncate">{p.name}</div>
                        <div className="text-[13px] font-bold text-[#4D7C0F] mt-0.5">
                          {p.price ? `Rs ${p.price.toLocaleString()}` : "Price on Request"}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Carousels (all real products from the database) */}
          {moreFromBrand.length > 0 && (
            <DbProductCarousel
              title={`More From ${product.brand_name}`}
              subtitle={`Explore more products from ${product.brand_name}`}
              products={moreFromBrand}
              badgeText={product.brand_name.toUpperCase()}
              viewAllHref={brandHref}
              hrefFor={productHref}
            />
          )}

          {alsoViewed.length > 0 && (
            <DbProductCarousel
              title="Customers Also Viewed"
              subtitle={`Popular alternatives in ${categoryName}`}
              products={alsoViewed}
              badgeText="VIEWED"
              viewAllHref={categoryHref}
              hrefFor={productHref}
            />
          )}

          {related.length > 0 && (
            <DbProductCarousel
              title="Products Related To This"
              subtitle={`More ${categoryName} options`}
              products={related}
              badgeText="RELATED"
              viewAllHref={categoryHref}
              hrefFor={productHref}
            />
          )}

          {topPicks.length > 0 && (
            <DbProductCarousel
              title="Top Picks For You"
              subtitle="Recommended across other categories"
              products={topPicks}
              badgeText="TOP PICK"
              viewAllHref="/shop"
              hrefFor={productHref}
            />
          )}
        </main>

        {/* Sticky bottom bar (mobile) */}
        {showStickyBar && (
          <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#e5e8e1] px-4 py-2.5 shadow-xl flex items-center justify-between gap-3 sm:hidden animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              <div className="h-10 w-10 shrink-0 bg-[#f3f4f0] rounded p-1 flex items-center justify-center">
                <img src={galleryImages[0]} alt={product.name} className="max-h-full max-w-full object-contain" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[12px] font-medium text-[#1f2937] truncate">{product.name}</div>
                <div className="text-[13px] font-bold text-[#4D7C0F]">
                  {hasPrice ? `Rs ${price.toLocaleString()}` : "On Request"}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <a href="/free-quote" className="rounded-[6px] bg-[#79B900] px-3 py-2 text-[12px] font-bold uppercase text-white">
                Quote
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-[6px] border border-[#25D366] px-3 py-2 text-[12px] font-bold uppercase text-[#128C7E]"
              >
                WhatsApp
              </a>
            </div>
          </div>
        )}

        {/* Back to top */}
        {showBackToTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="fixed bottom-20 right-6 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#1f2937] shadow-lg border border-[#e5e8e1] hover:bg-[#f3f4f0] transition-colors"
          >
            ▲
          </button>
        )}

        <div className={showStickyBar ? "sm:hidden" : ""}>
          <WhatsAppFloat />
        </div>

        <SolamoFooter />
      </div>
    </>
  );
}
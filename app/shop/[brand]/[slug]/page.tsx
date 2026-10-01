import React from "react";
import localFont from "next/font/local";
import { brandsData, BrandData, Product } from "@/lib/brand-data";
import SolamoHeader from "@/components/SolamoHeader";
import SolamoFooter from "@/components/SolamoFooter";
import ProductGallery from "@/components/ProductGallery";
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

interface PDPPageProps {
  params: {
    brand: string;
    slug: string;
  };
}

export function generateStaticParams() {
  const paths: { brand: string; slug: string }[] = [];

  Object.values(brandsData).forEach((brand) => {
    brand?.products?.forEach((product) => {
      paths.push({
        brand: brand.slug,
        slug: product.id,
      });
    });
  });

  return paths;
}

const SpecRow = ({ label, value }: { label: string; value: string }) => (
  <div className="grid grid-cols-[42%_58%] min-h-[42px] items-center border-b border-white bg-[#f3f4f0] px-3 py-2 text-[14px]">
    <div className="text-[#6b7280] font-normal">{label}</div>
    <div className="break-words font-medium text-[#1f2937]">{value}</div>
  </div>
);

export default function ProductDetailPage({ params }: PDPPageProps) {
  const brandKey = Object.keys(brandsData).find(
    (key) => brandsData[key].slug.toLowerCase() === params.brand.toLowerCase(),
  );

  const brand: BrandData | undefined = brandKey
    ? brandsData[brandKey]
    : undefined;

  const product: Product | undefined = brand?.products.find(
    (p) => p.id.toLowerCase() === params.slug.toLowerCase(),
  );

  if (!brand || !product) {
    return (
      <>
        <SolamoHeader />
        <div
          className={`${helvetica.className} [&_:is(h1,h2,h3,h4,h5,h6,p,span,a,button,input,table,th,td,li,label)]:![font-family:inherit] min-h-screen bg-white text-[#1f2937]`}
        >
          <main className="mx-auto flex min-h-[60vh] max-w-[1800px] items-center justify-center px-4 py-20 md:px-6">
            <div className="text-center">
              <h1 className="mb-4 text-[22px] font-bold text-[#1f2937]">Product Not Found</h1>
              <p className="mb-8 text-[14px] font-normal text-[#6b7280]">
                The product you are looking for does not exist or has been removed.
              </p>
              <a
                href="/shop"
                className="inline-flex rounded-[6px] bg-[#79B900] px-6 py-3 text-[14px] font-bold text-white transition-colors hover:bg-[#5f9200]"
              >
                Back to Shop
              </a>
            </div>
          </main>
        </div>
        <SolamoFooter />
      </>
    );
  }

  const galleryImages = [product.image, brand.bannerImage].filter(
    Boolean,
  ) as string[];

  const price = product.price ?? 0;
  const hasPrice = price > 0;
  const oldPrice = hasPrice ? Math.round(price * 1.18) : 0;
  const whatsappUrl = `https://wa.me/923141349717?text=${encodeURIComponent(
    `I am interested in getting a quote for ${product.name}`,
  )}`;

  const relatedProducts = brand.products.filter((p) => p.id !== product.id).slice(0, 2);
  const fbtProducts = [
    product,
    relatedProducts[0] || product,
    relatedProducts[1] || product,
  ];

  return (
    <>
      <SolamoHeader />
      <div
        className={`${helvetica.className} [&_:is(h1,h2,h3,h4,h5,h6,p,span,a,button,input,table,th,td,li,label)]:![font-family:inherit] min-h-screen bg-white text-[#1f2937] pb-20 sm:pb-0 overflow-x-clip`}
      >

      <main className="w-full min-w-0">
        {/* =========================
            PDP TOP AREA
        ========================== */}
        <div className="mx-auto max-w-[1800px] px-4 pb-8 pt-4 md:px-6 lg:px-8">
          {/* Breadcrumb — unchanged */}
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
            <span className="shrink-0">{brand.name}</span>
            <span>/</span>
            <span className="max-w-[320px] truncate font-medium text-[#1f2937]">
              {product.name}
            </span>
          </nav>

          {/* Noon-inspired PDP grid */}
          <div
            className="
              grid
              grid-cols-1
              items-start
              gap-x-6
              gap-y-8
              lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)_300px]
              xl:grid-cols-[minmax(0,1.08fr)_minmax(400px,0.92fr)_320px]
            "
          >
            {/* LEFT — Gallery */}
            <div className="min-w-0 lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto">
              <ProductGallery images={galleryImages} productName={product.name} />
            </div>

            {/* CENTER — Product Information */}
            <div className="min-w-0 text-[#1f2937]">
              {/* Brand Link */}
              <a
                href="/shop"
                className="
                  inline-flex
                  items-center
                  gap-1
                  text-[13px]
                  font-bold
                  text-[#4D7C0F]
                  hover:underline
                "
              >
                {brand.name}
                <svg
                  className="h-3 w-3 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>

              {/* Product Title (20-22px, weight 500) */}
              <h1
                className="
                  mt-1
                  text-[20px]
                  sm:text-[22px]
                  font-medium
                  leading-[1.3]
                  text-[#1f2937]
                "
              >
                {product.name}
              </h1>

              {/* Rating Row */}
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="text-[14px] font-medium text-[#1f2937]">4.7</span>
                <div className="flex items-center text-[#4D7C0F]">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-4 w-4 shrink-0 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <a
                  href="#ratings-reviews"
                  className="text-[14px] font-medium text-[#4D7C0F] underline hover:text-[#5f9200]"
                >
                  312 Ratings
                </a>
              </div>

              {/* Price Block */}
              <div className="mt-4 border-b border-[#e7eae4] pb-4">
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="text-[24px] sm:text-[28px] font-bold text-[#1f2937]">
                    {hasPrice ? `Rs ${price.toLocaleString()}` : "Price on Request"}
                  </span>
                  {hasPrice && (
                    <>
                      <span className="text-[13px] text-[#6b7280] line-through">
                        Rs {oldPrice.toLocaleString()}
                      </span>
                      <span className="rounded bg-[#f2f9e6] px-1.5 py-0.5 text-[13px] font-bold text-[#4D7C0F]">
                        15% Off
                      </span>
                    </>
                  )}
                </div>

                {hasPrice && (
                  <div className="mt-1 text-[13px] text-[#6b7280]">
                    Inclusive of all applicable taxes &amp; standard warranty
                  </div>
                )}
              </div>

              {/* Explore other products in category */}
              <a
                href="/shop"
                className="
                  mt-3
                  flex
                  min-h-[40px]
                  items-center
                  justify-between
                  rounded-[6px]
                  bg-[#f2f9e6]
                  px-3
                  py-2
                  text-[14px]
                  font-normal
                  text-[#1f2937]
                  transition-colors
                  hover:bg-[#e8f3d2]
                "
              >
                <div className="flex min-w-0 items-center gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#79B900] text-white text-[10px]">
                    ★
                  </span>
                  <span className="min-w-0 truncate">
                    Explore other products in{" "}
                    <span className="font-medium text-[#4D7C0F]">
                      {product.category}
                    </span>
                  </span>
                </div>
                <svg
                  className="ml-3 h-4 w-4 shrink-0 text-[#4D7C0F]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>

              {/* Service Information */}
              <div className="mt-5 border-t border-[#e7eae4] pt-4">
                <div className="mb-2 text-[13px] font-bold text-[#6b7280] tracking-[0.02em] uppercase">
                  SERVICE INFORMATION
                </div>
                <div
                  className="
                    flex
                    flex-wrap
                    items-center
                    justify-between
                    gap-2
                    gap-x-3
                    rounded-[6px]
                    bg-[#f7fbeF]
                    px-3
                    py-2.5
                    text-[14px]
                  "
                >
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-4 w-4 shrink-0 text-[#79B900]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Professional installation in Karachi</span>
                  </div>
                  <span className="font-bold text-[#4D7C0F]">
                    Free Site Assessment
                  </span>
                </div>
              </div>

              {/* Coupons Section */}
              <div className="mt-5 border-t border-[#e7eae4] pt-4">
                <div className="mb-2 text-[13px] font-bold text-[#6b7280] tracking-[0.02em] uppercase">
                  COUPONS
                </div>
                <ScrollRow className="gap-3">
                  {/* Coupon Card 1 */}
                  <div className="flex-none w-[300px] sm:w-[340px] snap-start flex items-center justify-between rounded-[8px] border border-[#d8ddd3] bg-white p-3 text-[14px]">
                    <div className="flex items-start gap-2.5 min-w-0">
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded bg-[#f2f9e6] text-[#4D7C0F]">
                        🏷️
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium text-[#1f2937] line-clamp-2">
                          Get 15% cashback up to Rs 5,000
                        </div>
                        <a href="#learn-more" className="text-[13px] text-[#4D7C0F] underline hover:text-[#5f9200]">
                          Learn more
                        </a>
                      </div>
                    </div>
                    <div
                      className="flex-none ml-2 flex items-center gap-1 rounded border border-dashed border-[#79B900] bg-[#f2f9e6] px-2 py-1 font-mono font-bold text-[#4D7C0F] text-[12px]"
                      title="Coupon code"
                    >
                      <span>SAVE15</span>
                      <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path></svg>
                    </div>
                  </div>

                  {/* Coupon Card 2 */}
                  <div className="flex-none w-[300px] sm:w-[340px] snap-start flex items-center justify-between rounded-[8px] border border-[#d8ddd3] bg-white p-3 text-[14px]">
                    <div className="flex items-start gap-2.5 min-w-0">
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded bg-[#f2f9e6] text-[#4D7C0F]">
                        🏷️
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium text-[#1f2937] line-clamp-2">
                          Rs 2,000 off on Inverters &amp; Panels
                        </div>
                        <a href="#learn-more" className="text-[13px] text-[#4D7C0F] underline hover:text-[#5f9200]">
                          Learn more
                        </a>
                      </div>
                    </div>
                    <div
                      className="flex-none ml-2 flex items-center gap-1 rounded border border-dashed border-[#79B900] bg-[#f2f9e6] px-2 py-1 font-mono font-bold text-[#4D7C0F] text-[12px]"
                      title="Coupon code"
                    >
                      <span>SOLAMO2K</span>
                      <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path></svg>
                    </div>
                  </div>
                </ScrollRow>
              </div>

              {/* Payment Discount Section */}
              <div className="mt-5 border-t border-[#e7eae4] pt-4">
                <div className="mb-2 text-[13px] font-bold text-[#6b7280] tracking-[0.02em] uppercase">
                  PAYMENT DISCOUNTS
                </div>
                <ScrollRow className="gap-3">
                  {/* Payment Card 1 */}
                  <div className="flex-none min-w-[280px] snap-start flex items-center justify-between rounded-[8px] bg-[#f2f9e6] p-3 text-[14px]">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#4D7C0F] font-bold text-[12px] shadow-sm">
                        MB
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium text-[#1f2937] line-clamp-2">Meezan Bank Credit Cards</div>
                        <div className="text-[13px] text-[#6b7280] line-clamp-2">Save Rs 500 &amp; 0% markup installments</div>
                      </div>
                    </div>
                    <a href="#apply" className="flex-none ml-2 font-medium text-[#4D7C0F] underline hover:text-[#5f9200]">
                      Apply now
                    </a>
                  </div>

                  {/* Payment Card 2 */}
                  <div className="flex-none min-w-[280px] snap-start flex items-center justify-between rounded-[8px] bg-[#f2f9e6] p-3 text-[14px]">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#4D7C0F] font-bold text-[12px] shadow-sm">
                        HB
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium text-[#1f2937] line-clamp-2">HBL Solar Financing</div>
                        <div className="text-[13px] text-[#6b7280] line-clamp-2">Flexible monthly payment plans</div>
                      </div>
                    </div>
                    <a href="#apply" className="flex-none ml-2 font-medium text-[#4D7C0F] underline hover:text-[#5f9200]">
                      Apply now
                    </a>
                  </div>
                </ScrollRow>
              </div>

              {/* Promo Banners */}
              <div className="mt-5 flex flex-col gap-3">
                {/* Banner 1 */}
                <div className="relative flex min-h-[110px] sm:min-h-[120px] items-center justify-between overflow-hidden rounded-[12px] bg-gradient-to-r from-[#4D7C0F] to-[#79B900] p-5 text-white shadow-sm">
                  <div className="relative z-10 max-w-[70%]">
                    <div className="text-[11px] uppercase opacity-90 font-medium">Limited Offer</div>
                    <div className="mt-1 text-[18px] sm:text-[20px] font-bold leading-tight">Get 15% Cashback</div>
                    <div className="mt-1 text-[13px] opacity-90">No Minimum Order requirement across all solar systems</div>
                  </div>
                  <div className="relative z-10 shrink-0 rounded-[6px] bg-white/25 backdrop-blur-sm px-3 py-1.5 font-mono text-[12px] font-bold text-white border border-white/30">
                    CODE: SOLAR15
                  </div>
                </div>

                {/* Banner 2 */}
                <div className="relative flex min-h-[110px] sm:min-h-[120px] items-center justify-between overflow-hidden rounded-[12px] bg-gradient-to-r from-[#1f2937] to-[#344034] p-5 text-white shadow-sm">
                  <div className="relative z-10 max-w-[70%]">
                    <div className="text-[11px] uppercase opacity-90 font-medium text-[#79B900]">Solamo Express</div>
                    <div className="mt-1 text-[18px] sm:text-[20px] font-bold leading-tight">Free Site Survey</div>
                    <div className="mt-1 text-[13px] opacity-90">Book professional inspection &amp; energy audit today</div>
                  </div>
                  <div className="relative z-10 shrink-0 rounded-[6px] bg-[#79B900] px-3 py-1.5 text-[12px] font-bold text-white">
                    Book Now
                  </div>
                </div>
              </div>

              {/* Frequently Bought Together Section */}
              <div className="mt-6">
                <div className="mb-3 text-[13px] font-bold text-[#6b7280] tracking-[0.02em] uppercase">
                  FREQUENTLY BOUGHT TOGETHER
                </div>
                <ScrollRow className="items-center gap-2">
                  {fbtProducts.map((p, idx) => (
                    <React.Fragment key={p.id + idx}>
                      {idx > 0 && (
                        <div className="flex-none lg:flex-none flex items-center justify-center h-8 w-8 text-[#6b7280] font-bold text-[18px]">
                          +
                        </div>
                      )}
                      <div className="w-[150px] flex-none lg:w-auto lg:flex-1 lg:min-w-0 snap-start relative rounded-[8px] bg-[#f3f4f0] p-3 flex flex-col items-center text-center border border-[#e5e8e1]">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="absolute top-2 left-2 accent-[#79B900]"
                          aria-label={`Select ${p.name}`}
                        />
                        <div className="h-20 w-20 flex items-center justify-center my-2">
                          <img src={p.image} alt={p.name} className="max-h-full max-w-full object-contain" />
                        </div>
                        <div className="text-[14px] font-bold text-[#1f2937] mt-1">
                          Rs {(p.price ?? 150000).toLocaleString()}
                        </div>
                        <div className="text-[13px] text-[#6b7280] line-clamp-2 mt-1 leading-tight">
                          {p.name}
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </ScrollRow>
              </div>
            </div>

            {/* RIGHT SIDEBAR */}
            <aside
              className="
                lg:sticky
                lg:top-24
                flex
                flex-col
                rounded-[8px]
                border
                border-[#e5e8e1]
                bg-white
                text-[#1f2937]
                overflow-hidden
                shadow-sm
              "
            >
              {/* Seller Header */}
              <div className="p-4 border-b border-[#e5e8e1] flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f2f9e6] text-[#4D7C0F] font-bold text-[14px]">
                  S
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[14px] font-medium text-[#1f2937] hover:underline cursor-pointer">
                    Sold by <span className="font-bold">Solamo Energy</span> &gt;
                  </div>
                  <div className="text-[13px] font-medium text-[#4D7C0F] mt-0.5">
                    4.7 ★ | 95% Positive
                  </div>
                </div>
              </div>

              {/* Two rounded stat pills */}
              <div className="px-3 py-3 bg-white border-b border-[#e5e8e1] flex flex-col gap-[6px] text-[14px]">
                <div className="flex items-center justify-between rounded-md bg-[#f3f4f0] px-3 py-2">
                  <span className="text-[#6b7280] font-normal">Item as shown</span>
                  <span className="font-bold text-[#4D7C0F]">90%</span>
                </div>
                <div className="flex items-center justify-between rounded-md bg-[#f3f4f0] px-3 py-2">
                  <span className="text-[#6b7280] font-normal">Partner since</span>
                  <span className="font-bold text-[#4D7C0F]">3+ Y</span>
                </div>
              </div>

              {/* More offers button */}
              <div className="p-3 border-b border-[#e5e8e1]">
                <a
                  href="#offers"
                  className="flex items-center justify-between rounded-[6px] border border-[#d8ddd3] bg-white px-3 py-2 text-[14px] font-medium text-[#4D7C0F] hover:bg-[#f9faf8]"
                >
                  <span>More offers from other sellers</span>
                  <span>&gt;</span>
                </a>
              </div>

              {/* Rows with icons */}
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

              {/* Estimated Price Content */}
              <div className="px-4 py-3.5 border-b border-[#e5e8e1]">
                <div className="text-[14px] font-normal text-[#6b7280]">
                  Estimated Price
                </div>
                <div className="mt-1 text-[22px] font-bold leading-7 text-[#1f2937]">
                  {hasPrice ? `Rs ${price.toLocaleString()}` : "Price on Request"}
                </div>
              </div>

              <div className="p-4">
                <a
                  href="/free-quote"
                  className="
                    flex
                    h-[44px]
                    w-full
                    items-center
                    justify-center
                    rounded-[6px]
                    bg-[#79B900]
                    text-[14px]
                    font-bold
                    uppercase
                    text-white
                    transition-colors
                    hover:bg-[#5f9200]
                  "
                >
                  Get Free Quote
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    mt-2
                    flex
                    h-[44px]
                    w-full
                    items-center
                    justify-center
                    rounded-[6px]
                    border
                    border-[#25D366]
                    text-[14px]
                    font-bold
                    uppercase
                    text-[#128C7E]
                    transition-colors
                    hover:bg-[#25D366]
                    hover:text-white
                  "
                >
                  WhatsApp Us
                </a>
              </div>
            </aside>
          </div>
        </div>

        {/* Light gray full-width separator band */}
        <div className="h-3 w-full bg-[#f3f4f0]" />

        {/* =========================
            TABS & PRODUCT OVERVIEW
        ========================== */}
        <div className="border-b border-[#eceee8] bg-white sticky top-0 z-20 shadow-xs">
          <div className="mx-auto flex max-w-[1800px] gap-3 overflow-x-auto px-4 py-3 md:px-6 lg:px-8 scrollbar-none">
            <a
              href="#overview"
              className="
                shrink-0
                rounded-full
                border
                border-[#d8ddd3]
                bg-white
                px-4
                py-2
                text-[14px]
                font-medium
                text-[#1f2937]
                transition-colors
                hover:border-[#79B900]
                hover:text-[#5f9200]
              "
            >
              Product Overview
            </a>
            <a
              href="#ratings-reviews"
              className="
                shrink-0
                rounded-full
                border
                border-[#d8ddd3]
                bg-white
                px-4
                py-2
                text-[14px]
                font-medium
                text-[#1f2937]
                transition-colors
                hover:border-[#79B900]
                hover:text-[#5f9200]
              "
            >
              Ratings &amp; Reviews
            </a>
          </div>
        </div>

        <div className="mx-auto max-w-[1800px] px-4 md:px-6 lg:px-8 py-8">
          <section id="overview" className="scroll-mt-24">
            <h2 className="mb-4 border-b border-[#e5e8e1] pb-3 text-[22px] font-bold leading-[1.3] text-[#1f2937]">
              Product Overview
            </h2>
            <p className="max-w-[1000px] text-[14px] font-normal leading-6 text-[#4f584f]">
              {product.description || brand.description}
            </p>

            {/* Specifications INSIDE Product Overview */}
            <div id="specifications" className="mt-8 scroll-mt-24">
              <div className="mb-3 text-[13px] font-bold text-[#6b7280] tracking-[0.02em] uppercase">
                SPECIFICATIONS
              </div>
              <div className="grid grid-cols-1 gap-x-3 md:grid-cols-2">
                <SpecRow label="Model Name" value={product.name} />
                <SpecRow label="Model Number" value={product.id} />
                <SpecRow label="Category" value={product.category} />
                <SpecRow label="Manufacturer" value={brand.name} />
                <SpecRow label="Availability" value="In Stock / Ready" />
                <SpecRow label="Warranty" value="Standard warranty included" />
              </div>
            </div>
          </section>
        </div>

        {/* Light gray full-width separator band */}
        <div className="h-3 w-full bg-[#f3f4f0]" />

        {/* =========================
            8. PRODUCT RATINGS & REVIEWS
        ========================== */}
        <div className="mx-auto max-w-[1800px] px-4 md:px-6 lg:px-8 py-12" id="ratings-reviews">
          <h2 className="mb-6 border-b border-[#e5e8e1] pb-3 text-[22px] font-bold leading-[1.3] text-[#1f2937]">
            Product Ratings &amp; Reviews
          </h2>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start relative">
            {/* Left side */}
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-[#f2f9e6] text-[#79B900]">
                <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <p className="text-[15px] font-medium text-[#1f2937] max-w-[320px]">
                This product doesn&apos;t have any ratings or reviews yet.
              </p>
              <p className="mt-1.5 text-[14px] font-normal text-[#6b7280] max-w-[320px]">
                Be the first to share your experience with Solamo Energy products!
              </p>
            </div>

            {/* Desktop thin vertical divider line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#e5e8e1]" />

            {/* Right side */}
            <div className="flex flex-col gap-6 lg:pl-8">
              <div className="flex items-start gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f2f9e6] text-[#4D7C0F] text-[12px] font-bold mt-0.5">
                  ?
                </div>
                <div>
                  <h3 className="text-[15px] font-medium text-[#1f2937]">
                    How do I review this product?
                  </h3>
                  <p className="mt-1 text-[14px] font-normal text-[#6b7280] leading-5">
                    If you recently purchased this product from Solamo Energy, go to your Orders page and click on the Submit Review button.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f2f9e6] text-[#4D7C0F] text-[12px] font-bold mt-0.5">
                  ?
                </div>
                <div>
                  <h3 className="text-[15px] font-medium text-[#1f2937]">
                    Where do the reviews come from?
                  </h3>
                  <p className="mt-1 text-[14px] font-normal text-[#6b7280] leading-5">
                    Our reviews are from Solamo Energy customers who purchased the product and submitted a review.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Sticky Bottom Bar on Mobile (<640px) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#e5e8e1] p-3 shadow-lg flex items-center gap-3 sm:hidden">
        <a
          href="/free-quote"
          className="
            flex
            h-[44px]
            flex-1
            items-center
            justify-center
            rounded-[6px]
            bg-[#79B900]
            text-[14px]
            font-bold
            uppercase
            text-white
            hover:bg-[#5f9200]
          "
        >
          Get Free Quote
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex
            h-[44px]
            flex-1
            items-center
            justify-center
            rounded-[6px]
            border
            border-[#25D366]
            text-[14px]
            font-bold
            uppercase
            text-[#128C7E]
            hover:bg-[#25D366]
            hover:text-white
          "
        >
          WhatsApp Us
        </a>
      </div>

      <SolamoFooter />
      </div>
    </>
  );
}

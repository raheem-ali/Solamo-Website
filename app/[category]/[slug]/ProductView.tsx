"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MessageCircle, Phone, Search, X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/lib/api";

const PLACEHOLDER_IMAGE =
  "https://solamoenergy.com/wp-content/uploads/2026/07/default-banner.png";

type RelatedProduct = {
  title: string;
  description: string;
  price: number;
  image: string;
  link: string;
};

type Props = {
  product: Product;
  related: RelatedProduct[];
  whatsappHref: string | null;
  callHref: string | null;
};

// 150000 -> "Rs150,000" (en-US so the grouping is always 150,000)
const rs = (n: number | string) => `Rs${Math.round(Number(n)).toLocaleString("en-US")}`;

export default function ProductView({ product, related, whatsappHref, callHref }: Props) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const productImages = product.images.length > 0 ? product.images : [PLACEHOLDER_IMAGE];
  const onSale = Boolean(product.sale_price);

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f7f7] text-[#172217] font-sans">
      {/* Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-grow w-full">

        {/* =========================================================
            SECTION 1: PRODUCT HERO & DETAILS (50/50 Split)
        ========================================================= */}
        <section className="w-full py-12 px-6 sm:px-12 lg:px-20">
          <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* LEFT COLUMN: Product Images & Gallery */}
            <div className="space-y-4">
              {/* Main Featured Image Box */}
              <div
                className="relative w-full aspect-square bg-white rounded-2xl border border-gray-200/60 shadow-sm flex items-center justify-center group cursor-pointer overflow-hidden p-6"
                onClick={() => setIsZoomOpen(true)}
              >
                <img
                  src={productImages[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                />

                {/* Zoom Button Icon Top Right */}
                <button
                  onClick={(e) => { e.stopPropagation(); setIsZoomOpen(true); }}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-gray-700 shadow-md transition-all duration-200"
                  aria-label="Zoom image"
                >
                  <Search className="w-4 h-4" />
                </button>

                {/* Navigation arrows if multiple images exist */}
                {productImages.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex((prev) => (prev === 0 ? productImages.length - 1 : prev - 1));
                      }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-md text-gray-700"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex((prev) => (prev === productImages.length - 1 ? 0 : prev + 1));
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-md text-gray-700"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails Row */}
              {productImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {productImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`relative w-20 h-20 rounded-xl bg-white border-2 overflow-hidden shrink-0 transition-all ${
                        currentImageIndex === idx ? "border-[#79B900] ring-2 ring-[#79B900]/20" : "border-gray-200 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-contain p-1" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: Product Details & Specs */}
            <div className="space-y-4">

              {/* Brand Tag Badge */}
              {product.brand_name && (
                <div>
                  <span className="inline-block bg-[#79B900] text-white text-xs font-bold uppercase px-3 py-1 rounded-full tracking-wider">
                    {product.brand_name}
                  </span>
                </div>
              )}

              {/* Product Title */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172217] tracking-tight uppercase">
                  {product.name}
                </h1>
                {product.subtitle && (
                  <p className="text-xs sm:text-sm font-medium text-gray-500 mt-0.5">
                    {product.subtitle}
                  </p>
                )}
              </div>

              {/* Pricing Section */}
              <div className="flex items-center gap-4">
                {onSale && (
                  <span className="text-lg sm:text-xl font-bold text-red-500 line-through">
                    {rs(product.regular_price)}
                  </span>
                )}
                <span className="text-2xl sm:text-3xl font-black text-[#79B900]">
                  {Number(product.sale_price || product.regular_price) > 0
                    ? rs(product.sale_price || product.regular_price)
                    : "Price on Request"}
                </span>
              </div>

              {/* Sold By Box */}
              <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-200/80 shadow-sm">
                <div className="w-9 h-9 shrink-0 flex items-center justify-center">
                  <img
                    src="https://solamoenergy.com/wp-content/uploads/2026/05/cropped-favicon-solamo-32x32.png"
                    alt={product.tenant_name}
                    className="w-7 h-7 object-contain"
                  />
                </div>
                <div>
                  <p className="text-[11px] text-gray-500 font-medium leading-none">
                    Sold by official trader
                  </p>
                  <p className="text-sm font-bold text-[#172217] mt-0.5">
                    {product.tenant_name}
                  </p>
                </div>
              </div>

              {/* Action Buttons (each one only shows if the shop added that number) */}
              {(whatsappHref || callHref) && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {whatsappHref && (
                      <a
                        href={whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-[#00E676] hover:bg-[#00c865] text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 shadow-md shadow-[#00E676]/20 text-sm"
                      >
                        <MessageCircle className="w-4 h-4 fill-current" />
                        <span>Order On Whatsapp</span>
                      </a>
                    )}

                    {callHref && (
                      <a
                        href={callHref}
                        className="flex items-center justify-center gap-2 bg-[#79B900] hover:bg-[#689e00] text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 shadow-md shadow-[#79B900]/20 text-sm"
                      >
                        <Phone className="w-4 h-4 fill-current" />
                        <span>Call US</span>
                      </a>
                    )}
                  </div>

                  {whatsappHref && (
                    <p className="text-[11px] text-gray-500 text-center sm:text-left">
                      Opens WhatsApp with this product pre-filled — our team confirms your order directly.
                    </p>
                  )}
                </>
              )}

              {/* Specifications Table */}
              {product.attributes.length > 0 && (
                <div className="pt-2 border-t border-gray-200 space-y-1.5">
                  {product.attributes.map((a) => (
                    <div
                      key={`${a.attribute_name}-${a.attribute_value}`}
                      className="flex justify-between items-center py-2 border-b border-gray-200 text-sm gap-4"
                    >
                      <span className="text-gray-500 font-medium">{a.attribute_name}</span>
                      <span className="font-bold text-[#172217] text-right">{a.attribute_value}</span>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 2: ABOUT PRODUCT (Left-Aligned Restricted Width)
            The text comes from the product description in the dashboard.
        ========================================================= */}
        {product.description && (
          <section className="w-full py-16 px-6 sm:px-12 lg:px-20 bg-white border-t border-gray-200/60">
            <div className="max-w-[850px] ml-0 space-y-8">

              <h3 className="text-xl sm:text-2xl font-bold text-[#172217]">
                About Product
              </h3>

              <div
                className="space-y-6
                  [&_p]:text-gray-600 [&_p]:text-base sm:[&_p]:text-lg [&_p]:leading-relaxed
                  [&_strong]:text-[#172217]
                  [&_h2]:text-2xl sm:[&_h2]:text-3xl lg:[&_h2]:text-4xl [&_h2]:font-extrabold [&_h2]:text-[#172217] [&_h2]:tracking-tight [&_h2]:leading-snug
                  [&_h3]:text-xl sm:[&_h3]:text-2xl lg:[&_h3]:text-3xl [&_h3]:font-extrabold [&_h3]:text-[#172217] [&_h3]:pt-4
                  [&_h4]:text-lg sm:[&_h4]:text-xl [&_h4]:font-bold [&_h4]:text-[#172217] [&_h4]:pt-2
                  [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:text-gray-600 [&_ul]:text-base sm:[&_ul]:text-lg [&_ul]:space-y-1
                  [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:text-gray-600 [&_ol]:text-base sm:[&_ol]:text-lg [&_ol]:space-y-1
                  [&_table]:w-full [&_td]:border [&_td]:border-gray-200 [&_td]:p-2 [&_th]:border [&_th]:border-gray-200 [&_th]:bg-gray-50 [&_th]:p-2 [&_th]:text-left"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />

            </div>
          </section>
        )}

        {/* =========================================================
            SECTION 3: URDU BANNER & CTA SECTION
        ========================================================= */}
        <section className="w-full py-16 px-6 sm:px-12 lg:px-20 bg-white">
          <div className="max-w-[1300px] mx-auto">
            <div className="relative w-full rounded-3xl overflow-hidden shadow-xl min-h-[360px] sm:min-h-[400px] flex items-center justify-center p-8 sm:p-12">

              {/* Background Image with Dark Blue Overlay */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('https://solamoenergy.com/wp-content/uploads/2026/05/screen-18.png')` }}
              >
                <div className="absolute inset-0 bg-[#0f2847]/85 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0d2138]/90 via-[#13315c]/80 to-[#0d2138]/90" />
              </div>

              {/* Content Container */}
              <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">

                {/* Urdu Heading */}
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white leading-relaxed font-sans tracking-wide" dir="rtl">
                  سولر پینل انسٹالیشن کروانی ہے؟
                </h2>

                {/* Urdu Subtitle/Description */}
                <p className="text-sm sm:text-lg lg:text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto font-medium" dir="rtl">
                  ہماری ٹیم 12 سال کا سولر اور الیکٹریکل فیلڈ کا تجربہ رکھتی ہے، ساتھ میں 6 سال کی آفٹر سیلز سپورٹ جو کوئی اور نہیں دیتا۔
                </p>

                {/* WhatsApp Chat Now Button */}
                {whatsappHref && (
                  <div className="pt-4">
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2.5 bg-[#00E676] hover:bg-[#00c865] text-white font-bold text-base sm:text-lg py-4 px-8 rounded-full transition-all duration-300 shadow-lg shadow-[#00E676]/30 hover:scale-105"
                    >
                      <MessageCircle className="w-5 h-5 fill-current" />
                      <span>Chat Now!</span>
                    </a>
                  </div>
                )}

              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 4: RELATED PRODUCTS (Last Section)
        ========================================================= */}
        {related.length > 0 && (
          <section className="w-full py-16 px-6 sm:px-12 lg:px-20 bg-[#f7f7f7] border-t border-gray-200/60">
            <div className="max-w-[1300px] mx-auto space-y-8">

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172217] tracking-tight">
                Related Products
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {related.map((item) => (
                  <div
                    key={item.link}
                    className="bg-white rounded-2xl border border-gray-200/70 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden p-5 group"
                  >
                    {/* Product Image Container */}
                    <div className="w-full aspect-square bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center p-4 mb-4 relative">
                      <img
                        src={item.image || PLACEHOLDER_IMAGE}
                        alt={item.title}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Product Title */}
                    <h3 className="font-bold text-[#172217] text-base leading-snug line-clamp-2 mb-2">
                      {item.title}
                    </h3>

                    {/* Product Description */}
                    <p className="text-xs text-gray-500 line-clamp-3 mb-4 flex-grow">
                      {item.description}
                    </p>

                    {/* Price Row */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100 mb-4">
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</span>
                      <span className="text-lg font-black text-[#79B900]">
                        {item.price > 0 ? rs(item.price) : "On Request"}
                      </span>
                    </div>

                    {/* View More Button */}
                    <Link
                      href={item.link}
                      className="w-full bg-[#79B900] hover:bg-[#689e00] text-white font-bold py-2.5 px-4 rounded-xl text-center text-sm transition-colors duration-200 shadow-sm"
                    >
                      View More
                    </Link>
                  </div>
                ))}
              </div>

            </div>
          </section>
        )}

      </main>

      {/* Lightbox / Zoom Modal */}
      {isZoomOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setIsZoomOpen(false)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center p-4">
            <button
              onClick={() => setIsZoomOpen(false)}
              className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/80 p-2 rounded-full transition-colors z-10"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={productImages[currentImageIndex]}
              alt={`${product.name} zoomed`}
              className="max-w-full max-h-[85vh] object-contain rounded-lg bg-white p-4"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
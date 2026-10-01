"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MessageCircle, Phone, Search, X, ChevronLeft, ChevronRight } from "lucide-react";

// You can easily add more image URLs to this array!
const productImages = [
  "https://solamoenergy.com/wp-content/uploads/2026/05/Group-483728.png",
];

// Related Products Data
const relatedProducts = [
  {
    title: "Sunsynk Contour 2000 1kW Inverter with 2kWh Lithium Battery (IP20)",
    description: "All-in-one Sunsynk Contour 2000 IP20 portable trolley with 1kW inverter and 2kWh LiFePO4 battery.",
    price: "Rs150,000",
    image: "https://solamoenergy.com/wp-content/uploads/2026/05/Group-483728.png", // Replace with specific image if needed
    link: "#"
  },
  {
    title: "All-in-One XLS 6kW Hybrid Inverter with 5.1kWh Lithium Battery (IP40)",
    description: "All-in-one XLS 6kW hybrid inverter with 5.1kWh LiFePO4 battery and dual MPPT solar charger.",
    price: "Rs495,000",
    image: "https://solamoenergy.com/wp-content/uploads/2026/05/Group-483728.png",
    link: "#"
  },
  {
    title: "All-in-One XLS 8kW Hybrid Inverter with 5.1kWh Lithium Battery (IP40)",
    description: "All-in-one XLS 8kW hybrid inverter with 5.1kWh LiFePO4 battery and dual MPPT solar charger.",
    price: "Rs495,000",
    image: "https://solamoenergy.com/wp-content/uploads/2026/05/Group-483728.png",
    link: "#"
  },
  {
    title: "All-in-One 2.5kW Hybrid Inverter with 2kWh Lithium Battery (IP20)",
    description: "All-in-one LifeLynk S 2.5kW hybrid inverter with 2kWh LiFePO4 battery and built-in MPPT charger.",
    price: "Rs250,000",
    image: "https://solamoenergy.com/wp-content/uploads/2026/05/Group-483728.png",
    link: "#"
  }
];

export default function AIKOProductPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

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
                  alt="AIKO 665WATT"
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
              
              {/* AIKO Tag Badge */}
              <div>
                <span className="inline-block bg-[#79B900] text-white text-xs font-bold uppercase px-3 py-1 rounded-full tracking-wider">
                  AIKO
                </span>
              </div>

              {/* Product Title */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172217] tracking-tight uppercase">
                  AIKO 665WATT
                </h1>
                <p className="text-xs sm:text-sm font-medium text-gray-500 mt-0.5">
                  AIKO 665WATT
                </p>
              </div>

              {/* Pricing Section */}
              <div className="flex items-center gap-4">
                <span className="text-lg sm:text-xl font-bold text-red-500 line-through">
                  Rs28,800
                </span>
                <span className="text-2xl sm:text-3xl font-black text-[#79B900]">
                  Rs28,600
                </span>
              </div>

              {/* Sold By Box */}
              <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-200/80 shadow-sm">
                <div className="w-9 h-9 shrink-0 flex items-center justify-center">
                  <img
                    src="https://solamoenergy.com/wp-content/uploads/2026/05/cropped-favicon-solamo-32x32.png"
                    alt="Solamo Energy"
                    className="w-7 h-7 object-contain"
                  />
                </div>
                <div>
                  <p className="text-[11px] text-gray-500 font-medium leading-none">
                    Sold by official trader
                  </p>
                  <p className="text-sm font-bold text-[#172217] mt-0.5">
                    Solamo Energy
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <a
                  href="https://wa.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#00E676] hover:bg-[#00c865] text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 shadow-md shadow-[#00E676]/20 text-sm"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Order On Whatsapp</span>
                </a>

                <a
                  href="tel:+923000000000"
                  className="flex items-center justify-center gap-2 bg-[#79B900] hover:bg-[#689e00] text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 shadow-md shadow-[#79B900]/20 text-sm"
                >
                  <Phone className="w-4 h-4 fill-current" />
                  <span>Call US</span>
                </a>
              </div>

              <p className="text-[11px] text-gray-500 text-center sm:text-left">
                Opens WhatsApp with this product pre-filled — our team confirms your order directly.
              </p>

              {/* Specifications Table */}
              <div className="pt-2 border-t border-gray-200 space-y-1.5">
                <div className="flex justify-between items-center py-2 border-b border-gray-200 text-sm">
                  <span className="text-gray-500 font-medium">Wattage</span>
                  <span className="font-bold text-[#172217]">665W</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200 text-sm">
                  <span className="text-gray-500 font-medium">Type</span>
                  <span className="font-bold text-[#172217]">Solar Pannel</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200 text-sm">
                  <span className="text-gray-500 font-medium">Efficiency</span>
                  <span className="font-bold text-[#172217]">24.6%</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200 text-sm">
                  <span className="text-gray-500 font-medium">Dimensions</span>
                  <span className="font-bold text-[#172217]">2382 mm × 1134 mm × 30 mm</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200 text-sm">
                  <span className="text-gray-500 font-medium">Warranty</span>
                  <span className="font-bold text-[#172217]">15 Years</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 2: ABOUT PRODUCT (Left-Aligned Restricted Width)
        ========================================================= */}
        <section className="w-full py-16 px-6 sm:px-12 lg:px-20 bg-white border-t border-gray-200/60">
          <div className="max-w-[850px] ml-0 space-y-8">
            
            {/* Small Section Header */}
            <h3 className="text-xl sm:text-2xl font-bold text-[#172217]">
              About Product
            </h3>

            {/* Main Article Title */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#172217] tracking-tight leading-snug">
              AIKO 665W N-Type ABC Dual Glass High-Efficiency Solar Panel in Karachi
            </h2>

            {/* Paragraph 1 */}
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              Are you looking to lower your K-Electric bills or achieve complete energy independence with maximum solar generation per square foot? The <strong className="text-[#172217]">AIKO 665W N-Type ABC Solar Panel</strong> brings world-record cell efficiency, high power density, and industrial reliability directly to rooftop installations across Karachi. Powered by AIKO’s patented All-Back-Contact (ABC) technology, this module achieves an impressive 24.6% efficiency rating. It eliminates front grid metal lines to maximize light absorption, giving homes and businesses superior daily power output.
            </p>

            {/* Paragraph 2 */}
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              Rooftop solar systems in Karachi face tough weather conditions. Extreme summer heat waves, high coastal humidity, salt corrosion, heavy dust accumulation, and partial rooftop shading from water tanks or surrounding structures can degrade conventional solar panels quickly. The AIKO 665W ABC solar panel addresses every one of these local challenges. Featuring dual-glass construction, micro-crack resistance, an industry-leading low temperature coefficient, and cell-level partial shading optimization, it delivers stable high-wattage production when standard panels slow down.
            </p>

            {/* Sub-heading */}
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#172217] pt-4">
              Why the AIKO 665W ABC Panel is the Smart Choice for Karachi
            </h3>

            {/* Paragraph 3 */}
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              Karachi rooftops demand panels that perform under severe heat and limited installation space. Here is why upgrading to AIKO 665W N-Type ABC solar technology gives you the strongest return on investment:
            </p>

            {/* Feature Sub-heading 1 */}
            <h4 className="text-lg sm:text-xl font-bold text-[#172217] pt-2">
              1. 24.6% Ultra-High Efficiency with No Front Busbars
            </h4>

            {/* Paragraph 4 */}
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              Conventional solar panels feature shiny metal grid lines on the front face that reflect sunlight away, reducing overall efficiency. AIKO ABC technology moves 100% of electrical contacts to the back of the cell. This full-surface absorption area boosts module efficiency up to 24.6%. You generate significantly more kilowatt-hours per panel, making it ideal for residential roofs or commercial properties with limited mounting space in Karachi.
            </p>

          </div>
        </section>

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
                <div className="pt-4">
                  <a
                    href="https://wa.me/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 bg-[#00E676] hover:bg-[#00c865] text-white font-bold text-base sm:text-lg py-4 px-8 rounded-full transition-all duration-300 shadow-lg shadow-[#00E676]/30 hover:scale-105"
                  >
                    <MessageCircle className="w-5 h-5 fill-current" />
                    <span>Chat Now!</span>
                  </a>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 4: RELATED PRODUCTS (Last Section)
        ========================================================= */}
        <section className="w-full py-16 px-6 sm:px-12 lg:px-20 bg-[#f7f7f7] border-t border-gray-200/60">
          <div className="max-w-[1300px] mx-auto space-y-8">
            
            {/* Section Title */}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172217] tracking-tight">
              Related Products
            </h2>

            {/* Products Grid (4 Columns) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product, idx) => (
                <div 
                  key={idx}
                  className="bg-white rounded-2xl border border-gray-200/70 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden p-5 group"
                >
                  {/* Product Image Container */}
                  <div className="w-full aspect-square bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center p-4 mb-4 relative">
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" 
                    />
                  </div>

                  {/* Product Title */}
                  <h3 className="font-bold text-[#172217] text-base leading-snug line-clamp-2 mb-2">
                    {product.title}
                  </h3>

                  {/* Product Description */}
                  <p className="text-xs text-gray-500 line-clamp-3 mb-4 flex-grow">
                    {product.description}
                  </p>

                  {/* Price Row */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100 mb-4">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</span>
                    <span className="text-lg font-black text-[#79B900]">{product.price}</span>
                  </div>

                  {/* View More Button */}
                  <a
                    href={product.link}
                    className="w-full bg-[#79B900] hover:bg-[#689e00] text-white font-bold py-2.5 px-4 rounded-xl text-center text-sm transition-colors duration-200 shadow-sm"
                  >
                    View More
                  </a>
                </div>
              ))}
            </div>

          </div>
        </section>

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
              alt="AIKO 665WATT Zoomed"
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
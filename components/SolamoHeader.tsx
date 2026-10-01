"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  Menu,
  X,
  ArrowUpRight,
  Search,
  MapPin,
  User,
  ShoppingCart,
  Globe,
} from "lucide-react";

export default function SolamoHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <header className="sticky top-0 z-50 w-full overflow-x-clip bg-white shadow-sm">
      {/* =========================================================
          ANNOUNCEMENT BAR
          Desktop / tablet only
      ========================================================= */}
      <div className="hidden sm:block bg-[#84CC16] text-black text-[11px] sm:text-xs font-semibold py-1.5 px-4 text-center">
        Get Free Delivery & Expert Installation with Solamo Energy
      </div>

      {/* =========================================================
          MAIN HEADER
      ========================================================= */}
      <div className="bg-white">
        <div className="max-w-[1400px] mx-auto px-3 sm:px-5 lg:px-6 xl:px-8">
          {/* =====================================================
              DESKTOP / TABLET MAIN ROW
          ===================================================== */}
          <div className="flex items-center gap-3 lg:gap-5 py-2.5 min-h-[64px]">
            {/* LOGO */}
            <Link
              href="/"
              onClick={closeMobileMenu}
              className="shrink-0 flex items-center"
            >
              <Image
                src="https://solamoenergy.com/wp-content/uploads/2026/05/Logo-2-1-1536x517.png"
                alt="Solamo Energy"
                width={160}
                height={50}
                priority
                className="
                  w-[108px]
                  h-auto
                  sm:w-[125px]
                  lg:w-[140px]
                  xl:w-[150px]
                  object-contain
                "
              />
            </Link>

            {/* LOCATION - DESKTOP ONLY */}
            <div className="hidden xl:flex items-center gap-2 shrink-0 text-xs cursor-pointer rounded-md px-2 py-1.5 hover:bg-[#65A30D] transition">
              <MapPin className="w-5 h-5 text-black shrink-0" />

              <div className="leading-tight">
                <p className="text-gray-700 text-[11px]">
                  Installation Location
                </p>

                <p className="font-bold text-black flex items-center gap-1">
                  Pakistan
                  <span className="text-[9px]">▼</span>
                </p>
              </div>
            </div>

            {/* SEARCH */}
            <div className="hidden lg:block flex-1 min-w-0 relative">
              <input
                type="search"
                placeholder="Search for solar systems, inverters, solar panels..."
                className="
                  w-full
                  h-[40px]
                  sm:h-[42px]
                  bg-white
                  text-[12px]
                  sm:text-sm
                  text-gray-800
                  placeholder-gray-400
                  pl-3
                  sm:pl-4
                  pr-11
                  rounded-md
                 border-2
border-[#84CC16]
outline-none
shadow-sm
focus:ring-2
focus:ring-[#84CC16]
                "
              />

              <button
                type="button"
                aria-label="Search"
                className="
                  absolute
                  right-2.5
                  top-1/2
                  -translate-y-1/2
                  w-8
                  h-8
                  flex
                  items-center
                  justify-center
                  text-gray-500
                  hover:text-black
                  transition
                "
              >
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* RIGHT ACTIONS */}
            <div className="flex items-center shrink-0 ml-auto lg:ml-0 gap-3 sm:gap-4 lg:gap-5 text-black">
              {/* LANGUAGE */}
              <button
                type="button"
                className="hidden lg:flex items-center gap-1 text-sm hover:opacity-70 transition"
              >
                <Globe className="w-4 h-4" />
                <span>عربي</span>
              </button>

              <div className="hidden lg:block h-5 w-px bg-[#4D7C0F]/40" />

              {/* ACCOUNT */}
              <Link
                href="/my-account"
                onClick={closeMobileMenu}
                className="flex items-center gap-1.5 hover:opacity-70 transition"
                aria-label="Account"
              >
                <User className="w-5 h-5" />
                <span className="hidden lg:inline text-sm">Account</span>
              </Link>

              <div className="hidden sm:block h-5 w-px bg-[#4D7C0F]/40" />

              {/* CART */}
              <Link
                href="/cart"
                onClick={closeMobileMenu}
                className="relative flex items-center gap-1.5 hover:opacity-70 transition"
                aria-label="Cart"
              >
                <ShoppingCart className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />

                <span className="hidden lg:inline text-sm">Cart</span>

                <span
                  className="
                    absolute
                    -top-2
                    -right-2
                    sm:-right-2.5
                    bg-black
                    text-[#84CC16]
                    text-[9px]
                    font-bold
                    w-4
                    h-4
                    rounded-full
                    flex
                    items-center
                    justify-center
                  "
                >
                  0
                </span>
              </Link>

              {/* MOBILE MENU */}
              <button
                type="button"
                aria-label={
                  mobileMenuOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
                }
                aria-expanded={mobileMenuOpen}
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="
                  lg:hidden
                  shrink-0
                  w-9
                  h-9
                  sm:w-10
                  sm:h-10
                  rounded-md
                
                  flex
                  items-center
                  justify-center
                 bg-gray-100
hover:bg-[#ECFCCB]
                  transition
                "
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                ) : (
                  <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          MOBILE SEARCH ROW

          Separate row gives phones enough width for search.
      ========================================================= */}
      <div className="lg:hidden bg-white px-3 sm:px-5 pb-2.5">
        <div className="relative max-w-[1400px] mx-auto">
          <input
            type="search"
            placeholder="Search solar products..."
            className="
              w-full
              h-[40px]
              bg-white
              text-[12px]
              text-gray-800
              placeholder-gray-400
              pl-3
              pr-10
              rounded-md
              border-2
border-[#84CC16]
outline-none
shadow-sm
focus:ring-2
focus:ring-[#84CC16]
            "
          />

          <button
            type="button"
            aria-label="Search"
            className="
              absolute
              right-2
              top-1/2
              -translate-y-1/2
              w-8
              h-8
              flex
              items-center
              justify-center
              text-gray-500
            "
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* =========================================================
          DESKTOP NAVIGATION
      ========================================================= */}
      <nav className="hidden lg:block bg-white border-t border-gray-200 shadow-sm relative">
        <div
          onMouseLeave={() => setActiveDropdown(null)}
          className="
            max-w-[1400px]
            mx-auto
            px-4
            xl:px-6
            flex
            items-center
            gap-6
            xl:gap-8
            min-h-[46px]
            text-[11px]
            xl:text-xs
            font-semibold
            whitespace-nowrap
          "
        >
          <Link href="/" className="text-black hover:text-[#5f9200] transition">
            HOME
          </Link>

          <Link
            href="/about-us"
            className="text-gray-700 hover:text-[#5f9200] transition"
          >
            ABOUT US
          </Link>

          {/* SERVICES */}
          <div
            className="py-3 cursor-pointer"
            onMouseEnter={() => setActiveDropdown("services")}
          >
            <Link
              href="/services"
              className="text-gray-700 hover:text-[#5f9200] transition flex items-center gap-1"
            >
              SERVICES
              <ChevronDown className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* SHOP */}
          <div
            className="py-3 cursor-pointer"
            onMouseEnter={() => setActiveDropdown("shop")}
          >
            <Link
              href="/shop"
              className="text-gray-700 hover:text-[#5f9200] transition flex items-center gap-1"
            >
              SHOP
              <ChevronDown className="w-3.5 h-3.5" />
            </Link>
          </div>

          <Link
            href="/blog"
            className="text-gray-700 hover:text-[#5f9200] transition"
          >
            BLOG
          </Link>

          <Link
            href="/contact-us"
            className="text-gray-700 hover:text-[#5f9200] transition"
          >
            CONTACT US
          </Link>

          <Link
            href="/free-quote"
            className="
              ml-auto
              text-red-600
              hover:text-red-700
              transition
              font-bold
              flex
              items-center
              gap-1
            "
          >
            GET A FREE QUOTE
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* =====================================================
            MEGA MENU PANEL
            Full-width overlay, centered on the viewport (not on
            the trigger link) so it can never spill off-screen.
        ===================================================== */}
        {(activeDropdown === "services" || activeDropdown === "shop") && (
          <div
            className="absolute inset-x-0 top-full flex justify-center z-[70]"
            onMouseEnter={() =>
              setActiveDropdown(activeDropdown === "shop" ? "shop" : "services")
            }
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <div
              className="
                w-[min(1100px,calc(100vw-32px))]
                max-h-[calc(100vh-140px)]
                overflow-y-auto
                bg-white
                shadow-2xl
                border
                border-gray-100
                rounded-b-xl
                p-8
                xl:p-10
                grid
                grid-cols-1
                sm:grid-cols-4
                gap-8
                xl:gap-10
                text-sm
              "
            >
              {activeDropdown === "services" && (
                <>
                  <div>
                    <h4 className="font-bold text-black mb-4 pb-2 border-b border-gray-100 text-[13px] tracking-wide">
                      Residential Solar
                    </h4>

                    <ul className="space-y-3 text-gray-600 font-normal">
                      <li>
                        <Link
                          href="/services/hybrid"
                          className="hover:text-black transition"
                        >
                          Hybrid Solar Systems
                        </Link>
                      </li>

                      <li>
                        <Link
                          href="/services/on-grid"
                          className="hover:text-black transition"
                        >
                          On-Grid Systems
                        </Link>
                      </li>

                      <li>
                        <Link
                          href="/services/off-grid"
                          className="hover:text-black transition"
                        >
                          Off-Grid Systems
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-black mb-4 pb-2 border-b border-gray-100 text-[13px] tracking-wide">
                      Commercial & Agro
                    </h4>

                    <ul className="space-y-3 text-gray-600 font-normal">
                      <li>
                        <Link
                          href="/services/commercial"
                          className="hover:text-black transition"
                        >
                          Commercial Rooftop
                        </Link>
                      </li>

                      <li>
                        <Link
                          href="/services/agricultural"
                          className="hover:text-black transition"
                        >
                          Agricultural Tube Wells
                        </Link>
                      </li>

                      <li>
                        <Link
                          href="/services/net-metering"
                          className="hover:text-black transition"
                        >
                          Net Metering Support
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-black mb-4 pb-2 border-b border-gray-100 text-[13px] tracking-wide">
                      Maintenance
                    </h4>

                    <ul className="space-y-3 text-gray-600 font-normal">
                      <li>
                        <Link
                          href="/services/inspection"
                          className="hover:text-black transition"
                        >
                          System Inspection
                        </Link>
                      </li>

                      <li>
                        <Link
                          href="/services/cleaning"
                          className="hover:text-black transition"
                        >
                          Panel Cleaning
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* PROMO PANEL */}
                  <div className="relative rounded-lg overflow-hidden bg-gradient-to-br from-[#84CC16] to-[#65A30D] flex flex-col justify-end p-5 min-h-[180px]">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-black/70">
                      Karachi&apos;s #1 Partner
                    </p>
                    <p className="text-black font-extrabold text-lg leading-tight mt-1">
                      Free Site
                      <br />
                      Assessment
                    </p>
                    <Link
                      href="/free-quote"
                      className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-black underline underline-offset-2"
                    >
                      Get a Free Quote
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </>
              )}

              {activeDropdown === "shop" && (
                <>
                  <div>
                    <h4 className="font-bold text-black mb-4 pb-2 border-b border-gray-100 text-[13px] tracking-wide">
                      Solar Panels
                    </h4>

                    <ul className="space-y-3 text-gray-600 font-normal">
                      <li>
                        <Link
                          href="/shop/monocrystalline"
                          className="hover:text-black transition"
                        >
                          Monocrystalline
                        </Link>
                      </li>

                      <li>
                        <Link
                          href="/shop/bifacial"
                          className="hover:text-black transition"
                        >
                          Bifacial Panels
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-black mb-4 pb-2 border-b border-gray-100 text-[13px] tracking-wide">
                      Inverters & Batteries
                    </h4>

                    <ul className="space-y-3 text-gray-600 font-normal">
                      <li>
                        <Link
                          href="/shop/hybrid-inverters"
                          className="hover:text-black transition"
                        >
                          Hybrid Inverters
                        </Link>
                      </li>

                      <li>
                        <Link
                          href="/shop/lithium-batteries"
                          className="hover:text-black transition"
                        >
                          Lithium Batteries
                        </Link>
                      </li>

                      <li>
                        <Link
                          href="/shop/tubular-batteries"
                          className="hover:text-black transition"
                        >
                          Tubular Batteries
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-black mb-4 pb-2 border-b border-gray-100 text-[13px] tracking-wide">
                      Accessories
                    </h4>

                    <ul className="space-y-3 text-gray-600 font-normal">
                      <li>
                        <Link
                          href="/shop/cables"
                          className="hover:text-black transition"
                        >
                          DC Cables & Connectors
                        </Link>
                      </li>

                      <li>
                        <Link
                          href="/shop/structures"
                          className="hover:text-black transition"
                        >
                          Mounting Structures
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* PROMO PANEL */}
                  <div className="relative rounded-lg overflow-hidden bg-gradient-to-br from-gray-900 to-gray-700 flex flex-col justify-end p-5 min-h-[180px] text-white">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-white/60">
                      Every Solar Setup
                    </p>
                    <p className="font-extrabold text-lg leading-tight mt-1">
                      One Place.
                    </p>
                    <Link
                      href="/shop"
                      className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-white underline underline-offset-2"
                    >
                      Explore Shop
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* =========================================================
          MOBILE DRAWER
      ========================================================= */}
      {mobileMenuOpen && (
        <>
          {/* BACKDROP */}
          <button
            type="button"
            aria-label="Close menu"
            onClick={closeMobileMenu}
            className="
              lg:hidden
              fixed
              inset-0
              top-[104px]
              bg-black/30
              z-[60]
              cursor-default
            "
          />

          {/* DRAWER */}
          <div
            className="
              lg:hidden
              fixed
              left-0
              right-0
              top-[104px]
              bottom-0
              z-[65]
              bg-white
              shadow-2xl
              border-t
              border-gray-200
              overflow-y-auto
              overscroll-contain
            "
          >
            <div className="p-4 sm:p-6 pb-10">
              <nav className="flex flex-col">
                <Link
                  href="/"
                  onClick={closeMobileMenu}
                  className="
                    py-3.5
                    text-base
                    sm:text-lg
                    font-semibold
                    text-gray-900
                    border-b
                    border-gray-100
                  "
                >
                  Home
                </Link>

                <Link
                  href="/about-us"
                  onClick={closeMobileMenu}
                  className="
                    py-3.5
                    text-base
                    sm:text-lg
                    font-semibold
                    text-gray-900
                    border-b
                    border-gray-100
                  "
                >
                  About Us
                </Link>

                <Link
                  href="/services"
                  onClick={closeMobileMenu}
                  className="
                    py-3.5
                    text-base
                    sm:text-lg
                    font-semibold
                    text-gray-900
                    border-b
                    border-gray-100
                  "
                >
                  Services
                </Link>

                <Link
                  href="/shop"
                  onClick={closeMobileMenu}
                  className="
                    py-3.5
                    text-base
                    sm:text-lg
                    font-semibold
                    text-gray-900
                    border-b
                    border-gray-100
                  "
                >
                  Shop
                </Link>

                <Link
                  href="/blog"
                  onClick={closeMobileMenu}
                  className="
                    py-3.5
                    text-base
                    sm:text-lg
                    font-semibold
                    text-gray-900
                    border-b
                    border-gray-100
                  "
                >
                  Blog
                </Link>

                <Link
                  href="/contact-us"
                  onClick={closeMobileMenu}
                  className="
                    py-3.5
                    text-base
                    sm:text-lg
                    font-semibold
                    text-gray-900
                    border-b
                    border-gray-100
                  "
                >
                  Contact Us
                </Link>

                {/* MOBILE LOCATION */}
                <div
                  className="
                    mt-5
                    flex
                    items-center
                    gap-3
                    rounded-lg
                    bg-gray-50
                    border
                    border-gray-100
                    p-4
                  "
                >
                  <MapPin className="w-5 h-5 shrink-0" />

                  <div>
                    <p className="text-xs text-gray-500">
                      Installation Location
                    </p>

                    <p className="text-sm font-bold text-black">Pakistan</p>
                  </div>
                </div>

                {/* MOBILE LANGUAGE */}
                <button
                  type="button"
                  className="
                    mt-3
                    w-full
                    flex
                    items-center
                    gap-3
                    rounded-lg
                    bg-gray-50
                    border
                    border-gray-100
                    p-4
                    text-left
                  "
                >
                  <Globe className="w-5 h-5" />

                  <span className="text-sm font-semibold">عربي</span>
                </button>

                {/* CTA */}
                <Link
                  href="/free-quote"
                  onClick={closeMobileMenu}
                  className="
                    mt-5
                    w-full
                    min-h-[48px]
                    flex
                    items-center
                    justify-center
                    gap-2
                   bg-white
                    text-black
                    font-bold
                    text-sm
                    rounded-lg
                    shadow-sm
                   hover:bg-[#ECFCCB]
                    transition
                  "
                >
                  Get A Free Quote
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
              </nav>
            </div>
          </div>
        </>
      )}
    </header>
  );
}

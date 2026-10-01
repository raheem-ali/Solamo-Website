"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  Phone,
  ChevronDown,
  Menu,
  X,
  ArrowUpRight,
  Sun,
  Zap,
  Battery,
} from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
    setShopOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm overflow-x-clip">
      {/* =========================================================
          TOPBAR
      ========================================================= */}
      <div className="bg-[#79B900] text-white">
        <div className="max-w-[1300px] mx-auto px-3 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center justify-between gap-2 text-[11px] sm:text-sm font-medium">
            {/* Contact Info */}
            <div className="flex items-center gap-3 sm:gap-7 min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />

                <span className="truncate max-w-[180px] sm:max-w-none">
                  <b>Email:</b>{" "}
                  <a
                    href="mailto:info@solamoenergy.com"
                    className="hover:underline"
                  >
                    info@solamoenergy.com
                  </a>
                </span>
              </div>

              {/* Desktop / Tablet Customer Support */}
              <div className="hidden md:flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0" />

                <span>
                  <b>Customer Support:</b>{" "}
                  <a href="tel:+923141349717" className="hover:underline">
                    +92 314 1349717
                  </a>
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              <span className="hidden sm:inline font-normal">Follow Us –</span>

              <div className="flex items-center gap-1.5 sm:gap-2.5">
                {/* Facebook */}
                <a
                  href="https://www.facebook.com/SolamoEnergy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/40 transition"
                >
                  <svg
                    className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.8c0-.9.3-1.6 1.7-1.6h1.6V3.3C16.5 3.2 15.4 3 14.2 3c-2.4 0-4.1 1.5-4.1 4.2v2.6H7.5V13H10v8h3.5z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/solamoenergy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/40 transition"
                >
                  <svg
                    className="w-3 h-3 sm:w-3.5 sm:h-3.5"
                    viewBox="0 0 24 24"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />

                    <circle
                      cx="12"
                      cy="12"
                      r="4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />

                    <circle cx="17.5" cy="6.5" r="1" />
                  </svg>
                </a>

                {/* TikTok */}
                <a
                  href="https://www.tiktok.com/@solamoenergy"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/40 transition"
                >
                  <svg
                    className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16.6 3c.3 2 1.7 3.6 3.7 3.9v2.6c-1.4 0-2.7-.4-3.8-1.2v6.4a5.7 5.7 0 1 1-5.7-5.7c.3 0 .6 0 .9.07v2.7a3 3 0 1 0 2.1 2.86V3h2.8z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          MAIN NAVBAR
      ========================================================= */}
      <div className="bg-white">
        <div className="max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-8">
          <div className="min-h-[72px] sm:min-h-[82px] lg:min-h-[88px] flex items-center justify-between gap-3 lg:gap-5">
            {/* LOGO */}
            <Link
              href="/"
              className="flex items-center shrink-0"
              onClick={closeMobileMenu}
            >
              <Image
                src="https://solamoenergy.com/wp-content/uploads/2026/05/Logo-2-1-1536x517.png"
                alt="Solamo Energy"
                width={200}
                height={66}
                className="h-[45px] xs:h-[48px] sm:h-[56px] lg:h-[62px] xl:h-[66px] w-auto object-contain"
                priority
              />
            </Link>

            {/* =====================================================
                DESKTOP MENU
            ===================================================== */}
            <nav className="hidden lg:flex items-center gap-0 xl:gap-1">
              {/* HOME */}
              <Link
                href="/"
                className="relative px-3 xl:px-4 py-2.5 text-base xl:text-lg font-medium text-[#172217] hover:text-[#5f9200] transition-colors duration-300 after:absolute after:left-3 xl:after:left-4 after:right-3 xl:after:right-4 after:bottom-0 after:h-[2px] after:bg-[#79B900] after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                Home
              </Link>

              {/* ABOUT */}
              <Link
                href="/about-us"
                className="relative px-3 xl:px-4 py-2.5 text-base xl:text-lg font-medium text-[#172217] hover:text-[#5f9200] transition-colors duration-300 after:absolute after:left-3 xl:after:left-4 after:right-3 xl:after:right-4 after:bottom-0 after:h-[2px] after:bg-[#79B900] after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                About Us
              </Link>

              {/* ================= SERVICES DROPDOWN ================= */}
              <div
                className="relative group"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  type="button"
                  className="relative px-3 xl:px-4 py-2.5 text-base xl:text-lg font-medium text-[#172217] hover:text-[#5f9200] flex items-center gap-1.5 transition-colors duration-300 after:absolute after:left-3 xl:after:left-4 after:right-3 xl:after:right-4 after:bottom-0 after:h-[2px] after:bg-[#79B900] after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
                >
                  Services{" "}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      servicesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* ORIGINAL SERVICES DROPDOWN */}
                {servicesOpen && (
                  <div className="absolute top-full left-0 w-64 bg-white shadow-xl rounded-xl p-2 border border-gray-100 py-3">
                    <Link
                      href="/residential-solar"
                      className="block px-4 py-2.5 rounded-lg text-base font-medium text-[#172217] hover:bg-[#f2f9e6] hover:text-[#5f9200]"
                    >
                      Residential Solar
                    </Link>

                    <Link
                      href="/commercial-solar"
                      className="block px-4 py-2.5 rounded-lg text-base font-medium text-[#172217] hover:bg-[#f2f9e6] hover:text-[#5f9200]"
                    >
                      Commercial Solar
                    </Link>

                    <Link
                      href="/industrial-solar"
                      className="block px-4 py-2.5 rounded-lg text-base font-medium text-[#172217] hover:bg-[#f2f9e6] hover:text-[#5f9200]"
                    >
                      Industrial Solar
                    </Link>

                    <Link
                      href="/agricultural-solar"
                      className="block px-4 py-2.5 rounded-lg text-base font-medium text-[#172217] hover:bg-[#f2f9e6] hover:text-[#5f9200]"
                    >
                      Agricultural Solar
                    </Link>

                    <Link
                      href="/net-metering"
                      className="block px-4 py-2.5 rounded-lg text-base font-medium text-[#172217] hover:bg-[#f2f9e6] hover:text-[#5f9200]"
                    >
                      Net Metering
                    </Link>

                    <Link
                      href="/ev-charging-station"
                      className="block px-4 py-2.5 rounded-lg text-base font-medium text-[#172217] hover:bg-[#f2f9e6] hover:text-[#5f9200]"
                    >
                      EV Charging Station
                    </Link>

                    <Link
                      href="/solar-battery-storage"
                      className="block px-4 py-2.5 rounded-lg text-base font-medium text-[#172217] hover:bg-[#f2f9e6] hover:text-[#5f9200]"
                    >
                      Solar Battery Storage
                    </Link>

                    <Link
                      href="/franchise"
                      className="block px-4 py-2.5 rounded-lg text-base font-medium text-[#172217] hover:bg-[#f2f9e6] hover:text-[#5f9200]"
                    >
                      Franchise
                    </Link>
                  </div>
                )}
              </div>

              {/* ================= SHOP DROPDOWN ================= */}
              <div
                className="relative group"
                onMouseEnter={() => setShopOpen(true)}
                onMouseLeave={() => setShopOpen(false)}
              >
                <button
                  type="button"
                  className="relative px-3 xl:px-4 py-2.5 text-base xl:text-lg font-medium text-[#172217] hover:text-[#5f9200] flex items-center gap-1.5 transition-colors duration-300 after:absolute after:left-3 xl:after:left-4 after:right-3 xl:after:right-4 after:bottom-0 after:h-[2px] after:bg-[#79B900] after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
                >
                  Shop{" "}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      shopOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* ORIGINAL SHOP DROPDOWN */}
                {shopOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[780px] max-w-[calc(100vw-32px)] bg-white shadow-2xl rounded-2xl p-7 border border-gray-100 z-50">
                    <div className="grid grid-cols-[1.85fr_auto_1fr] gap-7 items-start">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-[#5f9200] mb-3">
                          Brands
                        </p>

                        <div className="grid grid-cols-3 gap-x-3 gap-y-1">
                          {[
                            "AIKO",
                            "Astronergy",
                            "Canadian Solar",
                            "Dynees",
                            "Genix Green",
                            "Goodwe",
                            "Grow Watt",
                            "Huawei",
                            "Inverex",
                            "JA Solar",
                            "Jinko Solar",
                            "Longi",
                            "Osaka",
                            "PylonTech",
                            "Solis",
                            "Sungrow",
                            "Trina Solar",
                          ].map((brand) => (
                            <Link
                              key={brand}
                              href={`/brand/${brand
                                .toLowerCase()
                                .replace(/\s+/g, "-")}`}
                              className="block py-1.5 px-2 text-sm font-semibold text-[#172217] hover:text-[#5f9200] hover:bg-[#f2f9e6] rounded-md transition"
                            >
                              {brand}
                            </Link>
                          ))}
                        </div>
                      </div>

                      <div className="w-[1px] bg-gray-200 self-stretch" />

                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-[#5f9200] mb-3">
                          Category
                        </p>

                        <div className="flex flex-col gap-1">
                          <Link
                            href="/solar-panels"
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#f2f9e6] transition group/cat"
                          >
                            <span className="w-8 h-8 rounded-lg bg-[#f2f9e6] text-[#5f9200] flex items-center justify-center">
                              <Sun className="w-4 h-4" />
                            </span>

                            <span className="font-semibold text-sm group-hover/cat:text-[#5f9200]">
                              Solar Panels
                            </span>
                          </Link>

                          <Link
                            href="/inverters"
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#f2f9e6] transition group/cat"
                          >
                            <span className="w-8 h-8 rounded-lg bg-[#f2f9e6] text-[#5f9200] flex items-center justify-center">
                              <Zap className="w-4 h-4" />
                            </span>

                            <span className="font-semibold text-sm group-hover/cat:text-[#5f9200]">
                              Inverters
                            </span>
                          </Link>

                          <Link
                            href="/batteries"
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#f2f9e6] transition group/cat"
                          >
                            <span className="w-8 h-8 rounded-lg bg-[#f2f9e6] text-[#5f9200] flex items-center justify-center">
                              <Battery className="w-4 h-4" />
                            </span>

                            <span className="font-semibold text-sm group-hover/cat:text-[#5f9200]">
                              Batteries
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-gray-100 grid grid-cols-2 gap-3">
                      <Link
                        href="/shop"
                        className="inline-flex items-center justify-center gap-2 bg-white text-[#5f9200] border border-[#79B900] font-semibold py-2.5 px-4 rounded-full hover:bg-[#79B900] hover:text-white transition"
                      >
                        Show All Products <ArrowUpRight className="w-4 h-4" />
                      </Link>

                      <Link
                        href="/brand"
                        className="inline-flex items-center justify-center gap-2 bg-white text-[#5f9200] border border-[#79B900] font-semibold py-2.5 px-4 rounded-full hover:bg-[#79B900] hover:text-white transition"
                      >
                        Shop By Brand <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* CONTACT */}
              <Link
                href="/contact-us"
                className="relative px-3 xl:px-4 py-2.5 text-base xl:text-lg font-medium text-[#172217] hover:text-[#5f9200] transition-colors duration-300 after:absolute after:left-3 xl:after:left-4 after:right-3 xl:after:right-4 after:bottom-0 after:h-[2px] after:bg-[#79B900] after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                Contact Us
              </Link>
            </nav>

            {/* RIGHT ACTION */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Desktop Book A Call */}
              <Link
                href="/free-quote"
                className="hidden lg:inline-flex items-center justify-center gap-2 bg-white text-black border-2 border-[#79B900] font-semibold py-3 px-5 xl:px-6 rounded-full shadow-md hover:bg-[#79B900] hover:text-black transition-all duration-300 text-sm xl:text-base whitespace-nowrap"
              >
                <span>Book A Call</span>
                <ArrowUpRight className="w-5 h-5" />
              </Link>

              {/* Mobile Menu */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="lg:hidden w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center border border-gray-200 rounded-lg text-[#172217] hover:bg-[#f2f9e6] hover:border-[#79B900] transition-colors shrink-0"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
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
          MOBILE DRAWER
      ========================================================= */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[114px] sm:top-[123px] bottom-0 z-40 bg-white border-t border-gray-200 shadow-2xl overflow-hidden">
          <div className="h-full overflow-y-auto overscroll-contain">
            <div className="px-4 sm:px-6 py-4 sm:py-6 pb-8">
              <nav className="flex flex-col">
                {/* HOME */}
                <Link
                  href="/"
                  className="group relative flex items-center min-h-[50px] px-3 text-[17px] sm:text-lg font-medium text-[#172217] hover:text-[#5f9200] transition-colors duration-300"
                  onClick={closeMobileMenu}
                >
                  <span className="relative inline-block">
                    Home
                    <span className="absolute left-0 right-0 bottom-[-4px] h-[2px] bg-[#79B900] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                  </span>
                </Link>

                {/* ABOUT */}
                <Link
                  href="/about-us"
                  className="group relative flex items-center min-h-[50px] px-3 text-[17px] sm:text-lg font-medium text-[#172217] hover:text-[#5f9200] transition-colors duration-300"
                  onClick={closeMobileMenu}
                >
                  <span className="relative inline-block">
                    About Us
                    <span className="absolute left-0 right-0 bottom-[-4px] h-[2px] bg-[#79B900] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                  </span>
                </Link>

                {/* SERVICES */}
                <div className="border-t border-gray-100 mt-1">
                  <button
                    type="button"
                    onClick={() => setServicesOpen((prev) => !prev)}
                    className="w-full min-h-[52px] px-3 flex items-center justify-between text-[17px] sm:text-lg font-medium text-[#172217] hover:text-[#5f9200] transition-colors"
                    aria-expanded={servicesOpen}
                  >
                    <span>Services</span>

                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-300 ${
                        servicesOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      servicesOpen
                        ? "max-h-[600px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="ml-3 sm:ml-4 mb-3 pl-4 border-l-2 border-[#79B900] flex flex-col">
                      <Link
                        href="/residential-solar"
                        className="flex items-center min-h-[44px] text-[15px] sm:text-base text-[#172217] hover:text-[#5f9200] transition-colors"
                        onClick={closeMobileMenu}
                      >
                        Residential Solar
                      </Link>

                      <Link
                        href="/commercial-solar"
                        className="flex items-center min-h-[44px] text-[15px] sm:text-base text-[#172217] hover:text-[#5f9200] transition-colors"
                        onClick={closeMobileMenu}
                      >
                        Commercial Solar
                      </Link>

                      <Link
                        href="/industrial-solar"
                        className="flex items-center min-h-[44px] text-[15px] sm:text-base text-[#172217] hover:text-[#5f9200] transition-colors"
                        onClick={closeMobileMenu}
                      >
                        Industrial Solar
                      </Link>

                      <Link
                        href="/agricultural-solar"
                        className="flex items-center min-h-[44px] text-[15px] sm:text-base text-[#172217] hover:text-[#5f9200] transition-colors"
                        onClick={closeMobileMenu}
                      >
                        Agricultural Solar
                      </Link>

                      <Link
                        href="/net-metering"
                        className="flex items-center min-h-[44px] text-[15px] sm:text-base text-[#172217] hover:text-[#5f9200] transition-colors"
                        onClick={closeMobileMenu}
                      >
                        Net Metering
                      </Link>

                      <Link
                        href="/ev-charging-station"
                        className="flex items-center min-h-[44px] text-[15px] sm:text-base text-[#172217] hover:text-[#5f9200] transition-colors"
                        onClick={closeMobileMenu}
                      >
                        EV Charging Station
                      </Link>

                      <Link
                        href="/solar-battery-storage"
                        className="flex items-center min-h-[44px] text-[15px] sm:text-base text-[#172217] hover:text-[#5f9200] transition-colors"
                        onClick={closeMobileMenu}
                      >
                        Solar Battery Storage
                      </Link>

                      <Link
                        href="/franchise"
                        className="flex items-center min-h-[44px] text-[15px] sm:text-base text-[#172217] hover:text-[#5f9200] transition-colors"
                        onClick={closeMobileMenu}
                      >
                        Franchise
                      </Link>
                    </div>
                  </div>
                </div>

                {/* SHOP */}
                <div className="border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setShopOpen((prev) => !prev)}
                    className="w-full min-h-[52px] px-3 flex items-center justify-between text-[17px] sm:text-lg font-medium text-[#172217] hover:text-[#5f9200] transition-colors"
                    aria-expanded={shopOpen}
                  >
                    <span>Shop</span>

                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-300 ${
                        shopOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      shopOpen
                        ? "max-h-[500px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-3 pb-4">
                      {/* Categories */}
                      <div className="mb-3">
                        <p className="text-xs font-bold uppercase tracking-wider text-[#5f9200] mb-2">
                          Category
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <Link
                            href="/solar-panels"
                            className="flex items-center gap-3 p-3 rounded-xl bg-[#f7faef] hover:bg-[#f2f9e6] transition"
                            onClick={closeMobileMenu}
                          >
                            <span className="w-9 h-9 shrink-0 rounded-lg bg-[#f2f9e6] text-[#5f9200] flex items-center justify-center">
                              <Sun className="w-4 h-4" />
                            </span>

                            <span className="font-semibold text-sm text-[#172217]">
                              Solar Panels
                            </span>
                          </Link>

                          <Link
                            href="/inverters"
                            className="flex items-center gap-3 p-3 rounded-xl bg-[#f7faef] hover:bg-[#f2f9e6] transition"
                            onClick={closeMobileMenu}
                          >
                            <span className="w-9 h-9 shrink-0 rounded-lg bg-[#f2f9e6] text-[#5f9200] flex items-center justify-center">
                              <Zap className="w-4 h-4" />
                            </span>

                            <span className="font-semibold text-sm text-[#172217]">
                              Inverters
                            </span>
                          </Link>

                          <Link
                            href="/batteries"
                            className="flex items-center gap-3 p-3 rounded-xl bg-[#f7faef] hover:bg-[#f2f9e6] transition"
                            onClick={closeMobileMenu}
                          >
                            <span className="w-9 h-9 shrink-0 rounded-lg bg-[#f2f9e6] text-[#5f9200] flex items-center justify-center">
                              <Battery className="w-4 h-4" />
                            </span>

                            <span className="font-semibold text-sm text-[#172217]">
                              Batteries
                            </span>
                          </Link>
                        </div>
                      </div>

                      {/* Shop buttons */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3 border-t border-gray-100">
                        <Link
                          href="/shop"
                          className="inline-flex items-center justify-center gap-2 bg-white text-[#5f9200] border border-[#79B900] font-semibold py-3 px-4 rounded-full hover:bg-[#79B900] hover:text-white transition text-sm"
                          onClick={closeMobileMenu}
                        >
                          Show All Products
                          <ArrowUpRight className="w-4 h-4" />
                        </Link>

                        <Link
                          href="/brand"
                          className="inline-flex items-center justify-center gap-2 bg-white text-[#5f9200] border border-[#79B900] font-semibold py-3 px-4 rounded-full hover:bg-[#79B900] hover:text-white transition text-sm"
                          onClick={closeMobileMenu}
                        >
                          Shop By Brand
                          <ArrowUpRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CONTACT */}
                <Link
                  href="/contact-us"
                  className="group relative flex items-center min-h-[52px] px-3 mt-1 border-t border-gray-100 text-[17px] sm:text-lg font-medium text-[#172217] hover:text-[#5f9200] transition-colors duration-300"
                  onClick={closeMobileMenu}
                >
                  <span className="relative inline-block">
                    Contact Us
                    <span className="absolute left-0 right-0 bottom-[-4px] h-[2px] bg-[#79B900] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                  </span>
                </Link>

                {/* BOOK A CALL */}
                <Link
                  href="/free-quote"
                  className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-white text-black border-2 border-[#79B900] font-semibold py-3.5 px-6 rounded-full shadow-md hover:bg-[#79B900] hover:text-black transition-all duration-300"
                  onClick={closeMobileMenu}
                >
                  <span>Book A Call</span>
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
              </nav>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

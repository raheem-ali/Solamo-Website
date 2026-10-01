import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Info, Mail, Phone, MapPin } from "lucide-react";

const solarPanelLinks = [
  { name: "Monocrystalline", href: "/shop/monocrystalline" },
  { name: "Bifacial Panels", href: "/shop/bifacial" },
];

const inverterBatteryLinks = [
  { name: "Hybrid Inverters", href: "/shop/hybrid-inverters" },
  { name: "Lithium Batteries", href: "/shop/lithium-batteries" },
  { name: "Tubular Batteries", href: "/shop/tubular-batteries" },
];

const accessoryLinks = [
  { name: "DC Cables & Connectors", href: "/shop/cables" },
  { name: "Mounting Structures", href: "/shop/structures" },
];

const serviceLinks = [
  { name: "Hybrid Solar Systems", href: "/services/hybrid" },
  { name: "On-Grid Systems", href: "/services/on-grid" },
  { name: "Off-Grid Systems", href: "/services/off-grid" },
  { name: "Commercial Rooftop", href: "/services/commercial" },
  { name: "Agricultural Tube Wells", href: "/services/agricultural" },
  { name: "Net Metering Support", href: "/services/net-metering" },
  { name: "System Inspection", href: "/services/inspection" },
  { name: "Panel Cleaning", href: "/services/cleaning" },
];

const topBrandLinks = [
  { name: "Jinko Solar", href: "/brand/jinko-solar/" },
  { name: "Huawei", href: "/brand/huawei/" },
  { name: "Grow Watt", href: "/brand/grow-watt/" },
  { name: "Longi", href: "/brand/longi/" },
  { name: "Astronergy", href: "/brand/astronergy/" },
  { name: "Sungrow", href: "/brand/sungrow/" },
  { name: "JA Solar", href: "/brand/ja-solar/" },
  { name: "Canadian Solar", href: "/brand/canadian-solar/" },
];

const companyLinks = [
  { name: "About Us", href: "/about-us" },
  { name: "Blog", href: "/blog" },
  { name: "Contact Us", href: "/contact-us" },
  { name: "Free Quote", href: "/free-quote" },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { name: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="font-bold text-[#111] mb-3 text-sm">{title}</h4>
      <ul className="space-y-2 text-[13px]">
        {links.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-gray-600 hover:text-black transition"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SolamoFooter() {
  return (
    <footer className="bg-[#f5f5f5] text-[#111] border-t border-gray-200 mt-10">
      <div className="bg-white border-b border-gray-200 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-[#111]">
              We&apos;re Always Here To Help
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Reach out to us through any of these support channels
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full lg:w-auto">
            <a
              href="https://help.solamoenergy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-[#f8f9fa] hover:bg-gray-100 p-3 rounded-lg border border-gray-100 transition"
            >
              <span className="w-9 h-9 rounded-full bg-[#84CC16] flex items-center justify-center shrink-0">
                <Info className="w-4 h-4 text-black" />
              </span>
              <div>
                <div className="text-[10px] text-gray-400 font-bold uppercase">
                  Help Center
                </div>
                <div className="text-sm font-bold text-[#111]">
                  help.solamoenergy.com
                </div>
              </div>
            </a>

            <a
              href="mailto:info@Solamoenergy.com"
              className="flex items-center gap-3 bg-[#f8f9fa] hover:bg-gray-100 p-3 rounded-lg border border-gray-100 transition"
            >
              <span className="w-9 h-9 rounded-full bg-[#84CC16] flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-black" />
              </span>
              <div>
                <div className="text-[10px] text-gray-400 font-bold uppercase">
                  Email Support
                </div>
                <div className="text-sm font-bold text-[#111] break-all">
                  info@Solamoenergy.com
                </div>
              </div>
            </a>

            <a
              href="tel:+923141349717"
              className="flex items-center gap-3 bg-[#f8f9fa] hover:bg-gray-100 p-3 rounded-lg border border-gray-100 transition"
            >
              <span className="w-9 h-9 rounded-full bg-[#84CC16] flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4 text-black" />
              </span>
              <div>
                <div className="text-[10px] text-gray-400 font-bold uppercase">
                  Call Us
                </div>
                <div className="text-sm font-bold text-[#111]">
                  +92 314 1349717
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8">
          <FooterColumn title="Solar Panels" links={solarPanelLinks} />
          <FooterColumn
            title="Inverters & Batteries"
            links={inverterBatteryLinks}
          />
          <FooterColumn title="Accessories" links={accessoryLinks} />
          <FooterColumn title="Services" links={serviceLinks} />
          <FooterColumn title="Top Brands" links={topBrandLinks} />
          <FooterColumn title="Company" links={companyLinks} />
        </div>

        <div className="flex items-start gap-2.5 mt-10 pt-8 border-t border-gray-200 text-sm text-gray-600 max-w-md">
          <MapPin className="w-4 h-4 text-black shrink-0 mt-0.5" />
          <span>
            Office # G5, Shakeel Residency, Plot # 96, Block # 9, Noor Deen Khan
            Road, Keamari, Karachi
          </span>
        </div>
      </div>

      <div className="bg-white border-t border-gray-200 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <Image
              src="https://solamoenergy.com/wp-content/uploads/2026/05/Logo-2-1-1536x517.png"
              alt="Solamo Energy"
              width={120}
              height={40}
              className="h-8 w-auto object-contain"
            />
            <p className="text-xs text-gray-500">
              © 2026 Solamo Energy. All Rights Reserved. |{" "}
              <Link href="/privacy-policy" className="hover:underline">
                Privacy Policy
              </Link>{" "}
              |{" "}
              <Link href="/terms-of-service" className="hover:underline">
                Terms of Service
              </Link>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-gray-500 uppercase mr-1 hidden sm:inline">
              Connect With Us
            </span>

            <a
              href="https://www.facebook.com/SolamoEnergy/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-9 h-9 rounded-full bg-[#84CC16] flex items-center justify-center hover:opacity-80 transition"
            >
              <svg className="w-4 h-4 fill-black" viewBox="0 0 24 24">
                <path d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.8c0-.9.3-1.6 1.7-1.6h1.6V3.3C16.5 3.2 15.4 3 14.2 3c-2.4 0-4.1 1.5-4.1 4.2v2.6H7.5V13H10v8h3.5z" />
              </svg>
            </a>

            <a
              href="https://www.instagram.com/solamoenergy/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full bg-[#84CC16] flex items-center justify-center hover:opacity-80 transition"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="5"
                  fill="none"
                  stroke="black"
                  strokeWidth="2"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="4"
                  fill="none"
                  stroke="black"
                  strokeWidth="2"
                />
                <circle cx="17.5" cy="6.5" r="1" fill="black" />
              </svg>
            </a>

            <a
              href="https://www.linkedin.com/company/solamo-energy/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-9 h-9 rounded-full bg-[#84CC16] flex items-center justify-center hover:opacity-80 transition"
            >
              <svg className="w-4 h-4 fill-black" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </a>

            <a
              href="https://www.tiktok.com/@solamoenergy"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="w-9 h-9 rounded-full bg-[#84CC16] flex items-center justify-center hover:opacity-80 transition"
            >
              <svg className="w-4 h-4 fill-black" viewBox="0 0 24 24">
                <path d="M16.6 3c.3 2 1.7 3.6 3.7 3.9v2.6c-1.4 0-2.7-.4-3.8-1.2v6.4a5.7 5.7 0 1 1-5.7-5.7c.3 0 .6 0 .9.07v2.7a3 3 0 1 0 2.1 2.86V3h2.8z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#172217] text-white pt-20 pb-10">
      <div className="max-w-[1300px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/10">
        {/* Col 1: About */}
        <div className="space-y-6">
          <Link href="https://solamoenergy.com">
            <Image
              src="https://solamoenergy.com/wp-content/uploads/2026/05/White-Logo-scaled.png"
              alt="Solamo Energy"
              width={180}
              height={60}
              className="h-12 w-auto object-contain"
            />
          </Link>
          <p className="text-gray-300 text-sm leading-relaxed">
            Our mission is to make solar energy accessible, affordable, and
            hassle-free for every home, business, farm, and factory in Karachi.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://www.facebook.com/SolamoEnergy/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-[#79B900] flex items-center justify-center hover:opacity-90 transition"
            >
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                <path d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.8c0-.9.3-1.6 1.7-1.6h1.6V3.3C16.5 3.2 15.4 3 14.2 3c-2.4 0-4.1 1.5-4.1 4.2v2.6H7.5V13H10v8h3.5z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/solamoenergy/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-[#79B900] flex items-center justify-center hover:opacity-90 transition"
            >
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="5"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="4"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                />
                <circle cx="17.5" cy="6.5" r="1" fill="white" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/solamo-energy/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-[#79B900] flex items-center justify-center hover:opacity-90 transition"
            >
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </a>
            <a
              href="https://www.tiktok.com/@solamoenergy"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-[#79B900] flex items-center justify-center hover:opacity-90 transition"
            >
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                <path d="M16.6 3c.3 2 1.7 3.6 3.7 3.9v2.6c-1.4 0-2.7-.4-3.8-1.2v6.4a5.7 5.7 0 1 1-5.7-5.7c.3 0 .6 0 .9.07v2.7a3 3 0 1 0 2.1 2.86V3h2.8z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Col 2: Services */}
        <div>
          <h3 className="text-xl font-bold mb-6 text-white">Services</h3>
          <ul className="space-y-3">
            {[
              { name: "Residential Solar", link: "/residential-solar" },
              { name: "Commercial Solar", link: "/commercial-solar" },
              { name: "Industrial Solar", link: "/industrial-solar" },
              { name: "Agricultural Solar", link: "/agricultural-solar" },
              { name: "EV Charging Station", link: "/ev-charging-station" },
              { name: "Net Metering", link: "/net-metering" },
              { name: "Battery Storage", link: "/solar-battery-storage" },
              { name: "Franchise", link: "/franchise" },
            ].map((item, idx) => (
              <li key={idx}>
                <Link
                  href={item.link}
                  className="text-gray-300 hover:text-[#79B900] transition flex items-center gap-2 text-sm"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#79B900]" />{" "}
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Company */}
        <div>
          <h3 className="text-xl font-bold mb-6 text-white">Company</h3>
          <ul className="space-y-3">
            {[
              { name: "About Us", link: "/about-us" },
              { name: "Blog", link: "/blog" },
              { name: "Contact Us", link: "/contact-us" },
              { name: "Free Quote", link: "/free-quote" },
            ].map((item, idx) => (
              <li key={idx}>
                <Link
                  href={item.link}
                  className="text-gray-300 hover:text-[#79B900] transition flex items-center gap-2 text-sm"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#79B900]" />{" "}
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Contact Now */}
        <div>
          <h3 className="text-xl font-bold mb-6 text-white">Contact Now</h3>
          <ul className="space-y-4 text-sm text-gray-300">
            <li className="pb-3 border-b border-white/10">
              <a
                href="mailto:info@Solamoenergy.com"
                className="flex items-start gap-3 hover:text-[#79B900] transition"
              >
                <Mail className="w-5 h-5 text-[#79B900] flex-shrink-0 mt-0.5" />
                <span>info@Solamoenergy.com</span>
              </a>
            </li>
            <li className="pb-3 border-b border-white/10">
              <a
                href="tel:+923141349717"
                className="flex items-start gap-3 hover:text-[#79B900] transition"
              >
                <Phone className="w-5 h-5 text-[#79B900] flex-shrink-0 mt-0.5" />
                <span>+92 314 1349717</span>
              </a>
            </li>
            <li>
              <a
                href="https://share.google/vjAaJsIp3e949DHvP"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 hover:text-[#79B900] transition"
              >
                <MapPin className="w-5 h-5 text-[#79B900] flex-shrink-0 mt-0.5" />
                <span>
                  Office # G5, Shakeel Residency, Plot # 96, Block # 9, Noor
                  Deen Khan Road, Keamari, Karachi
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1300px] mx-auto px-6 pt-8 text-center text-xs text-gray-400">
        <p>
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
    </footer>
  );
}

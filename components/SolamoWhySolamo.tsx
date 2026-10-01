"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Award,
  BatteryCharging,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Factory,
  Home,
  Leaf,
  MapPin,
  ShieldCheck,
  Users2,
  Zap,
} from "lucide-react";

const strengths = [
  {
    title: "Certified Solar",
    description:
      "Certified solar installation team with years of field experience.",
    icon: Award,
  },
  {
    title: "Premium Grade",
    description:
      "Premium-grade solar panels from globally trusted manufacturers.",
    icon: ShieldCheck,
  },
  {
    title: "Full Project Management",
    description:
      "Complete project management from design and installation to after-sales support.",
    icon: Users2,
  },
  {
    title: "5-Year Installation Warranty",
    description:
      "5-year installation warranty on residential and commercial projects.",
    icon: CheckCircle2,
  },
  {
    title: "Free Site Assessment",
    description: "Free site assessment with a zero-obligation consultation.",
    icon: MapPin,
  },
];

const services = [
  {
    title: "Residential Solar",
    description:
      "Power your home with clean energy and reduce your electricity costs.",
    icon: Home,
    href: "/services/residential-solar",
  },
  {
    title: "Commercial Solar",
    description:
      "Reduce operating costs for offices, plazas, and retail businesses.",
    icon: Building2,
    href: "/services/commercial-solar",
  },
  {
    title: "Industrial Solar",
    description:
      "Large-scale solar solutions for factories, warehouses, and manufacturing.",
    icon: Factory,
    href: "/services/industrial-solar",
  },
  {
    title: "Agricultural Solar",
    description:
      "Solar tube wells and farm energy systems designed to reduce operating costs.",
    icon: Leaf,
    href: "/services/agricultural-solar",
  },
  {
    title: "EV Charging Stations",
    description:
      "Future-ready EV charging infrastructure for homes and businesses.",
    icon: Zap,
    href: "/services/ev-charging-stations",
  },
  {
    title: "Solar Battery Storage",
    description:
      "Store solar energy and use it during load shedding or at night.",
    icon: BatteryCharging,
    href: "/services/solar-battery-storage",
  },
];

export default function SolamoWhySolamo() {
  return (
    <section className="w-full bg-[#f5f5f5] py-5 sm:py-7 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-5 lg:px-6 space-y-4">
        {/* WHY SOLAMO */}
        <div className="bg-white rounded-lg overflow-hidden">
          <div className="px-4 sm:px-6 lg:px-7 pt-5 pb-4 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#84CC16] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h2 className="text-[20px] sm:text-[23px] font-black text-[#111] leading-none">
                    Why Solamo Energy
                  </h2>
                  <p className="text-[10px] sm:text-[11px] text-gray-500 mt-1">
                    Quality solar solutions with professional project support
                  </p>
                </div>
              </div>
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-1 text-[11px] font-bold text-[#111] hover:text-gray-600 transition"
              >
                Talk to an Expert
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-gray-200">
            {strengths.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white p-4 sm:p-5 min-h-[185px] group hover:bg-[#F7FEE7] transition"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-10 h-10 rounded-md bg-[#ECFCCB] flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-[#111]" />
                    </div>
                    <span className="text-[18px] font-black text-gray-200 group-hover:text-[#84CC16] transition">
                      ✓
                    </span>
                  </div>
                  <h3 className="mt-4 text-[13px] sm:text-sm font-black text-[#111] leading-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[10px] sm:text-[11px] text-gray-500 leading-[1.5]">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* SERVICES */}
        <div className="bg-white rounded-lg overflow-hidden">
          <div className="px-4 sm:px-6 lg:px-7 pt-5 pb-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#84CC16] flex items-center justify-center">
                  <Zap className="w-4 h-4 text-black fill-black" />
                </div>
                <div>
                  <h2 className="text-[20px] sm:text-[23px] font-black text-[#111] leading-none">
                    Solar Solutions for Every Need
                  </h2>
                  <p className="text-[10px] sm:text-[11px] text-gray-500 mt-1">
                    Residential, commercial, industrial and energy solutions
                  </p>
                </div>
              </div>
              <Link
                href="/services"
                className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-[#111] hover:text-gray-600 transition"
              >
                View All
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border-t border-gray-100">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.title}
                  href={service.href}
                  className="group min-h-[175px] p-4 sm:p-5 border-r border-b border-gray-100 hover:bg-[#F7FEE7] transition"
                >
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-md bg-gray-100 group-hover:bg-[#84CC16] flex items-center justify-center transition">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#222]" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-black transition" />
                  </div>
                  <h3 className="mt-4 text-[12px] sm:text-[13px] font-black text-[#111] leading-tight">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-[9px] sm:text-[10px] text-gray-500 leading-[1.45] line-clamp-3">
                    {service.description}
                  </p>
                </Link>
              );
            })}
          </div>

          <div className="sm:hidden p-4 border-t border-gray-100">
            <Link
              href="/services"
              className="w-full h-[38px] bg-[#111] text-[#84CC16] rounded-md flex items-center justify-center gap-1 text-[10px] font-bold"
            >
              View All Services
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* FREE ASSESSMENT CTA */}
        <div className="bg-[#111] rounded-lg overflow-hidden">
          <div className="px-5 sm:px-7 py-6 sm:py-7 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#84CC16] flex items-center justify-center shrink-0">
                <ClipboardCheck className="w-5 h-5 text-black" />
              </div>
              <div>
                <h3 className="text-white text-base sm:text-lg font-black">
                  Start With a Free Site Assessment
                </h3>
                <p className="text-gray-400 text-[10px] sm:text-xs mt-1 max-w-[600px]">
                  Get a zero-obligation consultation and discuss the right solar
                  solution for your project.
                </p>
              </div>
            </div>
            <Link
              href="/free-quote"
              className="shrink-0 inline-flex items-center justify-center gap-1.5 bg-[#84CC16] hover:bg-[#65A30D] text-black font-black text-[11px] sm:text-xs px-5 py-3 rounded-md transition"
            >
              Get Free Quote
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

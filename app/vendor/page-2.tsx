'use client';

import React, { useState, useMemo } from "react";
import {
  Search,
  CheckCircle2,
  Star,
  MapPin,
  Clock,
  Package,
  LayoutGrid,
  Table as TableIcon,
  ShoppingCart,
  Eye,
  ChevronLeft,
  ChevronRight,
  X,
  RotateCcw,
  Info,
  Phone,
  Mail,
  ShieldCheck,
  MessageSquare,
  Award,
  Share2,
  Building2,
  FileCheck,
  BadgeCheck,
  UserCheck,
  Lock,
  Truck,
  ExternalLink,
  MessageCircle
} from "lucide-react";

// Project Header and Footer Components
import SolamoHeader from "@/components/SolamoHeader";
import BrandAdBanner from "@/components/BrandAdBanner";
import SolamoCtaBanner from "@/components/SolamoCtaBanner";
import SolamoFooter from "@/components/SolamoFooter";
import WhatsAppFloat from "@/components/WhatsAppFloat";

// Product Data Type
interface Product {
  id: string;
  name: string;
  sku: string;
  category: "Inverters" | "Solar Panels" | "Batteries";
  specs: {
    power?: string;
    type?: string;
    mppt?: string;
    efficiency?: string;
    voltage?: string;
    cycles?: string;
    warranty?: string;
  };
  pricePKR: number;
  stockStatus: "In Stock" | "Low Stock" | "Pre-Order";
  stockCount?: number;
}

// Sample Data tailored for Solar Products (Image-free setup)
const VENDOR_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Growatt 5kW Hybrid Solar Inverter",
    sku: "GW-5000-TL3",
    category: "Inverters",
    specs: {
      power: "5000W Output",
      type: "Pure Sine Wave",
      mppt: "Dual MPPT Controller",
      warranty: "5 Years Manufacturer Warranty",
    },
    pricePKR: 285000,
    stockStatus: "In Stock",
  },
  {
    id: "2",
    name: "Jinko 550W N-Type Solar Panel (Mono)",
    sku: "JK-550N",
    category: "Solar Panels",
    specs: {
      power: "550 Watts",
      efficiency: "22.5% Efficiency",
      type: "Half-Cell Monocrystalline",
      warranty: "12 Yrs Product / 30 Yrs Power",
    },
    pricePKR: 32500,
    stockStatus: "Low Stock",
    stockCount: 5,
  },
  {
    id: "3",
    name: "Felicity 10kWh LiFePO4 Battery",
    sku: "FL-LPBF48200",
    category: "Batteries",
    specs: {
      voltage: "51.2V 200Ah",
      cycles: "6000+ Deep Cycles",
      type: "Rack Mount Lithium Iron",
      warranty: "10 Years Warranty",
    },
    pricePKR: 650000,
    stockStatus: "Pre-Order",
  },
  {
    id: "4",
    name: "Must 3.6kW Off-Grid Solar Inverter",
    sku: "PH1800-3K",
    category: "Inverters",
    specs: {
      power: "3600W Output",
      type: "Pure Sine Wave",
      mppt: "Built-in MPPT 80A",
      warranty: "2 Years Warranty",
    },
    pricePKR: 85000,
    stockStatus: "In Stock",
  },
  {
    id: "5",
    name: "Longi Hi-MO 6 575W N-Type Panel",
    sku: "LR5-72HTH-575M",
    category: "Solar Panels",
    specs: {
      power: "575 Watts",
      efficiency: "22.3% Efficiency",
      type: "HPBC Cell Technology",
      warranty: "15 Yrs Product / 25 Yrs Performance",
    },
    pricePKR: 34000,
    stockStatus: "In Stock",
  },
  {
    id: "6",
    name: "Inverex Nitrox 8kW 3-Phase Hybrid Inverter",
    sku: "INV-NITROX-8K",
    category: "Inverters",
    specs: {
      power: "8000W Output",
      type: "On-Grid & Off-Grid Hybrid",
      mppt: "Dual MPPT",
      warranty: "5 Years Local Warranty",
    },
    pricePKR: 495000,
    stockStatus: "In Stock",
  },
];

const CATEGORY_OPTIONS = ["Inverters", "Solar Panels", "Batteries"];
const STOCK_OPTIONS = ["In Stock", "Low Stock", "Pre-Order"];

export default function VendorPublicProfilePage() {
  const [activeTab, setActiveTab] = useState<"products" | "about" | "trust" | "reviews">("products");

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStock, setSelectedStock] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("default");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);

  // Handlers
  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  const handleStockChange = (status: string) => {
    setSelectedStock((prev) =>
      prev.includes(status)
        ? prev.filter((item) => item !== status)
        : [...prev, status]
    );
  };

  const handlePricePreset = (min: number, max: number | null) => {
    setMinPrice(min.toString());
    setMaxPrice(max ? max.toString() : "");
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSelectedStock([]);
    setMinPrice("");
    setMaxPrice("");
    setSortBy("default");
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return VENDOR_PRODUCTS.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);

      const matchesStock =
        selectedStock.length === 0 ||
        selectedStock.includes(product.stockStatus);

      const minVal = minPrice !== "" ? Number(minPrice) : 0;
      const maxVal = maxPrice !== "" ? Number(maxPrice) : Infinity;
      const matchesPrice = product.pricePKR >= minVal && product.pricePKR <= maxVal;

      return matchesSearch && matchesCategory && matchesStock && matchesPrice;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.pricePKR - b.pricePKR;
      if (sortBy === "price-high") return b.pricePKR - a.pricePKR;
      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      return 0;
    });
  }, [searchQuery, selectedCategories, selectedStock, minPrice, maxPrice, sortBy]);

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedStock.length > 0 ||
    minPrice !== "" ||
    maxPrice !== "" ||
    searchQuery !== "";

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col justify-between">
      <div>
        {/* Header */}
        <SolamoHeader />

        {/* 1. STORE HEADER & TRUST HERO */}
        <div className="bg-slate-900 text-white relative border-b border-slate-800">
          <div className="h-36 bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 opacity-90" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 -mt-14 relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              
              {/* Store Avatar & Info */}
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
                <div className="w-28 h-28 rounded-2xl bg-slate-800 text-[#8BC34A] flex items-center justify-center font-black text-3xl border-4 border-slate-900 shadow-2xl flex-shrink-0">
                  SOL
                </div>
                
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      Solar Solutions Store
                    </h1>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      <BadgeCheck className="w-4 h-4 mr-1 text-emerald-400" />
                      Platform Verified Seller
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      <FileCheck className="w-3.5 h-3.5 mr-1" />
                      NTN Registered
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                    Authorized distributor of Tier-1 Solar Inverters, Monocrystalline Panels, and LiFePO4 Lithium Batteries in Karachi & across Pakistan.
                  </p>

                  <div className="flex flex-wrap items-center gap-y-1 gap-x-4 pt-1 text-xs text-slate-300">
                    <span className="flex items-center text-amber-400 font-semibold">
                      <Star className="w-4 h-4 fill-amber-400 mr-1" />
                      <strong className="text-white mr-1">4.9</strong> (184 Verified Reviews)
                    </span>
                    <span className="flex items-center text-slate-300">
                      <MapPin className="w-3.5 h-3.5 mr-1 text-emerald-400" /> PECHS, Shahrah-e-Faisal, Karachi
                    </span>
                    <span className="flex items-center text-slate-300">
                      <Clock className="w-3.5 h-3.5 mr-1 text-slate-400" /> Established 2021
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Verified Contact Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 bg-slate-800/80 p-3 rounded-2xl border border-slate-700/80 backdrop-blur-xs">
                <a
                  href="tel:+923001234567"
                  className="px-4 py-2.5 bg-[#8BC34A] hover:bg-[#7cb33d] text-slate-900 font-bold rounded-xl text-xs transition-colors flex items-center justify-center shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5 mr-2" />
                  +92 300 1234567
                </a>
                <a
                  href="https://wa.me/923001234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center shadow-sm"
                >
                  <MessageCircle className="w-3.5 h-3.5 mr-2" />
                  WhatsApp Shop
                </a>
                <button className="p-2.5 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-xl transition-colors flex items-center justify-center" title="Share Store">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* TRUST BAR BADGES */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800 text-xs">
              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60 flex items-center space-x-3">
                <ShieldCheck className="w-6 h-6 text-[#8BC34A] flex-shrink-0" />
                <div>
                  <div className="font-bold text-white text-xs">100% Genuine Guarantee</div>
                  <div className="text-[10px] text-slate-400">Direct importer warranty</div>
                </div>
              </div>

              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60 flex items-center space-x-3">
                <Building2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                <div>
                  <div className="font-bold text-white text-xs">Physical Shop Verified</div>
                  <div className="text-[10px] text-slate-400">Audited store in Karachi</div>
                </div>
              </div>

              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60 flex items-center space-x-3">
                <FileCheck className="w-6 h-6 text-blue-400 flex-shrink-0" />
                <div>
                  <div className="font-bold text-white text-xs">Tax / NTN Registered</div>
                  <div className="text-[10px] text-slate-400">NTN: 8941230-7</div>
                </div>
              </div>

              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60 flex items-center space-x-3">
                <Truck className="w-6 h-6 text-amber-400 flex-shrink-0" />
                <div>
                  <div className="font-bold text-white text-xs">Safe Delivery & Escrow</div>
                  <div className="text-[10px] text-slate-400">Dispatch in 24 hours</div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 2. NAVIGATION TABS */}
        <div className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-8 text-sm font-semibold overflow-x-auto">
              <button
                onClick={() => setActiveTab("products")}
                className={`py-4 border-b-2 transition-colors flex items-center whitespace-nowrap ${
                  activeTab === "products"
                    ? "border-[#8BC34A] text-slate-900 font-bold"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                Products Catalog ({VENDOR_PRODUCTS.length})
              </button>
              <button
                onClick={() => setActiveTab("trust")}
                className={`py-4 border-b-2 transition-colors flex items-center whitespace-nowrap ${
                  activeTab === "trust"
                    ? "border-[#8BC34A] text-slate-900 font-bold"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <ShieldCheck className="w-4 h-4 mr-1.5 text-emerald-600" />
                Verified Contact & Trust Proofs
              </button>
              <button
                onClick={() => setActiveTab("about")}
                className={`py-4 border-b-2 transition-colors flex items-center whitespace-nowrap ${
                  activeTab === "about"
                    ? "border-[#8BC34A] text-slate-900 font-bold"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                About Store
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`py-4 border-b-2 transition-colors flex items-center whitespace-nowrap ${
                  activeTab === "reviews"
                    ? "border-[#8BC34A] text-slate-900 font-bold"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                Reviews (184)
              </button>
            </div>
          </div>
        </div>

        {/* 3. TAB CONTENTS */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* TAB 1: PRODUCTS CATALOG */}
          {activeTab === "products" && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              
              {/* LEFT SIDEBAR FILTERS PANEL */}
              <aside className="lg:col-span-1 space-y-6 bg-white p-5 rounded-xl border border-slate-200 shadow-xs h-fit sticky top-20">
                
                {/* Shop Owner Trust Box in Sidebar */}
                <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200/80 space-y-2.5">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-xs border border-emerald-500 flex-shrink-0">
                      S.A
                    </div>
                    <div>
                      <div className="font-bold text-xs text-slate-900 flex items-center">
                        Syed Ali Raza
                        <BadgeCheck className="w-3.5 h-3.5 text-emerald-600 ml-1" />
                      </div>
                      <div className="text-[10px] text-slate-500">Shop Owner & Technical Director</div>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-600 italic leading-snug">
                    "All products listed here are backed by official warranty cards and original brand serial numbers."
                  </p>
                  <div className="pt-2 border-t border-emerald-200/60 flex items-center justify-between text-[11px] font-semibold text-emerald-800">
                    <span className="flex items-center"><Phone className="w-3 h-3 mr-1" /> +92 300 1234567</span>
                    <span className="text-slate-400">•</span>
                    <span>Verified</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h2 className="font-bold text-slate-900 text-base">Filter Catalog</h2>
                  {hasActiveFilters && (
                    <button
                      onClick={resetFilters}
                      className="text-xs text-slate-500 hover:text-[#8BC34A] flex items-center gap-1 font-medium"
                    >
                      <RotateCcw className="w-3 h-3" /> Reset
                    </button>
                  )}
                </div>

                {/* Search Box */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    Search Store
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search model or SKU..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8BC34A]"
                    />
                  </div>
                </div>

                {/* Price Range Filter */}
                <div>
                  <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-3">
                    Price Range (PKR)
                  </h3>
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8BC34A]"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8BC34A]"
                    />
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <button onClick={() => handlePricePreset(0, 50000)} className="px-2 py-1 text-[10px] bg-slate-100 rounded text-slate-600 font-medium">Under 50k</button>
                    <button onClick={() => handlePricePreset(50000, 300000)} className="px-2 py-1 text-[10px] bg-slate-100 rounded text-slate-600 font-medium">50k - 300k</button>
                    <button onClick={() => handlePricePreset(300000, 700000)} className="px-2 py-1 text-[10px] bg-slate-100 rounded text-slate-600 font-medium">300k+</button>
                  </div>
                </div>

                {/* Category Checkboxes */}
                <div>
                  <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-3">
                    Category
                  </h3>
                  <div className="space-y-2.5">
                    {CATEGORY_OPTIONS.map((cat) => (
                      <label key={cat} className="flex items-center space-x-2.5 cursor-pointer text-xs font-medium text-slate-700 hover:text-slate-900">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(cat)}
                          onChange={() => handleCategoryChange(cat)}
                          className="w-4 h-4 text-[#8BC34A] rounded border-slate-300 focus:ring-[#8BC34A] accent-[#8BC34A]"
                        />
                        <span>{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Availability Checkboxes */}
                <div>
                  <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-3">
                    Availability
                  </h3>
                  <div className="space-y-2.5">
                    {STOCK_OPTIONS.map((status) => (
                      <label key={status} className="flex items-center space-x-2.5 cursor-pointer text-xs font-medium text-slate-700 hover:text-slate-900">
                        <input
                          type="checkbox"
                          checked={selectedStock.includes(status)}
                          onChange={() => handleStockChange(status)}
                          className="w-4 h-4 text-[#8BC34A] rounded border-slate-300 focus:ring-[#8BC34A] accent-[#8BC34A]"
                        />
                        <span>{status}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </aside>

              {/* MAIN PRODUCTS AREA */}
              <main className="lg:col-span-3 space-y-4">
                
                {/* Control Bar */}
                <div className="bg-white p-3 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 shadow-xs">
                  <div className="text-xs text-slate-500">
                    Showing <strong className="text-slate-800">{filteredProducts.length}</strong> items from verified store stock
                  </div>

                  <div className="flex items-center space-x-3">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#8BC34A]"
                    >
                      <option value="default">Sort: Default</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="name-asc">Name: A to Z</option>
                    </select>

                    <div className="flex items-center border border-slate-200 rounded-lg p-0.5 bg-slate-100">
                      <button
                        onClick={() => setViewMode("grid")}
                        className={`p-1.5 rounded-md text-xs flex items-center transition-all ${
                          viewMode === "grid"
                            ? "bg-white text-slate-900 shadow-sm font-semibold"
                            : "text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        <LayoutGrid className="w-4 h-4 mr-1" /> Grid
                      </button>
                      <button
                        onClick={() => setViewMode("table")}
                        className={`p-1.5 rounded-md text-xs flex items-center transition-all ${
                          viewMode === "table"
                            ? "bg-white text-slate-900 shadow-sm font-semibold"
                            : "text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        <TableIcon className="w-4 h-4 mr-1" /> Table
                      </button>
                    </div>
                  </div>
                </div>

                {/* Grid or Table Render */}
                {filteredProducts.length === 0 ? (
                  <div className="bg-white rounded-xl p-12 text-center border border-slate-200">
                    <Info className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-slate-800">No matching products</h3>
                    <p className="text-sm text-slate-500 mt-1">Adjust price ranges or category filters.</p>
                    <button
                      onClick={resetFilters}
                      className="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-xs font-semibold rounded-lg"
                    >
                      Clear Filters
                    </button>
                  </div>
                ) : viewMode === "grid" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:shadow-md hover:border-[#8BC34A] transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-slate-100 text-slate-700 border border-slate-200">
                              {product.category}
                            </span>
                            <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              {product.stockStatus}
                            </span>
                          </div>

                          <h3 className="font-bold text-slate-900 text-base leading-snug line-clamp-2 mb-1">
                            {product.name}
                          </h3>
                          <p className="text-xs font-mono text-slate-400 mb-4">
                            SKU: {product.sku}
                          </p>

                          <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 text-xs space-y-1.5 mb-4">
                            {Object.entries(product.specs).map(([key, val]) => (
                              <div key={key} className="flex justify-between items-center">
                                <span className="text-slate-500 capitalize">{key}:</span>
                                <span className="font-medium text-slate-800 text-right">{val}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="border-t border-slate-100 pt-3 mt-auto">
                          <div className="text-xs text-slate-400 font-medium">Unit Price</div>
                          <div className="text-xl font-extrabold text-slate-900 mb-3">
                            PKR {product.pricePKR.toLocaleString()}
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <button
                              onClick={() => setActiveModalProduct(product)}
                              className="w-full py-2 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg flex items-center justify-center"
                            >
                              <Eye className="w-3.5 h-3.5 mr-1" /> Specs
                            </button>
                            <button className="w-full py-2 px-2 bg-[#8BC34A] hover:bg-[#7cb33d] text-slate-900 font-semibold text-xs rounded-lg flex items-center justify-center">
                              <ShoppingCart className="w-3.5 h-3.5 mr-1" /> Add
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-100 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase">
                          <th className="py-3 px-4">Product Details</th>
                          <th className="py-3 px-4">Category</th>
                          <th className="py-3 px-4">Key Specs</th>
                          <th className="py-3 px-4 text-right">Price (PKR)</th>
                          <th className="py-3 px-4 text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 text-sm">
                        {filteredProducts.map((product) => (
                          <tr key={product.id} className="hover:bg-slate-50">
                            <td className="py-3.5 px-4">
                              <div className="font-bold text-slate-900">{product.name}</div>
                              <div className="text-xs font-mono text-slate-400">SKU: {product.sku}</div>
                            </td>
                            <td className="py-3.5 px-4 text-xs">
                              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                                {product.category}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-xs text-slate-600">
                              {Object.values(product.specs).join(" • ")}
                            </td>
                            <td className="py-3.5 px-4 text-right font-extrabold text-slate-900">
                              PKR {product.pricePKR.toLocaleString()}
                            </td>
                            <td className="py-3.5 px-4 text-center">
                              <button className="px-3 py-1.5 bg-[#8BC34A] text-slate-900 font-semibold text-xs rounded-md">
                                Add
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </main>
            </div>
          )}

          {/* TAB 2: VERIFIED CONTACT & TRUST PROOFS */}
          {activeTab === "trust" && (
            <div className="space-y-6">
              
              {/* Top Summary Banner */}
              <div className="bg-emerald-900 text-white p-6 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-6 h-6 text-[#8BC34A]" />
                    <h3 className="text-xl font-bold">100% Platform Verified Business</h3>
                  </div>
                  <p className="text-xs text-emerald-100 mt-1 max-w-2xl">
                    This store has completed physical address verification, official tax registration checks, and bank account validation by our team.
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-xs font-semibold">
                  <span className="px-3 py-1.5 bg-emerald-800 rounded-lg border border-emerald-700">
                    Audit Date: Jan 2026
                  </span>
                  <span className="px-3 py-1.5 bg-[#8BC34A] text-slate-900 rounded-lg">
                    Level 3 Top Seller
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Verified Direct Contact Channels */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                  <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
                    <Phone className="w-5 h-5 text-emerald-600" />
                    <h4 className="font-bold text-slate-900 text-sm">Verified Contact Channels</h4>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 block font-semibold uppercase">Official Direct Phone</span>
                        <span className="font-bold text-slate-900 text-sm">+92 300 1234567</span>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">Verified</span>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 block font-semibold uppercase">WhatsApp Business</span>
                        <span className="font-bold text-slate-900 text-sm">+92 300 1234567</span>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">Instant</span>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 block font-semibold uppercase">Verified Email</span>
                        <span className="font-bold text-slate-900 text-xs">sales@solarsolutions.pk</span>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">Verified</span>
                    </div>
                  </div>
                </div>

                {/* Government & Tax Registrations */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                  <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
                    <FileCheck className="w-5 h-5 text-blue-600" />
                    <h4 className="font-bold text-slate-900 text-sm">Legal & Government Tax Registration</h4>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between items-center py-2 border-b border-slate-50">
                      <span className="text-slate-500">Business Registration Name</span>
                      <span className="font-bold text-slate-900">Solar Solutions Pvt Ltd</span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b border-slate-50">
                      <span className="text-slate-500">NTN (National Tax Number)</span>
                      <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">8941230-7</span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b border-slate-50">
                      <span className="text-slate-500">FBR Sales Tax (STRN)</span>
                      <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">3200894123014</span>
                    </div>

                    <div className="flex justify-between items-center py-2">
                      <span className="text-slate-500">Verified Corporate Bank</span>
                      <span className="font-bold text-emerald-700">Meezan Bank Ltd</span>
                    </div>
                  </div>
                </div>

                {/* Physical Store Audit */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                  <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
                    <Building2 className="w-5 h-5 text-amber-600" />
                    <h4 className="font-bold text-slate-900 text-sm">Physical Shop & Warehouse Location</h4>
                  </div>

                  <div className="space-y-3 text-xs text-slate-600">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-[10px] text-slate-400 block font-semibold uppercase mb-1">Karachi Main Branch</span>
                      <p className="font-medium text-slate-800">
                        Plot 42-B, Main Shahrah-e-Faisal, Block 6 PECHS, Karachi, Pakistan
                      </p>
                    </div>

                    <div className="flex justify-between items-center py-1">
                      <span className="text-slate-500">Operational Since</span>
                      <span className="font-bold text-slate-900">2021 (5+ Years)</span>
                    </div>

                    <div className="flex justify-between items-center py-1">
                      <span className="text-slate-500">In-Store Pickup</span>
                      <span className="font-bold text-emerald-700">Available</span>
                    </div>

                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-lg text-xs flex items-center justify-center transition-colors"
                    >
                      <MapPin className="w-3.5 h-3.5 mr-1.5 text-red-500" />
                      View Location on Google Maps
                    </a>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: ABOUT STORE */}
          {activeTab === "about" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Meet the Owner Box */}
              <div className="md:col-span-1 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="text-center space-y-2">
                  <div className="w-20 h-20 mx-auto rounded-full bg-slate-900 text-[#8BC34A] flex items-center justify-center font-black text-2xl border-4 border-emerald-100 shadow-md">
                    S.A
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">Syed Ali Raza</h4>
                    <p className="text-xs text-slate-500">Founder & Managing Director</p>
                  </div>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-xs text-slate-600 leading-relaxed italic">
                  "We have built our reputation over 5 years by ensuring every inverter and solar module sold is 100% genuine with verifiable brand serial numbers."
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Experience in Solar:</span>
                    <strong className="text-slate-800">8+ Years</strong>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Direct Support:</span>
                    <strong className="text-emerald-700">Available via Phone</strong>
                  </div>
                </div>
              </div>

              {/* Store Overview */}
              <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Company Background</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Solar Solutions Store was established in 2021 as a premier supplier of clean energy equipment across Pakistan. We specialize in providing Tier-1 solar panels, hybrid/off-grid inverters, and long-life lithium iron phosphate (LiFePO4) storage batteries directly to installers, residential homeowners, and commercial projects.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  <div className="flex items-start space-x-3">
                    <Award className="w-5 h-5 text-[#8BC34A] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-xs text-slate-900">Authorized Dealer</h4>
                      <p className="text-xs text-slate-500">Official distribution partner for Growatt, Jinko, & Inverex.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <ShieldCheck className="w-5 h-5 text-[#8BC34A] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-xs text-slate-900">Warranty Backed</h4>
                      <p className="text-xs text-slate-500">All components include official manufacturer warranty cards.</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: CUSTOMER REVIEWS */}
          {activeTab === "reviews" && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Verified Buyer Reviews</h3>
                  <p className="text-xs text-slate-500">Ratings submitted by buyers with completed platform orders</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-slate-900 flex items-center justify-end">
                    4.9 <Star className="w-5 h-5 text-amber-400 fill-amber-400 ml-1" />
                  </div>
                  <span className="text-xs text-slate-400">184 Verified Reviews</span>
                </div>
              </div>

              {/* Sample Reviews */}
              <div className="space-y-4">
                {[
                  { name: "Muhammad Usman", location: "Lahore", date: "2 days ago", rating: 5, comment: "Ordered 5kW Growatt inverter. Delivered within 24 hours to Lahore. Original warranty card included!" },
                  { name: "Tariq Mahmood", location: "Rawalpindi", date: "1 week ago", rating: 5, comment: "Authentic Jinko N-type panels. Testing output gave exact rated current. Highly recommend this vendor." }
                ].map((rev, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-slate-900">{rev.name}</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-medium">Verified Purchase</span>
                      </div>
                      <span className="text-slate-400">{rev.date}</span>
                    </div>
                    <div className="flex items-center text-amber-400 my-1">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-slate-600">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Ad Banner */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
          <BrandAdBanner />
        </div>
      </div>

      {/* Footer */}
      <div>
        <SolamoCtaBanner />
        <SolamoFooter />
        <WhatsAppFloat />
      </div>

      {/* Quick Specs Modal */}
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setActiveModalProduct(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-slate-100 text-slate-700">
                {activeModalProduct.category}
              </span>
              <span className="text-xs font-mono text-slate-400">SKU: {activeModalProduct.sku}</span>
            </div>

            <h2 className="text-xl font-bold text-slate-900 mb-4">{activeModalProduct.name}</h2>

            <div className="border-t border-b border-slate-100 py-4 my-2 space-y-2 text-sm">
              {Object.entries(activeModalProduct.specs).map(([key, val]) => (
                <div key={key} className="flex justify-between py-1 border-b border-slate-50 last:border-0">
                  <span className="text-slate-500 capitalize">{key}</span>
                  <span className="font-semibold text-slate-800">{val}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Unit Price</span>
                <span className="text-2xl font-extrabold text-slate-900">
                  PKR {activeModalProduct.pricePKR.toLocaleString()}
                </span>
              </div>
              <button className="px-5 py-2.5 bg-[#8BC34A] text-slate-900 font-bold rounded-xl text-sm flex items-center">
                <ShoppingCart className="w-4 h-4 mr-2" /> Add to Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
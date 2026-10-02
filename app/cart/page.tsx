"use client";

import React from "react";
import SolamoHeader from "@/components/SolamoHeader";
import SolamoFooter from "@/components/SolamoFooter";
import SolamoInstallationReminder from "@/components/SolamoInstallationReminder";
import Link from "next/link";
import { ShoppingBag, ArrowRight } from "lucide-react";

export default function CartPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <SolamoHeader />

      <main className="max-w-[1400px] mx-auto px-3 sm:px-5 lg:px-6 xl:px-8 py-10 flex-grow w-full">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Shopping <span className="text-[#84CC16]">Cart</span>
          </h1>
          <p className="text-gray-600 text-sm">
            Review your solar equipment selection before checkout.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items list / Empty state */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-[#F7FEE7] text-[#84CC16] flex items-center justify-center mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Your cart is currently empty
              </h2>
              <p className="text-gray-500 text-sm max-w-md mb-6">
                Explore our high-efficiency solar panels, inverters, and
                lithium batteries in the shop.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-[#84CC16] hover:bg-[#65A30D] text-black font-bold px-6 py-3 rounded-xl transition shadow-sm text-sm"
              >
                Browse Shop
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Checkout Summary Box */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200 h-fit">
            <h3 className="text-lg font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">
              Order Summary
            </h3>

            <div className="space-y-3 mb-6 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">PKR 0</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Delivery</span>
                <span className="font-semibold text-[#4D7C0F]">Free</span>
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between text-base font-bold text-gray-900">
                <span>Total</span>
                <span>PKR 0</span>
              </div>
            </div>

            {/* Installation Reminder Banner above the checkout button */}
            <div className="mb-6">
              <SolamoInstallationReminder variant="cart" />
            </div>

            <button
              type="button"
              disabled
              className="w-full bg-gray-200 text-gray-400 font-bold py-3.5 px-6 rounded-xl cursor-not-allowed transition flex items-center justify-center gap-2 text-sm"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </main>

      <SolamoFooter />
    </div>
  );
}

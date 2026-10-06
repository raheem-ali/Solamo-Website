"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MapPin, ChevronDown, Check } from "lucide-react";
import { useCity } from "@/app/context/CityContext";

const STORAGE_KEY = "solamo_city";

interface Props {
  /** "topbar" = dropdown on the green bar (desktop/tablet). "drawer" = chip list inside the mobile menu. */
  variant?: "topbar" | "drawer";
  onSelect?: () => void;
}

export default function CitySelector({ variant = "topbar", onSelect }: Props) {
  const { city, cities } = useCity();
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ top: number; right: number }>({ top: 0, right: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  console.log("[city] CitySelector rendered | variant:", variant, "| city:", JSON.stringify(city), "| cities:", cities);

  // Position the dropdown under the button (it is rendered in <body>, so no parent can cover or clip it)
  const place = useCallback(() => {
    const el = btnRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({ top: r.bottom + 8, right: Math.max(8, window.innerWidth - r.right) });
  }, []);

  useEffect(() => {
    if (!open) return;
    place();
    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, true);
    return () => {
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", place, true);
    };
  }, [open, place]);

  // Close dropdown on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      const t = e.target as Node;
      if (btnRef.current?.contains(t) || menuRef.current?.contains(t)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Save the city in localStorage, then refresh the page so every section loads with it
  const choose = (c: string) => {
    console.log("[city] CHOOSE clicked:", JSON.stringify(c));
    try {
      if (c) localStorage.setItem(STORAGE_KEY, c);
      else localStorage.removeItem(STORAGE_KEY); // "All Cities"
      console.log("[city] stored value now:", localStorage.getItem(STORAGE_KEY));
    } catch (e) {
      console.error("[city] localStorage failed", e);
    }
    setOpen(false);
    onSelect?.();
    // small delay so the console lines are visible before the reload
    setTimeout(() => window.location.reload(), 150);
  };

  const options = ["", ...cities]; // "" = All Cities

  // ---------- Mobile drawer ----------
  if (variant === "drawer") {
    return (
      <div className="px-3 pb-3">
        <p className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#5f9200]">
          <MapPin className="h-3.5 w-3.5" /> Your City
        </p>
        <div className="flex flex-wrap gap-2">
          {options.map((c) => {
            const active = c === city;
            return (
              <button
                key={c || "all"}
                type="button"
                onClick={() => choose(c)}
                className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
                  active
                    ? "border-[#79B900] bg-[#79B900] text-white"
                    : "border-gray-200 bg-white text-[#172217] hover:border-[#79B900]"
                }`}
              >
                {c || "All Cities"}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ---------- Topbar dropdown ----------
  return (
    <div className="relative">
      <button
        ref={btnRef}
        type="button"
        onClick={() => {
          console.log("[city] selector button clicked, open was:", open);
          setOpen((o) => !o);
        }}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-[11px] font-semibold transition hover:bg-white/40 sm:text-sm"
      >
        <MapPin className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
<span className="max-w-[110px] truncate">TEST {city || "All Cities"}</span>      
  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <ul
            ref={menuRef}
            role="listbox"
            style={{ position: "fixed", top: pos.top, right: pos.right }}
            className="z-[9999] max-h-72 w-52 overflow-y-auto rounded-xl border border-gray-100 bg-white p-1.5 text-[#172217] shadow-xl"
          >
            {options.map((c) => {
              const active = c === city;
              return (
                <li key={c || "all"} role="option" aria-selected={active}>
                  <button
                    type="button"
                    onClick={() => choose(c)}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium transition hover:bg-[#f2f9e6] hover:text-[#5f9200] ${
                      active ? "bg-[#f2f9e6] text-[#5f9200]" : ""
                    }`}
                  >
                    {c || "All Cities"}
                    {active && <Check className="h-4 w-4" />}
                  </button>
                </li>
              );
            })}
            {cities.length === 0 && (
              <li className="px-3 py-2 text-xs text-gray-400">No cities available yet</li>
            )}
          </ul>,
          document.body
        )}
    </div>
  );
}
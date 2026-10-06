"use client";

import React, { useEffect, useRef, useState } from "react";
import { MapPin, ChevronDown, Check } from "lucide-react";
import { useCity } from "../context/CityContext";

interface Props {
  /** "topbar" = dropdown on the green bar (desktop/tablet). "drawer" = chip list inside the mobile menu. */
  variant?: "topbar" | "drawer";
  onSelect?: () => void;
}

export default function CitySelector({ variant = "topbar", onSelect }: Props) {
  const { city, cities, setCity } = useCity();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const choose = (c: string) => {
    setCity(c);
    setOpen(false);
    onSelect?.();
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
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-[11px] font-semibold transition hover:bg-white/40 sm:text-sm"
      >
        <MapPin className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
        <span className="max-w-[110px] truncate">{city || "All Cities"}</span>
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-50 mt-2 max-h-72 w-52 overflow-y-auto rounded-xl border border-gray-100 bg-white p-1.5 text-[#172217] shadow-xl"
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
        </ul>
      )}
    </div>
  );
}
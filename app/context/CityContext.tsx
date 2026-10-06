"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

// Change to your Laravel API base (must end WITHOUT a slash)
export const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api").replace(/\/+$/, "");

const STORAGE_KEY = "solamo_city";

interface CityContextValue {
  /** Selected city. Empty string = All Cities (no filter). */
  city: string;
  /** Cities that actually have shops (from the API). */
  cities: string[];
  setCity: (city: string) => void;
  /** false until the saved city has been read from localStorage. Wait for it before fetching. */
  ready: boolean;
}

const CityContext = createContext<CityContextValue>({
  city: "",
  cities: [],
  setCity: () => {
    console.warn("[city] setCity was called but CityProvider is NOT wrapping this component (or two copies of CityContext exist).");
  },
  ready: true, // if the provider is ever missing, do not leave pages waiting forever
});

export function CityProvider({ children }: { children: React.ReactNode }) {
  const [city, setCityState] = useState("");
  const [cities, setCities] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  // Read saved city once on the client
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setCityState(saved);
    } catch {}
    setReady(true);
  }, []);

  // Load list of cities that have shops
  useEffect(() => {
    let cancelled = false;
    fetch(`${API_URL}/products/cities`, { headers: { Accept: "application/json" } })
      .then((r) => (r.ok ? r.json() : []))
      .then((list) => {
        if (!cancelled && Array.isArray(list)) setCities(list);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const setCity = useCallback((next: string) => {
    console.log("[city] setCity ->", JSON.stringify(next));
    setCityState(next);
    try {
      if (next) localStorage.setItem(STORAGE_KEY, next);
      else localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, []);

  return (
    <CityContext.Provider value={{ city, cities, setCity, ready }}>
      {/* key = city: when the city changes, every page section remounts and refetches its products */}
      <React.Fragment key={city || "all"}>{children}</React.Fragment>
    </CityContext.Provider>
  );
}

export const useCity = () => useContext(CityContext);
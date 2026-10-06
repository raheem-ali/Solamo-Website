"use client";

import { useEffect, useState } from "react";
import { API_URL, useCity } from "../app/context/CityContext";

type Params = Record<string, string | number | undefined | null>;

interface Meta {
  current_page: number;
  last_page: number;
  total: number;
}

/**
 * Fetches /products and automatically adds the selected city.
 * Refetches only the page that is open, whenever the city or params change.
 *
 * Usage:
 *   const { products, loading, meta } = useProducts({ category_id: 3, per_page: 12 });
 *   const { products } = useProducts({ brand_id: 5 });
 */
export function useProducts(params: Params = {}) {
  const { city, ready } = useCity();
  const [products, setProducts] = useState<any[]>([]);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const paramsKey = JSON.stringify(params);

  useEffect(() => {
    if (!ready) return; // wait until saved city is loaded

    const controller = new AbortController();
    const qs = new URLSearchParams();

    Object.entries(JSON.parse(paramsKey) as Params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== "") qs.set(k, String(v));
    });
    if (city) qs.set("city", city);

    setLoading(true);
    setError("");

    fetch(`${API_URL}/products?${qs.toString()}`, {
      headers: { Accept: "application/json" },
      signal: controller.signal,
    })
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load products");
        return r.json();
      })
      .then((json) => {
        setProducts(json.data ?? []);
        setMeta({
          current_page: json.current_page,
          last_page: json.last_page,
          total: json.total,
        });
      })
      .catch((e) => {
        if (e.name !== "AbortError") setError(e.message || "Something went wrong");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [city, ready, paramsKey]);

  return { products, meta, loading, error, city };
}
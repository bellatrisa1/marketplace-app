"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import TopBar from "./TopBar";
import Header from "./Header";
import SearchBar from "./SearchBar";
import Chips from "./Chips";
import Hero from "./Hero";
import CategoriesGrid from "./CategoriesGrid";
import Footer from "./Footer";
import type { CartsResponse, MarketplaceProduct } from "@/types/api";

async function getProductsFromCarts(): Promise<MarketplaceProduct[]> {
  const response = await fetch("https://dummyjson.com/carts");

  if (!response.ok) {
    throw new Error("Не удалось загрузить товары");
  }

  const data: CartsResponse = await response.json();

  const map = new Map<number, MarketplaceProduct>();

  data.carts.forEach((cart) => {
    cart.products.forEach((product) => {
      const discounted =
        product.discountedTotal ??
        product.discountedPrice ??
        Math.round(product.price * (1 - product.discountPercentage / 100));

      const oldPrice =
        product.quantity > 0
          ? Math.round((product.total / product.quantity) * 100) / 100
          : product.price;

      if (!map.has(product.id)) {
        map.set(product.id, {
          id: product.id,
          title: product.title,
          price:
            product.discountedPrice ??
            Math.round((discounted / Math.max(product.quantity, 1)) * 100) /
              100,
          oldPrice,
          discountPercentage: product.discountPercentage,
          thumbnail: product.thumbnail,
          quantity: product.quantity,
        });
      }
    });
  });

  return Array.from(map.values());
}

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [activeChip, setActiveChip] = useState("Все");

  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["marketplace-products"],
    queryFn: getProductsFromCarts,
  });

  const filteredProducts = useMemo(() => {
    const normalized = search.trim().toLowerCase();

    let result = data;

    if (activeChip === "Скидки") {
      result = result.filter((item) => item.discountPercentage > 0);
    }

    if (activeChip === "Дороже") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    if (activeChip === "Дешевле") {
      result = [...result].sort((a, b) => a.price - b.price);
    }

    if (!normalized) return result;

    return result.filter((item) =>
      item.title.toLowerCase().includes(normalized),
    );
  }, [data, search, activeChip]);

  return (
    <div className="page">
      <TopBar />
      <Header />
      <main className="main">
        <div className="container">
          <SearchBar value={search} onChange={setSearch} />
          <Chips activeChip={activeChip} onChange={setActiveChip} />
          <Hero />
          <CategoriesGrid
            products={filteredProducts}
            isLoading={isLoading}
            isError={isError}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

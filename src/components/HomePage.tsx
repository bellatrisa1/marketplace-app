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
import type { MarketplaceProduct, ProductsResponse } from "@/types/api";

async function getProducts(): Promise<MarketplaceProduct[]> {
  const response = await fetch("https://dummyjson.com/products?limit=0");

  if (!response.ok) {
    throw new Error("Не удалось загрузить товары");
  }

  const data: ProductsResponse = await response.json();

  return data.products.map((product) => {
    const oldPrice = Number(
      (product.price / (1 - product.discountPercentage / 100)).toFixed(2),
    );

    return {
      id: product.id,
      title: product.title,
      description: product.description,
      category: product.category,
      price: product.price,
      oldPrice,
      discountPercentage: product.discountPercentage,
      rating: product.rating,
      stock: product.stock,
      brand: product.brand,
      thumbnail: product.thumbnail,
      images: product.images ?? [product.thumbnail],
    };
  });
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
    queryFn: getProducts,
  });

  const filteredProducts = useMemo(() => {
    const normalized = search.trim().toLowerCase();

    let result = data;

    if (activeChip === "Скидки") {
      result = result.filter((item) => item.discountPercentage > 0);
    }

    if (activeChip === "Дешевле") {
      result = [...result].sort((a, b) => a.price - b.price);
    }

    if (activeChip === "Дороже") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    if (
      activeChip !== "Все" &&
      activeChip !== "Скидки" &&
      activeChip !== "Дешевле" &&
      activeChip !== "Дороже"
    ) {
      result = result.filter(
        (item) => item.category.toLowerCase() === activeChip.toLowerCase(),
      );
    }

    if (!normalized) return result;

    return result.filter((item) => {
      return (
        item.title.toLowerCase().includes(normalized) ||
        item.description.toLowerCase().includes(normalized) ||
        item.category.toLowerCase().includes(normalized) ||
        (item.brand?.toLowerCase().includes(normalized) ?? false)
      );
    });
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

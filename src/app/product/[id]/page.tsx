import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import ProductPageClient from "@/components/ProductPageClient";
import type { MarketplaceProduct, ProductsResponse } from "@/types/api";

async function getProducts(): Promise<MarketplaceProduct[]> {
  const response = await fetch("https://dummyjson.com/products?limit=0", {
    cache: "no-store",
  });

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

function formatCategoryTitle(slug: string) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const products = await getProducts();

  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <div className="page">
        <TopBar />
        <Header />
        <main className="main">
          <div className="container">
            <div className="products-state">Товар не найден.</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const relatedProducts = products
    .filter(
      (item) => item.category === product.category && item.id !== product.id,
    )
    .slice(0, 4);

  return (
    <div className="page">
      <TopBar />
      <Header />

      <main className="main">
        <div className="container">
          <div className="product-page">
            <p className="product-page__breadcrumbs">
              <Link href="/">Главная</Link> /{" "}
              <Link href={`/category/${product.category}`}>
                {formatCategoryTitle(product.category)}
              </Link>{" "}
              / <span>{product.title}</span>
            </p>

            <ProductPageClient
              product={product}
              relatedProducts={relatedProducts}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

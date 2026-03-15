"use client";

import Image from "next/image";
import type { MarketplaceProduct } from "@/types/api";
import { useStore } from "@/store";

interface CategoriesGridProps {
  products: MarketplaceProduct[];
  isLoading: boolean;
  isError: boolean;
}

export default function CategoriesGrid({
  products,
  isLoading,
  isError,
}: CategoriesGridProps) {
  const cartItems = useStore((state) => state.cartItems);
  const addToCart = useStore((state) => state.addToCart);
  const increaseCartItem = useStore((state) => state.increaseCartItem);
  const decreaseCartItem = useStore((state) => state.decreaseCartItem);
  const toggleFavorite = useStore((state) => state.toggleFavorite);
  const favoriteIds = useStore((state) => state.favoriteIds);

  if (isLoading) {
    return (
      <section className="products-grid">
        {Array.from({ length: 8 }).map((_, index) => (
          <div className="product-card product-card--skeleton" key={index}>
            <div className="product-card__image-wrap skeleton" />
            <div className="skeleton skeleton-text" />
            <div className="skeleton skeleton-price" />
          </div>
        ))}
      </section>
    );
  }

  if (isError) {
    return <p className="products-state">Не удалось загрузить товары.</p>;
  }

  if (!products.length) {
    return <p className="products-state">По вашему запросу ничего не найдено.</p>;
  }

  return (
    <section className="products-grid">
      {products.map((product) => {
        const cartItem = cartItems.find((item) => item.id === product.id);
        const isFavorite = favoriteIds.includes(product.id);

        return (
          <article className="product-card" key={product.id}>
            <div className="product-card__badge">
              -{Math.round(product.discountPercentage)}%
            </div>

            <button
              className={`product-card__favorite ${
                isFavorite ? "product-card__favorite--active" : ""
              }`}
              type="button"
              onClick={() => toggleFavorite(product.id)}
              aria-label="Добавить в избранное"
            >
              ♥
            </button>

            <div className="product-card__image-wrap">
              <Image
                src={product.thumbnail}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                className="product-card__image"
              />
            </div>

            <div className="product-card__content">
              <h3 className="product-card__title">{product.title}</h3>

              <div className="product-card__prices">
                <span className="product-card__price">
                  ${product.price.toFixed(2)}
                </span>

                {product.oldPrice && product.oldPrice > product.price ? (
                  <span className="product-card__old-price">
                    ${product.oldPrice.toFixed(2)}
                  </span>
                ) : null}
              </div>

              <p className="product-card__meta">В корзине API: {product.quantity} шт.</p>

              {!cartItem ? (
                <button
                  className="product-card__button"
                  type="button"
                  onClick={() => addToCart(product)}
                >
                  В корзину
                </button>
              ) : (
                <div className="product-card__controls">
                  <button
                    className="product-card__control-btn"
                    type="button"
                    onClick={() => decreaseCartItem(product.id)}
                  >
                    −
                  </button>

                  <span className="product-card__control-count">
                    {cartItem.cartQuantity}
                  </span>

                  <button
                    className="product-card__control-btn"
                    type="button"
                    onClick={() => increaseCartItem(product.id)}
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </article>
        );
      })}
    </section>
  );
}
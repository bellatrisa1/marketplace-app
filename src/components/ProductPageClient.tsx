"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useStore } from "@/store";
import type { MarketplaceProduct } from "@/types/api";

interface ProductPageClientProps {
  product: MarketplaceProduct;
  relatedProducts: MarketplaceProduct[];
}

export default function ProductPageClient({
  product,
  relatedProducts,
}: ProductPageClientProps) {
  const [activeImage, setActiveImage] = useState(
    product.images[0] || product.thumbnail,
  );

  const addToCart = useStore((state) => state.addToCart);
  const cartItems = useStore((state) => state.cartItems);
  const increaseCartItem = useStore((state) => state.increaseCartItem);
  const decreaseCartItem = useStore((state) => state.decreaseCartItem);
  const toggleFavorite = useStore((state) => state.toggleFavorite);
  const isFavorite = useStore((state) => state.isFavorite);

  const cartItem = cartItems.find((item) => item.id === product.id);
  const favoriteActive = isFavorite(product.id);

  const ratingText = useMemo(() => product.rating.toFixed(1), [product.rating]);

  return (
    <>
      <section className="product-view">
        <div className="product-view__gallery">
          <div className="product-view__main-image">
            <Image
              src={activeImage}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="product-view__image"
            />
          </div>

          <div className="product-view__thumbs">
            {product.images.map((image) => (
              <button
                key={image}
                type="button"
                className={`product-view__thumb ${
                  activeImage === image ? "product-view__thumb--active" : ""
                }`}
                onClick={() => setActiveImage(image)}
              >
                <Image
                  src={image}
                  alt={product.title}
                  fill
                  sizes="100px"
                  className="product-view__thumb-image"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="product-view__info">
          <div className="product-view__top">
            <div>
              <p className="product-view__category">{product.category}</p>
              <h1 className="product-view__title">{product.title}</h1>
            </div>

            <button
              type="button"
              className={`product-view__favorite ${
                favoriteActive ? "product-view__favorite--active" : ""
              }`}
              onClick={() => toggleFavorite(product)}
            >
              ♥
            </button>
          </div>

          <div className="product-view__meta">
            <span>⭐ {ratingText}</span>
            {product.brand ? <span>Бренд: {product.brand}</span> : null}
            <span>В наличии: {product.stock}</span>
          </div>

          <div className="product-view__prices">
            <span className="product-view__price">
              ${product.price.toFixed(2)}
            </span>

            {product.oldPrice && product.oldPrice > product.price ? (
              <span className="product-view__old-price">
                ${product.oldPrice.toFixed(2)}
              </span>
            ) : null}

            <span className="product-view__discount">
              -{Math.round(product.discountPercentage)}%
            </span>
          </div>

          <p className="product-view__description">{product.description}</p>

          {!cartItem ? (
            <button
              className="product-view__button"
              type="button"
              onClick={() => addToCart(product)}
            >
              Добавить в корзину
            </button>
          ) : (
            <div className="product-view__controls">
              <button
                className="product-view__control-btn"
                type="button"
                onClick={() => decreaseCartItem(product.id)}
              >
                −
              </button>

              <span className="product-view__control-count">
                {cartItem.cartQuantity}
              </span>

              <button
                className="product-view__control-btn"
                type="button"
                onClick={() => increaseCartItem(product.id)}
              >
                +
              </button>
            </div>
          )}

          <div className="product-view__details">
            <div className="product-view__detail-card">
              <span className="product-view__detail-label">Категория</span>
              <strong>{product.category}</strong>
            </div>

            <div className="product-view__detail-card">
              <span className="product-view__detail-label">Рейтинг</span>
              <strong>{ratingText}</strong>
            </div>

            <div className="product-view__detail-card">
              <span className="product-view__detail-label">Наличие</span>
              <strong>{product.stock} шт.</strong>
            </div>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 ? (
        <section className="related-products">
          <div className="related-products__head">
            <h2 className="related-products__title">Похожие товары</h2>
            <Link
              href={`/category/${product.category}`}
              className="related-products__link"
            >
              Смотреть категорию
            </Link>
          </div>

          <div className="related-products__grid">
            {relatedProducts.map((item) => (
              <Link
                key={item.id}
                href={`/product/${item.id}`}
                className="related-product-card"
              >
                <div className="related-product-card__image-wrap">
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="related-product-card__image"
                  />
                </div>

                <div className="related-product-card__content">
                  <h3 className="related-product-card__title">{item.title}</h3>
                  <p className="related-product-card__price">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}

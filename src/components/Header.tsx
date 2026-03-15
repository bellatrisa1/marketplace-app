"use client";

import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/store";

export default function Header() {
  const cartItemsCount = useStore((state) => state.getCartItemsCount());
  const favoriteIds = useStore((state) => state.favoriteIds);

  return (
    <header className="header">
      <div className="container header__inner">
        <Link className="logo" href="/">
          <Image
            src="/ORVIX-LOGO.png"
            alt="Orvix"
            width={220}
            height={80}
            priority
            className="logo__image"
          />
        </Link>

        <button className="catalog-btn" type="button">
          <span className="catalog-btn__burger">
            <span />
            <span />
            <span />
          </span>
          <span>Каталог</span>
        </button>

        <nav className="header__nav">
          <Link href="/">Главная</Link>
          <a href="#">Идеи</a>
          <a href="#">Скидки</a>
          <a href="#">Услуги</a>
        </nav>

        <div className="header__actions">
          <Link className="action-btn" href="/favorites">
            <span className="action-btn__icon">♡</span>
            <span className="action-btn__text">Избранное</span>
            <span className="badge">{favoriteIds.length}</span>
          </Link>

          <button className="action-btn" type="button">
            <span className="action-btn__icon">◯</span>
            <span className="action-btn__text">Профиль</span>
          </button>

          <Link className="action-btn" href="/cart">
            <span className="action-btn__icon">🛒</span>
            <span className="action-btn__text">Корзина</span>
            <span className="badge">{cartItemsCount}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

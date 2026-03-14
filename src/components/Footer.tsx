import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Image
            src="/ORVIX-LOGO.png"
            alt="Orvix"
            width={180}
            height={70}
            className="footer__logo"
          />

          <p className="footer__description">
            Orvix — современный маркетплейс с тысячами товаров по выгодным
            ценам. Электроника, одежда, аксессуары и многое другое в одном
            месте.
          </p>

          <div className="footer__socials">
            <a href="#">📱</a>
            <a href="#">📷</a>
            <a href="#">🐦</a>
            <a href="#">▶</a>
          </div>
        </div>

        <div className="footer__column">
          <h4>Покупателям</h4>
          <a href="#">Как сделать заказ</a>
          <a href="#">Доставка</a>
          <a href="#">Возврат товара</a>
          <a href="#">Гарантии</a>
          <a href="#">Помощь</a>
        </div>

        <div className="footer__column">
          <h4>Компания</h4>
          <a href="#">О нас</a>
          <a href="#">Новости</a>
          <a href="#">Карьера</a>
          <a href="#">Партнёрам</a>
          <a href="#">Контакты</a>
        </div>

        <div className="footer__column">
          <h4>Каталог</h4>
          <a href="#">Электроника</a>
          <a href="#">Одежда</a>
          <a href="#">Техника</a>
          <a href="#">Красота</a>
          <a href="#">Аксессуары</a>
        </div>

        <div className="footer__column">
          <h4>Контакты</h4>
          <p>support@orvix.com</p>
          <p>+7 (812) 555-89-72</p>
          <p>Санкт-Петербург</p>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>© {new Date().getFullYear()} Orvix. Все права защищены.</p>
          <div className="footer__legal">
            <a href="#">Политика конфиденциальности</a>
            <a href="#">Пользовательское соглашение</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

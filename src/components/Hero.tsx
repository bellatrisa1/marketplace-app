import Image from "next/image";

export default function Hero() {
  return (
    <section className="hero">
      <button className="hero__arrow hero__arrow--left" type="button">
        ‹
      </button>

      <div className="hero__content">
        <div className="hero__text">
          <div className="hero__brand">
            <Image
              src="/ORVIX-LOGO.png"
              alt="Orvix"
              width={260}
              height={100}
              priority
              className="hero__brand-image"
            />
          </div>

          <p className="hero__subtitle">Большая распродажа</p>

          <div className="hero__discount">
            <span>до</span>
            <strong>-70%</strong>
          </div>

          <a href="#" className="hero__cta">
            Смотреть предложения
          </a>
        </div>

        <div className="hero__visual">
          <div className="hero-card hero-card--phone" />
          <div className="hero-card hero-card--watch" />
          <div className="hero-card hero-card--headphones" />
          <div className="hero-card hero-card--gamepad" />
        </div>
      </div>

      <div className="hero__dots">
        <button
          type="button"
          className="hero__dot hero__dot--active"
          aria-label="Слайд 1"
        />
        <button type="button" className="hero__dot" aria-label="Слайд 2" />
        <button type="button" className="hero__dot" aria-label="Слайд 3" />
        <button type="button" className="hero__dot" aria-label="Слайд 4" />
      </div>

      <button className="hero__arrow hero__arrow--right" type="button">
        ›
      </button>
    </section>
  );
}

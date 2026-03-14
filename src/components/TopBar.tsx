export default function TopBar() {
  return (
    <header className="topbar">
      <div className="container topbar__inner">
        <div className="topbar__left">
          <button className="city-btn" type="button">
            <span className="icon">📍</span>
            <span>Санкт-Петербург</span>
            <span className="chevron">⌄</span>
          </button>
        </div>

        <nav className="topbar__nav">
          <a href="#">Мобильное приложение</a>
          <a href="#">Поддержка</a>
          <a href="#">Подарочные карты</a>
          <a href="#">Для бизнеса</a>
        </nav>

        <div className="topbar__right">
          <a className="phone-link" href="tel:+78125558972">
            +7 812 555-89-72
          </a>
        </div>
      </div>
    </header>
  );
}

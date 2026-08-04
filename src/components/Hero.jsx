export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-bg-shapes">
        <div className="hero-shape"></div>
        <div className="hero-shape"></div>
        <div className="hero-shape"></div>
      </div>
      <div className="hero-content">
        <div className="hero-badge">✦ Fullstack Developer ✦</div>
        <h1>
          Создаю уникальные<br />
          <span className="highlight">сайты</span>
        </h1>
        <p className="hero-subtitle">
          Разрабатываю современные сайты с уникальным дизайном,
          анимацией и Back-End настройкой.
        </p>
        <a href="#player" className="hero-cta" data-scroll>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="5 12 12 19 19 12"></polyline>
          </svg>
          <span>Смотреть работы</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="5 12 12 19 19 12"></polyline>
          </svg>
        </a>
      </div>
    </section>
  );
}
import { Link } from 'react-router-dom';

export default function PortfolioSection({ id, tag, title, desc, delay, reverse, image, alt, overlayTag, number, category, name, text, tech, link, linkText }) {
  const isExternal = link.startsWith('http');
  const LinkComponent = isExternal ? 'a' : Link;
  const linkProps = isExternal ? { href: link, target: '_blank', rel: 'noopener noreferrer' } : { to: link };

  return (
    <section className="portfolio" id={id}>
      <div className="section-header">
        <div className="section-tag">{tag}</div>
        <h2 className="section-title">{title}</h2>
        <p className="section-desc">{desc}</p>
      </div>
      <div className={`portfolio-card${reverse ? ' reverse' : ''}`} data-delay={delay}>
        <LinkComponent {...linkProps} className="portfolio-visual">
          <img src={image} alt={alt} loading="lazy" />
          <div className="portfolio-overlay">
            <div className="tv-overlay">
              <div className="tv-overlay__lines"></div>
              <div className="tv-overlay__noise"></div>
            </div>
            <span className="portfolio-overlay-tag">{overlayTag}</span>
          </div>
        </LinkComponent>
        <div className="portfolio-info">
          <div className="portfolio-number">{number}</div>
          <div className="category">{category}</div>
          <h3>{name}</h3>
          <p>{text}</p>
          <div className="portfolio-tech">
            {tech.map((t, i) => <span key={i}>{t}</span>)}
          </div>
          <LinkComponent {...linkProps} className="portfolio-btn">
            {linkText}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </LinkComponent>
        </div>
      </div>
    </section>
  );
}
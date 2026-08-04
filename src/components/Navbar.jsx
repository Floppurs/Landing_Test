import { Link } from 'react-router-dom';
import { usePlanet } from '../hooks/usePlanet.js';
import { useCassette } from '../hooks/useCassette.js';
import { useNavbar } from '../hooks/useNavbar.js';
import { useTextScramble } from '../hooks/useTextScramble.js';

export default function Navbar({ variant = 'home' }) {
  // Инициализация эффектов (все хуки вызываются безусловно)
  useNavbar();
  useTextScramble();
  usePlanet();
  useCassette();

  const links = variant === 'player' ? (
    <>
      <li><Link to="/player">Плеер</Link></li>
      <li><Link to="/#clothing">Магазин одежды</Link></li>
      <li><Link to="/#petshop">Зоомагазин</Link></li>
      <li><Link to="/#bakery">Кондитерская</Link></li>
      <li className="nav-mobile-only"><Link to="/#footer" className="nav-contact-btn">Контакты</Link></li>
    </>
  ) : (
    <>
      <li><a href="#player" data-scroll>Плеер</a></li>
      <li><a href="#petshop" data-scroll>Зоомагазин</a></li>
      <li><a href="#bakery" data-scroll>Кондитерская</a></li>
      <li className="nav-mobile-only"><a href="#footer" className="nav-contact-btn" data-scroll>Контакты</a></li>
    </>
  );

  return (
    <nav className="navbar" id="navbar">
      <div className="nav-logo" id="navLogo">
        {variant === 'player' ? (
          <Link to="/">
            <canvas id="cassetteCanvas"></canvas>
          </Link>
        ) : (
          <a href="#hero" data-scroll>
            <canvas id="planetCanvas"></canvas>
          </a>
        )}
      </div>
      <ul className="nav-links" id="navLinks">
        {links}
      </ul>
      <div className="nav-right">
        {variant === 'player' ? (
          <Link to="/#footer" className="nav-contact-btn">Контакты</Link>
        ) : (
          <a href="#footer" className="nav-contact-btn" data-scroll>Контакты</a>
        )}
      </div>
      <div className="hamburger" id="hamburger">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
}